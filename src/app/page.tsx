import { getIronSession, SessionOptions } from "iron-session"
import { cookies } from "next/headers"

export const sessionOptions: SessionOptions = {
  password: "complex_password_at_least_32_characters_long",
  cookieName: "iron-examples-app-router-server-component-and-action",
  cookieOptions: {
    secure: false
  }
}

export interface SessionData {
  username: string
  isLoggedIn: boolean
}

export default async function Home() {
  const foo = await getIronSession<SessionData>(await cookies(), sessionOptions)
  return (
    <>
      <form
        action={async () => {
          "use server"
          const session = await getIronSession<SessionData>(
            await cookies(),
            sessionOptions
          )
          session.isLoggedIn = !session.isLoggedIn
          await session.save()
        }}
      >
        <input type="submit" value={foo.isLoggedIn ? "sign out" : "sign in"} />
      </form>
    </>
  )
}
