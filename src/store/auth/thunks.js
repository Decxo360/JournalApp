import { logIn, LogOut, register, singInWithgoogle } from "../../firebase/providers";
import { clearNotes } from "../journal/journalSlice";
import { checkingCredentials, login, logout } from "./authSlice"

export const checkingAuthentication = (email, password) =>{

    return async(dispatch)=>{
        dispatch(checkingCredentials());
    }

}
export const startGoogleSigIn = ()=>{
    return async(dispatch)=>{
        dispatch(checkingCredentials('checking'));
        const result = await singInWithgoogle();
        
        if (!result.ok) return dispatch(logout(result.errorMessage))
        
        dispatch(login(result))
        dispatch(checkingCredentials('Authenticated'));
    }
}
export const startAuthenticationSignIn = ({email,password,displayName}) =>{
    return async(dispatch)=>{

        dispatch(checkingCredentials('checking'))
        const {uid,photoURL, ok, errorMessage} = await register({email,password,displayName});

        if (!ok) return dispatch(logout({errorMessage}))

        dispatch(login({email,password,displayName, uid, photoURL}))
        dispatch(checkingCredentials('Authenticated'));

    }
}

export const startLogin = ({email,password}) =>{
    console.log({email,password});
    return async(dispatch)=>{
        dispatch(checkingCredentials('checking'))
        const {uid, photoURL,displayName , errorMessage, ok} = await logIn({email,password});
        if (!ok) return dispatch(logout({errorMessage}))
        dispatch(login({uid,displayName,photoURL,email}))
        dispatch(checkingCredentials('Authenticated'))
    }
}

export const startLogOut = () =>{
    return async(dispatch)=>{
        await LogOut()
        dispatch(logout({}))
        dispatch(clearNotes());
        dispatch(checkingCredentials('Not Authenticated'))
    }
}