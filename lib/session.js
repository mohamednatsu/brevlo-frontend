import { IronSession } from 'iron-session'

export const sessionOptions = {
       password: process.env.SESSION_SECRET || "redyrtheee3322",
       cookieName: 'auth-session',
       cookieOptions: {
              secure: process.env.NODE_ENV === 'production',
              sameSite: 'strict',
              httpOnly: true,
       },
}

export async function getSession(req, res) {
       const session = await IronSession.getSession(req, res, sessionOptions)
       return session
}

export async function createSession(user, req, res) {
       const session = await getSession(req, res)
       session.user = user
       await session.save()
       return session
}

export async function destroySession(req, res) {
       const session = await getSession(req, res)
       session.destroy()
}