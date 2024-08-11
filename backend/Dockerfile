# Используем официальный образ PHP с Apache
FROM php:8.1-apache

# Устанавливаем рабочую директорию
WORKDIR /var/www/html

# Устанавливаем необходимые инструменты
RUN apt-get update && apt-get install -y \
    git \
    unzip \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Копируем файлы composer.json и composer.lock
COPY composer.json composer.lock ./

# Устанавливаем Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Устанавливаем зависимости через Composer
RUN composer install

# Копируем остальные файлы приложения в контейнер
COPY . .

# Устанавливаем необходимые расширения PHP
RUN docker-php-ext-install pdo pdo_mysql

# Открываем порт 80
EXPOSE 80

# Запускаем Apache
CMD ["apache2-foreground"]
