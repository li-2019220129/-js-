const { trigger, track } = require('./utils')
const {acctiveEffect}  = require('./effect')
function createGetter(isReadonly) {
  return function get(target, key) {
    const res = Reflect.get(target, key)
    if (key === 'is_reactive') {
      return !isReadonly
    }else if(key==='is_readlony'){
      return isReadonly
    }
    if (!isReadonly&&!acctiveEffect.c) {
      track(target, key)
    }
    return res
  }
}
function createSetter() {
  return function set(target, key, newValue) {
    Reflect.set(target, key, newValue)
    trigger(target, key)
  }
}
function reactive(target) {
  return new Proxy(target, {
    get: createGetter(),
    set: createSetter(),
  })
}

function readOnly() {
  return new Proxy(target, {
    get: createGetter(true),
    set(target, key, newValue) {
      return true
    },
  })
}
function isReactive(target) {
  return !!target['is_reactive']
}
function isReadonly(target){
  return !!target['is_readlony']
}
module.exports = {
  reactive,
  isReactive,
  readOnly,
  isReadonly
}
