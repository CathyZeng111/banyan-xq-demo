const scenarioCatalog = {
  "repair-message": {
    title: "高危消息安全伞",
    composerLabel: "当前演示输入",
    starterText: "我把离心机转子搞坏了，王导肯定要骂死我，怎么办啊？",
    emptyTip: "把一段慌乱的大白话，变成能发给导师的成熟汇报。",
    inspector: {
      intents: ["沟通改写", "高风险汇报", "低门槛求助"],
      contextBase: [
        "等待真实请求中。发送后会基于当前场景生成导师沟通建议。",
      ],
      outputs: [
        "先做情绪降温，再进入事实组织。",
        "默认给出责任态度与补救动作。",
      ],
      signals: [
        { label: "情绪类型", value: "待识别" },
        { label: "任务性质", value: "设备事故汇报" },
        { label: "建议动作", value: "待生成" },
      ],
      risk: "green",
      riskLabel: "绿色：常规支持",
    },
  },
  "advisor-translate": {
    title: "导师意图翻译器",
    composerLabel: "当前演示输入",
    starterText: "老师刚发我一句：这个部分你看着办，别再太散了。我根本不知道他到底要我干嘛。",
    emptyTip: "把模糊导师话术拆成显性要求、潜在期待和下一步动作。",
    inspector: {
      intents: ["导师语义解析", "任务拆解", "回复建议"],
      contextBase: [
        "等待真实请求中。发送后会解析导师意图并给出建议回复。",
      ],
      outputs: [
        "拆开显性要求和潜在期待。",
        "生成低风险确认消息。",
      ],
      signals: [
        { label: "关系信号", value: "待识别" },
        { label: "交付物", value: "待判断" },
        { label: "预估时点", value: "待生成" },
      ],
      risk: "green",
      riskLabel: "绿色：常规支持",
    },
  },
  "lab-rag": {
    title: "课题组隐性知识外脑",
    composerLabel: "当前演示输入",
    starterText: "BCA 蛋白定量试剂盒放在哪个冰箱了？我不敢在大群问。",
    emptyTip: "先私聊问小Q，再决定要不要去群里打扰别人。",
    inspector: {
      intents: ["RAG 检索", "群资料问答", "提问缓冲带"],
      contextBase: [
        "当前会用预置的课题组资料摘要辅助生成更像真的回答。",
      ],
      outputs: [
        "优先直接回答。",
        "答不上时会生成礼貌提问模板。",
      ],
      signals: [
        { label: "检索置信度", value: "待生成" },
        { label: "信息类型", value: "实验室资料" },
        { label: "后备方案", value: "礼貌提问" },
      ],
      risk: "green",
      riskLabel: "绿色：常规支持",
    },
  },
  "emotional-support": {
    title: "情绪树洞与风险转介",
    composerLabel: "当前演示输入",
    starterText: "我这周真的有点顶不住了，感觉一直在被催，但是又不知道先做哪个。",
    emptyTip: "这里会展示上下文增强后的情绪支持，和普通陪聊 AI 区分开。",
    inspector: {
      intents: ["情绪支持", "上下文化理解", "风险分级"],
      contextBase: [
        "打开右侧开关后，回复会结合授权上下文来判断压力来源。",
      ],
      outputs: [
        "先共情，再定位压力来源。",
        "给出最小行动建议，必要时提示转介。",
      ],
      signals: [
        { label: "压力来源", value: "待判断" },
        { label: "关系状态", value: "待判断" },
        { label: "支持动作", value: "待生成" },
      ],
      risk: "yellow",
      riskLabel: "黄色：持续压力，建议支持与转介准备",
    },
  },
};

const chatThread = document.querySelector("#chat-thread");
const composerLabel = document.querySelector("#composer-label");
const composerInput = document.querySelector("#composer-input");
const scenarioTitle = document.querySelector("#scenario-title");
const intentPills = document.querySelector("#intent-pills");
const contextList = document.querySelector("#context-list");
const signalGrid = document.querySelector("#signal-grid");
const outputList = document.querySelector("#output-list");
const riskFill = document.querySelector("#risk-fill");
const riskLabel = document.querySelector("#risk-label");
const sendButton = document.querySelector("#replay-button");
const autoplayButton = document.querySelector("#autoplay-button");

const toggleHistory = document.querySelector("#toggle-history");
const toggleAdvisor = document.querySelector("#toggle-advisor");
const toggleGroup = document.querySelector("#toggle-group");

const state = {
  activeScenarioId: "repair-message",
  histories: {},
  inspectorByScenario: {},
  drafts: {},
  currentRequestId: 0,
};

