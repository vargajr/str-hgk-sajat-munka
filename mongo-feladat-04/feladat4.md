## Listák közötti kapcsolatok, aggregáció gyakorlása, Embed vs. Referencing

_**Ha egy objektum (dokumentum) egy másik dokumentum egyik mezőjében van, akkor beszélhetünk „embed”, beágyazott dokumentumról.**_

Használjuk a videoStore adatbázist!

Hozzunk létre benne egy új „cinemas” listát, amely a következő kikötésekkel rendelkezik:

- _id: kötelező megadni és csak egész számokból (integer) állhat
- 'name' mező: string lehet, kötelező megadni. Csak számokból, betűkből (angol) és szóközből állhat
- 'movies' mező: 'array' lehet és kötelező megadni
- 'address' mező: objektum lehet és kötelező megadni (az objektumban majd elég egy „city” mezővel játszani)
```
use videoStore

db.createCollection("cinemas", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["_id", "name", "movies", "address"],
            properties: {
                _id: {
                    bsonType: "int"
                },
                name: {
                    bsonType: "string"
                },
                movies: {
                    bsonType: ["array"],
                    minItems: 0,
                    uniqueItems: true,
                    items: {
                        bsonType: "objectId"
                    }
                },
                address: {
                    bsonType: "object",
                    required: ["city"],
                    properties: {
                        city: {
                            bsonType: "string"
                        }
                    }
                }
            }
        }
    }
})
```
>{ "ok" : 1 }
#
1. Ha még nem tettük meg, a cinema listánk rendelkezzen 3 cinema dokumentummal, és minden cinema dokumentum „játsszon” legalább 3 különböző filmet => adjunk hozzá legalább 3 cinema dokumentum egyes movies listájához 3 db "_id" értéket a movies listából!
```js
db.cinemas.insertMany([
  {_id: NumberInt(1), name: "Mozi 01", movies: [], address: {city: "Budapest"}},
  {_id: NumberInt(2), name: "Filmtheatre", movies: [], address: {city: "Los Angeles"}},
  {_id: NumberInt(3), name: "Cinema 05", movies: [], address: {city: "Tokyo"}},
])
{
        "acknowledged" : true,
        "insertedIds" : [
                NumberInt(1),
                NumberInt(2),
                NumberInt(3)
        ]
}
```
```js
(()=>{
  db.movies.find({releaseYear: {$gt: 1985}}).forEach(movie => db.cinemas.updateOne({_id: NumberInt(1)}, {$push: {movies: movie._id}}))
})()

(()=>{
  db.movies.find({category: {$in: ["ROMANTIC", "FANTASY"]}}).limit(4).forEach(movie => db.cinemas.updateOne({_id: NumberInt(2)}, {$push: {movies: movie._id}}))
})()

(()=>{
  db.movies.find({category: "ACTION"}).sort({rleaseYear: -1}).limit(3).forEach(movie => db.cinemas.updateOne({_id: NumberInt(3)}, {$push: {movies: movie._id}}))
})()
```
#
2. Kérdezzük le, hogy az első helyen lévő mozink milyen filmeket játszik, jelenjen meg minden film tulajdonsága!
```
db.cinemas.aggregate([{$match: {_id: NumberInt(1)}}, {$lookup: {from: "movies", localField: "movies", foreignField: "_id", as: "playing"}}]).pretty()
```
```js
{
        "_id" : 1,
        "name" : "Mozi 01",
        "movies" : [
                ObjectId("60ea28e3307fa362e5304df5"),
                ObjectId("60ea2918307fa362e5304df6"),
                ObjectId("60ea29733868b64f8149ed40"),
                ObjectId("60ea29db45ea09b602e7e97c")
        ],
        "address" : {
                "city" : "Budapest"
        },
        "playing" : [
                {
                        "_id" : ObjectId("60ea28e3307fa362e5304df5"),
                        "title" : "Title 1",
                        "category" : "FANTASY",
                        "ratings" : [
                                3,
                                4
                        ],
                        "releaseYear" : 2017
                },
                {
                        "_id" : ObjectId("60ea2918307fa362e5304df6"),
                        "title" : "Title 2",
                        "category" : "ACTION",
                        "ratings" : [
                                1,
                                2,
                                3,
                                4,
                                5
                        ],
                        "releaseYear" : 1992
                },
                {
                        "_id" : ObjectId("60ea29733868b64f8149ed40"),
                        "title" : "Title 3",
                        "category" : "ROMANTIC",
                        "ratings" : [
                                5,
                                4,
                                2
                        ],
                        "releaseYear" : 1987
                },
                {
                        "_id" : ObjectId("60ea29db45ea09b602e7e97c"),
                        "title" : "Title 4",
                        "category" : "ACTION",
                        "ratings" : [
                                5,
                                1,
                                2,
                                3,
                                4,
                                5
                        ],
                        "releaseYear" : 1987
                }
        ]
}
```
#
3. Ismételjük meg a fenti lekérdezést úgy, hogy csak a játszott film listája, adatai jelenjenek meg (tipp: „project” operator)!
```
db.cinemas.aggregate([{$match: {_id: NumberInt(1)}}, {$lookup: {from: "movies", localField: "movies", foreignField: "_id", as: "playing"}}, {$project: {_id: 0, name: 1, "playing.title": 1}}]).pretty()
```
```js
{
        "name" : "Mozi 01",
        "playing" : [
                {
                        "title" : "Title 1"
                },
                {
                        "title" : "Title 2"
                },
                {
                        "title" : "Title 3"
                },
                {
                        "title" : "Title 4"
                }
        ]
}
```
#
4. Ha még nem tettük meg, készítsünk el a videoStore-ban egy directors listát (a 2. feladat leírása alapján), és minden rendezőhöz rendeljünk 2-3 db filmet a „movies” mezőjükhöz.\
Kérdezzük le az egyik rendező által rendezett filmek adatait!
```
db.directors.aggregate([{$match: {name: "James Cameron"}}, {$lookup: {from: "movies", localField: "movies", foreignField: "_id", as: "directed_movies"}}]).pretty()
```
```js
{
        "_id" : 3,
        "name" : "James Cameron",
        "birthYear" : 1965,
        "movies" : [
                ObjectId("60ea2a1045ea09b602e7e97e"),
                ObjectId("60ea2a1045ea09b602e7e97f"),
                ObjectId("60ea2a1045ea09b602e7e980")
        ],
        "directed_movies" : [
                {
                        "_id" : ObjectId("60ea2a1045ea09b602e7e97e"),
                        "title" : "Title 5",
                        "category" : "ROMANTIC",
                        "ratings" : [
                                4,
                                2
                        ],
                        "releaseYear" : 1983
                },
                {
                        "_id" : ObjectId("60ea2a1045ea09b602e7e97f"),
                        "title" : "Title 6",
                        "category" : "ACTION",
                        "ratings" : [
                                1,
                                2,
                                3,
                                4,
                                5
                        ],
                        "releaseYear" : 1977
                },
                {
                        "_id" : ObjectId("60ea2a1045ea09b602e7e980"),
                        "title" : "Title 7",
                        "category" : "FANTASY",
                        "ratings" : [
                                3,
                                4
                        ],
                        "releaseYear" : 1981
                }
        ]
}
```
#
5. Kérdezzük le egy másik rendező filmjeit úgy, hogy csak a rendező neve és a filmek „title”-jei, vagyis címei jelennek meg (tipp: $project operátor)!
```
db.directors.aggregate([{$match: {name: "Clint Eastwood"}}, {$lookup: {from: "movies", localField: "movies", foreignField: "_id", as: "directed_movies"}}, {$project: {_id: 0, name: 1, "directed_movies.title": 1}}]).pretty()
```
```js
{
        "name" : "Clint Eastwood",
        "directed_movies" : [
                {
                        "title" : "Title 3"
                },
                {
                        "title" : "Title 4"
                },
                {
                        "title" : "Title 8"
                },
                {
                        "title" : "Title 9"
                }
        ]
}
```
#
6. Adj pár szavazatot egy-egy filmre ("ratings"), ha még nem tetted meg. Írj egy lekérdezést az aggregáció segítségével, amely visszaadja annak a filmnek a címét, amely a legjobb átlagszavazattal rendelkezik! Két mezőt adjon vissza: "title" és egy új mező: "rateAvg" => pl.: { "title" : "E.T.", "rateAvg" : 4.5 }. Csak aggregációt használj, Cursor metódusok használata nélkül!
```
db.movies.aggregate([{$project: {_id: 0, title: 1, rateAvg: {$avg: "$ratings"}}}, {$sort: {rateAvg: -1}}, {$limit: 1}])
```
>{ "title" : "Title 3", "rateAvg" : 3.6666666666666665 }
