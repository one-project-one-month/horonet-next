import { Link } from "react-router";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const PrivacyPolicy = () => {
  return (
    <section className={"px-6"}>
      <Card className="w-full max-w-[850px]  mx-auto mt-10 bg-white/10 backdrop-blur-lg border-white/20 px-4 py-6 md:py-10 text-white">
        <CardHeader className={"mb-6"}>
          <CardTitle className="text-2xl font-bold lg:text-3xl">Privacy Policy</CardTitle>
          <CardDescription className="text-white/80">
            Last updated: July 2025
          </CardDescription>
        </CardHeader>
        <CardContent>
          <article>
            <h3 className={"mb-4 text-lg font-bold text-cosmic-gold"}>
              Information We Collect
            </h3>
            <p className={"mb-4 text-white/80"}>
              We collect information you provide directly to us, such as when
              you create an account, update your profile, or contact us for
              support.
            </p>
            <ul className={"list-disc pl-8 md:10 text-white/80"}>
              <li>
                Personal information (name, email, date of birth for zodiac
                calculations)
              </li>
              <li>Profile information (zodiac sign preferences, bio)</li>
              <li>Usage data and interactions within the app</li>
            </ul>
          </article>
          <hr className={"my-6"} />
          <article>
            <h3 className={"mb-4 text-lg font-bold text-cosmic-gold"}>
              How We Use Your Information
            </h3>
            <ul className={"list-disc pl-8 md:10 text-white/80"}>
              <li>Provide personalized horoscopes and compatibility matches</li>
              <li>Improve our services and user experience</li>
              <li>Send you important updates about our service</li>
              <li>Ensure the security and integrity of our platform</li>
            </ul>
          </article>
          <hr className={"my-6"} />
          <article>
            <h3 className={"mb-4 text-lg font-bold text-cosmic-gold"}>
              Information Sharing
            </h3>
            <p className={"mb-4 text-white/80"}>
              We do not sell, trade, or otherwise transfer your personal
              information to third parties without your consent, except as
              described in this policy.
            </p>
          </article>
          <hr className={"my-6"} />
          <article>
            <h3 className={"mb-4 text-lg font-bold text-cosmic-gold"}>
              Data Security
            </h3>
            <p className={"mb-4 text-white/80"}>
              We implement appropriate security measures to protect your
              personal information against unauthorized access, alteration,
              disclosure, or destruction.
            </p>
          </article>
          <hr className={"my-6"} />
          <article>
            <h3 className={"mb-4 text-lg font-bold text-cosmic-gold"}>
              Contact Us
            </h3>
            <p className={"mb-4 text-white/80"}>
              If you have any questions about this Privacy Policy, please
              contact us at <Link to={"/contact"} className={"text-cosmic-gold"}>our contact page.</Link>
            </p>
          </article>
        </CardContent>
      </Card>
    </section>
  );
};

export default PrivacyPolicy;
