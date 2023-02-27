//每次循环最大的都会放到最后，所以要啊a.length-1-i,因为一次循环已经找到最大的放到最后了所以最后一个不参与。
function sort(a) {
  for (let i = 0; i < a.length; i++) {
    for (let j = 0; j < a.length - 1 - i; j++) {
      if (a[j] > a[j + 1]) {
        let temp = a[j]
        a[j] = a[j + 1]
        a[j + 1] = temp
      }
    }
  }
}
let arr = [45, 54, 11, 23, 656, 11, 34, 5, 67]
sort(arr)
console.log(arr)
