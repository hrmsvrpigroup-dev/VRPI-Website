import style from "./ThankyouScreen.module.css";

const ThankyouScreen = () => {
  return (
    <div className={style.container}>
      <img
        src={require(`../../../assets/login-signup/ThankYouImage.png`)}
        alt=""
        className={style.thankImage}
      ></img>
      <div className={style.thankText}>
        <h2 className={style.mainText}>Please Check your E-mail</h2>
        <p>
          Don’t worry!! We have safely stored your data. Please check out your
          E-mail for further process
        </p>
        <p>
          <span style={{ color: "#ff6501" }}>Note:</span> E-mail Link will be
          Expired in within 24 hrs from now
        </p>
        <h2 className={style.thankyou}>Thank You !</h2>
      </div>
    </div>
  );
};

export default ThankyouScreen;
