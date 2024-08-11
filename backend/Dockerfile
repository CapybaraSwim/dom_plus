# Используем официальный образ PHP с Apache
FROM php:8.1-apache

# Устанавливаем рабочую директорию
WORKDIR /var/www/html

# Изменяем зеркало для apt
RUN echo 'deb https://mirror.docker.ru bookworm main contrib non-free non-free-firmware deb-src https://mirror.docker.ru/debian/ bookworm main contrib non-free non-free-firmware deb http://security.debian.org/debian-security bookworm-security main contrib non-free non-free-firmware deb-src http://security.debian.org/debian-security bookworm-security main contrib non-free non-free-firmware deb https://mirror.docker.ru/debian/ bookworm-updates main contrib non-free non-free-firmware deb-src https://mirror.docker.ru/debian/ bookworm-updates main contrib non-free non-free-firmware' > /etc/apt/sources.list

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
