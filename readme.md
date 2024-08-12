# node-auth

## curl

```sh

curl -v -Method Post -Uri "http://localhost:5000/register" -Headers @{'Content-Type' = 'application/json'} -Body '{"email" : "", "name" :"", "password" :"", "confirmPassword" : ""}'


curl -v -Method Post -Uri "http://localhost:5000/login" -Headers @{'Content-Type' = 'application/json'} -Body '{"name" :"", "password" :""}'




```


## Steps to Run :

1. Clone the repository
2. Open VS code or any IDE 
3. start up your docker service
4. Look at the .env.example files and configure your env
   files
5. RUN THESE COMMAND - npm run build
                    - npm run up
6. Now your server will be up running
7. Use Postman to start making request
   at http://localhost:PORT/ .Refer Postman Collection for looking up routes for making request.

### Note :
- Make sure you have docker installed in your system.
- If you face issues connecting to mongodb docker service then follow below steps :
  -> Open your Docker Desktop application
  -> Look for the Database container name in your backend
     running service.
  -> Run this command "docker exec -it DATABASE_CONTAINER_NAME bash"  
  -> This will open mongo shell in the container in your terminal
  -> Run this command for authenticating database : "mongosh -u USERNAME -p PASSWORD --authenticationDatabase DATABASE_NAME"
  -> If above command fails try logging in database using this command "mongo -u USERNAME -p PASSWORD"
  -> Now you can exit mongo shell and start running the application again

### References : 
 https://expressjs.com/en/resources/middleware/session.html
 https://www.mongodb.com/resources/languages/express-mongodb-rest-api-tutorial
 https://www.npmjs.com/package/ioredis
 https://www.npmjs.com/package/connect-redis
 https://nodejs.org/docs/latest/api/
 https://www.mongodb.com/docs/manual/geospatial-queries/

       


