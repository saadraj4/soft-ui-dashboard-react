
import { useState } from "react";
import PropTypes from "prop-types";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Tooltip from "@mui/material/Tooltip";
import Icon from "@mui/material/Icon";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import { Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";
import { useDropzone } from "react-dropzone";
import { ImageURLAPI } from "utils/constants";
import UseStore from "utils/UseStore";
import { AdminProfileAPI } from "utils/constants";
import { toast,ToastContainer } from "react-toastify";


function ProfileInfoCard({ title, description, info, action }, index) {

  const [open, setOpen] = useState(false);
  const [name, setName] = useState(info.fullName);
  const [email, setEmail] = useState(info.email);
  const [imageURL, setImageURL] = useState(""); // State to store the image URL
  const [previewImage, setPreviewImage] = useState(null);
  const { postData,updateAdmin } = UseStore();

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const onDrop = (acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      const previewUrl = URL.createObjectURL(file);
      setPreviewImage(previewUrl);

      // Trigger callback to parent component (if needed)
      handleImageChange(file);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: "image/*", multiple: false });


  const handleSave = async () => {
    const payload = {
      full_name: name,
      email: email,
      avatar: imageURL
    }
    const response = await updateAdmin(AdminProfileAPI.update_admin, payload);
    console.log(response);
    if (response.success) {
      toast.success(response.message);
     
      handleClose();
      setName("");
      setEmail("");
      setImageURL("");
    }
    else {
      toast.error(response.message);
    }


  };

  const handleImageChange = async (file) => {
    const formData = new FormData();
    formData.append("image", file);
    formData.append("category", "others");
    const response = await postData(ImageURLAPI, formData, {
      headers: {
        'Content-Type': 'multipart/form-data', // Set the correct headers for file uploads
      },
    });
    if (response.success) {
      console.log("response url", response.imageUrl);

      // Set the image URL
      setImageURL(response.imageUrl);

    }
    else {
      toast.error("Failed to upload image");
    }

  };
  const labels = [];
  const values = [];


  // Convert this form `objectKey` of the object key in to this `object key`
  Object.keys(info).forEach((el) => {
    if (el.match(/[A-Z\s]+/)) {
      const uppercaseLetter = Array.from(el).find((i) => i.match(/[A-Z]+/));
      const newElement = el.replace(uppercaseLetter, ` ${uppercaseLetter.toLowerCase()}`);

      labels.push(newElement);
    } else {
      labels.push(el);
    }
  });

  // Push the object values into the values array
  Object.values(info).forEach((el) => values.push(el));

  // Render the card info items
  const renderItems = labels.map((label, key) => (
    <SoftBox key={key} display="flex" py={1} pr={2} mt={1}>
      <SoftTypography variant="button" fontWeight="bold" textTransform="capitalize">
        {label}: &nbsp;
      </SoftTypography>
      <SoftTypography variant="button" fontWeight="regular" color="text">
        &nbsp;{values[key]}
      </SoftTypography>
    </SoftBox>
  ));

  return (
    <Card sx={{ height: "100%" }}>
      <SoftBox display="flex" justifyContent="space-between" alignItems="center" pt={2} px={2}>
        <SoftTypography variant="h6" fontWeight="medium" textTransform="capitalize">
          {title}
        </SoftTypography>
        <SoftTypography variant="body2" color="secondary">
          <Tooltip title={action.tooltip} placement="top" onClick={handleClickOpen}>
            <Icon>edit</Icon>
          </Tooltip>
        </SoftTypography>
      </SoftBox>
      <SoftBox p={2}>
        <SoftBox mb={1} lineHeight={1}>
          <SoftTypography variant="button" color="text" fontWeight="regular">
            {description}
          </SoftTypography>
        </SoftBox>
        <SoftBox opacity={0.3}>
          <Divider />
        </SoftBox>
        <SoftBox>
          {renderItems}
          <SoftBox display="flex" py={1} pr={2}>

          </SoftBox>
        </SoftBox>
      </SoftBox>

      {/* Modal for editing information */}
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle
          display="flex" alignItems="center" justifyContent="center"
          fontWeight="bold" fontSize="20px"
        >Edit information

        </DialogTitle>
        <DialogContent>
          <SoftTypography sx={{ marginTop: 1 }} variant="body2">
            Full Name
          </SoftTypography>
          {/* Player Name Field */}
          <SoftInput
            placeholder="Name"
            variant="outlined"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <SoftTypography sx={{ marginTop: 2 }} variant="body2">
            Email
          </SoftTypography>
          {/* Email Field */}
          <SoftInput
            placeholder="Email"
            variant="outlined"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* Image Upload Field */}
          <SoftTypography sx={{ marginTop: 2 }} variant="body2">
            Profile Image
          </SoftTypography>

          <SoftBox
            {...getRootProps()}
            style={{
              border: "2px dashed #3a3bf1",
              padding: "20px",
              textAlign: "center",
              borderRadius: "8px",
              cursor: "pointer",
              background: isDragActive ? "#f0f4ff" : "white",
              position: "relative",
              height: "155px",
              width: "100%",
              overflow: "hidden",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <input {...getInputProps()} />
            {previewImage ? (
              <img
                src={previewImage}
                alt="Preview"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                  borderRadius: "8px",
                }}
              />
            ) : isDragActive ? (
              <p>Drop the image here...</p>
            ) : (
              <p>Drag & drop an image, or click to select one</p>
            )}
          </SoftBox>
        </DialogContent>
        <DialogActions>
          <SoftBox mt={4} mb={1}>
            <SoftButton
              variant="gradient"
              color="secondary"
              fullWidth
              onClick={handleClose}
              sx={{ color: "black" }}
            >
              Cancel
            </SoftButton>
          </SoftBox>

          <SoftBox mt={4} mb={1}>
            <SoftButton
              variant="gradient"
              color="info"
              fullWidth
              onClick={handleSave}
              sx={{ color: "black" }}
            >
              Update Information
            </SoftButton>
          </SoftBox>
        </DialogActions>
      </Dialog>

    </Card>
  );
}

// Typechecking props for the ProfileInfoCard
ProfileInfoCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  info: PropTypes.objectOf(PropTypes.string).isRequired,
  social: PropTypes.arrayOf(PropTypes.object).isRequired,
  action: PropTypes.shape({
    route: PropTypes.string.isRequired,
    tooltip: PropTypes.string.isRequired,
  }).isRequired,
};

export default ProfileInfoCard;
