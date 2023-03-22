import React, { useEffect, useState } from 'react'

import {
  Paper,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Toolbar,
  Typography,
  Checkbox,
  IconButton,
  Tooltip,
  Popover,
  TextField,
  Button,
  Autocomplete,
} from '@mui/material'
import { CFormInput } from '@coreui/react'
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import PropTypes from 'prop-types'
import { alpha } from '@mui/material/styles'
import { visuallyHidden } from '@mui/utils'
import axios from 'axios'

const domainName = 'https://thecoffeehousebe-production.up.railway.app'

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1
  }
  if (b[orderBy] > a[orderBy]) {
    return 1
  }
  return 0
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy)
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index])
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0])
    if (order !== 0) {
      return order
    }
    return a[1] - b[1]
  })
  return stabilizedThis.map((el) => el[0])
}

const headCells = [
  {
    id: 'id',
    position: 'left',
    disablePadding: true,
    sort: true,
    label: 'ID',
  },
  {
    id: 'name',
    position: 'left',
    disablePadding: false,
    sort: true,
    label: 'Tên sản phẩm',
  },
  {
    id: 'category',
    position: 'left',
    disablePadding: false,
    sort: true,
    label: 'Danh mục',
  },
  {
    id: 'price',
    position: 'left',
    disablePadding: false,
    sort: true,
    label: 'Giá',
  },
  {
    id: 'describe',
    position: 'left',
    disablePadding: false,
    sort: false,
    label: 'Mô tả',
  },
  {
    id: 'image',
    position: 'right',
    disablePadding: false,
    sort: false,
    label: 'Ảnh',
  },
]

function EnhancedTableHead(props) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property)
  }

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={
              headCell.position === 'right'
                ? 'right'
                : headCell.position === 'center'
                ? 'center'
                : 'left'
            }
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            {headCell.label}
            {headCell.sort ? (
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}
              >
                {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </Box>
                ) : null}
              </TableSortLabel>
            ) : (
              <></>
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
}

var selectedIndexGLobal

