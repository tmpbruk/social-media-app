import useSWR from "swr";

import fetcher from "@/libs/fetcher";
//SWR will fetch api/current, using the axios fetcher and it is going to
// store it in its global store.
// We can re-use useCurrent in different place, but it is not going to refetch every time we use it.
// It will check and see if data already exists and will decide if data needs to be fetched again.
// This will replace our global state e.g redux.
const useUser = (userId: string) => {
  const { data, error, isLoading, mutate } = useSWR(
    userId ? `/api/users/${userId}` : null,
    fetcher
  );

  return { data, error, isLoading, mutate };
};

export default useUser;
