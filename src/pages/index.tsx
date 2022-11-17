import { type NextPage } from "next";
import { useState } from "react";
import { trpc } from "@/utils/trpc";
import ArticleForm from "@/components/article/form";
import Cards from "@/components/article/Cards";


import { useSelectCategory } from "@/hooks/selectCategory";
import SelectCategoryButton from "@/components/article/SelectCategoryButton"

const List: NextPage = () => {
  const [selectCategory, filterCategory] = useSelectCategory();

  const { data: articles, isSuccess } = trpc.article.getAllArticles.useQuery();
  console.log({ articles });

  console.log({ selectCategory });

  return (
    <>
      <div className="grid grid-cols-7 bg-gray-100">
        <div className="col-span-1">
          <div className="mt-24">

          </div>
        </div>
        <div className="col-span-4 border-x-2">
          <div className="m-12">
            <div className="mb-4 flex items-center space-x-5">
              <p className=" text-xl">新着記事</p>
              <SelectCategoryButton selectCategory={selectCategory} filterCategory={filterCategory} />
            </div>
            {isSuccess && articles && (
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
