import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftButton from "components/SoftButton";
import { Modal, Checkbox, FormControlLabel } from "@mui/material";
import SoftInput from "components/SoftInput";
import { useEffect, useState } from "react";
import UseStore from "utils/UseStore";
import { SettingsAPI } from "utils/constants";
import { toast, ToastContainer } from "react-toastify";

function ChestRewards() {
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  const [value, setValue] = useState(); // Value state for diamonds
  const [addDiceFace, setAddDiceFace] = useState(false); // Checkbox state
  const [rewardId, setRewardId] = useState();

  const { fetchData, updateData } = UseStore();

  useEffect(() => {
    const fetchChestReward = async () => {
      const response = await fetchData(SettingsAPI.get_chest_reward);

      setValue(response.chestBox.reward_percentage);
      setAddDiceFace(response.chestBox.is_dice_face);
      setRewardId(response.chestBox._id);
    }

    fetchChestReward();
  }, []);

  const handleOpen = () => setIsModalOpen(true);
  const handleClose = () => setIsModalOpen(false);

  const handleSave = async () => {
    const requestData = { reward_percentage: value, is_dice_face: addDiceFace };

    const response = await updateData(SettingsAPI.update_chest_reward, rewardId, requestData);
    if (response.success) {
      toast.success(response.message);
      handleClose();
    }
    else {
      toast.error(response.message);
    }

  };

  const handleCheckboxChange = (event) => {
    setAddDiceFace(event.target.checked);
  };

  return (
    <>
      <ToastContainer />
      <SoftTypography variant="h6" fontWeight="medium" textTransform="capitalize">
        Chest Reward
      </SoftTypography>
      <Card>
        <SoftBox p={2}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={6}>
              <SoftBox display="flex" flexDirection="column">
                <SoftTypography variant="h6" fontWeight="bold" gutterBottom>
                  Diamonds
                </SoftTypography>
                <SoftBox mb={1} display="flex" justifyContent="space-between" alignItems="center">
                  <SoftTypography variant="body2" color="text">
                    {value}%
                  </SoftTypography>

                  {addDiceFace && (
                    <SoftTypography variant="h6" fontWeight="bold">
                      DiceFace {addDiceFace ? "Added" : "Not added"}
                    </SoftTypography>
                  )}
                </SoftBox>
              </SoftBox>

            </Grid>
            <Grid item xs={12} lg={3} sx={{ position: "relative", ml: "auto" }}>
              <SoftBox>
                <SoftButton color="info" variant="gradient" onClick={handleOpen}>
                  Edit
                </SoftButton>
              </SoftBox>
            </Grid>
          </Grid>
        </SoftBox>
      </Card>

      <Modal
        open={isModalOpen}
        onClose={handleClose}
        aria-labelledby="edit-modal-title"
        aria-describedby="edit-modal-description"
      >
        <SoftBox
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
            width: 400,
          }}
        >
          <SoftTypography id="edit-modal-title" variant="h6" fontWeight="bold" mb={2}>
            Edit Diamonds Value
          </SoftTypography>
          <SoftInput
            fullWidth
            label="Diamonds Percentage"
            variant="outlined"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          {/* Checkbox for adding a dice face */}
          <SoftBox mt={2}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={addDiceFace}
                  onChange={handleCheckboxChange}
                  color="primary"
                />
              }
              label="Add a dice face"
            />
          </SoftBox>
          <SoftBox display="flex" justifyContent="flex-end" mt={2}>
            <SoftButton onClick={handleClose} variant="gradient" color="secondary" sx={{ mr: 2 }}>
              Cancel
            </SoftButton>
            <SoftButton onClick={() => handleSave()} color="info" variant="gradient">
              Save
            </SoftButton>
          </SoftBox>
        </SoftBox>
      </Modal>
    </>
  );
}

export default ChestRewards;
