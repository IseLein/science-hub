import Head from "next/head";
import Image from "next/image";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Navbar from "../../../components/Navbar";
import SignInOut from "../../../components/SignInOut";
import Footer from "../../../components/Footer";
import Custom404 from "../../404";
import dbConnect from "../../../util/dbConnect";
import Draft from "../../../models/Draft";
import Author from "../../../models/Author";
import Category from "../../../models/Category";
import { useEffect, useState } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../../util/firebase";
import { v4 as uuidv4 } from "uuid";
import dynamic from "next/dynamic";
const DraftEditor = dynamic(() => import("../../../components/DraftEditor"), { ssr: false });
import { marked } from "marked";
import slugify from "slugify";

export async function getServerSideProps(context) {
    const id = context.params.id
    const session = await getSession(context);

    console.log(id);

    if (!session) {
        return {
            redirect: {
                destination: "../",
                permanent: false,
            },
            /* props: {
                draft: "SignInErr",
                author: "SignInErr",
            }, */
        };
    }

    try {
        const author_slug = slugify(session.user.name, {lower: true});
        await dbConnect();
        const author = await Author.findOne({ username: author_slug });
        const categories = await Category.find();
        if (id === "new") {
            return {
                props: {
                    draft: id,
                    author: JSON.parse(JSON.stringify(author)),
                    allCategories: JSON.parse(JSON.stringify(categories)),
                }
            }
        }
        const draft = await Draft.findById(id); // Query the database
        return {
          props: {
            draft: JSON.parse(JSON.stringify(draft)),
            author: JSON.parse(JSON.stringify(author)),
            allCategories: JSON.parse(JSON.stringify(categories)),
          },
        };
    } catch (error) {
        return {
            props: { draft: null, author: JSON.stringify(error) },
        };
    }
}

