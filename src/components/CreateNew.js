import styled from "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import React, { useState } from "react";
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
const CreateNew = () => {
    const [inputs, setInputs] = useState({});
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        console.log(name, value, event.target)
        setInputs(values => ({ ...values, [name]: value }))
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        let formData = inputs;
        formData.uploadTime = convertDate(Date.now());
        console.log(formData);
    }

    const convertDate = (date) => {
        let dt = new Date(date);
        let nowDate = `${dt.getFullYear().toString().padStart(4, '0')}${(dt.getMonth() + 1).toString().padStart(2, '0')}${dt.getDate().toString().padStart(2, '0')}${dt.getHours().toString().padStart(2, '0')}${dt.getMinutes().toString().padStart(2, '0')}${dt.getSeconds().toString().padStart(2, '0')}`;
        return nowDate;
    }

    return (
        <>
            <Wrapper>
                <div style={{ display: 'flex' }}>
                    <Link to='/Home'>
                        <NewBtn><FontAwesomeIcon className="icon" icon={faArrowLeft} /></NewBtn>
                    </Link >
                    <Title>立案新增</Title>
                </div>
                <form onSubmit={handleSubmit}>
                    <FileUploader setInputs={setInputs}
                        onFileSelectError={({ error }) => alert(error)} />
                    <InputLabel>信箱</InputLabel>
                    <InputContent>
                        <input
                            type="text"
                            name="mail"
                            value={inputs.mail || ""}
                            onChange={handleChange}
                            placeholder="mail" />
                    </InputContent>
                    <InputLabel>說明</InputLabel>
                    <InputContent>
                        <input
                            type="text"
                            name="description"
                            value={inputs.description || ""}
                            onChange={handleChange}
                            placeholder="description" />
                    </InputContent>
                    <InputLabel>上傳人</InputLabel>
                    <InputContent>
                        <input
                            type="text"
                            name="uploader"
                            value={inputs.uploader || ""}
                            onChange={handleChange}
                            placeholder="uploader" />
                    </InputContent>
                    <NewBtn type="submit">建立</NewBtn>
                </form>
            </Wrapper>
        </>
    );
}

export default CreateNew;
