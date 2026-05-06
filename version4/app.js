const scenarioCatalog = {
  "repair-message": {
    title: "高危消息安全伞",
    placeholder: "帮我改一段给导师的话",
    starterText: "导师刚刚说的话我不理解什么意思？我现在有点难受因为...",
    emptyTip: "你的科研沟通小助手，也是情绪低谷时可以倾诉的人",
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
    placeholder: "导师这句话什么意思？",
    starterText: "老师刚发我一句：这个部分你看着办，别再太散了。我根本不知道他到底要我干嘛。",
    emptyTip: "你的科研沟通小助手，也是情绪低谷时可以倾诉的人",
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
    placeholder: "问问实验室资料",
    starterText: "BCA 蛋白定量试剂盒放在哪个冰箱了？我不敢在大群问。",
    emptyTip: "你的科研沟通小助手，也是情绪低谷时可以倾诉的人",
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
    placeholder: "我现在有点撑不住了",
    starterText: "我这周真的有点顶不住了，感觉一直在被催，但是又不知道先做哪个。",
    emptyTip: "你的科研沟通小助手，也是情绪低谷时可以倾诉的人",
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

const onboardingConfig = {
  studentIdentities: ["学硕", "专硕", "直博", "普博"],
  painPoints: [
    "实验做错、出问题，不敢主动找导师汇报",
    "科研进度停滞，不知道怎么跟导师交代",
    "看不懂导师的言外之意、潜台词",
    "不会委婉拒绝导师不合理安排 / 额外杂活",
    "不知道怎么主动找导师汇报进度、约沟通",
    "跟导师聊天容易紧张、不会组织语言",
  ],
  advisorStyles: [
    "散养佛系型",
    "严格高要求型",
    "任务指派型",
    "温柔引导型",
    "大忙人极简型",
  ],
  advisorFocuses: [
    "科研进度按时推进",
    "实验数据真实、逻辑严谨",
    "定期主动汇报，不消失失联",
    "论文成果、专利、项目产出",
    "做事态度、执行力",
    "团队协作、课题组分内事务",
  ],
  advisorTaboos: [
    "反感临时突然打扰，不喜欢无准备的提问",
    "反感拖延、临时赶 ddl、无故滞后",
    "反感说话敷衍、理由太多、不务实",
    "反感学生不主动、从来不找自己沟通",
    "反感闲聊客套，喜欢直奔主题",
  ],
  welcome:
    "哈喽～我是你的专属研途好友「伴研小 Q」😉\n初次见面，帮我简单了解下你和你的导师，我就能精准帮你解读导师消息、定制回话、避开沟通雷区～\n只需 30 秒，我们开始建档吧！",
  completion:
    "已为你完成「个人沟通档案 + 导师专属画像」✅\n往后你只要把和导师的 QQ 聊天截图发给我，我会：\n结合你的性格困惑，帮你低压力回话\n结合导师风格 & 雷区，解读潜台词、避开沟通禁忌\n自动提炼任务待办、截止时间，帮你梳理科研进度",
};

const onboardingStorageKey = "version3-companion-profile";

const importedChatData = window.VERSION3_CHAT_DATA || {};
const importedCompanionScenarioData = importedChatData.companion?.scenarios || {};
const conversationCatalog = importedChatData.conversations || {
  companion: {
    name: "伴研小Q",
    status: "在线 · WiFi",
    avatarText: "伴",
  },
};

const chatThread = document.querySelector("#chat-thread");
const composerInput = document.querySelector("#composer-input");
const plainComposer = document.querySelector("#plain-composer");
const plainComposerInput = document.querySelector("#plain-composer-input");
const scenarioTitle = document.querySelector("#scenario-title");
const chatName = document.querySelector("#chat-name");
const phoneScreen = document.querySelector(".phone-screen");
const consentCard = document.querySelector(".consent-card");
const consentCopy = document.querySelector(".consent-copy");
const draftBox = document.querySelector(".draft-box");
const intentPills = document.querySelector("#intent-pills");
const contextList = document.querySelector("#context-list");
const signalGrid = document.querySelector("#signal-grid");
const outputList = document.querySelector("#output-list");
const riskFill = document.querySelector("#risk-fill");
const riskLabel = document.querySelector("#risk-label");
const sendButton = document.querySelector("#replay-button");
const autoplayButton = document.querySelector("#autoplay-button");
const inputRow = document.querySelector(".input-row");
const toolRow = document.querySelector(".tool-row");
const enableContextButton = document.querySelector("#enable-context-button");
const skipContextButton = document.querySelector("#skip-context-button");
const groupPicker = document.querySelector("#group-picker");
const headerLeft = document.querySelector(".header-left");
const chatStatus = document.querySelector("#chat-status");
const contactOverlay = document.querySelector("#contact-overlay");
const groupOverlay = document.querySelector("#group-overlay");
const homeOverlay = document.querySelector("#home-overlay");
const contactOverlayBack = document.querySelector("#contact-overlay-back");
const groupOverlayBack = document.querySelector("#group-overlay-back");
const openGroupSelectorButton = document.querySelector("#open-group-selector");

const toggleHistory = document.querySelector("#toggle-history");
const toggleAdvisor = document.querySelector("#toggle-advisor");
const toggleGroup = document.querySelector("#toggle-group");
const consentCopyFullText =
  "你可以选择是否授权小Q参考你与导师的历史沟通摘要、已加入的课题组群资料。与小Q的对话会自动保存在记忆中。授权后，小Q能更准确理解你的压力来源。";

const state = {
  activeConversationId: "companion",
  activeScenarioId: "repair-message",
  histories: {},
  inspectorByScenario: {},
  drafts: {},
  companionBaseMessages: [],
  conversationThreads: {},
  conversationDrafts: {},
  selectedGroups: [],
  customGroupCount: 0,
  currentRequestId: 0,
  onboarding: loadOnboardingState(),
};

function isCompanionChat() {
  return state.activeConversationId === "companion";
}

function getActiveConversation() {
  return conversationCatalog[state.activeConversationId] || conversationCatalog.companion;
}

function isGroupConversation() {
  return !isCompanionChat() && getActiveConversation()?.status === "群聊";
}

function deriveAvatarText(item) {
  if (item.role !== "bot") {
    return "研";
  }

  if (isGroupConversation() && typeof item.meta === "string" && item.meta.trim()) {
    const speaker = item.meta.split("·")[0].trim();
    return speaker.slice(0, 1) || "群";
  }

  return item.avatarText || getActiveConversation().avatarText || "伴";
}

function defaultOnboardingState() {
  return {
    completed: false,
    currentStep: 1,
    student: {
      identity: "",
      discipline: "",
      mbti: "",
      painPoints: [],
      painPointOther: "",
    },
    advisor: {
      title: "",
      style: "",
      focuses: [],
      taboos: [],
      tabooOther: "",
    },
    summary: "",
    generatedAt: "",
    consentExperienced: false,
  };
}

function normalizeStringArray(value) {
  if (!Array.isArray(value)) {
    return [];
  }
  return value.filter((item) => typeof item === "string" && item.trim());
}

function loadOnboardingState() {
  const fallback = defaultOnboardingState();
  try {
    const raw = window.localStorage.getItem(onboardingStorageKey);
    if (!raw) {
      return fallback;
    }
    const parsed = JSON.parse(raw);
    return {
      completed: Boolean(parsed?.completed),
      currentStep: parsed?.currentStep === 2 ? 2 : 1,
      student: {
        identity: typeof parsed?.student?.identity === "string" ? parsed.student.identity : "",
        discipline: typeof parsed?.student?.discipline === "string" ? parsed.student.discipline : "",
        mbti: typeof parsed?.student?.mbti === "string" ? parsed.student.mbti : "",
        painPoints: normalizeStringArray(parsed?.student?.painPoints),
        painPointOther: typeof parsed?.student?.painPointOther === "string" ? parsed.student.painPointOther : "",
      },
      advisor: {
        title: typeof parsed?.advisor?.title === "string" ? parsed.advisor.title : "",
        style: typeof parsed?.advisor?.style === "string" ? parsed.advisor.style : "",
        focuses: normalizeStringArray(parsed?.advisor?.focuses),
        taboos: normalizeStringArray(parsed?.advisor?.taboos),
        tabooOther: typeof parsed?.advisor?.tabooOther === "string" ? parsed.advisor.tabooOther : "",
      },
      summary: typeof parsed?.summary === "string" ? parsed.summary : "",
      generatedAt: typeof parsed?.generatedAt === "string" ? parsed.generatedAt : "",
      consentExperienced: Boolean(parsed?.consentExperienced),
    };
  } catch {
    return fallback;
  }
}

function saveOnboardingState() {
  try {
    window.localStorage.setItem(onboardingStorageKey, JSON.stringify(state.onboarding));
  } catch {
    // ignore storage failures in demo mode
  }
}

function shouldShowOnboarding() {
  return isCompanionChat() && !state.onboarding.completed;
}

function shouldCompactConsentCard() {
  return isCompanionChat() && state.onboarding.completed && state.onboarding.consentExperienced;
}

function markConsentExperienced() {
  if (state.onboarding.consentExperienced) {
    return;
  }
  state.onboarding.consentExperienced = true;
  saveOnboardingState();
}

function toggleListValue(list, value) {
  return list.includes(value) ? list.filter((item) => item !== value) : [...list, value];
}

function hasStudentPainPoint() {
  return (
    state.onboarding.student.painPoints.length > 0 ||
    Boolean(state.onboarding.student.painPointOther.trim())
  );
}

function hasAdvisorTaboo() {
  return (
    state.onboarding.advisor.taboos.length > 0 ||
    Boolean(state.onboarding.advisor.tabooOther.trim())
  );
}

function canAdvanceOnboardingStepOne() {
  const student = state.onboarding.student;
  return Boolean(student.identity && student.discipline.trim() && student.mbti.trim() && hasStudentPainPoint());
}

function canCompleteOnboarding() {
  const advisor = state.onboarding.advisor;
  return Boolean(
    advisor.title.trim() &&
      advisor.style &&
      advisor.focuses.length > 0 &&
      hasAdvisorTaboo()
  );
}

function formatProfileList(selected, extra) {
  const values = [...selected];
  if (extra.trim()) {
    values.push(extra.trim());
  }
  return values.join("、");
}

function buildCommunicationModelSummary() {
  const { student, advisor } = state.onboarding;
  return [
    `你的个人档案：${student.identity}，研究方向 ${student.discipline.trim()}，MBTI ${student.mbti.trim()}`,
    `你的核心沟通困扰：${formatProfileList(student.painPoints, student.painPointOther)}`,
    `导师称呼：${advisor.title.trim()}，导师风格：${advisor.style}`,
    `导师最看重：${advisor.focuses.join("、")}`,
    `沟通雷区：${formatProfileList(advisor.taboos, advisor.tabooOther)}`,
    "专属沟通模型：我会优先用低压力、可执行、不过度冒犯的方式帮你组织表达，并避开导师最反感的沟通方式。",
  ].join("\n");
}

function buildProfileContextPayload() {
  if (!state.onboarding.completed) {
    return null;
  }

  const { student, advisor } = state.onboarding;
  return {
    studentIdentity: student.identity,
    discipline: student.discipline.trim(),
    mbti: student.mbti.trim(),
    painPoints: [...student.painPoints, student.painPointOther.trim()].filter(Boolean),
    advisorTitle: advisor.title.trim(),
    advisorStyle: advisor.style,
    advisorFocuses: advisor.focuses,
    advisorTaboos: [...advisor.taboos, advisor.tabooOther.trim()].filter(Boolean),
    communicationModel: state.onboarding.summary,
  };
}

function syncCompanionBaseMessages() {
  if (!state.onboarding.completed || !state.onboarding.summary) {
    state.companionBaseMessages = [];
    return;
  }

  state.companionBaseMessages = [
    {
      type: "message",
      role: "bot",
      meta: "伴研小Q · 建档完成",
      text: onboardingConfig.completion,
    },
    {
      type: "message",
      role: "bot",
      meta: "专属沟通模型",
      text: state.onboarding.summary,
    },
  ];
}

function buildHomeCompanionMessages() {
  const scenarioMessages = state.histories[state.activeScenarioId]?.messages || [];

  if (shouldShowOnboarding()) {
    return [
      {
        type: "message",
        role: "bot",
        meta: "伴研小Q · 初次见面",
        text: onboardingConfig.welcome,
      },
      ...scenarioMessages,
    ];
  }

  return [...state.companionBaseMessages, ...scenarioMessages];
}

function extractPreviewTime(message, fallback) {
  if (!message || typeof message !== "object") {
    return fallback;
  }

  if (typeof message.meta === "string" && message.meta.includes("·")) {
    const timeLabel = message.meta.split("·").pop()?.trim();
    if (timeLabel) {
      return timeLabel;
    }
  }

  return fallback;
}

function extractPreviewText(conversationId, message) {
  if (!message || typeof message !== "object") {
    return "";
  }

  if (message.type === "system") {
    return message.text || "";
  }

  const rawText = typeof message.text === "string" ? message.text.trim() : "";
  if (!rawText) {
    return "";
  }

  if (conversationId === "companion") {
    return rawText;
  }

  if (message.role === "user") {
    return `我：${rawText}`;
  }

  if (isGroupConversationId(conversationId) && typeof message.meta === "string" && message.meta.includes("·")) {
    const speaker = message.meta.split("·")[0].trim();
    return speaker ? `${speaker}：${rawText}` : rawText;
  }

  return rawText;
}

function isGroupConversationId(conversationId) {
  return conversationCatalog[conversationId]?.status === "群聊";
}

function syncHomeConversationList() {
  document.querySelectorAll(".home-conversation-row").forEach((row) => {
    const conversationId = row.dataset.chatId || "companion";
    const previewNode = row.querySelector(".home-conversation-main p");
    const timeNode = row.querySelector(".home-conversation-top span");

    if (!previewNode || !timeNode) {
      return;
    }

    let messages = [];
    let fallbackTime = "刚刚";

    if (conversationId === "companion") {
      seedScenarioState(state.activeScenarioId);
      messages = buildHomeCompanionMessages();
      fallbackTime = state.histories[state.activeScenarioId]?.startedAt || "刚刚";
    } else {
      seedConversationState(conversationId);
      messages = state.conversationThreads[conversationId]?.messages || [];
      fallbackTime = state.conversationThreads[conversationId]?.startedAt || "刚刚";
    }

    const latestMessage = [...messages].reverse().find((item) => item && (item.text || item.meta));
    const previewText = extractPreviewText(conversationId, latestMessage);

    previewNode.textContent = previewText || "暂无新消息";
    timeNode.textContent = extractPreviewTime(latestMessage, fallbackTime);
  });
}

function onboardingInspector() {
  if (state.onboarding.completed) {
    return {
      intents: ["建档完成", "个性化沟通模型", "导师画像"],
      contextBase: ["已完成研究生个人档案和导师画像建档。"],
      outputs: ["后续分析会结合你的性格短板与导师雷区。"],
      signals: [
        { label: "档案状态", value: "已完成" },
        { label: "导师风格", value: state.onboarding.advisor.style || "未填写" },
        { label: "沟通模式", value: "个性化输出" },
      ],
      risk: "green",
      riskLabel: "绿色：建档完成",
    };
  }

  return {
    intents: ["首次建档", "研究生画像", "导师画像"],
    contextBase: ["首次使用先完成两步建档，后续分析会更精准。"],
    outputs: ["第 1 步：研究生自我档案", "第 2 步：导师画像档案"],
    signals: [
      { label: "当前步骤", value: `第 ${state.onboarding.currentStep} 步` },
      { label: "档案状态", value: "待完成" },
      { label: "后续能力", value: "自动生成专属沟通模型" },
    ],
    risk: "green",
    riskLabel: "绿色：建档引导中",
  };
}

function nowTimeLabel() {
  return new Intl.DateTimeFormat("zh-CN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(new Date());
}

function getToggles() {
  return {
    history: toggleHistory ? toggleHistory.checked : true,
    advisor: (toggleAdvisor ? toggleAdvisor.checked : true) || hasSelectedAdvisorContext(),
    group: (toggleGroup ? toggleGroup.checked : true) || getSelectedGroupContextNames().length > 0,
  };
}

function findConversationIdByName(name) {
  return Object.keys(conversationCatalog).find((conversationId) => {
    return conversationCatalog[conversationId]?.name === name;
  });
}

function getConversationThread(conversationId) {
  if (!conversationId || conversationId === "companion") {
    return null;
  }

  seedConversationState(conversationId);
  return state.conversationThreads[conversationId] || normalizeThread(null, nowTimeLabel());
}

function getSelectedContextNames() {
  return state.selectedGroups
    .map((groupId) => document.querySelector(`.group-chip[data-group-id="${groupId}"]`))
    .filter(Boolean)
    .map((chip) => chip.textContent.trim())
    .filter(Boolean);
}

function hasSelectedAdvisorContext() {
  return getSelectedContextNames().includes("王老师");
}

function getSelectedGroupContextNames() {
  return getSelectedContextNames().filter((name) => name !== "王老师");
}

function summarizeMessages(messages, limit = 4) {
  return messages
    .filter((item) => item && item.type === "message" && typeof item.text === "string" && item.text.trim())
    .slice(-limit)
    .map((item) => ({
      role: item.role === "user" ? "user" : "bot",
      meta: typeof item.meta === "string" ? item.meta : "",
      text: item.text,
    }));
}

function buildAuthorizedContextPayload() {
  const payload = {
    advisorMessages: [],
    groupMessages: [],
  };

  if ((toggleAdvisor ? toggleAdvisor.checked : true) || hasSelectedAdvisorContext()) {
    const advisorThread = getConversationThread("advisor");
    payload.advisorMessages = summarizeMessages(advisorThread?.messages || [], 6);
  }

  const selectedGroupNames = getSelectedGroupContextNames();
  if ((toggleGroup ? toggleGroup.checked : true) || selectedGroupNames.length) {
    payload.groupMessages = selectedGroupNames.map((groupName) => {
      const conversationId = findConversationIdByName(groupName);
      const thread = getConversationThread(conversationId);
      return {
        name: groupName,
        messages: summarizeMessages(thread?.messages || [], 6),
      };
    });
  }

  return payload;
}

function normalizeActions(actions) {
  if (!Array.isArray(actions)) {
    return [];
  }
  return actions.filter((item) => typeof item === "string" && item.trim());
}

function normalizeMessage(message) {
  if (!message || typeof message !== "object") {
    return null;
  }

  if (message.type === "system") {
    return {
      type: "system",
      text: typeof message.text === "string" ? message.text : "",
    };
  }

  return {
    type: "message",
    role: message.role === "user" ? "user" : "bot",
    meta: typeof message.meta === "string" ? message.meta : "",
    text: typeof message.text === "string" ? message.text : "",
    actions: normalizeActions(message.actions),
    avatarText: typeof message.avatarText === "string" ? message.avatarText : "",
  };
}

function normalizeThread(thread, fallbackStartedAt) {
  if (!thread || typeof thread !== "object") {
    return {
      startedAt: fallbackStartedAt,
      messages: [],
    };
  }

  return {
    startedAt:
      typeof thread.startedAt === "string" && thread.startedAt.trim()
        ? thread.startedAt
        : fallbackStartedAt,
    messages: Array.isArray(thread.messages)
      ? thread.messages.map(normalizeMessage).filter(Boolean)
      : [],
  };
}

function seedScenarioState(scenarioId) {
  const importedScenario = importedCompanionScenarioData[scenarioId] || {};
  if (!state.histories[scenarioId]) {
    state.histories[scenarioId] = normalizeThread(importedScenario.thread, nowTimeLabel());
  }

  if (!state.inspectorByScenario[scenarioId]) {
    state.inspectorByScenario[scenarioId] = structuredClone(scenarioCatalog[scenarioId].inspector);
  }

  if (!(scenarioId in state.drafts)) {
    state.drafts[scenarioId] = "";
  }
}

function seedConversationState(conversationId) {
  const conversation = conversationCatalog[conversationId];
  if (!conversation || conversationId === "companion") {
    return;
  }

  if (!state.conversationThreads[conversationId]) {
    state.conversationThreads[conversationId] = normalizeThread(conversation.thread, nowTimeLabel());
  }

  if (!(conversationId in state.conversationDrafts)) {
    state.conversationDrafts[conversationId] = typeof conversation.draft === "string" ? conversation.draft : "";
  }
}

function renderInspector(inspector) {
  if (!intentPills || !contextList || !signalGrid || !outputList || !riskFill || !riskLabel) {
    return;
  }

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

function profileChoiceButton({ label, active, onClick }) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = `profile-choice${active ? " active" : ""}`;
  button.textContent = label;
  button.addEventListener("click", onClick);
  return button;
}

function profileField(title, control) {
  const section = document.createElement("section");
  section.className = "profile-field";

  const label = document.createElement("p");
  label.className = "profile-label";
  label.textContent = title;

  section.append(label, control);
  return section;
}

function profileTextarea(value, placeholder, onInput, rows = 2) {
  const textarea = document.createElement("textarea");
  textarea.className = "profile-textarea";
  textarea.rows = rows;
  textarea.placeholder = placeholder;
  textarea.value = value;
  textarea.addEventListener("input", onInput);
  textarea.addEventListener("change", () => {
    rerenderOnboardingPreserveScroll();
  });
  return textarea;
}

function rerenderOnboardingPreserveScroll() {
  const previousScrollTop = chatThread.scrollTop;
  renderScenario(state.activeScenarioId, { syncDraft: false, keepScroll: true, previousScrollTop });
}

function inferScenarioFromInput(text) {
  const content = typeof text === "string" ? text.trim() : "";
  if (!content) {
    return state.activeScenarioId;
  }

  if (
    /不理解|什么意思|潜台词|言外之意|看着办|老师刚说|导师刚说|怎么理解/.test(content)
  ) {
    return "advisor-translate";
  }

  if (
    /试剂盒|冰箱|群里|资料|实验室|在哪|放哪|耗材|仪器|平台|答疑/.test(content)
  ) {
    return "lab-rag";
  }

  if (
    /难受|撑不住|崩溃|焦虑|压力|想哭|顶不住|害怕|委屈|情绪/.test(content)
  ) {
    return "emotional-support";
  }

  return "repair-message";
}

function renderOnboardingCard() {
  const card = document.createElement("div");
  card.className = "profile-card";

  const eyebrow = document.createElement("p");
  eyebrow.className = "profile-eyebrow";
  eyebrow.textContent = state.onboarding.currentStep === 1
    ? "第 1 步 / 研究生自我档案"
    : "第 2 步 / 导师画像档案";

  const title = document.createElement("h3");
  title.className = "profile-title";
  title.textContent = state.onboarding.currentStep === 1 ? "先了解你" : "再了解你的导师";

  card.append(eyebrow, title);

  if (state.onboarding.currentStep === 1) {
    const identityWrap = document.createElement("div");
    identityWrap.className = "profile-chip-grid";
    onboardingConfig.studentIdentities.forEach((identity) => {
      identityWrap.appendChild(
        profileChoiceButton({
          label: identity,
          active: state.onboarding.student.identity === identity,
          onClick: () => {
            state.onboarding.student.identity = identity;
            saveOnboardingState();
            rerenderOnboardingPreserveScroll();
          },
        })
      );
    });

    const disciplineInput = profileTextarea(
      state.onboarding.student.discipline,
      "输入你的所属学科 / 研究方向",
      (event) => {
        state.onboarding.student.discipline = event.target.value;
        saveOnboardingState();
      },
      2
    );

    const mbtiInput = profileTextarea(
      state.onboarding.student.mbti,
      "输入你的 MBTI",
      (event) => {
        state.onboarding.student.mbti = event.target.value.toUpperCase();
        saveOnboardingState();
      },
      1
    );

    const painWrap = document.createElement("div");
    painWrap.className = "profile-option-list";
    onboardingConfig.painPoints.forEach((painPoint) => {
      painWrap.appendChild(
        profileChoiceButton({
          label: painPoint,
          active: state.onboarding.student.painPoints.includes(painPoint),
          onClick: () => {
            state.onboarding.student.painPoints = toggleListValue(state.onboarding.student.painPoints, painPoint);
            saveOnboardingState();
            rerenderOnboardingPreserveScroll();
          },
        })
      );
    });

    const painOther = profileTextarea(
      state.onboarding.student.painPointOther,
      "其他：补充你的性格短板或沟通困扰",
      (event) => {
        state.onboarding.student.painPointOther = event.target.value;
        saveOnboardingState();
      },
      2
    );

    card.append(
      profileField("请选择你的身份", identityWrap),
      profileField("你的所属学科 / 研究方向", disciplineInput),
      profileField("你的 MBTI", mbtiInput),
      profileField("你最希望我帮你解决哪些困扰？可多选", painWrap),
      profileField("其他补充", painOther)
    );
  } else {
    const advisorTitleInput = profileTextarea(
      state.onboarding.advisor.title,
      "例如：张老师 / 李导 / 老板 / 课题组老大",
      (event) => {
        state.onboarding.advisor.title = event.target.value;
        saveOnboardingState();
      },
      1
    );

    const styleWrap = document.createElement("div");
    styleWrap.className = "profile-option-list";
    onboardingConfig.advisorStyles.forEach((style) => {
      styleWrap.appendChild(
        profileChoiceButton({
          label: style,
          active: state.onboarding.advisor.style === style,
          onClick: () => {
            state.onboarding.advisor.style = style;
            saveOnboardingState();
            rerenderOnboardingPreserveScroll();
          },
        })
      );
    });

    const focusWrap = document.createElement("div");
    focusWrap.className = "profile-option-list";
    onboardingConfig.advisorFocuses.forEach((focus) => {
      focusWrap.appendChild(
        profileChoiceButton({
          label: focus,
          active: state.onboarding.advisor.focuses.includes(focus),
          onClick: () => {
            state.onboarding.advisor.focuses = toggleListValue(state.onboarding.advisor.focuses, focus);
            saveOnboardingState();
            rerenderOnboardingPreserveScroll();
          },
        })
      );
    });

    const tabooWrap = document.createElement("div");
    tabooWrap.className = "profile-option-list";
    onboardingConfig.advisorTaboos.forEach((taboo) => {
      tabooWrap.appendChild(
        profileChoiceButton({
          label: taboo,
          active: state.onboarding.advisor.taboos.includes(taboo),
          onClick: () => {
            state.onboarding.advisor.taboos = toggleListValue(state.onboarding.advisor.taboos, taboo);
            saveOnboardingState();
            rerenderOnboardingPreserveScroll();
          },
        })
      );
    });

    const tabooOther = profileTextarea(
      state.onboarding.advisor.tabooOther,
      "其他禁忌：补充导师特别在意的雷区",
      (event) => {
        state.onboarding.advisor.tabooOther = event.target.value;
        saveOnboardingState();
      },
      2
    );

    card.append(
      profileField("导师日常称呼", advisorTitleInput),
      profileField("请选择你的导师风格", styleWrap),
      profileField("导师平时最看重什么？可多选", focusWrap),
      profileField("导师最反感什么？可多选", tabooWrap),
      profileField("其他禁忌补充", tabooOther)
    );
  }

  const footer = document.createElement("div");
  footer.className = "profile-actions";

  if (state.onboarding.currentStep === 2) {
    const backButton = document.createElement("button");
    backButton.type = "button";
    backButton.className = "profile-secondary";
    backButton.textContent = "返回上一步";
    backButton.addEventListener("click", () => {
      state.onboarding.currentStep = 1;
      saveOnboardingState();
      rerenderOnboardingPreserveScroll();
    });
    footer.appendChild(backButton);
  }

  const primaryButton = document.createElement("button");
  primaryButton.type = "button";
  primaryButton.className = "profile-primary";
  if (state.onboarding.currentStep === 1) {
    primaryButton.textContent = "继续建导师档案";
    primaryButton.disabled = !canAdvanceOnboardingStepOne();
    primaryButton.addEventListener("click", () => {
      state.onboarding.currentStep = 2;
      saveOnboardingState();
      rerenderOnboardingPreserveScroll();
    });
  } else {
    primaryButton.textContent = "生成专属沟通模型";
    primaryButton.disabled = !canCompleteOnboarding();
    primaryButton.addEventListener("click", completeOnboardingFlow);
  }
  footer.appendChild(primaryButton);
  card.appendChild(footer);

  return card;
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

  if (item.type === "profile-card") {
    return renderOnboardingCard();
  }

  const row = document.createElement("div");
  row.className = `message-row ${item.role}`;
  if (item.role === "bot" && isGroupConversation()) {
    row.classList.add("group-bot-row");
  }

  const avatar = document.createElement("div");
  avatar.className = `avatar ${item.role}`;
  avatar.textContent = deriveAvatarText(item);

  const stack = document.createElement("div");
  stack.className = "message-stack";

  const bubble = document.createElement("div");
  bubble.className = "message-bubble";
  bubble.textContent = item.text;

  const meta = document.createElement("div");
  meta.className = "inline-meta";
  meta.textContent = item.meta || "";

  if (item.role === "bot" && isGroupConversation()) {
    stack.appendChild(meta);
    stack.appendChild(bubble);
  } else {
    stack.appendChild(bubble);
    stack.appendChild(meta);
  }

  if (item.actions?.length) {
    const actionGroup = document.createElement("div");
    actionGroup.className = "action-group";
    item.actions.forEach((label) => {
      const button = document.createElement("button");
      button.className = "inline-action";
      button.textContent = label;
      button.addEventListener("click", () => {
        if (isCompanionChat()) {
          composerInput.value = label;
          composerInput.focus();
        } else {
          plainComposerInput.value = label;
          plainComposerInput.focus();
        }
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

function completeOnboardingFlow() {
  if (!canCompleteOnboarding()) {
    return;
  }

  state.onboarding.completed = true;
  state.onboarding.currentStep = 2;
  state.onboarding.generatedAt = nowTimeLabel();
  state.onboarding.summary = buildCommunicationModelSummary();
  syncCompanionBaseMessages();
  syncHomeConversationList();
  saveOnboardingState();
  renderScenario(state.activeScenarioId, { syncDraft: true });
}

function syncConsentUi() {
  const effectiveToggles = getToggles();
  const hasContext = effectiveToggles.history || effectiveToggles.advisor || effectiveToggles.group;
  const isCompact = shouldCompactConsentCard();
  consentCard?.classList.toggle("compact", isCompact);
  groupPicker.hidden = !hasContext;

  if (consentCopy) {
    if (!isCompact) {
      consentCopy.textContent = consentCopyFullText;
    } else if (hasContext) {
      consentCopy.textContent = state.selectedGroups.length
        ? `上下文增强已开启，已选${state.selectedGroups.length}个群聊。`
        : "上下文增强已开启，小Q会结合已授权记录辅助分析。";
    } else {
      consentCopy.textContent = "上下文增强已关闭，可随时重新开启。";
    }
  }

  if (isCompact) {
    enableContextButton.textContent = state.selectedGroups.length
      ? "管理上下文 · 已选群聊"
      : hasContext
        ? "管理上下文"
        : "开启上下文增强";
    skipContextButton.textContent = hasContext ? "关闭" : "暂不授权";
    return;
  }

  enableContextButton.textContent = state.selectedGroups.length
    ? "开启上下文增强 · 已选择群聊"
    : "开启上下文增强";
  skipContextButton.textContent = "暂不授权";
}

function syncConversationUi() {
  phoneScreen.classList.toggle("is-companion-chat", isCompanionChat());
  phoneScreen.classList.toggle("is-external-chat", !isCompanionChat());
  phoneScreen.classList.toggle("is-onboarding", shouldShowOnboarding());
  if (consentCard) {
    consentCard.hidden = !isCompanionChat() || shouldShowOnboarding();
  }
  if (draftBox) {
    draftBox.hidden = !isCompanionChat();
  }
  plainComposer.hidden = isCompanionChat();
  inputRow.hidden = false;
  toolRow.hidden = false;

  if (isCompanionChat()) {
    composerInput.value = state.drafts[state.activeScenarioId] || "";
    composerInput.disabled = shouldShowOnboarding();
    sendButton.disabled = shouldShowOnboarding();
  } else {
    plainComposerInput.value = state.conversationDrafts[state.activeConversationId] || "";
    composerInput.disabled = false;
    sendButton.disabled = false;
  }
}

function renderScenario(scenarioId, options = {}) {
  const { syncDraft = true, keepScroll = false, previousScrollTop = 0 } = options;
  if (!isCompanionChat()) {
    state.activeScenarioId = scenarioId;
    return;
  }

  state.activeScenarioId = scenarioId;
  seedScenarioState(scenarioId);

  const conversation = getActiveConversation();
  const scenario = scenarioCatalog[scenarioId];
  chatName.textContent = conversation.name;
  chatStatus.textContent = conversation.status;
  if (scenarioTitle) {
    scenarioTitle.textContent = shouldShowOnboarding() ? "首次建档引导" : scenario.title;
  }
  composerInput.placeholder = shouldShowOnboarding()
    ? "先完成上方建档，之后这里会变成正常聊天输入框"
    : scenario.starterText;
  if (syncDraft) {
    composerInput.value = state.drafts[scenarioId];
  }

  const history = state.histories[scenarioId];
  chatThread.innerHTML = "";
  chatThread.appendChild(messageNode({ type: "time", text: history.startedAt }));

  if (shouldShowOnboarding()) {
    chatThread.appendChild(
      messageNode({
        type: "message",
        role: "bot",
        meta: "伴研小Q · 初次见面",
        text: onboardingConfig.welcome,
      })
    );
    chatThread.appendChild(messageNode({ type: "profile-card" }));
  } else {
    state.companionBaseMessages.forEach((message) => {
      chatThread.appendChild(messageNode(message));
    });

    if (history.messages.length === 0) {
      chatThread.appendChild(messageNode({ type: "system", text: scenario.emptyTip }));
    } else {
      history.messages.forEach((message) => {
        chatThread.appendChild(messageNode(message));
      });
    }
  }

  renderInspector(shouldShowOnboarding() ? onboardingInspector() : state.inspectorByScenario[scenarioId]);
  syncConsentUi();
  syncConversationUi();
  syncHomeConversationList();

  document.querySelectorAll(".scenario-card").forEach((button) => {
    button.classList.toggle("active", !shouldShowOnboarding() && button.dataset.scenario === scenarioId);
  });

  chatThread.scrollTop = keepScroll ? previousScrollTop : chatThread.scrollHeight;
}

function renderConversation(conversationId, options = {}) {
  const { syncDraft = true } = options;
  state.activeConversationId = conversationCatalog[conversationId] ? conversationId : "companion";

  if (state.activeConversationId === "companion") {
    renderScenario(state.activeScenarioId, { syncDraft });
    return;
  }

  seedConversationState(state.activeConversationId);
  const conversation = getActiveConversation();
  chatName.textContent = conversation.name;
  chatStatus.textContent = conversation.status;
  if (scenarioTitle) {
    scenarioTitle.textContent = conversation.panelTitle;
  }
  if (syncDraft) {
    plainComposerInput.value = state.conversationDrafts[state.activeConversationId];
  }

  chatThread.innerHTML = "";
  const thread = state.conversationThreads[state.activeConversationId];
  thread.messages.forEach((message) => {
    chatThread.appendChild(
      messageNode({
        ...message,
        avatarText: message.avatarText || conversation.avatarText,
      })
    );
  });

  renderInspector(conversation.inspector);
  syncConversationUi();
  syncHomeConversationList();

  document.querySelectorAll(".scenario-card").forEach((button) => {
    button.classList.remove("active");
  });

  chatThread.scrollTop = chatThread.scrollHeight;
}

function pushCompanionMessage(scenarioId, message) {
  state.histories[scenarioId].messages.push(message);
  renderScenario(scenarioId, { syncDraft: false });
}

function pushConversationMessage(conversationId, message) {
  state.conversationThreads[conversationId].messages.push(message);
  renderConversation(conversationId, { syncDraft: false });
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
  if (!isCompanionChat()) {
    const conversationId = state.activeConversationId;
    const userInput = plainComposerInput.value.trim();
    if (!userInput) {
      return;
    }

    seedConversationState(conversationId);
    pushConversationMessage(conversationId, {
      type: "message",
      role: "user",
      meta: "我 · 刚刚",
      text: userInput,
    });
    state.conversationDrafts[conversationId] = "";
    plainComposerInput.value = "";
    return;
  }

  if (shouldShowOnboarding()) {
    return;
  }

  const scenarioId = state.activeScenarioId;
  const userInput = composerInput.value.trim();
  if (!userInput) {
    return;
  }

  const resolvedScenarioId = inferScenarioFromInput(userInput);
  state.activeScenarioId = resolvedScenarioId;
  seedScenarioState(resolvedScenarioId);
  const requestId = ++state.currentRequestId;
  const toggles = getToggles();
  const history = state.histories[resolvedScenarioId].messages
    .filter((item) => item.type === "message")
    .slice(-6)
    .map((item) => ({ role: item.role, text: item.text }));
  const authorizedContext = buildAuthorizedContextPayload();
  const profileContext = buildProfileContextPayload();

  pushCompanionMessage(resolvedScenarioId, {
    type: "message",
    role: "user",
    meta: "我 · 刚刚",
    text: userInput,
  });

  state.drafts[resolvedScenarioId] = "";
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
        scenarioId: resolvedScenarioId,
        userInput,
        toggles,
        history,
        authorizedContext,
        profileContext,
      }),
    });

    const payload = await response.json();

    if (requestId !== state.currentRequestId) {
      return;
    }

    if (!response.ok) {
      throw new Error(payload.error || "生成失败");
    }

    pushCompanionMessage(resolvedScenarioId, {
      type: "message",
      role: "bot",
      meta: payload.meta || "伴研小Q · 已生成",
      text: payload.reply,
      actions: payload.actions || [],
    });

    state.inspectorByScenario[resolvedScenarioId] = payload.inspector;
    renderScenario(resolvedScenarioId, { syncDraft: false });
  } catch (error) {
    const message = error.message || "生成失败，请稍后重试。";
    pushCompanionMessage(resolvedScenarioId, {
      type: "system",
      text: message,
    });
    state.inspectorByScenario[resolvedScenarioId] = buildInspectorError(message);
    renderScenario(resolvedScenarioId, { syncDraft: false });
  } finally {
    sendButton.disabled = false;
    sendButton.textContent = "发送";
  }
}

function autoplayScenarios() {
  if (!isCompanionChat()) {
    return;
  }

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
    if (isCompanionChat()) {
      renderScenario(button.dataset.scenario);
      return;
    }
    state.activeScenarioId = button.dataset.scenario;
  });
});

composerInput.addEventListener("input", () => {
  if (isCompanionChat()) {
    state.drafts[state.activeScenarioId] = composerInput.value;
  }
});

plainComposerInput.addEventListener("input", () => {
  if (!isCompanionChat()) {
    state.conversationDrafts[state.activeConversationId] = plainComposerInput.value;
  }
});

[toggleHistory, toggleAdvisor, toggleGroup].filter(Boolean).forEach((toggle) => {
  toggle.addEventListener("change", () => {
    syncConsentUi();
    if (!isCompanionChat()) {
      return;
    }

    const scenarioId = state.activeScenarioId;
    if (scenarioId === "emotional-support") {
      state.inspectorByScenario[scenarioId] = structuredClone(scenarioCatalog[scenarioId].inspector);
      renderScenario(scenarioId);
    }
  });
});

enableContextButton.addEventListener("click", () => {
  if (toggleHistory) {
    toggleHistory.checked = true;
  }
  if (toggleAdvisor) {
    toggleAdvisor.checked = true;
  }
  if (toggleGroup) {
    toggleGroup.checked = true;
  }
  markConsentExperienced();
  if (groupPicker) {
    groupPicker.hidden = false;
  }
  syncConsentUi();
});

skipContextButton.addEventListener("click", () => {
  if (toggleHistory) {
    toggleHistory.checked = false;
  }
  if (toggleAdvisor) {
    toggleAdvisor.checked = false;
  }
  if (toggleGroup) {
    toggleGroup.checked = false;
  }
  state.selectedGroups = [];
  document.querySelectorAll(".group-chip").forEach((chip) => chip.classList.remove("active"));
  markConsentExperienced();
  syncConsentUi();
});

function wireGroupChip(chip) {
  chip.addEventListener("click", () => {
    const groupId = chip.dataset.groupId;
    if (groupId === "custom") {
      contactOverlay.hidden = false;
      groupOverlay.hidden = true;
      document.body.style.overflow = "hidden";
      return;
    }

    chip.classList.toggle("active");
    if (chip.classList.contains("active")) {
      if (!state.selectedGroups.includes(groupId)) {
        state.selectedGroups.push(groupId);
      }
    } else {
      state.selectedGroups = state.selectedGroups.filter((id) => id !== groupId);
    }
    syncConsentUi();
  });
}

document.querySelectorAll(".group-chip").forEach((chip) => {
  wireGroupChip(chip);
});

function closeSelectorOverlays() {
  contactOverlay.hidden = true;
  groupOverlay.hidden = true;
  document.body.style.overflow = "";
}

function openHomeOverlay() {
  homeOverlay.hidden = false;
  contactOverlay.hidden = true;
  groupOverlay.hidden = true;
  document.body.style.overflow = "hidden";
}

function closeHomeOverlay() {
  homeOverlay.hidden = true;
  document.body.style.overflow = "";
}

contactOverlayBack.addEventListener("click", closeSelectorOverlays);
groupOverlayBack.addEventListener("click", () => {
  groupOverlay.hidden = true;
  contactOverlay.hidden = false;
});

openGroupSelectorButton.addEventListener("click", () => {
  contactOverlay.hidden = true;
  groupOverlay.hidden = false;
});

document.querySelectorAll(".selector-group-row").forEach((row) => {
  row.addEventListener("click", () => {
    const groupName = row.dataset.groupName;
    let matchingChip = Array.from(document.querySelectorAll(".group-chip")).find(
      (chip) => chip.textContent.trim() === groupName
    );

    if (!matchingChip) {
      state.customGroupCount += 1;
      matchingChip = document.createElement("button");
      matchingChip.className = "group-chip active";
      matchingChip.dataset.groupId = `custom-${state.customGroupCount}`;
      matchingChip.textContent = groupName;
      const customChip = document.querySelector('.group-chip[data-group-id="custom"]');
      customChip.parentElement.insertBefore(matchingChip, customChip);
      wireGroupChip(matchingChip);
    } else {
      matchingChip.classList.add("active");
    }

    if (!state.selectedGroups.includes(matchingChip.dataset.groupId)) {
      state.selectedGroups.push(matchingChip.dataset.groupId);
    }

    syncConsentUi();
    closeSelectorOverlays();
  });
});

headerLeft.addEventListener("click", openHomeOverlay);

document.querySelectorAll(".home-conversation-row").forEach((row) => {
  row.addEventListener("click", () => {
    renderConversation(row.dataset.chatId || "companion", { syncDraft: true });
    closeHomeOverlay();
  });
});

sendButton.addEventListener("click", requestLiveResponse);

composerInput.addEventListener("keydown", (event) => {
  if (!isCompanionChat()) {
    return;
  }
  if (event.key === "Enter" && !event.shiftKey) {
    event.preventDefault();
    requestLiveResponse();
  }
});

plainComposerInput.addEventListener("keydown", (event) => {
  if (isCompanionChat()) {
    return;
  }
  if (event.key === "Enter" && !event.shiftKey) {
    event.preventDefault();
    requestLiveResponse();
  }
});

if (autoplayButton) {
  autoplayButton.addEventListener("click", autoplayScenarios);
}

Object.keys(scenarioCatalog).forEach(seedScenarioState);
Object.keys(conversationCatalog).forEach(seedConversationState);
syncCompanionBaseMessages();
syncHomeConversationList();
renderConversation(state.activeConversationId);
