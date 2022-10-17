import Link from "next/link";
import styles from "../styles/Articles.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons"

function getDateF(date) {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const year = parseInt(date.substring(0, 4));
    const month = parseInt(date.substring(5, 7)) - 1;
    const day = parseInt(date.substring(8, 10));
    return months[month]+ " " + day + ", " + year;
}

export default function Recent({ articles }) {
    return (
        <div>
            {articles.map((article) => (
                <Link href={"/articles/" + article._id} key={article._id}>
                    <div className={styles.article_display}>
                        <div className={styles.article_title}>
                            {article.title} <FontAwesomeIcon icon={ faArrowRight } />
                        </div>
                        <div className={styles.article_info}>
                            <span>{article.author + " "}</span>
                            &bull;
                            <span>{" " + getDateF(article.publishedDate) + " "}</span>
                            &bull;
                            <span className={styles.article_read_time}>{" " + article.readTime + " minute"}</span>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    )
};