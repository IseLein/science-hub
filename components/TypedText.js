import { useEffect, useRef } from "react";
import Typed from "typed.js";

export default function TypedText() {
    const typedIntro = useRef(null);

    useEffect(() => {
        const typed = new Typed(typedIntro.current, {
            strings: [
                "stay curious",
                "continue reading",
                "keep reflecting",
            ],
            startDelay: 300,
            typeSpeed: 100,
            backSpeed: 100,
            backDelay: 100,
            loop: true,
        })

        return () => {
            typed.destroy();
        };
    }, []);

    return(
        <span ref={typedIntro}></span>
    );
};