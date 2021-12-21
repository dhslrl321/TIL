package chap1;

public class SingleVsMulti2 {

    static long startTime = System.currentTimeMillis();

    public static void main(String[] args) {
        FirstThread thread = new FirstThread();
        thread.start();
        for (int i = 1; i <= 500; i++) {
            System.out.print("○");
            if(i % 50 == 0) System.out.println();
        }
        System.out.println("1번 작업 실행 소요시간 : [" + (System.currentTimeMillis() - startTime) + "]");
    }
}

class FirstThread extends Thread {

    private long startTime = System.currentTimeMillis();

    @Override
    public void run() {
        for (int i = 1; i <= 500; i++) {
            System.out.print("●");
            if(i % 50 == 0) System.out.println();
        }
        System.out.printf("2번 작업 (%s) 실행 소요시간 [%d]", Thread.currentThread().getName(), (System.currentTimeMillis() - startTime));
    }
}

class FirstT extends Thread {

}

class SecondThread implements Runnable {
    @Override
    public void run() {
        // logic
    }
}