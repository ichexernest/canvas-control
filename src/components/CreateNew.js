import styled from "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft,faFile } from '@fortawesome/free-solid-svg-icons'
import React, {useState} from "react";
import { useForm } from "react-hook-form";
import { Link } from 'react-router-dom';
import FileUploader from "./FileUploader";
const Wrapper = styled.div`
max-height: 92vh;
height: 92vh;
width: 960px;
margin:0 auto;
display: flex;
flex-direction: column;

`;
const InputLabel = styled.label`

margin:10px 2px 2px;

`;
const NewBtn = styled.button`
background-color: var(--white);
border: 1px solid var(--white);
box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
transition: all 0.3s cubic-bezier(.25,.8,.25,1);
color: var(--primary);
padding: 5px 25px;
text-align: center;
text-decoration: none;
display: inline-block;
font-size: var(--fontBig);
margin: 15px 0px;
width:100px;
transition-duration: 0.4s;
cursor: pointer;
border-radius: 50px;
:hover{
box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
}
[disabled=disabled], :disabled {
background-color: var(--btnDisabledColor);
:hover{
    background-color: var(--btnDisabledColor);
    cursor:no-drop;
}
}
`;
const Title = styled.div`
font-size: var(--fontBig);
color: var(--primary);
margin: auto 10px;
`;
const InputContent = styled.div`
position: relative;
max-width: var(--maxWidth);
height: 32px;
width: 100%;
margin: 0 5px 10px;
border-radius: 8px;
border:1px solid var(--medGrey);
background-color: var(--white);
color: var(--darkGrey);
input{
font-size: var(--fontSmall);
position: absolute;
left: 0px;
margin: 6px 0;
padding: 0 0 0 20px;
border: 0;
width: 95%;
background: transparent;
height: 20px;
color: var(--darkGrey);
:focus{
outline:none;
}
}
`;
const UploadArea = styled.div`
display:flex;
justify-content:center;
align-items:center;
margin-bottom:20px;
label{
background-color: var(--white);
border: 2px dashed var(--primary);
border-radius:8px;
color: var(--primary);
display:flex;
flex-direction:column;
padding: 20px;
margin:15px;
width:100%;
text-align: center;
text-decoration: none;
display: inline-block;
font-size: 16px;
input{
    display:none;
}
p{color:var(--primary);
font-size:.8rem}
button{
    pointer-events: none;
    background-color: rgb(34, 20, 95);
    border: 1px solid rgb(124, 110, 185);
    color: white;
    padding: 5px 15px;
    height:34px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 4px 2px;
    transition-duration: 0.4s;
    cursor: pointer;
    border-radius: 5px;
    }
    :hover{
        cursor: pointer;
        background-color:var(--tableActionColor);
    }
}
}
`;
const CreateNew = () => {
    const [fileSName, setFileSName] = useState('');
    const [fileRName, setFileRName] = useState('');

    const { register, handleSubmit } = useForm();
    const onSubmit = (data) => {

        alert(JSON.stringify(data));
    };
    // const o = (e)=>{
    //     console.log(e.target.value);
    // }
    return (
        <>
            <Wrapper>
                <div style={{ display: 'flex' }}>
                    <Link to='/'>
                        <NewBtn><FontAwesomeIcon className="icon" icon={faArrowLeft} /></NewBtn>
                    </Link >
                    <Title>立案新增</Title>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <UploadArea>
                        <label>
                            <input {...register("source")} placeholder="source" type="file" onChange={(e)=>setFileSName(e.target.value)} />
                            <FontAwesomeIcon className="icon" icon={faFile} size="4x" />
                            <h3>來源文件</h3>
                            <p>{fileSName}</p>
                            <button>選擇檔案</button>
                        </label>
                        <label>
                            <input {...register("reference")} placeholder="reference" type="file" onChange={(e)=>setFileRName(e.target.value)} />
                            <FontAwesomeIcon className="icon" icon={faFile} size="4x" />
                            <h3>參考文件</h3>
                            <p>{fileRName}</p>
                            <button>選擇檔案</button>
                        </label>
                    </UploadArea>
                    <FileUploader />
                    <InputLabel>信箱</InputLabel>
                    <InputContent><input {...register("mail")} placeholder="mail" /></InputContent>
                    <InputLabel>說明</InputLabel>
                    <InputContent><input {...register("description")} placeholder="description" /></InputContent>
                    <InputLabel>上傳人</InputLabel>
                    <InputContent><input {...register("uploader")} placeholder="uploader" /></InputContent>
                    <InputLabel>上傳時間</InputLabel>
                    <InputContent><input {...register("uploadTime")} placeholder="uploadTime" /></InputContent>
                    <NewBtn type="submit">建立</NewBtn>
                </form>
            </Wrapper>
        </>
    );
}

export default CreateNew;
