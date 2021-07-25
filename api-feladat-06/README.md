# 6. Gyakorlófeladat
Folytassuk az egyszerű, működő ESZT (Egészségügyi Szuri Tár) API alkalmazást!

1.  Szervezd ki az alkalmazás portbeállítását, illetve a fájl- és konzol log level beállítást konfigurációs fájlba a `dotenv` segítségével!
2.  Szervezd ki az alkalmazás adatbázis-beállításait (host, user, password) egy default.json konfigurációs fájlba a `config` modul segítségével!
3.  Refaktoráld a routes.js fájlt az alábbi három külön fájlra a tanult módon:
    -   person.routes.js
    -   person.controller.js
    -   person.service.js

# 5. Gyakorlófeladat
Módosítsuk az egyszerű, működő ESZT (Egészségügyi Szuri Tár) API alkalmazást úgy, hogy MongoDB-t használjon az adatok tárolására.

1. Hozz létre egy új MongoDB adatbázist! (használhatsz Atlas-t vagy akár lokális MongoDB példányt is)
2. Telepítsd a szükséges csomagokat, készítsd el a Person sémát!
3. Módosítsd a tanult módon az alkalmazást, hogy az a MongoDB-hez csatlakozzon, töröld a JSON adatbázist!
4. Módosítsd a végpontokat, hogy az adatbázissal dolgozzanak!
    * Tipp 1: countDocuments() elemek számolásához
    * Tipp 2: $exists operátor
## Tesztelés:
### CRUD create - /person POST
```js
fetch('http://localhost:3000/person',{
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({firstName: 'Loo', lastName:'La', vaccine:''})
})
.then(r => r.json())
.then(d => console.log(d))
```
### CRUD update - /person PUT
```js
fetch('http://localhost:3000/person',{
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({_id: '60fd2e7c8420b37c42240244', firstName: 'Lee', lastName:'La', vaccine:'vaccine-1'})
})
.then(r => r.json())
.then(d => console.log(d))
```
### CRUD delete - /person DELETE
```js
fetch('http://localhost:3000/person/',{
  method: 'DELETE',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({id: '60fd2c8285d8c77b778d2d9c'})
}).then(r => r.json())
.then(d => console.log(d))
```
# 4. Gyakorlófeladat
Folytassuk az egyszerű, működő ESZT (Egészségügyi Szuri Tár) API alkalmazást!

1.  Implementálj egy saját loggert a `winston` csomag segítségével, amely fájlba és konzolra logol, minimum `debug` szinten és `simple` formátumban!
2.  Módosítsd az eddigi logolási pontokat az alkalmazásban, hogy a saját, `winston` alapú loggert használják!
3.  Implementáld a HTTP kérések logolását a `morgan` segítségével úgy, hogy az a `winston` alapú loggert használja! A `tiny` formátumot használd a kérések logolásához!

# 3. Gyakorlófeladat
Folytassuk az egyszerű, működő ESZT (Egészségügyi Szuri Tár) API alkalmazást!

1. Implementálj egy hibakezelő middleware függvényt, amely kilogolja a valódi hibát a konzolra, majd a kliens számára valamilyen - a hibától független - átlátszó kifogást küld vissza üzenetben. Ha nincs más státuszkód definiálva, akkor adjon 500-as hibakódot.
2. Végezd el az eddig elkészült végpontok id path paramétereinek a validációját. Amennyiben hibásak ezek a paraméterek, a tanult módon add át a hibát a hibakezelő middleware-nek.

A hibakezeléshez használd a http-errors csomagot! Teszteld a végpontokat hibás bemenettel, böngésző segítségével!

# 2. Gyakorlófeladat
Egészítsd ki az egyszerű, működő ESZT (Egészségügyi Szuri Tár) API alkalmazást CRUD-műveletekkel!

1. Implementáld a GET /person/:id/vaccinated végpontot, amely visszaadja, hogy az adott id-val rendelkező személy rendelkezik-e oltással! (Tipp: használd a parseInt() függvényt!)
2. Implementáld a POST /person végpontot, amellyel új személyt vehetünk fel a nyilvántartásba! (Ne felejtsd el telepíteni a body-parser csomagot!)
3. Implementáld a PUT /person/:id/:vaccine végpontot, amellyel megadhatjuk, hogy az adott id-val rendelkező személy vaccine típusú oltást kapott.
4. Implementáld a DELETE /person/:vaccine végpontot, amely a vaccine típusú oltással rendelkező személyeket törli az adatbázisból.

Minden elkészült végpontot tesztelj böngésző segítségével!

## Tesztelés:
### POST /person
```js
fetch('http://localhost:3000/person',{
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({firstName: 'Lee', lastName:'La', vaccine:''})
})
.then(r => r.json())
.then(d => console.log(d))
```
### PUT /person/:id/:vaccine
```js
fetch('http://localhost:3000/person/2/vaccine-7',{
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json'
  }
})
.then(r => r.json())
.then(d => console.log(d))
```
### PUT /person (update a person)
```js
fetch('http://localhost:3000/person',{
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({id: 1, firstName: 'Lee', lastName:'La', vaccine:''})
})
.then(r => r.json())
.then(d => console.log(d))
```
### PUT / person - hibás id megadása
```js
fetch('http://localhost:3000/person',{
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({id: 60, firstName: 'Lee', lastName:'La', vaccine:''})
})
.then(r => r.json())
.then(d => console.log(d))
```
### DELETE /person/:vaccine
```js
fetch('http://localhost:3000/person/vaccine-7',{
  method: 'DELETE'
}).then(r => r.json())
.then(d => console.log(d))
```
### DELETE /person
```js
fetch('http://localhost:3000/person/',{
  method: 'DELETE',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({id: 1})
}).then(r => r.json())
.then(d => console.log(d))
```

# 1. Gyakorlófeladat

Készíts egy egyszerű, működő ESZT (Egészségügyi Szuri Tár) API alkalmazást, amellyel nyilvántarthatjuk, melyik személy milyen védőoltást kapott az országban.

1. Készíts egy ideiglenes JSON fájl adatbázist, amely a személyeket tartalmazza, minden személy rendelkezzen az alábbi adatokkal:
   - id: egyedi azonosító (number)
   - firstName: keresztnév (string)
   - lastName: vezetéknév (string)
   - vaccine: milyen típusú oltást kapott a személy (string) (elhagyható, ha valaki még nem kapott oltást)
2. Implementáld a GET /person/count végpontot, amely visszaadja az oltott személyek számát.
3. Implementáld a GET /person/vaccinated végpontot, amely csak a beoltott személyek adatait adja vissza.
4. Készíts egy egyszerű Swagger dokumentációt az elkészült API alkalmazáshoz.
* Az útvonalválasztást express.Router segítségével oldd meg!
* Az adatbázis egy darab JSON fájl legyen!
* Minden elkészült végpontot tesztelj böngésző segítségével!
## Segítség
* Hozd létre a lap tetején megadott almappát a repódban az alkalmazásnak.
* A projekt generálásához használhatod a express-generator csomagot, vagy saját magad is létrehozhatod a struktúrát.
* Példa az alkalmazás felépítésére: [https://github.com/Training360/FullStackApi-tanfolyam-anyagok/tree/main/api-feladat-01](https://github.com/Training360/FullStackApi-tanfolyam-anyagok/tree/main/api-feladat-01)