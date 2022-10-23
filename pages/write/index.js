import Head from "next/head";
import { useSession } from "next-auth/react";
import Navbar from "../../components/Navbar";
import WriteButtons from "../../components/WriteButtons";
import SignInOut from "../../components/SignInOut";
import Footer from "../../components/Footer";
import styles from "../../styles/Write.module.css";
import slugify from "slugify";

export default function Write() {
    const { data: session, status } = useSession();
    const loading = status === "loading";

    return(
        <div>
            <Head>
                <title>New Article</title>
            </Head>
            <main>
                <Navbar item={{
                    name: "",
                    link: "/write/",
                }}/>
                <div className={styles.article_hero}></div>
                <div>
                    {loading && <div className={styles.title}>Loading...</div>}
                    {session &&
                        <div>
                            <div className={styles.bare_text}>
                                So, what you here for? <em>{session.user.name}.</em><br />
                                I know your name haha.<br />
                                Click the button to add a new article or see a new one.
                            </div>
                            <WriteButtons author={slugify(session.user.name, {lower: true, strict: true})} />
                        </div>
                    }
                    {!session &&
                        <div className={styles.bare_text}>
                            If you are authorized to write articles, please sign in
                        </div>
                    }
                </div>
                <SignInOut />
                <Footer />
            </main>
        </div>
    );
};