import Head from "next/head";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import styles from "../../styles/Article.module.css";
import dbConnect from "../../util/dbConnect";
import Blog from "../../models/Blog";
import Footer from "../../components/Footer";
import slugify from "slugify";

export async function getStaticPaths() {
    try {
        await dbConnect();  // Connect to database
        const articles = await Blog.find().sort({ publishedDate: -1 }); // Query the database
        const article_list = JSON.parse(JSON.stringify(articles));

        const paths = article_list.map((blog) => {
            return {
                params: { id: blog._id.toString() }
            }
        })
        return {
            paths,
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
        const article = await Blog.findById(id); // Query the database
        return {
          props: {
            article: JSON.parse(JSON.stringify(article)),
          },
        };
    } catch (error) {
        return {
          notFound: true,
        };
    }
};

function getDateF(date) {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const year = parseInt(date.substring(0, 4));
    const month = parseInt(date.substring(5, 7)) - 1;
    const day = parseInt(date.substring(8, 10));
    return months[month]+ " " + day + ", " + year;
}

export default function Article({ article }) {
    const slug = slugify(article.author, {lower: true, strict: true})

    return(
        <div className={styles.article}>
            <Head>
                <title>{article.title}</title>
            </Head>
            <Navbar item={{
                name: "",
                link: "/articles"
            }} />
            <div className={styles.article_hero}></div>
            <div className={styles.main_body}>
                <div className={styles.title}>
                    {article.title}
                </div>
                <div className={styles.author}>
                    <span><Link href={"/authors/" + slug}>{article.author + " "}</Link></span>
                    &bull;
                    <span>{" " + getDateF(article.publishedDate) + " "}</span>
                    &bull;
                    <span className={styles.readTime}>
                        {" " + article.readTime}
                    </span>
                </div>
                <div  dangerouslySetInnerHTML={{ __html: article.sanitizedHtml }} className={styles.content}>
                    {/* {article.sanitizedHtml} */}
                </div>
            </div>
            <Footer />
        </div>
    )
}