import Link from "next/link";

// 임의의 사용자 data
const users = [
  { id: 1, name: "James" },
  { id: 2, name: "Martin" },
  { id: 3, name: "Danial" },
];

function Home() {
  return (
    <ul>
      <li>
        <Link href="/">
          <a>Home</a>
        </Link>
      </li>

      <li>
        {users.map((user) => (
          <ul key={user.id}>
            <Link href={`/user/${user.id}`}>
              <a>{user.name}</a>
            </Link>
          </ul>
        ))}
      </li>
    </ul>
  );
}

export default Home;
