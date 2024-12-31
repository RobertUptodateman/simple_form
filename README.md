# Простая форма отправки данных

Веб-форма для сбора ФИО и ИНН с отправкой в Telegram чат.

## Особенности

- Валидация ФИО (кириллица, формат "Фамилия Имя Отчество")
- Валидация ИНН (12 цифр)
- Адаптивный дизайн на Bootstrap 5
- Отправка данных через Telegram Bot API

## Установка

1. Скопируйте файлы проекта
2. Настройте `js/config.js`:
   ```javascript
   export const CONFIG = {
       TELEGRAM_BOT_TOKEN: 'YOUR_BOT_TOKEN_HERE',
       TELEGRAM_CHAT_ID: 'YOUR_CHAT_ID_HERE'
   };
   ```

## Технологии

- HTML5
- CSS3 (Bootstrap 5.3.2)
- JavaScript (ES6+)
- Telegram Bot API

## Структура проекта

```
simple_form/
├── index.html          # Главная страница
├── styles.css          # Кастомные стили
├── js/
│   ├── config.js       # Конфигурация
│   ├── script.js       # Основной скрипт
│   └── modules/        # Модули
│       ├── DOMManager.js      # Управление DOM
│       ├── EventManager.js    # Обработка событий
│       ├── StateManager.js    # Управление состоянием
│       └── TelegramService.js # Работа с Telegram API
```

## Запуск

Откройте `index.html` в браузере или разместите файлы на веб-сервере.
