import type { SVGProps } from "react";

import * as React from "react";

const Jupiter = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="28px"
    height="24px"
    viewBox="5 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g id="jupiter">
      <path d="M17.89,8.21a1,1,0,0,0-1.34.45l-3.08,6.23H11.12l2.46-4.5A3.3,3.3,0,0,0,13.89,8a4.06,4.06,0,0,0-3.83-3.26A3.89,3.89,0,0,0,6.67,6.87a1,1,0,0,0,1.76,1,1.92,1.92,0,0,1,1.63-1.1A2.12,2.12,0,0,1,12,8.49a1.29,1.29,0,0,1-.12.94l-3.27,6a1,1,0,0,0,0,1,1,1,0,0,0,.86.49h3.05l-1,2a1,1,0,0,0,.46,1.34,1,1,0,0,0,.44.11,1,1,0,0,0,.9-.56l1.45-2.93h2.18a1,1,0,0,0,0-2H15.7l2.64-5.34A1,1,0,0,0,17.89,8.21Z" />
    </g>
  </svg>
);
export default Jupiter;
