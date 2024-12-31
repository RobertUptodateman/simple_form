import { CONFIG } from '../config.js';

/**
 * Сервис для отправки данных в Telegram
 */
export class TelegramService {
    /**
     * Отправляет данные формы в Telegram
     * @param {Object} data - Данные формы
     * @param {string} data.name - ФИО
     * @param {string} data.inn - ИНН
     * @returns {Promise<boolean>} - Результат отправки
     */
    static async sendData(data) {
        try {
            const response = await fetch('/api/send-telegram', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || 'Ошибка отправки данных');
            }

            return true;
        } catch (error) {
            console.error('Ошибка отправки в Telegram:', error);
            throw error;
        }
    }
}
