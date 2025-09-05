FROM wordpress:6.2.2-php8.1-apache

# Set server name and document root
RUN echo "ServerName localhost" >> /etc/apache2/apache2.conf

# Enable mod_rewrite
RUN a2enmod rewrite

# Update PHP configuration
RUN { \
    echo 'memory_limit = 512M'; \
    echo 'upload_max_filesize = 100M'; \
    echo 'post_max_size = 100M'; \
    echo 'max_execution_time = 360'; \
    echo 'max_input_time = 360'; \
} > /usr/local/etc/php/conf.d/uploads.ini

# Set proper permissions
RUN chown -R www-data:www-data /var/www/html/
