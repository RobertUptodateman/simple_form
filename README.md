# Простая форма отправки данных

Веб-форма для сбора ФИО и ИНН с безопасной отправкой в Telegram чат через Netlify Functions.

## Особенности

- 🔒 Безопасная отправка данных через Netlify Functions
- ✅ Валидация ФИО (кириллица, формат "Фамилия Имя Отчество")
- 🔢 Валидация ИНН (12 цифр)
- 📱 Адаптивный дизайн на Bootstrap 5
- 🤖 Интеграция с Telegram Bot API
- 🔄 Мгновенная валидация при вводе
- 🌐 Поддержка составных фамилий через дефис

## Установка

1. Клонируйте репозиторий:
   ```bash
   git clone https://github.com/RobertUptodateman/simple_form.git
   cd simple_form
   ```

2. Установите зависимости:
   ```bash
   npm install
   ```

3. Создайте файл `.env` в корне проекта:
   ```env
   TELEGRAM_BOT_TOKEN=your_bot_token_here
   TELEGRAM_CHAT_ID=your_chat_id_here
   ```

## Настройка Telegram бота

1. Создайте бота через [@BotFather](https://t.me/BotFather):
   ```
   1. Отправьте команду /newbot
   2. Введите имя бота (Example Form Bot)
   3. Введите username бота (должен заканчиваться на 'bot', например exampleform_bot)
   4. Сохраните полученный токен (например: 5555555555:AAHjB7xFPOF8LpzI3PKkB1pGBq9SCB3K111)
   ```

2. Получите ID чата:
   ```
   1. Добавьте бота в нужный чат
   2. Отправьте в чат любое сообщение
   3. Откройте в браузере: https://api.telegram.org/bot<ВАШ_ТОКЕН>/getUpdates
   4. Найдите "chat":{"id": -XXXXXXXXX} - это ID вашего чата
   ```

3. Настройте переменные окружения:

   Для локальной разработки:
   ```bash
   # Создайте файл .env в корне проекта
   TELEGRAM_BOT_TOKEN=5555555555:AAHjB7xFPOF8LpzI3PKkB1pGBq9SCB3K111
   TELEGRAM_CHAT_ID=-XXXXXXXXX
   ```

   На Netlify:
   ```
   1. Перейдите в настройки сайта на Netlify
   2. Site settings -> Environment variables
   3. Добавьте переменные:
      - TELEGRAM_BOT_TOKEN
      - TELEGRAM_CHAT_ID
   ```

4. Проверьте работу бота:
   ```
   1. Отправьте тестовую форму
   2. В случае ошибки проверьте:
      - Правильность токена и ID чата
      - Наличие бота в нужном чате
      - Права бота на отправку сообщений
   ```

## Локальная разработка

1. Установите Netlify CLI:
   ```bash
   npm install netlify-cli -g
   ```

2. Запустите локальный сервер:
   ```bash
   netlify dev
   ```

3. Откройте http://localhost:8888 в браузере

## Деплой

1. Создайте новый сайт на Netlify:
   ```bash
   netlify init
   ```

2. Добавьте переменные окружения в настройках сайта:
   - `TELEGRAM_BOT_TOKEN`
   - `TELEGRAM_CHAT_ID`

3. Задеплойте проект:
   ```bash
   netlify deploy --prod
   ```

## Технологии

- 🌐 HTML5 и CSS3
- 🎨 Bootstrap 5.3.2
- 📜 JavaScript (ES6+ modules)
- ⚡ Netlify Functions (serverless)
- 🤖 Telegram Bot API

## Структура проекта

```
simple_form/
├── index.html                    # Главная страница
├── styles.css                    # Стили
├── netlify.toml                  # Конфигурация Netlify
├── package.json                  # Зависимости
├── netlify/functions/            # Serverless функции
│   └── send-to-telegram.js       # Отправка в Telegram
└── js/
    ├── script.js                # Основной скрипт инициализации
    └── modules/                 # JavaScript модули
        ├── DOMManager.js       # Управление DOM
        ├── EventManager.js     # Обработка событий
        ├── StateManager.js     # Управление состоянием
        └── TelegramService.js  # Работа с API
```

## Безопасность

- ✅ Токены хранятся в переменных окружения
- 🔒 Запросы к Telegram API через serverless функции
- 🛡️ Настроены CORS заголовки
- 🔄 Валидация данных на клиенте и сервере

## Демо

Рабочая версия доступна по адресу: [https://simplesimpleform.netlify.app](https://simplesimpleform.netlify.app)

> **Примечание:** Демо-версия использует защищенное API через Netlify Functions для безопасной отправки сообщений в Telegram.

## Разработка

### Команды

- `netlify dev` - запуск локального сервера
- `netlify deploy` - деплой на Netlify
- `npm run lint` - проверка кода
- `npm run test` - запуск тестов

### Форматирование кода

Проект использует:
- ESLint для проверки JavaScript
- Prettier для форматирования кода
