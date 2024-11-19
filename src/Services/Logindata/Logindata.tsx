import axios from "axios";

const Tokendata = localStorage.getItem("Token");
let accessToken: string | null = null;

if (Tokendata) {
  try {
    const parsedTokenData = JSON.parse(Tokendata);
    console.log(parsedTokenData.value.tokens.accesstoken);
    
    accessToken = parsedTokenData.value.tokens?.accesstoken;
    console.log();
    
  } catch (error) {
    console.error("Error parsing token data:", error);
  }
}

const Logindata = axios.create({
  baseURL: "https://sit-bnpl.saminray.com/",
  headers: {
    accept: "text/plain",
    BusinessKey: "1da5ce01-7491-44a2-a823-2f4734ef0aef",
    "Content-Type": "application/json",
  },
});

Logindata.interceptors.request.use(
  (config) => {
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default Logindata;
