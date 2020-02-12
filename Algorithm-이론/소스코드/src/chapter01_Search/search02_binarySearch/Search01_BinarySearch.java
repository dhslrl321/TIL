package chapter01_Search.search02_binarySearch;

import java.util.Scanner;

public class Search01_BinarySearch {
    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);

        int[] arr = {1, 3, 5, 6, 8, 9};
        int size = arr.length;
        int key = 10;

        int ans = BinarySearch.binarySearch(arr, size, key);



    }
}

class BinarySearch {
    static int binarySearch(int[] arr, int n, int key) {
        int start = 0; // 배열의 시작 (검색 범위의 시작)
        int end = n - 1; // 배열의 끝 (검색 범위의 끝)

        do {
            int center = (end - start) / 2; //배열의 중간 (검색 범위의 중간)
            if (arr[center] == key) // 배열 중간의 원소 값이 찾으려는 값 일 때.
                return center;
            else if (arr[center] < key) // 배열 중간 원소의 값이 찾으려는 값보다 작을 때
                start = center + 1;
            else // 배열 중간 원소의 값이 찾으려는 값 보다 클 때
                end = center - 1;
        } while (start <= end);

        return -1; // 검색이 실패한 경우 ( 검색 범위의 시작과 끝이 같아지는 순간 종료료
    }
}

