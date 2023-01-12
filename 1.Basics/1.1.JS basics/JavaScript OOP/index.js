/**
 * Describes abstract Product
 * @param {string} id unique product identifier 
 * @param {string} name product product name 
 * @param {string} description short description of product 
 * @param {number} price product price
 * @param {number} quantity avaliable product amount
 * @param {Review[]} reviews product reviews 
 * @param {string[]} images product images
 * @param {date} date date of posting
 * @param {string} brand product brand
 */
function AbstractProduct(ID, name, description, price, quantity, reviews, images, date, brand) {
    //prohibits the creation of an abstract object
    if (new.target === AbstractProduct) {
        throw new TypeError("Abstract product can't be instance of object");
    }

    this.ID = ID;
    this.name = name;
    this.description = description;
    this.price = price;
    this.quantity = quantity;
    this.reviews = reviews;
    this.images = images;
    this.date = date;
    this.brand = brand;
}

//getters and setters
AbstractProduct.prototype.getID = function () {
    return this.ID;
};

AbstractProduct.prototype.setID = function (ID) {
    this.ID = ID;
};

AbstractProduct.prototype.getName = function () {
    return this.name;
};

AbstractProduct.prototype.setName = function (name) {
    this.name = name;
};

AbstractProduct.prototype.getDescription = function () {
    return this.description;
};

AbstractProduct.prototype.setDescription = function (description) {
    this.description = description;
};

AbstractProduct.prototype.getPrice = function () {
    return this.price;
};

AbstractProduct.prototype.setPrice = function (price) {
    this.price = price;
};

AbstractProduct.prototype.getQuantity = function () {
    return this.quantity;
};

AbstractProduct.prototype.setQuantity = function (quatity) {
    this.quantity = quatity;
};

AbstractProduct.prototype.getReviews = function () {
    return this.reviews;
};

AbstractProduct.prototype.setReviews = function (reviews) {
    this.reviews = reviews;
};

AbstractProduct.prototype.getImages = function () {
    return this.images;
};

AbstractProduct.prototype.setImages = function (images) {
    this.images = images;
};

AbstractProduct.prototype.getDate = function () {
    return this.date;
};

AbstractProduct.prototype.setDate = function (date) {
    this.date = date;
};

AbstractProduct.prototype.getBrand = function () {
    return this.brand;
};

AbstractProduct.apply.setBrand = function (brand) {
    this.brand = brand;
};

//methods

/**
 * @returns product information
 */
AbstractProduct.prototype.getFullInformation = function () {
    return Object.keys(this)
        .map((key) => `${key}-${this[key]}`)
        .join("\n");
};

/**
 * Calculates price of n-products
 * @param {number} quantity of products
 * @returns calculated price formatted to {$12.34}
 */
AbstractProduct.prototype.getPriceForQuantity = function (quantity) {
    return `$${(this.price * quantity).toFixed(2)}`;
};

/**
 * Universal method to get or set any product value
 * @param {string} property - product property-key 
 * @param {*} value - optional value to set value
 * @returns 
 */
AbstractProduct.prototype.getOrSetProperty = function (property, value = null) {
    if (property in this) {
        if (value) this[property] = value;
        else return this[property];
    }
};

/**
 * Describes class of Clothes product, child of {@link AbstractProduct}
 * @param {string} id unique product identifier 
 * @param {string} name product product name 
 * @param {string} description short description of product 
 * @param {number} price product price
 * @param {number} quantity avaliable product amount
 * @param {Review[]} reviews product reviews 
 * @param {string[]} images product images
 * @param {date} date date of posting
 * @param {string} brand product brand
 * @param {string} material of clothes
 * @param {*} color of clothes
 */
function Clothes(ID, name, description, price, quantity, reviews, images, date, brand, material, color) {
    //call parent constructor
    AbstractProduct.call(this, ID, name, description, price, quantity, reviews, images, date, brand);

    this.material = material;
    this.color = color;
}

Clothes.prototype = Object.create(AbstractProduct.prototype);
//Clothes.prototype.constructor = Clothes;

//getters and setters
Clothes.prototype.getMaterial = function () {
    return this.material;
};

Clothes.prototype.setMaterial = function (material) {
    this.material = material;
};

Clothes.prototype.getColor = function () {
    return this.color;
};

Clothes.prototype.setColor = function (color) {
    this.color = color;
};
/**
 * Describes class of Electronic product, child of {@link AbstractProduct}
 * @param {string} id unique product identifier 
 * @param {string} name product product name 
 * @param {string} description short description of product 
 * @param {number} price product price
 * @param {number} quantity avaliable product amount
 * @param {Review[]} reviews product reviews 
 * @param {string[]} images product images
 * @param {date} date date of posting
 * @param {string} brand product brand
 * @param {*} warranty of electronics
 * @param {*} power pf electronics
 */
