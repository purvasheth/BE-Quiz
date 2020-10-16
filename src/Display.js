import React, { useEffect } from "react";
import { useImmer } from "use-immer";
import { CSVLink } from "react-csv";
import QuestionComponent from "./Question";
import "./styles.css";

export default function Display({
  data,
  filename,
  correct,
  wrong,
  incCorrect,
  incWrong,
}) {
  const [csvData, setCsvData] = useImmer([]);
  const total = data && data.length;
  useEffect(() => {
    if (data) {
      setCsvData((draft) => []);
    }
  }, [data, setCsvData]);

  return (
    <div className="container">
      {data && (
        <div className="fixed-score-box">
          <p>Total: {total}</p>
          <p>
            Correct: {correct} / {correct + wrong}
          </p>
          <CSVLink filename={`wrong_${filename}`} data={csvData}>
            <button style={{ backgroundColor: "tomato" }}>
              Wrong Questions
            </button>
          </CSVLink>
        </div>
      )}
      {data &&
        data.map((row, index) => {
          const { Question, id } = row;
          return (
            <div key={id}>
              <p>
                {index + 1}. {Question}
              </p>
              <QuestionComponent
                row={row}
                setCsvData={setCsvData}
                incCorrect={incCorrect}
                incWrong={incWrong}
              />
            </div>
          );
        })}
    </div>
  );
}
