import heroImg from "../assets/admin.png";

const Hero = () => {
  return (
    <div className="herosection">
      <div className="hero">
        <p id="iam">I'M</p>
        <h1 className="mainhead">Mr. Satish Rathod</h1>
        <p className="p1">Python Developer & Fullstack Developer</p>
        <p className="p2">Consultant ...</p>
        <button className="btn-contact">Contact Me</button>
      </div>

      <div className="hero-img">
        <img src={heroImg} alt="satish" />
      </div>
    </div>
  );
};

export default Hero;