function Electronics(ID, name, description, price, quantity, reviews, images, date, brand, warranty, power) {
    //call parent constructor
    AbstractProduct.call(this, ID, name, description, price, quantity, reviews, images, date, brand);

    this.warranty = warranty;
    this.power = power;
}

//
Electronics.prototype = Object.create(AbstractProduct.prototype);

//getters and setters
Electronics.prototype.getWarranty = function () {
    return this.warranty;
};

Electronics.prototype.setWarranty = function (warranty) {
    this.warranty = warranty;
};

Electronics.prototype.getPower = function () {
    return this.power;
};

Electronics.prototype.setPower = function (power) {
    this.power = power;
};

/**
 * Describes Product's review 
 * @param {string} ID unique identifier of review 
 * @param {string} author review author
 * @param {date} date review posting date 
 * @param {string} comment review comment
 * @param {[string,number]} rating rating {service,price,value,quality}
 */
function Review(ID, author, date, comment, { service, price, value, quality }) {
    this.ID = ID;
    this.author = author;
    this.date = date;
    this.comment = comment;
    this.rating = {
        service: service,
        price: price,
        quality: value,
        quality: quality,
    };
}

//getters and setters
Review.prototype.getID = function () {
    return this.ID;
};

Review.prototype.setID = function (ID) {
    this.ID = ID;
};

Review.prototype.getAuthor = function () {
    return this.author;
};

Review.prototype.setAuthor = function (author) {
    this.author = author;
};

Review.prototype.getDate = function () {
    return this.date;
};

Review.prototype.setDate = function (date) {
    this.date = date;
};

Review.prototype.getRating = function () {
    return this.rating;
};

Review.prototype.setRating = function ({ service, price, value, quality }) {
    this.rating = {
        service: service,
        price: price,
        quality: value,
        quality: quality,
    };
};

/**
 * Matches products in array 
 * @param {Product[]} products array of product objects
 * @param {string} search keyword to search 
 * @returns array of products which contains {@link search} keyword
 */
function searchProducts(products, search) {
    search = search.toLowerCase();
    return products.filter(product =>
        product.getName().toLowerCase().includes(search) ||
        product.getDescription().toLowerCase().includes(search));
}
/**
 * Sorting array of products by rule
 * @param {Product[]} products array of products
 * @param {string} sortRule rule to sort 
 * @returns sorted array if rule any of [ID,name,price] otherwise return source array
 */
function sort(products, sortRule) {
    return ['id', 'name', 'price'].includes(sortRule.toLowerCase()) ?
        products.sort((product1, product2) => product1[sortRule] - product2[sortRule]) :
        products;
}

//-----------------TESTS-----------------

doTests(initProducts());

function doTests(products) {
    //sort products by different rules tests
    displaySortedProducts(products, 'ID');
    displaySortedProducts(products, 'name');
    displaySortedProducts(products, 'price');
    //search test
    displayProductsSearch(products, 'shirt');
    displayProductsSearch(products, 't-shirt');
    displayProductsSearch(products, 'tan');
    displayProductsSearch(products, 'headphones');
    displayProductsSearch(products, 'laptop');

    displayPricesForProductsAmount(products, 10);
    displayUniversePropertyOfProduct(products, 'name', 'updated')
}

/**
 * Creates array of products
 * @returns array of products
 */
