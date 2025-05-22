# Step 1: Build frontend
FROM node:18-alpine AS frontend-build
WORKDIR /app

# Copy file cấu hình + source code
COPY resources resources
COPY vite.config.js ./
COPY package.json yarn.lock vite.config.js ./
COPY resources ./resources

# Install dependencies và build frontend
RUN yarn install --ignore-peer-deps
RUN yarn build

# Step 2: PHP + Laravel
FROM php:8.1-fpm-alpine
WORKDIR /var/www/html

RUN apk add --no-cache libpng-dev oniguruma-dev zip unzip curl \
    && docker-php-ext-install pdo pdo_mysql mbstring exif pcntl bcmath gd

RUN composer clear-cache

RUN composer install --no-dev --optimize-autoloader --no-interaction --prefer-dist -vvv
# Copy source Laravel
COPY . .

# Copy frontend build ra public 
COPY --from=frontend-build /app/public/build ./public/build

# Cài Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
RUN composer install --no-dev --optimize-autoloader -vvv

# Cache config
RUN php artisan config:cache

EXPOSE 9000
CMD ["php-fpm"]
