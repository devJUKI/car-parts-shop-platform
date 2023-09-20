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
