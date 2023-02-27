let acctiveEffect = {
  b: null,
  c: null,
}
class ReactEffect {
  constructor(fn, scheduler) {
    this._fn = fn
    this._scheduler = scheduler
    this.deps = new Set()
    this.active = true
  }
  addDeps(dep) {
    this.deps.add(dep)
  }
  deleteDep() {
    for (const item of this.deps) {
      item.delete(this)
    }
  }
  run() {
    acctiveEffect.b = this
    const res = this._fn()
    return res
  }
  stop() {
    if (this.active) {
      this.deleteDep()
      this.active = false
      acctiveEffect.c = true
    }
  }
}

function effect(fn, options) {
  const scheduler = options?.scheduler
  const _effect = new ReactEffect(fn, scheduler)
  _effect.run()
  const running = _effect.run.bind(_effect)
  running.effect = _effect
  return running
}
function stop(running) {
  running.effect.stop()
}
module.exports = {
  effect,
  stop,
  acctiveEffect,
}
