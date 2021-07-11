1. Készíts egy videoStore nevű MongoDB adatbázist!
2. Hozz létre benne egy movies listát!
```
use videoStore
```
```
db.createCollection("movies", {
    validator : {
        $jsonSchema : {
            bsonType : "object",
            properties : {
                title: {
                    bsonType : "string",
                    description : "Title of the movie"
                },
                category : {
                    enum : ["fantasy", "action", "romantic"],
                    description : "movie genre"
                },
                director : {
                    bsonType : "string",
                    description : "Director of the movie"
                }
            }
        }
    }
})
```
> { "ok" : 1 }
```
show collections
```
> movies
#
3. Ments el benne 10 új filmet (save()) a következő mezőkkel:
   - _id: legyen generált, ObjectId
   - title: egy-egy kedvenc film címe, szöveges tartalom
   - category: szöveges tartalom (3 típus lehet: fantasy, action, romantic) => legyenek vegyesen a filmek, amennyire lehet
   - director: szöveges tartalom, 3 rendező közül vegyesen szétválogatva => Steven Spielberg, Clint Eastwood, James Cameron

```
db.movies.save({"title" : "Title 1", "category" : "fantasy", "director" : "Steven Spielberg"})
```
> WriteResult({ "nInserted" : 1 })
```
db.movies.save({title: "Title 2", category: "action", director: "Steven Spielberg"})
```
> WriteResult({ "nInserted" : 1 })
```
db.movies.save({title: "Title 3", category: "romantic", director: "Clint Eastwood"})
```
> WriteResult({ "nInserted" : 1 })
```
db.movies.save({title: "Title 4", category: "action", director: "Clint Eastwood"})
```
> WriteResult({ "nInserted" : 1 })
```
db.movies.save([{"title" : "Title 5", "category" : "romantic", "director" : "James Cameron"},{"title" : "Title 6", "category" : "action", "director" : "James Cameron"},{"title" : "Title 7", "category" : "fantasy", "director" : "James Cameron"}])
```
>BulkWriteResult({\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"writeErrors" : [ ],\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"writeConcernErrors" : [ ],\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"nInserted" : 3,\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"nUpserted" : 0,\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"nMatched" : 0,\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"nModified" : 0,\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"nRemoved" : 0,\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"upserted" : [ ]\
})
```
db.movies.save([{"title" : "Title 8", "category" : "action", "director" : "Clint Eastwood"},{"title" : "Title 9", "category" : "action", "director" : "Clint Eastwood"},{"title" : "Title10", "category" : "fantasy", "director" : "Steven Spielberg"}])
```
>BulkWriteResult({\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"writeErrors" : [ ],\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"writeConcernErrors" : [ ],\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"nInserted" : 3,\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"nUpserted" : 0,\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"nMatched" : 0,\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"nModified" : 0,\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"nRemoved" : 0,\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"upserted" : [ ]\
})
```
db.movies.find()
```
>{ "_id" : ObjectId("60ea28e3307fa362e5304df5"), "title" : "Title 1", "category" : "fantasy", "director" : "Steven Spielberg" }\
{ "_id" : ObjectId("60ea2918307fa362e5304df6"), "title" : "Title 2", "category" : "action", "director" : "Steven Spielberg" }\
{ "_id" : ObjectId("60ea29733868b64f8149ed40"), "title" : "Title 3", "category" : "romantic", "director" : "Clint Eastwood" }\
{ "_id" : ObjectId("60ea29db45ea09b602e7e97c"), "title" : "Title 4", "category" : "action", "director" : "Clint Eastwood" }\
{ "_id" : ObjectId("60ea2a1045ea09b602e7e97e"), "title" : "Title 5", "category" : "romantic", "director" : "James Cameron" }\
{ "_id" : ObjectId("60ea2a1045ea09b602e7e97f"), "title" : "Title 6", "category" : "action", "director" : "James Cameron" }\
{ "_id" : ObjectId("60ea2a1045ea09b602e7e980"), "title" : "Title 7", "category" : "fantasy", "director" : "James Cameron" }\
{ "_id" : ObjectId("60ea2de145ea09b602e7e982"), "title" : "Title 8", "category" : "action", "director" : "Clint Eastwood" }\
{ "_id" : ObjectId("60ea2de145ea09b602e7e983"), "title" : "Title 9", "category" : "action", "director" : "Clint Eastwood" }\
{ "_id" : ObjectId("60ea2de145ea09b602e7e984"), "title" : "Title10", "category" : "fantasy", "director" : "Steven Spielberg" }

