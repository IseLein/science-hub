import styles from "../styles/Write.module.css";
import { useRouter } from "next/router";

export default function WriteNew({ writer }) {
    
    const handleSubmit = async(event) => {
        event.preventDefault();

        const router = useRouter();

        const data = {
            title: event.target.title.value,
            author: event.target.author.value,
            description: event.target.value,
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

        const response = await (await fetch(endpoint, options)).json();

        router.push("/write/")
    }

    return (
        <div className={styles.new_blog}>
            <h1>{writer}</h1>
            <form onSubmit={handleSubmit}>
                <div className={styles.input_block}>
                    <label htmlFor="title" className={styles.input_label}>Title</label>
                    <input required type="text" name="title" id="title" className={styles.input_box}></input>
                </div>
                <div className={styles.input_block}>
                    <label htmlFor="author" className={styles.input_label}>Author</label>
                    <input required type="text" name="author" id="author" className={styles.input_box} value={writer} readOnly></input>
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
    )
}