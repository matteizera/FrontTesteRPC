import axios from 'axios'
const api = axios.create({
  baseURL: 'https://programacaorpc.herokuapp.com/schedule/',
})
export default api