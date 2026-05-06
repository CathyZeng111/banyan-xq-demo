# 伴研小Q LabMate Demo

这是一个为腾讯 PCG 校园产品大赛准备的高保真 demo，目前已经支持接入真实大模型 API。

## 包含内容

- `index.html`
  主界面，模拟 QQ Bot 私聊窗口和 AI 解释面板。
- `styles.css`
  页面样式。
- `app.js`
  前端交互逻辑，负责发送请求和渲染模型返回内容。
- `server.js`
  轻量本地服务，负责托管静态资源、读取环境变量、调用模型接口。
- `.env.example`
  环境变量模板。

## 当前可演示场景

1. 沟通彩排
2. 导师意图翻译
3. 课题组知识问答
4. 情绪树洞与风险转介

## 演示亮点

- 左侧切换四个比赛核心场景
- 中间展示用户与小Q的聊天过程
- 右侧展示意图识别、参考上下文、压力信号和风险等级
- 在“情绪树洞与风险转介”场景中，可切换上下文增强开关，展示与普通情绪 AI 的区别

## 本地运行

## 连接真实 AI

1. 复制 `.env.example` 为 `.env.local`
2. 在 `.env.local` 里填入你的 `OPENAI_API_KEY`
3. 如有需要，可修改 `OPENAI_MODEL` 或 `OPENAI_BASE_URL`

## 本地运行

使用 Node 启动本地服务：

```bash
node server.js
```

然后访问 `http://127.0.0.1:4173`

如果没有配置 `OPENAI_API_KEY`，页面仍能打开，但点击发送时会收到配置提醒。

## 对外发布

当前版本已经整理成适合部署到 Render 的结构，推荐直接发布 `version4/`。

### 方式一：Render（推荐）

1. 把整个项目上传到 GitHub
2. 登录 Render，选择 `New +` -> `Blueprint`
3. 选择这个仓库
4. Render 会自动读取根目录的 `render.yaml`
5. 在环境变量里补上：
   - `OPENAI_API_KEY`
6. 部署完成后，Render 会给你一个公网 URL，其他人可以直接访问

### 方式二：手动创建 Web Service

如果你不想用 Blueprint，也可以手动创建：

1. `New +` -> `Web Service`
2. 连接 GitHub 仓库
3. `Root Directory` 选择 `version4`
4. `Start Command` 填：

```bash
node server.js
```

5. 添加环境变量：

```text
OPENAI_API_KEY=你的key
OPENAI_BASE_URL=https://api.deepseek.com
OPENAI_MODEL=deepseek-v4-flash
HOST=0.0.0.0
```

### 注意

- 不要把 `.env.local` 提交到仓库
- `file://...` 和 `127.0.0.1` 地址都不能分享给别人
- 只有部署后的公网 URL 才能让其他人直接访问 demo

## API 说明

- `GET /api/health`
  查看本地服务是否启动，以及是否检测到 API Key。
- `POST /api/generate`
  根据当前场景、用户输入、上下文开关和最近对话生成结构化回复。

## 下一步建议

- 把课题组资料从写死的上下文迁移到真实 RAG 数据源
- 为不同场景增加更强的结构化输出卡片
- 接入真实 QQ Bot 事件流，把 Web demo 升级为可交互机器人原型
