  <p align="center">
    <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
  </p>

## Para levantar este proyecto de manera local siga las instrucciones

- 1. Descargue e instale Node en su versión LTS > 20.x.x
- 2. Dirigase al directorio del proyecto y ejecute 'npm install'
- 3. Cree un archivo .env en el root del directorio con las información disponible en el archivo .env.template.deploy
- 4. Ejecute 'npm run start'

## Endpoints

### Obtener usuarios

- **URL**: `GET https://ev-sumativa-4-apirest.onrender.com/api/user/?limit={{limit}}&page={{page}}`
- **Descripción**: Obtiene una lista de usuarios, segun los Query Param provicionado en la URL. limit indica la cantidad de usuarios a mostrar en cada pagina, page indica el offset para definir la cantidad de paginas y permitir la iteración de estas.
- **Cuerpo de la solicitud**: No aplica
  **Cuerpo de la respuesta**:
  ```json
  {
    "users": [
      {
        "nombre": "Nombre del usuario",
        "apellido": "Apellido(s) del usuario",
        "correo_electronico": "Correo electronico del usuario",
        "contrasena": "Contraseña del usuario",
        "esta_eliminado": "true o False del soft delete del usuario"
      }
    ],
    "total_pages": "Numero total de paginas",
    "total_users": "Numero total de usuarios",
    "actual_page": "Pagina en la que se encuentra actualmente"
  }
  ```

### Obtener usuarios

- **URL**: `GET https://ev-sumativa-4-apirest.onrender.com/api/user/{{userTest}}`
- **Descripción**: Obtiene un usuario, segun la uuid provicionado en la URL. userTest indica el valor uuid del usuario registrado.
- **Cuerpo de la solicitud**: No aplica
  **Cuerpo de la respuesta**:
  ```json
  {
    "nombre": "Nombre del usuario",
    "apellido": "Apellido(s) del usuario",
    "correo_electronico": "Correo electronico del usuario",
    "contrasena": "Contraseña del usuario",
    "esta_eliminado": "true o False del soft delete del usuario"
  }
  ```

### Agregar Usuario

- **URL**: `POST https://ev-sumativa-4-apirest.onrender.com/api/user/`
- **Descripción**: Crea un usuario
- **Cuerpo de la solicitud**:
  ```json
  {
    "nombre": "Nombre del usuario",
    "apellido": "Apellido(s) del usuario",
    "correo_electronico": "Correo electronico del usuario",
    "contrasena": "Contraseña del usuario"
  }
  ```
  **Cuerpo de la respuesta**: No aplica

### Actualizar Usuario

- **URL**: `PATCH https://ev-sumativa-4-apirest.onrender.com/api/user/{{userTest}}`
- **Descripción**: Actualiza un usuario, segun la uuid provicionado en la URL. userTest indica el valor uuid del usuario registrado.
- **Cuerpo de la solicitud**:
  ```json
  {
    "nombre": "Nombre del usuario",
    "apellido": "Apellido(s) del usuario",
    "correo_electronico": "Correo electronico del usuario"
  }
  ```
  **Cuerpo de la respuesta**: No aplica

### Borrar Usuario

- **URL**: `DELETE https://ev-sumativa-4-apirest.onrender.com/api/user/{{userTest}}`
- **Descripción**: Borrar un usuario cambiando su valor "esta_eliminado" a true, segun la uuid provicionado en la URL. userTest indica el valor uuid del usuario registrado.
- **Cuerpo de la solicitud**: No aplica
  **Cuerpo de la respuesta**: No aplica
