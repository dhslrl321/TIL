package theory.chapter01_Search.search01_LinearSearch;

import java.util.Scanner;

public class Search02_Linear_Sentry {
    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);

        int num = input.nextInt(); // 요솟 수
        int[] x = new int[num+1];

        for (int i = 0; i < num; i++) {
            x[i] = input.nextInt();
        }

        int key = input.nextInt();

        int ans = Sentry.sentry(x, num, key);
        if(ans == -1) System.out.println("요소가 존재하지 않습니다.");
        else System.out.println(key+"는" + "arr[" + ans +"] 에 있습니다.");
    }
}

class Sentry {
    static int sentry(int[] arr, int num, int key){
        int i = 0;
        arr[num] = key;

        while(true) {
            if(arr[i] == key) break;
            i++;
        }

        return i == num ? -1 : i;
    }
}