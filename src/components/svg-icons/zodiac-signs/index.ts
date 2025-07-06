import type { TZodiacSigns } from "@/lib/custom.types";

import Aquarius from "./_aquarius";
import Aries from "./_aries";
import Cancer from "./_cancer";
import Capricorn from "./_capricorn";
import Gemini from "./_gemini";
import Leo from "./_leo";
import Libra from "./_libra";
import Pisces from "./_pisces";
import Sagittarius from "./_sagittarius";
import Scorpio from "./_scorpio";
import Taurus from "./_taurus";
import Virgo from "./_virgo";

const signsIcons = { Aquarius, Aries, Cancer, Capricorn, Gemini, Leo, Libra, Pisces, Sagittarius, Scorpio, Taurus, Virgo };

function getIconFromSign(sign: TZodiacSigns) {
  return (
    signsIcons[sign]
  );
};

export {
  Aquarius,
  Aries,
  Cancer,
  Capricorn,
  Gemini,
  getIconFromSign,
  Leo,
  Libra,
  Pisces,
  Sagittarius,
  Scorpio,
  Taurus,
  Virgo,
};
