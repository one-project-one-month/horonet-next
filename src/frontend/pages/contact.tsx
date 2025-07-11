import { Mail, MapPin, Phone } from "lucide-react";

import ContactForm from "@/components/static-pages/contact-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Contact = () => {
  return (
    <section className={"px-4 pb-16 md:px-16 cus:px-48!"}>
      <header className={"text-center"}>
        <h2 className="text-2xl font-bold lg:text-3xl">Contact Us</h2>
        <p className={"text-white/80 mt-3 md:text-lg"}>
          We'd love to hear from you. Send us a message and we'll respond as
          soon as possible.
        </p>
      </header>
      <div className={"mt-10 grid gap-8 md:grid-cols-2 grid-rows-2"}>
        <Card className="w-full mx-auto md:row-span-2 bg-white/10 backdrop-blur-lg border-white/20 px-4 text-white">
          <CardHeader>
            <CardTitle className="text-xl font-bold lg:text-2xl text-cosmic-gold">
              Send us a Message
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ContactForm />
          </CardContent>
        </Card>
        <Card className="w-full mx-auto bg-white/10 backdrop-blur-lg border-white/20 px-4 py-6 md:py-10 text-white">
          <CardHeader>
            <CardTitle className="text-xl font-bold lg:text-2xl text-cosmic-gold">
              Send us a Message
            </CardTitle>
          </CardHeader>
          <CardContent>
            <article>
              <div className={"flex items-center gap-x-6"}>
                <Mail className={"text-cosmic-gold"} />
                <div>
                  <h3 className={"font-bold"}>Email</h3>
                  <p>hello@cosmicconnection.com</p>
                </div>
              </div>
            </article>

            <article className={"mt-4"}>
              <div className={"flex items-center gap-x-6"}>
                <Phone className={"text-cosmic-gold"} />
                <div>
                  <h3 className={"font-bold"}>Phone</h3>
                  <p>+1 (555) 123-STAR</p>
                </div>
              </div>
            </article>

            <article className={"mt-4"}>
              <div className={"flex items-center gap-x-6"}>
                <MapPin className={"text-cosmic-gold"} />
                <div>
                  <h3 className={"font-bold"}>Address</h3>
                  <p>123 Cosmic Avenue, Starlight City, SC 12345</p>
                </div>
              </div>
            </article>
          </CardContent>
        </Card>
        <Card className="w-full mx-auto bg-white/10 backdrop-blur-lg border-white/20 px-4 py-6 md:py-10 text-white">
          <CardHeader>
            <CardTitle className="text-xl font-bold lg:text-2xl text-cosmic-gold">
              Office Hours
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className={"flex flex-col gap-y-3"}>
              <p>Monday - Friday: 9:00 AM - 6:00 PM PST</p>
              <p>Saturday: 10:00 AM - 4:00 PM PST</p>
              <p>Sunday: Closed</p>
            </div>
            <p className={"mt-5 text-white/60"}>
              We typically respond to all inquiries within 24 hours.
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default Contact;
