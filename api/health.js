const { OPENAI_API_KEY, OPENAI_MODEL, sendJson } = require("./_shared");

module.exports = function handler(_req, res) {
  sendJson(res, 200, {
    ok: true,
    provider: "openai",
    model: OPENAI_MODEL,
    configured: Boolean(OPENAI_API_KEY),
  });
};
