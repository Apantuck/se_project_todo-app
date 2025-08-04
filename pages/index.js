import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";
import { v4 as uuidv4 } from "https://jspm.dev/uuid";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import TodoCounter from "../components/TodoCounter.js";

const addTodoButton = document.querySelector(".button_action_add");
const addTodoForm = document.forms["add-todo-form"];
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

const todoPopupSubmitHandler = (formData) => {
  const data = {
    name: formData.name,
    date: new Date(formData.date),
    id: uuidv4(),
  };
  renderTodo(data);
  todoCounter.updateTotal(true);
  formValidator.resetValidation();
};

const renderTodo = (todoData) => {
  const todo = new Todo(
    todoData,
    todoTemplateSelector,
    checkHandler,
    deleteHandler
  );
  const todoElement = todo.getView();
  section.addItem(todoElement);
};

const todoPopup = new PopupWithForm("#add-todo-popup", todoPopupSubmitHandler);
todoPopup.setEventListeners();

const checkHandler = (completed) => {
  todoCounter.updateCompleted(completed);
};

const deleteHandler = (completed) => {
  todoCounter.updateTotal(false);
  if (completed) {
    todoCounter.updateCompleted(false);
  }
};

addTodoButton.addEventListener("click", () => {
  todoPopup.open();
});

section.renderItems();
formValidator.enableValidation();
