import styled from "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import React, { useState } from "react";
import { Link } from 'react-router-dom';
import FileUploader from "./FileUploader";
import ModalCard from "./ModalCard";
import API from '../API';
import { getAuthToken } from "../Util";
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
    const userLogin = JSON.parse(getAuthToken());
    const [inputs, setInputs] = useState({
        source: {},
        reference: {},
        mail: userLogin.d.Email,
        description: '',
        uploadTime: '',
        uploader: '',
    });
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);
    const [content, setContent] = useState("");
    const fetchCreateCase = async (formData) => {
        try {
            const iCount = await API.createCase(formData);
            console.log(`RETURN RESULT: ` + iCount);
            setContent("成功");
            setShow(true);
            setLoading(false);
        } catch (error) {
            // alert(error);
            setContent("失敗");
            setShow(true);
            setLoading(false);
        }
    };
    const convertDate = (date) => {
        let dt = new Date(date);
        let nowDate = `${dt.getFullYear().toString().padStart(4, '0')}${(dt.getMonth() + 1).toString().padStart(2, '0')}${dt.getDate().toString().padStart(2, '0')}${dt.getHours().toString().padStart(2, '0')}${dt.getMinutes().toString().padStart(2, '0')}${dt.getSeconds().toString().padStart(2, '0')}`;
        return nowDate;
    }
    const handleError = (error) => {
        setContent(error);
        setShow(true);
        setLoading(false);
    }
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        console.log(name, value, event.target)
        setInputs(values => ({ ...values, [name]: value }))
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        let submitData = inputs;
        submitData.uploadTime = convertDate(Date.now());
        submitData.uploader = userLogin.d.UserID;
        // console.log(submitData);
        console.log(JSON.stringify(submitData['source']));
        console.log(submitData['source']);
        console.log(submitData['source'].name);
        if (submitData.source.name === undefined) {
            alert(`擬校稿文件尚未上傳`);
            return;
        }
        if (submitData.reference.name === undefined) {
            alert(`參考文件尚未上傳`);
            return;
        }
        if (submitData.description === '') {
            alert(`未填寫說明`);
            return;
        }
        if (submitData.mail === '') {
            alert(`未填寫信箱`);
            return;
        }
        let formData = new FormData();
        for (var key in submitData) {
            formData.append(key, submitData[key]);
        }

        let oCase = {};
        oCase.mail = submitData.mail;
        oCase.uploader = submitData.uploader
        oCase.description = submitData.description;

        formData.append("source", submitData['source']);
        formData.append("ref", submitData['reference']);
        formData.append("p_oCase", JSON.stringify(oCase));

        console.log(submitData);
        setShow(true);
        setLoading(true);
        fetchCreateCase(formData);
    }

    return (
        <>
            <ModalCard show={show} setShow={setShow} content={content} showLoading={loading}></ModalCard>
            <Wrapper>
                <div style={{ display: 'flex' }}>
                    <Link to='/Home'>
                        <NewBtn><FontAwesomeIcon className="icon" icon={faArrowLeft} /></NewBtn>
                    </Link >
                    <Title>立案新增</Title>
                </div>
                <form onSubmit={handleSubmit}>
                    <FileUploader setInputs={setInputs}
                        onFileSelectError={({ error }) => handleError(error)} />
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
                    <NewBtn type="submit">建立</NewBtn>
                </form>
            </Wrapper>
        </>
    );
}

export default CreateNew;
