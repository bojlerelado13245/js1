function divisors(integer) {
  var res = []
  for (var i = 2; i <= Math.floor(integer / 2); ++i) if (integer % i == 0) res.push(i);
  return res.length ? res : integer + ' is prime'
};

function find_difference(a, b) {
  return Math.abs(a[0]*a[1]*a[2]-b[0]*b[1]*b[2]);
}

function crap(x, bags, cap){
  let c = 0;
  for (let el of x){
    for (let elem of el){
      if (elem === "@") c++;
      if (elem === "D") return "Dog!!";
    }
  }
  return c <= bags * cap? "Clean" : "Cr@p"
}

function highAndLow(numbers){
  numbers = numbers.split(' ');
  return `${Math.max(...numbers)} ${Math.min(...numbers)}`;
}