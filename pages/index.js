import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";
import { v4 as uuidv4 } from "https://jspm.dev/uuid";
import Section from "../utils/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import TodoCounter from "../components/TodoCounter.js";

const addTodoButton = document.querySelector(".button_action_add");
const addTodoForm = document
  .querySelector("#add-todo-popup")
  .querySelector(".popup__form");
const todoTemplateSelector = "#todo-template";
const formValidator = new FormValidator(validationConfig, addTodoForm);
const todoCounter = new TodoCounter(initialTodos, ".counter__text");
const section = new Section({
  items: initialTodos,
  renderer: (item) => {
    renderTodo(item);
  },
  containerSelector: ".todos__list",
});
const popup = new PopupWithForm("#add-todo-popup", (formData) => {
  const data = {
    name: formData.name,
    date: new Date(formData.date),
    id: uuidv4(),
  };
  renderTodo(data);
  todoCounter.updateTotal(true);
});
popup.setEventListeners();

const renderTodo = (data) => {
  const todo = new Todo(data, todoTemplateSelector);
  const todoElement = todo.getView();
  const todoCheckbox = todoElement.querySelector(".todo__completed");
  todoCheckbox.addEventListener("change", (evt) => {
    if (evt.target.checked) {
      todoCounter.updateCompleted(true);
    } else {
      todoCounter.updateCompleted(false);
    }
  });
  const todoDeletebtn = todoElement.querySelector(".todo__delete-btn");
  todoDeletebtn.addEventListener("click", (evt) => {
    if (todoCheckbox.checked) {
      todoCounter.updateCompleted(false);
    }
    todoCounter.updateTotal(false);
  });
  section.addItem(todoElement);
};

addTodoButton.addEventListener("click", () => {
  popup.open();
  formValidator.resetValidation();
});

section.renderItems();
formValidator.enableValidation();
