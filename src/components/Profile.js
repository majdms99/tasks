import { Box, Button, Container, TextField } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import React, { useState } from 'react'
import Navbar from './Navbar'

const Profile = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [age, setAge] = useState(user.age);
    const [password, setPassword] = useState(user.password);
    const navigate = useNavigate();

    const data = { name, email, password, age }

    const token = JSON.parse(localStorage.getItem("token"));
    const headers = { Authorization: `Bearer ${token}` }

    const URL_API = 'https://api-nodejs-todolist.herokuapp.com/user/me'
    //update info function
    const updateInfo = async () => {
        await axios.put(URL_API, data, { headers: headers }).then

            (res => {
                if (res.status === 200) {
                    localStorage.setItem("user", JSON.stringify(res.data.data));
                    navigate("/");
                }
            })
        // navigate("/"))
    }


    const deleteAcount = async () => {

        await axios.delete(URL_API, { headers: { Authorization: `Bearer ${token}` } }).then

            (res => {
                if (res.status === 200) {
                    localStorage.removeItem("user");
                    localStorage.removeItem("token");

                    navigate("/");
                }
            })

    }
    return (
        <>
            <Navbar />
            <Container>
                <Box
                    component="form"

                    md={{
                        '& .MuiTextField-root': { m: 4, width: '55ch' }, p: 4,
                    }}
                    sx={{
                        '& .MuiTextField-root': { m: 4, width: '90%' }, p: 4,
                    }}
                >
                    <TextField sx={{ my: 4 }}
                        label="Name"
                        id="standard-name-normal"
                        color='secondary'
                        variant="standard"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    // fullWidth={true}

                    />
                    <TextField sx={{ my: 4 }}
                        label="Age"
                        id="standard-age-normal"
                        color='secondary'
                        value={age}
                        variant="standard"
                        onChange={(e) => setAge(e.target.value)}
                    // fullWidth={true}

                    />
                    <TextField sx={{ my: 4 }}
                        label=" Password"
                        id="standard-p-normal"
                        color='secondary'
                        type='password'
                        variant="standard"
                        // value={password}
                        fullWidth={true}

                    />
                    <TextField sx={{ my: 4 }}
                        label="New Password"
                        id="standard-npp-normal"
                        color='secondary'
                        variant="standard"
                        onChange={(e) => setPassword(e.target.value)}
                        type='password'

                    />
                    <TextField
                        label="Email"
                        id="standard-email-normal"
                        type='email'
                        color='secondary'
                        variant="standard"
                        defaultValue={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Box>
                <Box sx={{ display: 'flex', justifyContent: "center", alignItems: 'center' }}>

                    <Button onClick={updateInfo} variant="contained" color='secondary' sx={{ m: 2, borderRadius: '25px', px: 2, py: 1, width: '150px' }}>Save</Button>
                    <Button onClick={deleteAcount} variant="contained" color='error' sx={{ m: 2, borderRadius: '25px', px: 2, py: 1, width: '180px' }}>Delete Account</Button>
                </Box>


            </Container>
        </>
    )
}

export default Profile