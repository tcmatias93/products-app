import axios from "axios";
// Conectar mediante envs vars, Android e IOS

const productsApi = axios.create({
  baseURL: "localhost:3000/api",
});

// Interceptores

export { productsApi };
