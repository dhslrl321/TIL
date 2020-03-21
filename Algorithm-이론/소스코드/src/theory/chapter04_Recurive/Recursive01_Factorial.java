package theory.chapter04_Recurive;

public class Recursive01_Factorial {
    public static void main(String[] args) {
        Recursive01 rec = new Recursive01();

        System.out.println(rec.factorial(9));
        System.out.println(rec.factorialNonR(9));
    }
}

class Recursive01 {
    int factorial(int num){
        if(num > 0) return num * factorial(num-1);
        else return 1;
    }

    int factorialNonR(int num){
        int ans = 1;
        for (int i = 1; i <= num; i++) {
            ans = ans * i;
        }

        return ans;
    }
}
