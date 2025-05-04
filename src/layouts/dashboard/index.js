// Necessary imports
import Grid from "@mui/material/Grid";
import SoftBox from "components/SoftBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import MiniStatisticsCard from "examples/Cards/StatisticsCards/MiniStatisticsCard";
import Users from "./components/recentRegistration"
import Purchase from "./components/recentPurchase"
import PurchaseData from "./data/PurchaseData"
import Notifications from "./components/notifications";
import TOP5Players from "./components/top5Players";
import TOP5PlayersData from "./data/Top5PlayersData"
import Sidenav from "../SideNavbar";
import Player from "assets/players.png"
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import PeopleSharpIcon from '@mui/icons-material/PeopleSharp';
import { useEffect, useState } from "react";
import UseStore from "utils/UseStore";
import LoadingSpinner from "components/LoadingSpinner";
import { DashboardAPI } from 'utils/constants';


function Dashboard() {
  const [registeredPlayersCount, setRegisteredPlayersCount] = useState(null); // State to hold the number of registered players
  const [totalCoins, setTotalCoins] = useState(null); // State to hold the number of registered players
  const [onlinePlayer, setonlinePlayer] = useState(null); // State to hold the number of registered players
  const [recentRegistrations, setRecentRegistrations] = useState(null); // New state for recent registrations
  const [leaguePlayers, setLeaguePlayers] = useState([]); // New state for league players
  const { fetchData } = UseStore(); // Fetch data from the store
  useEffect(() => {
    // Fetch the number of registered players
    const fetchRegisteredPlayers = async () => {
      const response = await fetchData(DashboardAPI.registeredPlayers);
      setRegisteredPlayersCount(response.totalRegisteredPlayers);
    }

    const TotalWinningCoins = async () => {
      const response = await fetchData(DashboardAPI.totalWinningCoins);
      setTotalCoins(response.totalWinningFee);
    }

    const getOnlinePlayers = async () => {
      const response = await fetchData(DashboardAPI.onlinePlayers);
      setonlinePlayer(response.online_players);
    }
    const fetchRecentRegistrations = async () => {
      const response = await fetchData(DashboardAPI.recentRegistrations); // Fetch the recent registrations data
      console.log(response);
      if(response.success){
      setRecentRegistrations(response.latestPlayers); // Assuming the response is the data you want to pass to the Users component
    }
  
  };
    const fetchLeaguePlayers = async () => {
      const response = await fetchData(DashboardAPI.leaguePlayers); // Fetch the league players data
      setLeaguePlayers(response.leaguePlayers); // Assuming the response is the data you want to pass to the TOP5Players component
    };


    fetchRegisteredPlayers();
    TotalWinningCoins();
    getOnlinePlayers();
    fetchRecentRegistrations()
    fetchLeaguePlayers();
  }, []);




  const data = [
    {
      title: "No. of Players",
      count: registeredPlayersCount !== null ? registeredPlayersCount : <LoadingSpinner />,
      percentage: { color: "success", text: "+55%" },
      icon: { color: "info", component: PeopleSharpIcon },
    },
    {
      title: "Fee Coins",
      count: totalCoins !== null ? totalCoins : <LoadingSpinner />,
      percentage: { color: "success", text: "+3%" },
      icon: { color: "info", component: Player },
    },
    {
      title: "Online Player",
      count: onlinePlayer !== null ? onlinePlayer : <LoadingSpinner />,
      percentage: { color: "error", text: "-2%" },
      icon: { color: "info", component: Player },
    },
    {
      title: "Total Revenue",
      count: "103",
      percentage: { color: "success", text: "+5%" },
      icon: { color: "info", component: Player },
    },
  ]

  return (
    <>
      <Sidenav />
      <DashboardLayout>
        <DashboardNavbar />
        <SoftBox py={3}>
          <SoftBox mb={3}>
            <Grid container spacing={3}>
              {data.map((card, index) => (
                <Grid item xs={12} sm={6} xl={3} key={index}>
                  <MiniStatisticsCard
                    title={{ text: card.title }}
                    count={card.count}
                    percentage={card.percentage}
                    icon={card.icon}
                  />
                </Grid>
              ))}
            </Grid>
          </SoftBox>


          <SoftBox mt={5} mb={3}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6} xl={4}>
                <Users title="Recent Registation" profiles={recentRegistrations} />
              </Grid>
              <Grid item xs={12} md={6} xl={4}>
                {/* Another Item  need to be here*/}
                <Purchase title="Recent Purchases" profiles={PurchaseData} />

              </Grid>
              <Grid item xs={12} xl={4}>
                {/* Another Item need to be here*/}
                <Notifications />
              </Grid>
            </Grid>
          </SoftBox>

          {/* <TOP5Players title="League Players" profiles={TOP5PlayersData} /> */}
          <TOP5Players title="League Players" profiles={leaguePlayers} />

        </SoftBox>
      </DashboardLayout>
    </>
  );
}

export default Dashboard;
