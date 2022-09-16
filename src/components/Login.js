import { Box, Button, Container, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();


    const handleLogin = async () => {
        await axios.post('https://api-nodejs-todolist.herokuapp.com/user/login', {
            email, password
        })
            .then((response) => {
                if (response.data.token) {
                    console.log(response);
                    localStorage.setItem("token", JSON.stringify(response.data.token));
                    localStorage.setItem("user", JSON.stringify(response.data.user));
                    navigate("/");
                }

                return response.data;
            });


    }
    return (

        <Container maxWidth="sm">
            <Box sx={{ p: 2 }}>
                <Typography>Login</Typography>


                <TextField sx={{ my: 4 }}
                    label="Email"
                    placeholder="fill user Email"
                    onChange={(e) => setEmail(e.target.value)}
                    variant="standard"
                    fullWidth={true}
                    color='secondary'
                    type='email'
                />
                <TextField sx={{ my: 4 }}
                    label="Password"
                    placeholder="fill user password"
                    variant="standard"
                    color='secondary'
                    type='password'
                    onChange={(e) => setPassword(e.target.value)}
                    fullWidth={true}

                />

                <Button onClick={handleLogin} variant="contained" color='secondary' fullWidth={true} sx={{ mt: 3, borderRadius: '25px', p: 1 }}>Signup</Button>
                <Button variant="contained" color='primary' fullWidth={true} sx={{ my: 3, borderRadius: '25px', p: 1 }}><Link to='/register'>signup</Link></Button>

            </Box>
        </Container >
    )
}

export default Login