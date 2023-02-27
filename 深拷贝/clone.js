function object(obj) {
  return (
    Object.prototype.toString.call(obj) == '[object Object]' ||
    Object.prototype.toString.call(obj) == '[object Array]'
  )
}
function fn(obj,map = new WeakMap()) {
  if (!object(obj)) {
    return obj
  }
  //解决对象循环引用
  if(map.has(obj)){
    return map.get(obj)
  }
  let res = Array.isArray(obj) ? [] : {}
  map.set(obj,res)
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      res[key] = fn(obj[key],map)
    }
  }
  return res
}
