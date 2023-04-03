import Link from "next/link";
import Image from "next/image";

function getDateF(date) {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const year = parseInt(date.substring(0, 4));
    const month = parseInt(date.substring(5, 7)) - 1;
    const day = parseInt(date.substring(8, 10));
    return months[month]+ " " + day + ", " + year;
}

export default function Previews({ articles }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-8">
            {articles.map((article) => (
                <Link href={"/articles/" + article._id} key={article._id}>
                    <div className="border border-gray-500 rounded-lg overflow-hidden cursor-pointer hover:shadow
                            shadow-orange-800 dark:shadow-orange-100 text-amber-900 dark:text-orange-300">
                        <div className="relative pt-[56.25%]">
                            <div className="p-0 h-[100%]">
                                <Image src={article.thumbnailSource} layout="fill" objectFit="cover" alt={article.thumbnailAlt} />
                            </div>
                        </div>
                        <div className="p-4">
                            <div className="grid grid-cols-3 gap-2">
                                {article.categories.map((category, index) => (
                                    <Link href={"/"} key={index}>
                                        <div className="px-2 truncate bg-orange-300 dark:bg-zinc-700 text-center font-semibold
                                            rounded dark:text-orange-200">
                                            {category.toString()}
                                        </div>
                                    </Link>
                                ))}
                            </div>
                            <div className="pt-2 font-sans text-xl font-semibold">
                                {article.title}
                            </div>
                            <div className="pt-2 text-amber-800 dark:text-orange-200 font-light">
                                <span>{article.author + " "}</span>
                                &bull;
                                <span>{" " + getDateF(article.publishedDate) + " "}</span>
                                &bull;
                                <span>{" " + article.readTime}</span>
                            </div>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    )
};
