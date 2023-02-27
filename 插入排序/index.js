// 插入排序的思路看似好理解却也有点绕，这里不解释因为不难理解
function insertSort(arr) {
  let length = arr.length
  for (let i = 1; i < length; i++) {
    let temp = arr[i]
    let j = i
    for (; j > 0; j--) {
      if (temp > arr[j - 1]) {
        break
      }
      arr[j] = arr[j - 1]
    }
    arr[j] = temp
  }
}
let arr = [12, 12, 1, 5, 2, 2, 67, 43]
insertSort(arr)
console.log(arr)
