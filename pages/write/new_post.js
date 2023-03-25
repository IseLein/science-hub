import Head from "next/head";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Navbar from "../../components/Navbar";
import SignInOut from "../../components/SignInOut";
import styles from "../../styles/Write.module.css";

export default function NewPost() {
    const { data: session } = useSession();
    const router = useRouter();

    const handleSubmit = async(event) => {
        event.preventDefault();

        const data = {
            title: event.target.title.value,
            author: event.target.author.value,
            description: event.target.description.value,
            content: event.target.content.value,
        };

        const endpoint = "/api/article/addArticle";
        const JSONdata = JSON.stringify(data);

        const options = {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSONdata,
        }

        const response = await fetch(endpoint, options);
        const result = await response.json();
    
        if (response.ok) {
            alert("New Post added successfully");
            router.push("/write/");
        } else {
            alert(result.error);
        }
    }

    return(
        <div>
            <Head>
                <title>New Post</title>
            </Head>
            <Navbar item={{
                name: "New Post",
                link: "",
            }}/>
            <div className={styles.article_hero}></div>
            {session &&
                <div className={styles.new_blog}>
                <h1>{session.user.name}</h1>
                <form onSubmit={handleSubmit}>
                    <div className={styles.input_block}>
                        <label htmlFor="title" className={styles.input_label}>Title</label>
                        <input required type="text" name="title" id="title" className={styles.input_box}></input>
                    </div>
                    <div className={styles.input_block}>
                        <label htmlFor="author" className={styles.input_label}>Author</label>
                        <input required type="text" name="author" id="author" className={styles.input_box} value={session.user.name} readOnly></input>
                    </div>
                    <div className={styles.input_block}>
                        <label htmlFor="description" className={styles.input_label}>Description</label>
                        <input required type="text" name="description" id="description" className={styles.input_box}></input>
                    </div>
                    <div className={styles.input_block}>
                        <label htmlFor="content" className={styles.input_label}>Content</label>
                        <textarea required rows={25} type="text" name="content" id="content" className={styles.input_box_ta}></textarea>
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
