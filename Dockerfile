# ---------- Step 1: Build Frontend ----------
    FROM node:18-alpine AS frontend-build
    WORKDIR /app
    
    COPY package.json yarn.lock vite.config.js ./
    COPY resources ./resources
    
    RUN yarn install --ignore-peer-deps
    RUN yarn build
    
    
    # ---------- Step 2: PHP + Laravel ----------
    FROM php:8.3-fpm-alpine
    
    # Cài extension PHP và thư viện hệ thống
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
    
    # Cài Composer
    RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
    
    WORKDIR /var/www/html
    
    # Copy toàn bộ mã nguồn Laravel
    COPY . .
	
  # Cài composer sau khi đã có code
    RUN composer install --no-dev --optimize-autoloader --no-interaction --prefer-dist -vvv
    
    # Copy phần frontend đã build
    COPY --from=frontend-build /app/public/build ./public/build
    
    # Tối ưu Laravel
    RUN php artisan config:cache
 
    # Cấp quyền thư mục cần thiết
    RUN chmod -R 775 storage bootstrap/cache
    
    # Generate key nếu chưa có APP_KEY
    RUN php artisan key:generate
    
    # Cài dependencies PHP
    RUN composer install --no-dev --optimize-autoloader --no-interaction --prefer-dist
    
    # Cache config
    RUN php artisan config:cache
    
    EXPOSE 8080
    CMD ["php", "-S", "0.0.0.0:8080", "-t", "public"]
    