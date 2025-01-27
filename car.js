import input from "./input.js"

async function  getCars() {
    const data = await fetch("https://surveys-5jvt.onrender.com/api/cars/")
    return data.json()
}

console.log(await getCars())


async function getCarById(id) {
    const data = await fetch(`https://surveys-5jvt.onrender.com/api/cars/${id}`)
    return data.json()
}

console.log(await getCarById(1))

async function createCar() {
    const car = {
        model: await input("Model:"),
        brand: await input("Brand:"),
        year: await input("Year:"),
    }
    const data = await fetch("https://surveys-5jvt.onrender.com/api/cars/",{
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(car)
    })
    return data.json();
}

//console.log(await createCar())

async function updateCar(id) {
    const car = {
        model: await input("Model:"),
        brand: await input("Brand:"),
        year: await input("Year:"),
    }
    const data = await fetch(`https://surveys-5jvt.onrender.com/api/cars/${id}`,{
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        "id": id,
        body: JSON.stringify(car)
    })
    return data.json();
}

//console.log(await updateCar(await input("id:")))

async function deleteCar(id){
    const data = await fetch(`https://surveys-5jvt.onrender.com/api/cars/${id}`,{
        method: "DELETE",
    })
    return data.json();
}

//console.log(await deleteCar(await input("id:")))

