import Head from "next/head";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Navbar from "../../components/Navbar";
import SignInOut from "../../components/SignInOut";
import Footer from "../../components/Footer";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
const DraftEditor = dynamic(() => import("../../components/DraftEditor"), { ssr: false });
import { marked } from "marked";

export default function NewPost() {
    const { data: session } = useSession();
    const router = useRouter();

    const handleSubmit = async(event) => {
        event.preventDefault();

        const data = {
            title: event.target.title.value,
            author: event.target.author.value,
            categories: [event.target.category.value],
            description: event.target.description.value,
            content: event.target.content.value,
            thumbnailSource: event.target.src.value,
            thumbnailAlt: event.target.alt.value,
        };

        const endpoint = "/api/article/addArticle";
        const JSONdata = JSON.stringify(data);
        console.log(data);

        const options = {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSONdata,
        }


        const response = await fetch(endpoint, options);
        const result = await response.json();

        if (response.ok) {
            alert("New Post added successfully");
            router.push("/write/");
        } else {
            alert(result.error);
        }
    }

    const placeholderImg = "https://firebasestorage.googleapis.com/v0/b/science-hub-blog-2b481.appspot.com/o/placeholder-image.jpg?alt=media&token=46f99875-3a21-4be2-8d22-ef5df4cc708f";
    const [imageSrc, setImageSrc] = useState(placeholderImg);

    const defaultText = "Over to you..."
    const [marked_html, setMarkedText] = useState(defaultText)
    let updateContent = (md) => {
        // TODO: get to sanitize stuff here
        setMarkedText(marked(md))
    }

    useEffect(() => {
        // console.log(`${marked_html}`)
    }, [marked_html])

    return(
        <div>
            <Head>
                <title>New Post</title>
            </Head>
            <Navbar item={{
                name: "New Post",
                link: "",
            }}/>
            <div className="pt-28"></div>
            {session &&
                <div className="text-amber-900 dark:text-orange-300">
                    <div className="px-5 md:px-40 lg:px-72 2xl:px-[25rem] lg:text-xl">
                        <div className="my-4">
                            <input type="text"
                                className="px-2 py-2 w-full focus:outline-none
                                    placeholder-amber-700 dark:placeholder-orange-200 bg-orange-50 dark:bg-zinc-900 md:text-3xl font-fira-mono"
                                placeholder="Title..."
                            />
                        </div>
                        <div className="my-4">
                            <textarea
                                className="px-2 py-2 w-full focus:outline-none
                                    placeholder-amber-700 dark:placeholder-orange-200 bg-orange-50 dark:bg-zinc-900 md:text-2xl font-fira-mono"
                                placeholder="description..."
                                maxLength={90}
                            />
                        </div>
                        <div className="flex flex-row justify-between mt-8 mb-12 px-2">
                            <div className="pt-2 text-amber-700 dark:text-orange-200">
                                <div>
                                    <span className="font-bold">Thumbnail Image </span><span>{" - ideally 16:9 and < 150mb I won't check"} </span>
                                    <div className="text-sm">{"(not because it's plenty work to set that up but because I trust you :)"}</div>
                                </div>
                                <input required type="file" name="avatar" id="avatar" className="py-2 text-center md:text-left" accept="image/*"
                                    onChange={(e) => {setImageSrc(URL.createObjectURL(e.target.files[0]))}}
                                />
                                <input type="text"
                                    className="my-2 py-2 w-full focus:outline-none border-b text-amber-900 dark:text-orange-300
                                        placeholder-amber-700 dark:placeholder-orange-200 bg-orange-50 dark:bg-zinc-900 md:text-lg font-fira-mono"
                                    placeholder="thumbnail alt..."
                                />
                            </div>
                            <div className="w-[35%]">
                                <div className="relative pt-[90%] md:pt-[56.25%] rounded-lg overflow-hidden">
                                    <div className="p-0 h-[100%]">
                                        <Image src={imageSrc} layout="fill" objectFit="cover" alt={""} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <DraftEditor initialValue={defaultText} onChange={updateContent} />
                        <div className="my-8 md:text-3xl font-fira-mono text-center">Body Preview</div>
                        <article className="prose prose-iselein md:prose-lg lg:prose-xl font-jetbrains
                                dark:prose-invert max-w-none prose-code:font-jetbrains prose-img:rounded-lg
                                prose-code:bg-orange-100 prose-code:dark:bg-zinc-800 prose-img:mx-auto"
                            dangerouslySetInnerHTML={{ __html: marked_html }}>
                        </article>
                    </div>
                </div>
            }
            {!session && <SignInOut />}
            <Footer />
        </div>
    )
};
