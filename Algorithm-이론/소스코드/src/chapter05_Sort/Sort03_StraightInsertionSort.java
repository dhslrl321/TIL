package chapter05_Sort;

import java.util.Scanner;

public class Sort03_StraightInsertionSort {
    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);
        int n = input.nextInt();
        int[] arr = new int[n];

        for (int i = 0; i < n; i++) {
            arr[i] = input.nextInt();
        }

        for (int i = 0; i < arr.length; i++) {
            for (int j = i + 1; j < arr.length; j++) {

            }
        }

    }

    static void swap(int[] arr, int idx1, int idx2){
        int temp = idx1;
        arr[idx1] = arr[idx2];
        arr[idx2] = temp;
    }
}
