import java.util.*;

public class Test {
    public static void main(String[] args) {

        String[] arr = {"Hello", "world", "I'm", "Groot", "Say", "My", "Name"};

        Arrays.sort(arr, new Comparator<String>() {
            @Override
            public int compare(String o1, String o2) {
                return o2.length() - o1.length();
            }
        });

        for(String iter : arr) System.out.println(iter);

    }
}


