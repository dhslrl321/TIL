import React from 'react';
import { useParams } from "react-router-dom";
const Transaction = () => { }
const AccountInfo = () => { }

const DetailDummyData = [
  { id: 0, balance: 10000, create_date: "2020-10-26 14:33:23", money: 5000, content: "MEGA 커피", account_id: 1 },
  { id: 1, balance: 10000, create_date: "2020-10-26 14:33:23", money: 5000, content: "할리스 커피", account_id: 1 },
  { id: 2, balance: 10000, create_date: "2020-10-26 14:33:23", money: 5000, content: "탐앤 탐스 커피", account_id: 1 },
  { id: 3, balance: 10000, create_date: "2020-10-26 14:33:23", money: 5000, content: "퓨전 커피", account_id: 1 },
  { id: 4, balance: 10000, create_date: "2020-10-26 14:33:23", money: 5000, content: "편의점 커피", account_id: 1 },
]

const Detail = () => {

  const { id } = useParams();
  return (
    <div>
      {id} 번의 계좌 상세 내역
    </div>
  );
}
export default Detail;