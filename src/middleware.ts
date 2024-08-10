// https://docs.astro.build/en/guides/middleware/

import type { MiddlewareNext } from "astro";
import { defineMiddleware } from "astro:middleware";
import { firebase } from "./firebase/config";


const privateRoutes = ["/protected"]

const notAuthenticatedRoutes = ["/login", "/register"]



// `context` and `next` are automatically typed
// export const onRequest = defineMiddleware(async (context, next) => {
export const onRequest = defineMiddleware(async ({ url, request, locals, redirect }, next) => {

  const isLoggedIn = !!firebase.auth.currentUser
  const user = firebase.auth.currentUser

  // aca podriamos consultar alguna propiedad del usuario como el rol por ejemplo
  // const isAdmin = ...

  // para que TS no se queje con el isLoggedIn debo hacer una modificacion en el archivo env.d.ts
  locals.isLoggedIn = isLoggedIn


  if (user) {
    locals.user = {
      avatar: user.photoURL ?? "",
      email: user.email!,
      name: user.displayName!,
      emailVerified: user.emailVerified
    }
  }


  if (!isLoggedIn && privateRoutes.includes(url.pathname)) {
    return redirect("/")
  }

  if (isLoggedIn && notAuthenticatedRoutes.includes(url.pathname)) {
    return redirect("/protected")
  }


  return next();

});

