import Card from "@mui/material/Card";

import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import Image1 from "assets/images/team-1.jpg"
import CoinItem from "./CoinItem";

function Transactions() {
  // Transaction data
  const transactions = [
    {
      id: "1",
      color: "error",
      icon: Image1,
      name: "Player name",
      description: "27 March 2020, at 12:30 PM",
      value: "- 2,500",
      category: "newest"
    },
    {
      id: "2",
      color: "success",
      icon: Image1,
      name: "Player name",
      description: "27 March 2020, at 04:30 AM",
      value: "+ 2,000",
      category: "newest"
    },
    {
      id: "3",
      color: "success",
      icon: Image1,
      name: "Player name",
      description: "26 March 2020, at 13:45 PM",
      value: "+ 750",
      category: "yesterday"
    },
    {
      id: "4",
      color: "success",
      icon: Image1,
      name: "Player name",
      description: "26 March 2020, at 12:30 PM",
      value: "+ 1,000",
      category: "yesterday"
    },
    {
      id: "5",
      color: "success",
      icon: Image1,
      name: "Player name",
      description: "26 March 2020, at 08:30 AM",
      value: "+ 2,500",
      category: "yesterday"
    },
    {
      id: "6",
      color: "success",
      icon: Image1,
      name: "Player name",
      description: "26 March 2020, at 05:00 AM",
      value: "+ 1,000",
      category: "yesterday"
    }
  ];

  return (
    <Card sx={{ height: "100%" }}>
      <SoftBox display="flex" justifyContent="space-between" alignItems="center" pt={3} px={2}>
        <SoftTypography variant="h6" fontWeight="medium" textTransform="capitalize">
          Coins History
        </SoftTypography>
      </SoftBox>

      {/* Render transactions */}
      {["newest", "yesterday"].map((category) => (
        <SoftBox key={category} pt={3} pb={2} px={2}>
          <SoftBox mb={2}>
            <SoftTypography
              variant="caption"
              color="text"
              fontWeight="bold"
              textTransform="uppercase"
            >
              {category}
            </SoftTypography>
            
          </SoftBox>

          <SoftBox
            component="ul"
            display="flex"
            flexDirection="column"
            p={0}
            m={0}
            sx={{ listStyle: "none" }}
          >
            {transactions
              .filter((transaction) => transaction.category === category)
              .map((transaction) => (
                <CoinItem
                  key={transaction.id}
                  id={transaction.id}
                  color={transaction.color}
                  icon={transaction.icon}
                  name={transaction.name}
                  description={transaction.description}
                  value={transaction.value}
                />
              ))}
          </SoftBox>
          
        </SoftBox>
      ))}
    </Card>
  );
}

export default Transactions;
