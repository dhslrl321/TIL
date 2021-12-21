package chap3;

import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

/**
 * ThreadPool 과 ExecutorService
 */
public class Main {
    public static void main(String[] args) {
        ExecutorService executor = Executors.newFixedThreadPool(4);

        executor.submit(new FirstThread());
    }
}

class FirstThread extends Thread {
    @Override
    public void run() {
        System.out.printf("[ %s ] 스레드의 task 가 실행됨", Thread.currentThread().getName());
    }
}