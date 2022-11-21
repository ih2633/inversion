import { type NextPage } from "next";
import { trpc } from "@/utils/trpc";
import Cards from "@/components/article/Cards";
import { useRouter } from "next/router";
import { useSelectCategory } from "@/hooks/selectCategory";
import SelectCategoryButton from "@/components/article/SelectCategoryButton";
import Pagenation from "@/components/Pagenation";

const TagList: NextPage = () => {
  const [selectCategory, filterCategory] = useSelectCategory();

  const router = useRouter();
  const tagName = router.query.tagName as string;
  const skip = router.query.skip as string;
  const take = router.query.take as string;

  const page = { skip: skip, take: take };
  console.log(page);

  console.log(router.query);


  const { data: articles, isSuccess } = trpc.article.selectArticleTag.useQuery<string>({tagName, skip, take },{enabled: router.isReady});
  console.log({ articles });

  return (
    <>
      <div className="grid grid-cols-7 bg-gray-100">
        <div className="col-span-1">
          <div className="mt-24"></div>
        </div>
        <div className="col-span-4 border-x-2">
          <div className="m-12">
            <div className="mb-4 items-center space-x-5">
              <p className="prose-xl prose mb-5">#{tagName} 検索結果</p>
              <SelectCategoryButton
                selectCategory={selectCategory}
                filterCategory={filterCategory}
              />
            </div>
            {isSuccess && articles && (
              <Cards
                articles={articles}
                selectCategory={selectCategory}
              />
            )}
          </div>
          <Pagenation page={page} />
        </div>
        <div className="col-span-2"></div>
      </div>
    </>
  );
};

export default TagList;
