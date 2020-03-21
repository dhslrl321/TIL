package theory.chapter05_Sort;

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
        for (int i = 0; i < arr.length - 1; i++) {
            min = i;
            for (int j = i + 1; j < arr.length; j++) {
                if(arr[min] > arr[j]) min = j;
            }
            swap(arr, i, min);
        }
        for(int i : arr) System.out.println(i);
    }

    static void swap(int[] a, int idx1, int idx2){
        int temp = a[idx1];
        a[idx1] = a[idx2];
        a[idx2] = temp;
    }
}
