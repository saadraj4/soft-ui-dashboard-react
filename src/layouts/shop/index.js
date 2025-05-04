import React, { useState, useEffect } from 'react';
import SideNav from '../SideNavbar';
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import SoftButton from 'components/SoftButton';
import SoftBox from 'components/SoftBox';
import { Dialog, DialogActions, DialogContent, DialogTitle, FormControl, Grid, InputAdornment, MenuItem, Select } from '@mui/material';
import SoftTypography from 'components/SoftTypography';
import DefaultInfoCard from 'examples/Cards/InfoCards/DefaultInfoCard';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
import Coins from 'assets/images/coins.png';
import Diamonds from 'assets/images/diamond.png';
import Boosters from 'assets/images/booster.png';
import SoftInput from 'components/SoftInput';
import ArrowDropDownCircleTwoToneIcon from '@mui/icons-material/ArrowDropDownCircleTwoTone';
import UseStore from 'utils/UseStore';
import {ShopsAPI} from 'utils/constants';
import { ConvertNumber } from 'utils/ConvertNumber';

function Index() {
    const {fetchData} = UseStore();
    const [selectedAsset, setSelectedAsset] = useState('');
    const [selectedVariant, setSelectedVariant] = useState('');
    const [openGift, setOpenGift] = useState(false);
    const [packages, setPackages] = useState([]);
    const [filteredPackages, setFilteredPackages] = useState([]);


    useEffect(() => {
        const fetchpackages = async () =>{
            const response = await fetchData(ShopsAPI.get_all);
            setPackages(response.shopPackages);
        };
        fetchpackages();
    },[]);
    
    const CoinsData = packages.filter((item) => item.package_type === "coin");
    const DiamondsData = packages.filter((item) => item.package_type === "diamond");
    const BoostersData = packages.filter((item) => item.package_type === "defender");
    

    const assetVariants = {
        Coins: [
            { name: 'Gold Coin', imageUrl: Coins },
            { name: 'Silver Coin', imageUrl: Coins },
            { name: 'Bronze Coin', imageUrl: Coins },
        ],
        Diamonds: [
            { name: 'Red Diamond', imageUrl: Diamonds },
            { name: 'Blue Diamond', imageUrl: Diamonds },
            { name: 'Green Diamond', imageUrl: Diamonds },
        ],
        Boosters: [
            { name: 'Speed Booster', imageUrl: Boosters },
            { name: 'Energy Booster', imageUrl: Boosters },
            { name: 'Shield Booster', imageUrl: Boosters },
        ],
    };


    const handleSubmit = () => {
        console.log('Package updated', { asset: selectedAsset, variant: selectedVariant });
        setOpenGift(false);
    };

    return (
        <DashboardLayout>
            <SideNav />
            <DashboardNavbar />
            <SoftBox
                sx={{
                    position: 'absolute',
                    top: '16px',
                    right: '16px',
                    zIndex: 1500,
                }}
            >
                <SoftButton color="info" variant="contained" onClick={() => setOpenGift(true)}>
                    Create Package
                </SoftButton>
            </SoftBox>

            {/* Main Section */}
            <SoftBox mb={3} mt={5}>

                <SoftBox pt={2} px={2}>
                    <SoftBox mb={1}>
                        <SoftTypography variant="h6" fontWeight="medium">
                            Coins
                        </SoftTypography>
                    </SoftBox>

                </SoftBox>
                <SoftBox p={3}>
                    <Grid container spacing={3}>
                        {CoinsData.map((card, index) => (
                            <SoftBox key={index} mr={2} mb={1}>
                                <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
                                    <DefaultInfoCard
                                        id={card._id}
                                        icon={card.image_url}
                                        title={card.quantity}
                                        value={card.price}
                                    />
                                </Grid>
                            </SoftBox>

                        ))}
                    </Grid>
                </SoftBox>


            </SoftBox>

            <SoftBox mb={3} >
                <SoftBox pt={2} px={2}>
                    <SoftBox mb={0.5}>
                        <SoftTypography variant="h6" fontWeight="medium">
                            Diamonds
                        </SoftTypography>
                    </SoftBox>

                </SoftBox>
                <SoftBox p={2}>
                    <Grid container spacing={3}>
                        {DiamondsData.map((card, index) => (
                            <SoftBox key={index} mr={2} mb={1}>

                                <Grid item xs={12} md={6} xl={3}>
                                    <DefaultInfoCard
                                        id={card._id}
                                        icon={card.image_url}
                                        title={card.quantity}
                                        value={card.price}
                                    />
                                </Grid>
                            </SoftBox>
                        ))}
                    </Grid>
                </SoftBox>

            </SoftBox>

            <SoftBox mb={3}>
                <SoftBox pt={2} px={2}>
                    <SoftBox mb={0.5}>
                        <SoftTypography variant="h6" fontWeight="medium">
                            Boosters
                        </SoftTypography>
                    </SoftBox>

                </SoftBox>
                <SoftBox p={2}>
                    <Grid container spacing={3}>

                        {BoostersData.map((card, index) => (
                            <SoftBox key={index} mr={2} mb={1}>
                                <Grid item xs={12} md={6} xl={3} key={index}>
                                    <DefaultInfoCard
                                        id={card._id}
                                        icon={card.image_url}
                                        title={card.quantity}
                                        value={card.price}
                                    />
                                </Grid>
                            </SoftBox>
                        ))}
                    </Grid>
                </SoftBox>

            </SoftBox>

            {/* Dialog Section */}
            <Dialog open={openGift} onClose={() => setOpenGift(false)} maxWidth="sm" fullWidth>
                <DialogTitle>Create Package</DialogTitle>
                <DialogContent>
                    <SoftTypography sx={{ marginTop: 2 }} variant="body2">Select Asset</SoftTypography>
                    <FormControl fullWidth>
                        <Select
                            value={selectedAsset}
                            onChange={(e) => {
                                setSelectedAsset(e.target.value);
                                setSelectedVariant(''); // Reset variant when asset changes
                            }}
                            displayEmpty
                            input={<SoftInput variant="outlined" />}
                            startAdornment={
                                <InputAdornment position="start" sx={{ display: 'flex', alignItems: 'center', color: 'black', fontSize: "1.5rem",}}>
                                  <ArrowDropDownCircleTwoToneIcon sx={{ color: 'black', fontSize: 30,marginLeft:"28.5rem", marginTop:"1rem"  }} />
                                </InputAdornment>
                              }
                        >

                            {Object.keys(assetVariants).map((asset) => (
                                <MenuItem key={asset} value={asset}>
                                    <SoftBox display="flex" alignItems="center">

                                        <img
                                            src={assetVariants[asset][0]?.imageUrl}
                                            alt={asset}
                                            style={{ width: 20, height: 20, marginRight: 8 }}
                                        />
                                        {asset}
                                    </SoftBox>

                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <SoftTypography sx={{ marginTop: 2 }} variant="body2">
                        Select Variant
                    </SoftTypography>
                    <FormControl fullWidth>
                        <Select
                            value={selectedVariant}
                            onChange={(e) => setSelectedVariant(e.target.value)}
                            displayEmpty
                            disabled={!selectedAsset}
                            input={<SoftInput variant="outlined" />}
                            startAdornment={
                                            <InputAdornment position="start" sx={{ display: 'flex', alignItems: 'center', color: 'black', fontSize: "1.5rem",}}>
                                              <ArrowDropDownCircleTwoToneIcon sx={{ color: 'black', fontSize: 30,marginLeft:"28.5rem", marginTop:"1rem"  }} />
                                            </InputAdornment>
                                          }

                        >

                            {selectedAsset &&
                                assetVariants[selectedAsset].map((variant) => (
                                    <MenuItem key={variant.name} value={variant.name}>
                                        <SoftBox display="flex" alignItems="center">

                                            <img
                                                src={variant.imageUrl}
                                                alt={variant.name}
                                                style={{ width: 20, height: 20, marginRight: 8 }}
                                            />
                                            {variant.name}
                                        </SoftBox>

                                    </MenuItem>
                                ))}
                        </Select>
                    </FormControl>

                    <SoftTypography sx={{ marginTop: 2 }} variant="body2">
                        Quantity / Hours
                    </SoftTypography>
                    <SoftInput placeholder="Enter quantity or hours" type="number" fullWidth onWheel={(e)=>e.target.blur()}/>

                    <SoftTypography sx={{ marginTop: 2 }} variant="body2">
                        Price
                    </SoftTypography>
                    <SoftInput placeholder="Price" fullWidth />
                </DialogContent>

                <DialogActions>
                    <SoftButton variant="gradient" color="secondary" onClick={() => setOpenGift(false)}>
                        Cancel
                    </SoftButton>
                    <SoftButton variant="gradient" color="info" onClick={handleSubmit}>
                        Send
                    </SoftButton>
                </DialogActions>
            </Dialog>
        </DashboardLayout>
    );
}

export default Index;
