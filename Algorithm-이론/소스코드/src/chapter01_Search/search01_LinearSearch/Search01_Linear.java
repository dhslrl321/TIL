package chapter01_Search.search01_LinearSearch;

public class Search01_Linear {
    public static void main(String[] args) {
        int[] arr = {1, 2, 3, 5, 9, 23}; // 입력 배열
        int size = arr.length; // 배열의 크기
        int key = 23; // 찾는 값

        int ans = SeqSearch.seqSearch(arr, size, key);

        if (ans == -1) { //종료 조건 02
            System.out.println("Cannot Find Key");
        } else { // 종료 조건 01
            System.out.println("key's index is : "+ ans); // key 값을 가지고 있는 인덱스
            System.out.println("Index's value : " + arr[ans]); // 인덱스의 값
        }
    }
}

class SeqSearch {
    static int seqSearch(int[] arr, int num, int key){
        int i = 0; // 배열의 위치를 알려주는 포인터
        while(true){
            if(arr[i] == key) return i; // 종료 조건 1 : i가 증가하다 값을 해당 i에 값이 key와 같다면 인덱스를 반환
            if(i == num) return -1; // 종료 조건 2 : i가 배열의 끝(num) 에 도달하였지만 찾지 못 하였을 경우 -1을 반환
            i++;
        }
    }
}