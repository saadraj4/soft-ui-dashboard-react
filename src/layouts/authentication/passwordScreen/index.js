import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";
import { Card } from "@mui/material";
import useStore from "utils/UseStore";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LoginAPI } from "utils/constants";


function index() {
    const navigate = useNavigate();
    const [password, setPassword] = useState("");
    const [confirmPassword, setconfirmPassword] = useState("");

    const handleConfirmPasswordChange = (e) => setconfirmPassword(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);
    const { data, postData, isLoading, error } = useStore();
    const storedEmail = localStorage.getItem('email');
    const otp = localStorage.getItem('otpvalue');
    const handleSubmit = async () => {
        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }
        else {
            const response = await postData(LoginAPI.reset_Password_otp, { email: storedEmail, otp: otp, password: password, confirmPassword: confirmPassword });
            if (response.success) {
                toast.success(response.message);
                navigate("/")
            }
            else {
                toast.error(response.message);
            }
        }

    };

    // Disable the Sign In button if either password or confirm Lpassword is empty
    const isButtonDisabled = password === "" || confirmPassword === "";

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


                    {/* Welcome Back Title */}
                    <SoftTypography display="flex" justifyContent="center" alignItems="center" variant="h4" fontWeight="bold" mb={2}>
                        reset Password
                    </SoftTypography>

                    {/* Password Input */}
                    <SoftBox mb={2}>
                        <SoftBox mb={1} ml={0.5}>
                            <SoftTypography component="label" variant="caption" fontWeight="bold">
                                Password
                            </SoftTypography>
                        </SoftBox>
                        <SoftInput type="password" placeholder="password" value={password} onChange={handlePasswordChange} />
                    </SoftBox>

                    {/* Confirm Password Input */}
                    <SoftBox mb={2}>
                        <SoftBox mb={1} ml={0.5}>
                            <SoftTypography component="label" variant="caption" fontWeight="bold">
                                Confirm Password
                            </SoftTypography>
                        </SoftBox>
                        <SoftInput type="password" placeholder="Confirm Password" value={confirmPassword} onChange={handleConfirmPasswordChange} />
                    </SoftBox>



                    {/* Sign In Button */}
                    <SoftBox mt={4} mb={1}>
                        <SoftButton
                            variant="gradient"
                            color="info"
                            fullWidth
                            onClick={handleSubmit}
                            disabled={isButtonDisabled} // Disable button if password or confirmpassword is empty
                        >
                            Change Password
                        </SoftButton>
                    </SoftBox>

                </SoftBox>
            </Card>
        </>
    );
}

export default index;
