import { useRouter } from 'next/router'
import { useForm, type SubmitHandler } from "react-hook-form";
import Cards from "@/components/article/Cards";
import { useEffect, useState } from "react";
import { trpc } from "@/utils/trpc";
import { useSelectCategory } from "@/hooks/selectCategory";
import SelectCategoryButton from "@/components/article/SelectCategoryButton"
import type { SearchWords } from '@/types/article';
import Pagenation from "@/components/Pagenation";

type ResultInfo = {
  searchWords: string
  skip: string
  take: string
}

type PagenationInfo = {
  skip: string
  take: string
}

const initData = {
  searchWords: "",
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
  return typeof d.searchWords === "string";
}

const SerchResult = () => {
  const { register, handleSubmit } = useForm<SearchWords>();
  const [selectCategory, filterCategory] = useSelectCategory();

  const [resultInfo, setResultInfo] = useState<ResultInfo>(initData);
  const [pagenationInfo, setPagenationInfo] = useState<PagenationInfo>(initPagenationData)
  const [isReady, setIsReady] = useState<boolean>(false)

  const router = useRouter()

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
  }, [router])

  const { data: articles, isSuccess, isLoading } = trpc.article.searchWordForContent.useQuery<ResultInfo>(resultInfo, { enabled: isReady });

  const onSubmit: SubmitHandler<SearchWords> = (data) => {
    const { searchWords } = data;
    router.push({
      pathname: "/search/result",
      query: { searchWords: searchWords, skip: 0, take: 20 }
    })
  };

  return (
    <>
      <div className="">
        <div className=" bg-green-200">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex w-4/5 items-end  mx-auto md:justify-center">
              <div className="form-control w-full max-w-xs  ">
                <label className="label">
                  <span className="label-text">Search</span>
                </label>
                <input
                  type="text"
                  placeholder="Search"
                  className="input-bordered input w-full max-w-xs"
                  {...register("searchWords")}
                />
              </div>
              <button className="btn-outline btn-info btn ml-4" type="submit">
                submit
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className=" bg-gray-100 ">
        <div className="md:w-3/5 mx-auto">
            <div className="my-4 md:mx-auto ml-4 md:flex md:items-center space-x-5">
              <p className=" text-xl mb-2">#{resultInfo.searchWords} 検索結果</p>
              <SelectCategoryButton
                selectCategory={selectCategory}
                filterCategory={filterCategory}
              />
            </div>
            {isSuccess && articles && (
              <Cards articles={articles} selectCategory={selectCategory} />
            )}
            {isLoading && (
              <div className="h-10 w-10 animate-spin rounded-full border-4 border-info border-t-transparent"></div>
            )}
            {!articles && !isLoading && <div>Not Data</div>}
          </div>
          <Pagenation page={pagenationInfo} />
        </div>
    </>
  );
}

export default SerchResult