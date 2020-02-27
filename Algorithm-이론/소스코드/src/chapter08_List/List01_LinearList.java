package chapter08_List;



public class List01_LinearList {
    public static void main(String[] args) {
        PhoneBook[] books = {
            new PhoneBook(1,"Jang","010253"),
            new PhoneBook(2, "kim", "00132"),
            new PhoneBook(3, "Hong", "003321")
        };
    }
}


class PhoneBook{
    private int id;
    private String name;
    private String phoneNumber;

    PhoneBook(int id, String name, String phoneNumber){
        this.id = id;
        this.name = name;
        this.phoneNumber = phoneNumber;
    }
}