const users = [
  { email: "123", password: "123", name: "Kim" },
  { email: "1231235aksdjf123", password: "123asdfsa", name: "Heo" },
  { email: "12jhfa3", password: "123fjow", name: "park" }
];

export function signIn({ email, password }) {
  const user = users.find(
    (user) => user.email === email && user.password === password
  );

  if (user === undefined) throw new Error();
  return user;
}