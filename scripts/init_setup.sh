#!/bin/bash

sudo apt-get update
sudo apt-get upgrade -y
sudo apt-get clean

sudo apt install npm -y

# sudo apt install mariadb-server -y

# sudo mysql -e "create database cloudDB;"
# sudo mysql -e "CREATE USER 'user1'@localhost IDENTIFIED BY 'password1';"
# sudo mysql -e "GRANT ALL PRIVILEGES ON *.* TO 'user1'@localhost IDENTIFIED BY 'password1';"
# sudo mysql -e "FLUSH PRIVILEGES;"

# sudo mysql -e "ALTER USER 'root'@'%' IDENTIFIED BY 'mysql';"
# sudo mysql -e "FLUSH PRIVILEGES;"

# sudo mysql -u root --skip-password << EOF
# ALTER USER 'root'@'localhost' IDENTIFIED BY 'mysql';
# EOF

sudo apt-get install unzip -y
sudo apt-get install collectd -y
wget https://amazoncloudwatch-agent.s3.amazonaws.com/debian/amd64/latest/amazon-cloudwatch-agent.deb

sudo dpkg -i -E ./amazon-cloudwatch-agent.deb

sudo /opt/aws/amazon-cloudwatch-agent/bin/amazon-cloudwatch-agent-ctl -a fetch-config -m ec2 -c file:/opt/config.json -s

sudo mkdir /opt/demo
sudo unzip /opt/webapp.zip -d /opt/demo/

cd /opt/demo/server
sudo npm i

cd /opt/demo/server/config
ls

sudo useradd -r -s /sbin/nologin appuser
sudo chown -R appuser:appuser /opt/demo/server
pwd

sudo cp app_startup.service /lib/systemd/system/app_startup.service
ls /lib/systemd/system

sudo systemctl daemon-reload
sudo systemctl start app_startup
sudo systemctl enable app_startup



# sudo node index.js
# unzip /temp/webapp.zip -d /temp/

# cd /opt/webapp/server
# npm i

# cd /temp/webapp/server
# npm i
# node index.js
