import { Link } from "react-router";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const Tos = () => {
  return (
    <section className={"px-6 pb-16"}>
      <Card className="w-full max-w-[850px]  mx-auto mt-10 bg-white/10 backdrop-blur-lg border-white/20 px-4 py-6 md:py-10 text-white">
        <CardHeader className={"mb-6"}>
          <CardTitle className="text-2xl font-bold lg:text-3xl">
            Term of Service
          </CardTitle>
          <CardDescription className="text-white/80">
            Last updated: July 2025
          </CardDescription>
        </CardHeader>
        <CardContent>
          <article>
            <h3 className={"mb-4 text-lg md:text-xl font-bold text-cosmic-gold"}>
              Acceptance of Terms
            </h3>
            <p className={"mb-4 text-white/80"}>
              By accessing and using Cosmic Connection, you accept and agree to
              be bound by the terms and provision of this agreement.
            </p>
          </article>
          <hr className={"my-6"} />

          <article>
            <h3 className={"mb-4 text-lg md:text-xl font-bold text-cosmic-gold"}>
              Use License
            </h3>
            <p className={"mb-4 text-white/80"}>
              Permission is granted to temporarily use Cosmic Connection for
              personal, non-commercial transitory viewing only.
            </p>
            <p className={"mb-4 text-white/80"}>
              This license shall not allow you to:
            </p>
            <ul className={"list-disc pl-8 md:10 text-white/80"}>
              <li>Modify or copy the materials</li>
              <li>Use the materials for commercial purposes</li>
              <li>Attempt to reverse engineer any software</li>
              <li>Remove any copyright or proprietary notations</li>
            </ul>
          </article>
          <hr className={"my-6"} />

          <article>
            <h3 className={"mb-4 text-lg md:text-xl font-bold text-cosmic-gold"}>
              User Accounts
            </h3>
            <p className={"mb-4 text-white/80"}>
              When you create an account with us, you must provide accurate and
              complete information.
            </p>
            <ul className={"list-disc pl-8 md:10 text-white/80"}>
              <li>You are responsible for safeguarding your password</li>
              <li>You must not share your account with others</li>
              <li>You must notify us of any unauthorized use</li>
            </ul>
          </article>
          <hr className={"my-6"} />

          <article>
            <h3 className={"mb-4 text-lg md:text-xl font-bold text-cosmic-gold"}>
              Content Guidelines
            </h3>
            <p className={"mb-4 text-white/80"}>
              Users agree not to post content that is:
            </p>
            <ul className={"list-disc pl-8 md:10 text-white/80"}>
              <li>Harmful, threatening, or abusive</li>
              <li>Defamatory or invasive of privacy</li>
              <li>Spam or unauthorized advertising</li>
              <li>Infringing on intellectual property rights</li>
            </ul>
          </article>
          <hr className={"my-6"} />

          <article>
            <h3 className={"mb-4 text-lg md:text-xl font-bold text-cosmic-gold"}>
              Disclaimer
            </h3>
            <p className={"mb-4 text-white/80"}>
              Cosmic Connection provides astrological content for entertainment
              purposes only. We do not guarantee the accuracy of horoscopes or
              compatibility readings.
            </p>
          </article>
          <hr className={"my-6"} />

          <article>
            <h3 className={"mb-4 text-lg md:text-xl font-bold text-cosmic-gold"}>
              Contact Information
            </h3>
            <p className={"mb-4 text-white/80"}>
              Questions about the Terms of Service should be sent to us at our &nbsp;
              <Link to={"/contact"} className={"text-cosmic-gold"}>contact page</Link>.
            </p>
          </article>
        </CardContent>
      </Card>
    </section>
  );
};

export default Tos;
