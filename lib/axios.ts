import axios from 'axios'

const http = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
})

// http.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     if (error.response && error.response.data) {
//       return Promise.reject(new AppError(error.response.data.message))
//     }

//     return Promise.reject(
//       new AppError('Erro no servidor. Tente novamente mais tarde.'),
//     )
//   },
// )

export default http
