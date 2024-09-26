export default function Header({ tasks }) {
  const total = tasks.length;
  const taskDone = tasks.filter(tasks => tasks.isDone).length;
  return (
    <header className="box">
      <div className="box-text">
        <p className="bigger-text">Todo Done</p>
        <p className="smaller-text">Keep it up!</p>
      </div>
      <div className="summary">
        {taskDone}/{total}
      </div>
    </header>
  );
}
