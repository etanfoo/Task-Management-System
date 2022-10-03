# Backend

## Dependencies
* java 11
* docker
* postgres

## Configuration
Run the following to setup the database:
```
sudo docker run -p 5432:5432 -d \
-e POSTGRES_USER=postgres \
-e POSTGRES_PASSWORD=postgres \
-e POSTGRES_DB=task_hub \
postgres
```
Or the following if you want persistent data:
```
sudo docker run -p 5432:5432 -d \
-e POSTGRES_USER=postgres \
-e POSTGRES_PASSWORD=postgres \
-e POSTGRES_DB=task_hub \
-v pgdata:/var/lib/postgresql/data \
postgres
```

How to connect to database:
```
psql task_hub -h localhost -U postgres
```

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

## Running application
* spin up postgres server with above configuration
* run java file BackendApplication in `src/main/java/com/redlions/backend`
* application will now run on localhost port 7777 (can be changed in application.properties file to custom port)
* once started, can view the swagger at `http://localhost:7777/swagger-ui/`