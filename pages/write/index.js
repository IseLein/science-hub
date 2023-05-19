import Head from "next/head";
import { getSession, useSession } from "next-auth/react";
import Navbar from "../../components/Navbar";
import SignInOut from "../../components/SignInOut";
import Footer from "../../components/Footer";
import slugify from "slugify";
import dbConnect from "../../util/dbConnect";
import Author from "../../models/Author";
import Blog from "../../models/Blog";
import Draft from "../../models/Draft";
import Image from "next/image";
import Link from "next/link";

function getDateF(date) {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const year = parseInt(date.substring(0, 4));
    const month = parseInt(date.substring(5, 7)) - 1;
    const day = parseInt(date.substring(8, 10));
    return months[month]+ " " + day + ", " + year;
}

export async function getServerSideProps(context) {
    const session = await getSession(context);

    if (!session) {
        return {
            // redirect: {
            //     destination: "/api/auth/signin",
            //     permanent: false,
            //},
            props: {
                author: null,
                articles: null,
                drafts: null
            },
        };
    }

    try {
        const author_slug = slugify(session.user.name, {lower: true});
        await dbConnect();
        const writer = await Author.findOne({ username: author_slug });
        const articles = await Blog.find({ author: writer.name }).sort({ publishedDate: -1 });
        const drafts = await Draft.find({ author: writer.name }).sort({ updatedAt: -1 });

        return {
            props: {
                author: JSON.parse(JSON.stringify(writer)),
                articles: JSON.parse(JSON.stringify(articles)),
                drafts: JSON.parse(JSON.stringify(drafts))
            },
        }
    } catch (error) {
       return {
            notFound: true,
        };
    }
};

export default function Write({ author, articles, drafts }) {
    const { data: session, status } = useSession();
    const loading = status === "loading";

    return(
        <div>
            <Head>
                <title>New Article</title>
            </Head>
            <main>
                <Navbar item={{
                    name: "",
                    link: "/write/",
                }}/>
                {loading &&
                    <div className="pt-28 px-10 md:px-32 lg:px-56 flex justify-center items-center text-amber-900 dark:text-orange-300">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <div className="text-2xl">Loading...</div>
                    </div>
                }
                {!session &&
                    <div className="pt-28 px-10 md:px-32 lg:px-56 flex flex-col items-center">
                    <div className="pb-14 text-center text-3xl text-amber-900 dark:text-orange-300">
                        If you are authorized to write articles, please sign in.
                    </div>
                    <SignInOut />
                    </div>
                }
                {session &&
                    <div className="pt-28 pb-16 px-2 md:px-48 lg:px-72 2xl:px-96 text-amber-900 dark:text-orange-300">
                        <div className="flex justify-center">
                            <div className="pt-1 text-sm lg:text-lg pb-6 font-sans flex flex-row items-center justify-center w-fit
                                    border-b border-amber-900 dark:border-orange-300">
                                <div className="pr-4 items-center">
                                    <Image className="rounded-full" src={author.avatar} width={40} height={40} alt={""}/>
                                </div>
                                <div className="pr-8 md:pr-24 lg:pr-48">
                                <span className="font-semibold">{author.name + " "}</span>
                                <div className="text-sm">
                                    {"@" + author.username}
                                </div>
                                </div>
                                <SignInOut />
                            </div>
                        </div>
                        <div className="py-8 flex flex-col items-center justify-center">
                            <div className="">
                                <div className="text-2xl text-center">Feeling inspired? Write a new post.</div>
                            </div>
                            <div className="mt-4 text-center rounded-lg w-fit text-amber-900 dark:text-orange-300
                                    text-sm md:text-lg bg-orange-200 dark:bg-zinc-800 font-semibold">
                                <Link href={"/write/new_post/new"}>
                                    <button className="px-3 py-2">
                                        NEW POST
                                    </button>
                                </Link>
                            </div>
                        </div>
                        <div className="pt-12 px-4 text-xl lg:text-2xl 2xl:text-3xl font-semibold">
                            DRAFTS
                        </div>
                        <div className="grid grid-cols-1">
                            {drafts.length <= 0 &&
                                <div className="py-4 text-center md:text-lg 2xl:text-2xl font-fira-mono">
                                    <div>The first draft of anything is sh*t - Ernest Hemingway</div>
                                    <div>{"Pump out some first drafts and clarify your thoughts about stuff"}</div>
                                </div>
                            }
                            {drafts.map((draft) => (
                                <div key={draft._id}>
                                    <Link href={"/write/new_post/"+draft._id}>
                                        <div className="p-4 my-4 cursor-pointer hover:bg-orange-200 hover:dark:bg-zinc-800 rounded-lg">
                                            <div className="font-semibold md:text-lg lg:text-3xl 2xl:text-4xl">
                                                {draft.title}
                                            </div>
                                            <div className="md:text-lg 2xl:text-2xl text-amber-800 dark:text-orange-200">
                                                {"Last updated: " + draft.updatedAt}
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            ))}
                        </div>
                        <div className="grid grid-cols-1">
                        </div>
                        <div className="pt-12 px-4 text-xl lg:text-2xl 2xl:text-3xl font-semibold">
                            OLD POSTS
                        </div>
                        <div className="grid grid-cols-1">
                            {articles.length <= 0 &&
                                <div className="py-4 text-center md:text-lg 2xl:text-2xl font-fira-mono">
                                    <div>Your catalogue is empty :/</div>
                                    <div>{"Pick your pen and let's see your literary brilliance"}</div>
                                </div>
                            }
                            {articles.map((article) => (
                                <div key={article._id} className="border-b border-amber-900 dark:border-orange-300">
                                    <Link href={"/articles/" + article._id}>
                                    <div className="p-4 my-4 flex flex-row cursor-pointer hover:bg-orange-200 hover:dark:bg-zinc-800 rounded-lg">
                                        <div className="w-[65%] pr-2 md:pr-8">
                                            <div className="font-semibold md:text-lg lg:text-3xl 2xl:text-4xl">
                                                {article.title}
                                            </div>
                                            <div className="font-thin md:text-lg 2xl:text-2xl text-amber-800 dark:text-orange-200">
                                                {article.description}
                                            </div>
                                            <div className="pt-2 2xl:text-lg font-semibold text-sm">
                                                {getDateF(article.publishedDate)}
                                            </div>
                                        </div>
                                        <div className="w-[35%]">
                                        <div className="relative pt-[90%] md:pt-[56.25%] rounded-lg overflow-hidden">
                                            <div className="p-0 h-[100%]">
                                                <Image src={article.thumbnailSource} layout="fill" objectFit="cover" alt={article.thumbnailAlt} />
                                            </div>
                                        </div>
                                        </div>
                                    </div>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                }
                <Footer />
            </main>
        </div>
    );
};
