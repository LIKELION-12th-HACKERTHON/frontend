import React, {useEffect, useState} from "react";

export default function Searchbar() {
  //useState로 값 관리
  const [keyword, setKeyword] = useState("");
  const [filteredContent, setFileredContent] = useState();

  //고객이 글씨를 쓸때마다 반영되게
  const onChange = (e) => {
    setKeyword(e.target.value);
  }

  //console.log(setKeyword)
  //const filterContent = 
  return(
    <div>
      <input
        placeholder="지역..."
        value={keyword}
        onChange={onChange}
      />
    </div>
  )
};