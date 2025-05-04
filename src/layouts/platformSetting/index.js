import React,{useState,useEffect} from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Sidenav from "../SideNavbar";
import DailyReward from "./dailyReward";
import SoftBox from "components/SoftBox";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import ChestRewards from "./chestRewards";
import LeagueRewardList from "./leagueRewards/components/LeagueReward";
import LeagueRewardData from "./leagueRewards/data/LeagueRewardData";
import UseStore from "utils/UseStore";
import {SettingsAPI} from "utils/constants";

const PlatformManagement = () => {
    const [DailyRewardsData, setDailyRewardsData] = useState([]);
    const { fetchData } = UseStore();
    useEffect(() => {
        const getDailyRewards = async () => {
            const response = await fetchData(SettingsAPI.get_daily_reward);
            setDailyRewardsData(response.boosters);
        };
        getDailyRewards();
    }, [DailyRewardsData]);
    return (
        <DashboardLayout>
            <DashboardNavbar />
            <Sidenav />
            <SoftBox mb={2}>
                <ChestRewards />
            </SoftBox>
            <SoftBox>
                <DailyReward title={"Daily Rewards"} DailyReward={DailyRewardsData} />
            </SoftBox>

            <SoftBox>
                <LeagueRewardList title={"League Rewards"} LeagueRewards={LeagueRewardData} />
            </SoftBox>


        </DashboardLayout>
    );
};

export default PlatformManagement;
