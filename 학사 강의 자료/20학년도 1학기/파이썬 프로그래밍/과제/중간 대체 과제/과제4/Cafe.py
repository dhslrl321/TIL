print("Welcome to harry Cafe")

count = 0

coffee = input("Choose 1 : Americano / Cafe mocha / Cafe Latte / Green Tea Latte : ")

if coffee == "Americano":
    count += 1000
elif coffee == "Cafe mocha":
    count += 2000
elif coffee == "Cafe Latte":
    count += 3000
elif coffee == "Green Tea Latte":
    pass
else:
    print("해당 커피는 없습니다.")

size = input("Choose size: G(grande) / R(regular) / S(short) : ")

if size == "G":
    count += 500
elif size == "R":
    count += 600
elif size == "S":
    count += 700
else:
    print("해당 사이즈는 없습니다.")

print(count)