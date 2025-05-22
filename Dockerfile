# Step 1: Build frontend
FROM node:18-alpine AS frontend-build
WORKDIR /app

# Copy file cấu hình + source code
COPY package.json yarn.lock vite.config.js ./
COPY resources resources

# Install dependencies và build frontend
RUN yarn install --ignore-peer-deps
RUN yarn build

# Step 2: PHP + Laravel
FROM php:8.1-fpm-alpine
WORKDIR /var/www/html

RUN apk add --no-cache \
    bash \
    git \
    libpng-dev \
    oniguruma-dev \
    zip \
    unzip \
    curl \
    && docker-php-ext-install pdo pdo_mysql mbstring exif pcntl bcmath gd

# Copy source Laravel
COPY . .

# Copy frontend build ra public (nếu outDir là dist)
COPY --from=frontend-build /app/dist ./public/build

# Cài Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
RUN composer install --no-dev --optimize-autoloader

# Cache config
RUN php artisan config:cache

EXPOSE 9000
CMD ["php-fpm"]
