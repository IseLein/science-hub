import Head from "next/head";
import Navbar from "../../components/Navbar";
import Previews from "../../components/Previews";
import dbConnect from "../../util/dbConnect";
import Blog from "../../models/Blog";
import Footer from "../../components/Footer";

export async function getServerSideProps() {
    try {
      await dbConnect();  // Connect to database
      const articles = await Blog.find().sort({ publishedDate: -1 }); // Query the database
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

export default function Articles({ articles }) {
    return (
      <div>
        <Head>
          <title>Articles</title>
        </Head>
          <Navbar item={{
              name: "Articles",
              link: "/articles/",
          }}/>
          <div>
            <div className="pt-28 pb-12 px-4 text-center text-amber-900 dark:text-orange-300
                font-mono font-semibold text-4xl">
                Latest Posts from Science Hub
            </div>
            <div className="px-10 md:px-28 lg:px-48">
                <Previews articles={articles} />
            </div>
            <Footer />
          </div>
      </div>
    )
};
