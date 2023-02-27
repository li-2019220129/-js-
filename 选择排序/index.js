// function sort(a){
//   for(let i=0;i<a.length;i++){
//     minindex = i
//     for(let j=i+1;j<a.length;j++){
//       if(a[j]<a[minindex]){
//         minindex= j
//       }
//     }
//     let temp = a[i]
//     a[i] = a[minindex]
//     a[minindex] = temp
//   }
// }

function sort(a) {
  for (let i = 0; i < a.length; i++) {
    for (let j = i + 1; j < a.length; j++) {
      if (a[j] < a[i]) {
        let temp = a[i]
        a[i] = a[j]
        a[j] = temp
      }
    }
  }
}
// let res = [233,43,12,3,1,34,4545,11,3233,5,65]
let res = [233, 43, 12, 3, 34, 4545, 11, 3233, 5, 65]

sort(res)
console.log(res)
