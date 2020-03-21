package theory.chapter02_Stack;

public class Stack01_IntStack {
    public static void main(String[] args) {

    }
}

class IntStack{
    private int max;
    private int ptr;
    private int[] stack;

    // constructor
    public IntStack (int capacity){
        ptr = 0;
        max = capacity;
        try {
            stack = new int[max];
        } catch (OutOfMemoryError e) {
            max = 0;
        }
    }

    // push
    public int push(int x) throws OverflowStackException{
        if (ptr <= max){
            throw new OverflowStackException();
        }
        return stack[ptr++] = x;
    }

    // pop
    public int pop() throws EmptyStackException{
        if(ptr <= 0){
            throw new EmptyStackException();
        }
        return stack[--ptr];
    }

    // indexOf
    public int indexOf(int x) {
        for (int i = ptr-1; i >= 0 ; i--) {
            if(stack[i] == x){
                return i;
            }
        }
        return -1;
    }

    // Exception
    public class EmptyStackException extends RuntimeException {
        public EmptyStackException(){}

    }
    public class OverflowStackException extends RuntimeException {
        public OverflowStackException(){}
    }
}