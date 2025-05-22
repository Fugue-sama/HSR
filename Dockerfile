# ---------- Step 1: Build Frontend ----------
    FROM node:18-alpine AS frontend-build
    WORKDIR /app
    
    COPY package.json yarn.lock vite.config.js ./
    COPY resources ./resources
    
    RUN yarn install --ignore-peer-deps
    RUN yarn build
    
    
    # ---------- Step 2: PHP + Laravel ----------
    FROM php:8.3-fpm-alpine
    
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
    
    # Copy phần frontend đã build
    COPY --from=frontend-build /app/public/build ./public/build
    
    # Cài PHP dependencies
    RUN composer install --no-dev --optimize-autoloader --no-interaction --prefer-dist
    
    # Cấp quyền cho storage & cache
    RUN chmod -R 775 storage bootstrap/cache
    # Tạo file .env từ .env.example nếu chưa có
    RUN [ -f .env ] || cp .env.example .env
    # Chạy lệnh Laravel nếu có .env
    RUN if [ -f ".env" ]; then php artisan key:generate; fi
    
    # Cache config (sau khi đã có .env và key)
    RUN if [ -f ".env" ]; then php artisan config:cache; fi
    
    
    # Dùng server nội bộ Laravel (tạm chấp nhận trên Render)
    EXPOSE 8080
    CMD ["sh", "-c", "php artisan serve --host=0.0.0.0 --port=${PORT:-8080}"]
    
        