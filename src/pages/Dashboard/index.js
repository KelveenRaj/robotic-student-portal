import React from "react";
// import { useSelector } from "react-redux";
// import { makeSelectAccessToken } from "../../redux/slices/app/selector";
import Layout from "../../components/Layout/MainLayout";
import MaintenanceALert from "../../components/MaintenanceALert";

const Dashboard = () => {
  // const token = useSelector(makeSelectAccessToken());

  return (
    <Layout>
      <MaintenanceALert />
      {/* <p>{token ? `accessToken : ${token}` : "cannot get token"}</p> */}
    </Layout>
  );
};
export default Dashboard;
