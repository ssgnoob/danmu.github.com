import axios from 'axios'

let instance = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 1000,
  headers: {'Content-Type': 'http://localhost:3000'}
})

export default  instance
