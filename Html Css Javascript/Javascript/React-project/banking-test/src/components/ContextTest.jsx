import React from "react";
import { useSingleData, useObjectData } from "../config/context";
import { useSingleFns, useObjectFns } from "../config/context";
const ContextTest = () => {
  const singleDate = useSingleData();
  const { data1, data2 } = useObjectData();

  const setSingleData = useSingleFns();
  const setObectData = useObjectFns();
  const handleSingleButton = () => {
    setSingleData("단일 state 데이터 변경 완료");
  };

  const handleObjectButton = () => {
    setObectData({
      data1: "첫 번째 객체 state 데이터 변경 성공",
      data2: "두 번째 객체 state 데이터 변경 성공",
    });
  };
  return (
    <div>
      <div>Single Data => {singleDate} 성공</div>
      <div>Object Data1 => {data1} 성공</div>
      <div>Object Data2 => {data2} 성공</div>
      <button onClick={handleSingleButton}>단일 데이터 변경 버튼</button>
      <button onClick={handleObjectButton}>객체 데이터 변경 버튼</button>
    </div>
  );
};

export default ContextTest;
