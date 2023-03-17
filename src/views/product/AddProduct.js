import React, { useState } from 'react'
import { Paper, Box, TextField, Button } from '@mui/material'

const Product = () => {
  const [nameProduct, setNameProduct] = useState('')
  const [price, setPrice] = useState('')
  return (
    <>
      <Paper elevation={3} style={paperStyle}>
        <Box
          component="form"
          sx={{
            '& > :not(style)': { m: 1 },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="standard-basic"
            label="Tên sản phẩm"
            variant="standard"
            fullWidth
            value={nameProduct}
            onChange={(e) => setNameProduct(e.target.value)}
          />
          <TextField
            id="standard-basic"
            label="Giá"
            variant="standard"
            fullWidth
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <Button variant="contained" disableElevation>
            Thêm
          </Button>
        </Box>
      </Paper>
    </>
  )
}

export default Product

const paperStyle = { padding: '50px 20px' }
