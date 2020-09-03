import math
from class_pack import Point as p


# 각 점을 입력받아 중심의 위치를 출력하는 함수
def print_position(point1):
    print("x좌표: ", point1.x)
    print("y좌표: ", point1.y)


# 사각형 객체를 입력받아 중심의 위치를 변경하는 함수
def re_position(rectangle, x, y):
    rectangle.y
    rectangle.y = y


# 사각형 중심점을 구하여 반환하는 함수
def print_center(circle):
    print(circle.center)


def get_distance(x1, y1, x2, y2):
    x = math.pow((x2 - x1), 2)
    y = math.pow((y2 - y1), 2)
    distance = math.sqrt(x + y)
    return distance


# point가 원의 내부 또는 경계 위에 있으면 True 반환 함수
def pt_in_cle(circle, point):
    distance = get_distance(point.x, point.y, circle.center.x, circle.center.y)

    if circle.radius >= distance:
        return True
    else:
        return False


# circle이 Rec 내부에 있으면 True 반환 함수
def rt_in_cle(circle, rectangle):
    if pt_in_cle(circle, rectangle.point):
        return True
    else:
        return False


# 직사각형 모서리가 하나라도 원 안에 있으면 True 반환 함수
def rt_cle_overlap(circle, rectangle):
    point1 = p.Point(rectangle.point.x, rectangle.point.y)
    point2 = p.Point(rectangle.point.x + rectangle.width, rectangle.point.y)
    point3 = p.Point(rectangle.point.x + rectangle.width, rectangle.point.y - rectangle.height)
    point4 = p.Point(rectangle.point.x, rectangle.point.y - rectangle.height)

    if pt_in_cle(circle, point1) or pt_in_cle(circle, point2) or pt_in_cle(circle, point3) or pt_in_cle(circle, point4):
        return True
    else:
        return False
