website url=> https://electronicstoreapi.herokuapp.com/ 

api documentation=>https://electronicstoreapi.herokuapp.com/docs/

api testing link=>https://electronicstoreapi.herokuapp.com/v1

for example to get all the employees use=>https://electronicstoreapi.herokuapp.com/v1/employees

To make items only accessed by employees and nobody else I have used bearer token authentication

to make changes to items first we need to login to employee and get the jwt token and pass that token into authorization(bearer) 

for items api testing use postman(for passing jwt token obtained from employee login in the authorization header(bearer authorization)) 

for example to get all the items first login into employee using

https://electronicstoreapi.herokuapp.com/v1/employees/login?username=abcd&password=yuio

paste that jwt token into bearer authoriation using postman and link

https://electronicstoreapi.herokuapp.com/v1/Items

similarly for all other items actions