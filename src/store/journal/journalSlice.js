import { createSlice } from '@reduxjs/toolkit';


const initialState = {

    isSaving : false,
    savedMessage: '',
    notes:[],
    active:null

}


export const journalSlice = createSlice({
    name: 'journal',
    initialState,
    reducers: {
        savingNewNote:(state,action)=>{
            state.isSaving = action.payload
        },
        addNewEmptyNote: (state,{payload}) => {
            state.notes.push(payload)
            state.savedMessage = false
        },
        setActiveNote:(state,{payload})=>{
            state.active = payload
            state.savedMessage = ''
        },
        setNotes:(state,action)=>{
            state.notes = action.payload
        },
        setSaving:(state,action)=>{
            state.isSaving = action.payload
            state.savedMessage = ''
        },
        uptdateNote:(state,action)=>{
            state.isSaving = false;
            state.notes = state.notes.map((note)=>{
                if(note.id === action.payload.id){
                    return action.payload
                }
                return note
            })
            state.savedMessage = `La nota: ${action.payload.title}, ha actualizada correctamente`
        },
        deleteNoteById:(state,action)=>{
            state.active = null
            state.notes = state.notes.filter(note=> note.id !== action.payload)
        },
        setPhotosToActiveNote:(state,action)=>{
            console.log(action.payload)
            state.active.imgURL = [...state.active.imgURL, ...action.payload]
        },
        clearNotes:(state)=>{
            state.isSaving = false,
            state.savedMessage='',
            state.notes=[],
            state.active=null
        }
    }
});


export const {addNewEmptyNote, setActiveNote, setNotes, setSaving, uptdateNote, deleteNoteById, savingNewNote, setPhotosToActiveNote, clearNotes} = journalSlice.actions;