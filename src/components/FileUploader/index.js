// FileUploader.js
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFile } from '@fortawesome/free-solid-svg-icons'
import { UploadArea } from './FileUploader.styles';
const FileUploader = () => {
  const [fileSName, setFileSName] = useState('');
  const [fileRName, setFileRName] = useState('');
  const handleUpload = async (e) => {
    const name = e.target.name;
    // STEP 2: 得到該檔案的 Blob, i.e., e.target.files
    console.log(e.target.files[0]);
    const checkSize = returnFileSize(e.target.files[0].size);
    const checkType = validFileType(e.target.files[0]);
    if(!checkType) {
      alert('不允許的檔案類型')
      return;
    }
    if (name === 'source') setFileSName(e.target.files[0].name)
    else setFileRName(e.target.files[0].name)
    const arrayBuffer = await getArrayBuffer(e.target.files[0]);
    console.log('arrayBuffer', arrayBuffer, checkSize, checkType);
    //const response = await uploadFile(arrayBuffer, name);
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
  function uploadFile(arrayBuffer, name) {
    // return fetch(`https://api.foobar.io`, {
    //   method: 'POST',

    //   // STEP 6：使用 JSON.stringify() 包起來送出
    //   body: JSON.stringify({
    //     appId: 3,
    //     format: 'png',

    //     // STEP 4：轉成 Uint8Array（這是 TypedArray）
    //     // STEP 5：透過 Array.from 轉成真正的陣列
    //let icon= Array.from(new Uint8Array(arrayBuffer))
    //   }),
    // }).then((res)=> {
    //   if (!res.ok) {
    //     throw res.statusText;
    //   }
    //   return res.json()
    // })
    // .then(({ data }) => console.log('data', data))
    // .catch(err => console.log('err', err))
    console.log(`Here fetch the ${name} file`);
  }
  function returnFileSize(number) {
    if (number < 1024) {
      return `${number}bytes`;
    } if (number > 1024 && number < 1048576) {
      return `${(number / 1024).toFixed(1)}KB`;
    } if (number > 1048576) {
      return `${(number / 1048576).toFixed(1)}MB`;
    }
  }
  function validFileType(file) {
    const acceptFileTypes = ["image/jpeg", "image/png", "application/pdf"];
    const isValidFileType = acceptFileTypes.includes(file.type);
    return isValidFileType;
  }
  // STEP 1: 建立上傳表單
  return (
    // <input type="file" onChange={handleUpload}/>
    <UploadArea>
      <label>
        <input name="source" type="file" onChange={handleUpload} />
        <FontAwesomeIcon className="icon" icon={faFile} size="4x" />
        <h3>來源文件</h3>
        <p>{fileSName}</p>
        <button>選擇檔案</button>
      </label>
      <label>
        <input name="reference" type="file" onChange={handleUpload} />
        <FontAwesomeIcon className="icon" icon={faFile} size="4x" />
        <h3>參考文件</h3>
        <p>{fileRName}</p>
        <button>選擇檔案</button>
      </label>
    </UploadArea>
  )
}

export default FileUploader;