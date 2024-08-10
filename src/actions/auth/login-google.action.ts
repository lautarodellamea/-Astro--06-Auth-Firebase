import { firebase } from '@/firebase/config';
import { defineAction, z } from 'astro:actions';
import { GoogleAuthProvider, signInWithCredential } from 'firebase/auth';

export const loginWithGoogle = defineAction({
  accept: 'json',
  input: z.any(),
  handler: async (credentials) => {

    const credential = GoogleAuthProvider.credentialFromResult(credentials);

    console.log(credential);

    if (!credential) {
      throw new Error('Google SignIn credential is null');
    };

    await signInWithCredential(firebase.auth, credential);

    return { ok: true };

  }
});