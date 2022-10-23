import { useSession, signIn, signOut } from "next-auth/react";
import styles from "../styles/Write.module.css";

export default function SignInOut() {
    const handleSignin = (e) => {
        e.preventDefault()
        signIn()
    }
    const handleSignout = (e) => {
        e.preventDefault()
        signOut()
    }
    const { data: session } = useSession();

    return (
        <div  className={styles.btn_row}>
            {session && 
                <a href="#" onClick={handleSignout}>
                    <button className={styles.session_btn}>
                        SIGN OUT
                    </button>
                </a>
            }
            {!session && 
                <a href="#" onClick={handleSignin}>
                    <button className={styles.session_btn}>
                        SIGN IN
                    </button>
                </a>
            }
        </div>
    )
}