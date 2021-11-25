public class Wonit {
  public static void main(String[] args) {
    String name = "워닉";
    int age = 25;

    Person blogger = new Person(name, age);

    blogger.print();
  }
}

class Person {
  String name;
  int age;

  Person(String name, int age) {
    this.name = name;
    this.age = age;
  }

  void print() {
    System.out.println("블로그 주인의 이름은 " + name + " 이며 나이는 " + age + " 이다");
  }
}