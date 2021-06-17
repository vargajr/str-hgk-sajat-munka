Egy webes alkalmazás során mindig szükség van Logger-re. Ennek a megvalósításhoz készítened kell egy Logger class-t, ami kiterjeszti az EventEmitter osztályt! A Logger 2 metódussal rendelkezzen: error, success! Mindegyik metódus egy paraméterként kapott string-et ír ki a konzolra. Az error-t piros, a success-t zöld színnel!

Ezt a Logger class-t kell felhasználod a következő alkalmazás során, melyet szintén neked kell elkészíteni:
Az alkalmazás egy tetszőleges txt fájl tartalmát olvassa be stream segítségével, majd átalakítja úgy, hogy mindegyik szó első karaktere nagybetűs lesz, a kimenetet pedig elmenti egy új fájlba, aminek a neve az eredeti fájl neve összefűzve a Copy string-gel. A kiterjesztés .txt maradjon.
Amennyiben bármi hiba adódott, a Logger error metódusát kell meghívni, paraméterként átadva neki az error object message property-jének az értékét.
Amennyiben nem volt hiba, a Logger success metódusát kell meghívni, paraméterként átadva neki a következő string-et: "File transform successful."

https://nodejs.org/en/knowledge/command-line/how-to-get-colors-on-the-command-line/

console.log('\x1b[36m%s\x1b[0m', 'I am cyan');  //cyan
console.log('\x1b[33m%s\x1b[0m', stringToMakeYellow);  //yellow

Reset = "\x1b[0m"
Bright = "\x1b[1m"
Dim = "\x1b[2m"
Underscore = "\x1b[4m"
Blink = "\x1b[5m"
Reverse = "\x1b[7m"
Hidden = "\x1b[8m"

FgBlack = "\x1b[30m"
FgRed = "\x1b[31m"
FgGreen = "\x1b[32m"
FgYellow = "\x1b[33m"
FgBlue = "\x1b[34m"
FgMagenta = "\x1b[35m"
FgCyan = "\x1b[36m"
FgWhite = "\x1b[37m"

BgBlack = "\x1b[40m"
BgRed = "\x1b[41m"
BgGreen = "\x1b[42m"
BgYellow = "\x1b[43m"
BgBlue = "\x1b[44m"
BgMagenta = "\x1b[45m"
BgCyan = "\x1b[46m"
BgWhite = "\x1b[47m"