import Link from "next/link";
import Head from "next/head";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import styles from "../styles/Home.module.css";

export default function Custom404() {
    return(
        <div className={styles.main}>
            <Head>
                <title>Page not found</title>
            </Head>
            <Navbar item={{
                name: "Science Hub",
                link: "/"
            }} />
            <div className={styles.hero}>
                <div className={styles.hero_text}>
                    <h1 className={styles.large_text}>404?! really? on this small site?</h1>
                    <h3 className={styles.small_text}>I am sincerely sorry if I led here haha, lets get <Link href={"/"}>home</Link></h3>
                </div>
            </div>
            <Footer />
        </div>
    )
}
