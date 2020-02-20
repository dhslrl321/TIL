package chap06;
import java.util.Scanner;

class InsertionSortCen_06_07 {
	// 단순삽입정렬(보초법：배열의 머리요소는 비어있습니다.)
	static void insertionSort(int[] a, int n) {
		for (int i = 2; i < n; i++) {
			int tmp = a[0] = a[i];
			int j = i;
			for (; a[j - 1] > tmp; j--)
				a[j] = a[j - 1];
			if (j > 0)
				a[j] = tmp;
		}
	}

	public static void main(String[] args) {
		Scanner stdIn = new Scanner(System.in);

		System.out.println("단순삽입정렬 ");
		System.out.print("요솟수：");
		int nx = stdIn.nextInt();
		int[] x = new int[nx + 1]; // 1개 여분으로 생성

		for (int i = 1; i <= nx; i++) { // x[1]~x[nx]에 읽어 들임
			System.out.print("x[" + i + "]：");
			x[i] = stdIn.nextInt();
		}

		insertionSort(x, nx + 1); // 배열 x를 단순삽입정렬

		System.out.println("오름차순으로 정렬했습니다.");
		for (int i = 1; i <= nx; i++)
			System.out.println("x[" + i + "]＝" + x[i]);
	}
}