import Head from "next/head";
import Link from "next/link";

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>LOMA</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title">Uh-oh! File not found!</h1>
        <Link href="/" className="ui button">
          Back to homepage
        </Link>
      </main>

      <footer></footer>
    </div>
  );
}
