# 🚀 Начните быстро

## подготовка к окружающей среде

Этот проект в основном опирается на Docker для разработки и развертывания, и требует установки более новой версии Docker:

* Docker 20.10+
* Docker Compose

Требования к возможностям модели:

* Совместим с интерфейсом OpenAI
* Поддержка FunctionCall
* Поддержка вывода формата JSON

Рекомендуются модели DeepSeek и CHATGPT.


## Установка Docker

### Windows & Mac Systems

Установите Docker Desktop в соответствии с официальными требованиями: https://docs.docker.com/desktop/

### Linux System

Установите Docker Engine в соответствии с официальными требованиями: https://docs.docker.com/engine/

## развертывание

Чтобы развернуть с помощью Docker Compose, вам необходимо изменить переменные среды api_base` и `api_key`.

<!-Docker-Compose-Example.yml->
`` `yaml
услуги:
внешний интерфейс:
Изображение: Simpleyyt/Anker-Fontend
Порты:
- "5173: 80"
зависит_on:
- Бэкэнд
Перезагрузите: если не остановиться
Сети:
- Anker-Network
среда:
- backend_url = http: // Backend: 8000

Бэкэнд:
Изображение: Simpleyt/Anker-Backend
зависит_on:
- Песочница
Перезагрузите: если не остановиться
Тома:
- /var/run/docker.sock:/var/run/docker.sock:ro
#- ./mcp.json:/etc/mcp.json # каталог Mount MCP Servers
Сети:
- Anker-Network
среда:
# URL -адрес базы API OpenAI
- api_base = https: //api.openai.com/v1
# Openai api -ключ, замените своим собственным
- api_key = sk-xxxx
# Название модели LLM
- MODEL_NAME = GPT-4O
# Параметр температуры LLM, контролирует случайность
- Температура = 0,7
# Максимальные жетоны для ответа LLM
- max_tokens = 2000

# Mongodb connection uri
#- mongodb_uri = mongodb: // mongodb: 27017
# Имя базы данных MongoDB
#- mongodb_database = anker
# Mongodb имя пользователя (необязательно)
#- mongodb_username =
# Пароль mongodb (необязательно)
#- mongodb_password =

# Redis Server HostName
#- redis_host = redis
# Порт сервера Redis
#- redis_port = 6379
# Номер базы данных Redis
#- redis_db = 0
# Redis Password (необязательно)
#- redis_password =

# Адрес сервера Sandbox (необязательно)
#- Sandbox_address =
# Изображение Docker, используемое для песочницы
- Sandbox_image = Simpleyyt/Anker-Sandbox
# Префикс для названий контейнеров из песочницы
- Sandbox_Name_prefix = Sandbox
# Время пройти для контейнеров из песочниц за считанные минуты
- Sandbox_ttl_minutes = 30
# Docker Network для контейнеров из песочницы
- Sandbox_network = Anker-Network
# Chrome Browser аргументы для песочницы (необязательно)
#- Sandbox_chrome_args =
# Https proxy для песочницы (необязательно)
#- sandbox_https_proxy =
# Http -прокси для песочницы (необязательно)
#- Sandbox_http_proxy =
# Нет прокси -хостов для песочницы (необязательно)
#- Sandbox_no_proxy =

# Конфигурация поисковой системы
# Параметры: Baidu, Google, Bing
- search_provider = baidu

# Конфигурация поиска Google, используемая только при search_provider = Google
#- Google_search_api_key =
#- Google_Search_Engine_id =

# Конфигурация автозаправления
# Параметры: пароль, нет, локальный
- auth_provider = пароль

# Конфигурация авторов пароля, используемая только при auth_provider = пароль
- password_salt =
- password_hash_rounds = 10
- password_hash_algorithm = pbkdf2_sha256

# Локальная конфигурация автоза. Используется только при auth_provider = local
#- local_auth_email=admin@example.com
#- local_auth_password = admin

# Jwt configuration
-jwt_secret_key = your-secret-key-here
- jwt_algorithm = hs256
- jwt_access_token_expire_minutes = 30
- jwt_refresh_token_expire_days = 7

# Путь файла конфигурации MCP
#- mcp_config_path =/etc/mcp.json

# Уровень журнала приложений
- log_level = info

Песочница:
Изображение: Simpleyyt/Anker-Sandbox
Команда: /bin /sh -c "exit 0" # предотвратить запуск песочницы, убедитесь, что изображение вытянуто
перезапуск: "нет"
Сети:
- Anker-Network

mongodb:
Изображение: Монго: 7.0
Тома:
- mongodb_data:/data/db
Перезагрузите: если не остановиться
#ports:
# - "27017: 27017"
Сети:
- Anker-Network

Redis:
Изображение: Redis: 7.0
Перезагрузите: если не остановиться
Сети:
- Anker-Network

Тома:
mongodb_data:
Имя: Anker-Mongodb-Data

Сети:
Anker-Network:
Имя: Anker-Network
Водитель: мост
`` `
<!-/докер-compose-example.yml->

Сохраните его в файл `docker-compose.yml` и запустите:

`` `bash
Docker Compose -D
`` `

> Примечание. Если подсказка `Sandbox-1, выходящая из кода 0`, является нормальной, это позволяет успешно вытащить изображение песочницы локально.

Откройте браузер и посетите <http: // localhost: 5173>, чтобы получить доступ к Anker.