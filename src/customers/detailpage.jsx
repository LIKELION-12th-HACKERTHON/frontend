import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import api from '../components/api';

export default function Detailpage() {
  const {id} = useParams();
  const [ contents, setContents ] = useState([])

  return (
    <div>
      <p>고민사항1. 내 근처의 가게를 검색하고 가게의 메뉴를 보는 게 좋지 않을까?
      `</p>
      <p>고민사항2. 원래대로 간다하면 디테일 페이지가 필요한가? 어떻게 개별 데이터를 띄울 것인가? 검색어 받아와야함.</p>
    </div>
  )
}
