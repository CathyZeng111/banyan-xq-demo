const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");

const workspaceRoot = __dirname;

loadEnvFile(path.join(workspaceRoot, ".env.local"));

const PORT = Number(process.env.PORT || 4173);
const HOST = process.env.HOST || "127.0.0.1";
const OPENAI_API_KEY = process.env.OPENAI_API_KEY || process.env.API_KEY || "";
const OPENAI_BASE_URL = process.env.OPENAI_BASE_URL || process.env.BASE_URL || "https://api.openai.com/v1";
const OPENAI_MODEL = process.env.OPENAI_MODEL || process.env.MODEL || "gpt-4.1-mini";
const UPSTREAM_TIMEOUT_MS = Number(process.env.UPSTREAM_TIMEOUT_MS || 30000);

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
};

const scenarioContexts = {
  "repair-message": {
    summary:
      "用户是中国高校理工科研究生，面对导师有明显权力差，场景是设备事故后的第一次汇报。目标是情绪接住、责任表达、补救方案，避免过度卑微和甩锅。",
    context: [
      "近期设备培训记录：用户参加过离心机基础培训，但实际操作经验不多。",
      "导师偏好：更重视学生先给出事实和补救方案，再讨论追责。",
    ],
  },
  "advisor-translate": {
    summary:
      "用户需要理解导师简短消息背后的真实要求。目标是区分显性要求、潜在期待、建议动作和可直接发送的回复。",
    context: [
      "导师最近多次强调‘先别发散’，说明当前更看重收束框架，而不是继续脑暴。",
      "学生上一次汇报里展示了较多方向，但缺少聚焦版本。",
    ],
  },
  "lab-rag": {
    summary:
      "用户不敢在课题组群里问基础问题，需要模拟 QQ 群资料检索和高情商提问缓冲带。",
    context: [
      "群文件《4 月耗材登记表》记录：BCA 蛋白定量试剂盒在二楼 -20 度冰箱第三层右侧。",
      "4 月 18 日 21:16 李师姐在群内确认过该耗材位置。",
      "如果资料没有命中，应该给出礼貌提问模板，而不是只说不知道。",
    ],
  },
  "emotional-support": {
    summary:
      "用户在科研高压下主动求助。目标不是做心理诊断，而是共情、梳理压力来源、给出最小行动建议，并在必要时提示转介。",
    context: [
      "历史对话：昨晚提到组会 PPT 还没做完。",
      "导师摘要：近 3 天出现两次‘尽快发我’。",
      "群聊摘要：今天下午新增组会通知。",
    ],
  },
};

function loadEnvFile(filePath) {
  if (!fs.existsSync(filePath)) {
    return;
  }

  const raw = fs.readFileSync(filePath, "utf8");
  raw.split(/\r?\n/).forEach((line) => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) {
      return;
    }

    const separatorIndex = trimmed.indexOf("=");
    if (separatorIndex === -1) {
      return;
    }

    const key = trimmed.slice(0, separatorIndex).trim();
    const value = trimmed.slice(separatorIndex + 1).trim().replace(/^['"]|['"]$/g, "");
    if (!(key in process.env)) {
      process.env[key] = value;
    }
  });
}

function sendJson(res, statusCode, payload) {
  res.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8",
  });
  res.end(JSON.stringify(payload));
}

function sendFile(res, filePath) {
  const ext = path.extname(filePath);
  const contentType = mimeTypes[ext] || "text/plain; charset=utf-8";
  fs.readFile(filePath, (error, data) => {
    if (error) {
      sendJson(res, 404, { error: "Not found" });
      return;
    }

    res.writeHead(200, {
      "Content-Type": contentType,
      "Cache-Control": "no-store",
    });
    res.end(data);
  });
}

