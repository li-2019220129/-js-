let threshold = 16
function getmin(arr, a, b, c) {
  if (arr[a] > arr[b]) swap(arr, a, b)
  if (arr[a] > arr[c]) swap(arr, a, c)
  if (arr[b] > arr[c]) swap(arr, b, c)
  return arr[b]
}
function swap(arr, x, y) {
  return ([arr[x], arr[y]] = [arr[y], arr[x]])
}
function charupaix(arr, l, r) {
  while (r - l > threshold) {
    let x = l
    let y = r
    let base = getmin(arr, l, Math.floor((r - l) / 2), r)
    do {
      while (x < y && arr[x] < base) x++
      while (x < y && arr[y] > base) y--
      if (x <= y) {
        swap(arr, x, y)
        x++
        y--
      }
    } while (x <= y)
    charupaix(arr, x, r)
    r = y
  }
  return
}
function quiteSort(arr, l, r) {
  let idx = l
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] < arr[idx]) idx = i
  }
  swap(arr, idx, l)
  for (let i = l + 2; i < arr.length; i++) {
    let j = i
    while (arr[j] < arr[j - 1]) {
      swap(arr, j, j - 1)
      j--
    }
  }
}
let arr = [1, 0, 2, 1, 1, 2]
function lastSort(arr, l, r) {
  charupaix(arr, l, r)
  quiteSort(arr, l, r)
}
lastSort(arr, 0, arr.length - 1)
console.log(arr)

// function swap(arr, x, y) {
//   return ([arr[x], arr[y]] = [arr[y], arr[x]])
// }
// function getmin(arr, a, b, c) {
//   if (a > b) swap(arr, a, b)
//   if (a > c) swap(arr, a, c)
//   if (b > c) swap(arr, b, c)
//   return arr[b]
// }
// function quickSort1(a, l, r) {
//   while (l < r) {
//     let x = l
//     let y = r
//     let base = getmin(a, l, Math.floor((r - l) / 2), r)
//     do {
//       while (x < y && a[x] < base) x++
//       while (x < y && a[y] > base) y--
//       if (x <= y) {
//         swap(a, x, y)
//         x++
//         y--
//       }
//     } while (x <= y)
//     quickSort1(a, x, r)
//     r = y
//   }
// }
// var sortColors = function (nums) {
//   quickSort1(nums, 0, nums.length - 1)
//   return nums
// }
// console.log(sortColors([1, 0, 2, 1, 1, 2]))
