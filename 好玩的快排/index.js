// 思路的话很有意思,首先从后遍历，
//找到比基准值小的那个，然后替换之前的无效位置,然后当前位置无效可以替换了,
//也就是y值这个位置，然后前面遍历，找到大于基准值的位置，然后把当前值替换为y值那个位置，
//因为那个位置的值之前已经给了前面所以可以替换，如果前面没有，则基准值替换
function quickSort(a,l,r){
  if(l>r) return
  let x = l,y= r
  let base = a[l]
  while(x<y){
    while(x<y&&a[y]>base) y--
    if(x<y) a[x++] = a[y]
    while(x<y&&a[x]<base) x++
    if(x<y) a[y--] = a[x]
  }
  a[x] = base
  quickSort(a,x+1,r)
  quickSort(a,l,x-1)
}
// function quickSort(a, l, r) {
//   if (l >= r) return
//   let x = l
//   let y = r
//   let base = a[l]
//   while (x < y) {
//     while (x < y && a[y] >= base) y--
//     if (x < y) a[x++] = a[y]
//     while (x < y && a[x] < base) x++
//     if (x < y) a[y--] = a[x]
//   }
//   a[x] = base
//   quickSort(a, x + 1, r)
//   quickSort(a, l, x - 1)
// }

// function quickSort1(a, l, r) {
//   while (l < r) {
//     let x = l
//     let y = r
//     let base = a[l]
//     while (x < y) {
//       while (x < y && a[y] >= base) y--
//       if (x < y) a[x++] = a[y]
//       while (x < y && a[x] < base) x++
//       if (x < y) a[y--] = a[x]
//     }
//     a[x] = base
//     quickSort(a, x + 1, r)
//     r = x - 1
//   }
// }
let arr = [12, 1, 5, 2, 67, 43,5,5,2]
quickSort(arr, 0, arr.length - 1)
console.log(arr)
