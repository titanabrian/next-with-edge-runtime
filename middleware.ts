import { authMiddleware, useAuth } from "@clerk/nextjs"
import { NextResponse } from "next/server"

export const config = {
  runtime: 'experimental-edge',
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)","/","/(api|trpc)(.*)"]
}

export default  authMiddleware({
  publicRoutes: ['/'],
  afterAuth(auth, req) {
    if (!auth.isApiRoute) {
      return NextResponse.next()
    }

    if (!auth.sessionClaims) {
      return NextResponse.json({
        code: 'Unauthorized',
        message: 'You are not authorized to perform this request'
      }, {
        status: 500
      })
    }

    // Populate Necessary Information
    req.headers.set('User-Id', auth.sessionClaims?.user_id as string)
    req.headers.set('Username', auth.sessionClaims?.username as string)
  }
})
