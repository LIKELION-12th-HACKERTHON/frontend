import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Searchbar() {
  //useState로 값 관리
  //const [isFocus, setIsFocus] = useState(false);
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate(`customer/search/${encodeURIComponent(keyword)}`)//특수문자 포함한 URL인코딩?
  }

  //고객이 글씨를 쓸때마다 반영되게
  const onChange = (e) => {
    setKeyword(e.target.value);
  }

  //console.log(setKeyword)
  //const filterContent = 
  return(
    <div>
      <input
        placeholder="ex.이문동"
        value={keyword}
        onChange={onChange}
      />
      <button onClick={handleSearch}>검색</button>
    </div>
  )
};

