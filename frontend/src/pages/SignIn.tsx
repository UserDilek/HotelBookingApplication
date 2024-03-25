import {useForm} from "react-hook-form";
import { useMutation } from "react-query";
import * as apiClient from "../apiClient";
import { Link,useNavigate } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";


export type SignInFormData = {
    email: string;
    password: string;
  };

const SignIn = () => {   
  const navigate = useNavigate();
  const {showToast} = useAppContext();
  const { register,  handleSubmit,formState: { errors },} = useForm<SignInFormData>();

const mutation = useMutation(apiClient.signIn, {
    onSuccess: async () => {
     console.log("suceess");
     showToast({
       message: "Login is successfull",
       type: "SUCCESS",
     });  
   //  await queryClient.invalidateQueries("validateToken");
     navigate("/");
    },
    onError: (error: Error) => {
        showToast({
          message: error.message,
          type: "ERROR",
        }); 
    },
  });


   const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
    console.log(data);
  });

  return(
    <div className="login-main">
    <div className="primary-color image-block">
    <img src='Illustration.png' alt="illustration" className="ill-img"/>
    <div className="mb-d"><a href="#" className="logo"><img src='white-logo.png' alt='Logo'></img></a>
        <h3 className="tag">Login</h3></div>
    </div>
    <div className="form-block">
       <Link to="/"><div className="logo"><img src='logo.png' alt='Logo'></img></div></Link>  
        <h3 className="tag">Login</h3>
        <form onSubmit={onSubmit}>
            <div className="input-block">
                    <span className="icon"><img src='mail.png' alt='icon'></img></span>
                    <input type="email" placeholder= "Enter mail id/ Number"
                      {...register("email", { required: "Please enter your email address." })} ></input>
            </div>
            <div className="input-block">
                    <span className="icon"><img src='password.png' alt='icon'></img></span>
                    <input type="password" placeholder= "Enter a password"
                    {...register("password", {
                      required: "This field is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters",
                      },})} ></input>
            </div>


              {errors.email && (
                <p className="text-red m-3"  >{"*" + errors.email.message}</p>
               )}

              {errors.password && (
                <p className="text-red m-3"  >{"*" + errors.password.message}</p>
               )}

            <input type="submit" value="Sign In" className="btn"></input>
        </form>
    
        <p className="btm">Already have not an account  <Link to="/register">Sign Up</Link></p>
    </div>
</div>
  )
};

export default SignIn;
