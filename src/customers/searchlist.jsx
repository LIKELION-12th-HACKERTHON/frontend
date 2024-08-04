import React, {useState, useEffect} from "react";
import { useParams, useNavigate } from "react-router-dom";
import noImage from "./img/no-image.jpg";
import styled from "styled-components";
import api from "../components/api";

const ProductInfo = styled.div`
  display: flex;
  justify-content: space-between;
  color: #17403C;
  font-size: 20px;
  font-weight: 500;
`


export default function SearchList() {
  const { place } = useParams();
  const [ contents, setContents ] = useState([]);
  const [ loading, setLoading ] = useState(true);
  const [ error, setError ] = useState(null);
  const navigate = useNavigate();
  const defaultImage = noImage
  //const urlParams = new URLSearchParams(useLocation().search)

  //가격 천단위 ,
  const handleNumber =(number) => {
    const formattedNumber = new Intl.NumberFormat('en-US').format(number);
    return(formattedNumber)
  };

  const handleClick = (id) => {
    navigate(`/detail/${id}`);
  }
  
  const getContents = () => {
    setLoading(true);
    api.get(`/customer/${place}`)
      .then((res) => {
        console.log('글 불러오기 완료');
        setLoading(false);
        setContents(res.data);
      })
      .catch((err) => {
        console.error('에러: ', err);
        setError(err);
        setLoading(false)
      });
  }

  useEffect(() => {
    getContents();
  }, [place])


  if (loading) {
    return <div>게시글을 불러오고 있습니다...</div>
  }

  if (!contents || contents.length === 0) {
    return <p>아직 등록된 가게가 없습니다.</p>;
  }
  //발생 가능 오류에 대해 if출력문 만들기

  return(
    <div className="all-list">
      {contents.map((content) => (
        <div
        className="one-list"
        key={content.id}
        onClick={() => handleClick(content.id)}
        style={{ cursor: "pointer"}}
        >
          <div className="list-img">
            <img src={content.image || defaultImage} alt={content.product}/>
          </div>
          <div className="list-detail">
            <h3>{content.nickname}</h3>
            <p>{content.city} {content.district} {content.dong} {content.detail_location}</p>
            <ProductInfo>
              <span>상품: {content.product}</span>
              <span>{handleNumber(content.price)}원</span>
            </ProductInfo>
            
          </div>
        </div>
      ))}
    </div>
  )
}