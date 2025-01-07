function divisors(integer) {
	var divs = [];
  
  for(var i = 2; i < integer; i++) {
    if(integer % i === 0) {
    	divs.push(i);
    }
  }
  
  return divs.length ? divs : integer + ' is prime';
};

function getCount(str) {

  const vw = ['a','e','o','u','i']
  let asd = str.split('').filter(letter => vw.includes(letter)).length
  console.lo
  return asd;
}

function hasUniqueChars(str){
  return str.split('').every(function(v, i, arr){
    return arr.indexOf(v) == i;
  });
}

function filter_list(l) {
  return l.filter(x => typeof(x) =="number");
}