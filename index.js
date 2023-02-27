// let a ={
//   name:12,
//   io:'lj'
// }
// let b = {...a}
// a.name = 34
// console.log(a,b)
// eval("a=1;b=2;console.log(a+b)")


function *await(){
  let a = yield Promise.resolve('1212')
  console.log(a,'a')
  let b = yield new Promise((resolve,reject)=>{
    setTimeout(()=>{
      resolve('88888')
    },2000)
  })
  console.log(b,'b')
}

let res = fn(await())

function fn(a,n=null){
  let next = a.next(n)
  if(next.done) return Promise.resolve(next.value)
  if(!(next.value instanceof Promise)) next.value = Promise.resolve(next.value)
  next.value.then((res)=>{
    fn(a,res)
  }).catch(e=>{
    a.throw(e)
  })
}