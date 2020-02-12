package chapter01_Search.search02_binarySearch;

import java.util.Scanner;
import java.util.Arrays;
public class Test {
    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);

        System.out.println("Array Size : ");
        int size = input.nextInt():

        System.out.println("input the array index's value");
        int[] arr = new int[size];
        
        for (int i = 0; i < arr.length; i++) {
            System.out.println(i+" 번째 배열 값을 입력하세요");
            arr[i] = input.nextInt();
        }

        System.out.println("Key value is : ");
        int key = input.nextInt();

        System.out.println("key index is : " + Binary.binary(arr, size, key));
    }
}

class Binary {
    static int binary(int[] arr, int size, int key){
        
        Arrays.sort(arr);

        for (int i = 0; i < ; i++) {
            
        }
        
        return 0;
    }
}
