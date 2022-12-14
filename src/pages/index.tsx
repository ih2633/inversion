import { createProxySSGHelpers } from "@trpc/react-query/ssg";
import type {
  NextPage,
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import superjson from "superjson";
import { appRouter } from "@/server/trpc/router/_app";
import { trpc } from "@/utils/trpc";
import Cards from "@/components/article/Cards";
import { prisma } from "@/server/db/client";
import { useSelectCategory } from "@/hooks/selectCategory";
import SelectCategoryButton from "@/components/article/SelectCategoryButton";

export async function getServerSideProps() {
  const ssg = createProxySSGHelpers({
    router: appRouter,
    ctx: { session: null, prisma },
    transformer: superjson,
  });

  await ssg.article.getAllArticles.fetch();

  return {
    props: {
      trpcState: ssg.dehydrate(),
    },
  };
}

const List = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  const [selectCategory, filterCategory] = useSelectCategory();

  const { data: articles } = trpc.article.getAllArticles.useQuery();

  return (
    <div className="">
        {/* <div className="col-span-1">
          <div className="mt-24"></div>
        </div> */}
        <div className="md:w-3/5 mx-auto">
          <div className=" flex items-center my-3 ml-3 md:justify-center space-x-5">
            <p className=" text-xl">新着記事</p>
            <SelectCategoryButton
              selectCategory={selectCategory}
              filterCategory={filterCategory}
            />
          </div>
          {props && articles && (
            <Cards articles={articles} selectCategory={selectCategory} />
          )}
        </div>
        {/* <div className="col-span-2"></div> */}
      </div>
  );
};

export default List;
