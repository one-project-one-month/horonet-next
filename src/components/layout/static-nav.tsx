import { ArrowLeft, Star } from "lucide-react";
import React from "react";
import { Link } from "react-router";

import { Button } from "../ui/button";

function StaticNav() {
  return (
    <nav className="flex justify-between items-center p-6">
      <Link to="/landing" className="flex items-center px-4 md:px-10">
        <Star className="h-8 w-8 text-cosmic-gold" />
        <span className="text-2xl font-bold text-white">Horonet</span>
      </Link>
      <Link to="/landing">
        <Button variant="ghost" className="text-white hover:bg-white/10">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Button>
      </Link>
    </nav>
  );
}

export default StaticNav;
