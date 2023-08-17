import { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link as RouterLink, useNavigate } from 'react-router-dom'

import { Link,Grid, TextField, Typography, Button } from '@mui/material'
import { Google } from '@mui/icons-material'
import { AuthLayout } from '../layout/AuthLayout'
import { useForm } from '../../hooks'
import { startGoogleSigIn, startLogin } from '../../store/auth'

const formData = {
    email:'',
    password:''
}

export const LoginPage = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {status} = useSelector(state => state.auth)

    const {handleInputChange,reset, valores, } = useForm(formData,{})

    const {email,password} = valores

    const isAuthenticating = useMemo( () => status === 'checking', [status])

    const onSubmit = (event) =>{
        event.preventDefault();
        dispatch(startLogin({email,password}))
        if(status !== 'Authenticated') return
        navigate('/',{replace:true})
    }

    const onGoogleSignIn = () => {
        dispatch(startGoogleSigIn())
        if(status !== 'Authenticated') return
        navigate('/',{replace:true})
    }

    return (
        <AuthLayout title={'Login'}>
                <form onSubmit={onSubmit} className='animate__animated animate__fadeIn animate__faster'>
                    <Grid container>
                        <Grid item xs={12} sx={{mt:2}}>
                            <TextField 
                                label='correo' 
                                type='email' 
                                placeholder='correo@google.com'
                                fullWidth
                                name='email'
                                value={email}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={12} sx={{mt:2}}>
                            <TextField 
                                label='contraseña' 
                                type='contraseña' 
                                placeholder='contraseña'
                                fullWidth
                                name='password'
                                value={password}
                                onChange={handleInputChange}
                            />
                        </Grid>

                        <Grid container spacing={2} sx={{mb:2}}> 
                            <Grid item xs={12} sm={6} sx={{mt:2}}>
                                <Button variant='contained' type='submit' fullWidth disabled={isAuthenticating}>
                                    Login
                                </Button>
                            </Grid>
                            <Grid item xs={12} sm={6} sx={{mt:2}}>
                                <Button variant='contained' fullWidth disabled={isAuthenticating} onClick={onGoogleSignIn}>
                                    <Google>
                                        <Typography sx={{ml:1}}>Goolge</Typography>
                                    </Google>
                                </Button>
                            </Grid>
                        </Grid>

                        <Grid container direction='row' justifyContent={'end'}>
                            <Link component={RouterLink} color={'inherit'} to="/auth/register">Crear una cuenta</Link>
                        </Grid>
                    </Grid>
                </form>
        </AuthLayout>
    )
}
