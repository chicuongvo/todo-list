import { useContext } from "react";
import { PieChart, pieArcLabelClasses } from "@mui/x-charts/PieChart";
import { LineChart } from "@mui/x-charts/LineChart";

import { TaskContext } from "../App";

import styles from "../styles/Modal.module.css";

const valueFormatter = item => `${item.value}%`;

let monthlyData = [];
let summaryData = [];

function Stats() {
  const { isOpenStats, setIsOpenStats, tasks } = useContext(TaskContext);

  const totalTodos = tasks.length;
  const completedTodos = tasks.filter(todo => todo.isDone).length;
  const pendingTodos = tasks.filter(todo => !todo.isDone).length;

  const completedPercentage = ((completedTodos / totalTodos) * 100).toFixed(2);
  const pendingPercentage = ((pendingTodos / totalTodos) * 100).toFixed(2);

  const desktopOS = [
    {
      label: "Completed",
      value: completedPercentage,
    },
    {
      label: "Pending",
      value: pendingPercentage,
    },
  ];

  const currentYear = new Date().getFullYear().toString().slice(-2);
  const monthlyStats = new Array(12).fill(0);
  tasks.forEach(todo => {
    const deadline = todo.deadline;
    const [, date] = deadline.split(" "); // Tách giờ và ngày

    const [, month, year] = date.split("/"); // Tách ngày, tháng, năm
    // const [year, month] = deadline.split("-");
    if (year.slice(-2) === currentYear) {
      if (!monthlyStats[month - 1]) {
        monthlyStats[month - 1] = 0;
      }
      monthlyStats[month - 1]++;
    }
  });
  monthlyData = [];
  for (let month = 1; month <= 12; month++) {
    const monthStr = month.toString().padStart(2, "0");
    const taskCount = monthlyStats[month - 1] || 0;
    // console.log(monthStr, taskCount);
    monthlyData.push([`Tháng ${monthStr}`, taskCount]);
  }

  summaryData = [
    ["Số lượng task", `${totalTodos}`],
    ["Tỉ lệ hoàn thành", `${completedPercentage}%`],
    ["Tỉ lệ chưa hoàn thành", `${pendingPercentage}%`],
  ];

  return (
    <div className={isOpenStats ? "" : "hidden"}>
      <div className={styles["stats-modal"]}>
        <h2 className={styles["modal__header"]}>Overall performance:</h2>
        <button
          className={styles["btn--close-modal"]}
          onClick={() => {
            setIsOpenStats(false);
          }}
        >
          ×
        </button>
        <PieChart
          series={[
            {
              arcLabel: item => `${item.value}%`,
              data: desktopOS,
              highlightScope: { fade: "global", highlight: "item" },
              faded: { innerRadius: 30, additionalRadius: -30, color: "gray" },
              valueFormatter,
            },
          ]}
          sx={{
            [`& .${pieArcLabelClasses.root}`]: {
              fontWeight: "bold",
              fontSize: "20px",
            },
          }}
          height={200}
        />
        <h2 className={styles["modal__header"]}>Tasks each month:</h2>
        <LineChart
          xAxis={[{ data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] }]}
          series={[
            {
              data: monthlyStats,
            },
          ]}
          width={500}
          height={300}
        />
      </div>
      <div className={styles["overlay"]}></div>;
    </div>
  );
}

export { monthlyData, summaryData };

export default Stats;