#
4. Frissítsd a listádat (updateMany), mindenki kapjon egy „ratings” mezőt, amely egy üres listát tartalmaz (1-5 ig lehet benne tárolni a szavazatokat)!
```
db.runCommand({
    collMod: "movies",
    validator : {
        $jsonSchema : {
            bsonType : "object",
            required: ["title", "category", "director", "ratings"],
            properties : {
                title: {
                    bsonType : "string",
                    description : "Title of the movie"
                },
                category : {
                    enum : ["fantasy", "action", "romantic"],
                    description : "movie genre"
                },
                director : {
                    bsonType : "string",
                    description : "Director of the movie"
                },
                ratings: {
                    bsonType: ["array"],
                    minItems: 0,
                    uniqueItems: false,
                    additionalProperties: false,
                    items: {
                        bsonType: "int",
                        minimum: 1,
                        maximum: 5
                    }
                }
            }
        }
    }
})
```
>{ "ok" : 1 }
```
db.movies.updateMany({}, {$set: {ratings: []}})
```
>{ "acknowledged" : true, "matchedCount" : 10, "modifiedCount" : 10 }
```
db.movies.find()
```
>{ "_id" : ObjectId("60ea28e3307fa362e5304df5"), "title" : "Title 1", "category" : "fantasy", "director" : "Steven Spielberg", "ratings" : [ ] }\
{ "_id" : ObjectId("60ea2918307fa362e5304df6"), "title" : "Title 2", "category" : "action", "director" : "Steven Spielberg", "ratings" : [ ] }\
{ "_id" : ObjectId("60ea29733868b64f8149ed40"), "title" : "Title 3", "category" : "romantic", "director" : "Clint Eastwood", "ratings" : [ ] }\
{ "_id" : ObjectId("60ea29db45ea09b602e7e97c"), "title" : "Title 4", "category" : "action", "director" : "Clint Eastwood", "ratings" : [ ] }\
{ "_id" : ObjectId("60ea2a1045ea09b602e7e97e"), "title" : "Title 5", "category" : "romantic", "director" : "James Cameron", "ratings" : [ ] }\
{ "_id" : ObjectId("60ea2a1045ea09b602e7e97f"), "title" : "Title 6", "category" : "action", "director" : "James Cameron", "ratings" : [ ] }\
{ "_id" : ObjectId("60ea2a1045ea09b602e7e980"), "title" : "Title 7", "category" : "fantasy", "director" : "James Cameron", "ratings" : [ ] }\
{ "_id" : ObjectId("60ea2de145ea09b602e7e982"), "title" : "Title 8", "category" : "action", "director" : "Clint Eastwood", "ratings" : [ ] }\
{ "_id" : ObjectId("60ea2de145ea09b602e7e983"), "title" : "Title 9", "category" : "action", "director" : "Clint Eastwood", "ratings" : [ ] }\
{ "_id" : ObjectId("60ea2de145ea09b602e7e984"), "title" : "Title10", "category" : "fantasy", "director" : "Steven Spielberg", "ratings" : [ ] }
#
5. Adj 3 különböző filmre legalább 2 különböző szavazatot (használd a $push operátort)!
```
db.movies.updateMany({director: "Clint Eastwood"}, {$push: {ratings: NumberInt(5)}})
```
>{ "acknowledged" : true, "matchedCount" : 4, "modifiedCount" : 4 }
```
db.movies.updateMany({"category" : "fantasy"}, {$push : {"ratings" : NumberInt(3)}})
```
>{ "acknowledged" : true, "matchedCount" : 3, "modifiedCount" : 3 }
```
db.movies.updateMany({"category" : "action"}, {$push : {"ratings" : {$each: [NumberInt(1), NumberInt(2), NumberInt(3), NumberInt(4), NumberInt(5)]}}})
```
>{ "acknowledged" : true, "matchedCount" : 5, "modifiedCount" : 5 }
```
db.movies.updateMany({"title" : {$regex : /Title[\ 1][13570]/}}, {$push : {"ratings" : NumberInt(4)}})
```
>{ "acknowledged" : true, "matchedCount" : 5, "modifiedCount" : 5 }
```
db.movies.updateMany({"_id": {$in : [ObjectId("60ea29733868b64f8149ed40"), ObjectId("60ea2a1045ea09b602e7e97e"), ObjectId("60ea2de145ea09b602e7e984")]}}, {$push : {"ratings": NumberInt(2)}})
```
>{ "acknowledged" : true, "matchedCount" : 3, "modifiedCount" : 3 }
```
db.movies.find({},{_id:0, title:1, ratings:1})
```
>{ "title" : "Title 1", "ratings" : [ 3, 4 ] }\
{ "title" : "Title 2", "ratings" : [ 1, 2, 3, 4, 5 ] }\
{ "title" : "Title 3", "ratings" : [ 5, 4, 2 ] }\
{ "title" : "Title 4", "ratings" : [ 5, 1, 2, 3, 4, 5 ] }\
{ "title" : "Title 5", "ratings" : [ 4, 2 ] }\
{ "title" : "Title 6", "ratings" : [ 1, 2, 3, 4, 5 ] }\
{ "title" : "Title 7", "ratings" : [ 3, 4 ] }\
{ "title" : "Title 8", "ratings" : [ 5, 1, 2, 3, 4, 5 ] }\
{ "title" : "Title 9", "ratings" : [ 5, 1, 2, 3, 4, 5 ] }\
{ "title" : "Title10", "ratings" : [ 3, 4, 2 ] }
#
6. Adj hozzá minden filmhez egy „releaseYear” (megjelenés éve) mezőt: kezdetnek állíts be egy tetszőleges évet minden filmnek (pl.: 2000)!
```
db.runCommand({
    collMod: "movies",
    validator: {}
})
```
>{ "ok" : 1 }
```
db.movies.aggregate(
    [
        {$set: {releaseYear: {$multiply: [{ $rand: {} }, 60]}}},
        {$set: {releaseYear: {$floor: "$releaseYear"}}},
        {$merge: "movies"}
    ]
)
```
>Nincs visszajelzés
```
db.movies.updateMany({}, {$inc: {releaseYear: 1960}})
```
>{ "acknowledged" : true, "matchedCount" : 10, "modifiedCount" : 10 }
```
db.movies.find({}, {_id: 0, title: 1, releaseYear: 1})
```
>{ "title" : "Title 1", "releaseYear" : 2017 }\
{ "title" : "Title 2", "releaseYear" : 1992 }\
{ "title" : "Title 3", "releaseYear" : 1987 }\
{ "title" : "Title 4", "releaseYear" : 1987 }\
{ "title" : "Title 5", "releaseYear" : 1983 }\
{ "title" : "Title 6", "releaseYear" : 1977 }\
{ "title" : "Title 7", "releaseYear" : 1981 }\
{ "title" : "Title 8", "releaseYear" : 1964 }\
{ "title" : "Title 9", "releaseYear" : 1978 }\
{ "title" : "Title10", "releaseYear" : 1975 }

