//import { getAuthToken } from "./Util";
import axios from "axios";
const BASE_URL=process.env.REACT_APP_BASE_URL;
//const AUTH_URL=process.env.REACT_APP_AUTH_URL;
const SEC_URL=process.env.REACT_APP_SEC_URL;
const APP_NAME=process.env.REACT_APP_NAME;
// const defaultConfig = {
//   method: 'POST',
//   headers: {
//     'Accept': 'application/json',
//     'Content-Type': 'application/json'
//   }
// };
// const uploadConfig={
//   method: 'POST',
//   headers:{
//     'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
//     'Content-Type': 'multipart/form-data'
//   }
// }

const apiSettings = {
  getCase: async (p_szSCrateDTime, p_szECrateDTime) => {
    const url = `${BASE_URL}/FindCase`;
    const bodyData = {
      'p_szSCreateDTime': p_szSCrateDTime,
      'p_szECreateDTime': p_szECrateDTime
    };
    const result=  await axios.post(url,bodyData);
    return result.data;
    
  },
  getPageList: async (caseNo, createDTime) => {
    const url = `${BASE_URL}/GetAllPage`;
    const bodyData = {
      'p_szCaseNo': caseNo,
      'p_szCreateDTime': createDTime
    };
    const result=  await axios.post(url,bodyData);
    return result.data;
  },
  modifiedBoxPass: async (caseNo, createDTime, page, boxIndex) => {
    const url = `${BASE_URL}/ModifiedBoxPass`;
    const bodyData = {
      'p_szCaseNo': caseNo,
      'p_szCreateDTime': createDTime,
      'p_iPage': page,
      'p_iBox': boxIndex,
    };
    const result=  await axios.post(url,bodyData);
    return result.data;
  },
  createCase: async (formData) => {
    const url = `${BASE_URL}/CreateCase`;
    // const bodyData = {
    // };
    const result=  await axios.post(url,formData,{
      headers: {
        'Content-Type': 'multipart/form-data'
      }
  });
    return result.data;
  },
  login: async (userId, userPassword)=>{
    const url = `${SEC_URL}/Login`;
    const bodyData = {
      'p_szUserID': userId,
      'p_szUserPassword': userPassword,
      'p_szApplicationName': APP_NAME,
    };
    const result=  await axios.post(url,bodyData).catch(function (error) {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log('Error', error.message);
      }
      console.log(error.config);
    });
    return result.data;
  },
  // authenticate: async (userId, userPassword)=>{
  //   const url = `${AUTH_URL}/Authenticate`;
  //   const bodyData = {
  //     'p_szUserID': userId,
  //     'p_szUserPassword': userPassword,
  //   };
  //   const data = await (
  //     await fetch(url, {
  //       ...defaultConfig,
  //       body: JSON.stringify(bodyData)
  //     })
  //   ).json();
  //   return await data;
  // },
  // getUser:async ()=>{
  //   const url = `${SEC_URL}/GetUser`;
  //   const token = getAuthToken();
  //   const data = await (
  //     await fetch(url, {
  //       headers: {
  //         authorization: `Bearer ${token}`,
  //       },
  //     })
  //   ).json().catch(err=>console.log(err));
  //   return await data;
  // },
  
};

export default apiSettings;
