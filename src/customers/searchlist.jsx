import React, {useState, useEffect} from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import noImage from "./img/no-image.jpg";

export default function SearchList() {
  const { place } = useParams();
  const [ contents, setContents ] = useState([]);
  const [ loading, setLoading ] = useState(true);
  const [ error, setError ] = useState(null);
  const defaultImage = noImage

  const getContents = () => {
    setLoading(true);
    axios.get(`https://ourvege.store/customer/${place}`)
      .then((res) => {
        console.log('글 불러오기 완료');
        setLoading(false);
        setContents(res.data);
        if (!contents || contents.length === 0) {
          return <p>가게가 없습니다.</p>;
        }
      })
      .catch((err) => {
        console.error('에러: ', err);
        setError(err);
        setLoading(false)
      });
  }

  useEffect(() => {
    getContents();
  }, [])


  if (loading) {
    return <div>게시글을 불러오고 있습니다...</div>
  }

  //발생 가능 오류에 대해 if출력문 만들기

  return(
    <div className="all-list">
      {contents.map((content) => (
        <div className="one-list" key={content.id}>
          <div className="list-detail">
            <h5>가게: {content.nickname}</h5>
            <p>위치 :{content.city} {content.district} {content.dong} {content.detail_location}</p>
            <p>상품: {content.product}</p>
            <p>{content.price}원</p>
          </div>
          <div className="list-img">
            <img src={content.image || defaultImage} alt={content.product}/>
          </div>
        </div>
      ))}
    </div>
  )
}