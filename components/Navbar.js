import Link from "next/link";
import Image from "next/image";
import logo from "../public/icon.png";
import styles from "../styles/Navbar.module.css";

export default function Navbar({ item }) {
    return (
        <div className={styles.navbar}>
            <div className={styles.nav_left}>
                <Link href={"/"}>
                    <div className={styles.button}>
                        <Image src={logo} alt="Logo - Bbb Icon" width={25} height={25} />
                    </div>
                </Link>
                <Link href={item.link}>
                    <div className={styles.name} href="/">
                        {item.name}
                    </div>
                </Link>
            </div>
            <div className={styles.spacer}></div>
        </div>
    )
}