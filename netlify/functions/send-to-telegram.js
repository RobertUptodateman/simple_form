const fetch = require('node-fetch');

exports.handler = async function(event, context) {
  console.log('Function invoked with event:', {
    method: event.httpMethod,
    headers: event.headers,
    body: event.body
  });

  // Разрешаем CORS
  if (event.httpMethod === 'OPTIONS') {
    console.log('Handling OPTIONS request');
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
      },
      body: ''
    };
  }

  // Проверяем метод
  if (event.httpMethod !== "POST") {
    console.log('Invalid method:', event.httpMethod);
    return {
      statusCode: 405,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ message: "Method not allowed" })
    };
  }

  try {
    // Получаем данные из тела запроса
    const { fullName, inn } = JSON.parse(event.body);
    console.log('Received data:', { fullName, inn });

    // Проверяем наличие переменных окружения
    const { TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID } = process.env;
    console.log('Environment check:', {
      hasBotToken: !!TELEGRAM_BOT_TOKEN,
      hasChatId: !!TELEGRAM_CHAT_ID
    });

    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
      throw new Error("Missing environment variables");
    }

    // Формируем сообщение
    const message = `
<b>Новая заявка с сайта</b>

👤 ФИО: <b>${fullName}</b>
🔢 ИНН: <b>${inn}</b>
📅 Дата: <b>${new Date().toLocaleString()}</b>
`;

    console.log('Sending message to Telegram');

    // Отправляем в Telegram
    const response = await fetch(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: message,
          parse_mode: "HTML"
        })
      }
    );

    const data = await response.json();
    console.log('Telegram API response:', data);

    if (!data.ok) {
      throw new Error(data.description || "Telegram API error");
    }

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type'
      },
      body: JSON.stringify({ 
        success: true,
        message: "Message sent successfully" 
      })
    };
  } catch (error) {
    console.error('Error details:', {
      message: error.message,
      stack: error.stack
    });

    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type'
      },
      body: JSON.stringify({ 
        success: false,
        message: "Error sending message", 
        error: error.message 
      })
    };
  }
};
