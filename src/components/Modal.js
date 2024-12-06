import { useContext } from "react";
import styles from "../styles/Modal.module.css";
import { TaskContext } from "../App";

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
    if (!selectedTask) onAddTask(newTask);
    else onEditTask({ ...newTask, id: selectedTask.id });
    setSelectedTask(null);
  };

  const today = new Date().toISOString().split("T")[0];

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
            type="date"
            name="deadline"
            defaultValue={selectedTask?.deadline ?? today}
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
