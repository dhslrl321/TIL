package chap08;
import java.util.Scanner;
// Boyer-Moore법에 의한 문자열 검색 (조사과정을 자세히 나타냄)

class BMmatchEx_08_04 {
	static int bmMatch(String txt, String pat) {
		int pt; // txt를 따라가는 커서
		int pp; // pat를 따라가는 커서
		int txt_len = txt.length(); // txt의 문자수
		int pat_len = pat.length(); // pat의 문자수
		int[] skip = new int[Character.MAX_VALUE + 1]; // skip 테이블
		int count = 0; // 비교횟수
		int k = -1;

		// skip 테이블 만들기
		for (pt = 0; pt <= Character.MAX_VALUE; pt++)
			skip[pt] = pat_len;
		for (pt = 0; pt < pat_len - 1; pt++)
			skip[pat.charAt(pt)] = pat_len - pt - 1;
		// pt == pat_len - 1임.
		// 검색
		while (pt < txt_len) {
			pp = pat_len - 1; // pat의 마지막 문자에 주목

			if (k == pt - pp)
				System.out.print("    ");
			else {
				System.out.printf("%2d  ", pt - pp);
				k = pt - pp;
			}
			for (int i = 0; i < txt.length(); i++)
				System.out.print(txt.charAt(i) + " ");
			System.out.println();

			for (int i = 0; i < pt * 2 + 4; i++)
				System.out.print(" ");
			System.out.print(txt.charAt(pt) == pat.charAt(pp) ? '+' : '|');
			System.out.println();

			for (int i = 0; i < (pt - pp) * 2 + 4; i++)
				System.out.print(" ");

			for (int i = 0; i < pat.length(); i++)
				System.out.print(pat.charAt(i) + " ");
			System.out.println();
			System.out.println();
			count++;

			while (txt.charAt(pt) == pat.charAt(pp)) {

				if (pp == 0)
					return pt; // 검색성공
				pp--;
				pt--;
				if (k == pt - pp)
					System.out.print("    ");
				else {
					System.out.printf("%2d  ", pt - pp);
					k = pt - pp;
				}
				for (int i = 0; i < txt.length(); i++)
					System.out.print(txt.charAt(i) + " ");
				System.out.println();

				for (int i = 0; i < pt * 2 + 4; i++)
					System.out.print(" ");
				System.out.print(txt.charAt(pt) == pat.charAt(pp) ? '+' : '|');
				System.out.println();

				for (int i = 0; i < (pt - pp) * 2 + 4; i++)
					System.out.print(" ");

				for (int i = 0; i < pat.length(); i++)
					System.out.print(pat.charAt(i) + " ");
				System.out.println();
				System.out.println();
				count++;
			}
			pt += skip[txt.charAt(pt)];
		}
		return -1; // 검색실패
	}

	public static void main(String[] args) {
		Scanner stdIn = new Scanner(System.in);

		System.out.print("텍스트：");
		String s1 = stdIn.next(); // 텍스트용 문자열

		System.out.print("패턴：");
		String s2 = stdIn.next(); // 패턴용 문자열

		int idx = bmMatch(s1, s2); // 문자열 s1에서 문자열 s2를 BM법으로 검색

		if (idx == -1)
			System.out.println("텍스트에 패턴이 없습니다.");
		else {
			int len = 0;
			for (int i = 0; i < idx; i++)
				len += s1.substring(i, i + 1).getBytes().length;
			len += s2.length();

			System.out.println((idx + 1) + "번째 문자와 일치합니다.");
			System.out.println("텍스트：" + s1);
			System.out.printf(String.format("패턴：%%%ds\n", len), s2);
		}
	}
}
