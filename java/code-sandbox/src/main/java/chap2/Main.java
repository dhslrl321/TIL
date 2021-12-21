package chap2;

import java.util.concurrent.Executor;
import java.util.concurrent.ExecutorService;

/**
 * synchronized
 */
public class Main {
    public static void main(String[] args) {
        Runnable ATM = new ATM();

        new Thread(ATM).start();
        new Thread(ATM).start();
    }
}

class Account {
    private int balance = 1000;

    public int getBalance() {
        return balance;
    }

    public void withdraw(int money) { // 임계 영역 처리
        if(balance >= money) {
            try {
                Thread.sleep(1000);
            } catch (Exception e) { }

            balance -= money;
        }
    }
}

class ATM implements Runnable {
    Account account = new Account();

    @Override
    public void run() {
        while(account.getBalance() > 0) {
            int money = 200;
            account.withdraw(money);

            System.out.println("balance : " + account.getBalance());
        }
    }
}
