# ---------- Step 1: Build Frontend ----------
    FROM node:18-alpine AS frontend-build
    WORKDIR /app
    
    COPY package.json yarn.lock vite.config.js ./
    COPY resources ./resources
    
    RUN yarn install --ignore-peer-deps
    RUN yarn build
    
    
    # ---------- Step 2: PHP + Laravel ----------
    FROM php:8.3-fpm-alpine
    
    # Cài extension PHP và các thư viện hệ thống cần thiết
    RUN apk add --no-cache \
        bash \
        curl \
        libpng-dev \
        libjpeg-turbo-dev \
        freetype-dev \
        libwebp-dev \
        oniguruma-dev \
        libzip-dev \
        xz \
        linux-headers \
        pkgconf \
        autoconf \
        dpkg-dev \
        dpkg \
        file \
        g++ \
        gcc \
        libc-dev \
        make \
        re2c \
     && docker-php-ext-configure gd --with-freetype --with-jpeg --with-webp \
     && docker-php-ext-install pdo pdo_mysql mbstring zip gd \
     && pecl install xdebug \
     && docker-php-ext-enable xdebug \
     && apk del autoconf dpkg-dev dpkg file g++ gcc libc-dev make pkgconf re2c
    
    # Cài đặt Composer
    RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
    
    WORKDIR /var/www/html
    
    # Copy composer files để cài dependency trước
    COPY composer.json composer.lock ./
    RUN composer install --no-dev --optimize-autoloader --no-interaction --prefer-dist -vvv
    
    # Copy toàn bộ mã nguồn Laravel
    COPY . .
    
    # Copy phần frontend đã build sang thư mục public
    COPY --from=frontend-build /app/public/build ./public/build
    
    # Tối ưu Laravel
    RUN php artisan config:cache
    
    # Render sử dụng cổng 8080, nên ta dùng php-fpm ở đó
    EXPOSE 8080
    CMD ["php-fpm", "-y", "/usr/local/etc/php-fpm.conf", "-R"]
    