function EnhancedTableToolbar(props) {
  const { numSelected } = props
  const [anchorEl, setAnchorEl] = useState(null)
  const [name, setName] = useState()
  const [price, setPrice] = useState()
  const [description, setDescription] = useState()
  const [category, setCategory] = useState()
  const [categories, setCategories] = useState([])
  const [base64, setBase64] = useState()
  const [products, setProducts] = useState([])

  const defaultProps = {
    options: categories.map((option) => option.name),
  }

  const handleChangeImageInput = (e) => {
    let reader = new FileReader()
    reader.readAsDataURL(e.target.files[0])
    reader.onload = () => {
      setBase64(reader.result)
    }
  }

  const handleClickAdd = () => {
    axios.post(`${domainName}/api/v1/products/add`, {
      name: name,
      categoryId: categories.filter((e) => e.name === category)[0].id,
      price: price,
      description: description,
      image: base64,
    })
  }

  const handleClickDelete = () => {
    // axios.delete(`${domainName}/api/v1/products`, { data: selectedIndexGLobal })
    axios.delete(`${domainName}/api/v1/products/${selectedIndexGLobal[0]}`, {
      data: selectedIndexGLobal,
    })
  }

  const handleClickOpenEdit = (event) => {
    setAnchorEl(event.currentTarget)
    const productEdit = products.filter((e) => e.id === parseInt(selectedIndexGLobal[0]))[0]
    setName(productEdit.name)
    setCategory(categories.filter((e) => e.id === productEdit.categoryId)[0].name)
    setPrice(productEdit.price)
    setDescription(productEdit.description)
    setBase64(productEdit.image)
  }

  const handleClickEdit = () => {
    const id = selectedIndexGLobal[0]
    axios.put(`${domainName}/api/v1/products/${id}`, {
      name: name,
      categoryId: categories.filter((e) => e.name === category)[0].id,
      price: price,
      description: description,
      image: base64,
    })
  }

  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${domainName}/api/v1/categories`)
        const res_1 = await axios.get(`${domainName}/api/v1/products`)
        setCategories(res.data)
        setProducts(res_1.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [])

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography sx={{ flex: '1 1 100%' }} color="inherit" variant="subtitle1" component="div">
          {numSelected} Lựa chọn
        </Typography>
      ) : (
        <></>
      )}

      {numSelected === 1 ? (
        <Tooltip title="Sửa">
          <div>
            <IconButton onClick={handleClickOpenEdit}>
              <EditIcon />
            </IconButton>
            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={() => setAnchorEl(null)}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
            >
              <Paper elevation={3} style={{ padding: '35px 40px', minWidth: 800 }}>
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
                  <Autocomplete
                    {...defaultProps}
                    fullWidth
                    value={category}
                    onChange={(event, newValue) => {
                      setCategory(newValue)
                    }}
                    renderInput={(params) => (
                      <TextField {...params} label="Danh mục" variant="standard" />
                    )}
                  />
                  <TextField
                    id="standard-basic"
                    label="Giá (đ)"
                    variant="standard"
                    fullWidth
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    type="number"
                  />
                  <TextField
                    id="filled-multiline-flexible"
                    label="Mô tả sản phẩm"
                    fullWidth
                    multiline
                    variant="filled"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                  <img src={base64} alt={name} width={100} />
                  <CFormInput type="file" onChange={handleChangeImageInput} accept="image/*" />
                  <Button variant="contained" onClick={handleClickEdit}>
                    Sửa
                  </Button>
                </Box>
              </Paper>
            </Popover>
          </div>
        </Tooltip>
      ) : (
        <></>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Xóa">
          <IconButton onClick={handleClickDelete}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Thêm">
          <div>
            <IconButton onClick={(event) => setAnchorEl(event.currentTarget)}>
              <AddIcon />
            </IconButton>
            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={() => setAnchorEl(null)}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
            >
              <Paper elevation={3} style={{ padding: '35px 40px', minWidth: 800 }}>
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
                  <Autocomplete
                    {...defaultProps}
                    fullWidth
                    value={category}
                    onChange={(event, newValue) => {
                      setCategory(newValue)
                    }}
                    renderInput={(params) => (
                      <TextField {...params} label="Danh mục" variant="standard" />
                    )}
                  />
                  <TextField
                    id="standard-basic"
                    label="Giá (đ)"
                    variant="standard"
                    fullWidth
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    type="number"
                  />
                  <TextField
                    id="filled-multiline-flexible"
                    label="Mô tả sản phẩm"
                    fullWidth
                    multiline
                    variant="filled"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                  <CFormInput type="file" onChange={handleChangeImageInput} />
                  <Button variant="contained" disableElevation onClick={handleClickAdd}>
                    Thêm
                  </Button>
                </Box>
              </Paper>
            </Popover>
          </div>
        </Tooltip>
      )}
    </Toolbar>
  )
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
}

const Product = () => {
  const [order, setOrder] = useState('asc')
  const [orderBy, setOrderBy] = useState('id')
  const [selected, setSelected] = useState([])
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [rows, setRows] = useState([])
  const [categories, setCategories] = useState([])

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.id)
      setSelected(newSelected)
      return
    }
    setSelected([])
  }

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id)
    let newSelected = []

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id)
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1))
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      )
    }

    selectedIndexGLobal = newSelected.toString().split(',')
    setSelected(newSelected)
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const isSelected = (id) => selected.indexOf(id) !== -1

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${domainName}/api/v1/categories`)
        const res_1 = await axios.get(`${domainName}/api/v1/products`)
        setRows(res_1.data)
        setCategories(res.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [])

  console.log(domainName)

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size={'medium'}>
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.id)
                  const labelId = `enhanced-table-checkbox-${index}`

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.id)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.id}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            'aria-labelledby': labelId,
                          }}
                        />
                      </TableCell>
                      <TableCell component="th" id={labelId} scope="row" padding="none">
                        {row.id}
                      </TableCell>
                      <TableCell align="left">{row.name}</TableCell>
                      <TableCell align="left">
                        {categories.filter((e) => e.id === row.categoryId)[0].name}
                      </TableCell>
                      <TableCell align="left">{row.price}</TableCell>
                      <TableCell align="left">{row.description}</TableCell>
                      <TableCell align="right">
                        <img src={row.image} width={100} alt={row.name} />
                      </TableCell>
                    </TableRow>
                  )
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 53 * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 20]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  )
}

export default Product
