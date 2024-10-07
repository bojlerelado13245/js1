import input from "./input.js"

async function asd(a) 
{
    let asd = a.toLowerCase();
    console.log(asd.slice(0,5))
    console.log(asd.slice(3,8))
    console.log(asd.slice(5,20))
    console.log(asd.slice(5,(5+6)))
    console.log(asd.toUpperCase())

    let asd2 = "";
    for(let i = 0; i<asd.length; i++){
        if (i%2== 0){
            asd2 += asd[i];
        }
        else{
            asd2 += asd[i].toUpperCase();
        }
    }
    console.log(asd2)

    
    console.log(asd.replaceAll("e", "E"))

    let xd = asd.split('e')
    console.log(xd)

}

asd("qwerTZUiopőúASDfghjk")
