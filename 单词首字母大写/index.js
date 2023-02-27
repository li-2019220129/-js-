let str ='user list'
function chartStart(str){
  return str.replace(/(?:^|\s)\w/g,(c)=>{
    return c.toUpperCase() 
  })
}
console.log(chartStart(str))