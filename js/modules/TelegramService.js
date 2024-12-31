import { CONFIG } from '../config.js';

/**
 * Сервис для работы с Telegram Bot API
 * Отвечает за отправку сообщений в Telegram
 */
export class TelegramService {
    /**
     * Отправить сообщение через Telegram бота
     * @param {Object} formData - Данные формы
     * @returns {Promise<boolean>} Результат отправки
     */
    static async sendMessage(formData) {
        // Проверяем конфигурацию
        if (CONFIG.TELEGRAM_BOT_TOKEN === 'YOUR_BOT_TOKEN_HERE' || 
            CONFIG.TELEGRAM_CHAT_ID === 'YOUR_CHAT_ID_HERE') {
            throw new Error('Необходимо указать TOKEN и CHAT_ID в файле config.js');
        }

        const message = this.formatMessage(formData);
        const url = `https://api.telegram.org/bot${CONFIG.TELEGRAM_BOT_TOKEN}/sendMessage`;
        
        try {
            // Отправляем запрос к API Telegram
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    chat_id: CONFIG.TELEGRAM_CHAT_ID,
                    text: message,
                    parse_mode: 'HTML'
                })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.description || 'Ошибка отправки сообщения');
            }

            return true;
        } catch (error) {
            console.error('Ошибка:', error);
            throw new Error(
                error.message === 'Failed to fetch' 
                    ? 'Ошибка сети. Проверьте подключение к интернету.'
                    : error.message
            );
        }
    }

    /**
     * Форматировать данные формы в HTML сообщение
     * @param {Object} formData - Данные формы
     * @returns {string} Отформатированное сообщение
     */
    static formatMessage(formData) {
        return `
<b>Новая заявка с сайта</b>

👤 ФИО: <b>${formData.fullName}</b>
🔢 ИНН: <b>${formData.inn}</b>
📅 Дата: <b>${new Date().toLocaleString()}</b>
`;
    }
}
