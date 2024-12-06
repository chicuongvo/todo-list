import { useContext } from "react";
import { TaskContext } from "../App";

export default function Header() {
  const { setIsOpenStats } = useContext(TaskContext);
  return (
    <header className="box">
      <div className="box-text">
        <p className="bigger-text">Todo Done</p>
        <p className="smaller-text">Keep it up!</p>
      </div>
      <button className="summary" onClick={() => setIsOpenStats(true)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="stats"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.5 6a7.5 7.5 0 1 0 7.5 7.5h-7.5V6Z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13.5 10.5H21A7.5 7.5 0 0 0 13.5 3v7.5Z"
          />
        </svg>
        <p>Stats</p>
      </button>
    </header>
  );
}
