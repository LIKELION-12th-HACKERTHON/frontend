import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const InputWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const Input = styled.input`
  width: 90vw;
  max-width: 500px;
  height: 30px;
`
const Button = styled.button`
  display: inline-flex;
  align-items: center;
  background-color: #B0D9B6;
  margin-left: 20px;
  height: 30px;
  border-radius: 5px;
  font-size: 15px;
  //버튼 호버 기능 추가하기
`

export default function Searchbar() {
  //useState로 값 관리
  //const [isFocus, setIsFocus] = useState(false);
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  //검색한 값이 없으면 이동 안되게 만들기!
  const handleSearch = () => {
    navigate(`search/${encodeURIComponent(keyword)}`, )//특수문자 포함한 URL인코딩?
  }

  //고객이 글씨를 쓸때마다 반영되게
  const onChange = (e) => {
    setKeyword(e.target.value);
  }

  //console.log(setKeyword)
  //const filterContent = 
  return(
    <InputWrapper>
      <Input
        placeholder="ex.이문동"
        value={keyword}
        onChange={onChange}
      />
      <Button onClick={handleSearch}>검색</Button>
    </InputWrapper>
  )
};
