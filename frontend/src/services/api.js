import axios from "axios";
import server from "../environment";
const API = axios.create({
  baseURL: {server}
});

export default API;
