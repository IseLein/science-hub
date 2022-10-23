import Link from "next/link";
import styles from "../styles/Write.module.css"

export default function WriteButtons({ author }) {
    return(
        <div className={styles.btn_row}>
            <Link href={"/write/new_post"}>
                <button className={styles.session_btn}>
                    NEW POST
                </button>
            </Link>
            <Link href={"/write/" + author}>
                <button className={styles.session_btn}>
                    OLD POSTS
                </button>
            </Link>
        </div>
    )
}