# AutoParts

##	Sistemos paskirtis
Sistema skirta asmenims talpinti automobilių dalių skelbimus ir taip lengviau rasti pirkėjus, o perkantiesiems – lengviau atrasti dalis, kurių jiems reikia.
Kuriama sistema turės 3 dalis – internetinę aplikaciją, duomenų bazę ir API, per kurią vyks komunikacija tarp internetinės aplikacijos ir duomenų bazės.
Asmuo, norėdamas įkelti skelbimą į šią sistemą, turės prisiregistruoti, sukurti savo parduotuvę, sukurti skelbimą, kuriame turės surašyti informaciją apie automobilį, kurio dalys bus parduodamos, ir šis skelbimas bus priskirtas pasirinktai parduotuvei. Surašius automobilio informaciją, naudotojas turės parašyti, kokias dalis nuo šio automobilio parduoda. Jam įdėjus skelbimą, šis bus matomas visiems, net ir neregistruotiems, sistemos naudotojams.

##	Funkciniai reikalavimai
Neregistruotas sistemos naudotojas galės:
-	Prisijungti prie sistemos
-	Prisiregistruoti prie sistemos
-	Peržiūrėti sistemoje esančius skelbimus
-	Peržiūrėti sistemoje esančias parduotuves
-	Peržiūrėti sistemoje esančias dalis

Registruotas sistemos naudotojas galės:
-	Atsijungti nuo sistemos
-	Sukurti parduotuvę:
    -	Įvesti pavadinimą
    -	Įvesti parduotuvės vietą
-	Sukurti skelbimą:
    -	Pasirinkti automobilio markę
    -	Pasirinkti automobilio modelį
    -	Pasirinkti pirmos registracijos datą
    -	Pasirinkti kėbulo tipą
    -	Pasirinkti kuro tipą
    -	Pasirinkti pavarų dėžės tipą
    -	Įvesti ridą
    -	Įvesti darbinį tūrį
    -	Įvesti galią
    -	Priskirti parduodamas dalis:
        -	Parašyti pavadinimą
        -	Parašyti kainą
-	Ištrinti skelbimą
-	Ištrinti parduotuvę
-	Ištrinti parduodamą dalį
-	Pakeisti skelbimo informaciją
-	Pakeisti automobilio informaciją
-	Pakeisti dalies informaciją

Administratorius galės:
-	Ištrinti parduotuvę
-	Ištrinti skelbimą

##	Pasirinktos technologijos
Sistemą sudarys 3 dalys, kurioms realizuoti bus naudojamos šios technologijos:

-	Klientinė dalis (front-end) – React.js
-	Serverio dalis (back-end) – ASP.NET Core
-	Duomenų bazė – MySQL

##	API endpoint‘ai
<b>Parduotuvės</b>
-	/api/shops <b>GET List 200</b>
-	/api/shops/{id} <b>GET One 200</b>
-	/api/shops <b>POST Create 201</b>
-	/api/shops/{id} <b>PUT/PATCH Modify 200</b>
-	/api/shops/{id} <b>DELETE Remove 200/204</b>

<b>Automobiliai</b>
-	/api/shops/{id}/cars <b>GET List 200</b>
-	/api/shops/{id}/cars/{id} <b>GET One 200</b>
-	/api/shops/{id}/cars <b>POST Create 201</b>
-	/api/shops/{id}/cars/{id} <b>PUT/PATCH Modify 200</b>
-	/api/shops/{id}/cars/{id} <b>DELETE Remove 200/204</b>

<b>Detalės</b>
-	/api/shops/{id}/cars/{id}/parts <b>GET List 200</b>
-	/api/shops/{id}/cars/{id}/parts/{id} <b>GET One 200</b>
-	/api/shops/{id}/cars/{id}/parts <b>POST Create 201</b>
-	/api/shops/{id}/cars/{id}/parts/{id} <b>PUT/PATCH Modify 200</b>
-	/api/shops/{id}/cars/{id}/parts/{id} <b>DELETE Remove 200/204</b>

## API aprašymas

### /api/Register

#### POST
Creates a new user

