import Head from "next/head";
import Navbar from "../../components/Navbar";
import Link from "next/link";
import dbConnect from "../../util/dbConnect";
import Author from "../../models/Author";
import styles from "../../styles/Articles.module.css";
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
  console.log(authors);
  
  return(
    <div>
      <Head>
        <title>Contributors</title>
      </Head>
        <Navbar item={{
            name: "Contributors",
            link: "/authors/",
        }}/>
        <div className={styles.article_hero}></div>
        <div className={styles.main_body}>
          <h1>Contributors</h1>
          {
              authors.map((author) => (
                  <Link href={"/authors/" + author.slug} key={author._id}>
                      <div className={styles.article_display}>
                        {author.name}
                      </div>
                  </Link>
              ))
          }
        </div>
        <Footer />
    </div>
  )
}