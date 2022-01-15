import type { NextPage } from "next";
import Head from "next/head";
import Layout from "../components/layouts";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <Layout>
      <div className={styles.container}>
        <Head>
          <title>Kết nối lao động việt | TimViec</title>
        </Head>
        <main className={styles.main}>
          <h1 className={styles.title}>
            Welcome to <a href="https://nextjs.org">Next.js!</a>
          </h1>

          <p className={styles.description}>
            Get started by editing{" "}
            <code className={styles.code}>pages/index.tsx</code>
          </p>
        </main>
      </div>
    </Layout>
  );
};

export default Home;
