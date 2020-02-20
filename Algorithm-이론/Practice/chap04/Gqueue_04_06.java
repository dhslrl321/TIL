package chap04;

public class Gqueue_04_06<E> {
	// 실행할 때 예외：큐가 비어 있음
	public static class EmptyGqueueException extends RuntimeException {
		public EmptyGqueueException() {
		}
	}

	// 실행할 때 예외：큐가 가득 참
	public static class OverflowGqueueException extends RuntimeException {
		public OverflowGqueueException() {
		}
	}

	private int max; // 큐의 용량
	private int num; // 현재의 데이터 수
	private int front; // 맨 앞 커서
	private int rear; // 맨 뒤 커서
	private E[] que; // 큐의 본체

	// 생성자
	public Gqueue_04_06(int capacity) {
		num = front = rear = 0;
		max = capacity;
		try {
			que = (E[]) new Object[max]; // 큐 본체용 배열을 생성
		} catch (OutOfMemoryError e) {   // 생성할 수 없습니다.
			max = 0;
		}
	}

	// 큐에 데이터를 인큐
	public E enque(E x) throws OverflowGqueueException {
		if (num >= max)
			throw new OverflowGqueueException(); // 큐가 가득 참
		que[rear++] = x;
		num++;
		if (rear == max)
			rear = 0;
		return x;
	}

	// 큐에서 데이터를 디큐
	public E deque() throws EmptyGqueueException {
		if (num <= 0)
			throw new EmptyGqueueException(); // 큐가 비어 있음
		E x = que[front++];
		num--;
		if (front == max)
			front = 0;
		return x;
	}

	// 큐에서 데이터를 피크(머리데이터를 살펴봄)
	public E peek() throws EmptyGqueueException {
		if (num <= 0)
			throw new EmptyGqueueException(); // 큐가 비어 있음
		return que[front];
	}

	// 큐에서 x를 검색하여 index(찾지 못하면 -1)를 반환
	public int indexOf(E x) {
		for (int i = 0; i < num; i++)
			if (que[(i + front) % max] == x) // 검색성공
				return i + front;
		return -1; // 검색실패
	}

	// 큐에서 x를 검색하여 머리부터 몇 번 째인가(찾지 못하면 -1)를 반환
	public int search(E x) {
	      for (int i = 0; i < num; i++)
	         if (que[(i + front) % max].equals(x))   // 검색 성공
	            return i + 1;
	      return -1;                            	 // 검색 실패
	}

	// 큐를 비움
	public void clear() {
		num = front = rear = 0;
	}

	// 큐의 용량을 반환
	public int capacity() {
		return max;
	}

	// 큐에 쌓인 데이터 수를 반환
	public int size() {
		return num;
	}

	// 큐가 비어 있는가?
	public boolean isEmpty() {
		return num <= 0;
	}

	// 큐가 가득 찼는가?
	public boolean isFull() {
		return num >= max;
	}

	// 큐 안의 데이터를 머리→꼬리의 차례로 나타냄
	public void dump() {
		if (num <= 0)
			System.out.println("큐가 비었습니다.");
		else {
			for (int i = 0; i < num; i++)
				System.out.print(que[(i + front) % max].toString() + " ");
			System.out.println();
		}
	}
}
