package chapter03_Queue;

public class Queue01_ArrayQueue {
    public static void main(String[] args) {

    }
}

class IntQueue{

    private int front;
    private int rear;
    private int max;
    private int[] queue;

    public IntQueue(int capacity){
        max = capacity;
        rear = -1;
        front = 0;
        queue = new int[max];
    }
    boolean empty(){
        return (front == (rear+1));
    }

    boolean full(){
        return (rear >= max-1);
    }

    // rear로 데이터를 추가
    void add(int x){
        if(full()) throw new ArrayIndexOutOfBoundsException();
        queue[++rear] = x;
    }
    // front는 데이터를 뺼 때만 사용
    int remove(){
        if (empty()) throw new ArrayIndexOutOfBoundsException();
        return queue[front++];
    }

    int peek(){
        return queue[front];
    }

}

