import { Star } from "lucide-react";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className={"bg-cosmic-deep-purple"}>
      <div
        className={
          "px-4 py-10 grid md:grid-cols-3  md:px-6 lg:px-40 "
        }
      >
        <div>
          <h2>
            <Link
              to={"/landing"}
              className={
                "flex items-center justify-center gap-x-1.5 md:justify-start"
              }
            >
              <Star color={"gold"} />
              <span className={"font-bold text-xl text-white"}>Horonet</span>
            </Link>
          </h2>
          <p className={"mt-4 text-white/60 max-sm:text-center"}>
            Connecting souls through the wisdom of the stars
          </p>
        </div>
        <div className={"max-sm:mt-6 text-center"}>
          <h3 className={"font-bold text-white"}>Zodiac Signs</h3>
          <ul className={"mt-4 flex flex-col gap-y-2 text-white/60"}>
            <li>
              <Link to={"/signs/fire"}>Fire Signs</Link>
            </li>
            <li>
              <Link to={"/signs/earth"}>Earth Signs</Link>
            </li>
            <li>
              <Link to={"/signs/air"}>Air Signs</Link>
            </li>
            <li>
              <Link to={"/signs/water"}>Water Signs</Link>
            </li>
          </ul>
        </div>

        <div className={"max-sm:mt-6 text-center"}>
          <h3 className={"font-bold text-white"}>Support</h3>
          <ul className={"mt-4 flex flex-col gap-y-2 text-white/60"}>
            <li>
              <Link to={"/privacy-policy"}>Privacy Policy</Link>
            </li>
            <li>
              <Link to={"/terms-of-service"}>Terms Of Service</Link>
            </li>
            <li>
              <Link to={"/contact"}>Contact Us</Link>
            </li>
          </ul>
        </div>

        <div className={"md:col-span-3 w-full h-[1px] mt-10 bg-white/20"} />
      </div>
      <div className={"pb-10 text-center text-white/60"}>
        <p>
          © {new Date().getFullYear()} Cosmic Connection. Made with ✨ and
          guided by the stars.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
