import styles from "../styles/Footer.module.css";

export default function Footer() {
    return (
        <div className={styles.footer}>
            Science Hub &copy; 2022.{"  "}
            <a href="https://icons8.com/icon/_m9zhw01DmxX/bbb" target="_blank" rel="noopener noreferrer">
                Bbb
            </a> icon by 
            <a href="https://icons8.com" target="_blank" rel="noopener noreferrer">
                {" "}Icons8
            </a>
        </div>
    )
};