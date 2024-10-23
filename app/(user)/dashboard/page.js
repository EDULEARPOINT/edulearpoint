"use client"
import { useAppContext } from "@/utils/GlobalContext";
import DashboardCards from "../_components/DashboardCards"
import UserCard from '../_components/UserCard';
import { useEffect } from "react";

const Dashboard = () => {
    const { UserDetails, fetchUserDetails, user } = useAppContext();

    useEffect(() => {
        if (user) {
            fetchUserDetails(user.uid);
        }
    }, [user, fetchUserDetails]);

    // const { totalEarnings, referAmount, directEarnings, passiveEarnings, name, todayEarning, last7Days, last30Days } = UserDetails;
    // const { totalEarnings, referAmount, directEarnings, passiveEarnings, name } = UserDetails;
      // Use optional chaining and provide default values
      const { 
        totalEarnings = 0, 
        referAmount = 0, 
        todayIncome = 0, 
        passiveEarnings = 0, 
        turnOverIncome = 0,
        rewardIncome = 0,
        name = '' 
    } = UserDetails ?? {};



    return (
        <div className="md:p-6 px-4 py-6 w-full bg-gray-100  flex">
            <div className="w-full">
                <h1 className="text-2xl font-bold text-gray-800 mb-4">Dashboard</h1>
                <hr className="my-4 border-t border-gray-300" />
                <div className="bg-white p-4 shadow-md rounded-md border-l-4 border-green-500 ">
                    <p className="text-gray-700">
                        <span className="font-semibold ">Welcome {name}</span>
                    </p>
                </div>
                <div className="lg:hidden py-5">
                    <UserCard />
                </div>
                {/* <div className="grid grid-cols-3 gap-4 mb-4 ">
                    <DashboardCards amount={todayEarning} description="Today's Earning" bgDark="bg-orange-400" bgColor="bg-orange-100" />
                    <DashboardCards amount={last7Days} description="Last 7 Days Earning" bgDark="bg-blue-400" bgColor="bg-blue-100" />
                    <DashboardCards amount={last30Days} description="Last 30 Days Earning" bgDark="bg-green-400" bgColor="bg-green-100" />
                    <DashboardCards amount={passiveEarnings} description="Passive Income" bgDark="bg-purple-400"  bgColor="bg-purple-100" />
                    <DashboardCards amount={totalEarnings} description="Total Earning" bgDark="bg-yellow-400" bgColor="bg-yellow-100" />
                    <DashboardCards amount={referAmount} description="Reward Income" bgDark="bg-pink-400" bgColor="bg-pink-100" />
                    <DashboardCards amount={directEarnings} description="Direct Income" bgDark="bg-red-400" bgColor="bg-red-100" />
                </div> */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-4 my-4 ">
                    <DashboardCards amount={todayIncome} description="Today Income" bgDark="bg-orange-400" bgColor="bg-orange-100" />
                    <DashboardCards amount={totalEarnings} description="Last 7 Days Earning" bgDark="bg-blue-400" bgColor="bg-green-100" />
                    <DashboardCards amount={totalEarnings} description="Last 30 Days Earning" bgDark="bg-green-400" bgColor="bg-purple-100" />
                    <DashboardCards amount={totalEarnings} description="Total Earnings" bgDark="bg-yellow-400" bgColor="bg-yellow-100" />
                    <DashboardCards amount={referAmount} description="Referral Earnings" bgDark="bg-green-400" bgColor="bg-pink-100" />
                    <DashboardCards amount={passiveEarnings} description="Passive Earnings" bgDark="bg-blue-400" bgColor="bg-blue-100" />
                    <DashboardCards amount={turnOverIncome} description="Turnover Income" bgDark="bg-green-400" bgColor="bg-orange-100" />
                    <DashboardCards amount={rewardIncome} description="Reward Income" bgDark="bg-green-400" bgColor="bg-cyan-200" />


                </div>

            </div>
            <div className="w-2/5  hidden lg:block mt-12">
                <UserCard />
            </div>
        </div>
    );
};

export default Dashboard;