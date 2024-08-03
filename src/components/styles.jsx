import styled from "styled-components";

export const InfoContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  h3 {
    margin-top: 60px;
    color: #17403C;
  }
`

export const Profile = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 30%;
  border: solid 1px;
  border-color: #B0D9B6;
  margin: 50px 50px 30px 0px;
  margin-top: 50px;
  margin-bottom: 30px;
  padding: 20px;
  p {
    font-size: 25px;
    font-weight: 900;
    color: #77a68b;
    margin: 10px;
  }
  span {
    color: #B0D9B6;
  }
`

export const UserInfo = styled.div`
display: flex;
flex-direction: column;
color: #17403C;

  p {
    margin: 10px;
  }

  h4 {
    padding-left: 10px;
    margin: 10px;
  }
`

