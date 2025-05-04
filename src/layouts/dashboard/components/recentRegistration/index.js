import PropTypes from "prop-types";
import Card from "@mui/material/Card";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftAvatar from "components/SoftAvatar";
import SoftButton from "components/SoftButton";
import { formatDate } from "utils/formatDate";
import LoadingSpinner from "components/LoadingSpinner";

function ProfilesList({ title, profiles }) {
  if(profiles === null) return (
    <Card sx={{ height: "100%" }}>
      <SoftBox pt={2} px={2}>
        <SoftTypography variant="h6" fontWeight="medium" textTransform="capitalize">
          {title}
        </SoftTypography>
      </SoftBox>
      <SoftBox p={2}>
          <SoftTypography variant="body2" color="text">
            No Data Available
          </SoftTypography>
      </SoftBox>
    </Card>
  );
  const renderProfiles = profiles.map(({ avatar, first_name,last_name, _id, createdAt },index) => (
    <SoftBox key={index} component="li" display="flex" alignItems="center" py={1} mb={1}>
      <SoftBox mr={2}>
        <SoftAvatar src={avatar} alt={first_name} variant="rounded" shadow="md" />
      </SoftBox>
      <SoftBox
        display="flex"
        flexDirection="column"
        alignItems="flex-start"
        justifyContent="center"
      >
        <SoftTypography variant="button" fontWeight="medium">
          {first_name} {last_name}
        </SoftTypography>
        <SoftTypography variant="caption" color="text" fontSize="0.6rem">
          {_id}
        </SoftTypography>
      </SoftBox>
      <SoftBox ml="auto">
        
          <SoftButton variant="text" color="info" fontSize="0.75rem">
            {formatDate(createdAt)}
          </SoftButton>
       
      </SoftBox>
    </SoftBox>
  ));

  return (
    <Card sx={{ height: "100%" }}>
      <SoftBox pt={2} px={2}>
        <SoftTypography variant="h6" fontWeight="medium" textTransform="capitalize">
          {title}
        </SoftTypography>
      </SoftBox>
      <SoftBox p={2}>
        <SoftBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
          {renderProfiles}
        </SoftBox>
      </SoftBox>
    </Card>
  );
}

// Typechecking props for the ProfilesList
ProfilesList.propTypes = {
  title: PropTypes.string.isRequired,
  profiles: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ProfilesList;
