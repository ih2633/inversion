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

export async function getServerSideProps(context: GetServerSidePropsContext) {
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

  const { data: articles, isSuccess } = trpc.article.getAllArticles.useQuery();

  return (
    <>
      <div className="grid grid-cols-7 bg-gray-100">
        <div className="col-span-1">
          <div className="mt-24"></div>
        </div>
        <div className="col-span-4 border-x-2">
          <div className="m-12">
            <div className="mb-4 flex items-center space-x-5">
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
        </div>
        <div className="col-span-2"></div>
      </div>
    </>
  );
};

export default List;
