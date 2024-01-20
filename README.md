
# CAD FullStack Application

## 🎯 Features

This is a Basketball Management System.

Responsible for storing and showing information about league tournaments.


-   :white_check_mark: Authentication System.
-   :white_check_mark: Password Encryption.
-   :white_check_mark: Animations.
-   :white_check_mark: Admin Dashboard.
-   :white_check_mark: Full Stack


## 🔎 Tech Stack

### BackEnd
- Java
- Spring Boot Framework 
- OAuth2
### Database
- MySQL
### Frontend
- React
- React Router
- Typescript
- Firebase Storage



## 🎞 Installation
#### In order to run this repo, you will need

- Java SDK 19
- Maven
- Intellij IDEA (preferably)
- MySQL Server
- Firebase Storage
## 🎨 Getting things ready

### Configure Spring Boot: Change environment variables based on your system.
Create application.properties file on ```/backend/spring-server/src/main/resources``` folder and paste.

`application.properties file`
```
spring.datasource.url=jdbc:mysql://localhost:{your mysql port}/{your mysql schema}?allowPublicKeyRetrieval=true&verifyServerCertificate=false&useSSL=false&requireSSL=false

spring.datasource.username={your mysql username}

spring.datasource.password={your mysql passord}

spring.datasource.hikari.data-source-properties.useSSL=false

server.port=6004


spring.jpa.hibernate.ddl-auto= update

spring.jpa.open-in-view= false

logging.level.org.hibernate.type.descriptor.sql.BasicBinder=TRACE

jwt.public.key=classpath:app.key.public

jwt.private.key=classpath:app.key.private
```

Create app.key.private and app.key.public files on `/backend/spring-server/src/main/resources/` folder

To use the openssl command, you need to have openssl installed on your system

`openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -sha256 -days 365`

`openssl pkcs8 -topk8 -inform PEM -outform PEM -nocrypt -in key.pem -out pkcs8.key`

### Configure React: Change environment variables based on your Firebase settings.
Create .env file on ```/backend/spring-server/frontend/``` folder and paste.

`.env file`

```
REACT_APP_apiKey=FIREBASE_API_KEY
REACT_APP_authDomain=FIREBASE_AUTHDOMAIN
REACT_APP_projectId=FIREBASE_PROJECTID
REACT_APP_storageBucket=FIREBASE_STORAGEBUCKET
REACT_APP_messagingSenderId=FIREBASE_MESSAGINGSENDERID
REACT_APP_appId=FIREBASE_APPID

REACT_APP_SERVER_PORT=6004 #This port is only used in development

```

### You're all set
Package your project using maven and run `java -jar {jar_path}.jar` command

or

Run ``./mvnw spring-boot:run`` command at `/backend/spring-server/` path

## 👨‍💻 Authors

- [@Trifon Mazarakis](https://www.github.com/Tryferos) (Frontend)
- [@Nikolas Sarakenidis](https://github.com/Nikoreve) (Backend, Database)
- [@Vasilis Thomas](https://github.com/Vasilis-Thomas) (Backend, Database)

## 👨‍🏫 Lessons Learned

- Make better planning for backend.
- Design backend based on frontend's requirements.
- Backend should contain more logic and deal with more operations.
- Use React with a framework rather than standalone.


## ℹ️ Acknowledgements

- [Dropdown](https://www.npmjs.com/package/@tryferos/dropdown)
- [Search](https://www.npmjs.com/package/@tryferos/search)

