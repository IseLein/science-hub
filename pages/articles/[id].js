import Head from "next/head";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import dbConnect from "../../util/dbConnect";
import Blog from "../../models/Blog";
import Author from "../../models/Author";
import Footer from "../../components/Footer";
import Custom404 from "../404";
import Image from "next/image";
import 'tailwindcss/tailwind.css';
import '@tailwindcss/typography';

export async function getServerSideProps(context) {
    const id = context.params.id;

    try {
        await dbConnect();  // Connect to database
        const article = await Blog.findById(id); // Query the database
        const author = await Author.findOne({ name: article.author });
        return {
          props: {
            article: JSON.parse(JSON.stringify(article)),
            author: JSON.parse(JSON.stringify(author)),
          },
        };
    } catch (error) {
        return {
            props: { article: null },
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

export default function Article({ article, author }) {
    if (!article) {
        return <Custom404 />
    }

    return(
        <div>
            <Head>
                <title>{article.title}</title>
                <meta property="og:title" content={article.title} />
                <meta property="og:description" content={article.description} />
                <meta property="og:image" content={article.thumbnailSource} />
                <meta property="og:type" content="article" />
                <meta property="og:url" content={"https://science-hub-blog.vercel.app/articles/" + article._id} />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={article.title} />
                <meta name="twitter:description" content={article.description} />
                <meta name="twitter:image" content={article.thumbnailSource} />
                <meta name="twitter:image:alt" content={article.thumbnailAlt} />
            </Head>
            <Navbar item={{
                name: "",
                link: "/articles"
            }} />
            <div></div>
            <div className="px-5 md:px-40 lg:px-72 2xl:px-[25rem] text-amber-900 dark:text-orange-300">
                <div className="pt-28 text-3xl lg:text-5xl font-bold">
                    {article.title}
                </div>
                <div className="py-2 lg:py-5 lg:text-xl font-sans text-amber-600 dark:text-orange-200">
                    {article.description}
                </div>
                <div className="pt-1 text-sm lg:text-lg pb-6 font-sans flex flex-row items-center">
                    <div className="pr-4 items-center">
                        <Image className="rounded-full" src={author.avatar} width={40} height={40} alt={""}/>
                    </div>
                    <div>
                    <span className="font-semibold"><Link href={"/authors/" + author.username}>{article.author + " "}</Link></span>
                    <div>
                    <span>{" " + getDateF(article.publishedDate) + " "}</span>
                    &bull;
                    <span className="text-amber-600 dark:text-orange-200">
                        {" " + article.readTime}
                    </span>
                    </div>
                    </div>
                </div>
                <hr className="py-5 border-amber-600 dark:border-orange-200"/>
                <article className="prose prose-iselein md:prose-lg lg:prose-xl font-jetbrains
                        dark:prose-invert max-w-none prose-code:font-jetbrains prose-img:rounded-lg
                        prose-code:bg-orange-100 prose-code:dark:bg-zinc-800"
                    dangerouslySetInnerHTML={{ __html: article.sanitizedHtml }}>
                </article>
            </div>
            <Footer />
        </div>
    )
}
