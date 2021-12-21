package chap1;

/**
 * Thread 기초
 */
public class Main {
    public static void main(String[] args) {

        long startTime = System.currentTimeMillis();

        for (int i = 1; i <= 500; i++) {
            System.out.print("○");
            if(i % 50 == 0) System.out.println();
        }
        System.out.println("1번 작업 실행 소요시간 : [" + (System.currentTimeMillis() - startTime) + "]");

        for (int i = 1; i <= 500; i++) {
            System.out.print("●");
            if(i % 50 == 0) System.out.println();
        }
        System.out.println("2번 작업 실행 소요시간 : [" + (System.currentTimeMillis() - startTime) + "]");
    }
}


