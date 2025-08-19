# AI Anker

[Английский](README.md) | Русский | [Документы](https://docs.ai-anker.com)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

AI Anker - это универсальная система агентов AI, которая поддерживает запуск различных инструментов и операций в среде песочницы.

Начните свое путешествие к агенту с AI Anker!

👏 Добро пожаловать в присоединение [QQ Группа (1005477581)] (https://qun.qq.com/universal-share/share?ac=1&authkey=p4x3da5impr4liaenxwvhs7ivalpkicftue vrljouz9qstszsmnpjc3hzsjjgqyv & busi_data = eyjncm91cenvzguioiixmda1ndc3ntgxiiwidg9rzw4ioijnzmurtmq0uzndzdqndfvd jvps1vcrkjgrwvlv0r3rfjsrvfozdawrjfdeudum0t6auiyczlvdzrjv1byn09iiiwidwluijoimzqymjexode1in0%3d & data = c3b-e6ble BailV32CO77IXL5VXPIHTD9Y_ITWLSQ50HKQOSO_55_ISOZYM2FAAQ4HS9-517TUY8GSWADWPOM-A & SVCTYPE = 4 & TEMPID = H5_GROUP_INFO)

## Пример

### Основные функции

https://github.com/user-attachments/assets/37060a09-c647-4bcb-920c-959f7fa73ebe

### Использование браузера

* Задача: LLM Последняя статья

https://github.com/user-attachments/assets/8f7788a4-fbda-49f5-b836-949a607c64ac

### Использование кода

* Задача: Напишите сложный пример Python

https://github.com/user-attachments/assets/5cb2240b-0984-4db0-8818-a24f81624b04


## Основные функции

* Развертывание: для завершения развертывания требуется только одна служба LLM, и не нужно полагаться на другие внешние службы.
* Инструменты: поддерживает терминал, браузер, файл, веб -поиск, инструменты сообщений и поддерживает реальное просмотр и поглощение, а также поддерживает внешнюю интеграцию инструмента MCP.
* Песочница: каждой задаче будет назначена отдельная песочница, которая работает в местной среде док -станции.
* Сессия задачи: управляет историей сеанса через Mongo/Redis и поддерживает фоновые задачи.
* Диалог: поддерживает остановку и прерывание, и поддерживает загрузку и загрузку файлов.
* Многоязычный: поддерживает китайский и английский.
* Аутентификация: пользовательский вход и аутентификация.

## План развития

* Инструменты: поддерживает развертывание и разоблачение.
* Sandbox: поддерживает доступ к мобильным телефонам и компьютерам Windows.
* Развертывание: поддерживает многоклассное развертывание K8S и Dock Swarm.

## Экологические требования

Этот проект в основном опирается на Docker для разработки и развертывания, и требует установки более новой версии Docker:
- Docker 20.10+
- Docker Compose

Требования к возможностям модели:
- Совместим с интерфейсом OpenAI
- Поддержка функции
- Поддержка вывода формата JSON

Рекомендуются модели DeepSeek и GPT.


## Руководство по развертыванию

Рекомендуется использовать Docker Compose для развертывания:

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
#- local_auth_password = admin# Jwt configuration
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

Сохраните его в файл `docker-compose.yml` и запустите его

`` `Shell
Docker Compose -D
`` `

> Примечание. Если подсказка `Sandbox-1, выходящая из кода 0`, является нормальной, это позволяет успешно вытащить изображение песочницы локально.

Откройте браузер и посетите <http: // localhost: 5173>, чтобы получить доступ к Anker.

## Руководство по разработке

### Структура проекта

Этот проект состоит из трех независимых подпроектов:

* `frontend`: Anker frontend
* `Backend`: Anker Backend
* `Sandbox`: Anker Sandbox

### Общий дизайн

![Image] (https://github.com/user-attachments/assets/69750111-1eb7-452f-adaf-cd6603a4dde5)

** Когда пользователь инициирует разговор: **

1. Интернет отправляет запрос на создание агента на сервер. Сервер создает песочницу через `/var/run/docker.sock` и возвращает идентификатор сеанса.
2. Sandbox - это среда Ubuntu Docker, которая запускает услуги API для браузеров Chrome и инструментов файлов/оболочки.
3. Интернет отправляет сообщения пользователя на идентификатор сеанса.После того, как сервер получает сообщение пользователя, он отправляет сообщение агенту PlanAct для обработки.
4. Во время процесса агента PlanAct соответствующие инструменты будут вызваны для выполнения задачи.
5. Все события, созданные во время обработки агента, отправляются обратно в Интернет через SSE.

** Когда пользователь просматривает инструмент: **

- Браузер:
1. Браузер без головы Sandbox запускает службу VNC через XVFB и X11VNC и преобразует VNC в WebSocket через WebSockify.
2. Компонент NOVNC в Интернете пересылается в песочницу через WebSocket Server, чтобы включить просмотр браузеров.
- Другие инструменты: принципы других инструментов похожи.

### Подготовка окружающей среды

1. Загрузите проект:
`` `bash
git clone https://github.com/simpleyyt/ai-anker.git
CD AI-Anker
`` `

2. Скопируйте файл конфигурации:
`` `bash
cp.env.example.env
`` `

3. Измените файл конфигурации:

<!-.env.Example->
`` `env
# Конфигурация поставщика моделей
Api_key =
Api_base = http: // mockserver: 8090/v1

# Конфигурация модели
Model_name = deepseek-chat
Температура = 0,7
Max_tokens = 2000

# Mongodb configuration
#Mongodb_uri = mongodb: // mongodb: 27017
#Mongodb_database = anker
#Mongodb_username =
#Mongodb_password =

# Redis Configuration
#Redis_host = redis
#Redis_port = 6379
#Redis_db = 0
#Redis_password =

# Конфигурация песочницы
#Sandbox_Address =
Sandbox_image = Simpleyyt/Anker-Sandbox
Sandbox_Name_prefix = Sandbox
Sandbox_ttl_minutes = 30
Sandbox_network = Anker-Network
#Sandbox_chrome_args =
#Sandbox_https_proxy =
#Sandbox_http_proxy =
#Sandbox_no_proxy =

# Конфигурация поисковой системы
# Параметры: Baidu, Google, Bing
Search_provider = baidu

# Конфигурация поиска Google, используемая только при search_provider = Google
#Google_Search_api_key =
#Google_Search_Engine_id =

# Конфигурация автозаправления
# Параметры: пароль, нет, локальный
Auth_provider = пароль

# Конфигурация авторов пароля, используемая только при auth_provider = пароль
Password_salt =
Password_hash_rounds = 10
Password_hash_algorithm = pbkdf2_sha256

# Локальная конфигурация автоза. Используется только при auth_provider = local
#Local_auth_email=admin@example.com
#Local_auth_password = admin

# Jwt configuration
Jwt_secret_key = your-secret-key-here
Jwt_algorithm = hs256
Jwt_access_token_expire_minutes = 30
Jwt_refresh_token_expire_days = 7

# Конфигурация MCP
#Mcp_config_path =/etc/mcp.json

# Конфигурация журнала
Log_level = info
`` `
<!-/.env.Example->

### Разработка и отладка

1. Запустите отладку:
`` `bash
# эквивалент Docker Compose -f Docker-Compose-Development.yaml Up
./dev.sh Up
`` `

Каждая служба будет работать в режиме перезагрузки, а изменения кода автоматически перезагружаются.Открытые порты следующие:
- 5173: Интернет-порт веб-интерфейса
- 8000: порт службы сервера API API
- 8080: сервисный порт Sandbox API
- 5900: порт Sandbox VNC
- 9222: порт CDP -браузера Sandbox Chrome

> *Примечание: только одна песочница будет запущена во всем мире в режиме отладки *

2. Когда изменяется зависимость (TELDES.TXT или Package.json), чистая и восстановите:
`` `bash
# Очистите все связанные ресурсы
./dev.sh вниз -v

# Восстановить изображение
./dev.sh Build

# Отладка и бега
./dev.sh Up
`` `

### Зеркальный релиз

`` `bash
Экспорт Image_registry = your-argistry-url
Экспорт Image_tag = Последний

# Построить зеркало
./run Build

# Нажмите к соответствующему репозиторию зеркала
./run push
`` `