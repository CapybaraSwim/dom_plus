# Используем официальный образ PHP с Apache
FROM php:8.1-apache

# Устанавливаем рабочую директорию
WORKDIR /var/www/html

# Настраиваем APT для использования зеркала https://c.163.com
RUN echo "deb http://mirrors.163.com/debian/ bullseye main contrib non-free" > /etc/apt/sources.list && \
    echo "deb http://mirrors.163.com/debian/ bullseye-updates main contrib non-free" >> /etc/apt/sources.list && \
    echo "deb http://mirrors.163.com/debian/ bullseye-backports main contrib non-free" >> /etc/apt/sources.list && \
    echo "deb http://mirrors.163.com/debian-security bullseye-security main contrib non-free" >> /etc/apt/sources.list && \
    apt-get update

# Устанавливаем необходимые инструменты
RUN apt-get update && apt-get install -y \
    unzip \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Копируем файлы приложения в контейнер
COPY . .

# Открываем порт 80
EXPOSE 80

# Запускаем Apache
CMD ["apache2-foreground"]
