'use client';
import { Paper, Box, Grid } from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';
import SalesOverview from '../../components/dashboard/SalesOverview';
import YearlyBreakup from '../../components/dashboard/YearlyBreakup';
import MonthlyEarnings from '../../components/dashboard/MonthlyEarnings';
import RecentTransactions from '../../components/dashboard/RecentTransactions';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';


const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body1,
  textAlign: 'center',
  color: theme.palette.text.secondary,
  height: 60,
  lineHeight: '60px',
}));

const darkTheme = createTheme({ palette: { mode: 'dark' } });
const lightTheme = createTheme({ palette: { mode: 'light' } });

const Shadow = () => {
  return (
    <PageContainer title="Shadow" description="this is Shadow">

      {/* <DashboardCard title="Shadow"> */}
      <Grid container spacing={3}>
        <Grid item xs={12} lg={8}>
          <SalesOverview />
        </Grid>
        <Grid item xs={12} lg={4}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <YearlyBreakup />
            </Grid>
            <Grid item xs={12}>
              <MonthlyEarnings />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} lg={4}>
          <RecentTransactions />
        </Grid>
      </Grid>
      {/* </DashboardCard> */}
    </PageContainer>
  );
};

export default Shadow;
