
import PropTypes from "prop-types";

// @mui material components
import Icon from "@mui/material/Icon";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftButton from "components/SoftButton";
import SoftAvatar from "components/SoftAvatar";

function CoinItem({ id,color, icon, name, description, value }) {
  const isImage = typeof icon === "string" && icon.match(/\.(jpeg|jpg|gif|png)$/);
  return (
    <SoftBox key={name} component="li" py={1} pr={2} mb={1}>
      <SoftBox display="flex" justifyContent="space-between" alignItems="center">
        <SoftBox display="flex" alignItems="center">
          <SoftBox mr={2}>
            <SoftButton variant="outlined"  size="small" iconOnly circular>
            {isImage ? (
                <SoftAvatar src={icon} alt={name} size="sm" variant="rounded"
                sx={{ cursor: "pointer" }}/>
              ) : (
                <Icon sx={{ fontWeight: "bold" }}>{icon}</Icon>
              )}
            </SoftButton>
          </SoftBox>
          <SoftBox display="flex" flexDirection="column">
            <SoftTypography variant="button" fontWeight="medium" gutterBottom>
              {name} (Player id: {id})
            </SoftTypography>
            <SoftTypography variant="caption" color="text">
              {description}
            </SoftTypography>
          </SoftBox>
        </SoftBox>
        <SoftTypography variant="button" color={color} fontWeight="medium" textGradient>
          {value}
        </SoftTypography>
      </SoftBox>
    </SoftBox>
  );
}

// Typechecking props of the CoinItem
CoinItem.propTypes = {
  id: PropTypes.string.isRequired,
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "light",
    "dark",
  ]).isRequired,
  icon: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired, 
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

export default CoinItem;
