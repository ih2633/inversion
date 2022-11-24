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
      <div className="w-screen">
        <div className="mx-auto w-4/5 ">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mx-auto flex w-4/5 items-end space-x-4">
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
              <button className="btn-outline btn-info btn" type="submit">
                submit
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="grid bg-gray-100 lg:grid-cols-7">
        <div className="col-span-1">
          <div className="mt-24"></div>
        </div>
        <div className="col-span-4  border-x-2 md:mx-auto md:w-4/5">
          <div className="m-12">
            <div className="mb-4 flex items-center space-x-5">
              <p className=" text-xl">#{resultInfo.searchWords} 検索結果</p>
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
        <div className="col-span-2"></div>
      </div>
    </>
  );
}

export default SerchResult