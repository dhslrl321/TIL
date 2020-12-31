import Link from "next/link";

function Home() {
  return (
    <>
      <h1>About page</h1>
      <li>
        <Link href="/info">
          <a>Information</a>
        </Link>
      </li>
    </>
  );
}

export default Home;
