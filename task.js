class Good {
    
    constructor(id, name, description, sizes, price, available){
        this.id = id;
        this.name = name;
        this.description = description;
        this.sizes = sizes;
        this.price = price;
        this.available = available;
    }

    setAvailable() {
        if (this.available) this.available = false;
        else this.available = true;
    }
}

class GoodsList {
    #goods;
    constructor(goods, filter, sortPrice, sortDir){
        this.#goods = goods;
        this.filter = filter;
        this.sortPrice = sortPrice;
        this.sortDir = sortDir;
    }

    get list() {
        let result = []
        for (let i = 0; i < this.#goods.length; i++) {
            if (this.#goods[i].name.match(this.filter)) {
                if (this.#goods[i].available && !this.sortPrice) {
                    result.push({name: this.#goods[i].name, price: this.#goods[i].price});
                } else if (this.#goods[i].available && this.sortPrice && this.sortDir) {
                    result.push({name: this.#goods[i].name, price: this.#goods[i].price});
                    result.sort((good1, good2) => (+good1.price) - (+good2.price));
                } else if (this.#goods[i].available && this.sortPrice && !this.sortDir) {
                    result.push({name: this.#goods[i].name, price: this.#goods[i].price});
                    result.sort((good1, good2) => (+good2.price) - (+good1.price));
                }
            }  
        }
        return result;
    }

    add(good) {
        this.#goods.push(good);
    }

    remove(id) {
        this.#goods.splice(id-1, 1)
    }
}

class BasketGood extends Good {
    constructor(id, name, description, sizes, price, available, amount){
        super(id, name, description, sizes, price, available);
        this.amount = amount;
    }
}

class Basket {
    constructor(goods){
        this.goods = goods;
    }
    // Стоимость товаров
    get totalAmount() {
        let prices = [];
        for (let i = 0; i < this.goods.length; i++) {
            prices.push(this.goods[i].price);
        }
        const res = prices.reduce((previousValue, currentValue) => (previousValue + currentValue))
        return res;
    }
    // Количество товаров
    get totalSum() {
        let amounts = [];
        let sum = 0;
        for (let i = 0; i < this.goods.length; i++) {
            amounts.push(this.goods[i].amount);
        }
        amounts.forEach(function(elem) {
            sum += elem;
        });
        return sum;
    }

    add(good, amount) {
        if (this.goods.some(el => el.name == good.name)) {
            let findIn = this.goods.findIndex(el => el.name == good.name);
            this.goods[findIn].amount += amount;
        } else {
            this.goods.push(new BasketGood(good, amount));
        }
    }

    remove(good, amount) {
        if (this.goods.some(el => el.name == good.name)) {
            let findIn = this.goods.findIndex(el => el.name == good.name);
            this.goods[findIn].amount -= amount;
            if (this.goods[findIn].amount <= 0 ) {
                this.goods.splice(findIn, 1);
            }
        } else{console.log('Такой товар в корзине отсутствует!')}
    }

    clear() {
        //return this.goods.splice(0); //тоже удаляет всё, но почему-то перед этим печатает содержимое
        return this.goods.length = 0;
    }

    removeUnavailable() {
        this.goods = this.goods.filter(el => el.available === true);
    }
}

const goods = [
    new Good(1, "Джемпер", "Шерстяной, синий", [40, 42, 44, 46, 48, 50], 1500, false),
    new Good(2, "Платье", "Летнее, в цветочек", [46, 48, 50, 52], 2700, true),
    new Good(3, "Шорты", "Белые, джинсовые", [42, 44, 46, 48, 50, 52, 54], 1800, true),
    new Good(4, "Майка", "Шелковая, розовая", [40, 42, 44], 2300, true),
    new Good(5, "Футболка", "Хлопковая, зелёная", [40, 42, 44, 46, 48, 50, 52, 54], 1950, false),
    new Good(2, "Платье чёрное", "Шерстяное", [46, 48, 52], 2800, true),
]

const goodsList = [
    new GoodsList(goods, /Платье/gmi, true, false)
]

const basketGood = [
    new BasketGood(1, "Джемпер", "Шерстяной, синий", [40, 42, 44, 46, 48, 50], 1500, false, 1),
    new BasketGood(2, "Платье", "Летнее, в цветочек", [46, 48, 50, 52], 2700, true, 2),
]

const basket = [
    new Basket(basketGood),
]
//Проверка класса Good и работы функции setAvalible
console.log(goods)
console.log(goods[0].setAvailable())
console.log(goods[0])

//Проверка класса GoodsList и его методов
console.log(goodsList)
console.log(goodsList[0].list) 
goodsList[0].add(new Good(7, "Юбка", "Длинная", [40, 42, 44], 1750, true))
console.log(goodsList[0].list)
goodsList[0].remove(6)
console.log(goodsList[0].list)


//Проверка класса BasketGood
console.log(basketGood)

//Проверка класса Basket
console.log(basket[0]) 
console.log(basket[0].totalAmount)
console.log(basket[0].totalSum)
console.log(basket[0].clear())
console.log(basket[0])
console.log(basket[0].add(2, "Платье", "Летнее, в цветочек", [46, 48, 50, 52], 2700, true, 1, 1))
console.log(basket[0].add(3, "Шорты", "Белые, джинсовые", [42, 44, 46, 48, 50, 52, 54], 1800, true, 2))
console.log(basket[0])
console.log(basket[0].remove((2, "Платье", "Летнее, в цветочек", [46, 48, 50, 52], 2700, true, 1), 1))
console.log(basket[0])
console.log(basket[0].removeUnavailable())
console.log(basket[0])