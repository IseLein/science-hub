import Head from "next/head"
import Navbar from "../../components/Navbar";
import dbConnect from "../../util/dbConnect";
import Blog from "../../models/Blog";
import Author from "../../models/Author";
import styles from "../../styles/Articles.module.css";
import Recent from "../../components/Recent";

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

    try {
        await dbConnect();  // Connect to database
        const author = await Author.findOne({ slug: id });
        const articles = await Blog.find({ author: author.name }).sort({ publishedDate: -1 }); // Query the database
        
        return {
          props: {
            author: JSON.parse(JSON.stringify(author)),
            articles: JSON.parse(JSON.stringify(articles)),
          },
        };
    } catch (error) {
        return {
          notFound: true,
        };
    }
};

export default function AuthorPage({ author, articles }) {
    return(
        <div>
            <Head>
                <title>
                    {author.name}
                </title>
            </Head>
            <Navbar item={{
                name: "Articles",
                link: "/articles/",
            }}/>
            <div className={styles.article_hero}></div>
            <div className={styles.main_body}>
                <h1>{"Posts by "}{author.name}</h1>
            </div>
            <div className={styles.main_body}>
                <Recent articles={ articles }/>
            </div>
        </div>
    );
};