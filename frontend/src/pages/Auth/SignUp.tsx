import React from "react";
import google_icon from '../../assets/google.png'
import facebook_icon from '../../assets/Facebook.png'
import warning_icon from '../../assets/warning.svg'
import { Link, useNavigate} from "react-router-dom";
import Header from "../../components/Header";
import { Formik, Form, FormikHelpers } from "formik";
import { registerValidator } from "../../validationSchema/validator";
import TextInput from "../../components/TextInput";
import { useTodos } from "../../context/TodoContext";

const RegisterPage = () => {

    const { signUpUser, loading } = useTodos();
    
    interface Values {
        username: string;
        email: string;
        password: string;
        acceptTerms: string
    }

    const navigate = useNavigate()

    const handleSubmit = async (values: Values) => {
       const isSuccess = await signUpUser(values.username, values.email, values.password);
       if(isSuccess){
         navigate('/home')
       }
    };


  return (
    <div className="min-h-screen flex flex-col">

          {/* Header Section */}
          <Header />


   {/* Main Content */}
   <main className="mt-6 flex flex-col justify-center items-center">
    <div className="max-w-md w-full border border-gray-300 rounded-lg p-6">
      {/* Header */}
      <div className="text-center">
        <img
          className="mx-auto mb-4 w-16 h-16 rounded-full bg-purple-100"
          alt="Profile"
          src="https://via.placeholder.com/64" // image URL
        />
        <h1 className="text-xl font-bold mb-1">Sign up to TaskPlanner</h1>
        <p className="text-gray-500 text-sm">
          Already have an account?{" "}
          <Link
            to="/"
            className="text-purple-600 hover:underline font-medium"
          >
            Sign in
          </Link>
        </p>
      </div>

      {/* Social Login */}
      <div className="mt-6 space-y-3">
        <button className="flex items-center justify-center text-sm w-full py-2 px-4 border border-gray-300 rounded-md text-gray-700">
          <img
            src={google_icon}
            alt="Google"
            className="w-5 h-5 mr-2"
          />
          Sign up with Google
        </button>
        <button className="flex items-center text-sm justify-center w-full py-2 px-4 border border-gray-300 rounded-md text-gray-700">
          <img
            src={facebook_icon}
            alt="Facebook"
            className="w-4 h-4 mr-2"
          />
          Sign up with Facebook
        </button>
      </div>

      {/* Separator */}
      <div className="flex items-center my-6">
        <hr className="flex-grow border-gray-300" />
        <span className="px-2 text-gray-500 text-sm">OR</span>
        <hr className="flex-grow border-gray-300" />
      </div>

      {/* Registration Form */}
       <Formik
                      initialValues={{
                          username:"",
                          email: "",
                          password: "",
                          acceptTerms: "false",
                      }}
                      validationSchema={registerValidator}
                      onSubmit={(
                          values: Values,
                          { setSubmitting }: FormikHelpers<Values>
                      ) => {
                          handleSubmit(values);
                      }}
                      >
              {({
                  handleChange,
                  isSubmitting,
                  handleSubmit,
                  handleBlur,
                  values,
                  touched,
                  errors,
                  isValid,
                  setFieldValue,
                  dirty,
              }) => (
                  <Form className="" onSubmit={handleSubmit}>
        <div className="space-y-4">
             {/* Username */}
          <TextInput
              label="Username"
              name="username"
              placeholder="Enter your username"
              value={values.username}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.username}
              warningIcon={warning_icon}
            />

          {/* Email */}
          <TextInput
                label="Email Address"
                name="email"
                placeholder="Enter your email address"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.email}
                warningIcon={warning_icon}
            />

          {/* Password */}
          <TextInput
                    label="Password"
                    name="password"
                    type="password"
                    placeholder="Enter your password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.password}
                    warningIcon={warning_icon}
                />

          
            {/* Terms and Conditions */}
            <div className='flex gap-2 items-center'>
                    <input id="acceptTerms" name="acceptTerms" type="checkbox"
                    onChange={(e) =>
                    setFieldValue(
                        "acceptTerms",
                        e.target.checked.toString()
                    )
                    }
                    className=" text-[#7C44BD] bg-transparent border-[#7C44BD] rounded focus:ring-[#7C44BD] focus:ring-0"
                    value={values.acceptTerms} />
                <p 
                className={
                    (errors.acceptTerms && touched.acceptTerms
                        ? "text-[#F74445] text-xs"
                        : "text-gray-700 text-xs")
                    }>I accept TaskPlanner's <Link to="/" className='text-purple-600 hover:underline'>Terms of Service</Link> and <Link to="/" className='text-purple-600 hover:underline'>Privacy Policy</Link></p>
             </div>
  
        </div>

        {/* Register Button */}
        <button
             type="submit"
             disabled={!(isValid && dirty)|| loading}
             className="mt-6 w-full disabled:bg-opacity-[0.6] bg-purple-600 text-sm text-white py-4 px-4 rounded-lg hover:bg-opacity-[0.9]"
         >
          Register 
        </button>
       </Form>
        )}
    </Formik>
    </div>
    </main>

    {/* Footer */}
    <footer className="mt-3 mb-5 text-center text-xs text-gray-500">
      © TaskPlanner team
    </footer>
  </div>
  );
};

export default RegisterPage;

