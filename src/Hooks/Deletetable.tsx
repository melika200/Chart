import { useMutation, useQueryClient, UseMutationResult } from "react-query";
import Tabledata from "../Services/Tableurl/Tabledata";

interface Row {
  id: string;
  title: string;
  recordDateFa: string;
  position: string;
}

const useDeletetable = (): UseMutationResult<
  Row,
  unknown,
  string,
  { previoustable: Row[] | undefined }
> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data) => {
      const res = await Tabledata.put(`https://sit-bnpl.saminray.com/merchantnew/News/ChangeStatus`,{
        data
      });
      return res.data;
    },
    onMutate: async (id: string) => {
      await queryClient.cancelQueries(["Token"]);
      const previoustable = queryClient.getQueryData<Row[]>(["Token"]);
      queryClient.setQueryData(["Token"], (old: Row[] | undefined) =>
        old ? old.filter((row) => row.id !== id) : []
      );
      return { previoustable };
    },
    onError: (err, id, context) => {
      queryClient.setQueryData(["Token"], context?.previoustable);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["Token"]);
    },
  });
};

export default useDeletetable;
