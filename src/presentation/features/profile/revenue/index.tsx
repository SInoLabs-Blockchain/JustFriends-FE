import { Box, Grid, Typography } from "@mui/material";
import {
  KlaytnLogo1,
  KlaytnLogo2,
  KlaytnLogo3,
  ArrowDownIcon,
} from "src/presentation/theme/assets/icons";

import useRevenue from "./useRevenue";
import CustomLineChart from "./LineChart";
import { RevenueContainer, TimeUnitItem } from "../styles";

const Revenue = () => {
  const { TIME_UNITS, timeUnit, onChangeTimeUnit } = useRevenue();

  const renderTimeUnits = () => (
    <Box className="time-unit-container">
      {TIME_UNITS.map((item, index) => (
        <TimeUnitItem
          isSelected={timeUnit.id === index}
          onClick={() => onChangeTimeUnit(item)}
        >
          <Typography>{item.value}</Typography>
        </TimeUnitItem>
      ))}
    </Box>
  );

  return (
    <RevenueContainer>
      <Grid container spacing={3}>
        <Grid item sm={12} md={12} lg={4.8}>
          <Box className="profit-container revenue-box">
            <Box>
              <Typography className="profit__title">Total Profit</Typography>
              <Typography className="profit__value">
                1,023.631235 KLAY
              </Typography>
            </Box>
            <Box className="flex-center">
              <KlaytnLogo1 />
            </Box>
            <Box className="profit__content">
              <Box className="profit__content-item">
                <Box>
                  <Typography className="profit__content-value">
                    1,223.631465
                  </Typography>
                  <Typography className="profit__content-title">
                    Total Revenue
                  </Typography>
                </Box>
                <Box>
                  <Typography className="profit__content-value">
                    5261
                  </Typography>
                  <Typography className="profit__content-title">
                    Total Subscribers
                  </Typography>
                </Box>
              </Box>
              <Box className="profit__content-item">
                <Box>
                  <Typography className="profit__content-value">
                    200.00023
                  </Typography>
                  <Typography className="profit__content-title">
                    Total Spent
                  </Typography>
                </Box>
                <Box>
                  <Typography className="profit__content-value">327</Typography>
                  <Typography className="profit__content-title">
                    Total Loyal Fans
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Grid>
        <Grid item sm={12} md={6} lg={3.6}>
          <Box className="active-income-container revenue-box">
            <Box>
              <Typography className="active-income__title">
                Active Income
              </Typography>
              <Typography className="active-income__value">
                91,454914 KLAY
              </Typography>
            </Box>
            <Box className="flex-center">
              <KlaytnLogo2 />
            </Box>
            <Box className="active-income__content">
              <Box>
                <Typography className="active-income__content-value">
                  275.868339
                </Typography>
                <Typography className="active-income__content-title">
                  Total Revenue
                </Typography>
              </Box>
              <Box>
                <Typography className="active-income__content-value">
                  185,413425
                </Typography>
                <Typography className="active-income__content-title">
                  Total Spent
                </Typography>
              </Box>
            </Box>
          </Box>
        </Grid>
        <Grid item sm={12} md={6} lg={3.6}>
          <Box className="passive-income-container revenue-box">
            <Box>
              <Typography className="passive-income__title">
                Passive Income
              </Typography>
              <Typography className="passive-income__value">
                932.176321 KLAY
              </Typography>
            </Box>
            <Box className="flex-center">
              <KlaytnLogo3 />
            </Box>
            <Box className="passive-income__content">
              <Box>
                <Typography className="passive-income__content-value">
                  275.868339
                </Typography>
                <Typography className="passive-income__content-title">
                  Total Revenue
                </Typography>
              </Box>
              <Box>
                <Typography className="passive-income__content-value">
                  185,413425
                </Typography>
                <Typography className="passive-income__content-title">
                  Total Spent
                </Typography>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Box className="profit-chart-container">
        <Box className="chart-title">
          <Typography>
            Total Profit <ArrowDownIcon width={16} height={16} />
          </Typography>
          {renderTimeUnits()}
        </Box>
        <CustomLineChart />
      </Box>
    </RevenueContainer>
  );
};

export default Revenue;
