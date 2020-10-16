#! bin/bash

echo "Install default packages"

if [ $(whereis node | grep ' ' -ic) -eq 1 ]; then
    echo "Node exist"
else 
    $(sudo apt install nodejs)
fi

if [ $(whereis npm | grep ' ' -ic) -eq 1 ]; then
    echo "NPM exist"
else 
    $(sudo apt install npm)
fi

if [ $(whereis mysql | grep ' ' -ic) -eq 1 ]; then
    echo "MySql exist"
else 
    $(sudo apt install mysql-sever)
fi

if [ $(whereis mongo | grep ' ' -ic) -eq 1 ]; then
    echo "MySql exist"
else 
    $(wget -qO - https://www.mongodb.org/static/pgp/server-3.6.asc | sudo apt-key add -)
    $(sudo apt update)
    $(sudo apt install -y mongodb-org)
fi