function nowTimeLabel() {
  return new Intl.DateTimeFormat("zh-CN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(new Date());
}

function getToggles() {
  return {
    history: toggleHistory.checked,
    advisor: toggleAdvisor.checked,
    group: toggleGroup.checked,
  };
}

function seedScenarioState(scenarioId) {
  if (!state.histories[scenarioId]) {
    state.histories[scenarioId] = {
      startedAt: nowTimeLabel(),
      messages: [],
    };
  }

  if (!state.inspectorByScenario[scenarioId]) {
    state.inspectorByScenario[scenarioId] = structuredClone(scenarioCatalog[scenarioId].inspector);
  }

  if (!(scenarioId in state.drafts)) {
    state.drafts[scenarioId] = scenarioCatalog[scenarioId].starterText;
  }
}

function renderInspector(inspector) {
  const safeInspector = normalizeInspector(inspector);

  intentPills.innerHTML = "";
  safeInspector.intents.forEach((intent) => {
    const pill = document.createElement("span");
    pill.className = "pill";
    pill.textContent = intent;
    intentPills.appendChild(pill);
  });

  contextList.innerHTML = "";
  safeInspector.contextBase.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    contextList.appendChild(li);
  });

  signalGrid.innerHTML = "";
  safeInspector.signals.forEach((signal) => {
    const card = document.createElement("div");
    card.className = "signal-card";

    const label = document.createElement("p");
    label.className = "signal-label";
    label.textContent = signal.label;

    const value = document.createElement("p");
    value.className = "signal-value";
    value.textContent = signal.value;

    card.append(label, value);
    signalGrid.appendChild(card);
  });

  outputList.innerHTML = "";
  safeInspector.outputs.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    outputList.appendChild(li);
  });

  riskFill.className = "risk-fill";
  if (safeInspector.risk === "red") {
    riskFill.classList.add("risk-red");
  } else if (safeInspector.risk === "yellow") {
    riskFill.classList.add("risk-yellow");
  } else {
    riskFill.classList.add("risk-green");
  }
  riskLabel.textContent = safeInspector.riskLabel;
}

function normalizeArray(value, fallback) {
  if (Array.isArray(value)) {
    return value;
  }
  if (typeof value === "string" && value.trim()) {
    return [value.trim()];
  }
  return fallback;
}

function normalizeInspector(inspector) {
  const fallback = {
    intents: ["结果已返回"],
    contextBase: ["模型返回的结构不完整，已做兼容展示。"],
    outputs: ["已回退到前端容错渲染。"],
    signals: [
      { label: "状态", value: "已兼容" },
      { label: "来源", value: "模型响应" },
      { label: "处理", value: "自动修复结构" },
    ],
    risk: "green",
    riskLabel: "绿色：已完成兼容展示",
  };

  if (!inspector || typeof inspector !== "object") {
    return fallback;
  }

  const signals = Array.isArray(inspector.signals)
    ? inspector.signals
        .filter((item) => item && typeof item === "object")
        .map((item) => ({
          label: typeof item.label === "string" ? item.label : "信号",
          value: typeof item.value === "string" ? item.value : JSON.stringify(item.value ?? ""),
        }))
    : fallback.signals;

  const risk = inspector.risk === "red" || inspector.risk === "yellow" || inspector.risk === "green"
    ? inspector.risk
    : "green";

  return {
    intents: normalizeArray(inspector.intents, fallback.intents),
    contextBase: normalizeArray(inspector.contextBase, fallback.contextBase),
    outputs: normalizeArray(inspector.outputs, fallback.outputs),
    signals: signals.length ? signals : fallback.signals,
    risk,
    riskLabel:
      typeof inspector.riskLabel === "string" && inspector.riskLabel.trim()
        ? inspector.riskLabel
        : fallback.riskLabel,
  };
}

function messageNode(item) {
  if (item.type === "time") {
    const divider = document.createElement("div");
    divider.className = "time-divider";
    divider.textContent = item.text;
    return divider;
  }

  if (item.type === "system") {
    const tip = document.createElement("div");
    tip.className = "system-tip";
    tip.textContent = item.text;
    return tip;
  }

  const row = document.createElement("div");
  row.className = `message-row ${item.role}`;

  const avatar = document.createElement("div");
  avatar.className = `avatar ${item.role}`;
  avatar.textContent = item.role === "bot" ? "伴" : "研";

  const stack = document.createElement("div");
  stack.className = "message-stack";

  const bubble = document.createElement("div");
  bubble.className = "message-bubble";
  bubble.textContent = item.text;

  const meta = document.createElement("div");
  meta.className = "inline-meta";
  meta.textContent = item.meta || "";

  stack.appendChild(bubble);
  stack.appendChild(meta);

  if (item.actions?.length) {
    const actionGroup = document.createElement("div");
    actionGroup.className = "action-group";
    item.actions.forEach((label) => {
      const button = document.createElement("button");
      button.className = "inline-action";
      button.textContent = label;
      button.addEventListener("click", () => {
        composerInput.value = label;
        composerInput.focus();
      });
      actionGroup.appendChild(button);
    });
    stack.appendChild(actionGroup);
  }

  if (item.role === "user") {
    row.appendChild(stack);
    row.appendChild(avatar);
  } else {
    row.appendChild(avatar);
    row.appendChild(stack);
  }

  return row;
}

