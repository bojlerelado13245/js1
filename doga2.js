function createArrayOfTiers(num) {
  
let asd = []
  
  for(let i = 1; i <= num.toString().length;i++)
    {
      let xd = ""
      for(let a = 0; a < i; a++)
        {
          xd = xd+num.toString()[a]
          //asd.push(num.toString()[i])
          
        }
        asd.push(xd)
    }
  
  
    return asd;
}

function myParseInt(str) {
  let r
  if (isNaN(str.trim())){
     r = NaN
  }
  else if (Number.isInteger(Number(str.trim()))){
    r=Number(str)
  }
  else{
    r = NaN
  }
  return r
}

function factorial(n){
  let f = 1;
  for(let i = 1; i <= n; i++){
    f = f*i
  }
  return f
}

function disemvowel(str) {
  const vw = ['a','e','i','o','u']

  let ns = "";
  const strr = Array.from(str);

  strr.forEach(char =>{
    if(!vw.includes(char.toLowerCase())){
      ns += char
    }
  })
  return ns
}