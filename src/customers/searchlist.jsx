import React, {useState, useEffect} from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function SearchList() {
  const { place } = useParams();
  const { contents, setContents } = useState([]);

  const getContents = () => {
    axios.get(`https://ourvege.store/customer/${place}`)
      .then((res) => {
        console.log('글 불러오기 완료');
        setContents(res.data);
      })
      .catch((err) => {
        console.error('에러: ', err);
      });
  }

  useEffect(() => {
    getContents();
  }, [])

  if (!contents || contents.length === 0) {
    return <p>가게가 없습니다.</p>;
  }

  return(
    <div>
      {contents.map((content) => (
        <div key={content.id}>
          <h5>가게: {content.nickname}</h5>
          <p>{content.district}</p>
        </div>
      ))}
    </div>
  )
}