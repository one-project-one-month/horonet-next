import ReviewCard from "@/components/landing/review-card";
import { REVIEWS } from "@/lib/constants";

const Review = () => {
  return (
    <section className={"px-4 py-10  md:px-6 lg:px-20"}>
      <h2
        className={
          "max-w-[900px] mx-auto mb-4 text-4xl md:text-5xl  text-center  font-bold "
        }
      >
        What Our Users Say
      </h2>
      <div className={"mt-8 grid gap-8 md:grid-cols-2 lg:grid-cols-4 md:mt-10 lg:mt-14"}>
        {REVIEWS.map(review => (
          <ReviewCard {...review} key={review.userName} />
        ))}
      </div>
    </section>
  );
};

export default Review;
