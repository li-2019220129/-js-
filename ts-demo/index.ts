interface asuns{
  str: string,
  run(num:number):number
}
class Person implements asuns{
  protected name:string
  private age:number
  str:string
  constructor(name,age,str){
    this.name = name
    this.age = age
    this.str = str
  }
  run(num: number): number {
    return 12
  }
}

class student extends Person{
  constructor(name,age){
    super(name,age)
    console.log(this.name)
  }
}
console.log(new student('qw',12))

export{}

