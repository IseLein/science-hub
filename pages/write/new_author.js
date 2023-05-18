import Head from "next/head";
import { useSession } from "next-auth/react";
import { useRouter } from 'next/router';
import Navbar from "../../components/Navbar";
import SignInOut from "../../components/SignInOut";
import Footer from "../../components/Footer";
import slugify from "slugify";
import React, { useState } from "react";
import Image from "next/image";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../util/firebase";

export default function NewPost() {
    const { data: session } = useSession();
    const router = useRouter();

    const placeholderImg = "https://firebasestorage.googleapis.com/v0/b/science-hub-blog-2b481.appspot.com/o/avatars%2FMale-placeholder.jpeg?alt=media&token=0f36372d-e5b4-4246-b6d1-22b0cbc0383c";
    const [imageSrc, setImageSrc] = useState(placeholderImg);
    const [name, setName] = useState("John Doe");

    const handleSubmit = async(event) => {
        event.preventDefault();

        if (imageSrc == placeholderImg) {
            alert("Upload an image");
            return;
        }

        const username = event.target.username.value;
        const file = event.target.avatar.files[0];

        console.log(username);

        let fileUrl = null;
        const avatarRef = ref(storage, `avatars/${username}`);
        console.log(avatarRef);
        await uploadBytes(avatarRef, file);

        fileUrl = await getDownloadURL(avatarRef);

        if (fileUrl === null) {
            alert("An error occured uploading the image");
            return;
        }

        console.log(fileUrl);


        const data = {
            name: event.target.name.value,
            avatar: fileUrl,
            username: username,
        };

        const endpoint = "/api/article/addAuthor";
        const JSONdata = JSON.stringify(data);

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
            alert("New contibutor added");
            router.push("/write/");
        } else {
            alert(result.error);
        }
    }


    return(
        <div>
            <Head>
                <title>New Contributor</title>
            </Head>
            <Navbar item={{
                name: "New Contributor",
                link: "",
            }}/>
            {session && 
                <div className="flex justify-center">
                <div className="pt-28 px-5 md:px-24 lg:px-52 2xl:px-72 text-amber-900 dark:text-orange-300">
                    <div className="pb-6">
                        <div className="flex justify-center">
                            <div className="pt-1 text-sm lg:text-lg pb-6 font-sans flex flex-row items-center justify-center w-fit
                                    border-b border-amber-900 dark:border-orange-300">
                                <div className="pr-4 items-center">
                                    <Image className="rounded-full" src={imageSrc} width={40} height={40} alt={""} objectFit={"cover"} />
                                </div>
                                <div className="pr-8 md:pr-24 lg:pr-48">
                                <span className="font-semibold">{name + " "}</span>
                                <div className="text-sm">
                                    {"@" + slugify(session.user.name, {lower: true})}
                                </div>
                                </div>
                                <SignInOut />
                            </div>
                        </div>
                    </div>
                    <form onSubmit={handleSubmit} className="">
                        <div className="font-jetbrains md:text-xl lg:text-2xl py-2 text-center">
                            <label htmlFor="avatar" className="pr-4">Avatar:</label>
                            <input required type="file" name="avatar" id="avatar" className="pl-2 text-center md:text-left" accept="image/*"
                                onChange={(e) => {setImageSrc(URL.createObjectURL(e.target.files[0]))}}
                            />
                        </div>
                        <div className="font-jetbrains md:text-xl lg:text-2xl py-2 text-center">
                            <label htmlFor="name" className="pr-4">Display name:</label>
                            <input required type="text" name="name" id="name" className="pl-2 border-b text-center md:text-left"
                                onChange={(e) => {setName(e.target.value)}}>
                            </input>
                        </div>
                        <div className="font-jetbrains md:text-xl lg:text-2xl py-2 text-center">
                            <label htmlFor="username" className="pr-4">Username:</label>
                            <input required type="text" name="username" id="username" className="pl-2 border-b text-center md:text-left" value={slugify(session.user.name, {lower: true})} readOnly></input>
                        </div>
                        <div className="py-4 flex justify-center md:text-xl">
                            <div className="w-fit rounded-lg bg-orange-200 dark:bg-zinc-800">
                            <button className="px-5 py-2" type="submit">SAVE</button>
                            </div>
                        </div>
                    </form>
                </div>
                </div>
            }
            {!session &&
                <div className="pt-28">
                    <SignInOut />
                </div>
            }
            <Footer />
        </div>
    )
};
