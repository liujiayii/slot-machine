import React, { useRef, useState, CSSProperties, useImperativeHandle, useMemo } from "react";
import "./App.css";

const scrollList = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
type IProps = {
  result: string;
  index: number;
}
const NumberList:React.FC<IProps> = (props) => {
  const style = useMemo<CSSProperties>(() => {
    if (props.result === "0") {
      return {};
    }
    return {
      top: -480 - Number(props.result) * 48 + "px",
      transitionDuration: 2000 + props.index * 500 + "ms",
    };
  }, [props.result]);
  return (
    <div className="num-list" style={style}>
      {[...scrollList, ...scrollList].map((item, key) => (
        <div key={key}>{item}</div>
      ))}
    </div>
  );
};
const START_NUMBER = ["0", "0", "0", "0"]
function App() {
  const [num, setNum] = useState<number>(1234);
  const [lastResult, setLastResult] = useState<string[]>(START_NUMBER);
  const numList = useRef<any>(null);
  const handleStart = () => {
    if (typeof num !== "number" || num < 1000 || num > 9999) {
      alert("请输入1000-9999的正整数~");
      return
    }
    const nums = `${num}`.split("");
    setLastResult(nums);
    console.log("===start===");
  };
  return (
    <div className="App">
      <div className="playContainer">
        {lastResult.map((item, key) => (
          <div className="box" key={key}>
            <NumberList result={item} index={key}></NumberList>
          </div>
        ))}
      </div>
      <div>
        <input value={num} type="number" onChange={(e) => setNum(+e.target.value)} />
        <button onClick={handleStart}>start</button>
        <button
          onClick={() => {
            setLastResult(START_NUMBER);
          }}
        >
          reset
        </button>
      </div>
    </div>
  );
}

export default App;
