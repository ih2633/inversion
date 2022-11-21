import { useForm, type SubmitHandler } from "react-hook-form";
import { useEffect } from "react"
import { useRouter } from 'next/router'
import type { SerchWord } from '@/types/article';

const SearchArticle = () => {
  const { register, handleSubmit } = useForm<SerchWord>();
  const router = useRouter()

  const onSubmit: SubmitHandler<SerchWord> = (data) => {
    console.log(data);
    const { search } = data;
    router.push({
      pathname: 'search/[searchWords]',
      query: { searchWords : search}
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
    </>
  );
};

export default SearchArticle;
