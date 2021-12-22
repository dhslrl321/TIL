package chap3;

import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.TimeUnit;

/**
 * ThreadPool 과 ExecutorService
 */
public class Main {
    public static void main(String[] args) {
        ExecutorService executor = Executors.newFixedThreadPool(4);

        executor.submit(new FirstThread());
        executor.submit(() -> {
            System.out.printf("[ %s ] 스레드의 task 가 실행됨\n", Thread.currentThread().getName());
        });

        executor.submit(() -> {
            System.out.printf("[ %s ] 스레드의 task 가 실행됨\n", Thread.currentThread().getName());
        });

        executor.submit(() -> {
            System.out.printf("[ %s ] 스레드의 task 가 실행됨\n", Thread.currentThread().getName());
        });

        executor.submit(() -> {
            System.out.printf("[ %s ] 스레드의 task 가 실행됨\n", Thread.currentThread().getName());
        });

        executor.shutdown();
    }
}

class FirstThread implements Runnable {
    @Override
    public void run() {
        System.out.printf("[ %s ] 스레드의 task 가 실행됨\n", Thread.currentThread().getName());
    }
}