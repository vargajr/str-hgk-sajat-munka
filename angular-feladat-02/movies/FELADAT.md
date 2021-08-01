# Gyakorlófeladat 2
Készíts egy egyszerű, Angular alapú alkalmazást. Az alkalmazás célja, hogy az adatok kezelése az NGRX modulon keresztül legyen megvalósítva.

Fontos: az angular-feladat-01 feladatot kell továbbfejlesztened. Csak azokra a részekre térek ki, amelyek eltérnek az eredeti alkalmazástól. Új alkalmazást hozz létre ennek a feladatnak is, a meglévő fájlokat pedig másold át.

Az alkalmazás filmeket kezel, ilyen adatokat generálj a mockaroo segítségével.

1. Oldalak:
   * editor: listázzon ki egy szabadon választott tömböt, amelyet a json-server-auth segítségével kér le egy service-en keresztül (movies).
   * movieEditor: egy bizonyos filmet jelenítsen meg egy űrlapon. Nem kell a szerkesztést is megoldani, a helyes megjelenítés a lényeg. Az editor oldalról való kattintással lehessen megnyitni ezt az oldalt és az url-ből vett paraméter hatására jelenítse meg a kiválasztott filmet, úgy, hogy a store-ből lekéri az id alapján.

2. State management: 
   * A store neve egyezzen meg a választott témával, tehát a store-on belül ott legyen elhelyezve (pl.: import { UserReducer } from './store/movie/MovieReducers'; ).
   * A reducers-ben is csak három szelektorra lesz szükség: selectItems, selectOneItem és selectError.
   * Az effect-ben is csak a loadItems$ és a getOneItem$ megvalósítása szükséges.
   * Az editor és movieEditor oldalakon a megfelelő selector-ok használatával jelenítsd meg az adatokat.

Segítség
* Az adott store -hoz mindig külön fájlban hozd létre az action-öket, reducer-eket és effect-eket.
* Használd a dokumentációt: https://ngrx.io/guide/store
* Így függenek össze a store egyes elemei:

![alt text](https://ngrx.io/generated/images/guide/store/state-management-lifecycle.png)

* Ne feledd, az adatok csak egy irányba mozoghatnak. Ezért nem egyszerűen csak lekérjük őket, hanem először dispatch-elünk egy action-t, majd a hatására beöltődő adatokat szelektáljuk, például így:

  [a hivatkozott sor és az alatta lévő ...](https://github.com/cherryApp/angular-advanced-course/blob/03f4efcb7a1078ae1fa7222d03fd36eb2b493bd6/chapter03-ngrx/src/app/page/users/users.component.ts#L37)

# Gyakorlófeladat 1
Készíts egy egyszerű, Angular alapú alkalmazást. Az alkalmazás célja, hogy ki- és bejelentkezést nyújtson a felhasználóknak.

1. Oldalak:
    * home: a felhasználók bejelentkezés nélkül is elérhetik
    * editor: a felhasználók csak editor vagy magasabb jogosultsággal érhetik el
    * admin: a felhasználók csak admin jogosultsággal érhetik el
    * login: minden felhasználó elérheti, a bejelentkezést valósítja meg. Sikeres belépés esetén a home oldalra irányít át.

2. Autentikáció és autorizáció megvalósítása: 
    * Az autentikációhoz a json-server-auth NodeJS modult használd.
    * Az azonosítás json-webtoken segítségével történjen.
    * A tokenek ellenőrzésére és a kérésekhez csatolására használj interceptor-t.
    * Hozz létre egy forbidden oldalt, ahol üzenetben tájékoztatod a felhasználót arról, hogy nincs joga megtekinteni a kért oldalt.
    * Az egyes url-ek védelmét guard-okkal oldd meg, ezek irányítsák át a felhasználót a forbidden oldalra megfelelő jogosultság hiányában.
    * A fejlécben a belépett felhasználóknak jelenjen meg egy logout gomb, amelyre kattintva a rendszer kijelentkezteti őket.

3. Az alkalmazás felépítése:
    * Egyszerű felépítést használj, a fejlécben legyenek a kattintható linkek a navigációhoz, szintén innen legyen elérhető a login-oldal is.
    * Használj natív Bootstrap layout-ot, a hangsúly nem a megjelenésen, hanem a login/logout helyes működésén van.
    * Az egyes oldalak tartalma nem lényeges, csak a tesztelés segítik. Kivétel a login oldal, természetesen itt egy belépő űrlapot kell megjeleníteni.
# Segítség
* Az autentikációt és autorizációt a következő osztályok segítik: AuthService, JwtInterceptorService, EditorGuard, AdminGuard.
* Az egyes guard-okat, ha készen vannak, akkor az AppRoutingModule-ban vedd fel, a videókban bemutatott módon, a canActivate tömbben.
* Ebben a sorrendben dolgozz: komponensek -> routing -> authService -> jwtInterceptorService -> guard-ok.