package chap3;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;

/**
 * ExecutorService 와 Future
 */
public class Main2 {
    public static void main(String[] args) throws Exception {
        ExecutorService executor = Executors.newFixedThreadPool(4);
        List<Future<String>> futures = new ArrayList<>(); // 결과

        for (int i = 0; i < 10; i++) {
            Future<String> future = executor.submit(
                    () -> "[" + Thread.currentThread().getName() + "] 의 작업");
            futures.add(future);
        }

        for (Future<String> future : futures) {
            String s = future.get();
            System.out.println("s = " + s);
        }
    }
}
