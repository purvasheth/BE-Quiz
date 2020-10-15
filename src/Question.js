import React, { useEffect, useState } from "react";

export default function Question({ setCsvData, row, incCorrect, incWrong }) {
  const { a, b, c, d, Question, Answer, id } = row;
  const [val, setVal] = useState("");
  const [msg, setMessage] = useState("");
  const [color, setColor] = useState("green");
  function check() {
    const message =
      val === Answer.trim().toLowerCase()
        ? "Correct!"
        : `Wrong! Answer is  ${Answer}`;
    setMessage(message);
  }

  useEffect(() => {
    if (msg) {
      if (msg.includes("Correct")) {
        setColor("green");
        incCorrect();
      } else {
        setColor("red");
        setCsvData((draft) => {
          draft.push({ Question, a, b, c, d, Answer });
        });
        incWrong();
      }
      setVal("");
    }
  }, [msg, incCorrect, incWrong, a, b, c, d, setCsvData, Question, Answer]);

  return (
    <div>
      <p>
        <input
          type="radio"
          name={id}
          value="a"
          disabled={msg.length !== 0}
          onChange={(e) => setVal(e.target.value)}
        />
        a. {a}
      </p>
      <p>
        <input
          type="radio"
          name={id}
          value="b"
          disabled={msg.length !== 0}
          onChange={(e) => setVal(e.target.value)}
        />
        b. {b}
      </p>
      <p>
        <input
          type="radio"
          name={id}
          value="c"
          disabled={msg.length !== 0}
          onChange={(e) => setVal(e.target.value)}
        />
        c. {c}
      </p>
      <p>
        <input
          type="radio"
          name={id}
          value="d"
          disabled={msg.length !== 0}
          onChange={(e) => setVal(e.target.value)}
        />
        d. {d}
      </p>
      <button disabled={val.length === 0} onClick={check}>
        Select
      </button>
      <p style={{ color }}>{msg}</p>
    </div>
  );
}
