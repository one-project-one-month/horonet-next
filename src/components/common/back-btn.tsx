import { ArrowLeft } from "lucide-react";
import { Link } from "react-router";

export default function BackBtn() {
  return (
    <Link to="/app/horoscope" className="group hover:bg-background/10 px-3 cursor-pointer py-2 rounded-sm">
      <ArrowLeft className="inline mr-2 group-hover:-translate-x-1 transition" />
      Back to Home
    </Link>
  );
}
