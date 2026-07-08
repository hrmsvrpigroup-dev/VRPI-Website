import Section from "../../UI/Sections/Section";
import style from "./OurClients.module.css";

const ImageList = [
  "breathFireLogo.jpg",
  "unionSys.jpg",
  "vsLogo.jpg",
  "savyasaachiLogo.jpg",
  "softHQLogo.jpg",
  "reflectionsLogo.jpg",
  "profitShadowKLogo.jpg",
  "ICICILogo.png",
  "mahindraLogo.jpg",
];
const OurClients = () => {
  return (
    <div>
      <Section title="Our Clients">
        <div className={style.clientBox}>
          <div className={style.clientsImages}>
            {ImageList.map((clientImage) => (
              <div className={style.clientImage} key={Math.random()}>
                <img
                  src={require(`../../assets/clients/${clientImage}`)}
                  alt=""
                />
              </div>
            ))}
          </div>
          <div className={style.clientsContent}>
            <h1>
              Some of our <span>Clients</span> we are working with
            </h1>
          </div>
        </div>
      </Section>
    </div>
  );
};
export default OurClients;
