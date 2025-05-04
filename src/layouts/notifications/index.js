import React, { useState, useEffect } from 'react'
import SideNav from '../SideNavbar'
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout'
import SoftButton from 'components/SoftButton'
import SoftBox from 'components/SoftBox'
import NotificationList from './components/NotificationList'
// import NotificationListData from './data/NotificationsListData'
import { Dialog, DialogActions, DialogContent, DialogTitle, Pagination } from '@mui/material'
import SoftTypography from 'components/SoftTypography'
import SoftInput from 'components/SoftInput'
import { useDropzone } from "react-dropzone";
import DashboardNavbar from 'examples/Navbars/DashboardNavbar'
import UseStore from 'utils/UseStore'
import { ImageURLAPI, NotificationAPI } from 'utils/constants'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import LoadingSpinner from 'components/LoadingSpinner'

function index() {
  const [openModal, setOpenModal] = useState(false); // State to open/close modal
  const [newTitle, setNewTitle] = useState(""); // State to store the new player's name
  const [newImage, setNewImage] = useState(null);
  const [newDescription, setNewDescription] = useState("");
  const [imageURL, setImageURL] = useState("https://via.placeholder.com/150"); // State to store the image URL
  const { postData, fetchData } = UseStore();
  const [NotificationListData, setNotificationListData] = useState([]);
  const [previewImage, setPreviewImage] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); // Track current page
  const [totalPages, setTotalPages] = useState(1); // Track total pages
  const [isLoading, setIsLoading] = useState(true);
  const [toastNotificationShown, setToastNotificationShown] = useState(false);
 

  useEffect(() => {
    const fetchNotificationData = async () => {
      const response = await fetchData(`${NotificationAPI.get_all_notifications}?page=${currentPage}`);
      if (response.success) {
        setNotificationListData(response.notifications);
        setTotalPages(response.pagination.totalPages)
        setIsLoading(false);
      }
      else {
        toast.error(response.message);
      }
    }
    fetchNotificationData();

  }, [currentPage, fetchData]);


  const handlePageChange = (event, value) => {
    setCurrentPage(value); // Update current page when user navigates
  };

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

  // Open Modal
  const handleOpenModal = () => {
    setOpenModal(true);
  };

  // Close Modal
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  // Handle New Player Input Change
  const handleInputChange = (event) => {
    setNewTitle(event.target.value);
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
      setNewImage(file);
    }
    else {
      toast.error("Failed to upload image");
    }

  };

  // Handle Add New Player
  const handleAddNotification = async () => {
    const newNotificationData = {
      title: newTitle,
      description: newDescription,
      image_url: imageURL
    }

    const response = await postData(NotificationAPI.create_Notification, newNotificationData);
    if (response && response.success) {
      if (!toastNotificationShown) {
        toast.success(response.message);
        setToastNotificationShown(true); // Disable toast until it's manually reset
      }
      setNotificationListData((prevData) => [
        response.notification,
        ...prevData,
      ]);
    }
    else {
      toast.error(response.message);
    }
    setNewTitle("");
    setNewDescription("");
    setPreviewImage(null);
    setImageURL("https://via.placeholder.com/150");
    setNewImage(null);
    handleCloseModal();
  };

  return (
    <DashboardLayout>
      <SideNav />
      <ToastContainer />
      <DashboardNavbar />
      <SoftBox
        sx={{
          position: "absolute",
          top: "16px",
          right: "16px",
          zIndex: 2000,
        }}>
        <SoftButton color="info" variant="contained" alignItem="right" onClick={handleOpenModal}>
          Create Notifications
        </SoftButton>
      </SoftBox>


      <SoftBox mb={3} mt={5}>
        <SoftBox p={2}>
          {isLoading ? (
            <LoadingSpinner />
          ) : (
            <NotificationList title={"Notifications History"} Notifications={NotificationListData} />
          )}
          <Pagination
            count={totalPages} // Total number of pages
            page={currentPage} // Current page
            onChange={handlePageChange} // Handle page change
            color="info"
            sx={{ marginTop: 3 }}
          />
        </SoftBox>

      </SoftBox>

      <Dialog open={openModal} onClose={handleCloseModal} maxWidth="sm" fullWidth>
        <DialogTitle
          display="flex" alignItems="center" justifyContent="center"
          fontWeight="bold" fontSize="20px"
        >Add New Notification

        </DialogTitle>
        <DialogContent>
          <SoftTypography sx={{ marginTop: 1 }} variant="body2">
            Notification Title
          </SoftTypography>
          {/* Player Name Field */}
          <SoftInput
            placeholder="Notification Title"
            variant="outlined"
            fullWidth
            value={newTitle}
            onChange={handleInputChange}
          />

          <SoftTypography sx={{ marginTop: 2 }} variant="body2">
            Notification Description
          </SoftTypography>
          {/* Email Field */}
          <SoftInput
            placeholder="Notification Description"
            variant="outlined"
            fullWidth
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
            multiline
            rows={3}
          />

          {/* Image Upload Field */}
          <SoftTypography sx={{ marginTop: 2 }} variant="body2">
            Notification Image
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
              onClick={handleCloseModal}
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
              onClick={handleAddNotification}
              sx={{ color: "black" }}
            >
              Add Notification
            </SoftButton>
          </SoftBox>
        </DialogActions>
      </Dialog>
    </DashboardLayout>
  )
}

export default index