package chapter05_Sort;

import java.util.Scanner;

public class Sort04_QuickSort {
    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);
        int[] arr = new int[input.nextInt()];
        for (int i = 0; i < arr.length; i++) {
            arr[i] = input.nextInt();
        }

        quickSort(arr);

        for(int i:arr) System.out.println(i);
    }

    private static void quickSort(int[] arr){
        quickSort(arr, 0, arr.length-1);
    }

    private static void quickSort(int[] arr, int start, int end){
        int part2 = partitioning(arr, start, end);
        if(start < part2 -1) quickSort(arr, start, part2 - 1);
        if(part2 < end) quickSort(arr, part2, end);
    }

    private static int partitioning(int[] arr, int start, int end){
        int pivot = arr[(start + end) / 2];
        while(start <= end){
            while(arr[start] < pivot) start++;
            while(arr[end] > pivot) end--;
            if(start <= end) {
                swap2(arr, start, end);
                start++;
                end--;
            }
        }
        return start;
    }

    private static void swap2(int[] arr, int idx1, int idx2){
        int temp = arr[idx1];
        arr[idx1] = arr[idx2];
        arr[idx2] = temp;
    }
}
