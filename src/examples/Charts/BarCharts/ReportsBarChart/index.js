import { useMemo } from "react";
import PropTypes from "prop-types";
// import { Bar } from "react-chartjs-2";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import BarReportsChartItem from "examples/Charts/BarCharts/ReportsBarChart/ReportsBarChartItem";
import configs from "examples/Charts/BarCharts/ReportsBarChart/configs";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


function ReportsBarChart({ color, title, chart, items }) {
  const { data, options } = configs(chart.labels || [], chart.datasets || {});
  const chartData = chart.datasets.data.map((item, index) => ({
    name: chart.labels[index],
    value: item
  }));
  const renderItems = items.map(({ icon, label, progress }, index) => (
    <Grid item xs={6} sm={5} key={index}>
      <BarReportsChartItem
        color="info"
        icon={{ color: icon.color, component: icon.component }}
        // label={label}
        progress={{ content: progress.content }}
      />
    </Grid>
  ));

  return (
    <>
      <SoftBox mb={2}>

        <SoftBox px={1} mb={2}>
          <Grid xl={6} lg={6} md={6} sm={6} xs={6}>
            <Card >
              <SoftBox mb={1}>
                <SoftTypography variant="h6" fontWeight="medium" textTransform="capitalize" ml={1} mt={1}>
                  {title}
                </SoftTypography>
              </SoftBox>
              <SoftBox >
                <Grid container spacing={3}>
                  {renderItems}
                </Grid>
              </SoftBox>
            </Card>
          </Grid>
        </SoftBox>

      </SoftBox>
      <SoftBox mt={3}>
        <Card>
          <SoftBox padding="1rem">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#18bfe5" />
              </BarChart>
            </ResponsiveContainer>
          </SoftBox>
        </Card>
      </SoftBox>

      {/* <SoftBox mt={3}>
        <Card>

          <SoftBox padding="1rem">

            {useMemo(
              () => (
                <SoftBox
                  variant="contained"
                  bgColor="secondary"
                  borderRadius="lg"
                  py={2}
                  pr={0.5}
                  mb={3}
                  height="15rem"
                >
                  <Bar data={data} options={options} color="dark" />
                </SoftBox>
              ),
              [chart, color]
            )}

          </SoftBox>
        </Card>
      </SoftBox> */}
    </>
  );
}

// Setting default values for the props of ReportsBarChart
ReportsBarChart.defaultProps = {
  color: "dark",
  items: [],
};

// Typechecking props for the ReportsBarChart
ReportsBarChart.propTypes = {
  color: PropTypes.oneOf(["primary", "secondary", "info", "success", "warning", "error", "dark"]),
  title: PropTypes.string.isRequired,
  chart: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.array, PropTypes.object])).isRequired,
  items: PropTypes.arrayOf(PropTypes.object),
};

export default ReportsBarChart;