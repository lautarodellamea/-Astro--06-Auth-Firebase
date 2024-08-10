import { firebase } from '@/firebase/config';
import { defineAction, z } from 'astro:actions';
import { signOut } from 'firebase/auth';

// necesito tener acceso a algo por lo menos sino no puedo acceder al objeto context donde estan las cookies y demas
export const logout = defineAction({
  accept: 'json',
  handler: async (_, { cookies }) => {
    return await signOut(firebase.auth);
  }
});