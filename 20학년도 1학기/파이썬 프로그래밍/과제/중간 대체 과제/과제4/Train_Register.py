### 목적지 선택 -> 열차 종류 선택 -> 입석,좌석 선택 함수
### 모두 고르면 총 금액 출력 함수
### 커피 종류 4가지 사이즈 3가지 각 비용 다 더해서 출력

destination = input("춘천(운임 : 5000원) 부산(운임 :30000원) 대구(운임 20000원) 수원(운임10000) 중 목적지를 한곳 입력하세요 : ")
train = input("KTX(10000원 추가) / 새마을호(5000원 추가) / 무궁화호(3000원 추가) 중 하나를 입력하세요 : ")
seat = input("좌석 / 입석(2000원 할인)중 하나를 입력하세요 : ")

count = 0

if destination == "춘천":
    count += 5000
elif destination == "부산":
    count += 30000
elif destination == "대구":
    count += 20000
elif destination == "수원":
    count += 10000
else:
    print("해당 목적지는 존재하지 않습니다.")

if train == "KTX" or "ktx":
    count += 10000
elif train == "새마을호":
    count += 5000
elif train == "무궁화호":
    count += 3000
else:
    print("해당 열차는 존재하지 않습니다.")

if seat == "입석":
    count -= 2000

print(count, "원")

