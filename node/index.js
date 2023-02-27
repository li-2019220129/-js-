const name = 34
setTimeout(()=>{
  console.log(name)
  console.log(module.exports.name)
},2000)
module.exports={
  name
}