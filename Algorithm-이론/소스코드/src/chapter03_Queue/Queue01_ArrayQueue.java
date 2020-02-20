package chapter03_Queue;

public class Queue01_ArrayQueue {
    public static void main(String[] args) {

    }
}

class IntQueue{

    private int front, rear, max, comp;
    private int[] queue;

    IntQueue(int capacity){
        front = 0;
        rear = 0;
        comp = 0;
        max = capacity;
        queue = new int[max];
    }

    public void enqueue(int x){
        if (rear >= max) throw new ArrayIndexOutOfBoundsException();
        else queue[rear++] = x;
    }

    public void dequeue() {
        if (front < 0) throw new RuntimeException();

        /*else {
            comp = rear;
            while (comp == front) {
                return 0;
            }
        }*/
    }
}

