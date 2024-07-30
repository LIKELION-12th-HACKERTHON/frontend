import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const InputWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 30px;
`

const Input = styled.input`
  width: 90vw;
  max-width: 500px;
  height: 30px;
`
const Button = styled.button`
  display: inline-flex;
  align-items: center;
  background-color: #d2d2d2;
  margin-left: 20px;
  height: 43px;
  border-radius: 5px;
  font-size: 15px;
  &:hover {
    transform: scale(1.1);
    background-color: #B0D9B6;
  }
`

export default function Searchbar() {
  //useState로 값 관리
  //const [isFocus, setIsFocus] = useState(false);
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  //검색한 값이 없으면 이동 안되게 만들기!
  const handleSearch = () => {
    navigate(`search/${encodeURIComponent(keyword)}`, {replace: true})//특수문자 포함한 URL인코딩?
  }

  //고객이 글씨를 쓸때마다 반영되게
  const onChange = (e) => {
    setKeyword(e.target.value);
  }

  const activeEnter = (e) => {
    if(e.key === "Enter") {
      handleSearch();
    }
  }

  //console.log(setKeyword)
  //const filterContent = 
  return(
    <InputWrapper>
      <Input
        placeholder="ex.이문동"
        value={keyword}
        onChange={onChange}
        onKeyDown={(e) => activeEnter(e)}
      />
      <Button onClick={handleSearch}>검색</Button>
    </InputWrapper>
  )
};
