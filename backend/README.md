# Backend


## Running application with docker-compose

### Dependencies
* docker-compose
* Java 11
* mvn

### Dockerize the Spring Boot project
Run following commands in `/backend`.

Generate the JAR file:  
`mvn install -DskipTests`

Build Docker image:  
`sudo docker build -t taskhub-api-docker.jar .`

### Run Docker containers
Start:  
`sudo docker-compose up -d`  
Stop:  
`sudo docker-compose down`

## Running database with Docker run
Run the following to setup the database:
```
sudo docker run -p 5432:5432 -d \
-e POSTGRES_USER=postgres \
-e POSTGRES_PASSWORD=postgres \
-e POSTGRES_DB=taskhub \
postgres
```
Or the following if you want persistent data:
```
sudo docker run -p 5432:5432 -d \
-e POSTGRES_USER=postgres \
-e POSTGRES_PASSWORD=postgres \
-e POSTGRES_DB=taskhub \
-v pgdata:/var/lib/postgresql/data \
postgres
```

How to connect to database:  
`psql taskhub -h localhost -U postgres`

## File Structure
* The structure of the backend has:
    * Controller
        * for REST endpoints
    * Entity
        * objects that represent records for the database
    * Filter
        * for JWT authentication/authorization
    * Repository
        * encapsulates storage, retrieval and search behaviour, inherits from jpa repository so has those methods
    * Security
        * configuration for security
    * Service
        * business logic

## Some things to note 
* Currently, if using postman, have to send the body as raw JSON and not x-www.form-urlencoded, as Spring Boot needs this configuration. Currently looking into how to fix
* Application runs on localhost port 7777 (can be changed in application.properties file).
* Once started, can view the swagger at `http://localhost:7777/swagger-ui/`.