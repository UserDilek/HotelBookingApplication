import {useForm} from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../apiClient";
 

export type RegisterFormData = {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  confirmpassword: string;
};


import { Link } from "react-router-dom";

const dilek = () => {   

  const { register, watch,  handleSubmit,formState: { errors },} = useForm<RegisterFormData>();
  console.log("adım1");
const mutation = useMutation(apiClient.register, {
    onSuccess: async () => {
     console.log("suceess");
    },
    onError: (error: Error) => {
        console.log(error.message);
    },
  });

  console.log("adım2");
   const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
    console.log(data);
  });

  return(
    <div className="flex flex-row ">
     <div className=" bg-mainColor w-3/5 visible h-screen flex justify-center items-end "> 
        <img className=" h-auto max-w-lg rounded-lg" src="/Illustration.png" alt="image description"></img>   
     </div> 

      <div className=" w-2/5 self-between">
        <div className="flex justify-center items-center">
          <img className="h-auto max-w-lg rounded-lg " src="/logo.png" alt="image description"></img> 
        </div>
        
          <form onSubmit={onSubmit}>
            <h2 className="pb-10">Create an Account</h2>
              <label className="text-gray-700 text-md font-bold">     
                <input className=" border-2 border-mainColor rounded-full py-3 mx-3 font-normal text-center w-5/12" placeholder="First Name"
                {...register("firstname", { required: "Please enter your first name." })} 
                ></input>
              </label>

              <label className="text-black-700 text-md font-bold space-y-6 ">     
                <input className=" border-2 border-mainColor rounded-full  mt-10  py-3 font-normal text-center  w-5/12" placeholder="Last Name"
                  {...register("lastname", { required: "Please enter your last name." })} 
                ></input>
              </label>

              <label className="text-black-700 text-md font-bold ">     
                <input className=" border-2 border-mainColor rounded-full  mt-10 py-3 font-normal text-center w-10/12" placeholder="Email"
                 {...register("email", { required: "Please enter your email address." })} 
                ></input>
              </label>

              <label className="text-black-700 text-md font-bold ">     
                <input className="border border-mainColor rounded-full  mt-10 py-3 font-normal text-center w-10/12" placeholder="Password"
                {...register("password", {
                  required: "This field is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },})} 
                ></input>
              </label>

              <label className="text-black-700 text-md font-bold ">     
                <input className="border-2 border-mainColor rounded-full my-10 py-3 font-normal text-center w-10/12" placeholder="Confirm Password"
                 {...register("confirmpassword", {
                  validate: (val) => {
                    if (!val) {
                      return "This field is required";
                    } else if (watch("password") !== val) {
                      return "Your passwords do no match";
                    }
                  },
                })}
                ></input>
              </label>

              {errors.firstname && (
                <p className="text-red m-3"  >{"*" + errors.firstname.message}</p>
               )}

                {errors.lastname && (
                <p className="text-red m-3"  >{"*" + errors.lastname.message}</p>
               )}

              {errors.email && (
                <p className="text-red m-3"  >{"*" + errors.email.message}</p>
               )}

              {errors.password && (
                <p className="text-red m-3"  >{"*" + errors.password.message}</p>
               )}

              {errors.confirmpassword && (
                <p className="text-red m-3"  >{"*" + errors.confirmpassword.message}</p>
               )}


              <div className="text-gray-700 text-sm font-bold h-20">
                <button type="submit" className=" bg-mainColor rounded-full text-white w-1/3 h-4/5 px-5">Create an Account</button>
            </div>

            Don't have an account yet? <Link className="font-bold" to="/register">Sign Up</Link> 

          </form>
     </div>
    </div>
  )
};

export default dilek;