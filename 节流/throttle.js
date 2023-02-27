function throttle(fn,delay,options={leading:true,trailing:false}){
  const {leading,trailing} = options
  let timer = null
  let lastTime = 0
  const _throttle = function(...args){
    const nowTime = new Date().getTime()
    if(!lastTime&&!leading) lastTime = nowTime
    let removeTime = delay-(nowTime-lastTime)
    if(removeTime<=0){
      if(timer){
        clearTimeout(timer)
        timer = null
      }
      fn.apply(this,args)
      lastTime=nowTime
      return
    }
    if(trailing&&!timer){
      timer = setTimeout(()=>{
        timer = null
        lastTime = !leading ? 0 : new Date().getTime() 
        fn.apply(this,args)
      },removeTime)  
    }
  }
  return _throttle
}