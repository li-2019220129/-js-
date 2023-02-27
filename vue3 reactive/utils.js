const { acctiveEffect } = require('./effect')
//收集依赖函数
let targetMap = new WeakMap()
function track(target, key) {
  let depMaps = targetMap.get(target)
  if (!depMaps) {
    depMaps = new Map()
    targetMap.set(target, depMaps)
  }
  let deps = depMaps.get(key)
  if (!deps) {
    deps = new Set()
    depMaps.set(key, deps)
  }
  if(!acctiveEffect.b) return
  // if(!acctiveEffect.c) return
  deps.add(acctiveEffect.b)
  acctiveEffect.b.addDeps(deps)
}

//触发依赖
function trigger(target, key) {
  let depMaps = targetMap.get(target)
  let deps = depMaps.get(key)
  for (const effect of deps) {
    if (effect._scheduler) {
      effect._scheduler()
    } else {
      effect.run()
    }
  }
}

module.exports = {
  track,
  trigger,
}
