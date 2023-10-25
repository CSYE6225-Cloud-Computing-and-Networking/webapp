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

sudo mysql -e "ALTER USER 'root'@'%' IDENTIFIED BY 'mysql';"
sudo mysql -e "FLUSH PRIVILEGES;"

sudo mysql -u root --skip-password << EOF
ALTER USER 'root'@'localhost' IDENTIFIED BY 'mysql';
EOF

sudo apt-get install unzip -y

sudo mkdir /opt/demo
sudo unzip /opt/webapp.zip -d /opt/demo/

cd /opt/demo/server
sudo npm i

cd /opt/demo/server/config
ls
sudo cp app_startup.service /lib/systemd/system/app_startup.service

sudo systemctl daemon-reload
sudo systemctl start app_startup
sudo systemctl enable app_startup

sudo groupadd csye6225
sudo useradd -s /bin/false -g csye6225 -d /opt/csye6225 -m csye6225
sudo cp csye6225.service /etc/systemd/system
systemctl daemon-reload
sudo systemctl enable csye6225
sudo systemctl start csye6225
sudo systemctl restart csye6225
sudo systemctl stop csye6225
# sudo node index.js
# unzip /temp/webapp.zip -d /temp/

# cd /opt/webapp/server
# npm i

# cd /temp/webapp/server
# npm i
# node index.js
