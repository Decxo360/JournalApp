import { collection, doc, setDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import { fileUpload } from "../../helpers";
import { loadNotes } from "../../helpers/loadNotes";
import { addNewEmptyNote, savingNewNote, setActiveNote, setNotes, setPhotosToActiveNote, setSaving, uptdateNote } from "./journalSlice";

export const startNewNote = () => {
    return async(dispatch,getState)=>{
        dispatch(savingNewNote(true))

        const {uid} = getState().auth;
        const newNote = {
            title:'',
            body:'',
            date: new Date().getTime(),
        }

        const newDoc = doc(collection(FirebaseDB, `${uid}/journal/notes`))
        const response = await setDoc(newDoc,newNote);

        newNote.id = newDoc.id
        dispatch(addNewEmptyNote({newNote}))
        dispatch(setActiveNote(newNote))
    }
}

export const startLoadingNotes = () =>{
    return async(dispatch,getState)=>{

        const { uid } = getState().auth
        if(!uid) throw new Error('El UID del usuario no existe')
        const response = await loadNotes(uid);
        dispatch(setNotes(response));
    }
}

export const startSaveNote =()=>{
    return async(dispatch,getState)=>{
        const { uid } = getState().auth
        const { active:note } = getState().journal
        const noteToFireStore = {...note}
        delete noteToFireStore.id;
        
        const docRef = doc(FirebaseDB,`${uid}/journal/notes/${note.id}`);
        await setDoc(docRef,noteToFireStore,{merge:true})
        dispatch(uptdateNote(note))
    }
}

export const startUploadingFiles = (files = []) =>{
    return async(dispatch)=>{
        dispatch(setSaving(true));
        const fileUploadPromises = [];

        for (const file of files) {
            fileUploadPromises.push(fileUpload(file))
        }
        const photosUrls = await Promise.all(fileUploadPromises)
        dispatch(setPhotosToActiveNote(photosUrls));
    }
}