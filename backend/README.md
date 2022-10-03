# Backend

## Dependencies
* docker-compose

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

## Running application
Run following commands in `/backend`.
### Dockerize the Spring Boot project
Generate the JAR file:  
`mvn install -DskipTests`

Build Docker image:  
`sudo docker build -t taskhub-api-docker.jar .`

### Run Docker containers
Start:  
`sudo docker-compose up -d`  
Stop:  
`sudo docker-compose down`

## Some things to note 
* Currently, if using postman, have to send the body as raw JSON and not x-www.form-urlencoded, as Spring Boot needs this configuration. Currently looking into how to fix
* Application runs on localhost port 7777 (can be changed in application.properties file).
* Once started, can view the swagger at `http://localhost:7777/swagger-ui/`.