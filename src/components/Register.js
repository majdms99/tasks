import { Box, Button, Container, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';

const Register = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [age, setAge] = useState('');
    const navigate = useNavigate();


    const handleSignup = async (e) => {
        await axios.post('https://api-nodejs-todolist.herokuapp.com/user/register', {
            email, name, password, age
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
                <Typography>Register</Typography>

                <TextField sx={{ my: 4 }}
                    label="Name"
                    onChange={(e) => setName(e.target.value)}
                    placeholder="fill user name"
                    multiline
                    variant="standard"
                    fullWidth={true}
                    color='secondary'


                />
                <TextField sx={{ my: 4 }}
                    label="Email"
                    placeholder="fill user Email"
                    onChange={(e) => setEmail(e.target.value)}
                    variant="standard"
                    fullWidth={true}
                    color='secondary'
                />
                <TextField sx={{ my: 4 }}
                    label="Password"
                    placeholder="fill user password"
                    variant="standard"
                    fullWidth={true}
                    color='secondary'
                    type='password'
                    onChange={(e) => setPassword(e.target.value)}

                />
                <TextField sx={{ my: 4 }}
                    label="Age"
                    placeholder="fill user age"
                    color='secondary'
                    variant="standard"
                    fullWidth={true}
                    onChange={(e) => setAge(e.target.value)}

                />
                <Button onClick={handleSignup} variant="contained" color='secondary' fullWidth={true} sx={{ mt: 3, borderRadius: '25px', p: 1 }}>Signup</Button>
                <Button variant="contained" color='primary' fullWidth={true} sx={{ my: 3, borderRadius: '25px', p: 1 }}> <Link to='/login'>Already have account ? signin</Link> </Button>

            </Box>
        </Container >
    )
}

export default Register