package chapter02_Stack;

public class Stack02_MyStack {
    public static void main(String[] args) {

    }
}

class MyStack {
    private int max;
    private int ptr;
    private int[] stack;

    public MyStack (int capacity){
        max = capacity;
        ptr = 0;
        stack = new int[max];
    }

    public class EmptyStackException extends RuntimeException {
        public EmptyStackException(){}

    }
    public class OverflowStackException extends RuntimeException {
        public OverflowStackException(){}
    }
}


