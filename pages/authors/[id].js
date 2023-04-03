import Head from "next/head"
import Navbar from "../../components/Navbar";
import dbConnect from "../../util/dbConnect";
import Blog from "../../models/Blog";
import Author from "../../models/Author";
import Previews from "../../components/Previews";
import Footer from "../../components/Footer";

export async function getStaticPaths() {
    try {
        await dbConnect();  // Connect to database
        const authors = await Author.find(); // Query the database
        const author_list = JSON.parse(JSON.stringify(authors));

        const paths = author_list.map((author) => {
            return {
                params: { id: author.username }
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
        const author = await Author.findOne({ username: id });
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
                name: "Contributors",
                link: "/authors/",
            }}/>
            <div className="px-10 md:px-28 lg:px-48 text-amber-900 dark:text-orange-300
                    h-[100vh] overflow-y-scroll flex flex-col">
                <div className="pt-28 pb-12 text-4xl text-center font-semibold">
                    <h1>{"Posts by "}{author.name}</h1>
                </div>
                <div>
                    <Previews articles={ articles }/>
                </div>
                <div className="flex-1"></div>
                <Footer />
            </div>
        </div>
    );
};
