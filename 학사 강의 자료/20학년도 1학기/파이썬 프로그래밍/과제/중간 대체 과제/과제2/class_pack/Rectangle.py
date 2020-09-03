class Rectangle:

    def __init__(self, point, width, height):
        self.point = point
        self.width = width
        self.height = height

    def re_position(self, width, height):
        self.width = width
        self.height = height
