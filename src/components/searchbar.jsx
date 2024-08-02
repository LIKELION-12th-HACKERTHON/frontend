import React, {useEffect, useState} from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";

const InputWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 30px;
`

const SearchForm = styled.form`
  display: flex;
`

const Input = styled.input`
  width: 90vw;
  max-width: 500px;
  height: 40px;
  border: solid 1.2px;
  &:focus {
    border-color: #B0D9B6;
    border-width: 1.5px;
    outline: none;
  }
`
const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #d2d2d2;
  margin-left: 20px;
  height: 40px;
  width: 60px;
  border-radius: 5px;
  border: solid 1.2px;
  font-size: 15px;
  
  &:hover {
    transform: scale(1.1);
    background-color: #B0D9B6;
  }
`

export default function Searchbar() {
  //useState로 값 관리
  //const [isFocus, setIsFocus] = useState(false);
  //const [keyword, setKeyword] = useState("");
  const [query, setQuery] = useState("");
  const [ first, setFirst ] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();


  //왜 검색된 상태에서 searchQuery 값이 null로 나올까?
  const handleSearch = () => {
    const urlParams = new URLSearchParams(location.search)
    const check = urlParams.get('q')

    if (check) {
      setFirst(false)
    } else {
      setFirst(true)
    }

    urlParams.set('q', query)
    if (first) {
      navigate(`search?${urlParams}`)
    } else {
      navigate(`?${urlParams}`)
    }
    //e.preventDefault();
  }

  //고객이 글씨를 쓸때마다 반영되게
  const onChange = (e) => {
    setQuery(e.target.value);
  };

  const activeEnter = (e) => {
    if(e.key === "Enter") {
      handleSearch();
    }
  }

  //console.log(setKeyword)
  //const filterContent = 
  return(
    <InputWrapper>
      <SearchForm onSubmit={handleSearch}>
        <Input
        placeholder="ex.이문동"
        value={query}
        onChange={onChange}
        onKeyDown={(e) => activeEnter(e)}
        />
        <Button>검색</Button>
      </SearchForm>
      
    </InputWrapper>
  )
};
