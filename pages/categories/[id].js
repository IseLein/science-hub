import Head from "next/head";
import Navbar from "../../components/Navbar";
import dbConnect from "../../util/dbConnect";
import Category from "../../models/Category.js";
import Blog from "../../models/Blog";
import Previews from "../../components/Previews";
import Footer from "../../components/Footer";

export async function getStaticPaths() {
    try {
        await dbConnect();
        const categories = await Category.find();
        const category_list = JSON.parse(JSON.stringify(categories));

        const paths = category_list.map((category) => {
            return {
                params: { id: category.slug }
            }
        })

        return {
            paths: paths,
            fallback: false
        }
    } catch (error) {
        return {
            paths: [],
            fallback: false
        }
    }
}

export async function getStaticProps(context) {
    const id = context.params.id;

    try {
        await dbConnect();
        const category = await Category.findOne({ slug: id });
        let articles = [];
        for (let post of category.posts) {
            let newArticle = await Blog.findById(post);
            articles[articles.length] = newArticle;
        }
        articles.reverse();

        return {
            props: {
                category: JSON.parse(JSON.stringify(category)),
                articles: JSON.parse(JSON.stringify(articles)),
            }
        };
    } catch (error) {
        return {
            notFound: true,
        };
    }
};

export default function CategoryPage({ category, articles }) {
    const metaDesc = `${category.category} articles on Science Hub Blog`;
    const metaUrl = `https://science-hub-blog.vercel.app/categories/${category.slug}`;
    return(
        <div>
            <Head>
                <title>{category.category}</title>
                <meta property="og:title" content={category.category} />
                <meta property="og:description" content={metaDesc} />
                <meta property="og:image" content={category.bannerImage} />
                <meta property="og:type" content="article" />
                <meta property="og:url" content={metaUrl} />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={category.category} />
                <meta name="twitter:description" content={metaDesc} />
                <meta name="twitter:image" content={category.bannerImage} />
            </Head>
            <Navbar item={{
                name: "Categories",
                link: "/categories/",
            }}/>
            <div className="px-10 md:px-28 lg:px-48 text-amber-900 dark:text-orange-300
                    h-[100vh] overflow-y-scroll flex flex-col">
                <div className="pt-28 pb-12 text-4xl text-center font-semibold">
                    <h1>{category.category}{" posts"}</h1>
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
