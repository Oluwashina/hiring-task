import React from "react";
import google_icon from '../../assets/google.png'
import facebook_icon from '../../assets/Facebook.png'
import warning_icon from '../../assets/warning.svg'
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import { Formik, Form, FormikHelpers } from "formik";
import { registerValidator } from "../../validationSchema/validator";

const RegisterPage = () => {

    
    interface Values {
        username: string;
        email: string;
        password: string;
        acceptTerms: string
    }

    const handleSubmit = (values: Values) => {
        // e.preventDefault()
       console.log(values)
       
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
          <div>
            <label htmlFor="email" className="block text-xs mb-2 font-medium text-gray-700">
              Username 
            </label>
            <div className="relative">
            <input
              type="text"
              name="username"
              className={
                touched.username && errors.username
                ? "appearance-none w-full placeholder:text-[#949494] placeholder:text-sm  text-[#121212] text-sm focus:border-[#F74445] focus:outline-none rounded-md border border-[#B92043] bg-[#FEECEC] py-3 px-4"
                : "appearance-none block text-sm w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:border-purple-600 focus:outline-none"
            }
              placeholder="Enter your username"
              value={values.username}
              onChange={handleChange}
              onBlur={handleBlur}
            />
              {touched.username && errors.username ?
                   ( <img src={warning_icon} alt="warning" className='w-[14px] h-[14px] absolute top-1/2 transform text-[#3A3A3A] text-sm font-medium -translate-y-1/2 right-6 cursor-pointer' />): null}
            </div>

            {touched.username && errors.username ? (
                    <div className="flex gap-1 mt-2 items-center">
                        <img src={warning_icon} alt="warning" className='w-[14px] h-[14px]' />
                        <small className="text-[#F74445] font-medium text-xs">
                        {touched.username && errors.username}
                        </small>
                    </div>
                    ) : null}
          </div>

          {/* Email */}
          <div>
                <label htmlFor="email" className="block text-xs mb-2 font-medium text-gray-700">
                    Email Address
                </label>
                <div className="relative">
                <input
                    type="text"
                    name="email"
                 
                    className={
                        touched.email && errors.email
                        ? "appearance-none w-full placeholder:text-[#949494] placeholder:text-sm  text-[#121212] text-sm focus:border-[#F74445] focus:outline-none rounded-md border border-[#B92043] bg-[#FEECEC] py-3 px-4"
                        : "appearance-none block text-sm w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:border-purple-600 focus:outline-none"
                    }
                    placeholder="Enter your email address"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                        />
                    {touched.email && errors.email ?
                   ( <img src={warning_icon} alt="warning" className='w-[14px] h-[14px] absolute top-1/2 transform text-[#3A3A3A] text-sm font-medium -translate-y-1/2 right-6 cursor-pointer' />): null}
                   </div>
                   {touched.email && errors.email ? (
                    <div className="flex gap-1 mt-2 items-center">
                        <img src={warning_icon} alt="warning" className='w-[14px] h-[14px]' />
                        <small className="text-[#F74445] font-medium text-xs">
                        {touched.email && errors.email}
                        </small>
                    </div>
                    ) : null}
                </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-xs mb-2 font-medium text-gray-700">
                Password
            </label>
            <div className="relative">
                <input
                    type="password"
                    name="password"
                    className={
                        touched.password && errors.password
                        ? "appearance-none w-full placeholder:text-[#949494] placeholder:text-sm  text-[#121212] text-sm focus:border-[#F74445] focus:outline-none rounded-md border border-[#B92043] bg-[#FEECEC] py-3 px-4"
                        : "appearance-none block text-sm w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:border-purple-600 focus:outline-none"
                    }
                    placeholder="Enter your password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                    {touched.password && errors.password ?
                ( <img src={warning_icon} alt="warning" className='w-[14px] h-[14px] absolute top-1/2 transform text-[#3A3A3A] text-sm font-medium -translate-y-1/2 right-6 cursor-pointer' />): null}
            </div>
            {touched.password && errors.password ? (
                <div className="flex gap-1 mt-2 items-center">
                    <img src={warning_icon} alt="warning" className='w-[14px] h-[14px]' />
                    <small className="text-[#F74445] font-medium text-xs">
                    {touched.password && errors.password}
                    </small>
                </div>
                ) : null}
            </div>

          
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
             disabled={!(isValid && dirty)}
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

