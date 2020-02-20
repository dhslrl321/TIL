package chap05;
import java.util.Scanner;
// 하노이의 탑(기둥 이름을 문자열로 나타냄)

class HanoiEx_05_06 {
	static String[] name = { "A기둥", "B기둥", "C기둥" };

	// 원반을 x기둥에서 y기둥으로 옮김
	static void move(int no, int x, int y) {
		if (no > 1)
			move(no - 1, x, 6 - x - y);

		System.out.println("원반[" + no + "]를 " + name[x - 1] + "에서 " + name[y - 1] + "으로 옮김");

		if (no > 1)
			move(no - 1, 6 - x - y, y);
	}

	public static void main(String[] args) {
		Scanner stdIn = new Scanner(System.in);

		System.out.println("하노이의 탑");
		System.out.print("원반의 갯수：");
		int n = stdIn.nextInt();

		move(n, 1, 3); // 1기둥에 쌓인 n개를 3기둥에 옮김
	}
}