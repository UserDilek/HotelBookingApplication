import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../apiClient";
import { useAppContext } from "../contexts/AppContext";


const SignOutButton = ()=>{
    const queryClient = useQueryClient();
    const { showToast } = useAppContext();

    const mutation = useMutation(apiClient.signOut, {
        onSuccess: async () => {
          await queryClient.invalidateQueries("validateToken");
          showToast({ message: "Signed Out!", type: "SUCCESS" });
        },
        onError: (error: Error) => {
          showToast({ message: error.message, type: "ERROR" });
        },
      });

      const handleClick = () => {
        mutation.mutate();
      };

      return (
        <button
          onClick={handleClick}
          className="flex bg-mainColor items-center text-white px-2 font-bold hover:text-black "
        >
          Sign Out
        </button>
      );
}
export default SignOutButton;