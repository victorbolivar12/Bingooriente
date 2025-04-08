import { NextResponse } from 'next/server';

export function middleware(req) {
    const adminToken = req.cookies.get('adminToken')?.value;

    if (!adminToken || adminToken !== process.env.ADMIN_SECRET) {
        return NextResponse.redirect(new URL('/unauthorized', req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/admin/:path*'],
};
