import styled from "styled-components";

export const InfoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 60vw;
`

export const Profile = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: solid 1px;
  margin-top: 50px;
  padding: 20px;
  p {
    font-size: 25px;
    font-weight: 900;
    color: #77a68b;
    margin-bottom: 10px;
  }
  span {
    color: #B0D9B6;
  }
`