import { useEffect, useState } from "react";
import Button from "../../../../UI/Button/Button";
import InputWithInvalidText from "../../../../UI/Input/InputWithInvalidText";
import {
  confirmPasswordValidation,
  emailValidation,
  passwordValidation,
} from "../../../../components/InputValidations/InputValidations";
import SignUpOrLoginContainer from "../../../../components/SignUpOrLoginContainer/SignUpOrLoginConatainer";
import useInput from "../../../../hooks/use-Input";
import style from "./CreateNewPassword.module.css";
import { useNavigate } from "react-router-dom";
const CreateNewPassword = () => {
  const loginScreenData = {
    title: "Welcome Back!",
    description:
      "At moment we don’t have your Data to create your account. So lets just start to create your Account",
    image: "loginPageImage.svg",
  };

  const [formIsValid, setFormIsValid] = useState(false);

  const navigate = useNavigate();

  const passwordInput = useInput({ validateValue: passwordValidation });
  const confirmPasswordInput = useInput({
    validateValue: (value) =>
      confirmPasswordValidation(value, passwordInput.value),
  });

  useEffect(() => {
    document.title = "Create New Password";
    setFormIsValid(passwordInput.isValid && confirmPasswordInput.isValid);
  }, [passwordInput.isValid, confirmPasswordInput.isValid]);

  const handleSubmit = () => {
    // console.log(formIsValid);
    if (formIsValid) {
      // console.log(confirmPasswordValidation.value);
      navigate("/login");
    }
  };

  return (
    <div className={style.screen}>
      <SignUpOrLoginContainer
        screenData={loginScreenData}
        classForMainContent={style.mainContent}
      >
        <div className={style.container}>
          <h1>Reset Password</h1>
          <InputWithInvalidText
            ErrorMessage={"Invalid Password"}
            className={`${style.Input} `}
            inputFields={{
              placeholder: "Password",
              value: passwordInput.value,
              isInvalid: passwordInput.hasError,
              onBlurHandler: passwordInput.validateValueHandler,
              onFocusHandler: passwordInput.focusHandler,
              onChange: passwordInput.valueChangeHandler,
              type: "password",
              isTouched: passwordInput.isFocused,
            }}
            mandatory="true"
          />
          <InputWithInvalidText
            ErrorMessage={"Invalid Confirm Password"}
            className={`${style.Input} `}
            inputFields={{
              placeholder: "Confirm Password",
              value: confirmPasswordInput.value,
              isInvalid: confirmPasswordInput.hasError,
              onBlurHandler: confirmPasswordInput.validateValueHandler,
              onFocusHandler: confirmPasswordInput.focusHandler,
              onChange: confirmPasswordInput.valueChangeHandler,
              type: "password",
              isTouched: confirmPasswordInput.isFocused,
            }}
            mandatory="true"
          />
          <Button
            onClick={handleSubmit}
            disabled={!formIsValid}
            style={{ backgroundColor: !formIsValid && "#ccc" }}
          >
            Submit
          </Button>
        </div>
      </SignUpOrLoginContainer>
    </div>
  );
};

export default CreateNewPassword;
