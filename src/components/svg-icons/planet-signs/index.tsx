import { Mars, Venus } from "lucide-react";

import type { TPlanetSigns } from "@/lib/custom.types";

import Jupiter from "./_jupiter";
import Mercury from "./_mercury";
import Moon from "./_moon";
import Neptune from "./_neptune";
import Pluto from "./_pluto";
import Saturn from "./_saturn";
import Sun from "./_sun";
import Uranus from "./_uranus";

const signsIcons = {
  Jupiter,
  Mars,
  Mercury,
  Moon,
  Neptune,
  Pluto,
  Saturn,
  Uranus,
  Venus,
  Sun,
};

function getPlanetFromSign(sign: TPlanetSigns) {
  return signsIcons[sign];
}

export {
  getPlanetFromSign,
  Jupiter,
  Mars,
  Mercury,
  Moon,
  Neptune,
  Pluto,
  Saturn,
  Sun,
  Uranus,
  Venus,
};
