word_dict = {}

with open("data1.txt", "r") as fr:
    for line in fr:
        for word in line.lower().strip().split():
            if word in word_dict:
                word_dict[word] += 1

            else:
                word_dict[word] = 1

word_list = sorted(word_dict.items(), key=lambda x: x[1], reverse=True)

print(word_list)