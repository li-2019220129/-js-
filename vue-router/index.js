let _vue= null
export default class VueRouter{
  static install(Vue) {
    //1.判断当前插件是否被安装
    if(VueRouter.install.installed) return
    VueRouter.install.installed = true
    _vue = Vue
    _vue.mixin({
      beforeCreate(){
        if(this.$options.router){
          _vue.prototype.$router = this.$options.router
        }
      }
    })
    //2.把vue的构造函数记录到全局变量 
  }
  constructor(options){
    this.options = options
    this.routerMap = {}
    this.data = _vue.observable({
      current:'/'
    })
  }
  init(){
    this.createRouteMap()
    this.initEvent()
    this.initComponent(_vue)
  }
  createRouteMap(){
    this.options.route,forEach((route)=>{
      this.routerMap[route.path] = route.component
    })
  }
  initEvent(){
    window.addEventListener('popstate',()=>{
      this.data.current = window.location.pathname
    })
  }
  initComponent(Vue){
    Vue.component('router-link',{
      props:{
        to:string
      },
     render(h){
      return h('a',{
        attrs:{
          href:this.to
        },
        on:{
          click:this.clickHandler
        }
      })
     },
     methods:{
      clickHandler(e){
        history.pushState({},null,this.to)
        this.$router.data.current = this.to
        e.preventDefault()
      }
     }
    })
    Vue.component('router-view',{
      render(h){
        return h()
      }
    })
  }
}