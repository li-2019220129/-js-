let num = '1234567789'

function thousandth(num){
  return num.replace(/(?!^)(?=(\d{3})+$)/g,',')
}
console.log(thousandth(num))