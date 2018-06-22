# GoMarket API

_A social media for buy/sell and offer services_

### Developed with
+ Frontend
    * Onsen UI v2
    * React JS
    * Monaca structure

+ Backend
    * Django framework
    * Django REST framework
    * Python 3.6
    * Database: MySQL

### Requeriments
+ For frontend
    1. Install [NodeJs](https://nodejs.org/es/download/)
    2. Check if you have npm installed, run: ```npm --version```
    3. Install monaca client, run: ```npm install -g monaca```
    4. In your console, go to GoMarket folder and run: ```npm install``` for install the dependencies
    5. If everything run fine, just run: ```monaca preview``` for run the mobile app

+ For backend
    1. Install [Python](https://www.python.org/). (if you have linux, you probably already have python installed)
    2. Install dependencies with pip.
        1. [Django framework](https://docs.djangoproject.com/en/2.0/topics/install/)
        2. [Django rest framework](http://www.django-rest-framework.org/tutorial/quickstart/)
        3. [MySQL Driver](https://docs.djangoproject.com/en/2.0/ref/databases/)
            1. If you want to work with another database manager, you need to change the settings on GoMarketAPI/GoMarketAPI/settings.py file
        4. [Corsheaders](https://github.com/ottoyiu/django-cors-headers)
        5. [rest auth](http://django-rest-auth.readthedocs.io/en/latest/installation.html)
    3. After install all, you need to have a database with the name of gomarket (or other name that you like, but you must need to change the configuration)
    4. then you need to run: ```python manage.py migrate``` for update the database
    5. Finally run: ```python manage.py runserver 8001``` 
    6. Done!
        