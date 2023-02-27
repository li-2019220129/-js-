let arr = [[1,2,3,[45,[56]]],[56,[67]]]
//第一种（递归思路）
function flat(arr){
  let res=[]
  for(var i of arr){
    if(Array.isArray(i)){
      res.push(...flat(i))
    }else{
      res.push(i)
    }
  }
  return res
}

//es6新增api
function flat1(arr){
  return arr.flat(Infinity)
}

//利用高级数组方法
function flat2(arr){
  return arr.reduce((prev,count)=>{
    return Array.isArray(count)? prev.concat(flat(count)) :  prev.concat(count)
  },[])
}


//牛皮class(不用递归写出来了，哈哈哈哈哈)
function some(arr){
  return arr.some(item=> Array.isArray(item))
}
function flatlast(arr,num){
  let res=[]
  let sum = 0
  while(true){
    if(sum===num){
      return arr
    }
    for(var i=0;i<arr.length;i++){
      if(Array.isArray(arr[i])){
        res.push(...arr[i])
      }else{
        res.push(arr[i])
      }
      if(!some(arr)&&i===arr.length-1){
       return res
      }
    }
    sum++
    arr=res
    res=[]
  }
}

console.log(flatlast(arr,1))

let a = {
  next:()=>{
    console.log(this)
  }
}
a.next()