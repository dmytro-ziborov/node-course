const parseCSV = (csv) => {
    //parse and store cities
    let cities = csv
        .split("\n")
        .filter((element) => /^(?!#)(\d+\.\d+,){2}[\p{L}\s]+,\d+,$/u.test(element))
        .map((element) => {
            let value = element.split(",");
            return { x: value[0], y: value[1], name: value[2], population: value[3] };
        })
        .sort((city1, city2) => city2.population - city1.population)
        .slice(0, 10)
        .reduce((accumulator, current, index) => {
            accumulator[current.name] = {
                population: current.population,
                rating: index + 1,
            };
            return accumulator;
        }, {});

    //create function and return it
    return (text) =>
        text.replace(
            new RegExp(Object.keys(cities).join("|"), "ig"),
            (city) =>
                `${city} (${cities[city].rating} місце в ТОП-10 найбільших міст України, населення ${cities[city].population})`
        );
};

//cities
const data = `44.38,34.33,Алушта,31440,
49.46,30.17,Біла Церква,200131,
49.54,28.49,Бердичів,87575,#некомент
49.8419,24.0315,Львів,724314,
50.455,30.524,Київ,2797553,
49.981,36.253,Харків,1430885,
48.4500,34.9833,Дніпро,1002111,
48.023,37.802,Донецьк,1024700,
46.4775,30.7326,Одеса,1017699,
#
46.49,36.58,#Бердянськ,121692,
49.15,28.41,Вінниця,356665,
#45.40,34.29,Джанкой,43343,
47.1306,37.5639,Маріуполь,449498,
50.1608,35.5164,Богодухів,15576,
49.2238,37.2915,Ізюм,13108,
# в цьому файлі три рядки-коментів :)`;

//text to test
const ukrposhta_description = `Артлистівки серії «Міста України» | «Cities of Ukraine» Серія листівок ілюстраторки з Миколаєва Анни Максименко присвячена чудовим українським містам :
Харків та Миколаєв, Одеса та Львів, Дніпро та Київ, також є листівка «Україна», на якій можна знайти найвідоміші символи всіх цих великих міст.
Дуже очікуємо на серії : Донецьк, Маріуполь, Алушта. А також маленькі міста : Ізюм, Богодухів та інші. Укрпошта. `;

const cities = parseCSV(data);

console.log(cities(ukrposhta_description));
