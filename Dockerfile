# Step 1: build frontend
FROM node:18-alpine AS frontend-build
WORKDIR /app
COPY resources/js resources/js
COPY resources/css resources/css
COPY package.json package-lock.json ./
RUN yarn install --ignore-peer-deps
RUN yarn build

# Step 2: PHP + Laravel
FROM php:8.1-fpm-alpine
WORKDIR /var/www/html

# Cài thêm extensions nếu cần
RUN apk add --no-cache \
    bash \
    git \
    libpng-dev \
    oniguruma-dev \
    zip \
    unzip \
    curl \
    && docker-php-ext-install pdo pdo_mysql mbstring exif pcntl bcmath gd

# Copy source code Laravel vào
COPY . .

# Copy frontend build ra public folder (tùy project)
COPY --from=frontend-build /app/dist ./public/build

# Cài Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

RUN composer install --no-dev --optimize-autoloader

# Cache config và migrate DB
RUN php artisan config:cache
RUN php artisan migrate --force

EXPOSE 9000
CMD ["php-fpm"]
