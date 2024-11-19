import axios from "axios";

const tokenData = localStorage.getItem("Token");
const accesstokendata = tokenData ? JSON.parse(tokenData) : null;
console.log(accesstokendata);
const accessToken = accesstokendata?.value?.tokens?.accesstoken;
if (!accessToken) {
  console.error("Access token is missing or invalid");
}

const Tabledata = axios.create({
  baseURL: "https://sit-bnpl.saminray.com/",
  headers: {
    accept: "text/plain",
    BusinessKey: "1da5ce01-7491-44a2-a823-2f4734ef0aef",
    Authorization: `Bearer ${accessToken}`,
  },
});

Tabledata.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response.status === 401) {
      console.error("Unauthorized access - 401");
    }
    return Promise.reject(error);
  }
);

export default Tabledata;
