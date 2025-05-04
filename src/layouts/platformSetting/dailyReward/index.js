import React, { useState } from "react";
import PropTypes from "prop-types";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid"; // Import Grid component
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftAvatar from "components/SoftAvatar";
import SoftButton from "components/SoftButton";
import { Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import SoftInput from "components/SoftInput";
import UseStore from "utils/UseStore";
import { SettingsAPI } from "utils/constants";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function DailyRewardList({ title, DailyReward }) {

  const [openReward, setOpenReward] = useState(false);
  const [rewardId, setRewardId] = useState();
  const [hours, setHours] = useState();
  const [dayNumber, setDayNumber] = useState();
  const { updateData } = UseStore();


  const handleOpenReward = (id) => {
    setOpenReward(true);
    setRewardId(id);
    setHours(DailyReward.find(reward => reward._id === id).hours_durations);
    setDayNumber(DailyReward.find(reward => reward._id === id).dayNumber);
  } // Open the Reward modal
  const handleCloseReward = () => setOpenReward(false); // Close the Reward modal

  // Handle submit
  const handleSubmit = async () => {

    const payload = {
      hours_durations: hours,
      dayNumber: dayNumber,
    }
    console.log("payload", payload);

    const response = await updateData(SettingsAPI.Update_daily_reward, rewardId, payload);
    console.log("response", response);
    if (response.success) {
      toast.success(response.message);
      handleCloseReward();
    }
    else {
      toast.error(response.message);
    }
  }
  const handleClose = () => {
    handleCloseReward();
  };


  const renderDailyReward = DailyReward.map((reward, index) => (
    // Conditionally render LoadingSpinner if DailyReward is empty or undefined
    <Grid item xs={12} sm={6} key={index}> {/* Use Grid item for each profile */}
      <SoftBox component="li" display="flex" alignItems="center" py={1} mb={1} ml={2} mr={1}>
        <SoftBox mr={2}>
          <SoftAvatar src={reward.image_url} alt="something here" variant="rounded" shadow="md" />
        </SoftBox>
        <SoftBox
          display="flex"
          flexDirection="column"
          alignItems="flex-start"
          justifyContent="center"
        >
          <SoftTypography variant="button" fontWeight="medium">
            Day {reward.dayNumber}
          </SoftTypography>
          <SoftTypography variant="caption" color="text">
            {reward.hours_durations} hours
          </SoftTypography>
        </SoftBox>
        <SoftBox ml="auto">
          <SoftButton
            component="a"
            target="_blank"
            variant="gradient"
            color="info"
            onClick={() => handleOpenReward(reward._id)}
          >
            Edit
          </SoftButton>
        </SoftBox>
      </SoftBox>
    </Grid>
  ));

  return (
    <>
      <ToastContainer />
      <Card sx={{ height: "100%" }}>
        <SoftBox pt={2} px={2}>
          <SoftTypography variant="h6" fontWeight="medium" textTransform="capitalize">
            {title}
          </SoftTypography>
        </SoftBox>
        <SoftBox p={2}>
          <Grid container spacing={2}>
            {!DailyReward || DailyReward.length === 0 ? (
              <SoftBox p={2} display="flex" justifyContent="center" alignItems="center" height="100%" width="100%">
                <SoftTypography variant="body2" color="text">
                  No Data Available
                </SoftTypography>
              </SoftBox>
            ) : (
              renderDailyReward
            )}
          </Grid>
        </SoftBox>
      </Card>


      <Dialog open={openReward} onClose={handleClose} maxWidth="sm" fullWidth>
        <SoftBox>
          <DialogTitle display="flex" alignItems="center" justifyContent="center" fontWeight="bold" fontSize="20px">
            Edit Rewards
          </DialogTitle>
          <DialogContent>


            {/* Quantity / Hours Input */}
            <SoftTypography sx={{ marginTop: 2 }} variant="body2">
              Hours
            </SoftTypography>
            <SoftInput
              variant="outlined"
              type="number"
              placeholder="Enter hours"
              fullWidth
              value={hours}
              onChange={(e) => setHours(e.target.value)}
              onWheel={(e) => e.target.blur()}
            />
          </DialogContent>

          <DialogActions>
            <SoftBox mt={3} mb={1}>
              <SoftButton variant="gradient" color="secondary" fullWidth onClick={handleClose} sx={{ color: 'black' }}>
                Cancel
              </SoftButton>
            </SoftBox>

            <SoftBox mt={3} mb={1}>
              <SoftButton variant="gradient" color="info" fullWidth onClick={handleSubmit} sx={{ color: 'black' }}>
                Save
              </SoftButton>
            </SoftBox>
          </DialogActions>
        </SoftBox>
      </Dialog>
    </>
  );
}

// Typechecking props for the DailyRewardList
DailyRewardList.propTypes = {
  title: PropTypes.string.isRequired,
  DailyReward: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default DailyRewardList;
