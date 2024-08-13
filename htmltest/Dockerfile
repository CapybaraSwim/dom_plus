# Use the official NGINX image as the base image
FROM nginx:latest

# Copy the custom NGINX configuration file to the container
COPY nginx.conf /etc/nginx/nginx.conf

# Copy the HTML file to the default NGINX directory
COPY index.html /usr/share/nginx/html/index.html

# Expose port 80 to the Docker host
EXPOSE 80

# Start NGINX
CMD ["nginx", "-g", "daemon off;"]
