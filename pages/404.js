import Link from "next/link";
import Head from "next/head";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Custom404() {
    return(
        <div>
            <Head>
                <title>Page not found</title>
            </Head>
            <Navbar item={{
                name: "Science Hub",
                link: "/"
            }} />
            <div className="min-h-[80vh] flex flex-col">
                <div className="flex-1"></div>
                <div className="pl-10 md:pl-28 lg:pl-48 text-amber-900 dark:text-orange-300">
                    <h1 className="font-fira-mono text-4xl md:text-5xl">404?! really? on this small site?</h1>
                    <h3 className="pt-4 font-jetbrains text-xl">I am sincerely sorry if I led here haha, lets get you <span className="underline"> <Link href={"/"}>home</Link></span></h3>
                </div>
                <div className="flex-1"></div>
            </div>
            <Footer />
        </div>
    )
}
