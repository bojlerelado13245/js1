import input from "./input.js"
let regex, result
let tx = "Hello WORLD! Today is the 5th of June 2024 21th century. I've 15 apples, 123 oranges, and 4567 grapes."
async function asd(text) 
{
    regex = /\b\d{2,3}\b/g;
    result = text.match(regex)
    return result
}

async function asd2(text) 
{
    regex = /\b[2468]\d*\b/g;
    result = text.match(regex)
    return result
}

async function asd3(text) 
{
    regex = /\b\d+[a-zA-Z]\b/g;
    result = text.match(regex)
    return result
}

async function asd4(text) 
{
    regex = /\b[A-Z]+\b/g;
    result = text.match(regex)
    return result
}

async function asd5(text) 
{
    regex = /\b[A-Z][a-zA-Z]{2,}\b/g;
    result = text.match(regex)
    return result
}

async function asd6(text) 
{
    regex = /\b[aeiouáéíóöőúüűAEIOUÁÉÍÓÖŐÚÜŰ]\w*/g;
    result = text.match(regex)
    return result
}
console.log(asd(tx))
console.log(asd2(tx))
console.log(asd3(tx))
console.log(asd4(tx))
console.log(asd5(tx))
console.log(asd6(tx))