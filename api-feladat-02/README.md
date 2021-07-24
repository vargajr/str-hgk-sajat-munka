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
### POST /person
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
### DELETE /person/:vaccine
```js
fetch('http://localhost:3000/person/vaccine-7',{
  method: 'DELETE'
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