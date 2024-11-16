import axios from "axios";

const Tabledata = axios.create({
  baseURL: "https://sit-parsian.saminray.com/Core/api/v1/Menu/GetAll",
  headers: {
    accept: "*/*",
    // BusinessKey: "1da5ce01-7491-44a2-a823-2f4734ef0aef",
  },
});

export default Tabledata;
