const { reactive,isReactive,isReadonly } = require('./reactive')
const { effect, stop } = require('./effect')
let res = {
  a: 12,
  b: 45,
}

// let a = reactive(res)
// effect(() => {
//   console.log(a.a)
// })
// setTimeout(() => {
//   a.a = 78
// }, 2000)
let a = reactive(res)
// console.log(isReactive(a))
// console.log(isReadonly(a))
// let run
// const scheduler = ()=>{
//   console.log('2323')
//   run = running
// }
// const running = effect(
//   () => {
//     console.log(a.a,'90')
//   },
//   {
//     scheduler,
//   }
// )
const running = effect(() => {
  console.log(a.a)
})
// stop(running)
a.a++
a.a++
a.a++
running()
// const scheduler = () => {
//   console.log('21212')
//   run = running
// }

// running()
// run()
// console.log(a)
