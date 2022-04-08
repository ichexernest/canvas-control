const BASE_URL='http://lbftcaivm01/FPGProcessService/DocSimilar/DocPage.asmx';
const defaultConfig = {
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
};

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
};

export default apiSettings;
