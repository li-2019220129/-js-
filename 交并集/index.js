let a = [1, 2, 3, 4, 5]
let b = [2, 4, 6]

// 交集和差集
function collection(a, b) {
  // let s = a.length>b.length?
  let set = new Set(a)
  return b.filter((item) => {
    return set.has(item)
  })
}
console.log(collection(a, b))
//并集
console.log([...new Set([...a, ...b])])
