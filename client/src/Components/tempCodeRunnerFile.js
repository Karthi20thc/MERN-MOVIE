const products = [{
 name: "person1",
 age: "23"
}, {
 name: "person2",
 age: "29"
}]

const filters = {
 name: "person1",
 age: "23"
}
console.log(Object.entries(filters));

const filteredProducts = products.filter((item) => Object.entries(filters).every(([key, value]) => item[key].includes(value)))

console.log(products[0]["name"].includes("person1")) //true


console.log(filteredProducts);