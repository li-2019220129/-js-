const PROMISE_STATUS_PENDING = 'pending'
const PROMSIE_STATUS_FULFILLD = 'fulfilled'
const PROMISE_STATUS_REJECTED = 'rejected'

function execFunctionWithCatchError(execFn, value, resolve, reject) {
  try {
    const res = execFn(value)
    resolve(res)
  } catch (error) {
    reject(error)
  }
}

class LZYPromise {
  constructor(executor) {
    this.status = PROMISE_STATUS_PENDING
    this.value = null
    this.reason = null
    this.onfulfilled = []
    this.onrejected = []
    const resolve = (value) => {
      queueMicrotask(() => {
        if (this.status === PROMISE_STATUS_PENDING) {
          this.status = PROMSIE_STATUS_FULFILLD
          this.value = value
          this.onfulfilled.forEach((item) => {
            item(this.value)
          })
        }
      })
    }
    const reject = (reason) => {
      queueMicrotask(() => {
        if (this.status === PROMISE_STATUS_PENDING) {
          this.status = PROMISE_STATUS_REJECTED
          this.reason = reason
          this.onrejected.forEach((item) => {
            item(this.reason)
          })
        }
      })
    }
    try {
      executor(resolve, reject)
    } catch (error) {
      reject(error)
    }
  }
  then(onfulfilled, onrejected) {
    onrejected =
      onrejected ||
      ((err) => {
        throw err
      })
    onfulfilled =
      onfulfilled ||
      ((value) => {
        throw value
      })
    return new LZYPromise((resolve, reject) => {
      if (this.status === PROMSIE_STATUS_FULFILLD && onfulfilled) {
        // try {
        //   const value = onfulfilled(this.value)
        //   resolve(value)
        // } catch (error) {
        //   reject(error)
        // }
        execFunctionWithCatchError(onfulfilled, this.value, resolve, reject)
      }
      if (this.status === PROMISE_STATUS_REJECTED && onrejected) {
        // try {
        //   const reason = onrejected(this.reason)
        //   resolve(reason)
        // } catch (error) {
        //   reject(error)
        // }
        execFunctionWithCatchError(onrejected, this.reason, resolve, reject)
      }
      if (this.status === PROMISE_STATUS_PENDING) {
        if (onfulfilled) {
          this.onfulfilled.push(() => {
            // try {
            //   const value = onfulfilled(this.value)
            //   resolve(value)
            // } catch (error) {
            //   reject(error)
            // }
            execFunctionWithCatchError(onfulfilled, this.value, resolve, reject)
          })
        }
        if (onrejected) {
          this.onrejected.push(() => {
            // try {
            //   const reson = onrejected(this.reason)
            //   resolve(reson)
            // } catch (error) {
            //   reject(this.reason)
            // }
            execFunctionWithCatchError(onrejected, this.reason, resolve, reject)
          })
        }
      }
    })
  }
  catch(onrejected) {
    return this.then(undefined, onrejected)
  }
  finally(onfinally) {
    this.then(
      () => {
        onfinally()
      },
      () => {
        onfinally()
      }
    )
  }
  static resolve(value) {
    return new LZYPromise((resolve, reject) => {
      resolve(value)
    })
  }
  static reject(value) {
    return new LZYPromise((resolve, reject) => {
      reject(value)
    })
  }
  static all(promise) {
    return new LZYPromise((resolve, reject) => {
      const res = []
      //必须要用count，不然最后如何用resolve将会有错
      let count = 0
      promise.forEach((item, index) => {
        item
          .then((data) => {
            res[index] = data
            count++
            if (count === promise.length) {
              // 条件不可写成 res.length ===promise.length(因为promise all是有顺序的，根据数组中的位置，然后还要考虑到参数数组中是异步resolve的情况)
              resolve(res)
            }
          })
          .catch((err) => {
            reject(err)
          })
      })
    })
  }
}
// const promise = new LZYPromise((resolve, reject) => {
//   resolve(121212)
//   // reject(23232323)
//   throw new Error('2323')
// })
// promise
//   .then((res) => {
//     console.log(res)
//   })
//   .catch((res) => {
//     console.log(res)
//   })
//   .finally(() => {
//     console.log('finally')
//   })
let a = new LZYPromise((resolve, reject) => {
  setTimeout(() => {
    resolve(4)
  }, 1000)
})
let b = LZYPromise.resolve(2)
LZYPromise.all([a, b]).then((res) => {
  console.log(res)
})

// setTimeout(() => {
//   promise.then(
//     (res) => {
//       console.log(res)
//     },
//     (e) => {
//       console.log(e)
//     }
//   )
// // }, 1000)

// let a = new Promise((resolve,reject)=>{
//   setTimeout(()=>{
//     resolve(undefined)
//   },1000)
// })
// let b = Promise.resolve(1)
// Promise.all([a,b]).then((res)=>{
//   console.log(res)
// })
