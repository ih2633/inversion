import { useRouter } from 'next/router'
import { useForm, type SubmitHandler } from "react-hook-form";
import Cards from "@/components/article/Cards";

import { trpc } from "@/utils/trpc";
import { useSelectCategory } from "@/hooks/selectCategory";
import SelectCategoryButton from "@/components/article/SelectCategoryButton"
import type { SerchWord } from '@/types/article';

const SerchResult = () => {
  const { register, handleSubmit } = useForm<SerchWord>();
  const [selectCategory, filterCategory] = useSelectCategory();
  const router = useRouter()
  const search = router.query.searchWords as string

  const { data: articles, isSuccess } = trpc.article.searchWordForContent.useQuery<string>({ search });

  const onSubmit: SubmitHandler<SerchWord> = (data) => {
    const { search } = data;
    router.push({
      pathname: '/search/[searchWords]',
      query: { searchWords: search }
    })
  };

  return (
    <>
      <div className="w-screen">
        <div className="mx-auto w-4/5 ">
          <form onSubmit={handleSubmit(onSubmit)} >
            <div className="mx-auto w-4/5 flex items-end space-x-4">
              <div className="form-control w-full max-w-xs  ">
                <label className="label">
                  <span className="label-text">Search</span>
                </label>
                <input
                  type="text"
                  placeholder="Search"
                  className="input-bordered input w-full max-w-xs"
                  {...register("search")}
                />
              </div>
              <button className="btn-outline btn-info btn" type="submit">
                submit
              </button>
            </div>
          </form>
        </div>
      </div>
      <p>{search}</p>
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
  )
}

export default SerchResult