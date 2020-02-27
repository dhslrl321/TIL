package chapter08_List;

public class List02_LinkedList {
    public static void main(String[] args) {


    }
}

class LinkedList_Node<E>{
    private E data;
    private LinkedList_Node<E> next;

    LinkedList_Node(E data, LinkedList_Node<E> next){
        this.data = data;
        this.next = next;
    }
}

