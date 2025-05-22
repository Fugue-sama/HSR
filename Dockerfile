# Step 1: Build frontend
FROM node:18-alpine AS frontend-build
WORKDIR /app

COPY package.json yarn.lock vite.config.js ./
COPY resources ./resources

RUN yarn install --ignore-peer-deps
RUN yarn build

# Step 2: PHP + Laravel
FROM php:8.3-fpm-alpine
# Cài các extension cần thiết
RUN apk add --no-cache bash libpng-dev libzip-dev curl \
    && docker-php-ext-install pdo pdo_mysql mbstring zip gd \
    && apk add --no-cache --virtual .build-deps $PHPIZE_DEPS \
    && pecl install xdebug \
    && docker-php-ext-enable xdebug

# Cài Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

WORKDIR /var/www/html

# Copy composer files
COPY composer.json composer.lock ./

# Cài dependencies PHP trước
RUN composer install --no-dev --optimize-autoloader --no-interaction --prefer-dist -vvv

# Copy source còn lại
COPY . .

# Copy frontend build
COPY --from=frontend-build /app/public/build ./public/build

RUN php artisan config:cache

EXPOSE 9000
CMD ["php-fpm"]
