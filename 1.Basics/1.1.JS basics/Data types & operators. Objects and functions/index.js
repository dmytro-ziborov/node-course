/**
 * Describes Product
 * 
 * @param {string} id unique product identifier 
 * @param {string} name product product name 
 * @param {string} description short description of product 
 * @param {number} price product price
 * @param {string} brand product brand
 * @param {string[]} sizes product sizes
 * @param {string} activeSize product active size 
 * @param {number} quantity product quantity 
 * @param {date} date date of posting
 * @param {Review[]} reviews product reviews 
 * @param {string[]} images product images
 */
function Product(id, name, description, price, brand, sizes, activeSize, quantity, date, reviews, images) {
    //constructor
    this.ID = id;
    this.name = name;
    this.description = description;
    this.price = price;
    this.brand = brand;
    this.sizes = sizes;
    this.activeSize = activeSize;
    this.quantity = quantity;
    this.date = date;
    this.reviews = reviews;
    this.images = images;
    // properties setters and getters
    this.setID = (ID) => this.ID = ID;
    this.getID = () => this.ID;

    this.setName = (name) => this.name = name;
    this.getName = () => this.name;

    this.setDescription = (description) => this.description = description;
    this.getDescription = () => this.description

    this.setPrice = (price) => this.price = price;
    this.getPrice = () => this.price;

    this.setBrand = (brand) => this.brand = brand;
    this.getBrand = () => this.brand;

    this.setSizes = (sizes) => this.sizes = sizes;
    this.getSizes = () => this.sizes;

    this.setActiveSize = (activeSize) => this.activeSize = activeSize;
    this.getActiveSize = () => this.activeSize;

    this.setQuantity = (quantity) => this.quantity = quantity;
    this.getQuantity = () => this.quantity;

    this.setDate = (date) => this.date = date;
    this.getDate = () => this.date;

    this.setReviews = (reviews) => this.reviews = reviews;
    this.getReviews = () => this.reviews;

    this.setImages = (images) => this.images = images;
    this.getImages = () => this.images;

    //methods 

    /**
     * @param {string} id of reviews 
     * @returns review by id
     */
    this.getReviewByID = (id) => this.getReviews().find(review => review.ID === id);
    /**
     * @param {string} id of image
     * @returns image by id, if {@link id} is empty - returns first image
     */
    this.getImage = (id = 0) => this.getImages()[id];
    /**
     * Adds new size to {@link sizes}
     * @param {string} size to add 
     */
    this.addSize = (size) => {
        this.sizes.push(size);
    }
    /**
     * Deletes size from {@link sizes}
     * @param {string} size to delete
     */
    this.deleteSize = (size) => {
        let index = this.getSizes().indexOf(size);
        if (index != -1)
            this.sizes.splice(index, 1);
    }
    /**
     * Adds new review to {@link reviews}
     * @param {Review} review to add 
     */
    this.addReview = (review) => {
        reviews.push(review);
    }
    /**
     * Deletes review from {@link reviews} by ID
     * @param {string} id to delete
     */
    this.deleteReview = (reviewID) => {
        let index = this.getReviews().findIndex((review) => review.ID === reviewID);
        if (index != -1)
            this.reviews.splice(index);
    }
    /**
     * Calculates average rating of product
     * @returns average rating of product
     */
    this.getAverageRating = () => this.getReviews().reduce(
        (accumulator, review) => {
            let rating = review.getRating();
            return accumulator + Object.values(rating).reduce((total, mark) => total + mark, 0) / Object.keys(rating).length;
        }, 0) / this.getReviews().length;
}

/**
 * Describes Product's review 
 * @param {string} ID unique identifier of review 
 * @param {string} author review author
 * @param {date} date review posting date 
 * @param {string} comment review comment
 * @param {[string,number]} rating rating {service,price,value,quality}
 */
function Review(ID, author, date, comment, rating) {
    this.ID = ID;
    this.author = author;
    this.date = date;
    this.comment = comment;
    this.rating = { 'service': rating[0], 'price': rating[1], 'value': rating[2], 'quality': rating[3] };

    //setters and getters
    this.setID = (ID) => this.ID = ID;
    this.getID = () => this.ID;

    this.setAuthor = (author) => this.author = author;
    this.getAuthor = () => this.author;

    this.setDate = (date) => this.date = date;
    this.getDate = () => this.date;

    this.setComment = (comment) => this.comment = comment;
    this.getComment = () => this.comment;

    this.setRating = (rating) => this.rating = { 'service': rating[0], 'price': rating[1], 'value': rating[2], 'quality': rating[3] };
    this.getRating = () => this.rating;
}
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

/* Tests */

//init products
let products = init();

//test each product 
products.forEach(product => {
    console.log('\n', '\n');
    console.dir(product);
    getReviewByID(product);
    getImage(product);
    addSize(product);
    deleteSize(product);
    addReview(product);
    deleteReview(product);
    displayProductAverageRating(product);
});
//sort products by different rules tests
displaySortedProducts(products, 'ID');
displaySortedProducts(products, 'name');
displaySortedProducts(products, 'price');
//search test
displayProductsSearch(products, 'shirt');
displayProductsSearch(products, 't-shirt');
displayProductsSearch(products, 'tan');
/**
 * @returns mock objects
 */
