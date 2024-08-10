// este archivo no funciona por el nomrbe, es solo una demostracion

// https://docs.astro.build/en/guides/middleware/

import type { MiddlewareNext } from "astro";
import { defineMiddleware } from "astro:middleware";


const privateRoutes = ["/protected"]



// `context` and `next` are automatically typed
// export const onRequest = defineMiddleware(async (context, next) => {
export const onRequest = defineMiddleware(async ({ url, request }, next) => {

  // console.log("Ejecutando el Middleware")
  // console.log(context.url)

  const authHeaders = request.headers.get("Authorization") ?? ""
  console.log(authHeaders)

  if (privateRoutes.includes(url.pathname)) {
    return checkLocalAuth(authHeaders, next)

  }

  return next();

});


// el ojetivo de esta funcion que creamos es verificar lo que viene en los headers
const checkLocalAuth = (authHeaders: string, next: MiddlewareNext) => {


  if (authHeaders) {
    const authValue = authHeaders.split(' ').at(-1) ?? "user:pass"
    const decodedValue = atob(authValue).split(':')
    // console.log(decodedValue)
    const [user, password] = decodedValue
    // console.log(user, password)

    // aca podriamos verificar una base de datos, conectarse mediante TypeORM o Prisma, etc.
    if (user === 'admin' && password === 'admin') {
      return next()
    }
  }


  return new Response('Auth Required', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic',
    },
  })
}