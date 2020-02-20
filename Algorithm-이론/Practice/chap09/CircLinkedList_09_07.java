package chap09;
import java.util.Comparator;
// 연결 리스트 클래스  (원형 리스트 버전)

public class CircLinkedList_09_07<E> {
	// 노드
	class Node<E> {
		E data; // 데이터
		Node<E> next; // 뒤쪽포인터(다음 노드에 대한 참조)

		// 생성자
		Node(E data) {
			this.data = data;
			this.next = this;
		}

		// 생성자
		Node(E data, Node<E> next) {
			this.data = data;
			this.next = next;
		}
	}

	private Node<E> head; // 머리 노드
	private Node<E> tail; // 꼬리 노드
	private Node<E> crnt; // 선택 노드

	// 생성자 
	public CircLinkedList_09_07() {
      head = tail = crnt = null;
   }

	// 노드를 검색
	public E search(E o, Comparator<? super E> c) {
		if (head != null) {
			Node<E> ptr = head; // 현재 스캔중인 노드

			do {
				if (c.compare(o, ptr.data) == 0) { // 검색성공
					crnt = ptr;
					return ptr.data;
				}
				ptr = ptr.next; // 다음 노드에 주목
			} while (ptr != head);
		}
		return null; // 검색실패
	}

	// 머리에 노드를 삽입
	public void addFirst(E o) {
		if (head == null)
			head = tail = crnt = new Node<E>(o);
		else {
			Node<E> ptr = head;
			head = crnt = new Node<E>(o, ptr);
			tail.next = head;
		}
	}

	// 꼬리에 노드를 삽입 
	public void addLast(E o) {
		if (head == null) // 리스트가 비어있으면
			addFirst(o); // 머리에 삽입
		else {
			Node<E> ptr = tail;
			ptr.next = crnt = tail = new Node<E>(o, head);
		}
	}

	// 머리 노드를 삭제
	public void removeFirst() {
		if (head != null) { // 리스트가 비어 있지 않으면
			if (head == tail)
				head = tail = crnt = null;
			else {
				Node<E> ptr = head.next;
				head = crnt = ptr;
				tail.next = head;
			}
		}
	}

	// 꼬리 노드를 삭제
	public void removeLast() {
		if (head != null) {
			if (head == tail) // 노드가 하나만 있으면
				removeFirst(); // 머리 노드를 삭제
			else {
				Node<E> ptr = head; // 스캔중인 노드
				Node<E> pre = head; // 스캔중인 노드의 앞쪽 노드

				while (ptr.next != head) {
					pre = ptr;
					ptr = ptr.next;
				}
				pre.next = head; // pre는 삭제 뒤의 꼬리 노드
				tail = crnt = pre;
			}
		}
	}

	// 노드p를 삭제
	public void remove(Node<E> p) {
		if (head != null) {
			if (p == head) // p가 머리노드면
				removeFirst(); // 머리노드를 삭제
			else if (p == tail) // p가 꼬리노드면
				removeLast(); // 꼬리노드를 삭제
			else {
				Node<E> ptr = head;

				while (ptr.next != p) {
					ptr = ptr.next;
					if (ptr == head)
						return; // p가 리스트에 없습니다.
				}
				ptr.next = p.next;
				crnt = ptr;
			}
		}
	}

	// 선택 노드를 삭제
	public void removeCurrentNode() {
		remove(crnt);
	}

	// 모든 노드를 삭제
	public void clear() {
		while (head != null) // 비게 될 때까지
			removeFirst(); // 머리노드를 삭제
		crnt = null;
	}

	// 선택 노드를 하나 뒤쪽으로 이동
	public boolean next() {
		if (crnt == null || crnt.next == head)
			return false; // 나아갈 수 없음
		crnt = crnt.next;
		return true;
	}

	// 선택 노드를 출력
	public void printCurrentNode() {
		if (crnt == null)
			System.out.println("선택 노드가 없습니다.");
		else
			System.out.println(crnt.data.toString());
	}

	// 모든 노드를 출력
	public void dump() {
		if (head != null) {
			Node<E> ptr = head;

			do {
				System.out.println(ptr.data.toString());
				ptr = ptr.next;
			} while (ptr != head);
		}
	}

	// comparator c에 의해 서로 같다고 보는 노드를 모두 삭제
	public void purge(Comparator<? super E> c) {
		if (head == null)
			return;
		Node<E> ptr = head;

		do {
			int count = 0;
			Node<E> ptr2 = ptr;
			Node<E> pre = ptr;

			while (pre.next != head) {
				ptr2 = pre.next;
				if (c.compare(ptr.data, ptr2.data) == 0) {
					remove(ptr2);
					count++;
				} else
					pre = ptr2;
			}
			if (count == 0)
				ptr = ptr.next;
			else {
				Node<E> temp = ptr;
				remove(ptr);
				ptr = temp.next;
			}
		} while (ptr.next != head);
		crnt = head;
	}

	// 머리부터 n개 뒤 노드의 데이터에 대한 참조를 반환
	public E retrieve(int n) {
		if (head != null) {
			Node<E> ptr = head;

			while (n >= 0) {
				if (n-- == 0) {
					crnt = ptr;
					return (ptr.data); // 검색성공
				}
				ptr = ptr.next; // 다음 노드에 선택
				if (ptr == head)
					break;
			}
		}
		return (null);
	}
}
