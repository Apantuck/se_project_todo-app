export default class TodoCounter {
  constructor(todos, selector) {
    this._todos = todos;
    this._element = document.querySelector(selector);
    this._totalCount = todos.length;
    this._completedCount = 0;
    todos.forEach((todo) => {
      if (todo.completed) {
        this.updateCompleted(true);
      }
    });

    this._updateText();
  }

  updateCompleted = (increment) => {
    if (increment) {
      this._completedCount++;
    } else {
      this._completedCount--;
    }
    this._updateText();
  };

  updateTotal = (increment) => {
    if (increment) {
      this._totalCount++;
    } else {
      this._totalCount--;
    }
    this._updateText();
  };

  _updateText() {
    this._element.textContent = `Showing ${this._completedCount} out of ${this._totalCount} completed`;
  }
}
