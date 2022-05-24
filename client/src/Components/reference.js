// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries
// Object.entries()

// The Object.entries() method returns an array of a given object's own enumerable string-keyed property [key, value] pairs. This is the same as iterating with a for...in loop, except that a for...in loop enumerates properties in the prototype chain as well.

// The order of the array returned by Object.entries() is the same as that provided by a for...in loop. If there is a need for different ordering, then the array should be sorted first, like Object.entries(obj).sort((a, b) => b[0].localeCompare(a[0]));. 

//Try it
const object1 = {
 a: 'somestring',
 b: 42
};

console.log(Object.entries(object1)) //Array[Array["a", "somestring"], Array["b", 42]]


for (const [key, value] of Object.entries(object1)) {
 console.log(`${key}: ${value}`);
}

// expected output:
// "a: somestring"
// "b: 42"

Syntax

Object.entries(obj)

// Parameters

// obj
// The object whose own enumerable string - keyed property[key, value] pairs are to be returned.

// Return value
// An array of the given object's own enumerable string-keyed property [key, value] pairs. 

//--------------------------------------------------------------------------------


// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every

Array.prototype.every()

// The every() method tests whether all elements in the array pass the test implemented by the provided function. It returns a Boolean value. 

//Try it
const isBelowThreshold = (currentValue) => currentValue < 40;

const array1 = [1, 30, 39, 29, 10, 13];

console.log(array1.every(isBelowThreshold));
// expected output: true

Syntax

// Arrow function
every((element) => { /* ... */ })
every((element, index) => { /* ... */ })
every((element, index, array) => { /* ... */ })

// Callback function
every(callbackFn)
every(callbackFn, thisArg)

// Inline callback function
every(function (element) { /* ... */ })
every(function (element, index) { /* ... */ })
every(function (element, index, array) { /* ... */ })
every(function (element, index, array) { /* ... */ }, thisArg)

// Parameters

// callbackFn
//     A function to test for each element.
//     The function is called with the following arguments:

//     element
// The current element being processed in the array.

//     index
// The index of the current element being processed in the array.

//     array
// The array every was called upon.

// thisArg Optional
// A value to use as this when executing callbackFn.

// Return value
// true if the callbackFn function returns a truthy value for every array element. Otherwise, false. 

//--------------------------------------------------------------------------------

//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter

Array.prototype.filter()

// The filter() method creates a new array with all elements that pass the test implemented by the provided function.

//try it
const words = ['spray', 'limit', 'elite', 'exuberant', 'destruction', 'present'];

const result = words.filter(word => word.length > 6);

console.log(result);
// expected output: Array ["exuberant", "destruction", "present"]

//SYNTAX
// Arrow function
filter((element) => { /* ... */ })
filter((element, index) => { /* ... */ })
filter((element, index, array) => { /* ... */ })

// Callback function
filter(callbackFn)
filter(callbackFn, thisArg)

// Inline callback function
filter(function (element) { /* ... */ })
filter(function (element, index) { /* ... */ })
filter(function (element, index, array) { /* ... */ })
filter(function (element, index, array) { /* ... */ }, thisArg)

Parameters

// callbackFn
// Function is a predicate, to test each element of the array. Return a value that coerces to true to keep the element, or to false otherwise.

// The function is called with the following arguments:

// element
// The current element being processed in the array.

// index
// The index of the current element being processed in the array.

// array
// The array on which filter() was called.

// thisArgOptional
// Value to use as this when executing callbackFn.

// Return value
// A new array with the elements that pass the test. If no elements pass the test, an empty array will be returned.



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





// -------------------------------------------------------------------------------------------------------

//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort#try_it

Array.prototype.sort()

// The sort() method sorts the elements of an array in place and returns the sorted array. The default sort order is ascending, built upon converting the elements into strings, then comparing their sequences of UTF-16 code units values.

// The time and space complexity of the sort cannot be guaranteed as it depends on the implementation. 

//try it
const months = ['March', 'Jan', 'Feb', 'Dec'];
months.sort();
console.log(months);
// expected output: Array ["Dec", "Feb", "Jan", "March"]

const array2 = [1, 30, 4, 21, 100000];
array1.sort();
console.log(array2);
// expected output: Array [1, 100000, 21, 30, 4]

Syntax
// Functionless
sort()

// Arrow function
sort((a, b) => { /* ... */ })

// Compare function
sort(compareFn)

// Inline compare function
sort(function compareFn(a, b) { /* ... */ })

Parameters

// compareFn Optional
// Specifies a function that defines the sort order.If omitted, the array elements are converted to strings, then sorted according to each character's Unicode code point value.

// a
//The first element for comparison.

// b
// The second element for comparison.

// Return value
// The sorted array.Note that the array is sorted in place, and no copy is made. 


const array3 = [1, 30, 4, 21, 100000];
const fntype = array3.sort((a, b) => console.log(a, b))
console.log(fntype)
// > 1 30
// > 30 4
// > 4 21
// > 21 100000
// > Array [1, 30, 4, 21, 100000]

const fntype2 = array3.sort((a, b) => a - b)
console.log(fntype)
//  Array [1, 4, 21, 30, 100000]