import React, { useEffect, useState } from 'react'
import { Paper, Box, TextField, Button } from '@mui/material'
import axios from 'axios'

const Product = () => {
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [result, setResult] = useState()

  const handleClick = (e) => {
    e.preventDefault()
    axios
      .post('http://localhost:8080/api/v1/products/add', {
        name: name,
        price: price,
      })
      .then((res) => {
        setResult(res.data)
      })
  }

  useEffect(() => {
    // axios.post('http://localhost:8080/api/v1/products/add', {
    //   name: name,
    //   price: price,
    // })
  })

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
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            id="standard-basic"
            label="Giá"
            variant="standard"
            fullWidth
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <Button variant="contained" disableElevation onClick={handleClick}>
            Thêm
          </Button>
        </Box>
      </Paper>
    </>
  )
}

export default Product

const paperStyle = { padding: '50px 20px' }
