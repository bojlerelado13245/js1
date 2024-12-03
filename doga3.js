function maskify(cc) {

    let xd = ""
     for (var i = 0; i<cc.length; i++){
        if (i < (cc.length-4)){
          xd += "#" 
        }
        else
        {
         xd +=cc[i]
        }
     }
     return xd
 }


 function isTriangle(a,b,c)
{


    if (a>0 && b>0 && c>0 && a+b>c && a+c>b && b && b+c>a){
       return true
    }
    else{
        return false
    }
   
}

function timeConvert(num) { 


let perc = "0"

let mp = "0"

if(num >0){
    mp = num % 60
perc = Math.floor(num / 60)
}

if (mp < 10){
    mp = `0${mp}`
}
if (perc < 10){
    perc = `0${perc}`
}

return`${perc}:${mp}`

}

function createArrayOfTiers(num) {
  
    let asd = []
      
      for(let i = 1; i <= num.toString().length;i++)
        {
          let xd = ""
          for(let a = 0; a < i; a++)
            {
              xd = xd+num.toString()[a]
              
              
            }
            asd.push(xd)
        }
      
      
        return asd;
}
  