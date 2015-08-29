# Student Guardian

##Backend App [/server](https://github.com/hackathon-5/the-black-terminal-window-repo/tree/master/Server)
---
**Dependancies**

[Python 3.x](https://www.python.org/download/releases/3.0/) - Backend server is running on Python 3.4

[Flask](http://flask.pocoo.org/) - The main routing / api engine

[sqlalchemy](http://www.sqlalchemy.org/) - Sits between the Python and Database (so they don't start fighting)

[BCrypt](https://flask-bcrypt.readthedocs.org/en/latest/) - All passwords and access tokens are stored and verified using 14 round bcrypt

[Docker](https://www.docker.com/) & [Postgres](https://hub.docker.com/_/postgres/) - Are used to deploy persistant application storage

All Hail [Trusty Tahr](http://releases.ubuntu.com/14.04/)! - Ubuntu doing the important stuff, but any linux should work

##Web App [/web](https://github.com/hackathon-5/the-black-terminal-window-repo/tree/master/Web)
---
**Dependancies**

[Material AnugularJS](https://material.angularjs.org/latest/#/) - This is the core of the application

[AngularJS Base64 Image](https://github.com/adonespitogo/angular-base64-upload) - Used to convert image objects to B64 to send to server

[Nginx](http://wiki.nginx.org/Main) - For serving the web app, could use any web server

> 		server {
>         listen 80 default_server;
>         listen [::]:80 default_server ipv6only=on;
> 
>         root /usr/share/nginx/html;
>         index index.html index.htm;
> 
>         # Make site accessible from http://localhost/
>         server_name localhost;
> 
>         location / {
>                 try_files $uri /index.html;

>         }
> 		}

---
---
After the 18 hour burndown


![I Have!](http://i.imgur.com/BoiychX.png)



