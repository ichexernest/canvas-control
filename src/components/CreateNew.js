import styled from "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { React, useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { Link } from 'react-router-dom';
const CreateNew = () => {
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
    const { register, handleSubmit } = useForm();
    const onSubmit = (data) => {
        alert(JSON.stringify(data));
    };
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
                    <InputLabel>來源</InputLabel>
                    <InputContent><input {...register("source")} placeholder="source" type="file" /></InputContent>
                    <InputLabel>參考</InputLabel>
                    <InputContent><input {...register("reference")} placeholder="reference" type="file" /></InputContent>
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
