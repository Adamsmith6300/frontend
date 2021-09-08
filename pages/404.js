import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  return (
    <div className="container">
      <Head>
        <title>{router.asPath} - Loma</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <div className="w-350 mx-auto text-center pt-24">
        <h1 className="text-3xl mb-4">Sorry, but this page doesn't exist!</h1>
        <img src="/loma.png" className="h-100 mx-auto mb-4" />
        <Link href="/">
          <button className="btn-no-size-color px-6 py-2 bg-black">
            Back to home
          </button>
        </Link>
      </div>
    </div>
  );
}
