import { Waves } from "lucide-react";
import React from "react";
import { Link } from "react-router";

import { Button } from "@/components/ui/button";

import SpotlightCard from "./spit-light-card";
import { zodiacSigns } from "./zodiac";

const WaterSigns = () => {
  const waterSignKeys = ["cancer", "scorpio", "pisces"];
  const waterSignsData = waterSignKeys.map(key => zodiacSigns[key]);

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center space-x-3 mb-4">
          <Waves className="h-12 w-12 text-cyan-400" />
          <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent leading-tight">
            Water Signs
          </h1>
          <Waves className="h-12 w-12 text-cyan-400" />
        </div>
        <p className="text-xl text-white/80 max-w-3xl mx-auto">
          Emotional, intuitive, and empathetic. Water signs are the feelers of the zodiac,
          bringing depth, compassion, and psychic sensitivity to their connections.
        </p>
      </div>

      {/* Water Element Description */}
      <SpotlightCard className="bg-white/10 backdrop-blur-lg border-white/20 p-8 mb-12" spotlightColor="rgba(255, 255, 255, 0.3)">
        <h2 className="text-3xl font-semibold text-cyan-400 mb-6">The Water Element</h2>
        <div className="grid md:grid-cols-2 gap-8 text-white/80">
          <div>
            <h3 className="text-xl font-semibold text-cosmic-gold mb-4">Characteristics</h3>
            <ul className="space-y-3">
              <li>• <strong>Emotion:</strong> Deep and intuitive feelings</li>
              <li>• <strong>Intuition:</strong> Psychic and perceptive</li>
              <li>• <strong>Empathy:</strong> Compassionate and caring</li>
              <li>• <strong>Creativity:</strong> Artistic and imaginative</li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-cosmic-gold mb-4">Strengths</h3>
            <ul className="space-y-3">
              <li>• Highly intuitive and empathetic</li>
              <li>• Emotionally intelligent</li>
              <li>• Deeply loyal and protective</li>
              <li>• Creative and artistic</li>
            </ul>
          </div>
        </div>
      </SpotlightCard>

      {/* Individual Water Signs */}
      <div className="grid md:grid-cols-3 gap-8">
        {waterSignsData.map(sign => (
          <SpotlightCard key={sign.name} className=" relative rounded-3xl bg-white/10 border border-white/20 backdrop-blur-xl shadow-xl p-6 hover:bg-white/15 transition-all duration-300" spotlightColor="rgba(255, 255, 255, 0.3)">
            <div className="text-center">
              <div className="text-6xl mb-4">{sign.symbol}</div>
              <h3 className={`text-2xl font-bold ${sign.color} mb-2`}>{sign.name}</h3>
              <p className="text-white/70 text-sm mb-4">{sign.dates}</p>

              <div className="space-y-4 text-left">
                <div>
                  <h4 className="text-cosmic-gold font-semibold mb-2">Personality Traits</h4>
                  <div className="flex flex-wrap gap-2">
                    {sign.traits.map((trait, i) => (
                      <span key={i} className="bg-cyan-500/20 text-cyan-200 px-2 py-1 rounded-full text-xs">
                        {trait}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-cosmic-gold font-semibold mb-2">Compatible With</h4>
                  <p className="text-white/70 text-sm">
                    {sign.compatibleSigns.join(", ")}
                  </p>
                </div>

                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-cosmic-gold text-sm">Lucky Number:</span>
                    <span className="text-white ml-2">{sign.luckyNumber}</span>
                  </div>
                  <div className="text-cosmic-gold text-sm">🌊 Water</div>
                </div>
              </div>
            </div>
          </SpotlightCard>
        ))}
      </div>

      {/* Back to other elements */}
      <div className="mt-16 text-center">
        <h3 className="text-2xl font-semibold text-white mb-8">Explore Other Elements</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
          <Link to="/signs/earth" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            <Button variant="outline" className="border-green-400/30 text-green-400 hover:bg-green-400/10">
              🌍 Earth Signs
            </Button>
          </Link>
          <Link to="/signs/air" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            <Button variant="outline" className="border-blue-400/30 text-blue-400 hover:bg-blue-400/10">
              💨 Air Signs
            </Button>
          </Link>
          <Link to="/signs/fire" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            <Button variant="outline" className="border-cyan-400/30 text-cyan-400 hover:bg-cyan-400/10">
              🔥 Fire Signs
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default WaterSigns;
