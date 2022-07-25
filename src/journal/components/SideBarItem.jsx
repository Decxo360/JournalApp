import { TurnedInNot } from '@mui/icons-material'
import { Grid, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { setActiveNote } from '../../store/journal/journalSlice'


export const SideBarItem = ({title = '', body='', id, date, imgURL=[]}) => {

    const dispatch = useDispatch();

    const newTitle = useMemo(()=>{
        return title.length > 17
            ? title.substring(0,17) + '...'
            : title
    },[title])

    const newBody = useMemo(()=>{
        return body.length > 40 
            ?   body.substring(0,40) + '...'
            :   body
    },[body])


    const onActiveNote=()=>{
        dispatch(setActiveNote({title,body,id,date,imgURL}))
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
