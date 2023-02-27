function add(a, b, c) {
  return a + b + c
}
function currying(fn) {
  return function res (...args) {
    if(fn.length>args.length){
      return function(){
        return res(...args.concat(Array.from(arguments)))
      }
    }else{
      return fn(...args)
    }
  }
}
let p = currying(add)
console.log(p(1)(2,3))
console.log(p(1, 2, 3))
