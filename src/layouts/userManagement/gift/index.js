import { Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, Select, FormControl, InputLabel, InputAdornment } from '@mui/material';
import SoftBox from 'components/SoftBox';
import SoftButton from 'components/SoftButton';
import SoftInput from 'components/SoftInput';
import SoftTypography from 'components/SoftTypography';
import React, { useState } from 'react';
import Coin from 'assets/images/Coins.jpeg';
import Diamond from 'assets/images/diamond.png';
import Booster from 'assets/images/booster.png';
import ArrowDropDownCircleTwoToneIcon from '@mui/icons-material/ArrowDropDownCircleTwoTone';

function index({ openGift, handleCloseGift }) {
  const [selectedAsset, setSelectedAsset] = useState('');
  const [selectedVariant, setSelectedVariant] = useState('');

  // Map assets to their respective variants and image URLs
  const assetVariants = {
    Coins: [
      { name: 'Gold Coin', imageUrl: Coin },
      { name: 'Silver Coin', imageUrl: Coin },
      { name: 'Bronze Coin', imageUrl: Coin },
    ],
    Diamonds: [
      { name: 'Red Diamond', imageUrl: Diamond },
      { name: 'Blue Diamond', imageUrl: Diamond },
      { name: 'Green Diamond', imageUrl: Diamond },
    ],
    Boosters: [
      { name: 'Speed Booster', imageUrl: Booster },
      { name: 'Energy Booster', imageUrl: Booster },
      { name: 'Shield Booster', imageUrl: Booster },
    ],
  };

  const handleAssetChange = (event) => {
    setSelectedAsset(event.target.value);
    setSelectedVariant(''); // Reset variant when asset changes
  };

  const handleVariantChange = (event) => {
    setSelectedVariant(event.target.value);
  };

  const handleSubmit = () => {
    console.log('Gift updated', { asset: selectedAsset, variant: selectedVariant });
    handleCloseGift();
  };

  const handleClose = () => {
    setSelectedAsset('');
    setSelectedVariant('');
    handleCloseGift();
  };

  return (
    <Dialog open={openGift} onClose={handleClose} maxWidth="sm" fullWidth>
      <SoftBox>
        <DialogTitle display="flex" alignItems="center" justifyContent="center" fontWeight="bold" fontSize="20px">
          Gift
        </DialogTitle>
        <DialogContent>
          {/* Asset Dropdown */}
          <SoftTypography sx={{ marginTop: 2 }} variant="body2">
            Select Asset
          </SoftTypography>
          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <Select
              value={selectedAsset}
              onChange={handleAssetChange}
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

          {/* Variant Dropdown */}
          <SoftTypography sx={{ marginTop: 1 }} variant="body2">
            Select Variant
          </SoftTypography>
          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <Select
              value={selectedVariant}
              onChange={handleVariantChange}
              displayEmpty
              input={<SoftInput variant="outlined" />}
              disabled={!selectedAsset}
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

          {/* Quantity / Hours Input */}
          <SoftTypography sx={{ marginTop: 2 }} variant="body2">
            Quantity / Hours
          </SoftTypography>
          <SoftInput
            variant="outlined"
            type="number"
            placeholder="Enter quantity or hours"
            fullWidth
            onWheel={(e) => e.target.blur()}
          />

          {/* Message Input */}
          <SoftTypography sx={{ marginTop: 2 }} variant="body2">
            Message
          </SoftTypography>
          <SoftInput placeholder="Message" variant="outlined" type="text" fullWidth multiline rows={4} />
        </DialogContent>

        <DialogActions>
          <SoftBox mt={2} mb={1}>
            <SoftButton variant="gradient" color="secondary" fullWidth onClick={handleClose} sx={{ color: 'black' }}>
              Cancel
            </SoftButton>
          </SoftBox>

          <SoftBox mt={2} mb={1}>
            <SoftButton variant="gradient" color="info" fullWidth onClick={handleSubmit} sx={{ color: 'black' }}>
              Send
            </SoftButton>
          </SoftBox>
        </DialogActions>
      </SoftBox>
    </Dialog>
  );
}

export default index;
