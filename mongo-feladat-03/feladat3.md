## Cursor függvényeinek gyakorlása videoStore adatbázissal

#
1. Használd a videoStore adatbázist (az első gyakorló feladatokból)!
```
use videoStore
```
> switched to db videoStore
#
2. Számold meg, hány akció- és romantikus filmed van összesen!
```
db.movies.find({category: "ACTION"}).count()
```
>5
```
db.movies.find({category: "ROMANTIC"}).count()
```
>2
#
3. Kérdezd le a „FANTASY” filmek nevét és a kategóriáját. Mentsd le a listát (Cursor-t) egy változóba!
```
const cursor = db.movies.find({category: "FANTASY"}, {_id: 0, title: 1, category: 1})
cursor
```
>{ "title" : "Title 1", "category" : "FANTASY" }\
{ "title" : "Title 7", "category" : "FANTASY" }\
{ "title" : "Title10", "category" : "FANTASY" }
#
4. Írj egy ciklust, amely végigiterál a listán, és kiírja filmek a nevét és kategóriáját => példa: Végtelen történet: FANTASY (tipp: print() függvénnyel lehet kiíratni az értékeket Mongo shell-ben)!
```
var cursor = db.movies.find({category: "FANTASY"}, {_id: 0, title: 1, category: 1})
cursor.forEach(doc => print(doc.title, ": ", doc.category))
```
>Title 1 :  FANTASY\
Title 7 :  FANTASY\
Title10 :  FANTASY
#
5. Készíts egy lekérdezést, amely fordított sorrendben (_id) adja vissza csak a filmcímeket!
```
db.movies.find().sort({_id: -1}).forEach(doc => print(doc.title))
```
>Title10\
Title 9\
Title 8\
Title 7\
Title 6\
Title 5\
Title 4\
Title 3\
Title 2\
Title 1
#
6. Készíts egy lekérdezést, amely első lépésként a kategóriák szerint rakja sorba az elemeket, majd utána a megjelenés éve szerint fordítva sorolja fel! A lekérdezés csak a film címét, kategóriáját és megjelenési évét adja vissza.
```
db.movies.find({}, {_id: 0, ratings: 0}).sort({category: 1}, {releaseYear: -1})
```
>{ "title" : "Title 2", "category" : "ACTION", "releaseYear" : 1992 }\
{ "title" : "Title 4", "category" : "ACTION", "releaseYear" : 1987 }\
{ "title" : "Title 6", "category" : "ACTION", "releaseYear" : 1977 }\
{ "title" : "Title 8", "category" : "ACTION", "releaseYear" : 1964 }\
{ "title" : "Title 9", "category" : "ACTION", "releaseYear" : 1978 }\
{ "title" : "Title 1", "category" : "FANTASY", "releaseYear" : 2017 }\
{ "title" : "Title 7", "category" : "FANTASY", "releaseYear" : 1981 }\
{ "title" : "Title10", "category" : "FANTASY", "releaseYear" : 1975 }\
{ "title" : "Title 3", "category" : "ROMANTIC", "releaseYear" : 1987 }\
{ "title" : "Title 5", "category" : "ROMANTIC", "releaseYear" : 1983 }
#
7. Kérdezd le az ACTION kategóriából a legutóbb készült filmet (szigorúan a query-nek kell megkeresnie, manuálisan kinézni a DB-ből nem ér)!
```
db.movies.find({category: "ACTION"}).sort({releaseYear: -1}).limit(1)
```
> { "_id" : ObjectId("60ea2918307fa362e5304df6"), "title" : "Title 2", "category" : "ACTION", "ratings" : [ 1, 2, 3, 4, 5 ], "releaseYear" : 1992 }
#
8. Kérdezd le az adatbázisból a két legrégebben készült film címét és gyártási évét!
```
db.movies.find({}, {_id:0, title: 1, releaseYear: 1}).sort({releaseYear: 1}).limit(2)
```
>{ "title" : "Title 8", "releaseYear" : 1964 }\
{ "title" : "Title10", "releaseYear" : 1975 }
#
9. Kérdezd le a ROMANTIC kategóriából a második legfrissebben megjelent film nevét és megjelenési évét!
```
db.movies.find({category: "ROMANTIC"}, {_id: 0, title: 1, releaseYear: 1}).sort({releaseYear: -1}).skip(1).limit(1)
```
>{ "title" : "Title 5", "releaseYear" : 1983 }
#
10. Készíts egy scriptet egy javaScript fájlban! A script feladata, hogy egyetlen függvényben lekérdezze a mozifilmek számát kimentve egy változóba, majd ennek segítségével egy ciklus keretében 3-asával lapozva írja ki a konzolra a filmek címeit és kategóriáit (kisbetűvel a kategóriát) a következő módon =>
    - pl.: „Terminator : action movie”
    - Minden egyes oldal alján jelenjen meg a szöveg: --page over--!
    - Segítségül egy lehetséges eredmény:
```
(()=>{
  const nr = db.movies.find().count();
  let i = 0;
  do {
    db.movies.find().skip(i).limit(3).forEach(doc => print(doc.title, ": ", doc.category.toLowerCase(), " movie"));
    print("--page over--");
    i += 3;
  }
  while (i < nr);
})()
```
>Title 1 :  fantasy  movie\
Title 2 :  action  movie\
Title 3 :  romantic  movie\
--page over--\
Title 4 :  action  movie\
Title 5 :  romantic  movie\
Title 6 :  action  movie\
--page over--\
Title 7 :  fantasy  movie\
Title 8 :  action  movie\
Title 9 :  action  movie\
--page over--\
Title10 :  fantasy  movie\
--page over--
