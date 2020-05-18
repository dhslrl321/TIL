import class_pack.Point as p
import class_pack.Rectangle as r
import class_pack.Circle as c
import Definition

rec_point = p.Point(50, 50)
cir_point = p.Point(150, 100)
rectangle = r.Rectangle(rec_point, 00, 100)
circle = c.Circle(cir_point, 75)

answer1 = Definition.pt_in_cle(circle, p.Point(10, 20))
answer2 = Definition.rt_in_cle(circle, rectangle)
answer3 = Definition.rt_cle_overlap(circle, rectangle)
print(answer1)
print(answer2)
print(answer3)