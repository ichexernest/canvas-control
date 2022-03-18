// FileUploader.js
import React from 'react';

async function handleUpload(e) {

  // STEP 2: 得到該檔案的 Blob, i.e., e.target.files
  const arrayBuffer = await getArrayBuffer(e.target.files[0]);
  console.log('arrayBuffer', arrayBuffer);

  const response = await uploadFile(arrayBuffer);
  console.log('response', response);
}

function getArrayBuffer(file) {
  return new Promise((resolve, reject) => {
    // STEP 3: 轉成 ArrayBuffer, i.e., reader.result
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      resolve(reader.result);
    });
    reader.readAsArrayBuffer(file);
  })
}

function uploadFile(arrayBuffer) {
  return fetch(`https://api.foobar.io`, {
    method: 'POST',

    // STEP 6：使用 JSON.stringify() 包起來送出
    body: JSON.stringify({
      appId: 3,
      format: 'png',

      // STEP 4：轉成 Uint8Array（這是 TypedArray）
      // STEP 5：透過 Array.from 轉成真正的陣列
      icon: Array.from(new Uint8Array(arrayBuffer)),
    }),
  }).then((res)=> {
    if (!res.ok) {
      throw res.statusText;
    }
    return res.json()
  })
  .then(({ data }) => console.log('data', data))
  .catch(err => console.log('err', err))
}

const FileUploader = () => {

  // STEP 1: 建立上傳表單
  return (
    <input type="file" onChange={handleUpload}/>
  )
}

export default FileUploader;