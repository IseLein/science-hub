import { useSession, signIn, signOut } from "next-auth/react";

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
        <div className="text-center rounded-lg w-fit text-amber-900 dark:text-orange-300
                text-sm md:text-lg bg-orange-200 dark:bg-zinc-800 font-semibold">
            {session && 
                <a href="#" onClick={handleSignout}>
                    <button className="px-3 py-2">
                        SIGN OUT
                    </button>
                </a>
            }
            {!session && 
                <a href="#" onClick={handleSignin}>
                    <button className="px-3 py-2">
                        SIGN IN
                    </button>
                </a>
            }
        </div>
    )
}
