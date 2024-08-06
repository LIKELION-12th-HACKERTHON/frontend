import styled from "styled-components";

export const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`

export const Profile = styled.div`
  display: flex;
  margin: 50px 5px;
  img {
    width: 40%;
    border-radius: 8px;
  }

  div {
    padding: 30px 30px 0 30px;
    display: flex;
    flex-direction: column-reverse;
  }

  h3 {
    font-size: 30px;
  }

  p {
    padding: 3px;
    color: #17403c;
  }
`

export const UserInfo = styled.div`
  background-color: #d5e3e7;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 3px 3px 8px 0.5px #b9b9b9;
`

