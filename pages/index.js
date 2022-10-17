import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import TypedText from '../components/TypedText';
import Recent from "../components/Recent";
import styles from "../styles/Home.module.css";
import dbConnect from "../util/dbConnect";
import Blog from "../models/Blog";
import Link from "next/link";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faCircleArrowRight } from "@fortawesome/free-solid-svg-icons";

export async function getStaticProps() {
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

export default function Home({ articles }) {
  return (
    <div className={styles.main}>
      <Navbar item={{
        name: "Science Hub",
        link: "/",
      }}/>
      <div className={styles.hero}>
        <div className={styles.hero_text}>
          <h1 className={styles.large_text}><TypedText /></h1>
          <h3 className={styles.small_text}>[insert inspiring quote]</h3>
        </div>
      </div>
      <div className={styles.main_body}>
        <div className={styles.recent}>
          <div className={styles.main_head}>RECENT POSTS <FontAwesomeIcon icon={faAngleDown} /> </div>
          <Recent articles={articles} />
          <div className={styles.main_bottom}>
            <Link href={"/articles"}>
              <span>SEE ALL POSTS <FontAwesomeIcon icon={faCircleArrowRight} /></span>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
};