import { body } from "express-validator";

export const createTodoValidator = () => {
  return [
    body("title")
      .exists()
      .withMessage("Title is required.")
      .isString()
      .withMessage("Title must be a string."),
    body("description")
      .optional()
      .isString()
      .withMessage("Description must be a string."),
    body("dueDate")
      .exists()
      .withMessage("Due date is required.")
      .isDate()
      .withMessage("Due date must be a valid date."),
  ];
};



export const updateTodoValidator = () => {
  return [
    body("title")
      .optional()
      .isString()
      .withMessage("Title must be a string."),
    body("description")
      .optional()
      .isString()
      .withMessage("Description must be a string."),
    body("isCompleted")
      .optional()
      .isBoolean()
      .withMessage("isCompleted must be a boolean."),
    body("dueDate")
      .optional()
      .isDate()
      .withMessage("Due date must be a valid date."),
  ];
};