import Head from "next/head";
import Navbar from "../../components/Navbar";
import Link from "next/link";
import dbConnect from "../../util/dbConnect";
import Author from "../../models/Author";
import Footer from "../../components/Footer";

export async function getServerSideProps() {
  try {
    await dbConnect();  // Connect to database
    const authors = await Author.find(); // Query the database
    return {
      props: {
        authors: JSON.parse(JSON.stringify(authors)),
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};

export default function Authors({ authors }) {
  return(
    <div>
      <Head>
        <title>Contributors</title>
      </Head>
        <Navbar item={{
            name: "Contributors",
            link: "/authors/",
        }}/>
        <div className="px-10 md:px-28 lg:px-48 text-amber-900 dark:text-orange-300
                h-[100vh] flex flex-col">
            <div className="pt-28 pb-10 text-4xl font-semibold text-center">
              <h1>Contributors</h1>
            </div>
            <ul className="list-disc">
                {
                  authors.map((author) => (
                      <li>
                          <Link href={"/authors/" + author.username} key={author._id}>
                              <div className="py-4 text-2xl underline cursor-pointer">
                                  {author.name}
                              </div>
                          </Link>
                      </li>
                  ))
                }
            </ul>
            <div className="flex-1"></div>
            <Footer />
        </div>
    </div>
  )
}
