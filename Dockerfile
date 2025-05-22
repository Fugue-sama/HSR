# Step 1: Build frontend
FROM node:18-alpine AS frontend-build
WORKDIR /app

COPY package.json yarn.lock vite.config.js ./
COPY resources ./resources

RUN yarn install --ignore-peer-deps
RUN yarn build

# Step 2: PHP + Laravel
FROM php:8.1-fpm-alpine
WORKDIR /var/www/html

RUN apk add --no-cache libpng-dev oniguruma-dev zip unzip curl \
    && docker-php-ext-install pdo pdo_mysql mbstring exif pcntl bcmath gd

# Cài Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Copy source Laravel trước khi cài dependencies
COPY . .

# Xóa cache composer (optional)
RUN composer clear-cache

# Cài dependencies PHP (lúc này composer đã có, code cũng đã có)
RUN composer install --no-dev --optimize-autoloader --no-interaction --prefer-dist -vvv

# Copy frontend build từ frontend-build stage (vì vite mặc định build ra thư mục dist)
COPY --from=frontend-build /app/public/build ./public/build

RUN php artisan config:cache

EXPOSE 9000
CMD ["php-fpm"]
