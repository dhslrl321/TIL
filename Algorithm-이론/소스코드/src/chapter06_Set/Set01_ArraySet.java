package chapter06_Set;

public class Set01_ArraySet {
    public static void main(String[] args) {

    }
}

class MyArraySet {
    private int max; // 집합의 최대 개수
    private int num; // 집합 요소의 개수
    private int[] set; // 집합 본체

    MyArraySet (int capacity) {
        num = 0;
        max = capacity;
        set = new int[max];
    }

    int capacity(){
        return max;
    }

    int size(){
        return num;
    }

    int indexOf(int n){
        for (int i = 0; i < max; i++) {
            if(set[i] == n) return i;
        }
        return -1;
    }

    boolean contains(int n){
        return indexOf(n) != -1;
    }

    boolean add (int x) {
        if (num >= max || contains(x)) return false;
        else set[num++] = x;
        return true;
    }

    boolean remove(int n) {
        int idx = num;
        return true;
    }
}
