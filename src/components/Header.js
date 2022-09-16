import { Box, Container, Typography } from '@mui/material'
import React from 'react'

const Header = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    return (
        <Container>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', bgcolor: '#ffcc80', p: 4, mt: 4, }}>
                <Typography sx={{ minWidth: 150 }}>Welcome Back! {user.name}</Typography>
            </Box>
        </Container>
    )
}

export default Header