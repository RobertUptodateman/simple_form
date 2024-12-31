import { EventManager } from './modules/EventManager.js';

// Инициализируем обработчики событий после загрузки DOM
document.addEventListener('DOMContentLoaded', () => {
    // Инициализация обработчиков формы
    EventManager.initialize();
    
    // Инициализация тултипов Bootstrap
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));
});
