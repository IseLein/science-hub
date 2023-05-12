import Head from "next/head";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Navbar from "../../components/Navbar";
import SignInOut from "../../components/SignInOut";
import Footer from "../../components/Footer";
import { useEffect, useState } from "react";
import { Editor } from "@toast-ui/react-editor";
import '@toast-ui/editor/dist/toastui-editor.css';

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

    const [content, setContent] = useState("flowzzzz");
    let updateContent = () => {
        let contentEl = document.getElementById("content")
        contentEl.textContent = content
    }

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
                <div>
                    <div className="px-10 md:px-28 lg:px-48 lg:text-xl">
                        <Editor
                            initialValue={content}
                            previewStyle="tab"
                            height="600px"
                            initialEditType="wysiwyg"
                            useCommandShortcut={true}
                            theme="dark"
                            onChange={(e) => {
                                setContent(e.target.value);
                                updateContent();
                            }}
                        />
                        <div id="content"></div>
                    </div>
                </div>
            }
            {!session && <SignInOut />}
            <Footer />
        </div>
    )
};
