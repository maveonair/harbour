import Head from "next/head";
import Link from "next/link";

export default function NotFound() {
  return (
    <div>
      <Head>
        <title>harbour</title>
      </Head>
      <div>
        <span>404</span>
        <div>The page you are looking for was not found.</div>
        <Link href="/">
          <a className="btn btn-link">Back to Home</a>
        </Link>
      </div>
    </div>
  );
}
