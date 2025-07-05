import Quote from "../common/quote";

export default function Quotes() {
  return (
    <section className="mt-5 px-5">
      <h1 className="text-cosmic-gold text-3xl font-bold mb-3">✨ Your Cosmic Wisdom</h1>
      <div className="space-y-3">

        <Quote
          name="You"
          date={new Date()}
          quote="lorem ipsum dolor sit amet"
          totalCookie={5}
          totalRose={3}
          sign="Libra"
        />
        <Quote
          name="You"
          date={new Date()}
          quote="lorem ipsum dolor sit amet"
          totalCookie={5}
          totalRose={3}
          sign="Libra"
        />
        <Quote
          name="You"
          date={new Date()}
          quote="lorem ipsum dolor sit amet"
          totalCookie={5}
          totalRose={3}
          sign="Libra"
        />
      </div>
    </section>
  );
}
