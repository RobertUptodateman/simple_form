import { StateManager } from './StateManager.js';
import { DOMManager } from './DOMManager.js';
import { TelegramService } from './TelegramService.js';

/**
 * Менеджер событий
 * Отвечает за обработку всех событий формы
 */
export class EventManager {
    /**
     * Инициализация всех обработчиков событий
     */
    static initialize() {
        this.initializeFormEvents();
    }

    /**
     * Инициализация событий формы
     * Включает обработку ввода и отправки формы
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
            const value = e.target.value.replace(/\D/g, ''); // Оставляем только цифры
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
                    
                    // Отправляем данные в Telegram
                    await TelegramService.sendMessage(state.form);
                    
                    // Очищаем форму после успешной отправки
                    form.reset();
                    StateManager.updateFormField('fullName', '');
                    StateManager.updateFormField('inn', '');
                    
                    // Показываем сообщение об успехе
                    alert('Форма успешно отправлена!');
                } catch (error) {
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
