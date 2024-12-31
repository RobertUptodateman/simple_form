import { StateManager } from './StateManager.js';
import { DOMManager } from './DOMManager.js';
import { TelegramService } from './TelegramService.js';

/**
 * Менеджер событий формы
 */
export class EventManager {
    /**
     * Инициализировать обработчики событий
     */
    static initialize() {
        this.initializeFormEvents();
    }

    /**
     * Инициализация событий формы
     */
    static initializeFormEvents() {
        const form = DOMManager.getElement(DOMManager.SELECTORS.form);
        const fullNameInput = DOMManager.getElement(DOMManager.SELECTORS.fullName);
        const innInput = DOMManager.getElement(DOMManager.SELECTORS.inn);

        // Обработка ввода ФИО
        fullNameInput.addEventListener('input', (e) => {
            StateManager.updateFormField('fullName', e.target.value);
            DOMManager.updateButtonState(StateManager.getState().form.isValid);
        });

        // Обработка ввода ИНН
        innInput.addEventListener('input', (e) => {
            const value = e.target.value.replace(/\D/g, '');
            e.target.value = value;
            StateManager.updateFormField('inn', value);
            
            if (value.length === 12) {
                DOMManager.clearError(innInput);
            } else if (value.length > 0) {
                DOMManager.showError(innInput, 'ИНН должен содержать 12 цифр');
            }
            
            DOMManager.updateButtonState(StateManager.getState().form.isValid);
        });

        // Обработка отправки формы
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const state = StateManager.getState();
            
            if (state.form.isValid) {
                const submitButton = DOMManager.getElement(DOMManager.SELECTORS.submitButton);
                const originalText = submitButton.textContent;
                
                try {
                    // Блокируем кнопку и меняем текст
                    submitButton.disabled = true;
                    submitButton.textContent = 'Отправка...';

                    // Получаем актуальные значения из полей формы
                    const formData = {
                        name: fullNameInput.value.trim(),
                        inn: innInput.value.trim()
                    };
                    
                    // Отправляем данные через Netlify Function
                    const response = await fetch('/.netlify/functions/send-telegram', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(formData)
                    });

                    if (!response.ok) {
                        throw new Error('Ошибка отправки данных');
                    }

                    // Очищаем форму после успешной отправки
                    form.reset();
                    StateManager.updateFormField('fullName', '');
                    StateManager.updateFormField('inn', '');
                    
                    // Показываем сообщение об успехе
                    alert('Форма успешно отправлена!');
                } catch (error) {
                    console.error('Ошибка:', error);
                    alert(error.message);
                } finally {
                    // Возвращаем кнопку в исходное состояние
                    submitButton.disabled = false;
                    submitButton.textContent = originalText;
                }
            }
        });
    }
}
