# Простая форма отправки данных

Веб-форма для сбора ФИО и ИНН с отправкой в Telegram чат.

## Особенности

- Валидация ФИО (кириллица, формат "Фамилия Имя Отчество")
- Валидация ИНН (12 цифр)
- Адаптивный дизайн на Bootstrap 5
- Отправка данных через Telegram Bot API
- Безопасное хранение конфигурации через переменные окружения

## Установка

1. Форкните репозиторий
2. Создайте бота через [@BotFather](https://t.me/BotFather):
   - Отправьте команду `/newbot`
   - Следуйте инструкциям
   - Сохраните полученный токен

3. Получите ID чата:
   - Добавьте бота в нужный чат
   - Отправьте в чат любое сообщение
   - Откройте в браузере: `https://api.telegram.org/bot<ВАШ_ТОКЕН>/getUpdates`
   - Найдите `"chat":{"id":` - это и есть ID чата

4. Разверните на Netlify:
   - Войдите на [netlify.com](https://netlify.com)
   - Нажмите "Add new site" > "Import an existing project"
   - Выберите ваш форк репозитория
   - В настройках сайта (Site settings > Environment variables) добавьте:
     - `TELEGRAM_BOT_TOKEN` - токен вашего бота
     - `TELEGRAM_CHAT_ID` - ID чата для отправки сообщений

## Технологии

- HTML5
- CSS3 (Bootstrap 5.3.2)
- JavaScript (ES6+)
- Netlify Functions
- Telegram Bot API

## Структура проекта

```
simple_form/
├── index.html          # Главная страница
├── styles.css          # Кастомные стили
├── netlify.toml        # Конфигурация Netlify
├── js/
│   ├── script.js       # Основной скрипт
│   └── modules/        # Модули
│       ├── DOMManager.js      # Управление DOM
│       ├── EventManager.js    # Обработка событий
│       ├── StateManager.js    # Управление состоянием
│       ├── MessageService.js  # Сервис сообщений
│       └── TelegramService.js # Работа с Telegram API
└── netlify/
    └── functions/      # Serverless функции
        ├── package.json      # Зависимости функций
        └── send-telegram.js  # Отправка в Telegram
```

## Локальная разработка

1. Установите [Netlify CLI](https://docs.netlify.com/cli/get-started/):
   ```bash
   npm install netlify-cli -g
   ```

2. Запустите локальный сервер:
   ```bash
   netlify dev
   ```

## Демо

Рабочая версия доступна по адресу: [https://simple-form-telegram.netlify.app](https://simple-form-telegram.netlify.app)
