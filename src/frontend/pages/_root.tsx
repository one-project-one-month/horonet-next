import { trpc } from "@/trpc/clitent";

const RootPage = () => {
  const query = trpc.hello.useQuery({ text: "SuperCoder" });
  if (!query.data) {
    return <div>Loading...</div>;
  }
  return <div>Testing Message: {query.data.greeting}</div>;
};

export default RootPage;
