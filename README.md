# AutoParts

## Sprendžiamo uždavinio aprašymas

### Sistemos paskirtis

Sistema skirta asmenims talpinti automobilių dalių skelbimus ir taip lengviau rasti pirkėjus, o perkantiesiems – lengviau atrasti dalis, kurių jiems reikia.

Kuriama sistema turės 3 dalis – internetinę aplikaciją, duomenų bazę ir API, per kurią vyks komunikacija tarp internetinės aplikacijos ir duomenų bazės.

Asmuo, norėdamas įkelti skelbimą į šią sistemą, turės prisiregistruoti, sukurti savo parduotuvę, sukurti skelbimą, kuriame turės surašyti informaciją apie automobilį, kurio dalys bus parduodamos, ir šis skelbimas bus priskirtas pasirinktai parduotuvei. Surašius automobilio informaciją, naudotojas turės parašyti, kokias dalis nuo šio automobilio parduoda. Jam įdėjus skelbimą, šis bus matomas visiems, net ir neregistruotiems, sistemos naudotojams.

### Funkciniai reikalavimai

Neregistruotas sistemos naudotojas galės:

-	Prisijungti prie sistemos
-	Prisiregistruoti prie sistemos
-	Peržiūrėti sistemoje esančius skelbimus

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
  -	Paskelbti skelbimą

Administratorius galės:
-	Užblokuoti naudotoją
-	Ištrinti parduotuvę
-	Ištrinti skelbimą
