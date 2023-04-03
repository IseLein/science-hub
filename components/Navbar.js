import Link from "next/link";
import { useTheme } from "next-themes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon } from "@fortawesome/free-solid-svg-icons";
import { faSun } from "@fortawesome/free-solid-svg-icons";

export default function Navbar({ item }) {
    const { systemTheme, theme, setTheme } = useTheme();
    const currentTheme = theme === 'system' ? systemTheme:theme;

    let modeIcon = faSun;
    if (currentTheme === 'dark') {
        modeIcon = faMoon;
    }

    return (
        <div id="bg-opacity-30" className="flex flex-row py-4 px-4 fixed z-50
            text-orange-300 bg-orange-50 dark:bg-black bg-opacity-30
            min-w-full backdrop-filter backdrop-blur-lg border-b
            border-gray-900">
        <Link href={"/"}>
            <div className="cursor-pointer">
                <svg className="fill-orange-300" version="1.0" xmlns="http://www.w3.org/2000/svg"
                 width="20.000000pt" height="20.000000pt" viewBox="0 0 50.000000 50.000000"
                 preserveAspectRatio="xMidYMid meet">

                <g transform="translate(0.000000,50.000000) scale(0.100000,-0.100000)"
                stroke="none">
                <path d="M232 443 c-52 -74 -46 -112 28 -162 28 -19 53 -45 56 -58 6 -23 7
                -23 34 14 55 76 48 106 -36 163 -25 18 -49 41 -53 52 -7 20 -9 19 -29 -9z"/>
                <path d="M157 261 c-25 -43 -21 -58 23 -89 21 -15 40 -34 40 -42 1 -21 50 36
                50 59 0 13 -82 101 -94 101 -1 0 -9 -13 -19 -29z"/>
                <path d="M125 80 c-4 -6 9 -10 30 -10 28 0 38 -5 42 -20 4 -16 14 -20 53 -20
                39 0 49 4 53 20 4 15 14 20 42 20 21 0 34 4 30 10 -4 6 -57 10 -125 10 -68 0
                -121 -4 -125 -10z"/>
                </g>
                </svg>
            </div>
        </Link>
        <Link href={item.link}>
            <div className="px-2 font-sans font-bold text-lg cursor-pointer" href="/">
                {item.name}
            </div>
        </Link>
        <div className="flex-1"></div>
        <button onClick={() => currentTheme === 'dark'
            ? setTheme('light')
            : setTheme('dark')}>
            <FontAwesomeIcon icon={modeIcon} />
        </button>
        </div>
    )
}
