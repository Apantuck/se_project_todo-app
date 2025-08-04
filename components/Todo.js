export default class Todo {
  constructor(data, selector, checkHandler, deleteHandler) {
    this._data = data;
    this._selector = selector;
    this._checkHandler = checkHandler;
    this._deleteHandler = deleteHandler;
  }

  getView() {
    this._todoElement = document
      .querySelector(this._selector)
      .content.querySelector(".todo")
      .cloneNode(true);

    const todoNameEl = this._todoElement.querySelector(".todo__name");
    todoNameEl.textContent = this._data.name;

    this._generateCheckbox();
    this._generateDate();
    this._setEventListeners();

    return this._todoElement;
  }

  _setEventListeners() {
    this._todoCheckboxEl.addEventListener("change", (evt) => {
      this._data.completed = !this._data.completed;
      this._checkHandler(this._data.completed);
      this._todoElement.classList.toggle("todo_completed");
    });

    this._todoDeleteBtn.addEventListener("click", () => {
      this._todoElement.remove();
      this._todoElement = null;
      this._deleteHandler(this._data.completed);
    });
  }

  _generateCheckbox() {
    this._todoCheckboxEl = this._todoElement.querySelector(".todo__completed");
    const todoLabel = this._todoElement.querySelector(".todo__label");
    this._todoCheckboxEl.checked = this._data.completed;
    this._todoCheckboxEl.id = `todo-${this._data.id}`;
    todoLabel.setAttribute("for", `todo-${this._data.id}`);
  }

  _generateDate() {
    this._todoDeleteBtn = this._todoElement.querySelector(".todo__delete-btn");
    const todoDate = this._todoElement.querySelector(".todo__date");
    const dueDate = new Date(this._data.date);

    if (!isNaN(dueDate)) {
      todoDate.textContent = `Due: ${dueDate.toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })}`;
    }
  }
}
