import React from 'react';
import { Link, Route, Switch } from "react-router-dom";

const AccountDummyData = [
  { id: 1, name: "농협 은행", balance: 50000, number: "1120-12-052927" },
  { id: 2, name: "국민 은행", balance: 150200, number: "656-12-0541927" },
  { id: 3, name: "농협 은행", balance: 355270, number: "8710-1152-3428" }
]


const BankCard = (account) => {
  return (
    <>
      <Link to={`account/${account.id}`}>
        <div>
          <div>계좌 명: {account.name}</div>
          <div>잔고: {account.balance}</div>
          <div>계좌 번호: {account.number}</div>
        </div>
      </Link>
    </>
  );
}

const Account = () => {
  return (
    <div>
      {AccountDummyData.map(account => (
        <BankCard
          key={account.id}
          id={account.id}
          name={account.name}
          balance={account.balance}
          number={account.number} />
      ))}
    </div>
  );
}

export default Account;