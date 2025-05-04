import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import Card from "@mui/material/Card";
import CircularProgress from "@mui/material/CircularProgress";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftAvatar from "components/SoftAvatar";
import badge1 from "assets/images/Badges/1.png";
import badge2 from "assets/images/Badges/2.png";
import badge3 from "assets/images/Badges/3.png";
import CoinImage from "assets/images/coins.png"
import DiamondImage from "assets/images/diamond.png"
import BoosterImage from "assets/images/booster.png"
import Dice from "assets/images/dice.png"
import FolderIcon from '@mui/icons-material/Folder';
import HourglassDisabledIcon from '@mui/icons-material/HourglassDisabled';
import ContentPasteRoundedIcon from '@mui/icons-material/ContentPasteRounded';
import { Icon } from "@mui/material";

function ProfilesList({ title, profiles }) {
  const [displayedProfiles, setDisplayedProfiles] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const profilesPerPage = 5;

  // Load profiles for the current page
  const loadProfiles = useCallback(() => {
    setLoading(true);

    setTimeout(() => {
      const startIndex = (page - 1) * profilesPerPage;
      const endIndex = startIndex + profilesPerPage;

      if (startIndex >= profiles.length) {
        setHasMore(false); // No more profiles to load
        setLoading(false);
        return;
      }

      setDisplayedProfiles((prevProfiles) => [
        ...prevProfiles,
        ...profiles.slice(startIndex, endIndex),
      ]);
      setLoading(false);
    }, 1000); // Simulated delay for loading profiles
  }, [page, profiles]);

  // Trigger loading on page change
  useEffect(() => {
    loadProfiles();
  }, [page, loadProfiles]);

  // Handle scroll event
  const handleScroll = () => {
    const bottomReached =
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight;

    if (bottomReached && hasMore && !loading) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  // Attach and detach scroll event listener
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasMore, loading]);

  return (
    <Card sx={{ height: "100%" }}>
      <SoftBox pt={2} px={2}>
        <SoftTypography variant="h6" fontWeight="medium" textTransform="capitalize">
          {title}
        </SoftTypography>
      </SoftBox>
      <SoftBox p={2}>
        <div style={{ overflowX: "auto" }}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.thname}>Name</th>
                <th style={styles.th}>Image</th>
                <th style={styles.th}>Player ID</th>
                <th style={styles.th}>Win Amount</th>
              </tr>
            </thead>
            <tbody>
              {displayedProfiles.length === 0 && !loading && (
                <tr>
                  <td colSpan={4}>
                    <SoftBox display="flex" flexDirection="column" alignItems="center" justifyContent="center" p={4}>
                      <Icon sx={{ fontSize: "150rem", color: "#333" }}>
                        <HourglassDisabledIcon />
                      </Icon>

                    </SoftBox>
                  </td>
                </tr>
              )}
              {displayedProfiles.map(({ image, name, id, badge, winAmount }, index) => (
                <tr key={index}>
                  <td style={styles.tdname}>
                    <SoftBox display="flex" alignItems="center">
                      {badge === 1 ? (
                        <SoftAvatar src={badge1} alt="Badge1" />
                      ) : badge === 2 ? (
                        <SoftAvatar src={badge2} alt="Badge2" />
                      ) : badge === 3 ? (
                        <SoftAvatar src={badge3} alt="Badge3" />
                      ) : (
                        <span style={styles.badgeText}>{badge}</span>
                      )}
                      <SoftTypography variant="button" fontWeight="medium" ml={2}>
                        {name}
                      </SoftTypography>
                    </SoftBox>
                  </td>
                  <td style={styles.td}>
                    <SoftTypography variant="button" fontWeight="regular">
                      <SoftAvatar src={image} alt={name} variant="rounded" shadow="md" />
                    </SoftTypography>
                  </td>
                  <td style={styles.td}>
                    <SoftTypography variant="button" fontWeight="regular">
                      {id}
                    </SoftTypography>
                  </td>
                  <td style={styles.td}>
                    {badge < 4 && <SoftBox display="flex" alignItems="center">
                      {winAmount.type === "coins" && (
                        <>
                          <SoftAvatar
                            src={CoinImage} // Replace with the actual path to the coins image
                            alt="Coins"
                          />
                          <SoftTypography variant="button" fontWeight="regular" ml={1}>
                            {winAmount.quantity.toLocaleString()}
                          </SoftTypography>
                        </>
                      )}
                      {winAmount.type === "diamonds" && (
                        <>
                          <SoftAvatar
                            src={DiamondImage} // Replace with the actual path to the diamonds image
                            alt="Diamonds"
                          />
                          <SoftTypography variant="button" fontWeight="regular" ml={1}>
                            {winAmount.quantity.toLocaleString()}
                          </SoftTypography>
                        </>
                      )}
                      {winAmount.type === "booster" && (
                        <>
                          <SoftAvatar
                            src={BoosterImage} // Replace with the actual path to the booster image
                            alt="Booster"
                          />
                          <SoftTypography variant="button" fontWeight="regular" ml={1}>
                            {winAmount.quantity.toLocaleString()}
                          </SoftTypography>
                        </>
                      )}
                      {winAmount.type === "dice" && (
                        <>
                          <SoftAvatar
                            src={Dice} // Replace with the actual path to the dice image
                            alt="Dice"
                          />
                          <SoftTypography variant="button" fontWeight="regular" ml={1}>
                            {winAmount.quantity.toLocaleString()}
                          </SoftTypography>
                        </>
                      )}
                    </SoftBox>}
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {loading && (
          <SoftBox display="flex" justifyContent="center" mt={2}>
            <CircularProgress color="info" />
          </SoftBox>
        )}
        {!hasMore && !loading && (
          <SoftTypography
            variant="button"
            fontWeight="medium"
            color="textSecondary"
            display="flex"
            textAlign="center"
            justifyContent="center"
            mt={2}
          >
            No more profiles to display.
          </SoftTypography>
        )}
      </SoftBox>
    </Card>
  );
}

const styles = {
  table: {
    width: "100%",
    borderCollapse: "collapse",
    fontSize: "14px",
  },
  th: {
    textAlign: "left",
    padding: "10px",
    borderBottom: "1px solid #ddd",
    fontWeight: "bold",
    color: "#333",
  },
  td: {
    textAlign: "left",
    padding: "10px",
    borderBottom: "1px solid #ddd",
  },
  thname: {
    textAlign: "left",
    paddingRight: "10px",
    borderBottom: "1px solid #ddd",
    color: "#333",
    fontWeight: "bold",
  },
  tdname: {
    textAlign: "left",
    paddingRight: "10px",
    borderBottom: "1px solid #ddd",
  },
  badgeText: {
    color: "black",
    paddingLeft: "20px",
    paddingRight: "17px",
  },
  "@media (max-width: 480px)": {
    table: {
      fontSize: "12px",
    },
    th: {
      padding: "5px",
    },
    td: {
      padding: "5px",
    },
  },
};

ProfilesList.propTypes = {
  title: PropTypes.string.isRequired,
  profiles: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.string,
      name: PropTypes.string,
      id: PropTypes.string,
      badge: PropTypes.number,
      winAmount: PropTypes.number,
    })
  ).isRequired,
};

export default ProfilesList;
