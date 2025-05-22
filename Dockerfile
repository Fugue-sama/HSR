FROM node:18-alpine AS frontend-build
WORKDIR /app

COPY package.json yarn.lock vite.config.js ./
COPY resources ./resources

RUN yarn install --ignore-peer-deps
RUN yarn build

FROM php:8.3-fpm-alpine

RUN apk add --no-cache bash libpng-dev libzip-dev curl autoconf dpkg-dev dpkg file g++ gcc libc-dev make pkgconf re2c \
    freetype-dev libjpeg-turbo-dev libwebp-dev libxpm-dev

RUN docker-php-ext-configure gd \
    --with-freetype \
    --with-jpeg \
    --with-webp \
    --with-xpm

RUN docker-php-ext-install gd pdo pdo_mysql mbstring zip

RUN pecl install xdebug \
    && docker-php-ext-enable xdebug

RUN apk del autoconf dpkg-dev dpkg file g++ gcc libc-dev make pkgconf re2c

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

WORKDIR /var/www/html

COPY composer.json composer.lock ./

RUN composer install --no-dev --optimize-autoloader --no-interaction --prefer-dist -vvv

COPY . .

COPY --from=frontend-build /app/public/build ./public/build

RUN php artisan config:cache --ansi

EXPOSE 9000
CMD ["php-fpm"]
