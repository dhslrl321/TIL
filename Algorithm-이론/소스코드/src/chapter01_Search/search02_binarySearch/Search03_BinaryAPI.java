package chapter01_Search.search02_binarySearch;

import java.util.Arrays;

public class Search03_BinaryAPI {
    public static void main(String[] args) {
        int[] arr = {9, 12, 13, 14, 15, 1, 2, 3, 4, 6, 7, 8};
        Arrays.sort(arr);
        int ans = Arrays.binarySearch(arr, 9);

        System.out.println(ans);
    }
}


