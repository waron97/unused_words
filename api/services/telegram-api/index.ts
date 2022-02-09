import axios, { Method } from "axios";

const botApiKey = process.env.BOT_API_KEY;
const telegramApiBaseUrl = "https://api.telegram.org";

function getBaseUrl() {
  return `${telegramApiBaseUrl}/bot${botApiKey}`;
}

export async function sendMessage(chatId: number, text: string) {
  const url = `${getBaseUrl()}/sendMessage`;
  const body = { chat_id: chatId, text };
  return await executeRequest(url, "POST", body);
}

async function executeRequest(url: string, method: Method, body: any) {
  // const requestBody = JSON.stringify(body);

  const { data } = await axios(url, { data: body, method });
  return data;
}
