import { useState, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link as RouterLink } from 'react-router-dom'
import { useForm } from '../../hooks'
import { startAuthenticationSignIn } from '../../store/auth'


import { Link,Grid, TextField, Typography, Button, setRef, Alert } from '@mui/material'
import { AuthLayout } from '../layout/AuthLayout'


const formData = {
    email: '',
    password: '',
    displayName : ''
}

const formValidations = {
    email: [(value)=> value.includes('@'), 'El correo debe de tener un @'],
    password: [(value)=> value.length >= 6, 'La contraseña debe de contener almenos 6 caracteres'],
    displayName: [(value)=> value.length >= 1,'El nombre en Obligatorio']
}


export const RegisterPage = () => {
    
    const dispatch = useDispatch()
    const {status, errorMesagge} = useSelector(state=> state.auth)
    const [formSubmitted, setFormSubmitted] = useState(false)
    
    const isCheckingAuthentication = useMemo(
        ()=> status === 'checking', [status]
    )
    
    
    const {
        handleInputChange, 
        email, 
        password, 
        displayName,
        isFormValid,
        displayNameValid,
        passwordValid,
        emailValid,
        valores
    } = useForm(formData,formValidations)


    const onSubmit = (event)=>{

        event.preventDefault()
        setFormSubmitted(true)
        if(!isFormValid) return
        dispatch(startAuthenticationSignIn(valores))

    }

    

    return (
        <AuthLayout title={'Register'}>
            <form onSubmit={onSubmit} className='animate__animated animate__fadeIn animate__faster'>
                <Grid container>
                    <Grid item xs={12} sx={{ mt: 2 }}>
                        <TextField
                            label='Nombre Completo'
                            type='text'
                            placeholder='ej: Diego Lundstedt'
                            fullWidth
                            name='displayName'
                            value={displayName} 
                            onChange={handleInputChange}
                            error={!!displayNameValid && formSubmitted}
                            helperText={displayNameValid}
                            />
                    </Grid>
                    <Grid item xs={12} sx={{ mt: 2 }}>
                        <TextField
                            label='correo'
                            type='email'
                            placeholder='correo@google.com'
                            fullWidth
                            name='email'
                            value={email} 
                            onChange={handleInputChange}
                            error={!!emailValid && formSubmitted}
                            helperText={emailValid}
                        />
                    </Grid>
                    <Grid item xs={12} sx={{ mt: 2 }}>
                        <TextField
                            label='contraseña'
                            type='contraseña'
                            placeholder='contraseña'
                            fullWidth
                            name='password'
                            value={password} 
                            onChange={handleInputChange}
                            error={!!passwordValid && formSubmitted}
                            helperText={passwordValid}
                        />
                    </Grid>
                    <Grid item xs={12} display={!!errorMesagge ? '' : 'none'}>
                        <Alert severity='error'>
                            {errorMesagge}
                        </Alert>
                    </Grid>

                    <Grid container spacing={2} sx={{ mb: 2 }}>
                        <Grid item xs={12} sm={6} sx={{ mt: 2 }}>
                            <Button variant='contained' fullWidth type='submit' disabled={isCheckingAuthentication}>
                                Crear Cuenta
                            </Button>
                        </Grid>
                    </Grid>
                    <Grid container direction='row' justifyContent={'end'}>
                        <Link component={RouterLink} color={'inherit'} to="/auth/Login">¿Ya tienes una cuenta?</Link>
                    </Grid>
                </Grid>
            </form>
        </AuthLayout>
    )
}
