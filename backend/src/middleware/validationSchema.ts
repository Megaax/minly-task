import { body } from "express-validator";
import { RequestHandler } from "express";

const courseValidationSchema: RequestHandler = () => {
    return [
        body('title')
            .notEmpty()
            .withMessage("Title is empty")
            .isLength({ min: 2 })
            .withMessage("Title is less than 2 characters"),
        body('price')
            .notEmpty()
            .withMessage("Price is empty")
    ];
};

const registerValidationSchema: RequestHandler = () => {
    return [
        body('firstName')
            .notEmpty()
            .withMessage("First name is empty")
            .isLength({ min: 2 })
            .withMessage("First name is less than 2 characters"),
        body('lastName')
            .notEmpty()
            .withMessage("Last name is empty")
            .isLength({ min: 2 })
            .withMessage("Last name is less than 2 characters"),
        body('email')
            .notEmpty()
            .withMessage("Email name is empty"),
        body('password')
            .notEmpty()
            .withMessage("password is empty")
            .isLength({ min: 8 })
            .withMessage("Password is less than 8 characters"),
    ];
};

const loginValidationSchema: RequestHandler = () => {
    return [
        body('email')
            .notEmpty()
            .withMessage("Email name is empty"),
        body('password')
            .notEmpty()
            .withMessage("password is empty"),
    ];
};

export {
    courseValidationSchema,
    registerValidationSchema,
    loginValidationSchema
};
