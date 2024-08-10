import { defineAction, z } from 'astro:actions';
import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile, type AuthError } from 'firebase/auth';
import { firebase } from '@/firebase/config';

export const registerUser = defineAction({
  accept: 'form',
  input: z.object({
    name: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(6),
    remember_me: z.boolean().optional()
  }),
  handler: async ({ name, email, password, remember_me }, { cookies }) => {
    // console.log({ name, email, password, remember_me })




    // Cookies
    // para recordar el email
    if (remember_me) {
      cookies.set("email", email, {
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365), // 365 days
        path: "/" // el path es el punto donde esta cookie tendra control, puedo poner cookies que funcionen en ciertos paths, ene ste caso funcionara en todo el sitio, esta cookie sera valida para todo lo que sea qu empiece con el "/"
      })
    } else {
      cookies.delete("email", {
        path: "/"
      })
    }


    // Creacion de un usuario
    try {

      const user = await createUserWithEmailAndPassword(
        firebase.auth,
        email,
        password
      );


      // Actualizar el nombre (displayName de firebase)
      updateProfile(firebase.auth.currentUser!, {
        displayName: name
      });


      // Verificar correo electronico
      await sendEmailVerification(firebase.auth.currentUser!, {
        url: `${import.meta.env.WEBSITE_URL}/protected?emailVerified=true`
      })

      return user

    } catch (error) {
      // console.log(error)

      const firebaseError = error as AuthError

      if (firebaseError.code === "auth/email-already-in-use") {

        throw new Error("El correo ya existe");
      }

      throw new Error("Error al crear el usuario");

    }

    return { ok: true, msg: "Usuario creado" };
  }
});



// el input es el todo el objeto producto de la validacion (en este caso podriamos desestructurar {email, name, etc}) y luego tenemos el argumento context, donde tenemos acceso a los locals, cookies y demas por eso podemos desestructurarlo
// handler: async (input, context) => {