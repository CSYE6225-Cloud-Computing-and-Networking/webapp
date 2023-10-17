#!/bin/bash

sudo apt-get update
sudo apt-get upgrade -y
sudo apt-get clean

sudo apt install npm -y

sudo apt install mariadb-server -y

# sudo mysql_secure_installation 

# mariadb

sudo mysql -e "create database cloudDB;"
sudo mysql -e "CREATE USER 'user1'@localhost IDENTIFIED BY 'password1';"
sudo mysql -e "GRANT ALL PRIVILEGES ON *.* TO 'user1'@localhost IDENTIFIED BY 'password1';"
sudo mysql -e "FLUSH PRIVILEGES;"

# cd /opt/webapp/server
# npm i

# cd /temp/webapp/server
# npm i
# node index.js