import { useEffect } from "react";
import Button from "../../../../UI/Button/Button";
import InputWithInvalidText from "../../../../UI/Input/InputWithInvalidText";
import { emailValidation } from "../../../../components/InputValidations/InputValidations";
import SignUpOrLoginContainer from "../../../../components/SignUpOrLoginContainer/SignUpOrLoginConatainer";
import useInput from "../../../../hooks/use-Input";
import style from "./ForgetPassword.module.css";
import { url } from "../../../../constants";
import useHttpsAxios from "../../../../hooks/use-httpsAxios";
import { CircularProgress } from "@material-ui/core";
const ForgetPassword = () => {
  const loginScreenData = {
    title: "Welcome Back!",
    description:
      "At moment we don’t have your Data to create your account. So lets just start to create your Account",
    image: "loginPageImage.svg",
  };

  const emailInput = useInput({ validateValue: emailValidation });

  useEffect(() => {
    document.title = "Forget Password";
  });

  const { sendRequest, isLoading, statusCode } = useHttpsAxios();

  const SuccessResponseHandler = () => {
    // dispatch(setMessage("Uploaded your Certificates Successfully", "success"));
    // setTimeout(() => {
    //   navigate("/dashboard");
    // }, [1500]);
  };

  useEffect(() => {
    if (emailInput.isValid && (statusCode === 200 || statusCode === 201)) {
      // console.log(responseData);
      SuccessResponseHandler();
    } else if (statusCode < 0 && statusCode > 202) {
      // console.log(error);
      // console.log(responseData);
    }
  });

  const handleSubmit = () => {
    if (emailInput.isValid) {
      const formData = {
        email: emailInput.value,
      };
      // console.log(formData);
      // SuccessResponseHandler();
      sendRequest({
        url: `${url.backendBaseUrl}/vrpi-user/forgot-password`,
        method: "POST",
        data: formData,
      });
    }
  };

  return (
    <div className={style.screen}>
      <SignUpOrLoginContainer
        screenData={loginScreenData}
        classForMainContent={style.mainContent}
      >
        <div className={style.container}>
          <h1>Forget Password</h1>
          <InputWithInvalidText
            ErrorMessage={"Invalid Email"}
            className={`${style.Input} `}
            inputFields={{
              placeholder: "Enter your Email Address",
              value: emailInput.value,
              isInvalid: emailInput.hasError,
              onBlurHandler: emailInput.validateValueHandler,
              onFocusHandler: emailInput.focusHandler,
              onChange: emailInput.valueChangeHandler,
              type: "email",
              isTouched: emailInput.isFocused,
            }}
            mandatory="true"
          />
          <Button
            onClick={handleSubmit}
            disabled={!emailInput.isValid}
            style={{ backgroundColor: !emailInput.isValid && "#ccc" }}
          >
            {isLoading ? (
              <CircularProgress style={{ color: "white" }} />
            ) : (
              "Submit"
            )}
          </Button>
        </div>
      </SignUpOrLoginContainer>
    </div>
  );
};

export default ForgetPassword;
