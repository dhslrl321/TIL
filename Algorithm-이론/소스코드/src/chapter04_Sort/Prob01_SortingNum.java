package chapter04_Sort;

import java.util.Scanner;
import java.util.Arrays;

public class Prob01_SortingNum {
    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);
        int testCase = input.nextInt();
        int[] arr = new int[testCase];
        for (int i = 0; i < testCase; i++) {
            arr[i] = input.nextInt();
        }

        Arrays.sort(arr);

        for(int i:arr) System.out.println(i);
    }
}


