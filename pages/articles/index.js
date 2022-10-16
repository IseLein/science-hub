import Navbar from "../../components/Navbar";
import Recent from "../../components/Recent";
import dbConnect from "../../util/dbConnect";
import Blog from "../../models/Blog";
import styles from "../../styles/Articles.module.css";
import Footer from "../../components/Footer";

export async function getServerSideProps() {
    try {
      await dbConnect();  // Connect to database
      const articles = await Blog.find(); // Query the database
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
        <div className={styles.main}>
            <Navbar item={{
                name: "Articles",
                link: "/articles/",
            }}/>
            <div className={styles.article_hero}></div>
            <div className={styles.main_body}>
              <Recent articles={articles} />
              <Footer />
            </div>
        </div>
    )
};