#
7. Írd át category típusonként csupa nagybetűre a kategóriákat (pl.: action ==> ACTION legyen mindenhol). Használd az updateMany parancsot!
> Tipp: db.courses.updateMany( {}, [{$set: {title: {$toUpper: "$title"} }}] )
```
db.movies.updateMany({"category" : "action"}, [{$set : {category : {$toUpper: "$category"}}}])
```
>{ "acknowledged" : true, "matchedCount" : 5, "modifiedCount" : 5 }
```
db.movies.updateMany({"category" : "fantasy"}, [{$set : {category : {$toUpper: "$category"}}}])
```
>{ "acknowledged" : true, "matchedCount" : 3, "modifiedCount" : 3 }
```
db.movies.updateMany({"category" : "romantic"}, [{$set : {category : {$toUpper: "$category"}}}])
```
>{ "acknowledged" : true, "matchedCount" : 2, "modifiedCount" : 2 }
```
db.movies.find()
```
>{ "_id" : ObjectId("60ea28e3307fa362e5304df5"), "title" : "Title 1", "category" : "FANTASY", "director" : "Steven Spielberg", "ratings" : [ 3, 4 ], "releaseYear" : 2017 }\
{ "_id" : ObjectId("60ea2918307fa362e5304df6"), "title" : "Title 2", "category" : "ACTION", "director" : "Steven Spielberg", "ratings" : [ 1, 2, 3, 4, 5 ], "releaseYear" : 1992 }\
{ "_id" : ObjectId("60ea29733868b64f8149ed40"), "title" : "Title 3", "category" : "ROMANTIC", "director" : "Clint Eastwood", "ratings" : [ 5, 4, 2 ], "releaseYear" : 1987 }\
{ "_id" : ObjectId("60ea29db45ea09b602e7e97c"), "title" : "Title 4", "category" : "ACTION", "director" : "Clint Eastwood", "ratings" : [ 5, 1, 2, 3, 4, 5 ], "releaseYear" : 1987 }\
{ "_id" : ObjectId("60ea2a1045ea09b602e7e97e"), "title" : "Title 5", "category" : "ROMANTIC", "director" : "James Cameron", "ratings" : [ 4, 2 ], "releaseYear" : 1983 }\
{ "_id" : ObjectId("60ea2a1045ea09b602e7e97f"), "title" : "Title 6", "category" : "ACTION", "director" : "James Cameron", "ratings" : [ 1, 2, 3, 4, 5 ], "releaseYear" : 1977 }\
{ "_id" : ObjectId("60ea2a1045ea09b602e7e980"), "title" : "Title 7", "category" : "FANTASY", "director" : "James Cameron", "ratings" : [ 3, 4 ], "releaseYear" : 1981 }\
{ "_id" : ObjectId("60ea2de145ea09b602e7e982"), "title" : "Title 8", "category" : "ACTION", "director" : "Clint Eastwood", "ratings" : [ 5, 1, 2, 3, 4, 5 ], "releaseYear" : 1964 }\
{ "_id" : ObjectId("60ea2de145ea09b602e7e983"), "title" : "Title 9", "category" : "ACTION", "director" : "Clint Eastwood", "ratings" : [ 5, 1, 2, 3, 4, 5 ], "releaseYear" : 1978 }\
{ "_id" : ObjectId("60ea2de145ea09b602e7e984"), "title" : "Title10", "category" : "FANTASY", "director" : "Steven Spielberg", "ratings" : [ 3, 4, 2 ], "releaseYear" : 1975 }
#
Validátor beállítása:
```
db.runCommand({
    collMod: "movies",
    validator : {
        $jsonSchema : {
            bsonType : "object",
            required: ["title", "category", "director", "ratings", "releaseYear"],
            properties : {
                title: {
                    bsonType : "string",
                    description : "Title of the movie"
                },
                category : {
                    enum : ["FANTASY", "ACTION", "ROMANTIC"],
                    description : "movie genre"
                },
                director : {
                    bsonType : "string",
                    description : "Director of the movie"
                },
                ratings: {
                    bsonType: ["array"],
                    minItems: 0,
                    uniqueItems: false,
                    additionalProperties: false,
                    items: {
                        bsonType: "int",
                        minimum: 1,
                        maximum: 5
                    }
                },
                releaseYear : {
                    bsonType : "int",
                    minimum: 1900,
                    maximum:2025
                }
            }
        }
    }
})
```
>{ "ok" : 1 }