function init() {
    return [
        new Product('1', 'shirt Green potato', 'Just a simple green shirt. BREAKE THE RULES!', 42, 'WeDontLikeGreenShirts', ['m', 'l', 'xl'], 'xl', 999, new Date().toISOString(),
            [
                new Review('1', 'John Doe', new Date().toISOString(), 'Hmmm, idk why that brand create that shirt, but I like it!', [5, 5, 5, 5]),
                new Review('2', 'John Doe', new Date().toISOString(), 'That shirt is awesome, ordered one more for my wife', [5, 5, 5, 5]),
                new Review('3', 'Jane Doe', new Date().toISOString(), 'My husband has awful taste on clothes.', [1, 1, 1, 1])
            ],
            ['happyJohnGreenShirt.png', 'sadJaneGreenShirt.png', 'photo.jpg']
        ),
        new Product('15', 'red sun shirt', 'In this shirt you will shine even on the darkest night', 57, 'WeDontLikeGreenShirts', ['l', 'xl'], 'xl', 1000, new Date().toISOString(),
            [
                new Review('3', 'Grumpy cat', new Date().toISOString(), `This sunny shirt made me happy`, [5, 5, 5, 5]),
                new Review('4', 'Solaire', new Date().toISOString(), 'PRAISE THE SUN', [5, 5, 5, 5])
            ],
            ['happyCatInShirt.png', 'soul.png', 'randompic.jpeg']
        ),
        new Product('2', 'mesh tank top', 'Cringe.', 1, 'CringeProducts', ['s', 'xs', 'l'], 'xs', 1, new Date().toISOString(),
            [
                new Review('5', 'Sick', new Date().toISOString(), `-_-`, [5, 5, 5, 5]),
                new Review('6', 'Inquisition', new Date().toISOString(), 'Burn down.', [1, 1, 1, 1])
            ],
            ['wtf.png', 'holyFire.png', 'something.jpeg']
        ),
        new Product('47', 't-shirt black and whit', 'Classic.', 24, 'Classic Clothes', ['s', 'm', 'xs', 'l'], 'l', 76, new Date().toISOString(),
            [
                new Review('44', 'Sirius Black', new Date().toISOString(), `I like it`, [5, 5, 5, 5]),
                new Review('2131', 'Inquisition', new Date().toISOString(), `I don't like it`, [1, 1, 1, 1])
            ],
            ['dogo.png', 'image.png', 'else.jpeg']
        )
    ];
}
/**
 * Displays review by ID
 * @param {Product[]} product array of products
 */
function getReviewByID(product) {
    console.log('\n Get review by ID test\n')
    let firstReviewID = product.getReviews()[0].getID();
    console.log(product.getReviewByID(firstReviewID));
}
/**
 * Displays image's names
 * @param {Product[]} product array of products
 */
function getImage(product) {
    console.log('\n Get image test\n')

    console.log({ 'image without parameters': product.getImage(), 'image on last index': product.getImage(product.getImages().length - 1) })
}
/**
 * Adds size to product's size list
 * @param {Product[]} product array of products
 */
function addSize(product) {
    console.log(`\n Add size 'xxxxxl' test\n`)

    product.addSize('xxxxxxxxxl')

    console.log(product.getSizes());
}
/**
 * Removes size from product
 * @param {Product[]} product array of products
 */
function deleteSize(product) {
    console.log(`\n Delete size 'xxxxxl' test\n`)

    product.deleteSize('xxxxxxxxxl')

    console.log(product.getSizes());
}
/**
 * Adds review to product test
 * @param {Product[]} product array of products
 */
function addReview(product) {
    console.log(`\n Add review test\n`)

    product.addReview(new Review(42, 'CopyPasteHero', new Date().toISOString(), `It's copied comment`, [5, 5, 5, 5]))

    console.log(product.getReviews());
}
/**
 * Get last reviewId and delete it test 
 * @param {Product[]} product array of products
 */
function deleteReview(product) {
    console.log(`\n Delete review test\n`)

    product.deleteReview(product.getReviews()[product.getReviews().length - 1].getID());

    console.log(product.getReviews());
}
/**
 * Calculates product's average rating 
 * @param {Product[]} product array of products
 */
function displayProductAverageRating(product) {
    console.log(`\n Get average rating\n`)

    console.log(
        {
            'ID': product.getID(),
            'name': product.getName(),
            'averageRating': product.getAverageRating()
        }
    );
}
/**
 * Displays sorted products
 * @param {Product[]} products array of products
 * @param {string} sortRule sorting rule
 */
function displaySortedProducts(products, sortRule) {
    console.log(`\n Sorting by ${sortRule} \n`)
    console.log(sort(products, sortRule).map(product => {
        return {
            'ID': product.getID(),
            'name': product.getName(),
            'description': product.getDescription(),
            'price': product.getPrice()
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
    console.log(`\n Searching by ${search} \n`)
    console.log(searchProducts(products, search).map(product => {
        return {
            'ID': product.getID(),
            'name': product.getName(),
            'description': product.getDescription(),
            'price': product.getPrice()
        }
    }
    ));
}