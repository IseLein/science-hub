import Recent from "../../components/AuthorRecent";
import Head from "next/head";
import { useSession } from "next-auth/react";
import Blog from "../../models/Blog";
import dbConnect from "../../util/dbConnect";
import Author from "../../models/Author";
import SignInOut from "../../components/SignInOut";
import Navbar from "../../components/Navbar";
import styles from "../../styles/Articles.module.css";
import Footer from "../../components/Footer";

export async function getStaticPaths() {
    try {
        await dbConnect();  // Connect to database
        const authors = await Author.find(); // Query the database
        const author_list = JSON.parse(JSON.stringify(authors));

        const paths = author_list.map((author) => {
            return {
                params: { id: author.slug }
            }
        })

        return {
            paths: paths,
            fallback: false
        }
    } catch(error) {
        return {
            paths: [],
            fallback: false
        }
    }
}

export async function getStaticProps(context) {
    const id = context.params.id;

    console.log(id);

    try {
        await dbConnect();  // Connect to database
        const writer = await Author.findOne({ slug: id });    // Find the author
        const articles = await Blog.find({ author: writer.name }).sort({ publishedDate: -1 }); // Query the database
        return {
          props: {
            articles: JSON.parse(JSON.stringify(articles))
          },
        };
    } catch (error) {
        return {
          notFound: true,
        };
    }
};

export default function AuthorPage({ articles }) {
    const { data: session } = useSession();

    let name;
    if(session) {
        name = session.user.name;
    } else {
        name = "Not Logged In";
    }

    return (
        <div>
            <Head>
                <title>{name}</title>
            </Head>
            <Navbar item={{
                name,
                link: "/write/",
            }}/>
            <div className={styles.article_hero}></div>
            <div className={styles.main_body}>
                {session && <div>
                    <Recent articles={articles} />
                </div>}
                <SignInOut />
            </div>    
            <Footer />       
        </div>
    )
}