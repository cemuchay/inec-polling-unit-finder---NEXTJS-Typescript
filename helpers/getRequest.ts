import axios from "axios";

const getRequest = async  (url: string) => {
   axios
      .get(url)
      .then((res) => {
         return { success: true, data: res.data };
      })
      .catch((err) => {
         return { success: false, data: err };
      });
};

export default getRequest;