function renderScenario(scenarioId, options = {}) {
  const { syncDraft = true } = options;
  state.activeScenarioId = scenarioId;
  seedScenarioState(scenarioId);

  const scenario = scenarioCatalog[scenarioId];
  scenarioTitle.textContent = scenario.title;
  composerLabel.textContent = scenario.composerLabel;
  if (syncDraft) {
    composerInput.value = state.drafts[scenarioId];
  }

  const history = state.histories[scenarioId];
  chatThread.innerHTML = "";
  chatThread.appendChild(messageNode({ type: "time", text: history.startedAt }));

  if (history.messages.length === 0) {
    chatThread.appendChild(messageNode({ type: "system", text: scenario.emptyTip }));
  } else {
    history.messages.forEach((message) => {
      chatThread.appendChild(messageNode(message));
    });
  }

  renderInspector(state.inspectorByScenario[scenarioId]);

  document.querySelectorAll(".scenario-card").forEach((button) => {
    button.classList.toggle("active", button.dataset.scenario === scenarioId);
  });

  chatThread.scrollTop = chatThread.scrollHeight;
}

function pushMessage(scenarioId, message) {
  state.histories[scenarioId].messages.push(message);
  renderScenario(scenarioId, { syncDraft: false });
}

function buildInspectorError(errorMessage) {
  return {
    intents: ["连接异常"],
    contextBase: [errorMessage],
    outputs: ["请先在本地配置 API Key，再重新发送。"],
    signals: [
      { label: "状态", value: "未连接" },
      { label: "后端", value: "需要配置" },
      { label: "建议动作", value: "补充环境变量" },
    ],
    risk: "green",
    riskLabel: "绿色：等待配置",
  };
}

async function requestLiveResponse() {
  const scenarioId = state.activeScenarioId;
  const userInput = composerInput.value.trim();
  if (!userInput) {
    return;
  }

  seedScenarioState(scenarioId);
  const requestId = ++state.currentRequestId;
  const toggles = getToggles();
  const history = state.histories[scenarioId].messages
    .filter((item) => item.type === "message")
    .slice(-6)
    .map((item) => ({ role: item.role, text: item.text }));

  pushMessage(scenarioId, {
    type: "message",
    role: "user",
    meta: "我 · 刚刚",
    text: userInput,
  });

  state.drafts[scenarioId] = "";
  composerInput.value = "";
  sendButton.disabled = true;
  sendButton.textContent = "思考中";

  try {
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        scenarioId,
        userInput,
        toggles,
        history,
      }),
    });

    const payload = await response.json();

    if (requestId !== state.currentRequestId) {
      return;
    }

    if (!response.ok) {
      throw new Error(payload.error || "生成失败");
    }

    pushMessage(scenarioId, {
      type: "message",
      role: "bot",
      meta: payload.meta || "伴研小Q · 已生成",
      text: payload.reply,
      actions: payload.actions || [],
    });

    state.inspectorByScenario[scenarioId] = payload.inspector;
    renderScenario(scenarioId, { syncDraft: false });
  } catch (error) {
    const message = error.message || "生成失败，请稍后重试。";
    pushMessage(scenarioId, {
      type: "system",
      text: message,
    });
    state.inspectorByScenario[scenarioId] = buildInspectorError(message);
    renderScenario(scenarioId, { syncDraft: false });
  } finally {
    sendButton.disabled = false;
    sendButton.textContent = "发送";
  }
}

function autoplayScenarios() {
  const order = ["repair-message", "advisor-translate", "lab-rag", "emotional-support"];
  let index = 0;

  clearInterval(state.autoplayTimer);
  renderScenario(order[index]);

  state.autoplayTimer = setInterval(() => {
    index += 1;
    if (index >= order.length) {
      clearInterval(state.autoplayTimer);
      return;
    }
    renderScenario(order[index]);
  }, 2600);
}

document.querySelectorAll("[data-scenario]").forEach((button) => {
  button.addEventListener("click", () => {
    clearInterval(state.autoplayTimer);
    renderScenario(button.dataset.scenario);
  });
});

composerInput.addEventListener("input", () => {
  state.drafts[state.activeScenarioId] = composerInput.value;
});

[toggleHistory, toggleAdvisor, toggleGroup].forEach((toggle) => {
  toggle.addEventListener("change", () => {
    const scenarioId = state.activeScenarioId;
    if (scenarioId === "emotional-support") {
      state.inspectorByScenario[scenarioId] = structuredClone(scenarioCatalog[scenarioId].inspector);
      renderScenario(scenarioId);
    }
  });
});

sendButton.addEventListener("click", requestLiveResponse);
composerInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && !event.shiftKey) {
    event.preventDefault();
    requestLiveResponse();
  }
});

autoplayButton.addEventListener("click", autoplayScenarios);

Object.keys(scenarioCatalog).forEach(seedScenarioState);
renderScenario(state.activeScenarioId);
