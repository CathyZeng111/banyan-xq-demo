window.VERSION3_CHAT_DATA = {
  // 后续分批导入聊天记录时，优先改这个文件。
  // 1. 伴研小Q 的四个场景记录：改 `companion.scenarios`
  // 2. 其他聊天窗口的记录：改 `conversations.<chatId>.thread.messages`
  // 3. 每条消息统一用 `{ type, role, meta, text }`
  //    - 普通消息：`{ type: "message", role: "user" | "bot", meta: "...", text: "..." }`
  //    - 系统提示：`{ type: "system", text: "..." }`
  //    - 时间分隔一般不用手动写，直接填 `thread.startedAt` 即可
  companion: {
    scenarios: {
      "repair-message": {
        draft: "导师刚刚说的话我不理解什么意思？我现在有点难受因为...",
        thread: {
          startedAt: "16:57",
          messages: [],
        },
      },
      "advisor-translate": {
        draft: "老师刚发我一句：这个部分你看着办，别再太散了。我根本不知道他到底要我干嘛。",
        thread: {
          startedAt: "16:57",
          messages: [],
        },
      },
      "lab-rag": {
        draft: "BCA 蛋白定量试剂盒放在哪个冰箱了？我不敢在大群问。",
        thread: {
          startedAt: "16:57",
          messages: [],
        },
      },
      "emotional-support": {
        draft: "我这周真的有点顶不住了，感觉一直在被催，但是又不知道先做哪个。",
        thread: {
          startedAt: "16:57",
          messages: [],
        },
      },
    },
  },
  conversations: {
    companion: {
      name: "伴研小Q",
      status: "在线 · WiFi",
      avatarText: "伴",
    },
    advisor: {
      name: "王老师",
      status: "在线 · WiFi",
      avatarText: "王",
      panelTitle: "导师私聊窗口",
      draft: "",
      inspector: {
        intents: ["一对一沟通", "导师消息", "待回复"],
        contextBase: ["这是普通私聊窗口，不展示伴研小Q的场景快捷入口和授权卡片。"],
        outputs: ["保留导师真实消息流。", "发送区改成普通聊天输入框。"],
        signals: [
          { label: "会话类型", value: "导师私聊" },
          { label: "当前状态", value: "等待学生回复" },
          { label: "界面模式", value: "普通聊天" },
        ],
        risk: "green",
        riskLabel: "绿色：普通沟通",
      },
      thread: {
        startedAt: "10:21",
        messages: [
          {
            type: "message",
            role: "user",
            meta: "我 · 10:21",
            text: "老师，这是我修改后的PPT，麻烦您有空看看还有什么需要改进的[玫瑰]谢谢",
          },
          {
            type: "message",
            role: "bot",
            meta: "王老师 · 10:35",
            text: "好的",
          },
          {
            type: "message",
            role: "bot",
            meta: "王老师 · 10:37",
            text: "你真的太难教了！告诉你不要讲siRBX1的结果，你还要坚持放上去。真的是没救了。你只要讲丁冉已经证明和SCF-TRCP无关就行了",
          },
          {
            type: "message",
            role: "user",
            meta: "我 · 10:42",
            text: "诶老师当时不是说我背景介绍部分图上红圈圈出来knockdown太明显了，改成一个红叉嘛？ siRBX1的数据我不放了就是文字描述。如果文字描述也不提的话，后面因为rbx1不起作用直接排除其他cullin只关注cullin5，咋解释呢",
          },
          {
            type: "message",
            role: "bot",
            meta: "王老师 · 10:50",
            text: "我让你把整个SCF打叉[发怒]你在下面用文字再写siRBX1 的结果，你到底想干嘛？不想过考核吗？那就别在我实验室呆了！教不了你[发怒]",
          },
          {
            type: "message",
            role: "user",
            meta: "我 · 10:53",
            text: "就是如果文字描述也不提siRBX1的话，后面如何说明排除其他cullin参与降解的可能性呢?只说排除了SCF betaTRCP的可能性  ,那岂不是只排除了cul1。我是不理解这个",
          },
          {
            type: "message",
            role: "bot",
            meta: "王老师 · 10:55",
            text: "算了，你就不过中期好了。你那里来的科研逻辑？你干脆转实验室吧，本人才疏学浅，教不了你！",
          },
        ],
      },
    },
    "advisor-group": {
      name: "王老师课题组群",
      status: "群聊",
      avatarText: "组",
      panelTitle: "课题组群聊窗口",
      draft: "",
      inspector: {
        intents: ["群聊消息", "资料同步", "普通会话"],
        contextBase: ["这是群聊窗口，保留群消息内容，不显示伴研小Q专属演示模块。"],
        outputs: ["群成员消息独立展示。", "不继承伴研小Q的输入示例。"],
        signals: [
          { label: "会话类型", value: "课题组群聊" },
          { label: "最近说话人", value: "李师姐" },
          { label: "界面模式", value: "普通聊天" },
        ],
        risk: "green",
        riskLabel: "绿色：普通群聊",
      },
      thread: {
        startedAt: "2026年5月1号",
        messages: [
          {
            type: "message",
            role: "bot",
            meta: "李师姐 · 2026年5月1号",
            text: "BCA试剂盒放在二楼-20冰箱三层左侧抽屉",
          },
          {
            type: "message",
            role: "bot",
            meta: "管理员 · 2026年5月1号",
            text: "成像平台的活细胞转盘处于离线状态，已联系检修，大家安排实验注意一下",
          },
          {
            type: "message",
            role: "bot",
            meta: "张师姐 · 2026年5月2号",
            text: "到了10瓶opti放在冷库了",
          },
          {
            type: "message",
            role: "bot",
            meta: "王老师 · 21:16",
            text: "请大家update各自手上的质粒名单，每个月第一个星期报给@管理员，谁拒不执行扣助学金",
          },
        ],
      },
    },
    "lab-group": {
      name: "Wang lab(无导师版）",
      status: "群聊",
      avatarText: "W",
      panelTitle: "同门群聊窗口",
      draft: "收到，我把组会那页图今晚再润一下。",
      inspector: {
        intents: ["同门群聊", "组会提醒", "普通会话"],
        contextBase: ["这是无导师群聊窗口，界面与伴研小Q分离。"],
        outputs: ["保留群聊上下文。", "不再显示 AI 快捷入口和授权区。"],
        signals: [
          { label: "会话类型", value: "同门群聊" },
          { label: "最近说话人", value: "张师兄" },
          { label: "界面模式", value: "普通聊天" },
        ],
        risk: "green",
        riskLabel: "绿色：普通群聊",
      },
      thread: {
        startedAt: "昨天 19:42",
        messages: [
          {
            type: "message",
            role: "bot",
            meta: "张师兄 · 昨天 19:42",
            text: "明天组会每个人汇报 5 分钟。",
          },
        ],
      },
    },
    "instrument-group": {
      name: "实验仪器答疑群",
      status: "群聊",
      avatarText: "仪",
      panelTitle: "仪器答疑群窗口",
      draft: "收到，我先去检查转子锁紧状态。",
      inspector: {
        intents: ["答疑群聊", "设备讨论", "普通会话"],
        contextBase: ["这是实验室答疑群，不复用伴研小Q的演示输入和授权模块。"],
        outputs: ["独立保留群消息。", "输入区按普通聊天处理。"],
        signals: [
          { label: "会话类型", value: "答疑群聊" },
          { label: "最近说话人", value: "王师兄" },
          { label: "界面模式", value: "普通聊天" },
        ],
        risk: "green",
        riskLabel: "绿色：普通群聊",
      },
      thread: {
        startedAt: "周一",
        messages: [
          {
            type: "message",
            role: "bot",
            meta: "王师兄 · 周一",
            text: "离心机 Error 404 先检查转子是否锁紧。",
          },
        ],
      },
    },
  },
};
