package chap06;
import java.util.Scanner;
// 셸정렬(버전2：h = …, 40, 13, 4, 1：요소의 옮김 횟수를 카운트)

class ShellSortEx2_06_09 {
	// 셸정렬(요소의 옮김 횟수를 반환)
	static int shellSort(int[] a, int n) {
		int count = 0; // 옮김 횟수
		int h;
		for (h = 1; h < n / 9; h = h * 3 + 1)
			;

		for (; h > 0; h /= 3)
			for (int i = h; i < n; i++) {
				int j;
				int tmp = a[i];
				for (j = i - h; j >= 0 && a[j] > tmp; j -= h) {
					a[j + h] = a[j];
					count++;
				}
				a[j + h] = tmp;
				count++;
			}
		return count;
	}

	public static void main(String[] args) {
		Scanner stdIn = new Scanner(System.in);

		System.out.println("셸정렬(버전 2) ");
		System.out.print("요솟수：");
		int nx = stdIn.nextInt();
		int[] x = new int[nx];

		for (int i = 0; i < nx; i++) {
			System.out.print("x[" + i + "]：");
			x[i] = stdIn.nextInt();
		}

		int count = shellSort(x, nx); // 배열 x를 셸정렬

		System.out.println("오름차순으로 정렬했습니다.");
		for (int i = 0; i < nx; i++)
			System.out.println("x[" + i + "]＝" + x[i]);
		System.out.println("요소의 옮김횟수는 " + count + "회입니다.");
	}
}