##### Payload
```
{
  "firstname": "string",
  "lastname": "string",
  "phoneNumber": "string",
  "email": "string",
  "password": "string"
}
```
##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Success |
| 409 | Conflict (Email already exists) |
| 400 | Bad Request (Password is not strong enough |

### /api/Login

#### POST
Returns user information and access token

##### Payload
```
{
  "email": "string",
  "password": "string"
}
```
##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Success |
| 400 | Bad Request (Invalid credentials) |

### /api/GetUser

#### GET
Returns user information

`Authorization required`

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Success |
| 400 | User was not found |

### /api/CarData/Makes

#### GET
Returns all makes

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Success |

### /api/CarData/Models

#### GET
Returns all specified make‘s models

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| makeId | query |  | No | integer |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Success |

### /api/CarData/Fuels

#### GET
Returns all fuel types

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Success |

### /api/CarData/Bodies

#### GET
Returns all body types

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Success |

### /api/CarData/Gearboxes

#### GET
Returns all gearbox types

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Success |

### /api/shops/{shopId}/Cars

#### GET
Returns all specified shop‘s cars

##### Parameters

| Name | Required | Schema |
| ---- | -------- | ---- |
| shopId | Yes | integer |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Success |
| 404 | Not Found (Shop was not found) |

#### POST
Creates new car for the specified shop

`Authorization required`

##### Payload
```
{
  "firstRegistration": "2023-12-11T15:49:14.040Z",
  "mileage": 0,
  "engine": 0,
  "power": 0,
  "bodyTypeId": 0,
  "fuelTypeId": 0,
  "gearboxTypeId": 0,
  "modelId": 0,
  "shopId": 0
}
```
##### Parameters

| Name | Required | Schema |
| ---- | -------- | ---- |
| shopId | Yes | integer |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Success |
| 400 | Bad Request (Invalid data) |
| 403 | Unauthorized (User is not the owner of this resource) |

### /api/shops/{shopId}/Cars/{carId}

#### GET
Returns specified car‘s information

##### Parameters

| Name | Required | Schema |
| ---- | -------- | ---- |
| shopId | Yes | integer |
| carId | Yes | integer |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Success |
| 404 | Not Found (Car was not found) |

#### PUT
Modifies specified car

`Authorization required`

##### Payload
```
{
  "id": 0,
  "firstRegistration": "2023-12-11T15:50:17.562Z",
  "mileage": 0,
  "engine": 0,
  "power": 0,
  "bodyTypeId": 0,
  "fuelTypeId": 0,
  "gearboxTypeId": 0,
  "modelId": 0,
  "shopId": 0
}
```
##### Parameters

| Name | Required | Schema |
| ---- | -------- | ---- |
| shopId | Yes | integer |
| carId | Yes | integer |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Success |
| 400 | Bad Request (Invalid data) |
| 404 | Not Found (Car was not found) |
| 403 | Unauthorized (User is not the owner of this resource) |


#### DELETE
Deletes specified car

`Authorization required`

##### Parameters

| Name | Required | Schema |
| ---- | -------- | ---- |
| shopId | Yes | integer |
| carId | Yes | integer |

##### Responses

| Code | Description |
| ---- | ----------- |
| 204 | No Content |
| 404 | Not Found (Car was not found) |
| 403 | Unauthorized (User is not the owner of this resource) |

### /api/shops/{shopId}/cars/{carId}/Parts

#### GET
Returns all specified car‘s parts

##### Parameters

| Name | Required | Schema |
| ---- | -------- | ---- |
| shopId | Yes | integer |
| carId | Yes | integer |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Success |
| 400 | Bad Request (Invalid data) |
| 404 | Not Found (Car was not found) |

#### POST
Creates a new part for the specified car

`Authorization required`

##### Payload
```
{
  "name": "string",
  "price": 0,
  "carId": 0,
  "shopId": 0
}
```
##### Parameters

| Name | Required | Schema |
| ---- | -------- | ---- |
| shopId | Yes | integer |
| carId | Yes | integer |

##### Responses

| Code | Description |
| ---- | ----------- |
| 201 | Created |
| 400 | Bad Request (Invalid data) |
| 404 | Not Found (Car was not found) |
| 403 | Unauthorized (User is not the owner of this resource) |

### /api/shops/{shopId}/cars/{carId}/Parts/{partId}

#### GET
Returns specified part‘s information

##### Parameters

| Name | Required | Schema |
| ---- | -------- | ---- |
| shopId | Yes | integer |
| carId | Yes | integer |
| partId | Yes | integer |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Success |
| 404 | Not Found (Part was not found) |

#### PUT
Modifies specified part

`Authorization required`

##### Payload
```
{
  "id": 0,
  "name": "string",
  "price": 0,
  "carId": 0,
  "shopId": 0
}
```
##### Parameters

| Name | Required | Schema |
| ---- | -------- | ---- |
| shopId | Yes | integer |
| carId | Yes | integer |
| partId | Yes | integer |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Success |
| 400 | Bad Request (Invalid data) |
| 404 | Not Found (Part was not found) |
| 403 | Unauthorized (User is not the owner of this resource) |

#### DELETE
Deletes specified part

`Authorization required`

##### Parameters

| Name | Required | Schema |
| ---- | -------- | ---- |
| shopId | Yes | integer |
| carId | Yes | integer |
| partId | Yes | integer |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Success |
| 404 | Not Found (Part was not found) |
| 403 | Unauthorized (User is not the owner of this resource) |

### /api/Shops

#### GET
Returns all shops

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Success |

#### POST
Creates new shop

`Authorization required`

##### Payload
```
{
  "name": "string",
  "location": "string"
}
```
##### Responses

| Code | Description |
| ---- | ----------- |
| 201 | Created |
| 400 | Bad Request (Invalid data) |
| 404 | Conflict (Shop name already exists) |

### /api/Shops/{id}

#### GET
Returns specified shop‘s information

##### Parameters

| Name | Required | Schema |
| ---- | -------- | ---- |
| id | Yes | integer |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Success |
| 404 | Not Found (Shop was not found) |

#### PUT
Modifies specified shop

`Authorization required`

##### Payload
```
{
  "id": 0,
  "name": "string",
  "location": "string"
}
```
##### Parameters

| Name | Required | Schema |
| ---- | -------- | ---- |
| id | Yes | integer |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Success |
| 400 | Bad Request (Invalid data) |
| 404 | Not Found (Shop was not found) |
| 409 | Conflict (Shop name already exists) |
| 403 | Unauthorized (User is not the owner of this resource) |

#### DELETE
Deletes specified shop

`Authorization required`

##### Parameters

| Name | Required | Schema |
| ---- | -------- | ---- |
| id | Yes | integer |

##### Responses

| Code | Description |
| ---- | ----------- |
| 204 | No Content |
| 404 | Not Found (Shop was not found) |
| 403 | Unauthorized (User is not the owner of this resource) |