function getStaticPath(urlPath) {
  if (urlPath === "/" || urlPath === "/index.html") {
    return path.join(workspaceRoot, "index.html");
  }

  const normalized = path.normalize(urlPath).replace(/^(\.\.[/\\])+/, "");
  return path.join(workspaceRoot, normalized);
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let raw = "";
    req.on("data", (chunk) => {
      raw += chunk;
      if (raw.length > 1_000_000) {
        reject(new Error("Request body too large"));
      }
    });
    req.on("end", () => {
      try {
        resolve(raw ? JSON.parse(raw) : {});
      } catch (error) {
        reject(new Error("Invalid JSON body"));
      }
    });
    req.on("error", reject);
  });
}

function buildContext({ scenarioId, toggles, history }) {
  const scenario = scenarioContexts[scenarioId];
  const contextLines = [scenario.summary];

  if (scenarioId === "emotional-support") {
    if (toggles.history) {
      contextLines.push(scenario.context[0]);
    }
    if (toggles.advisor) {
      contextLines.push(scenario.context[1]);
    }
    if (toggles.group) {
      contextLines.push(scenario.context[2]);
    }
  } else {
    contextLines.push(...scenario.context);
  }

  if (history.length) {
    contextLines.push(
      "最近对话历史：" +
        history
          .map((item) => `${item.role === "user" ? "用户" : "小Q"}：${item.text}`)
          .join(" | "),
    );
  }

  return contextLines;
}

function responseSchema() {
  return { type: "json_object" };
}

function buildInstructions({ scenarioId, toggles }) {
  const shared = [
    "你是『伴研小Q』，服务中国研究生在 QQ 场景中的科研沟通与情绪支持。",
    "回答必须自然、温和、具体，不要官腔，不要空泛鸡汤。",
    "如果场景涉及导师沟通，要帮助用户把话说得成熟、清楚、有行动方案，但不要过度卑微。",
    "如果场景涉及情绪支持，不要做心理疾病诊断；只做共情、问题梳理、风险分级和必要的转介提醒。",
    "你必须输出 JSON，不要输出 JSON 以外的任何文字。",
  ];

  if (scenarioId === "emotional-support") {
    shared.push(
      toggles.history || toggles.advisor || toggles.group
        ? "当前允许使用授权上下文，请明确指出压力来源更像任务挤压、关系不确定或群聊压力中的哪一种。"
        : "当前没有更多上下文，只能基于用户当下表达回复，并在 inspector 里说明这一点。",
    );
  }

  return shared.join("\n");
}

function buildUserPrompt({ scenarioId, userInput, toggles, history }) {
  const contextLines = buildContext({ scenarioId, toggles, history });
  return [
    `场景 ID：${scenarioId}`,
    `用户输入：${userInput}`,
    "已知上下文：",
    ...contextLines.map((line) => `- ${line}`),
    "输出要求：",
    "- reply：直接发给用户的话，适合 QQ 私聊语境。",
    "- meta：一句短标签，比如『伴研小Q · 已生成建议』。",
    "- actions：最多 3 个建议动作按钮文案。",
    "- inspector.intents：2 到 4 个标签。",
    "- inspector.contextBase：列出你这次真正参考了哪些信息。",
    "- inspector.outputs：概括你这次的处理策略。",
    "- inspector.signals：给 3 个关键信号，格式为 label/value。",
    "- inspector.risk：green / yellow / red。",
    "- inspector.riskLabel：一句中文风险说明。",
  ].join("\n");
}

function extractTextFromResponse(payload) {
  if (typeof payload.output_text === "string" && payload.output_text.trim()) {
    return payload.output_text.trim();
  }

  if (!Array.isArray(payload.output)) {
    return "";
  }

  return payload.output
    .flatMap((item) => item.content || [])
    .map((item) => item.text || "")
    .join("")
    .trim();
}

function toArray(value, fallback) {
  if (Array.isArray(value)) {
    return value;
  }
  if (typeof value === "string" && value.trim()) {
    return [value.trim()];
  }
  return fallback;
}

