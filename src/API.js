import { getAuthToken } from "./Util";
// const BASE_URL='http://lbftcaivm01/FPGProcessService/DocSimilar/DocPage.asmx';
// const AUTH_URL='http://10.3.226.14/FPGSecurityService/UserAuthentication.asmx';
// const SEC_URL='http://10.3.226.14/FPGSecurityService/SecurityService.asmx';
// const APP_NAME ='canvas-control';
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
    const url = `${process.env.REACT_APP_BASE_URL}/FindCase`;
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
    const url = `${process.env.REACT_APP_BASE_URL}/GetAllPage`;
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
    const url = `${process.env.REACT_APP_BASE_URL}/ModifiedBoxPass`;
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
    const url = `${process.env.REACT_APP_BASE_URL}/CreateCase`;
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
    const url = `${process.env.REACT_APP_AUTH_URL}/Authenticate`;
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
    const url = `${process.env.REACT_APP_SEC_URL}/Login`;
    const bodyData = {
      'p_szUserID': userId,
      'p_szUserPassword': userPassword,
      'p_szApplicationName': process.env.REACT_APP_NAME,
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
  //   const url = `${process.env.REACT_APP_SEC_URL}/GetUser`;
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
