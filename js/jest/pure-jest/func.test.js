const func = require("./func");

test("add 함수 1 + 2는 3인 테스트", () => {
  expect(func.add(1, 2)).toBe(3);
})

test("add 함수 1 + 1 은 3이 아닌 테스트", () => {
  expect(func.add(1, 1)).not.toBe(3);
});

test("makeUser 함수 테스트", () => {
  expect(func.makeUser("jang", 24)).toEqual({
    username: "jang",
    age: 24
  });
});
