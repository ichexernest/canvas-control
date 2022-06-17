import { getAuthToken } from "./Util";
const BASE_URL=process.env.REACT_APP_BASE_URL;
const AUTH_URL=process.env.REACT_APP_AUTH_URL;
const SEC_URL=process.env.REACT_APP_SEC_URL;
const APP_NAME=process.env.REACT_APP_NAME;
const defaultConfig = {
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
};
const uploadConfig={
  method: 'POST',
  headers:{
    'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
    'Content-Type': 'multipart/form-data'
  }
}

const apiSettings = {
  getCase: async (p_szSCrateDTime, p_szECrateDTime) => {
    const url = `${BASE_URL}/FindCase`;
    const bodyData = {
      'p_szSCreateDTime': p_szSCrateDTime,
      'p_szECreateDTime': p_szECrateDTime
    };
    const data = await (
      await fetch(url, {
        ...defaultConfig,
        body: JSON.stringify(bodyData)
      })
    ).json();
    return await data;
  },
  getPageList: async (caseNo, createDTime) => {
    const url = `${BASE_URL}/GetAllPage`;
    const bodyData = {
      'p_szCaseNo': caseNo,
      'p_szCreateDTime': createDTime
    };
    const data = await (
      await fetch(url, {
        ...defaultConfig,
        body: JSON.stringify(bodyData)
      })
    ).json();
    return await data;
  },
  modifiedBoxPass: async (caseNo, createDTime, page, boxIndex) => {
    const url = `${BASE_URL}/ModifiedBoxPass`;
    const bodyData = {
      'p_szCaseNo': caseNo,
      'p_szCreateDTime': createDTime,
      'p_iPage': page,
      'p_iBox': boxIndex,
    };
    const data = await (
      await fetch(url, {
        ...defaultConfig,
        body: JSON.stringify(bodyData)
      })
    ).json();
    return await data;
  },
  createCase: async (formData) => {
    const url = `${BASE_URL}/CreateCase`;
    // const bodyData = {
    // };
    const data = await (
      await fetch(url, {
        ...uploadConfig,
        body:formData
      })
    ).json();
    return await data;
  },
  authenticate: async (userId, userPassword)=>{
    const url = `${AUTH_URL}/Authenticate`;
    const bodyData = {
      'p_szUserID': userId,
      'p_szUserPassword': userPassword,
    };
    const data = await (
      await fetch(url, {
        ...defaultConfig,
        body: JSON.stringify(bodyData)
      })
    ).json();
    return await data;
  },
  login: async (userId, userPassword)=>{
    const url = `${SEC_URL}/Login`;
    const bodyData = {
      'p_szUserID': userId,
      'p_szUserPassword': userPassword,
      'p_szApplicationName': APP_NAME,
    };
    const data = await (
      await fetch(url, {
        ...defaultConfig,
        body: JSON.stringify(bodyData)
      })
    ).json();
    return await data.d;
  },
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
