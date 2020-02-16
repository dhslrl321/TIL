package chapter03_Queue;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.Queue;

public class Queue03_QueueAPI {
    public static void main(String[] args) {
        Queue<Integer> queue = new LinkedList<>();

        queue.add(10);
        queue.add(20);

        System.out.println(queue);
        System.out.println(queue.peek());
        System.out.println(queue);
        System.out.println(queue.remove());

    }
}
