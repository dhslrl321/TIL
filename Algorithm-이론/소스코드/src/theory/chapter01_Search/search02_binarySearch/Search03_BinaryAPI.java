package theory.chapter01_Search.search02_binarySearch;

import java.util.Arrays;

public class Search03_BinaryAPI {
    public static void main(String[] args) {
        // Integer
        int[] arr = {9, 12, 13, 14, 15, 1, 2, 3, 4, 6, 7, 8};
        int integerKey = 10;

        // String
        String[] group = {
                "jang won ik", "hong dae ho", "kim in jik",
                "jung dae ho", "kim min ki", "song yu jin",
                "min a young", "jang sung kyu", "minimisang"
        };
        Arrays.sort(group);
        System.out.println(Arrays.binarySearch(group, "kim min ki"));
    }
}

class IntegerSort {
    static int integerSort(int[] arr, int key){

        Arrays.sort(arr);
        int ans = Arrays.binarySearch(arr, 9);

        System.out.println(ans);
        return ans;
    }
}

class StringSort{

}