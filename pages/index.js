import Head from "next/head";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import TypedText from '../components/TypedText';
import Previews from "../components/Previews";
import CategoryPreviews from "../components/CategoryPreviews";
import dbConnect from "../util/dbConnect";
import Blog from "../models/Blog";
import Category from "../models/Category";
import Link from "next/link";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleArrowRight } from "@fortawesome/free-solid-svg-icons";

export async function getServerSideProps() {
  try {
    await dbConnect();  // Connect to database
    const articles = await Blog.find().limit(6).sort({ publishedDate: -1 }); // Query the database
    const categories = await Category.find();
    return {
      props: {
        articles: JSON.parse(JSON.stringify(articles)),
        categories: JSON.parse(JSON.stringify(categories)),
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};

export default function Home({ articles, categories }) {
  return (
    <div>
      <Head>
        <title>Science Hub</title>
        <meta name="google-site-verification" content="ldYxljjHIS0gfplq7XFPslDLPybRDTXDVuO47EQGGy4" />
        <meta property="og:title" content="Science Hub Blog" />
        <meta property="og:description" content="People do not have ideas, ideas have people - Carl Jung" />
        <meta property="og:image" content="https://firebasestorage.googleapis.com/v0/b/science-hub-blog-2b481.appspot.com/o/science_hub.jpg?alt=media&token=da1be761-b561-4fd6-b45c-3c080cda78d7" />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://science-hub-blog.vercel.app/" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Science Hub Blog" />
        <meta name="twitter:description" content="People do not have ideas, ideas have people - Carl Jung" />
        <meta name="twitter:image" content="https://firebasestorage.googleapis.com/v0/b/science-hub-blog-2b481.appspot.com/o/science_hub.jpg?alt=media&token=da1be761-b561-4fd6-b45c-3c080cda78d7" />
        <meta name="twitter:image:alt" content="A young lady reading on a table under a bright light" />
      </Head>
      <Navbar item={{
        name: "Science Hub",
        link: "/",
      }}/>
      <div className="bg-[url(https://firebasestorage.googleapis.com/v0/b/science-hub-blog-2b481.appspot.com/o/mobile_home.png?alt=media&token=c451404d-e7aa-472e-995f-110ab0433ec5)]
            md:bg-[url(https://firebasestorage.googleapis.com/v0/b/science-hub-blog-2b481.appspot.com/o/hero.png?alt=media&token=5d85f0df-12a7-4cc7-8680-3218600484db)]
            bg-fixed bg-cover min-h-[80vh] flex flex-col">
        <div className="flex-1"></div>
        <div className="text-orange-300 pl-10 md:pl-28 lg:pl-48">
          <h1 className="font-fira-mono text-4xl md:text-5xl 2xl:text-6xl"><TypedText /></h1>
          <h3 className="pt-4 font-jetbrains md:text-lg">[insert inspiring quote]</h3>
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
          <hr className="my-10 border-amber-600 dark:border-orange-200" />
          <div className="pt-4 pb-4 flex flex-row items-end justify-between">
            <div className="font-sans font-bold text-xl">TAGS</div>
          </div>
          <CategoryPreviews categories={categories} />
        </div>
      </div>
      <Footer />
    </div>
  )
};
