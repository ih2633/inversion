import { type NextPage } from "next";
import { useEffect, useState } from "react";
import { trpc } from "@/utils/trpc";
import Cards from "@/components/article/Cards";
import { useRouter } from "next/router";
import { useSelectCategory } from "@/hooks/selectCategory";
import SelectCategoryButton from "@/components/article/SelectCategoryButton";
import Pagenation from "@/components/Pagenation";

type ResultInfo = {
  tagName: string
  skip: string
  take: string
}

type PagenationInfo = {
  skip: string
  take: string
}

const initData = {
  tagName: "",
  skip: "0",
  take: ""
}

const initPagenationData = {
  skip: "0",
  take: ""
}

const isPageInfo = (data: unknown): data is ResultInfo => {
  if (data == null) {
    return false;
  }
  const d = data as Record<string, unknown>
  return typeof d.tagName === "string" && typeof d.skip === "string" && typeof d.take === "string";
}

const TagList: NextPage = () => {
  const [selectCategory, filterCategory] = useSelectCategory();
  const [resultInfo, setResultInfo] = useState<ResultInfo>(initData);
  const [pagenationInfo, setPagenationInfo] = useState<PagenationInfo>(initPagenationData)
  const [isReady, setIsReady] = useState<boolean>(false)
  const router = useRouter();
  
  useEffect(() => {
    if (router.isReady) {
      const query = router.query
      console.log(query)
      if (isPageInfo(query)) {
        setResultInfo(query)
        setPagenationInfo({ skip: query.skip, take: query.take })
        setIsReady(true)
      }
    }
  },[router])

  const { data: articles, isSuccess, isLoading } = trpc.article.selectArticleTag.useQuery<ResultInfo>(resultInfo, { enabled: isReady });


  return (
    <>
      <div className="grid grid-cols-7 bg-gray-100">
        <div className="col-span-1">
          <div className="mt-24"></div>
        </div>
        <div className="col-span-4 border-x-2">
          <div className="m-12">
            <div className="mb-4 items-center space-x-5">
              <p className="prose-xl prose mb-5">#{resultInfo.tagName} 検索結果</p>
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
            {!isLoading && !articles ? <div>Not Data</div> :
            <div></div>}
            
          </div>
          <Pagenation page={pagenationInfo} />
        </div>
        <div className="col-span-2"></div>
      </div>
    </>
  );
};

export default TagList;
