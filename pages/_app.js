import { SessionProvider } from "next-auth/react"
import { ThemeProvider } from "next-themes"
import { Analytics } from "@vercel/analytics/react"
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <ThemeProvider attribute="class">
        <Component {...pageProps} />
        <Analytics />
      </ThemeProvider>
    </SessionProvider>
  )
}

export default MyApp
