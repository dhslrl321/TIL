package chap07;

public class IntSortedSet_07_05 {
	private int max; // 집합의 용량
	private int num; // 집합의 요솟수
	private int[] set; // 집합본체

	// 생성자
	public IntSortedSet_07_05(int capacity) {
		num = 0;
		max = capacity;
		try {
			set = new int[max]; // 집합본체용 배열을 생성
		} catch (OutOfMemoryError e) { // 배열의 생성에 실패
			max = 0;
		}
	}

	// 집합에서 n을 검색하여 index를 반환
	// 찾지 못한 경우 (-삽입 포인트-1)를 반환
	public int indexOf(int n) {
		int pl = 0; // 검색범위 맨 앞의 index
		int pr = n - 1; // 〃 맨 뒤의 index

		do {
			int pc = (pl + pr) / 2; // 중앙요소의 index
			if (set[pc] == n)
				return pc; // 검색성공
			else if (set[pc] < n)
				pl = pc + 1; // 검색범위를 앞쪽 절반으로 좁힘
			else
				pr = pc - 1; // 검색범위를 뒤쪽 절반으로 좁힘
		} while (pl <= pr);

		return -pl - 1; // 검색실패
	}

	// 집합에 n이 들어있나요?
	public boolean contains(int n) {
		return (indexOf(n) >= 0) ? true : false;
	}

	// 집합에 n을 추가
	public boolean add(int n) {
		int idx;
		if (num >= max || (idx = indexOf(n)) >= 0) // 가득 참 또는 들어 있음.
			return false;
		else {
			idx = -(idx + 1);
			num++;
			for (int i = num - 1; i > idx; i--)
				set[i] = set[i - 1];
			set[idx] = n;
			return true;
		}
	}

	// 집합에서 n을 삭제
	public boolean remove(int n) {
		int idx; // n이 저장된 요소의 index

		if (num <= 0 || (idx = indexOf(n)) == -1) // 비어 있음 또는 들어있지 않음
			return false;
		else {
			num--;
			for (int i = idx; i < num; i++) // set[idx]를 삭제하고
				set[i] = set[i + 1]; // 그 다음 요소를 한 칸 앞으로 옮김
			return true;
		}
	}

	// 집합의 용량
	public int capacity() {
		return max;
	}

	// - 집합의 요솟수
	public int size() {
		return num;
	}

	// 집합 s에 복사(s ← this)
	public void copyTo(IntSortedSet_07_05 s) {
		int n = (s.max < num) ? s.max : num; // 복사하는 요솟수
		for (int i = 0; i < n; i++)
			s.set[i] = set[i];
		s.num = n;
	}

	// 집합 s를 copy(this ← s)
	public void copyFrom(IntSortedSet_07_05 s) {
		int n = (max < s.num) ? max : s.num; // copy하는 요솟수
		for (int i = 0; i < n; i++)
			set[i] = s.set[i];
		num = n;
	}

	// 집합 s와 같은가?
	public boolean equals(IntSortedSet_07_05 s) {
		if (num != s.num) // 요솟수가 같지 않으면
			return false; // 집합도 같지 않습니다

		for (int i = 0; i < num; i++)
			if (set[i] == s.set[i])
				return false;
		return true;
	}

	// 집합 s1과 s2의 합집합을 복사
	public void unionOf(IntSortedSet_07_05 s1, IntSortedSet_07_05 s2) {
		copyFrom(s1); // 집합 s1을 copy
		for (int i = 0; i < s2.num; i++) // 집합 s2의 요소를 추가
			add(s2.set[i]);
	}

	// "{ a b c }" 형식의 문자열 보기로 변환
	public String toString() {
		StringBuffer temp = new StringBuffer("{ ");
		for (int i = 0; i < num; i++)
			temp.append(set[i] + " ");
		temp.append("}");
		return temp.toString();
	}

	// 집합이 비어 있는가?
	public boolean isEmpty() {
		return num == 0;
	}

	// 집합이 가득 찼는가?
	public boolean isFull() {
		return num >= max;
	}

	// 집합을 비움(모든 요소를 삭제)
	public void clear() {
		num = 0;
	}

	// 집합 s와 합집합
	public boolean add(IntSortedSet_07_05 s) {
		boolean flag = false;
		for (int i = 0; i < s.num; i++)
			if (add(s.set[i]) == true)
				flag = true;
		return flag;
	}

	// 집합 s와 교집합
	public boolean retain(IntSortedSet_07_05 s) {
		boolean flag = false;
		for (int i = 0; i < num; i++)
			if (s.contains(set[i]) == false) {
				remove(set[i]);
				flag = true;
			}
		return flag;
	}

	// 집합 s와 차집합
	public boolean remove(IntSortedSet_07_05 s) {
		boolean flag = false;
		for (int i = 0; i < num; i++)
			if (s.contains(set[i]) == true) {
				remove(set[i]);
				flag = true;
			}
		return flag;
	}

	// 집합 s의 부분집합인가요?
	public boolean isSubsetOf(IntSortedSet_07_05 s) {
		for (int i = 0; i < num; i++) {
			int j = 0;
			for (; j < s.num; j++)
				if (set[i] == s.set[j])
					break;
			if (j == s.num) // set[i]는 s에 포함되지 않음
				return false;
		}
		return true;
	}

	// 집합 s의 진부분집합인가요?
	public boolean isProperSubsetOf(IntSortedSet_07_05 s) {
		if (num >= s.num) // 요솟수가 s 이상이면
			return false; // s의 진부분집합이 아님
		return s.isSubsetOf(s);
	}

	// 집합 s1과 s2의 교집합을 복사
	public void intersectionOf(IntSortedSet_07_05 s1, IntSortedSet_07_05 s2) {
		clear();
		for (int i = 0; i < s1.num; i++)
			if (s2.contains(s1.set[i]))
				add(s1.set[i]);
	}

	// 집합 s1과 s2의 차집합을 복사
	public void differenceOf(IntSortedSet_07_05 s1, IntSortedSet_07_05 s2) {
		clear();
		for (int i = 0; i < s1.num; i++)
			if (!s2.contains(s1.set[i]))
				add(s1.set[i]);
	}
}