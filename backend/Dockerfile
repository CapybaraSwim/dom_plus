# Используем официальный образ PHP с Apache
FROM php:8.1-apache

# Устанавливаем рабочую директорию
WORKDIR /var/www/html


# Use a different mirror
RUN sed -i 's/http:\/\/deb.debian.org\/debian/http:\/\/ftp.debian.org\/debian/g' /etc/apt/sources.list

# Update and install packages
RUN apt-get update && \
    apt-get install -y unzip curl && \
    rm -rf /var/lib/apt/lists/*

# Копируем файлы приложения в контейнер
COPY . .

# Открываем порт 80
EXPOSE 80

# Запускаем Apache
CMD ["apache2-foreground"]
