const header = {
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
}

export default header