export default function NewPost({ draft, author, allCategories }) {
    const { data: session } = useSession();
    const router = useRouter();

    let defaultTitle = "";
    let defaultDesc = "";
    let defaultContent = "**Over to you**"
    let placeholderImg = "https://firebasestorage.googleapis.com/v0/b/science-hub-blog-2b481.appspot.com/o/placeholder-image.jpg?alt=media&token=46f99875-3a21-4be2-8d22-ef5df4cc708f";
    let defaultAlt = "";
    let defaultCat = [];

    if (draft && draft !== "new") {
        if (draft.title) { defaultTitle = draft.title; }
        if (draft.description) { defaultDesc = draft.description; }
        if (draft.content) { defaultContent = draft.content; }
        if (draft.thumbnailSource) { placeholderImg = draft.thumbnailSource; }
        if (draft.thumbnailAlt) { defaultAlt = draft.thumbnailAlt; }
        if (draft.categories) { defaultCat = draft.categories; }
    } else {
        console.log("We're NOT doing something right");
    }

    const handlePublish = async(event) => {
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

    const [imageSrc, setImageSrc] = useState(placeholderImg);
    const [imageFile, setImageFile] = useState(null);

    const [contentMD, setContentMD] = useState(defaultContent)
    const [contentHTML, setContentHTML] = useState(marked(contentMD))
    let updateContent = (md) => {
        // TODO: get to sanitize stuff here
        setContentMD(md);
        setContentHTML(marked(md));
    }

    useEffect(() => {
        // console.log(`${contentHTML}`)
    }, [contentHTML])

    const [title, setTitle] = useState(defaultTitle);
    const [desc, setDesc] = useState(defaultDesc);
    const [thumbnailAlt, setThumbnailAlt] = useState(defaultAlt);
    const [categories, setCategories] = useState(defaultCat);

    useEffect(() => {
        for (let cat of categories) {
            let c_box = document.getElementById(cat);
            if (c_box) {
                c_box.checked = true;
            }
        }
    })

    if (!draft) {
        return <Custom404 />
        // return <div>{author}</div>
    }

    const handleSave = async() => {
        let cats = [];
        for (let cat of allCategories) {
            const box = document.getElementById(cat.category);
            if (box.checked) {
                cats.push(cat.category);
            }
        }
        setCategories(cats);

        if (title === "") {
            alert("You should have a placeholder title to save a draft");
            return;
        }

        let data = {
            title: title,
            description: desc,
            content: contentMD,
            author: author.name,
            thumbnailAlt: thumbnailAlt,
            categories: cats,
        };

        if (imageFile && imageSrc.slice(0, 5) !== "https") {
            let fileUrl = null;
            const thumbnailRef = ref(storage, `thumbnails/${uuidv4()}`)
            await uploadBytes(thumbnailRef, imageFile);
            fileUrl = await getDownloadURL(thumbnailRef);

            if (fileUrl === null) {
                alert("An error occured while saving this draft. Try again later");
                return;
            }
            data["thumbnailSource"] = fileUrl;
            setImageSrc(fileUrl);
        } else if (imageSrc !== placeholderImg) {
            data["thumbnailSource"] = imageSrc;
        }

        // console.log(data)
        if (draft === "new") {
            const endpoint = "/api/article/addDraft";
            const JSONdata = JSON.stringify(data);
            const options = {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSONdata,
            };
            const response = await fetch(endpoint, options);
            const result = await response.json();

            if (response.ok) {
                alert("Draft is saved");
                router.push(`/write/new_post/${result.draft._id}`);
            } else {
                alert(result.error);
            }
        } else {
            const endpoint = "/api/article/updateDraft";
            const upd_data = {
                draft_id: draft._id,
                updates: data,
            };
            const JSONdata = JSON.stringify(upd_data);
            const options = {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSONdata,
            };
            console.log(options);
            const response = await fetch(endpoint, options);
            const result = await response.json();

            if (response.ok) {
                alert("Draft is saved");
            } else {
                alert(result.error);
            }
        }
    }

    return(
        <div>
            <Head>
                <title>New Post</title>
            </Head>
            <Navbar item={{
                name: "New Post",
                link: "/write",
            }}/>
            <div className="pt-28"></div>
            {session &&
                <div className="text-amber-900 dark:text-orange-300">
                    <div className="px-5 md:px-40 lg:px-72 2xl:px-[25rem] lg:text-xl">
                        <div className="flex flex-row justify-end">
                            <button onClick={handleSave} className="mr-3 px-3 py-2 text-center rounded-lg w-fit text-sm md:text-lg bg-orange-200 dark:bg-zinc-800 font-semibold">SAVE</button>
                            <button className="px-3 py-2 text-center rounded-lg w-fit text-sm md:text-lg bg-orange-200 dark:bg-zinc-800 font-semibold">PUBLISH</button>
                        </div>
                        <div className="my-4">
                            <input type="text" id="title"
                                className="px-2 py-2 w-full focus:outline-none border-b focus:border-amber-900 focus:dark:border-orange-300 font-semibold
                                    placeholder-amber-700 dark:placeholder-orange-200 bg-orange-50 dark:bg-zinc-900 md:text-3xl font-fira-mono"
                                placeholder="Title..."
                                maxLength={90}
                                onChange={(e) => {setTitle(e.target.value)}}
                                defaultValue={title}
                            />
                        </div>
                        <div className="my-4">
                            <textarea id="desc"
                                className="px-2 py-2 w-full focus:outline-none border-b focus:border-amber-900 focus:dark:border-orange-300
                                    placeholder-amber-700 dark:placeholder-orange-200 bg-orange-50 dark:bg-zinc-900 md:text-2xl font-fira-mono"
                                placeholder="description..."
                                maxLength={150}
                                onChange={(e) => {setDesc(e.target.value)}}
                                defaultValue={desc}
                            />
                        </div>
                        <div className="flex flex-row justify-between mt-8 mb-12 px-2">
                            <div className="pt-2 text-amber-700 dark:text-orange-200 w-[60%] overflow-hidden">
                                <div>
                                    <span className="font-bold">Thumbnail Image </span><span>{" - ideally 16:9 and < 150mb I won't check"} </span>
                                    <div className="text-sm">{"(not because it's plenty work to set that up but because I trust you :)"}</div>
                                </div>
                                <input required type="file" name="avatar" id="avatar" className="py-2 text-center md:text-left" accept="image/*"
                                    onChange={(e) => { setImageSrc(URL.createObjectURL(e.target.files[0])); setImageFile(e.target.files[0]) }}
                                />
                                <input type="text" id="thumbnailAlt"
                                    className="my-2 py-2 w-full focus:outline-none border-b text-amber-900 dark:text-orange-300 focus:border-amber-900 focus:dark:border-orange-300
                                        placeholder-amber-700 dark:placeholder-orange-200 bg-orange-50 dark:bg-zinc-900 md:text-lg font-fira-mono"
                                    placeholder="thumbnail alt..."
                                    onChange={(e) => {setThumbnailAlt(e.target.value)}}
                                    defaultValue={thumbnailAlt}
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
                        <div className="my-4 grid grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-2">
                            {allCategories.map((category) => (
                                <div key={category._id} className="p-2 bg-orange-200 dark:bg-zinc-800 rounded-lg flex flex-row align-middle">
                                    <input type="checkbox" id={category.category} className="mx-2" />
                                    <label htmlFor={category.category} className="flex-1 text-center overflow-hidden" >{category.category}</label>
                                </div>
                            ))}
                        </div>
                        <DraftEditor initialValue={contentMD} onChange={updateContent} />
                        <div className="my-8 md:text-3xl font-fira-mono text-center">Body Preview</div>
                        <article className="prose prose-iselein md:prose-lg lg:prose-xl font-jetbrains
                                dark:prose-invert max-w-none prose-code:font-jetbrains prose-img:rounded-lg
                                prose-code:bg-orange-100 prose-code:dark:bg-zinc-800 prose-img:mx-auto"
                            dangerouslySetInnerHTML={{ __html: contentHTML }}>
                        </article>
                    </div>
                </div>
            }
            {!session && <SignInOut />}
            <Footer />
        </div>
    )
};