function initProducts() {
    return [
        new Clothes(
            "1",
            "shirt Green potato",
            "Just a simple green shirt. BREAKE THE RULES!",
            42,
            10,
            [
                new Review(
                    "1",
                    "John Doe",
                    new Date(),
                    "Hmmm, idk why that brand create that shirt, but I like it!",
                    [5, 5, 5, 5]
                ),
                new Review(
                    "2",
                    "John Doe",
                    new Date(),
                    "That shirt is awesome, ordered one more for my wife",
                    [5, 5, 5, 5]
                ),
                new Review(
                    "3",
                    "Jane Doe",
                    new Date(),
                    "My husband has awful taste on clothes.",
                    [1, 1, 1, 1]
                ),
            ],
            ["happyJohnGreenShirt.png", "sadJaneGreenShirt.png", "photo.jpg"],
            new Date(),
            "WeDontLikeGreenShirts",
            "Some kind of green fabric",
            "green"
        ),
        new Clothes(
            "15",
            "red sun shirt",
            "In this shirt you will shine even on the darkest night",
            57,
            10,
            [
                new Review(
                    "3",
                    "Grumpy cat",
                    new Date(),
                    `This sunny shirt made me happy`,
                    [5, 5, 5, 5]
                ),
                new Review("4", "Solaire", new Date(), "PRAISE THE SUN", [5, 5, 5, 5]),
            ],
            ["happyCatInShirt.png", "soul.png", "randompic.jpeg"],
            new Date(),
            "WeDontLikeGreenShirts",
            "Some kind of red fabric",
            "red"
        ),
        new Clothes(
            "3",
            "mesh tank top",
            "Cringe.",
            1000,
            1,
            [
                new Review("5", "Sick", new Date(), `-_-`, [5, 5, 5, 5]),
                new Review("6", "Inquisition", new Date(), "Burn down.", [1, 1, 1, 1]),
            ],
            ["wtf.png", "holyFire.png", "something.jpeg"],
            new Date(),
            "WeDontLikeGreenShirts",
            "fishing net",
            "black"
        ),
        new Clothes(
            "47",
            "t-shirt black and white",
            "Classic.",
            47,
            1,
            [
                new Review("44", "Sirius Black", new Date(), `I like it`, [5, 5, 5, 5]),
                new Review(
                    "2131",
                    "Chess-master",
                    new Date(),
                    `I don't like it`,
                    [1, 1, 1, 1]
                ),
            ],
            ["dogo.png", "image.png", "else.jpeg"],
            new Date(),
            "Classic clothes",
            "cotton",
            "white/black"
        ),
        new Electronics(
            "2",
            "laptop Asus Rog zephyrus G14",
            "Buy to suffer.",
            9999,
            100,
            [
                new Review("42", "A.sus", new Date(), "Too much BSODS", {
                    service: 1,
                    price: 2,
                    value: 5,
                    quality: 1,
                }),
                new Review("422", "Somebody", new Date(), "AMD drivers.", {
                    service: 1,
                    price: 2,
                    value: 3,
                    quality: 2,
                }),
            ],
            ["asus1.png", "asus2.png"],
            new Date(),
            "Asus",
            "0",
            "220"
        ),
        new Electronics(
            "421",
            "Headphones Sony wf-1000xm3",
            "Ok, but..",
            3000,
            100,
            [
                new Review("4212", "Masaru Ibuka", new Date(), "Good", {
                    service: 5,
                    price: 3,
                    value: 5,
                    quality: 4,
                }),
                new Review("422", "Somebody", new Date(), "Music.", {
                    service: 5,
                    price: 3,
                    value: 5,
                    quality: 4,
                }),
            ],
            ["asus1.png", "asus2.png"],
            new Date(),
            "Sony",
            "2",
            "5"
        ),
    ];
}
/**
 * Calculates price for n-pieces of product and displays it.
 * @param {*} products array of product
 * @param {*} amount pieces to calculate
 */
function displayPricesForProductsAmount(products, amount) {
    console.log(`\n------Prices for <${amount}> pieces of product ------\n`);

    products.forEach(product => {
        console.log(
            {
                'ID': product.getID(),
                'name': product.getName(),
                'price': product.getPrice(),
            },
            `price for <${amount}> pieces : ${product.getPriceForQuantity(amount)}`
        );
    });

    console.log('\n--------------------------------------------\n');
}

/**
 * Sets value to Product property or get property value, displays result
 * @param {*} products array of products
 * @param {*} key to get or set
 * @param {*} value to set
 */
function displayUniversePropertyOfProduct(products, key, value) {
    console.log(`------Set <${value}> to property by key <${key}>------`);

    products.forEach(product => {
        product.getOrSetProperty(key, value);
        console.log({ 'ID': product.getID(), 'name': product.getName(),'changedProperty':product[key] }, '\n');
    });

    console.log('\n--------------------------------------------\n');
}

/**
 * Displays sorted products
 * @param {Product[]} products array of products
 * @param {string} sortRule sorting rule
 */
function displaySortedProducts(products, sortRule) {
    console.log(`\n Sorting by <${sortRule}>\n`);

    console.log(sort(products, sortRule).map(product => {
        return {
            'ID': product.getID(),
            'name': product.getName(),
            'description': product.getDescription(),
            'price': product.getPrice(),
            'type': product.constructor.name
        }
    }
    ));
}
/**
 * Display founded products
 * @param {Product[]} products array of products
 * @param {string} search keyword to search 
 */
function displayProductsSearch(products, search) {
    console.log(`\n Searching by <${search}>\n`)
    searchProducts(products, search).forEach(element => {
        console.log(element.getFullInformation())
    });
}