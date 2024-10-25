# LinkShare

## Usos/Ejemplos

## Endpoints
Respetar orden de creacion por sus relaciones

http://localhost:8081/
El server corre en el puerto 8081. En caso de querer cambiarlo puedes ir a src/main/resources/application.properties y cambiarlo.
```
server.port=8081
```

## Post
### Post Permisos
```json
http://localhost:8081/api/permissions 
```

```json
{
    "permissionName": "CREATE"
}
```
```json
{
    "permissionName": "READ"
}
```

### Post Roles
http://localhost:8081/api/roles
```json
{
    "role": "USER",
   "permissionsList": [
    {
        "id": 2
    }
   ]  
}
```

### Post Users
```json
http://localhost:8081/api/users
```

```json
{
    "username": "olivia",
    "password": "1234",
    "enabled": true,
    "accountNotExpired": true,
    "accountNotLocked": true,
    "credentialNotExpired": true,
    "rolesList": [
        {
            "id": 1 //permiso "READ"
        }
    ]
}
```

### Post Links
http://localhost:8081/api/links/
```
```json
{
    "id_user": 1,                    
    "link": "https://example.com",   
    "platform": "Example Platform"   
}
```
## Get
### Get Permisos
```json
http://localhost:8081/api/links
```

### Get Links
```json
http://localhost:8081/api/links
```

### Get Users/{id}
```json
http://localhost:8081/api/users/1
```

### Get Users
```json
http://localhost:8081/api/users
```

### Get Roles
```json
http://localhost:8081/api/roles
```

## Put, Rutas publicas y/o privadas
Para hacer
