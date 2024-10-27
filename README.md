# DataCraft project by team "Кабаний клык"
---
## Требования
- *PostgreSQL 14.0+*
- *.NET 6.0*
- *ASP\.NET Core 6.0*
- *Entity Framework Core 6.0*
- *Swagger*
- *node.js*

## Инструкция по развертыванию бэкенда

1. Зайти в папку `DataCraftServer`
2. Открыть файл `appsettings.json` и настроить адрес БД, пользователя и пароль, а также, опционально, порт для подключения
3. Перейти в папку `Properties` и открыть файл `launchSettings.json`, где настроить адрес и порт сервера приложения
4. Перейти обратно в папку `DataCraftServer` и запустить проект с помощью команды `dotnet run`

## Инструкция по развертыванию фронтенда

1. Зайти в папку `client`
2. Установить yarn с помощью npm: `npm install --global yarn`
3. Установить зависимости проекта: `yarn install`
4. Запустить проект с помощью команды `yarn start`