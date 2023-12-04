import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  pages: {
    signIn: '/',
  },
  providers: [
    // added later in auth.ts since it requires bcrypt which is only compatible with Node.js
    // while this file is also used in non-Node.js environments
  ],
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnHome = nextUrl.pathname.startsWith('/home');
      
      if (isOnHome) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } 
      return true;
    },
  },
} satisfies NextAuthConfig;
