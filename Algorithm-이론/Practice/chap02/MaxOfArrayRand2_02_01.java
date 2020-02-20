package chap02;
import java.util.Random;
// 배열의 요소의 최댓값을 출력  (요솟수와 값을 난수로 생성)

class MaxOfArrayRand2_02_01 {
	// 배열 a의 최댓값을 구하여 반환
	static int maxOf(int[] a) {
      int max = a[0];
      for (int i = 1; i < a.length; i++)
         if (a[i] > max)
            max = a[i];
      return max;
   }

	public static void main(String[] args) {
      Random rand = new Random();

      System.out.println("키의 최댓값을 구합니다.");
      int num = 1 + rand.nextInt(20);      // 사람 수를 1~20의 난수로 생성하는
      int[] height = new int[num];         // 요솟수 num인 배열을 생성

      System.out.println("사람수는 " + num + "명입니다.");
      System.out.println("키는 아래처럼 됩니다.");
      for (int i = 0; i < num; i++) {
         height[i] = 100 + rand.nextInt(90);      // 요솟값을 난수로 결정
         System.out.println("height[" + i + "]：" + height[i]);
      }

      System.out.println("최댓값은 " + maxOf(height) + "입니다.");
   }
}
