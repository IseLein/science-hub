import Head from "next/head";
import { useSession } from "next-auth/react";
import { useRouter } from 'next/router';
import Navbar from "../../components/Navbar";
import SignInOut from "../../components/SignInOut";
import styles from "../../styles/Write.module.css";

export default function NewPost() {
    const { data: session } = useSession();
    const router = useRouter();

    const handleSubmit = async(event) => {
        event.preventDefault();

        const data = {
            name: event.target.name.value,
        };

        const endpoint = "/api/article/addAuthor";
        const JSONdata = JSON.stringify(data);

        const options = {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSONdata,
        }

        const response = await (await fetch(endpoint, options)).json();

        alert("New contibutor added. Maybe");

        router.push("/write/");
    }

    return(
        <div>
            <Head>
                <title>New Contributor</title>
            </Head>
            <Navbar item={{
                name: "New Contributor",
                link: "",
            }}/>
            <div className={styles.article_hero}></div>
            {session && 
                <div className={styles.new_blog}>
                    <form onSubmit={handleSubmit}>
                        <div className={styles.input_block}>
                            <label htmlFor="name" className={styles.input_label}>Author</label>
                            <input required type="text" name="name" id="name" className={styles.input_box} value={session.user.name} readOnly></input>
                        </div>
                        <div className={styles.buttons}>
                            <button className={styles.btn} type="submit">SAVE</button>
                        </div>
                    </form>
                </div>
            }
            {!session && <SignInOut />}
        </div>
    )
};