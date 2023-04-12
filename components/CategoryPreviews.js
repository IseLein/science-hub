import Link from "next/link";
import Image from "next/image";

export default function CategoryPreviews({ categories }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-8">
            {categories.map((category) => (
                <Link href={"/categories/" + category.slug} key={category._id}>
                    <div className="border border-gray-500 rounded-lg overflow-hidden cursor-pointer hover:shadow
                            shadow-orange-800 dark:shadow-orange-100 text-amber-900 dark:text-orange-300">
                        <div className="relative pt-[56.25%]">
                            <div className="p-0 h-[100%]">
                                <Image src={category.bannerImage} layout="fill" objectFit="cover" alt={category.category} />
                            </div>
                        </div>
                        <div className="py-3 px-4 flex flex-row justify-between font-bold text-lg lg:text-xl">
                            <div className="">
                                {category.category}
                            </div>
                            <div className="px-6 bg-orange-200 dark:bg-zinc-800 rounded-full">
                                {category.posts.length}
                            </div>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    )
};
