const botApiKey = process.env.BOT_API_KEY;
const telegramApiBaseUrl = "https://api.telegram.org";

function getBaseUrl() {
  return `${telegramApiBaseUrl}/bot${botApiKey}`;
}
