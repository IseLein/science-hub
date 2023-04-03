import Head from "next/head";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import TypedText from '../components/TypedText';
import Previews from "../components/Previews";
import dbConnect from "../util/dbConnect";
import Blog from "../models/Blog";
import Link from "next/link";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleArrowRight } from "@fortawesome/free-solid-svg-icons";

export async function getServerSideProps() {
  try {
    await dbConnect();  // Connect to database
    const articles = await Blog.find().limit(6).sort({ publishedDate: -1 }); // Query the database
    return {
      props: {
        articles: JSON.parse(JSON.stringify(articles)),
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};

export default function Home({ articles }) {
  return (
    <div>
      <Head>
        <title>Science Hub</title>
        <meta name="google-site-verification" content="ldYxljjHIS0gfplq7XFPslDLPybRDTXDVuO47EQGGy4" />
        <meta name="og:title" content="Science Hub Blog" />
        <meta name="og:description" content="People do not have ideas, ideas have people - Carl Jung" />
        <meta name="og:image" content="https://firebasestorage.googleapis.com/v0/b/science-hub-blog-2b481.appspot.com/o/thumbnails%2Fscience_hub.jpg?alt=media&token=4e9c5352-8bdc-4e8b-9bdb-446cb3ec936c" />
        <meta name="og:type" content="article" />
        <meta name="og:url" content="https://science-hub-blog.vercel.app/" />
      </Head>
      <Navbar item={{
        name: "Science Hub",
        link: "/",
      }}/>
      <div className="bg-[url(~/public/mobile_home.png)] md:bg-[url(~/public/hero.png)] bg-fixed bg-cover min-h-[80vh] flex flex-col">
        <div className="flex-1"></div>
        <div className="text-orange-300 pl-10 md:pl-28 lg:pl-48">
          <h1 className="font-fira-mono text-4xl md:text-5xl 2xl:text-6xl"><TypedText /></h1>
          <h3 className="pt-4 font-jetbrains text-lg">[insert inspiring quote]</h3>
        </div>
        <div className="flex-1"></div>
      </div>
      <div className="px-10 md:px-28 lg:px-48">
        <div className="text-amber-900 dark:text-orange-300">
          <div className="py-4 flex flex-row items-end justify-between">
            <div className="font-sans font-bold text-xl">RECENT POSTS</div>
            <div>
                <Link href={"/articles"}>
                    <span className="p-1 font-semibold cursor-pointer hover:bg-orange-200 hover:dark:bg-zinc-700 text-right rounded">VIEW ALL <FontAwesomeIcon icon={faCircleArrowRight} /></span>
                </Link>
            </div>
          </div>
          <Previews articles={articles} />
        </div>
      </div>
      <Footer />
    </div>
  )
};
