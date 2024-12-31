import { CONFIG } from '../config.js';

/**
 * Сервис для работы с Telegram Bot API
 * Отвечает за отправку сообщений в Telegram
 */
export class TelegramService {
    constructor() {
        const baseUrl = window.location.hostname === 'localhost' 
            ? 'http://localhost:8888'
            : 'https://simplesimpleform.netlify.app';
        
        this.apiUrl = `${baseUrl}/.netlify/functions/send-to-telegram`;
    }

    /**
     * Отправить сообщение через Telegram бота
     * @param {string} fullName - ФИО
     * @param {string} inn - ИНН
     * @returns {Promise<Object>} Результат отправки
     */
    async sendMessage(fullName, inn) {
        try {
            const response = await fetch(this.apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ fullName, inn })
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || 'Network response was not ok');
            }

            return await response.json();
        } catch (error) {
            console.error('Error sending message:', error);
            throw error;
        }
    }
}
