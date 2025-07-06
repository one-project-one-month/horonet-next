import type { SVGProps } from "react";

import * as React from "react";

const Pluto = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width="20px"
    height="20px"
    viewBox="-20 -20 350 350"
    xmlSpace="preserve"
    {...props}
  >
    <path d="M234.568,258H83.432v-75.389h87.933c45.878,0,83.203-37.325,83.203-83.203c0-45.878-37.324-83.202-83.202-83.202H83.062 C81.288,6.976,73.18,0,63.432,0c-11.046,0-20,8.954-20,20v258c0,11.046,8.954,20,20,20h171.136c11.046,0,20-8.954,20-20 S245.614,258,234.568,258z M214.568,99.408c0,23.822-19.381,43.203-43.203,43.203H83.432V56.206h87.934 C195.187,56.206,214.568,75.587,214.568,99.408z" />
  </svg>
);
export default Pluto;
