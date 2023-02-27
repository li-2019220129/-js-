function *await(){
  try{
    console.log(121212)
    let value = yield Promise.resolve(12)
    console.log(value)
    let value1 = yield new Promise((resolve,reject)=>{
      setTimeout(()=>{
        resolve(34)
      },1000)
    })
    console.log(value1)
    let value2 = yield Promise.reject(67)
    console.log(value2)
  }catch(e){
    console.log(900909)
    console.log(e)
  }
}
let  a = await()
automation(a)
function automation(a,res=null){
  let ans = a.next(res)
  console.log(ans,232323)
  if(ans.done===true) return Promise.resolve(ans.value)
  if(!(ans.value instanceof Promise)) ans.value = Promise.resolve(ans.value)
  ans.value.then((data)=>{
    automation(a,data)
  }).catch((e)=>{
    console.log(4545)
    a.throw(e)
  })
}

// class Promise{
// static po = 12
// constructor(){

// }
// statue= '12'
// foo=()=>{

// }
// }
// let po = new Promise()
// console.log(Promise.po)
