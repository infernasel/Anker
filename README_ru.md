# AI Anker

[English](README.md) | Русский | [Документация](https://docs.ai-anker.com)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

AI Anker — это универсальная система AI-агентов, которая поддерживает запуск различных инструментов и операций в изолированной среде (песочнице).

Начните свое путешествие в мир AI-агентов с AI Anker!

👏 Присоединяйтесь к [QQ Группе (1005477581)](https://qun.qq.com/universal-share/share?ac=1&authkey=p4x3da5impr4liaenxwvhs7ivalpkicftuevrljouz9qstszsmnpjc3hzsjjgqyv&busi_data=eyjncm91cenvzguioiixmda1ndc3ntgxiiwidg9rzw4ioijnzmurtmq0uzndzdqndfvdjvps1vcrkjgrwvlv0r3rfjsrvfozdawrjfdeudum0t6auiyczlvdzrjv1byn09iiiwidwluijoimzqymjexode1in0%3d&data=c3b-e6blebailv32co77ixl5vxphtd9y_itwlsq50hkqoso_55_isozym2faaq4hs9-517tuy8gswadwpom-a&svctype=4&tempid=h5_group_info)

## Демонстрация

### Основные функции

https://github.com/user-attachments/assets/37060a09-c647-4bcb-920c-959f7fa73ebe

### Использование браузера

* Задача: Найти последние статьи по теме LLM

https://github.com/user-attachments/assets/4e35bc4d-024a-4617-8def-a537a94bd285

### Работа с кодом

* Задача: Написать сложный пример на Python

https://github.com/user-attachments/assets/765ea387-bb1c-4dc2-b03e-716698feef77


## Ключевые особенности

* **Развертывание:** Для минимального развертывания требуется только сервис LLM, без зависимости от других внешних сервисов.
* **Инструменты:** Поддержка Терминала, Браузера, Файлового менеджера, Веб-поиска и инструментов для обмена сообщениями с возможностью просмотра и управления в реальном времени. Поддерживается интеграция внешних инструментов MCP.
* **Песочница:** Каждой задаче выделяется отдельная песочница, работающая в локальной среде Docker.
* **Сессии задач:** История сессий управляется через MongoDB/Redis, поддерживаются фоновые задачи.
* **Диалоги:** Поддержка остановки и прерывания выполнения, а также загрузки и скачивания файлов.
* **Многоязычность:** Поддержка китайского и английского языков.
* **Аутентификация:** Вход и аутентификация пользователей.

## План развития

* **Инструменты:** Поддержка Deploy & Expose.
* **Песочница:** Поддержка доступа с мобильных устройств и компьютеров под управлением Windows.
* **Развертывание:** Поддержка развертывания в многокластерных средах K8s и Docker Swarm.

### Общая схема

![Изображение](https://github.com/user-attachments/assets/69775011-1eb7-452f-adaf-cd6603a4dde5)

**Когда пользователь инициирует диалог:**

1. Веб-интерфейс отправляет запрос на создание Агента на Сервер, который создает Песочницу через `/var/run/docker.sock` и возвращает идентификатор сессии.
2. Песочница — это окружение Ubuntu Docker, в котором запускается браузер Chrome и API-сервисы для инструментов, таких как File/Shell.
3. Веб-интерфейс отправляет сообщения пользователя на идентификатор сессии, и когда Сервер получает сообщения пользователя, он пересылает их Агенту PlanAct для обработки.
4. Во время обработки Агент PlanAct вызывает соответствующие инструменты для выполнения задач.
5. Все события, сгенерированные во время обработки Агентом, отправляются обратно в Веб-интерфейс через SSE.

**Когда пользователи просматривают инструменты:**

- **Браузер:**
    1. Безголовый браузер Песочницы запускает службу VNC через xvfb и x11vnc и преобразует VNC в websocket через websockify.
    2. Компонент NoVNC Веб-интерфейса подключается к Песочнице через Websocket Forward Сервера, обеспечивая просмотр браузера.
- **Другие инструменты:** Другие инструменты работают по схожим принципам.

## Требования к окружению

Этот проект в основном использует Docker для разработки и развертывания и требует наличия достаточно новой версии Docker:
- Docker 20.10+
- Docker Compose

Требования к возможностям модели:
- Совместимость с OpenAI API
- Поддержка Function Calling
- Поддержка вывода в формате JSON

Рекомендуется использовать модели Deepseek и GPT.

## Руководство по развертыванию

Для развертывания рекомендуется использовать Docker Compose:

<!-- docker-compose-example.yml -->
```yaml
services:
  frontend:
    image: simpleyyt/anker-frontend
    ports:
      - "5173:80"
    depends_on:
      - backend
    restart: unless-stopped
    networks:
      - anker-network
    environment:
      - BACKEND_URL=http://backend:8000

  backend:
    image: simpleyyt/anker-backend
    depends_on:
      - sandbox
    restart: unless-stopped
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock:ro
      #- ./mcp.json:/etc/mcp.json # Подключить каталог серверов MCP
    networks:
      - anker-network
    environment:
      # Базовый URL OpenAI API
      - API_BASE=https://api.openai.com/v1
      # Ключ OpenAI API, замените на свой
      - API_KEY=sk-xxxx
      # Название модели LLM
      - MODEL_NAME=gpt-4o
      # Параметр температуры LLM, контролирует случайность
      - TEMPERATURE=0.7
      # Максимальное количество токенов для ответа LLM
      - MAX_TOKENS=2000

      # URI для подключения к MongoDB
      #- MONGODB_URI=mongodb://mongodb:27017
      # Имя базы данных MongoDB
      #- MONGODB_DATABASE=anker
      # Имя пользователя MongoDB (опционально)
      #- MONGODB_USERNAME=
      # Пароль MongoDB (опционально)
      #- MONGODB_PASSWORD=

      # Хост сервера Redis
      #- REDIS_HOST=redis
      # Порт сервера Redis
      #- REDIS_PORT=6379
      # Номер базы данных Redis
      #- REDIS_DB=0
      # Пароль Redis (опционально)
      #- REDIS_PASSWORD=

      # Адрес сервера песочницы (опционально)
      #- SANDBOX_ADDRESS=
      # Docker-образ, используемый для песочницы
      - SANDBOX_IMAGE=simpleyyt/anker-sandbox
      # Префикс для имен контейнеров песочницы
      - SANDBOX_NAME_PREFIX=sandbox
      # Время жизни контейнеров песочницы в минутах
      - SANDBOX_TTL_MINUTES=30
      # Сеть Docker для контейнеров песочницы
      - SANDBOX_NETWORK=anker-network
      # Аргументы браузера Chrome для песочницы (опционально)
      #- SANDBOX_CHROME_ARGS=
      # HTTPS прокси для песочницы (опционально)
      #- SANDBOX_HTTPS_PROXY=
      # HTTP прокси для песочницы (опционально)
      #- SANDBOX_HTTP_PROXY=
      # Хосты, для которых не используется прокси (опционально)
      #- SANDBOX_NO_PROXY=

      # Конфигурация поисковой системы
      # Варианты: baidu, google, bing
      - SEARCH_PROVIDER=baidu

      # Конфигурация поиска Google, используется только если SEARCH_PROVIDER=google
      #- GOOGLE_SEARCH_API_KEY=
      #- GOOGLE_SEARCH_ENGINE_ID=

      # Конфигурация аутентификации
      # Варианты: password, none, local
      - AUTH_PROVIDER=password

      # Конфигурация аутентификации по паролю, используется только если AUTH_PROVIDER=password
      - PASSWORD_SALT=
      - PASSWORD_HASH_ROUNDS=10
      - PASSWORD_HASH_ALGORITHM=pbkdf2_sha256

      # Конфигурация локальной аутентификации, используется только если AUTH_PROVIDER=local
      #- LOCAL_AUTH_EMAIL=admin@example.com
      #- LOCAL_AUTH_PASSWORD=admin

      # Конфигурация JWT
      - JWT_SECRET_KEY=your-secret-key-here
      - JWT_ALGORITHM=HS256
      - JWT_ACCESS_TOKEN_EXPIRE_MINUTES=30
      - JWT_REFRESH_TOKEN_EXPIRE_DAYS=7

      # Путь к файлу конфигурации MCP
      #- MCP_CONFIG_PATH=/etc/mcp.json

      # Уровень логирования приложения
      - LOG_LEVEL=INFO

  sandbox:
    image: simpleyyt/anker-sandbox
    command: /bin/sh -c "exit 0"  # предотвращает запуск песочницы, гарантирует, что образ будет загружен
    restart: "no"
    networks:
      - anker-network

  mongodb:
    image: mongo:7.0
    volumes:
      - mongodb_data:/data/db
    restart: unless-stopped
    #ports:
    #  - "27017:27017"
    networks:
      - anker-network

  redis:
    image: redis:7.0
    restart: unless-stopped
    networks:
      - anker-network

volumes:
  mongodb_data:
    name: anker-mongodb-data

networks:
  anker-network:
    name: anker-network
    driver: bridge
```
<!-- /docker-compose-example.yml -->

Сохраните как файл `docker-compose.yml` и выполните:

```shell
docker compose up -d
```

> Примечание: Если вы видите сообщение `sandbox-1 exited with code 0`, это нормально. Это означает, что образ песочницы был успешно загружен локально.

Откройте браузер и перейдите по адресу <http://localhost:5173>, чтобы получить доступ к Anker.

## Руководство по разработке

### Структура проекта

Этот проект состоит из трех независимых подпроектов:

* `frontend`: фронтенд Anker
* `backend`: бэкенд Anker
* `sandbox`: песочница Anker

### Подготовка окружения

1. Клонируйте проект:
```bash
git clone https://github.com/simpleyyt/ai-anker.git
cd ai-anker
```

2. Скопируйте файл конфигурации:
```bash
cp .env.example .env
```

3. Отредактируйте файл конфигурации:

<!-- .env.example -->
```env
# Конфигурация провайдера моделей
API_KEY=
API_BASE=http://mockserver:8090/v1

# Конфигурация модели
MODEL_NAME=deepseek-chat
TEMPERATURE=0.7
MAX_TOKENS=2000

# Конфигурация MongoDB
#MONGODB_URI=mongodb://mongodb:27017
#MONGODB_DATABASE=anker
#MONGODB_USERNAME=
#MONGODB_PASSWORD=

# Конфигурация Redis
#REDIS_HOST=redis
#REDIS_PORT=6379
#REDIS_DB=0
#REDIS_PASSWORD=

# Конфигурация песочницы
#SANDBOX_ADDRESS=
SANDBOX_IMAGE=simpleyyt/anker-sandbox
SANDBOX_NAME_PREFIX=sandbox
SANDBOX_TTL_MINUTES=30
SANDBOX_NETWORK=anker-network
#SANDBOX_CHROME_ARGS=
#SANDBOX_HTTPS_PROXY=
#SANDBOX_HTTP_PROXY=
#SANDBOX_NO_PROXY=

# Конфигурация поисковой системы
# Варианты: baidu, google, bing
SEARCH_PROVIDER=baidu

# Конфигурация поиска Google, используется только если SEARCH_PROVIDER=google
#GOOGLE_SEARCH_API_KEY=
#GOOGLE_SEARCH_ENGINE_ID=

# Конфигурация аутентификации
# Варианты: password, none, local
AUTH_PROVIDER=password

# Конфигурация аутентификации по паролю, используется только если AUTH_PROVIDER=password
PASSWORD_SALT=
PASSWORD_HASH_ROUNDS=10
PASSWORD_HASH_ALGORITHM=pbkdf2_sha256

# Конфигурация локальной аутентификации, используется только если AUTH_PROVIDER=local
#LOCAL_AUTH_EMAIL=admin@example.com
#LOCAL_AUTH_PASSWORD=admin

# Конфигурация JWT
JWT_SECRET_KEY=your-secret-key-here
JWT_ALGORITHM=HS256
JWT_ACCESS_TOKEN_EXPIRE_MINUTES=30
JWT_REFRESH_TOKEN_EXPIRE_DAYS=7

# Конфигурация MCP
#MCP_CONFIG_PATH=/etc/mcp.json

# Конфигурация логирования
LOG_LEVEL=INFO
```
<!-- /.env.example -->

### Разработка и отладка

1. Запустите в режиме отладки:
```bash
# Эквивалентно 'docker compose -f docker-compose-development.yaml up'
./dev.sh up
```

Все сервисы будут работать в режиме горячей перезагрузки, и изменения в коде будут применяться автоматически. Открытые порты:
- 5173: Порт фронтенда
- 8000: Порт API бэкенда
- 8080: Порт API песочницы
- 5900: Порт VNC песочницы
- 9222: Порт CDP браузера Chrome в песочнице

> *Примечание: В режиме отладки будет запущена только одна глобальная песочница.*

2. При изменении зависимостей (`requirements.txt` или `package.json`), очистите и пересоберите образы:
```bash
# Очистить все связанные ресурсы
./dev.sh down -v

# Пересобрать образы
./dev.sh build

# Запустить в режиме отладки
./dev.sh up
```

### Публикация образов

```bash
export IMAGE_REGISTRY=your-registry-url
export IMAGE_TAG=latest

# Собрать образы
./run build

# Загрузить в соответствующий репозиторий образов
./run push
```