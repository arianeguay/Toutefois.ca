#!/bin/bash

# Exit immediately if a command exits with a non-zero status.
set -e

# Update package lists
echo "Updating package lists..."
sudo apt-get update

# Install Nginx
echo "Installing Nginx..."
sudo apt-get install nginx -y

# Install MySQL Server
echo "Installing MySQL Server..."
sudo apt-get install mysql-server -y

# Install PHP and common extensions for WordPress
echo "Installing PHP and extensions..."
sudo apt-get install php-fpm php-mysql php-curl php-gd php-mbstring php-xml php-xmlrpc php-soap php-intl php-zip -y

echo "LEMP stack installation completed."
echo "Next, please run 'sudo mysql_secure_installation' to secure your MySQL installation."
