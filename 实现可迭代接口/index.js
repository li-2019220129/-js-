// const obj = {
//   name: 12,
//   age: 45,
//   [Symbol.iterator]: function* () {
//     let obj = this
//     let ans = Object.keys(obj)
//     // let count = 0
//     // return {
//     //   next(){
//     //     return {
//     //       value:count>ans.length-1?undefined:obj[ans[count]],
//     //       done:count++>ans.length-1
//     //     }
//     //   }
//     // }
//     for (let key of ans) {
//       yield obj[key]
//     }
//   },
// }
// let fn = obj[Symbol.iterator]()
// // console.log(fn.next())
// // console.log(fn.next())
// // console.log(fn.next())
// for (let key of obj) {
//   console.log(key)
// }

let obj1 = {
  name: 12,
  age: 45,
  [Symbol.iterator]: function *() {
    let obj = this
    let arr = Object.keys(obj)
    for(let k of arr){
      yield obj[k]
    }
  },
}
for (let j of obj1) {
  console.log(j)
}
