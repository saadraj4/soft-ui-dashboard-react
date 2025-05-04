import React, { useState, useEffect } from 'react'
import Sidenav from "../SideNavbar";
import SoftBox from "components/SoftBox";
import { Grid, Modal } from '@mui/material';
import SoftTypography from 'components/SoftTypography';
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import SoftButton from 'components/SoftButton';
import SoftInput from 'components/SoftInput';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
import DefaultProjectCard from 'examples/Cards/ProjectCards/DefaultProjectCard';
import UseStore from 'utils/UseStore';
import { GameRulesAPI } from 'utils/constants';
import LoadingSpinner from 'components/LoadingSpinner';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function index() {
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState(null);
    const [updatedCoins, setUpdatedCoins] = useState("");
    const { fetchData, updateData } = UseStore();
    const [data, setData] = useState(); // State to hold the game data
    const [isLoading, setIsLoading] = useState(true); // Loading state
    useEffect(() => {
        const fetchGameRules = async () => {
            const response = await fetchData(GameRulesAPI.get_all);
            if (response.success) {
                setData(response.games);
                setIsLoading(false);
            }

        }
        fetchGameRules();
    }, []);


    const handleGridClick = (card) => {
        setSelectedCard(card);
        setUpdatedCoins(card.entry_fee);
        setModalOpen(true);
    }
    // Handle modal close
    const handleCloseModal = () => {
        setModalOpen(false);
        setSelectedCard(null);
        setUpdatedCoins("");
    };
    // Handle coin update
    const handleCoinChange = (e) => {
        setUpdatedCoins(e.target.value);
    };
    // Handle save changes
    const handleSaveChanges = async () => {

        console.log(selectedCard._id);
        const response = await updateData(GameRulesAPI.update_game, selectedCard._id, {
            entry_fee: updatedCoins,
            room: selectedCard.room,
        });        
        if (response.success) {
            toast.success(response.message);

            // Update the state locally
            setData((prevData) =>
                prevData.map((item) =>
                    item._id === selectedCard._id ? { ...item, entry_fee: updatedCoins } : item
                )
            );
        } else {
            toast.error(response.message);
        }


        handleCloseModal();
    };

    return (
        <DashboardLayout>
            <ToastContainer />

            <Sidenav />
            <DashboardNavbar />
            <SoftBox mb={3}>

                <SoftBox pt={2} px={2}>
                    <SoftBox mb={0.5}>
                        <SoftTypography variant="h6" fontWeight="medium">
                            Game
                        </SoftTypography>
                    </SoftBox>
                    <SoftBox mb={1}>
                        <SoftTypography variant="button" fontWeight="regular" color="text">
                            Game Rules
                        </SoftTypography>
                    </SoftBox>
                </SoftBox>
                <SoftBox p={2}>
                    <Grid container spacing={3}>
                        {isLoading ? (
                            <Grid container justifyContent="center" alignItems="center" style={{ height: '100vh' }}>
                                <LoadingSpinner />
                            </Grid>
                        ) : (
                            data.map((card, index) => (
                                <Grid item xs={12} md={6} xl={3} key={index} onClick={() => handleGridClick(card)}>
                                    <DefaultProjectCard
                                        image={card.image_url}
                                        title={card.room}
                                        coins={card.entry_fee}
                                        id={card._id}
                                    />
                                </Grid>
                            ))
                        )}
                    </Grid>

                </SoftBox>


            </SoftBox>
            {/* Modal */}
            <Modal open={modalOpen} onClose={() => handleCloseModal}>
                <SoftBox
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: 400,
                        bgcolor: "background.paper",
                        boxShadow: 24,
                        p: 4,
                        borderRadius: 2,
                    }}
                >
                    {selectedCard && (
                        <>
                            <img
                                src={selectedCard.image_url}
                                alt={selectedCard.room}
                                style={{ width: "100%", borderRadius: "8px", marginBottom: "16px" }}
                            />
                            <SoftTypography variant="h6" mb={2}>
                                Update Coins for {selectedCard.room}
                            </SoftTypography>
                            <SoftInput
                                fullWidth
                                label="Coins"
                                value={updatedCoins}
                                onChange={handleCoinChange}
                                type="number"
                                margin="normal"
                                onWheel={(e) => e.target.blur()}

                            />
                            <SoftBox display="flex" justifyContent="space-between" mt={3}>
                                <SoftButton onClick={handleCloseModal} color="secondary" variant="gradient">
                                    Cancel
                                </SoftButton>
                                <SoftButton onClick={handleSaveChanges} color="info" variant="gradient">
                                    Save
                                </SoftButton>
                            </SoftBox>
                        </>
                    )}
                </SoftBox>
            </Modal>
        </DashboardLayout>
    )
}

export default index