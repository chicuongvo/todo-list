import { useContext, useState } from "react";
import * as XLSX from "xlsx";
import { TaskContext } from "../App";
import styles from "../styles/Modal.module.css";

function Dropbox() {
  const [excelData, setExcelData] = useState([]);
  const { isOpenDropbox, setIsOpenDropbox, onImportTasks } =
    useContext(TaskContext);

  const handleFileUpload = event => {
    const file = event.target.files[0];
    console.log(file);
    if (file) {
      const reader = new FileReader();

      reader.onload = e => {
        const data = e.target.result;

        const workbook = XLSX.read(data, { type: "binary" });

        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];

        const jsonData = XLSX.utils.sheet_to_json(sheet);

        setExcelData(jsonData);
        console.log(jsonData);
      };

      reader.readAsArrayBuffer(file);
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    setIsOpenDropbox(false);
    onImportTasks(excelData);
  };

  return (
    <div className={isOpenDropbox ? "" : "hidden"}>
      <form className="form-upload" onSubmit={handleSubmit}>
        <button
          type="action"
          className={styles["btn--close-modal"]}
          onClick={e => {
            e.preventDefault();
            setIsOpenDropbox(false);
          }}
        >
          ×
        </button>
        <input type="file" accept=".xls,.xlsx" onChange={handleFileUpload} />
        <button className="btn-add-file" type="submit">
          Upload file Excel
        </button>
      </form>
      <div className={styles["overlay"]}></div>
    </div>
  );
}

export default Dropbox;
