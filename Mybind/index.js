Function.prototype.myBind = function (content, ...args) {
  let fn = this
  function res(...args1) {
    fn.call(this instanceof res ? this : content, ...[...args, ...args1])
  }
  return res
}


function a(...args){
  console.log(this)
  console.log(args)
}

let b={
  name:'1212'
}
let c = a.myBind(b,12)
c(34)
