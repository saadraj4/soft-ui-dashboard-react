/* eslint-disable react/prop-types */
// Soft UI Dashboard React components
import { useState,useEffect } from "react";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftAvatar from "components/SoftAvatar";
import SoftBadge from "components/SoftBadge";
// Images
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";
import SoftButton from "components/SoftButton";
import Gift from "../gift";

// import UseStore from "utils/UseStore";
import { UserAPI } from "utils/constants";
import UseStore from "utils/UseStore";
import { toast,ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserTableData = () => {
  const [userData, setUserData] = useState([
    { image: team2, name: "John Michael", email: "john@creative-tim.com", id: 1, rate: "35%", streak: 4, is_bot: false },
    { image: team3, name: "Alexa Liras", email: "alexa@creative-tim.com", id: 2, rate: "35%", streak: 0, is_bot: false },
    { image: team4, name: "Laurent Perrier", email: "laurent@creative-tim.com", id: 3, rate: "35%", streak: 7, is_bot: false },
    { image: team3, name: "Michael Levi", email: "michael@creative-tim.com", id: 4, rate: "35%", streak: 10, is_bot: false },
    { image: team2, name: "Richard Gran", email: "richard@creative-tim.com", id: 5, rate: "35%", streak: 0, is_bot: true },
    { image: team4, name: "Miriam Eric", email: "miriam@creative-tim.com", id: 6, rate: "35%", streak: 0, is_bot: true },
    { image: team4, name: "Miriam Eric", email: "miriam@creative-tim.com", id: 7, rate: "35%", streak: 10, is_bot: true },
    { image: team4, name: "Miriam Eric", email: "miriam@creative-tim.com", id: 8, rate: "35%", streak: 0, is_bot: false },
    { image: team4, name: "Miriam Eric", email: "miriam@creative-tim.com", id: 9, rate: "35%", streak: 0, is_bot: true },
    { image: team4, name: "Miriam Eric", email: "miriam@creative-tim.com", id: 10, rate: "35%", streak: 0, is_bot: false },
  ]);
  const {fetchData} = UseStore();
  // Fetch data from backend
  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await fetchData(UserAPI.get_all_players);
        setUserData(response.players); // Update state with backend data
      } catch (error) {
        toast.error("Error fetching user data");
      }
    };

    fetchPlayers();
  }, []);

  // Columns Configuration
  const columns = [
    { name: "user", align: "left" },
    { name: "rate", align: "left" },
    { name: "streak", align: "center" },
    { name: "action", align: "center" },
    { name: "status", align: "center" },
  ];

  // Rows Generation with Map
  const rows = userData.map((user) => ({
    user: <Author image={user.avatar} name={user.first_name} email={user.email} id={user._id} />,
    rate: <Function rate={user.win_rate} />,
    streak: <StreakBadge streak={user.streak} />,
    action: <GiftComponent id={user.id} />,
    status: <StatusButton id={user.id} isBot={user.is_bot} />,
    is_bot: user.is_bot,
  }));
  <ToastContainer/>

  return {
    columns,
    rows,
  };
};



function StatusButton(id) {
  const [status, setStatus] = useState("Active");


  const toggleStatus = (id) => {
    if (status === "Active") {
      setStatus("Blocked");
    } else {
      setStatus("Active");
    }
  };

  return (
    <SoftButton
      variant="contained"
      color={status === "Active" ? "info" : "error"} // Color based on status
      onClick={toggleStatus}
      sx={{
        minWidth: 100, // Ensure the button width remains the same
        padding: "6px 16px", // Consistent padding
      }}
    >
      {status === "Active" ? "Block" : "Unblock"}
    </SoftButton>
  );
}


function GiftComponent({ id }) {
  // State to manage the modal's visibility
  const [openGift, setOpenGift] = useState(false);
  const handleOpenGift = () => setOpenGift(true); // Open the Gift modal
  const handleCloseGift = () => setOpenGift(false); // Close the Gift modal

  return (
    <>
      <SoftBox display="flex" justifyContent="space-between">
        <SoftButton
          component="a"
          href="#"
          variant="contained"
          color="info"
          fontWeight="medium"
          sx={{ marginLeft: 2 }}
          onClick={() => handleOpenGift()}
        >
          Gift
        </SoftButton>
      </SoftBox>
      <Gift openGift={openGift} handleCloseGift={handleCloseGift} />
    </>
  );
}

function Author({ image, name, email, id }) {
  return (
    <SoftBox display="flex" alignItems="center" px={1} py={0.5}>
      <SoftBox mr={2}>
        <SoftAvatar src={image} alt={name} size="sm" variant="rounded"
          sx={{ cursor: "pointer" }}
          onClick={() => handleViewClick(id)} />
      </SoftBox>
      <SoftBox display="flex" flexDirection="column">
        <SoftTypography variant="button" fontWeight="medium"
          onClick={() => handleViewClick(id)}
          sx={{ cursor: "pointer" }}
        >
          {name}
        </SoftTypography>
        <SoftTypography variant="caption" color="secondary"
          onClick={() => handleViewClick(id)}
          sx={{ cursor: "pointer" }}
        >
          {email}
        </SoftTypography>
      </SoftBox>
    </SoftBox>
  );
}

function Function({ rate }) {
  return (
    <SoftBox display="flex" flexDirection="column">
      <SoftTypography variant="regular" fontWeight="medium" color="text">
        {`${rate}`}
      </SoftTypography>
    </SoftBox>
  );
}

function StreakBadge({ streak }) {
  const color = streak === 0 ? "secondary" : "success";
  return (
    <SoftBadge
      variant="gradient"
      badgeContent={`${streak}`}
      color={color}
      container
    />
  );
}
const handleViewClick = (row) => {
  window.location.href = `/user-profile/${row}`;
};


export default UserTableData;
