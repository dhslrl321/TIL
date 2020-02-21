package chapter05_Sort;

import java.util.Scanner;

public class Sort02_StraightSelectionSort {
    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);

        int n = input.nextInt();
        int[] arr = new int[n];
        int temp, index = 0, min;
        for (int i = 0; i < n; i++) {
            arr[i] = input.nextInt();
        }
        min = arr[0];
        for (int i = 0; i < arr.length; i++) {
            for (int j = i; j < arr.length; j++) {
                if(min > arr[j]) {
                    min = arr[j];
                    index = i;
                }
            }
            temp = arr[i];
            arr[i] = min;
            arr[index] = temp;
        }
        for(int i : arr) System.out.println(i);
    }
}
