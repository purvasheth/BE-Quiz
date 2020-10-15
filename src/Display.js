import React, { useEffect, useState } from "react";
import { useImmer } from "use-immer";
import { CSVLink } from "react-csv";
import QuestionComponent from "./Question";
import "./styles.css";

export default function Display({ data, filename }) {
  const [cacheTotal, setCache] = useState(0);
  const [wrong, setWrong] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [csvData, setCsvData] = useImmer([]);
  const total = data && data.length;

  useEffect(() => {
    if(cacheTotal !== total){
      setCorrect(0);
      setWrong(0);
      setCache(total);
    }
  },[cacheTotal, total])
  
  return (
    <div style={{ margin: "5%" }}>
      {data && (
        <div className="fixed-score-box">
          <p>Total: {total}</p>
          <p>
            Correct: {correct} / {correct + wrong}
          </p>
          <CSVLink filename={`wrong_${filename}`} data={csvData}>
            <button style={{ backgroundColor: "tomato", cursor: "pointer" }}>
              Wrong Questions
            </button>
          </CSVLink>
        </div>
      )}
      {data &&
        data.map((row, index) => {
          const { Question, Answer } = row;
          return (
            <div key={`${Answer}${index}`}>
              <p>
                {index + 1}. {Question}
              </p>
              <QuestionComponent
                row={row}
                setCsvData={setCsvData}
                setCorrect={setCorrect}
                setWrong={setWrong}
              />
            </div>
          );
        })}
    </div>
  );
}
