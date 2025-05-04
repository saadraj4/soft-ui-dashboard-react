import { Grid, IconButton } from "@mui/material";
import { Upload } from "@mui/icons-material";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DefaultProjectCard from "examples/Cards/ProjectCards/DefaultProjectCard";
import { useEffect, useRef, useState } from "react";
import Sidenav from "../SideNavbar";
import Slider from "react-slick";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { AssetAPI,ImageURLAPI } from "utils/constants";
import UseStore from "utils/UseStore";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Overview() {
  const fileInputRef = useRef(null); // Reference to the hidden file input
  const { fetchData, postData } = UseStore(); // Fetch data from the store
  const [section, setSection] = useState(); // State to store the selected section
  const [data, setData] = useState([]); // State to store the fetched data
  const [reload, setReload] = useState(false); // Add a state to trigger re-render


  useEffect(() => {
    const fetchAssets = async () => {
      const response = await fetchData(AssetAPI.get_all_assets);
      if (response.success) {
        setData(response.data);
      }
      else {
        toast.error(response.message);
      }
    };
    fetchAssets();
  }, [reload]);
  const handleUpload = (section) => {
    fileInputRef.current.click(); // Trigger file input click
    setSection(section);
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0]; // Get the selected file
    const formData = new FormData(); // Create a new FormData instance
    formData.append("image", file); // Append the file to the FormData instance
    formData.append("category", section.toLowerCase()); // Append the file to the FormData instance
    const response = await postData(ImageURLAPI, formData, {
      headers: {
        'Content-Type': 'multipart/form-data', // Set the correct headers for file uploads
      },
    });

    if (response.success) {
      const newAssetData = {
        category: section.toLowerCase(),
        image_url: response.imageUrl,
      }
      
      const dbresponse = await postData(AssetAPI.create_asset, newAssetData);

      if (dbresponse.success) {
        toast.success(dbresponse.message)
        setReload(prev => !prev);
      }
      else {
        toast.error(dbresponse.message)
      }
    }
    else {
      toast.error(response.message)
    }
  };
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1000,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],
  };
  
  const cardDataBySection = {
    Coins: data.filter(item => item.category.toLowerCase() === "coins"),
    Diamonds: data.filter(item => item.category.toLowerCase() === "diamonds"),
    Boosters: data.filter(item => item.category.toLowerCase() === "boosters"),
    Avatars: data.filter(item => item.category.toLowerCase() === "avatars"),
    Dice: data.filter(item => item.category.toLowerCase() === "dice"),
    Frames: data.filter(item => item.category.toLowerCase() === "frames"),
    Bounty: data.filter(item => item.category.toLowerCase() === "bounty"),
  };

  const sections = Object.keys(cardDataBySection);

  return (
    <DashboardLayout>
      <ToastContainer autoClose={2000}/>
      <DashboardNavbar />
      <Sidenav />

      <SoftBox mb={5}>
        {sections.map((section, index) => (
          <div key={index}>
            <SoftBox pt={2} px={2} position="relative">
              {/* Title */}
              <SoftBox mb={1}>
                <SoftTypography variant="button" fontWeight="regular" color="text">
                  {section}
                </SoftTypography>
              </SoftBox>

              {/* Upload Button */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
              <IconButton
                onClick={() => handleUpload(section)}
                sx={{
                  position: "absolute",
                  top: "10px",
                  right: "10px",
                  fontSize: "1.5rem",
                }}
              >
                <Upload />
              </IconButton>
            </SoftBox>

            {/* Slider */}
            <SoftBox p={2}>
              {cardDataBySection[section].length > 0 ? (
                <Slider {...settings}>
                  {cardDataBySection[section].map((card, index) => (
                    <Grid
                      item
                      xs={12}
                      md={6}
                      xl={3}
                      key={index}
                      sx={{ padding: "10px" }}
                    >
                      <DefaultProjectCard
                        image={card.image_url}
                        id={card._id}
                        flag={true}
                      />
                    </Grid>
                  ))}
                </Slider>
              ) : (
                <SoftTypography variant="body2" color="text">
                  No items available in this category.
                </SoftTypography>
              )}
            </SoftBox>
          </div>
        ))}
      </SoftBox>
    </DashboardLayout>
  );
}

export default Overview;
