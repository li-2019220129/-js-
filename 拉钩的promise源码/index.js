let PENDING = 'pending'
let REJECT = 'reject'
let FULFILLED = 'fulfilled'
let value1 = null
function LZY(value) {
  if (value instanceof MyPromise) {
    value.then((res) =>  LZY(res))
  } else {
    value1 = value
  }
  return value1
}
class MyPromise {
  constructor(fn) {
    try {
      fn(this.resolve, this.reject)
    } catch (err) {
      this.reject(err)
    }
  }
  status = PENDING
  reason = null
  value = null
  onFulfilled = []
  onReject = []
  resolve = (value) => {
    if (this.status != PENDING) return
    this.status = FULFILLED
    this.value =  LZY(value)
    this.onFulfilled.forEach((item) => {
      item()
    })
  }
  reject = (reason) => {
    if (this.status != PENDING) return
    this.status = REJECT
    this.reason = reason1 ?? reason
    this.onReject.forEach((item) => {
      item()
    })
  }
  finally(callback) {
    return this.then(
      
      
      (err) => {
        return MyPromise.resolve(callback()).then(() => {
          throw err
        })
      }
    )
  }
  catch(failCallBack){
    return this.then(undefined,failCallBack)
  }
  then(success, filed) {
    success =
      success ||
      ((value) => {
        return value
      })
    filed =
      filed ||
      ((err) => {
        throw err
      })
    let promise2 = new MyPromise((resolve, reject) => {
      if (this.status === FULFILLED) {
        setTimeout(() => {
          try {
            let x = success(this.value)
            resolvePromise(promise2, x, resolve, reject)
          } catch (err) {
            reject(err)
          }
        }, 0)
      } else if (this.status === REJECT) {
        setTimeout(() => {
          try {
            let x = filed(this.reason)
            resolvePromise(promise2, x, resolve, reject)
          } catch (err) {
            reject(err)
          }
        }, 0)
      } else {
        this.onFulfilled.push(() => {
          setTimeout(() => {
            try {
              let x = success(this.value)
              resolvePromise(promise2, x, resolve, reject)
            } catch (err) {
              reject(err)
            }
          }, 0)
        })
        this.onReject.push(() => {
          setTimeout(() => {
            try {
              let x = filed(this.reason)
              resolvePromise(promise2, x, resolve, reject)
            } catch (err) {
              reject(err)
            }
          }, 0)
        })
      }
    })
    return promise2
  }
}

function resolvePromise(promise2, x, resolve, reject) {
  if (x === promise2) {
    return reject(new Error('not no'))
  }
  if (x instanceof MyPromise) {
    x.then(
      (res) => {
        resolve(res)
        // resolvePromise(promise2, res, resolve, reject)
      },
      (err) => {
        reject(err)
      }
    )
  } else {
    resolve(x)
  }
}

// let promise = new MyPromise((resolve, reject) => {
//   setTimeout(() => {
//     reject(12)
//   })
// })

// let p1 = promise
//   .then(
//     (res) => {
//       console.log(res, 1111)
//       // return p1
//       return new MyPromise((resolve, reject) => {
//         resolve(34)
//       })
//     },
//     (e) => {
//       console.log(e)
//       return 1000
//     }
//   )
//   .then(
//     (res) => {
//       console.log(res)
//     },
//     (err) => {
//       console.log(err)
//     }
//   )
let promise1 = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve(
      new MyPromise((res) => {
        res(
          new MyPromise((res) => {
            res(90909)
          })
        )
      })
    )
  }, 1000)
}).then((data) => {
  console.log(56556)
  console.log(data)
  return new MyPromise((res)=>{res(3434)}).then((res)=>{
    return new MyPromise((res)=>{
      res(4545)
    }).then((res)=>{
      return new MyPromise(res=>{
        res(676767)
      })
    })
  }).then((res)=>{
    return new MyPromise(res=>{
      res(454545)
    })
  })
}).then((res)=>{
  console.log(res)
})
// let promise2 = new MyPromise((resolve, reject) => {
//   setTimeout(() => {
//     resolve(
//      3434
//     )
//   }, 1000)
// }).then((data) => {
//   console.log(56556)
//   console.log(data)
// })
