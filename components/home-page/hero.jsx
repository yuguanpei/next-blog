import classes from "./hero.module.css";
import Image from "next/image";
function Hero() {
  return (
    <section className={classes.hero}>
      <div className={classes.image}>
        <Image
          src="/images/site/Gary.jpeg"
          alt="An image showing Gary"
          width={300}
          height={300}
        />
      </div>
      <h1>Hi I'm Gary</h1>
      <p>
        A blog about web development - especially frontend frameworks like
        React.
      </p>
    </section>
  );
}

export default Hero;
