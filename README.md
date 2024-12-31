# Простая форма отправки данных

Веб-форма для сбора ФИО и ИНН с отправкой в Telegram чат.

## Особенности

- Валидация ФИО (кириллица, формат "Фамилия Имя Отчество")
- Валидация ИНН (12 цифр)
- Адаптивный дизайн на Bootstrap 5
- Отправка данных через Telegram Bot API

## Установка

1. Скопируйте файлы проекта
2. Создайте файл `js/config.js` на основе `js/config.example.js`:
   ```javascript
   export const CONFIG = {
       TELEGRAM_BOT_TOKEN: 'YOUR_BOT_TOKEN_HERE',
       TELEGRAM_CHAT_ID: 'YOUR_CHAT_ID_HERE'
   };
   ```

## Настройка Telegram бота

1. Создайте бота через [@BotFather](https://t.me/BotFather):
   - Отправьте команду `/newbot`
   - Следуйте инструкциям
   - Скопируйте полученный токен в `config.js`

2. Получите ID чата:
   - Добавьте бота в нужный чат
   - Отправьте в чат любое сообщение
   - Откройте в браузере: `https://api.telegram.org/bot<ВАШ_ТОКЕН>/getUpdates`
   - Найдите `"chat":{"id":` - это и есть ID чата
   - Скопируйте ID в `config.js`

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
│   ├── config.js       # Конфигурация (создать из config.example.js)
│   ├── script.js       # Основной скрипт
│   └── modules/        # Модули
│       ├── DOMManager.js      # Управление DOM
│       ├── EventManager.js    # Обработка событий
│       ├── StateManager.js    # Управление состоянием
│       └── TelegramService.js # Работа с Telegram API
```

## Запуск

- Локально: откройте `index.html` в браузере
- На хостинге: разместите файлы на веб-сервере и создайте `config.js`

## Демо

Рабочая версия доступна по адресу: [https://robertuptodateman.github.io/simple_form/](https://robertuptodateman.github.io/simple_form/)

⚠️ Для работы с демо версией необходимо создать собственного бота и указать его токен в `config.js`.
