import { type NextPage } from "next";
import { trpc } from "@/utils/trpc";
import { useRouter } from "next/router";
import { useForm, type SubmitHandler } from "react-hook-form";
import type { ProfileInfo } from "@/types/user"


const SettingProfile: NextPage = () => {
  const router = useRouter();
  const { register, handleSubmit } = useForm<ProfileInfo>({});

  const userId = router.query.userId as string;

  const mutation = trpc.profile.setProfile.useMutation({
    onSuccess: () => {
      router.replace(`/user/${userId}`)
    }
  })

  const onSubmit: SubmitHandler<ProfileInfo> = (data) => {
    const { name, profile } = data;
    mutation.mutate({ name, profile, userId });
  }

  return (
    <>

      <div className="flex w-3/5 flex-col mx-auto ">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              placeholder="Name"
              className="input-bordered input w-full max-w-xs"
              {...register("name")}
            />
          </div>
          <div className="form-control w-3/5">
            <label className="label">
              <span className="label-text">Profile</span>
            </label>
            <textarea
              placeholder="Profile"
              className="textarea-bordered textarea w-full  h-72"
              {...register("profile")}
            ></textarea>
          </div>
          <button className="btn btn-success btn-outline  w-24 mt-5" type="submit">
            fix
          </button></form>
      </div>
    </>
  );
};

export default SettingProfile;

