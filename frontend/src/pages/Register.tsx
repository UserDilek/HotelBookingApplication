import {useForm} from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../apiClient";
import { Link,useNavigate } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import { Toast } from "../components/Toast";
 

export type RegisterFormData = {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  confirmpassword: string;
};

const Register = () => {   
  const navigate = useNavigate();
  const {showToast} = useAppContext();
  const { register, watch,  handleSubmit,formState: { errors },} = useForm<RegisterFormData>();

const mutation = useMutation(apiClient.register, {
    onSuccess: async () => {
     console.log("suceess");
     showToast({
       message: "Account created successfully",
       type: "SUCCESS",
     });  
     navigate("/signin");
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
    
  });

  return(

    <div className="login-main">
    <div className="primary-color image-block">
    <img src='../src/assets/images/illustration.png' alt="illustration" className="ill-img"/>
    <div className="mb-d"><a href="#" className="logo"><img src='../src/assets/images/white-logo.png' alt='Logo'></img></a>
        <h3 className="tag">Create an Account</h3></div>
    </div>
    <div className="form-block">
       <Link to="/"><div className="logo"><img src='../src/assets/images/logo.png' alt='Logo'></img></div></Link>  
        <h3 className="tag">Create an Account</h3>
        <form onSubmit={onSubmit}>
            <div className="field-block">
                <div className="input-block">
                    <span className="icon"><img src='../src/assets/images/mail.png' alt='icon'></img></span>
                    <input type="text" placeholder= "First Name"
                      {...register("firstname", { required: "Please enter your first name." })} ></input>       
                </div>
                <div className="input-block">
                    <span className="icon"><img src='../src/assets/images/mail.png' alt='icon'></img></span>
                    <input type="text" placeholder= "Last Name"
                      {...register("lastname", { required: "Please enter your last name." })} ></input>
                </div> 

                <div >           
                </div> 
                

            </div>
            <div className="input-block">
                    <span className="icon"><img src='../src/assets/images/mail.png' alt='icon'></img></span>
                    <input type="email" placeholder= "Enter mail id/ Number"
                      {...register("email", { required: "Please enter your email address." })} ></input>
            </div>
            <div className="input-block">
                    <span className="icon"><img src='../src/assets/images/password.png' alt='icon'></img></span>
                    <input type="password" placeholder= "Enter a password"
                    {...register("password", {
                      required: "This field is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters",
                      },})} ></input>
            </div>

            <div className="input-block">
                    <span className="icon"><img src='../src/assets/images/password.png' alt='icon'></img></span>
                    <input type="password" placeholder= "Enter a repassword"
                   {...register("confirmpassword", {
                    validate: (val) => {
                      if (!val) {
                        return "This field is required";
                      } else if (watch("password") !== val) {
                        return "Your passwords do no match";
                      }
                    },
                  })}></input>
            </div>
            {errors.firstname && (
                <p className="text-red-500"  >{"*" + errors.firstname.message}</p>
               )}

                {errors.lastname && (
                <p className="text-red-500"  >{"*" + errors.lastname.message}</p>
               )}

              {errors.email && (
                <p className="text-red-500"  >{"*" + errors.email.message}</p>
               )}

              {errors.password && (
                <p className="text-red-500"  >{"*" + errors.password.message}</p>
               )}

              {errors.confirmpassword && (
                <p className="text-red-500"  >{"*" + errors.confirmpassword.message}</p>
               )}


            <input type="submit" value="Sign up" className="btn"></input>
        </form>
    
        <p className="btm">Already have an account     <Link to="/signin">Signin</Link></p>
    </div>
</div>

   
  )
};

export default Register;