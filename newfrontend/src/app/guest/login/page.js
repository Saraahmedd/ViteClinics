"use client";
import Header from "@/components/Header";
import React, { useEffect, useState } from "react";
import doctorAnimation from "../../../../public/doctor.json";
import Lottie from "lottie-react";
import { login } from "@/app/redux/actions/authActions";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { redirect } from "next/navigation";
import { Button, Grid, TextInput } from "@tremor/react";
import { BottomCallout } from "@/components/BottomCallout";
const Login = () => {
  const {
    isAuthenticated,
    loading: loginLoading,
    success: loginSuccess,
    error: loginError,
  } = useSelector((state) => state.loginReducer);
  const [visibleFeedback, setVisibleFeedback] = useState(false);
  // const Router = useRouter()
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  let url = "";
  useEffect(() => {
    if (isAuthenticated) {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      const role = JSON.parse(localStorage.getItem("userInfo")).data.user.role;
      const docUrl =
        role == "doctor"
          ? userInfo.data.user.doctor?.employmentContract.status == "accepted"
            ? "/doctor/profile"
            : "/doctorContract"
          : "";
      url =
        role === "administrator"
          ? "/admin/manage-users"
          : role === "patient"
            ? "/patient/profile"
            : docUrl;
      // console.log(url)
      setTimeout(() => {
        window.history.pushState({}, "", url);
        window.location.reload();
      }, 1000);
    }
  }, [dispatch, loginError, isAuthenticated]);

  const handleLogin = () => {
    dispatch(login(formData.username, formData.password));
  };
  const [loadingSignUp, setLoadingSignUp] = useState(false);
  const handleSignup = () => {
    url = "/signup/patient";
    window.history.pushState({}, "", url);
    window.location.reload();

    setLoadingSignUp(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-gray-300">
      <div className="max-w-screen-xl m-0 sm:m-10 shadow sm:rounded-lg flex justify-center flex-1">
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
          <div className="flex flex-col items-center rounded-lg border  px-4 pt-8 pb-10 shadow-lg w-full">
            <h1 className="text-2xl xl:text-3xl font-extrabold">Log In</h1>
            <div className="w-full flex-1 mt-8">
              <div className="mx-auto max-w-xs">
                {/* Log In Form */}
                <Grid numItems={1} className="gap-x-3 gap-y-4">
                  <TextInput
                    className="w-full px-8 py-4 rounded-lg font-medium   placeholder-gray-500 text-lg  "
                    type="username"
                    placeholder="Username"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    required
                    error={loginError}
                  />
                  <TextInput
                    className="w-full px-8 py-4 rounded-lg font-medium   placeholder-gray-500 text-lg  "
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    error={loginError}
                  />
                </Grid>
                <Button
                  className="mt-5 tracking-wide font-semibold text-gray-100 w-full py-4 rounded-lg transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                  onClick={handleLogin}
                  loading={loginLoading}
                  variant="primary"
                  loadingText="Logging In..."
                >
                  <span className="text-white">Log In</span>
                </Button>

                {/* Forgot Password Link */}
                <div className="mt-2 text-sm text-gray-500 text-center">
                  <a href="/guest/forgetPassword" className="hover:text-white">
                    Forgot Password?
                  </a>
                </div>
                {/* Partition */}
                <div className="flex items-center mt-4">
                  <div className="flex-1 border-t border-gray-600"></div>
                  <span className="mx-4 text-gray-500">or</span>
                  <div className="flex-1 border-t border-gray-600"></div>
                </div>

                {/* Sign Up Button */}
                <Button
                  className="mt-4 tracking-wide font-semibold text-gray-100 w-full py-4 rounded-lg transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                  variant="primary"
                  onClick={handleSignup}
                  loading={loadingSignUp}
                  loadingText="En Route To Sign Up"
                >
                  <span className="ml-3 text-white">Sign Up</span>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* GIF to the Right */}

        <Lottie animationData={doctorAnimation} loop={true} className='w-[550px] h-[550px]'/>          


        {loginError && (
          <BottomCallout
            message="Invalid Username or Password"
            variant="error"
            visible={true}
            setVisible={setVisibleFeedback}
          />
        )}

        {isAuthenticated && (
          <BottomCallout
            message="Login Successful"
            variant="success"
            visible={true}
            setVisible={setVisibleFeedback}
          />
        )}
      </div>
    </div>
  );
};

export default Login;
