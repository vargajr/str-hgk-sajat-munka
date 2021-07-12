## A videoStore feladat folytatása (update, find, projection)

Normalization elve: Csak a közvetlen összetartozó elemeket tároljuk egy táblázatban (listában). Minél összetettebb egy adat (több tulajdonsággal rendelkezhet, pl.: rendezőnek lehet neve, díjai, filmjei, születési adatai), annál inkább külön listába kell kiszervezni a tárolását.
#
1. Készíts el egy „directors” listát, amelyben filmrendezőket fogunk tárolni!
2. Ments el benne 3 „rendező” dokumentumot az insertOne() parancs segítségével:
   - "_id": egész szám 1-estől indulva
   - "name": Steven Spielberg, Clint Eastwood, James Cameron
   - "birthYear": születési év (tetszőlegesen megadott egész szám)
   - "movies": kezdetben egy üres lista
```
db.directors.insertOne({_id: 1, name: "Steven Spielberg", birthYear: 1955, movies: []})
db.directors.insertOne({_id: 2, name: "Clint Eastwood", birthYear: 1960, movies: []})
db.directors.insertOne({_id: 3, name: "James Cameron", birthYear: 1965, movies: []})
```
> { "acknowledged" : true, "insertedId" : 1 }\
{ "acknowledged" : true, "insertedId" : 2 }\
{ "acknowledged" : true, "insertedId" : 3 }
#
3. Frissítsd a rendezők dokumentumait, helyezd el a „movies” listájukba a megfelelő filmek id-jait (ha ObjectId-t használsz, akkor figyelj arra, hogy ObjectId-ként mentsd el őket). Tipp: kérdezd le a rendezőket, és alájuk listázd a filmeket úgy, hogy csak az id-jük és a rendező nevét adja vissza a lekérdezés.
```
db.directors.find()\
db.movies.find({},{director:1}).sort({director: 1})\
 
db.directors.updateOne({_id:1}, {$push: {movies: {$each: [ObjectId("60ea28e3307fa362e5304df5"), ObjectId("60ea2918307fa362e5304df6"), ObjectId("60ea2de145ea09b602e7e984")]}}})\

db.directors.updateOne({_id:2}, {$push: {movies: {$each: [ObjectId("60ea29733868b64f8149ed40"), ObjectId("60ea29db45ea09b602e7e97c"), ObjectId("60ea2de145ea09b602e7e982"), ObjectId("60ea2de145ea09b602e7e983")]}}})\

db.directors.updateOne({_id:3}, {$push: {movies: {$each: [ObjectId("60ea2a1045ea09b602e7e97e"), ObjectId("60ea2a1045ea09b602e7e97f"), ObjectId("60ea2a1045ea09b602e7e980")]}}})
```
> { "acknowledged" : true, "matchedCount" : 1, "modifiedCount" : 1 } x 3
#
4. Ha frissítetted a rendezőket, ellenőrzés gyanánt kérdezd le a dokumentumokat a „directors” listából (használd a pretty() metódust a szebb megjelenítéshez)!
```
db.directors.find().pretty()
```
```js
{
        "_id" : 1,
        "name" : "Steven Spielberg",
        "birthYear" : 1955,
        "movies" : [
                ObjectId("60ea28e3307fa362e5304df5"),
                ObjectId("60ea2918307fa362e5304df6"),
                ObjectId("60ea2de145ea09b602e7e984")
        ]
}
{
        "_id" : 2,
        "name" : "Clint Eastwood",
        "birthYear" : 1960,
        "movies" : [
                ObjectId("60ea29733868b64f8149ed40"),
                ObjectId("60ea29db45ea09b602e7e97c"),
                ObjectId("60ea2de145ea09b602e7e982"),
                ObjectId("60ea2de145ea09b602e7e983")
        ]
}
{
        "_id" : 3,
        "name" : "James Cameron",
        "birthYear" : 1965,
        "movies" : [
                ObjectId("60ea2a1045ea09b602e7e97e"),
                ObjectId("60ea2a1045ea09b602e7e97f"),
                ObjectId("60ea2a1045ea09b602e7e980")
        ]
}
```
#
5. __Ha elkészültél a rendezői listával__, frissítsd a movies listát („táblázatot”): távolítsd el a director mezőt ($unset operátor segítségével). Ezentúl a rendezőn keresztül fogjuk elérni a hozzájuk tartozó filmeket.
```
db.runCommand({collMod: "movies", validator:{}})
db.movies.updateMany({}, {$unset: {director: ""}})
```
> { "acknowledged" : true, "matchedCount" : 10, "modifiedCount" : 10 }
#
6. Kérdezd le az egy bizonyos év előtt készült filmeket, majd az egy bizonyos év után készült filmeket! ($gt, $gte, $lt, $lte)
```
db.movies.find({releaseYear: {$lt: 1970}})
db.movies.find({releaseYear: {$lte: 1977}})
db.movies.find({releaseYear: {$gt: 1987}})
db.movies.find({releaseYear: {$gte: 1987}})
```
#
7. Kérdezz le két év között készült filmeket! (Próbáld ki $and operátorral is!)
```
db.movies.find({releaseYear: {$gt: 1970, $lt:1990}})
db.movies.find({$and: [{releaseYear: {$gt: 1970}}, {releaseYear: {$lt: 1990}}] })
```
#
8. Kérdezz le két év közötti filmeket, amelyek egy bizonyos kategóriával rendelkeznek!
```
db.movies.find({releaseYear: {$gt: 1970, $lt: 1990}, category: "ACTION"})
db.movies.find({$and: [ {releaseYear: { $gt: 1970 } }, { releaseYear: { $lt: 1990 } }, { category: "ROMANTIC" } ] })
```
#
9. Kérdezd le a filmeket, amelyeknek a kategóriája NEM FANTASY ($ne)!
```
db.movies.find({category: {$ne: "FANTASY"}})
```
