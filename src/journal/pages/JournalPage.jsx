import { AddOutlined } from "@mui/icons-material"
import { IconButton, Typography } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import { startNewNote } from "../../store/journal/thunks"
import { JournalLayout } from "../layout/JournalLayout"
import { NoteView } from "../view/NoteView"
import { NothingSelectedView } from "../view/NothingSelectedView"



export const JournalPage = () => {

    const { active,isSaving } = useSelector(state=> state.journal)
    const dispatch = useDispatch()  

    const onClickNewNote = () =>{
        dispatch(startNewNote())
    }

    return (
        <JournalLayout>
            {!!active ? <NoteView/> : <NothingSelectedView/>}
            <IconButton size='large'
                disabled={isSaving}
                onClick={onClickNewNote}
                sx={{
                    color:'white',
                    backgroundColor:'error.main',
                    ':hover': {backgroundColor:'error.main', opacity:0.9},
                    position:'fixed',
                    right:50,
                    bottom: 50
                }}

            >
                <AddOutlined sx={{fontSize:30}} />
            </IconButton>
        </JournalLayout>

    )
}
