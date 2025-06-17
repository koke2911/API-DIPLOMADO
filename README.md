1. clonar repositorio

2. nmp install (instale los node modules)


3  docker compose up --build

4. http://localhost:3000/api/docs/

4. logearse:  POST http://localhost:3000/api/auth/register 

{
  "nombre": "Victor",
  "email": "victor@mail.com",
  "contrasena": "123456"
}

5. logearse:  GET http://localhost:3000/api/auth/login 

{
  "email": "victor@mail.com",
  "contrasena": "123456"
}

6. mis usuario http://localhost:3000/api/usuarios/me  

Authorization Bearer : 

7. 