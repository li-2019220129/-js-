function debounce(fn,timer,immediate=false){
  let time = null
  let isShow = false
  let fne =function(...args){
    if(immediate&&!isShow){
      fn.apply(this,args)
      isShow=true
    }
    if(time){
      clearTimeout(time)
    }
    time=setTimeout(()=>{
      fn.apply(this,args)
      isShow=false
      time = null
    },timer)
  }
  //取消功能
  fne.cancel = function(){
    if(time) clearTimeout(time)
    time = null
    isShow = false
  }
  return fne
}