function normalizeModelResult(result) {
  const fallbackInspector = {
    intents: ["结果已生成"],
    contextBase: ["模型返回结构已自动修正。"],
    outputs: ["已通过后端容错处理。"],
    signals: [
      { label: "状态", value: "已兼容" },
      { label: "来源", value: "模型响应" },
      { label: "处理", value: "结构修正" },
    ],
    risk: "green",
    riskLabel: "绿色：结构已修正",
  };

  const inspector = result && typeof result.inspector === "object" ? result.inspector : {};

  return {
    reply: typeof result?.reply === "string" && result.reply.trim() ? result.reply : "我先接住你这句话。你可以再发一次，我会继续帮你整理。",
    meta: typeof result?.meta === "string" && result.meta.trim() ? result.meta : "伴研小Q · 已生成",
    actions: toArray(result?.actions, []).slice(0, 3),
    inspector: {
      intents: toArray(inspector.intents, fallbackInspector.intents),
      contextBase: toArray(inspector.contextBase, fallbackInspector.contextBase),
      outputs: toArray(inspector.outputs, fallbackInspector.outputs),
      signals: Array.isArray(inspector.signals) && inspector.signals.length
        ? inspector.signals.map((item) => ({
            label: typeof item?.label === "string" ? item.label : "信号",
            value: typeof item?.value === "string" ? item.value : JSON.stringify(item?.value ?? ""),
          }))
        : fallbackInspector.signals,
      risk: inspector.risk === "yellow" || inspector.risk === "red" ? inspector.risk : "green",
      riskLabel:
        typeof inspector.riskLabel === "string" && inspector.riskLabel.trim()
          ? inspector.riskLabel
          : fallbackInspector.riskLabel,
    },
  };
}

async function generateLiveResponse(body) {
  if (!OPENAI_API_KEY) {
    const error = new Error("缺少 OPENAI_API_KEY。请先在本地配置后再发送。");
    error.statusCode = 503;
    throw error;
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), UPSTREAM_TIMEOUT_MS);

  const response = await fetch(`${OPENAI_BASE_URL}/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: OPENAI_MODEL,
      messages: [
        {
          role: "system",
          content: buildInstructions(body),
        },
        {
          role: "user",
          content: buildUserPrompt(body),
        },
      ],
      response_format: responseSchema(),
    }),
    signal: controller.signal,
  }).catch((error) => {
    if (error.name === "AbortError") {
      const timeoutError = new Error(`上游模型在 ${UPSTREAM_TIMEOUT_MS / 1000} 秒内没有返回，请检查 BASE_URL、MODEL 或稍后重试。`);
      timeoutError.statusCode = 504;
      throw timeoutError;
    }
    throw error;
  });
  clearTimeout(timeout);

  const payload = await response.json();
  if (!response.ok) {
    const message =
      payload.error?.message ||
      `模型请求失败，HTTP ${response.status}`;
    const error = new Error(message);
    error.statusCode = response.status;
    throw error;
  }

  const text = payload.choices?.[0]?.message?.content?.trim() || extractTextFromResponse(payload);
  if (!text) {
    const error = new Error("模型返回为空，暂时无法生成内容。");
    error.statusCode = 502;
    throw error;
  }

  return normalizeModelResult(JSON.parse(text));
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);

  if (req.method === "GET" && url.pathname === "/api/health") {
    sendJson(res, 200, {
      ok: true,
      provider: "openai",
      model: OPENAI_MODEL,
      configured: Boolean(OPENAI_API_KEY),
    });
    return;
  }

  if (req.method === "POST" && url.pathname === "/api/generate") {
    try {
      const body = await readBody(req);
      const result = await generateLiveResponse(body);
      sendJson(res, 200, result);
    } catch (error) {
      sendJson(res, error.statusCode || 500, {
        error: error.message || "生成失败",
      });
    }
    return;
  }

  if (req.method === "GET") {
    sendFile(res, getStaticPath(url.pathname));
    return;
  }

  sendJson(res, 405, { error: "Method not allowed" });
});

server.listen(PORT, HOST, () => {
  console.log(`LabMate demo running at http://${HOST}:${PORT}`);
});
