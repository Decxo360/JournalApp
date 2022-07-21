import { TurnedInNot } from '@mui/icons-material'
import { Grid, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { setActiveNote } from '../../store/journal/journalSlice'


export const SideBarItem = ({note}) => {

    const dispatch = useDispatch();

    const newTitle = useMemo(()=>{
        return note.title.length > 17
            ? note.title.substring(0,17) + '...'
            : note.title
    },[note.title])

    const newBody = useMemo(()=>{
        return note.body.length > 40 
            ?   note.body.substring(0,40) + '...'
            :   note.body
    },[note.body])


    const onActiveNote=()=>{
        const active = {
            id: note.id,
            title: note.title,
            body: note.body,
            date: note.date,
            imgURL:[]
        }
        dispatch(setActiveNote(active))
    }

    return (
        <ListItem disablePadding>
            <ListItemButton onClick={onActiveNote}>
                <ListItemIcon>
                    <TurnedInNot />
                </ListItemIcon>
                <Grid container>
                    <ListItemText primary={newTitle} />
                    <ListItemText secondary={newBody} />
                </Grid>
            </ListItemButton>
        </ListItem>
    )
}
