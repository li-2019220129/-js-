Function.prototype.myCall=function(content,...args){
  if(typeof this!=='function') return  new Error('not a function')
  content.fn = this
  content.fn(...args)
  delete content.fn
}
let obj ={
 a:'1'
}
let fn = function(...args){
 console.log(this,args)
}
fn.myCall(obj,1,2,3,4)