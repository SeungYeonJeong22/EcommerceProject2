import { AnnouncementCard, TodosCard } from 'components/Card';
import HorizontalAvatarList from 'components/HorizontalAvatarList';
import MapWithBubbles from 'components/MapWithBubbles';
import Page from 'components/Page';
import ProductMedia from 'components/ProductMedia';
import SupportTicket from 'components/SupportTicket';
import UserProgressTable from 'components/UserProgressTable';
import { IconWidget, NumberWidget } from 'components/Widget';
import { getStackLineChart, stackLineChartOptions} from 'demos/chartjs';
import {
  avatarsData,
  chartjs,
  productsData,
  supportTicketsData,
  todosData,
  userProgressTableData,
} from 'demos/dashboardPage';
import React, { Component, useState, useEffect, memo } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import {
  MdBubbleChart,
  MdInsertChart,
  MdPersonPin,
  MdPieChart,
  MdRateReview,
  MdShare,
  MdShowChart,
  MdThumbUp,
} from 'react-icons/md';
import InfiniteCalendar from 'react-infinite-calendar';
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardDeck,
  CardGroup,
  CardHeader,
  CardTitle,
  Col,
  ListGroup,
  ListGroupItem,
  Row,
} from 'reactstrap';
import { getColor } from 'utils/colors';
import {
  // Monthly_PS_Chart,
  // CohortChart,
  Profit,
  Category_cumPurchase,
  Segment_orderCount,
  NewUser,
  SankeyChart,
  purchaseCount,
  SubCategory_Sales_Chart,
} from '../demos/echartjs2';
import {
  // Profit,
  // NewUser,
  Monthly_PS_Chart,
  CohortChart,
  // Category_cumPurchase,
  // Segment_orderCount,
  // SankeyChart,
} from '../demos/echartjs'

const today = new Date();
const lastWeek = new Date(
  today.getFullYear(),
  today.getMonth(),
  today.getDate() - 7,
);


class DashboardPage extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      sales_loading : true,
      totalSales : 0,
      thisYearTotalSales : 0,
      totalSalesPercent : 0,

      user_loading : true,
      thisYearCnt : 0,
      percent : 0,

      pct2014 : 0,
      pctPercent : 0,
      pct_loading : true,
    }
  }

   componentDidMount() {
    // this is needed, because InfiniteCalendar forces window scroll
    window.scrollTo(0, 0);

    Profit().then((value) => {
      if(this.state.sales_loading){
        this.setState({totalSales : value.totalSales,
           thisYearTotalSales : value.thisYearTotalSales,
           prevYearSales : value.prevYearSales,
           SalesPercent : value.SalesPercent,
           sales_loading : false})
      }
      // console.log("this.state.sales_loading : ", this.state.sales_loading)
    })


    NewUser().then((value) => {
      if(this.state.user_loading){
        this.setState({
          percent : value.percent,
          thisYearCnt : value.thisYearCnt,
          user_loading : false
      })
    }
  })

  purchaseCount().then((value) => {
    if(this.state.pct_loading){
      this.setState({
        pct2014     : value.pct2014,
        pctPercent  : value.pctPercent,
        pct_loading : false
    })
  }
})
  
}

  render() {
    const primaryColor = getColor('primary');
    const secondaryColor = getColor('secondary');

    return (
      <Page
        className="DashboardPage"
        title="Dashboard"
        breadcrumbs={[{ name: 'Dashboard', active: true }]}
      >
        <Row>
          <Col lg={3} md={6} sm={6} xs={12}>
            <NumberWidget
              title="Total Sales"
              subtitle='Prev Year'
              number= {this.state.totalSales}
              color="secondary"
              progress={{
                value: this.state.SalesPercent,
                label: "This Year",
              }}
            />
          </Col>

          <Col lg={3} md={6} sm={6} xs={12}>
            <NumberWidget
              title="Purchase Count"
              subtitle="Prev Year"
              number={this.state.pct2014}
              color="secondary"
              progress={{
                value: this.state.pctPercent,
                label: 'This Year',
              }}
            />
          </Col>

          <Col lg={3} md={6} sm={6} xs={12}>
            <NumberWidget
              title="This Year New Users"
              subtitle="Prev Year"
              number= {this.state.thisYearCnt}
              color="secondary"
              progress={{
                value: this.state.percent,
                label: 'This Year',
              }}
            />
          </Col>

          <Col lg={3} md={6} sm={6} xs={12}>
            <NumberWidget
              title="Bounce Rate"
              subtitle="This month"
              number="38%"
              color="secondary"
              progress={{
                value: 60,
                label: 'Last month',
              }}
            />
          </Col>
        </Row>

        <Row>
          <Col lg="7" md="12" sm="12" xs="12">
            <Card>
              <CardHeader> Cohort Analyze </CardHeader>
              <CardBody>
                <CohortChart />
              </CardBody>
            </Card>
          </Col>

          <Col lg="5" md="12" sm="12" xs="12">
            <Card>
              <CardHeader>Purchase</CardHeader>
              <CardBody>
                  <Monthly_PS_Chart />
                  
              </CardBody>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col>
              <Card>
                <CardHeader>SubCategory Sales Chart</CardHeader>
                <CardBody>
                  <SubCategory_Sales_Chart/>
                </CardBody>
              </Card>
          </Col>
        </Row>
        <Row>
          <Col md="6" sm="12" xs="12">
            <Card>
              <CardHeader>Category_cumPurchase</CardHeader>
              <CardBody>
                <Category_cumPurchase/>
              </CardBody>
            </Card>
          </Col>
          

          <Col md="6" sm="12" xs="12">
            <Card>
              <CardHeader>Segment Order Category</CardHeader>
              <CardBody>
                <Segment_orderCount/>
              </CardBody>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col>
            <Card>
              <CardHeader>SankeyChart</CardHeader>
              <CardBody>
                <SankeyChart />
              </CardBody>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col>
            <Card inverse className="bg-gradient-primary">
              <CardHeader className="bg-gradient-primary">
                Map with bubbles
              </CardHeader> 
              <CardBody>
                <TodosCard />
              </CardBody>
            </Card>
          </Col>
        </Row>

      </Page>
    );
  }
}
export default DashboardPage;
