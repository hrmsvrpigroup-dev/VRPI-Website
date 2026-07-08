import React, { useEffect, useState } from "react";
import style from "./ContactUs.module.css";
import useInput from "../../../hooks/use-Input";
import Button from "../../../UI/Button/Button";
import Message from "../../../UI/Popup/Message";
import InputWithInvalidText from "../../../UI/Input/InputWithInvalidText";
import {
  descriptionValidation,
  emailValidation,
  fullNameValidation,
  mobileNumberValidation,
} from "../../InputValidations/InputValidations";
import useHttpsAxios from "../../../hooks/use-httpsAxios";
import { url } from "../../../constants";

const ContactUsForm = () => {
  const [errorMessage, setErrorMessage] = useState("");

  const closeErrMessageHandler = () => {
    setErrorMessage("");
  };

  const nameInput = useInput({
    initialValue: "",
    validateValue: fullNameValidation,
  });
  const emailInput = useInput({
    initialValue: "",
    validateValue: emailValidation,
  });
  const mobileInput = useInput({
    initialValue: "",
    validateValue: mobileNumberValidation,
  });
  const descriptionInput = useInput({
    initialValue: "",
    validateValue: descriptionValidation,
  });

  const [formIsValid, setFormIsValid] = useState("false");

  useEffect(() => {
    setFormIsValid(
      nameInput.isValid &&
        emailInput.isValid &&
        mobileInput.isValid &&
        descriptionInput.isValid
    );
  }, [
    nameInput.isValid,
    emailInput.isValid,
    mobileInput.isValid,
    descriptionInput.isValid,
  ]);

  const { sendRequest, error, statusCode, responseData, isLoading } =
    useHttpsAxios();

  useEffect(() => {
    const Validation = () => {
      if (responseData) {
        if (statusCode === 200 || statusCode === 201) {
          setErrorMessage("");
          nameInput.reset();
          mobileInput.reset();
          descriptionInput.reset();
          emailInput.reset();
          // console.log("data->", responseData);
        } else {
          // console.log("error->", error);
          setErrorMessage(responseData.response.data.statusMessage);
        }
      }
    };

    Validation();
  }, [error, responseData]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (formIsValid) {
      const formData = {
        name: nameInput.value,
        email: emailInput.value,
        phone: mobileInput.value,
        description: descriptionInput.value,
      };

      // TODO: REPLACE THIS URL WITH YOUR ACTUAL GOOGLE APPS SCRIPT WEB APP URL
      const googleScriptUrl = "https://script.google.com/macros/s/AKfycbxzyCCeBTlh_YW236TN9-0B_1QdLV0t7R9zzBYAWFiFO-Rf1gVQQ2Z1dFfUn3yM925r/exec";

      // Send to Google Sheets
      fetch(googleScriptUrl, {
        method: "POST",
        mode: "no-cors", // Important for Google Apps Script to prevent CORS errors
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then(() => {
          nameInput.reset();
          mobileInput.reset();
          descriptionInput.reset();
          emailInput.reset();
          setErrorMessage("");
          alert("Thank you! Your message has been sent successfully.");
        })
        .catch((error) => {
          setErrorMessage("Failed to send message. Please try again later.");
        });

      // Optional: If you still want to send data to your backend, you can uncomment this:
      /*
      sendRequest({
        url: `${url.backendBaseUrl}/vrpi-user/contact-us`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: formData,
      });
      */
    } else {
      setErrorMessage("Please fill out all fields correctly");
    }
  };

  return (
    <div className={style.form}>
      <img src={require(`../../../assets/contactUs1.png`)} alt="" />
      <form onSubmit={handleSubmit} className={style.Form}>
        {/* {console.log(nameInput.hasError)} */}
        <InputWithInvalidText
          ErrorMessage={"Invalid Name"}
          className={`${style.Input} `}
          inputFields={{
            placeholder: "Enter your full name",
            value: nameInput.value,
            isInvalid: nameInput.hasError,
            onBlurHandler: nameInput.validateValueHandler,
            onFocusHandler: nameInput.focusHandler,
            onChange: nameInput.valueChangeHandler,
            type: "text",
            isTouched: nameInput.isFocused,
          }}
          mandatory="true"
        />
        <InputWithInvalidText
          ErrorMessage={"Invalid Email"}
          className={`${style.Input} `}
          inputFields={{
            placeholder: "Enter email address",
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

        <InputWithInvalidText
          ErrorMessage={"Invalid Mobile number"}
          className={`${style.Input} `}
          inputFields={{
            placeholder: "Enter your Mobile Number",
            value: mobileInput.value,
            isInvalid: mobileInput.hasError,
            onBlurHandler: mobileInput.validateValueHandler,
            onFocusHandler: mobileInput.focusHandler,
            onChange: mobileInput.valueChangeHandler,
            type: "text",
            isTouched: mobileInput.isFocused,
          }}
          mandatory="true"
        />

        <textarea
          id="description"
          placeholder="Description"
          value={descriptionInput.value}
          onChange={descriptionInput.valueChangeHandler}
          onBlur={descriptionInput.validateValueHandler}
          onFocus={descriptionInput.focusHandler}
          className={`${style.description}${
            descriptionInput.hasError ? ` ${style.descriptionInvalid}` : ""
          }`}
        />
        <Button
          type="submit"
          className={style.submitBtn}
          style={{ backgroundColor: !formIsValid && "#ccc" }}
        >
          {isLoading ? "Loading..." : "Contact Us"}
        </Button>
        {errorMessage && (
          <Message
            message={errorMessage}
            type="error"
            onClose={closeErrMessageHandler}
          />
        )}
      </form>
    </div>
  );
};

export default ContactUsForm;
