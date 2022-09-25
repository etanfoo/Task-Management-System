# Backend

## Dependencies
* java 11
* postgreSQL

## Configuration
* set up a database with name task_hub, if you already have a db with this name, use a new one and change the `spring.datasource.url` in file application.properties in `src/main/resources` to point to your db
* NOTE: current application.properties is setup to connect where your pg_hba.conf is configured with `trust` instead of `md5`, if you want to use `md5`, you will have to enter the username and password for your postgres user in application.properties

## Running application
* spin up postgres server with above configuration
* run java file BackendApplication in `src/main/java/com/redlions/backend`
* application will now run on localhost port 7777 (can be changed in application.properties file to custom port)