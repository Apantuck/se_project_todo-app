import FormValidator from "../components/FormValidator";
import { validationConfig } from "../utils/constants";

const validator = new FormValidator(
  validationConfig,
  validationConfig.formSelector
);

validator.enableValidation();
validator.resetValidation();
