import { Box, Button, Container, Stack, TextField, Typography } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Header from './Header'
import Navbar from './Navbar'
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

const Task = () => {
    const [description, setDescription] = useState('')
    const [data, setData] = useState([]);

    //Header to auth 
    const token = JSON.parse(localStorage.getItem("token"));
    const headers = { Authorization: `Bearer ${token}` }

    const API_URL = 'https://api-nodejs-todolist.herokuapp.com'

    //build function to create task
    const createTask = () => {
        axios.post(`${API_URL}/task`, { description }, { headers: headers },).then
            (res => {
                // console.log(res);
                setDescription(' ')
                fetchData()
            })
    }


    //Show Tasks in the website
    const fetchData = async () => {
        await axios.get(`${API_URL}/task`, { headers: headers }).then

            (res => {
                setData(res.data.data)
                // console.log(res);

            })
    }

    //Delete Task with id
    const deleteTask = async (id) => {
        await axios.delete(`${API_URL}/task/${id}`, { headers: headers }).then

            (res => {
                console.log(res);
            })

    }

    useEffect(() => {
        fetchData()
    }, [deleteTask])





    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#fff' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));

    return (
        <>
            <Navbar />
            <Header />

            <Container>
                <Box sx={{ width: '70%', margin: 'auto' }}>
                    <TextField sx={{ my: 4 }}
                        label="Description"
                        id="standard-age-normal"
                        color='secondary'
                        variant="standard"
                        onChange={(e) => setDescription(e.target.value)}
                        fullWidth={true}
                        value={description}

                    />

                    <Button fullWidth={true} onClick={createTask} variant="contained" color='secondary' sx={{ mb: 4, borderRadius: '25px', px: 2, py: 1, }}>Create</Button>
                    {
                        data.map(item => {
                            return (
                                <Stack key={item._id}
                                    direction="row"
                                    justifyContent="space-around"
                                    alignItems="center"
                                    spacing={4}

                                >
                                    <Item><Typography >{item.description} </Typography></Item>
                                    <Item>
                                        <Stack
                                            direction="row"
                                            justifyContent="space-around"
                                            alignItems="center"
                                            spacing={4}

                                        >
                                            <Button color='secondary' >Edit</Button>
                                            <Button color='error' onClick={e => deleteTask(item._id)}> Delete</Button>
                                        </Stack>
                                    </Item>


                                </Stack>
                            )
                        })
                    }
                </Box>
            </Container>
        </>
    )
}

export default Task