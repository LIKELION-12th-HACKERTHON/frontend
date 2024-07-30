import React from "react";
import Searchbar from "../components/searchbar";
import styled from "styled-components";

const SearchWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  h1 {
    display: flex;
    justify-content: center;
    margin-top: 50px;
    margin-bottom: 80px;
  }
`

export default function InitialSearch() {
  return(
    <SearchWrapper>
      <h1>어떤 지역의 가게를 찾으시나요?</h1>
      <Searchbar/>
    </SearchWrapper>
  )
};

