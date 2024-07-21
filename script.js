'use-strict';
const form = document.querySelector('form');
const btnRadio = document.querySelector('.radio');
const btnDelete = document.querySelector('.del-icon');
const taskList = document.querySelector('.task-list');
const inputText = form.querySelector('input[type="text"]');
const summary = document.querySelector('.summary');

let totalTask = 0;
let doneTask = 0;

class Task {
  id = String(Math.round(10000 * Math.random()));
  done = false;
  constructor(content) {
    this.content = content;
  }
}

class App {
  _doneTask = 0;
  _totalTask = 0;
  _taskList = [];
  constructor() {
    // Attach event handler
    taskList.addEventListener('click', this._markDoneTask.bind(this));
    taskList.addEventListener('click', this._deleteTask.bind(this));
    form.addEventListener('submit', this._addTask.bind(this));
    this._getLocalStorage();
  }
  _renderTaskNumber() {
    summary.textContent = `${this._doneTask}/${this._totalTask}`;
  }
  _markDoneTask(e) {
    if (e.target.classList.contains('radio')) {
      const task = e.target.closest('.task');
      if (task) {
        task.classList.toggle('task--done');
        const tsk = this._taskList.find(t => t.id + '' === task.dataset.id);
        if (task.classList.contains('task--done')) {
          this._doneTask++;
          tsk.done = true;
        } else {
          this._doneTask--;
          tsk.done = false;
        }
        this._setLocalStorage();
        this._renderTaskNumber();
      }
    }
  }
  _deleteTask(e) {
    if (e.target.classList.contains('del-icon')) {
      const task = e.target.closest('.task');
      if (task) {
        if (task.classList.contains('task--done')) this._doneTask--;
        this._totalTask--;
        const delIdx = this._taskList.findIndex(t => t.id === task.dataset.id);
        if (delIdx > -1) this._taskList.splice(delIdx, 1);
        this._setLocalStorage();
        task.remove();
        this._renderTaskNumber();
      }
    }
  }
  _addTask(e) {
    e.preventDefault();
    if (inputText.value) {
      const task = new Task(inputText.value);
      this._renderTask(task);
      console.log(this);
      this._taskList.push(task);
      this._setLocalStorage();
    }
    inputText.value = '';
  }
  _setLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(this._taskList));
  }
  _getLocalStorage() {
    this._taskList = JSON.parse(localStorage.getItem('tasks')) ?? [];
    this._taskList?.forEach(task => {
      this._renderTask(task);
      if (task.done) this._doneTask++;
    });
    this._totalTask = this._taskList.length;
    this._renderTaskNumber();
  }
  _renderTask(task) {
    const html = `
      <li class="task ${task.done ? 'task--done' : ''}" data-id="${task.id}">
        <div class="radio"></div>
        <p>${task.content}</p>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="del-icon"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
          />
        </svg>
      </li>`;
    taskList.insertAdjacentHTML('afterbegin', html);
    this._totalTask++;
    this._renderTaskNumber();
  }
}

const app = new App();

// const renderTaskNumber = function (doneTask, totalTask) {
//   summary.textContent = `${doneTask}/${totalTask}`;
// };

// taskList.addEventListener('click', function (e) {
//   if (e.target.classList.contains('radio')) {
//     const task = e.target.closest('.task');
//     task?.classList.toggle('task--done');
//     if (task.classList.contains('task--done')) doneTask++;
//     else doneTask--;
//     renderTaskNumber(doneTask, totalTask);
//   }
//   if (e.target.classList.contains('del-icon')) {
//     const task = e.target.closest('.task');
//     if (task.classList.contains('task--done')) doneTask--;
//     totalTask--;
//     task.remove();
//     renderTaskNumber(doneTask, totalTask);
//   }
// });

// form.addEventListener('submit', function (e) {
//   e.preventDefault();
//   const task = inputText.value;
//   if (task) {
//     const html = `
//     <li class="task">
//       <div class="radio"></div>
//       <p>${task}</p>
//       <svg
//         xmlns="http://www.w3.org/2000/svg"
//         fill="none"
//         viewBox="0 0 24 24"
//         stroke-width="1.5"
//         stroke="currentColor"
//         class="del-icon"
//       >
//         <path
//           stroke-linecap="round"
//           stroke-linejoin="round"
//           d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
//         />
//       </svg>
//     </li>
//     `;
//     taskList.insertAdjacentHTML('afterbegin', html);
//     totalTask++;
//     renderTaskNumber(doneTask, totalTask);
//   }
//   inputText.value = '';
// });
