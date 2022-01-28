import styled from "styled-components";
import { React, useEffect, useState, useRef } from "react";
const useForceUpdate = () => useState()[1];
const CreateNew = () => {
    const Wrapper = styled.div`
        max-height: 92vh;
        height: 92vh;
        width: 960px;
        margin:0 auto;
        display: flex;
        flex-direction: column;
    `;
    const InputContent = styled.div`
    position: relative;
    max-width: var(--maxWidth);
    width: 100%;
    height: 40px;
    border-radius: 8px;
    border:1px solid var(--medGrey);
    background-color: var(--white);
    color: var(--darkGrey);
    input{
        font-size: var(--fontMed);
        position: absolute;
        left: 0;
        margin:8px 0;
        padding: 0 0 0 10px;
        border: 0;
        width: 95%;
        background: transparent;
        height: 25px;
        color: var(--darkGrey);
        :focus{
        outline:none;
        }
    }
    :focus-within{
        border: 2px solid var(--btnActionColor);
        box-shadow:  0 0 3px var(--listActionColor), 0 0 5px var(--listActionColor);
    }
    `;
    const Button = styled.button`
    background-color: rgb(34, 20, 95);
    border: 1px solid rgb(124, 110, 185);
    color: white;
    padding: 5px 15px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 4px 2px;
    transition-duration: 0.4s;
    cursor: pointer;
    border-radius: 5px;
    :hover{
        background-color: var(--btnActionColor);
    }
    [disabled=disabled], :disabled {
        background-color: var(--btnDisabledColor);
        :hover{
            background-color: var(--btnDisabledColor);
            cursor:no-drop;
        }
    }
    `;
    const fileInput = useRef(null);
    const forceUpdate = useForceUpdate();

    useEffect(e => {
        window.addEventListener("keyup", clickFileInput);
        return () => window.removeEventListener("keyup", clickFileInput);
    });

    function clickFileInput(e) {
        if (fileInput.current.nextSibling.contains(document.activeElement)) {
            // Bind space to trigger clicking of the button when focused
            if (e.keyCode === 32) {
                fileInput.current.click();
            }
        }
    }

    function onSubmit(e) {
        e.preventDefault();
        const data = new FormData(fileInput.current.files);
    }

    function fileNames() {
        const { current } = fileInput;

        if (current && current.files.length > 0) {
            let messages = [];
            for (let file of current.files) {
                messages = messages.concat(<p key={file.name}>{file.name}</p>);
            }
            return messages;
        }
        return null;
    }
    return (
        <Wrapper>
            <form onSubmit={onSubmit}>
                <span>
                    上船來源
                </span>
                <Button>
                    <input
                        type="file"
                        ref={fileInput}
                        // The onChange should trigger updates whenever
                        // the value changes?
                        // Try to select a file, then try selecting another one.
                        onChange={forceUpdate}
                        style={{ display: "none" }}
                        component="label"
                        multiple
                    />
                </Button>
                <span>
                    上船參考
                </span>
                <Button>
                    新增附件
                    <input
                        id="file"
                        type="file"
                        ref={fileInput}
                        // The onChange should trigger updates whenever
                        // the value changes?
                        // Try to select a file, then try selecting another one.
                        onChange={forceUpdate}
                        component="label"
                        multiple
                    />
                </Button>
                <span>
                    說明
                </span>
                <InputContent>
                    <input
                        type='text'
                    />
                </InputContent>
                <span>
                    信箱
                </span>
                <InputContent>
                    <input
                        type='text'
                    />
                </InputContent>
                <label htmlFor="file">
                    <span tabIndex="0" role="button" aria-controls="filename">
                        Upload file(s):{" "}
                    </span>
                </label>
                {fileNames()}
                <br />
                <Button type="submit">建立</Button>
            </form>
        </Wrapper>
    );
}

export default CreateNew;
