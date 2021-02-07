import Head from "next/head";
import Link from "next/link";

import styles from "./Layout.module.css";

type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <div>
      <Head>
        <title>harbour</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.header}>
        <Link href="/">
          <a className={styles.brand}>harbour</a>
        </Link>
      </div>

      <main>{children}</main>
    </div>
  );
}
