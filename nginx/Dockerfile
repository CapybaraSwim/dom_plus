FROM nginx:1.27-alpine-slim

# Устанавливаем curl
RUN apk add --no-cache curl


# Копируем конфигурационные файлы
COPY ./nginx.conf /etc/nginx/nginx.conf
COPY ./backend/nginx/backend.conf /etc/nginx/conf.d/backend.conf
COPY ./frontend/nginx/frontend.conf /etc/nginx/conf.d/frontend.conf


# Открываем порт 80
EXPOSE 80

# Запускаем Nginx
CMD ["nginx", "-g", "daemon off;"]
