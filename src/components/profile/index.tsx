import Info from "./info";
import Quotes from "./quotes";

export default function Profile() {
  return (
    <section className="max-w-7xl mx-auto">
      <Info />
      <Quotes />
      <div className="h-dvh"></div>
    </section>
  );
}
