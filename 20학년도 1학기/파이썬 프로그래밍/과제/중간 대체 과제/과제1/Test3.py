checker = []

with open("data2.txt", "r") as fr:
    for line in fr:
        for word in line.lower().split():
            checker.append(word)

with open("data1.txt", "r") as fr:
    for line in fr:
        for word in line.lower().split():
            if word in checker:
                checker.remove(word)

dump_file = open("data3.txt", "w")

dump_file.write(checker)

print(checker)
