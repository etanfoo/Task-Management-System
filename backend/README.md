# Backend

## Dependencies
* java 11
* docker

## Configuration
Run the following to setup the DB:
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

## Running application
* spin up postgres server with above configuration
* run java file BackendApplication in `src/main/java/com/redlions/backend`
* application will now run on localhost port 7777 (can be changed in application.properties file to custom port)