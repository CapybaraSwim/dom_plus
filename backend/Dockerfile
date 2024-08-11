# Используем официальный образ PHP с Apache
FROM php:8.1-apache

# Устанавливаем рабочую директорию
WORKDIR /var/www/html


# Устанавливаем необходимые инструменты
RUN apt-get update && apt-get install -y \
    unzip \
    curl 
    

# Копируем файлы приложения в контейнер
COPY . .

# Открываем порт 80
EXPOSE 80

# Запускаем Apache
CMD ["apache2-foreground"]
