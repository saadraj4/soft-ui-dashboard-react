import PropTypes from "prop-types";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

function ReportsBarChartItem({ color, icon, label, progress }) {

  return (
    <SoftBox width="100%">
      <SoftBox display="flex" alignItems="center" mb={1}>
        <SoftTypography
          variant="caption"
          textTransform="capitalize"
          fontWeight="medium"
          color="text"
        >
          {label}
        </SoftTypography>
      </SoftBox>
      <SoftBox mt={1}>
        <SoftTypography variant="h4" fontWeight="bold" color={color} ml={1}>
          {progress.content}
        </SoftTypography>
        
      </SoftBox>
    </SoftBox>
  );
}

// Setting default values for the props of ReportsBarChartItem
ReportsBarChartItem.defaultProps = {
  color: "dark",
};

// Typechecking props for the ReportsBarChartItem
ReportsBarChartItem.propTypes = {
  color: PropTypes.oneOf(["primary", "secondary", "info", "success", "warning", "error", "dark"]),
  icon: PropTypes.shape({
    color: PropTypes.oneOf(["primary", "secondary", "info", "success", "warning", "error", "dark"])
      .isRequired,
    component: PropTypes.node.isRequired,
  }).isRequired,
  label: PropTypes.string.isRequired,
  progress: PropTypes.shape({
    content: PropTypes.string.isRequired,
    percentage: PropTypes.number.isRequired,
  }).isRequired,
};

export default ReportsBarChartItem;