import { useMemo, useRef, useEffect} from "react"
import { useSelector,useDispatch } from "react-redux"
import { setActiveNote, setSaving } from "../../store/journal/journalSlice"
import { startSaveNote, startUploadingFiles } from "../../store/journal/thunks"

import { useForm } from "../../hooks/useForm"
import { Button, Grid, IconButton, TextField, Typography } from "@mui/material"
import { SaveOutlined, UploadOutlined } from '@mui/icons-material'
import { ImageGallery } from "../components"
import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.css'


export const NoteView = () => {

  const {active, savedMessage, isSaving} = useSelector(state => state.journal)
  const {date,imgURL,body,title, handleInputChange, valores} =useForm(active,{});
  const dispatch = useDispatch()

  const dateString = useMemo(()=>{

    const newDate = new Date ( date )
    return newDate.toUTCString();

  },[date])

  const onSaveChanges = () =>{
    dispatch(startSaveNote())
    dispatch(setSaving(true));
  }

  useEffect(() => {
    dispatch(setActiveNote(valores))
  }, [valores])

  useEffect(()=>{
    if(savedMessage.length > 0){
      Swal.fire('Nota Actualizada', savedMessage, 'success')
    }
  },[savedMessage])
  
  const onFileInputChange = ({target}) =>{
    console.log(target.files);
    if(target.files === 0) return;
    dispatch(startUploadingFiles(target.files));
  }

  const fileInputRef = useRef()

  return (
    <Grid container direction={'row'} alignItems='center' justifyContent='space-between' sx={{ mb: 1 }} className='animate__animated animate__fadeIn animate__faster'>
      <Grid item>
        <Typography fontSize={39} fontFamily={'light'}>{dateString}</Typography>
      </Grid>
      <Grid item>

        <input 
          ref={fileInputRef} 
          style={{display:'none'}} 
          type='file' 
          multiple 
          onChange={onFileInputChange} />

        <IconButton color='primary' disabled={isSaving} onClick={()=> fileInputRef.current.click()}>
          <UploadOutlined/>
        </IconButton>

        <Button color='primary' sx={{ padding: 2 }} onClick={onSaveChanges}>
          <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
          Guardar
        </Button>
      </Grid>
      <Grid container>
        <TextField
          type='text'
          variant="filled"
          fullWidth
          placeholder="Ingrese un Titulo"
          label='Titulo'
          name='title'
          value={title}
          onChange={handleInputChange}
          sx={{ border: 'none', mb: 1 }}
        />
        <TextField
          type='text'
          variant="filled"
          fullWidth
          multiline
          placeholder="Que sucedio el dia de hoy"
          name="body"
          value={body}
          onChange={handleInputChange}
          minRows={5}
        />
      </Grid>
      <ImageGallery images={active.imgURL} />

    </Grid>
  )
}
