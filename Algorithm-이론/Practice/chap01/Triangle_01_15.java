package chap01;
import java.util.Scanner;
// 4가지의 직각삼각형 모양으로 나타냄

public class Triangle_01_15 {
	// 왼쪽 아래가 직각인 이등변삼각형을 출력
	static void triangleLB(int n) {
		for (int i = 1; i <= n; i++) { 				// i행 (i = 1, 2, … ,n)
			for (int j = 1; j <= i; j++) 			// i개의 '*'를 나타냄
				System.out.print('*');
			System.out.println(); 					// 개행(줄변환)
		}
	}

	// 왼쪽 위가 직각인 이등변삼각형을 출력
	static void triangleLU(int n) {
		for (int i = 1; i <= n; i++) { 				// i행 (i = 1, 2, … ,n)
			for (int j = 1; j <= n - i + 1; j++) 	// n-i+1개의 '*'를 나타냄
				System.out.print('*');
			System.out.println(); 					// 개행(줄변환)
		}
	}

	// 오른쪽 위가 직각인 이등변삼각형을 출력
	static void triangleRU(int n) {
		for (int i = 1; i <= n; i++) { 				// i행 (i = 1, 2, … ,n)
			for (int j = 1; j <= i - 1; j++) 		// i-1개의 ' '를 나타냄
				System.out.print(' ');
			for (int j = 1; j <= n - i + 1; j++) 	// n-i+1개의 '*'를 나타냄
				System.out.print('*');
			System.out.println();					// 개행(줄변환)
		}
	}

	// 오른쪽 아래가 직각인 이등변삼각형을 출력
	static void triangleRB(int n) {
		for (int i = 1; i <= n; i++) { 				// i행 (i = 1, 2, … ,ln)
			for (int j = 1; j <= n - i; j++) 		// n-i개의 ' '를 나타냄
				System.out.print(' ');
			for (int j = 1; j <= i; j++) 			// i개의 '*'를 나타냄
				System.out.print('*');
			System.out.println(); 					// 개행(줄변환)
		}
	}

	public static void main(String[] args) {
		Scanner stdIn = new Scanner(System.in);
		int n;

		System.out.println("삼각형 모양으로 나타냅니다.");

		do {
			System.out.print("단수는 ：");
			n = stdIn.nextInt();
		} while (n <= 0);

		System.out.println("왼쪽 아래가 직각인 삼각형");
		triangleLB(n); // 왼쪽 아래가 직각인 이등변삼각형

		System.out.println("왼쪽 위가 직각인 삼각형");
		triangleLU(n); // 왼쪽 위가 직각인 이등변삼각형

		System.out.println("오른쪽 위가 직각인 삼각형");
		triangleRU(n); // 오른쪽 위가 직각인 이등변삼각형

		System.out.println("오른쪽 아래가 직각인 삼각형");
		triangleRB(n); // 오른쪽 아래가 직각인 이등변삼각형
	}
}
