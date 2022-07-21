import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
import { logout } from "../store/auth";
import { FirebaseAuth } from "./config";

const googleProvider = new GoogleAuthProvider();

export const singInWithgoogle = async () => {
    try {
        const result = await signInWithPopup(FirebaseAuth, googleProvider);
        const credentials = GoogleAuthProvider.credentialFromResult(result);
        const { displayName, email, photoURL, uid } = result.user

        return {
            ok: true,
            displayName,
            email,
            photoURL,
            uid
        }


    } catch (error) {

        const errorCode = error.code;
        const errorMessage = error.message;

        return {
            ok: false,
            errorMessage
        }
    }
}

export const register = async({email,password,displayName}) =>{

    try {

        const response = await createUserWithEmailAndPassword(FirebaseAuth,email,password);
        const {uid,photoURL,} = response.user
        await updateProfile(FirebaseAuth.currentUser, {displayName})
        return {
            ok: true,
            uid,
            photoURL
        }
        
    } catch (error) {
        
        console.log(error);

        return {
            ok: false,
            errorMessage: error.message
        }
    }

}

export const logIn = async({email,password})=>{

    console.log({email,password});

    try {

        const response = await signInWithEmailAndPassword(FirebaseAuth, email, password)
        const {uid, photoURL,displayName} = response.user

        return {
            ok:true,
            uid,
            photoURL,
            displayName
        }

    } catch (error) {
        return {
            ok:false,
            errorMessage: error.errorMessage
        }
    }
}

export const LogOut = async() =>{
    return await FirebaseAuth.signOut()
}