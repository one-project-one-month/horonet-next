import { MoonStar } from "lucide-react";
import Image from "next/image";

import { BASE_SVG_PATH } from "./compatibility-constants";

const WiseWords = ({ sign }: { sign: string }) => {
  return (
    <section>
      <h2
        className={
          "mt-4 max-w-[900px] mx-auto mb-8 text-md md:text-lg lg:text-2xl text-center font-bold bg-gradient-to-r from-cosmic-gold via-cosmic-starlight to-cosmic-gold bg-clip-text text-transparent"
        }
      >
        <MoonStar
          className={"inline-block size-4 mr-4 md:size-8 lg:size-12"}
          color={"white"}
        />
        <span>Let your stars guide you, young traveler...</span>
      </h2>

      <div className="text-center">
        <Image src={`${BASE_SVG_PATH}/${sign}.svg`} alt={`${sign}.svg`} width={150} height={150} className="animate-pulse mx-auto" />

        <h4 className="mt-4 mx-auto text-center text-sm md:text-sm lg:text-lg font-bold bg-gradient-to-r from-cosmic-gold via-cosmic-starlight to-cosmic-gold bg-clip-text text-transparent">
          Who shall ignite the soul of a {sign} such as you?
        </h4>
      </div>
    </section>
  );
};

export default WiseWords;
