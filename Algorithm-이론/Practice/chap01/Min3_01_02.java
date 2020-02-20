package chap01;
import java.util.Scanner;
// 3개의 값의 최솟값을 구하여 출력

class Min3_01_02 {
   // a, b, c의 최솟값을 구하여 반환
   static int min3(int a, int b, int c) {
      int min = a;         			// 최솟값
      if (b < min) min = b;
      if (c < min) min = c;

      return min;
   }

   public static void main(String[] args) {
      Scanner stdIn = new Scanner(System.in);
      int a, b, c;

      System.out.println("세 정수의 최솟값을 구합니다.");
      System.out.print("a의 값：");  a = stdIn.nextInt();
      System.out.print("b의 값：");  b = stdIn.nextInt();
      System.out.print("c의 값：");  c = stdIn.nextInt();

      int min = min3(a, b, c);   	// a, b, c의 최솟값

      System.out.println("최솟값은 " + min + "입니다.");
   }
}