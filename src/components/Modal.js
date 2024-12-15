import { useContext } from "react";
import styles from "../styles/Modal.module.css";
import { TaskContext } from "../App";

const formatDate = dateString => {
  const date = new Date(dateString);

  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();

  const formattedDate = `${hours}:${minutes} ${day}/${month}/${year}`;
  return formattedDate;
};

const datetimeToISOString = datetimeString => {
  // Tách giờ và ngày tháng năm từ chuỗi
  const [time, date] = datetimeString.split(" "); // Tách giờ và ngày

  const [day, month, year] = date.split("/"); // Tách ngày, tháng, năm

  // Tách giờ và phút từ chuỗi time
  const [hours, minutes] = time.split(":");

  // Kết hợp lại theo định dạng ISO 8601: YYYY-MM-DDTHH:mm
  const isoString = `${year}-${month}-${day}T${hours}:${minutes}`;
  console.log(isoString);
  return isoString;
};

function Modal() {
  const {
    isOpenModal,
    setIsOpenModal,
    onAddTask,
    selectedTask,
    onEditTask,
    setSelectedTask,
  } = useContext(TaskContext);

  const handleSubmit = event => {
    event.preventDefault();
    setIsOpenModal(false);
    const formData = new FormData(event.target);
    event.target.reset();
    const newTask = Object.fromEntries(formData);
    newTask.id = crypto.randomUUID();
    newTask.isDone = false;
    newTask.deadline = formatDate(newTask.deadline);
    if (!selectedTask) onAddTask(newTask);
    else onEditTask({ ...newTask, id: selectedTask.id });
    setSelectedTask(null);
  };

  const today = new Date().toISOString().slice(0, 16);

  return (
    <div className={isOpenModal ? "" : "hidden"}>
      <div className={styles.modal}>
        <button
          className={styles["btn--close-modal"]}
          onClick={() => {
            setIsOpenModal(false);
            setSelectedTask(null);
          }}
        >
          ×
        </button>
        <h2 className={styles["modal__header"]}>Let's create some tasks!</h2>
        <form className={styles["modal__form"]} onSubmit={handleSubmit}>
          <label>Task Name</label>
          <input
            type="text"
            name="name"
            required
            defaultValue={selectedTask?.name}
          />
          <label>Description</label>
          <input type="text" name="desc" defaultValue={selectedTask?.desc} />
          <label>Deadline</label>
          <input
            type="datetime-local"
            name="deadline"
            defaultValue={
              selectedTask != null
                ? datetimeToISOString(selectedTask.deadline)
                : today
            }
          />
          <button className={styles.btn} type="submit">
            Save
          </button>
        </form>
      </div>
      <div className={styles["overlay"]}></div>;
    </div>
  );
}

export default Modal;
