import Head from "next/head";
import Navbar from "../../components/Navbar";
import CategoryPreviews from "../../components/CategoryPreviews";
import dbConnect from "../../util/dbConnect";
import Category from "../../models/Category";
import Footer from "../../components/Footer";

export async function getServerSideProps() {
    try {
        await dbConnect();
        const categories = await Category.find();
        return {
            props: {
                categories: JSON.parse(JSON.stringify(categories)),
            },
        };
    } catch (error) {
        return {
            notFound: true,
        };
    }
};

export default function Categories({ categories }) {
    return(
        <div>
            <Head>
                <title>Categories</title>
            </Head>
            <Navbar item={{
                name: "Categories",
                link: "/categories",
            }}/>
            <div>
                <div className="pt-28 pb-12 px-4 text-center text-amber-900 dark:text-orange-300
                    font-mono font-semibold text-4xl">
                    Categories
                </div>
                <div className="px-10 md:px-28 lg:px-48">
                    <CategoryPreviews categories={categories} />
                </div>
                <Footer />
            </div>
        </div>
    )
};
