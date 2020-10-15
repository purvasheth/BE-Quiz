import React, { useEffect, useState } from "react";

export default function Question({ setCsvData, row, setCorrect, setWrong, inputName }) {
  const { a, b, c, d, Question, Answer } = row;
  const [val, setVal] = useState("");
  const [msg, SetMessage] = useState("");
  const [color, setColor] = useState("green");
  function check() {
    const message =
      val === Answer.trim().toLowerCase()
        ? "Correct!"
        : `Wrong! Answer is  ${Answer}`;
    SetMessage(message);
  }

  useEffect(() => {
    if (msg) {
      if (msg.includes("Correct")) {
        setColor("green");
        setCorrect((prev) => prev + 1);
      } else {
        setColor("red");
        setCsvData((draft) => {
          draft.push({ Question, a, b, c, d, Answer });
        });
        setWrong((prev) => prev + 1);
      }
    }
  }, [msg, setCorrect, setWrong, a, b, c, d, setCsvData, Question, Answer]);

  return (
    <div>
      <p>
        <input
          type="radio"
          name={inputName}
          value="a"
          onChange={(e) => setVal(e.target.value)}
        />{" "}
        a. {a}
      </p>
      <p>
        <input
          type="radio"
          name={inputName}
          value="b"
          onChange={(e) => setVal(e.target.value)}
        />{" "}
        b. {b}
      </p>
      <p>
        <input
          type="radio"
          name={inputName}
          value="c"
          onChange={(e) => setVal(e.target.value)}
        />{" "}
        c. {c}
      </p>
      <p>
        <input
          type="radio"
          name={inputName}
          value="d"
          onChange={(e) => setVal(e.target.value)}
        />{" "}
        d. {d}
      </p>
      <button disabled={val.length === 0} onClick={check}>
        Select
      </button>
      <p style={{ color }}>{msg}</p>
    </div>
  );
}
