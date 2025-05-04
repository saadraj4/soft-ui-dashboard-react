import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";
import { Card } from "@mui/material";
import Logo from "assets/images/logo.jpeg";
import useStore from "utils/UseStore";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LoginAPI } from "utils/constants";

function SignIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const { data, postData, isLoading, error } = useStore();

  const handleLogin = async () => {

    const response = await postData(LoginAPI.login, { email, password });
    
    
    if (response && response.success) {
      toast.success("Admin Login OTP has been successfully sent to your email!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      localStorage.setItem('loginMessage', response.message);
      localStorage.setItem('loginEmail', email);
      navigate("/admin/login-verify");
    }
    else {
      toast.error(error || "Login failed", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }

    // setEmail("");
    // setPassword("");
  };

  // Disable the Sign In button if either email or password is empty
  const isButtonDisabled = email === "" || password === "" || isLoading;

  return (
    <>
      <ToastContainer />
      <Card
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <SoftBox
          component="form"
          role="form"
          sx={{
            width: "100%",
            maxWidth: "400px",
            padding: "20px",
            borderRadius: "8px",
            backgroundColor: "#fff",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
          }}
        >
          {/* Image Above the Welcome Back */}
          <SoftBox display="flex" justifyContent="center" mb={3}>
            <img
              src={Logo} // Replace with the URL of your image
              alt="Logo"
              style={{
                width: "100px", // Adjust the width as needed
                height: "100px", // Adjust the height as needed
              }}
            />
          </SoftBox>

          {/* Welcome Back Title */}
          <SoftTypography display="flex" justifyContent="center" alignItems="center" variant="h4" fontWeight="bold" mb={2}>
            Welcome Back
          </SoftTypography>

          {/* Email Input */}
          <SoftBox mb={2}>
            <SoftBox mb={1} ml={0.5}>
              <SoftTypography component="label" variant="caption" fontWeight="bold">
                Email
              </SoftTypography>
            </SoftBox>
            <SoftInput type="email" placeholder="Email" value={email} onChange={handleEmailChange} />
          </SoftBox>

          {/* Password Input */}
          <SoftBox mb={2}>
            <SoftBox mb={1} ml={0.5}>
              <SoftTypography component="label" variant="caption" fontWeight="bold">
                Password
              </SoftTypography>
            </SoftBox>
            <SoftInput type="password" placeholder="Password" value={password} onChange={handlePasswordChange} />
          </SoftBox>

          {/* Forget Password Link */}
          <SoftBox mt={3}>
            <SoftTypography variant="button" color="info" fontWeight="bold"
              sx={{
                cursor: "pointer",
                color: "blue",
                textDecoration: "underline",
                fontSize: "0.8rem"
              }}

              onClick={() => navigate("/authentication/Reset-Password")}>
              Forget Password?
            </SoftTypography>
          </SoftBox>

          {/* Sign In Button */}
          <SoftBox mt={4} mb={1}>
            <SoftButton
              variant="gradient"
              color="info"
              fullWidth
              onClick={handleLogin}
              disabled={isButtonDisabled} // Disable button if email or password is empty
            >
              sign in
            </SoftButton>
          </SoftBox>

        </SoftBox>
      </Card>
    </>
  );
}

export default SignIn;
