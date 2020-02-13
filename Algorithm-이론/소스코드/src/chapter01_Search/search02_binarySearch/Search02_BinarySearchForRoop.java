package chapter01_Search.search02_binarySearch;

import java.util.Scanner;

public class Test {
    public static void main(String[] args) {
        int[] arr = {1, 3, 5, 7, 9, 10, 11, 12, 13};
        int key = 11;
        int size = arr.length;

        int ans = Binary.binary(arr, size, key);

        if (ans == -1) {
            System.out.println("찾으려는 키 값이 배열에 존재하지 않습니다.");
        } else{
            System.out.println("키 : " + key + "의 인덱스는 " + ans + " 으로");
            System.out.println("찾으려는 값이 배열에 존재합니다.");
        }

    }
}

class Binary {
    static int binary(int[] arr, int size, int key){
        int start = 0;
        int end = size;

        for (int i = 0; i < size; i++) {
            int center = (start + end) / 2;

            if(arr[center] == key){
                return center;
            }else if (arr[center] < key){
                start = center + 1;
            }else {
                end = center - 1;
            }
        }

        return  -1;
    }
}