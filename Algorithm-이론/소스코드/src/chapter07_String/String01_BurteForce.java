package chapter07_String;

public class String01_BurteForce {
    public static void main(String[] args) {
        String str = "hello";
        String pt = "el";
        System.out.println(bfMatch(str, pt));

    }

    static int bfMatch(String text, String pattern) {
        int pt = 0; //txt 커서
        int pp = 0; //pat 커서

        while (pt != text.length() && pp != pattern.length()) {
            if (text.charAt(pt) == pattern.charAt(pp)) {
                pt++;
                pp++;
            } else {
                pt = pt - pp + 1;
                pp = 0;
            }
        }

        if (pp == pattern.length()) {
            return pt - pp; //success
        }
        return -1; // failed
    }
}
