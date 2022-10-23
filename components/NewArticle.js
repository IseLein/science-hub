import WriteNew from "./WriteNew";
import Recent from "./AuthorRecent";
import styles from "../styles/Write.module.css";

export default function NewArticle({ writer, page, articles }) {
    if (page == "new_article") {
        return(
            <div>
                <WriteNew writer={writer} />
            </div>
        )
    } else if (page == "edit_article") {
        return(
            <div>
                <Recent articles={articles} />
            </div>
        )
    } else {
        return(
            <div>
                Seems like you've misplaced yourself on this simple site. What a total dork you are :(
                It should be my responsibility to find you but you know what? just go back to the home page
                andfind yourself.
            </div>
        )
    }
}