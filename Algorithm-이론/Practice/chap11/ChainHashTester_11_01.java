package chap11;
import java.util.Scanner;
// 체인법에 의한 해시의 사용 예 (키는 이름)

class ChainHashTester_11_01 {
	static Scanner stdIn = new Scanner(System.in);

	// 데이터(회원번호+이름)
	static class Data {
		static final int NO = 1; // 번호를 입력 받습니까?
		static final int NAME = 2; // 이름을 입력 받습니까?

		private Integer no; // 회원번호 (키값)
		private String name; // 이름

		// 키값
		String keyCode() {
			return name;
		}

		// 문자열을 반환합니다.
		public String toString() {
			return Integer.toString(no);
		}

		// 데이터를 입력 받음
		void scanData(String guide, int sw) {
			System.out.println(guide + "하는 데이터를 입력하세요.");

			if ((sw & NO) == NO) {
				System.out.print("번호：");
				no = stdIn.nextInt();
			}
			if ((sw & NAME) == NAME) {
				System.out.print("이름：");
				name = stdIn.next();
			}
		}
	}

	// 메뉴열거형
	enum Menu {
		ADD("데이터 추가"), REMOVE("데이터 삭제"), SEARCH("데이터 검색"), DUMP("모든  데이터 출력"), TERMINATE("종료");

		private final String message; // 표시용 문자열

		static Menu MenuAt(int idx) { // 서수가 idx임. 열거를 반환
			for (Menu m : Menu.values())
				if (m.ordinal() == idx)
					return m;
			return null;
		}

		Menu(String string) { // 생성자
			message = string;
		}

		String getMessage() { // 표시용 문자열을 반환
			return message;
		}
	}

	// 메뉴선택
	static Menu SelectMenu() {
		int key;
		do {
			for (Menu m : Menu.values()) {
				System.out.printf("(%d) %s  ", m.ordinal(), m.getMessage());
				if ((m.ordinal() % 3) == 2 && m.ordinal() != Menu.TERMINATE.ordinal())
					System.out.println();
			}
			System.out.print("：");
			key = stdIn.nextInt();
		} while (key < Menu.ADD.ordinal() || key > Menu.TERMINATE.ordinal());

		return Menu.MenuAt(key);
	}

	public static void main(String[] args) {
		Menu menu; // 메뉴
		Data data; // 추가용 데이터 참조
		Data temp = new Data(); // 입력 받기용 데이터

		ChainHash<String, Data> hash = new ChainHash<String, Data>(13);

		do {
			switch (menu = SelectMenu()) {
			case ADD:
				data = new Data(); // 추가
				data.scanData("추가", Data.NO | Data.NAME);
				int k = hash.add(data.keyCode(), data);
				switch (k) {
				case 1:
					System.out.println("그 키값은 이미 등록되어 있습니다.");
					break;
				case 2:
					System.out.println("해시 테이블이 가득 찼습니다.");
					break;
				}
				break;

			case REMOVE: // 삭제
				temp.scanData("삭제", Data.NAME);
				hash.remove(temp.keyCode());
				break;

			case SEARCH: // 검색
				temp.scanData("검색", Data.NAME);
				Data t = hash.search(temp.keyCode());
				if (t != null)
					System.out.println("그 키를 갖는 데이터는 " + t + "입니다.");
				else
					System.out.println("해당 하는 데이터가 없습니다.");
				break;

			case DUMP: // 출력
				hash.dump();
				break;
			}
		} while (menu != Menu.TERMINATE);
	}
}