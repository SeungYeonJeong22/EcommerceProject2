import Page from 'components/Page';
import React from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';
import {
  Monthly_PS_Data,
  Cohort_Data,
  SubCategory_Sales_Data,
  Category_cumPurchase_Data,
  Segment_orderCount_Data,
  SankeyChart_Data,
} from 'demos/DBtable'
import {
  Category_cumPurchase,
  Segment_orderCount,
  SubCategory_Sales_Chart,
  SankeyChart,
} from '../demos/echartjs2';
import {
  Monthly_PS_Chart,
  CohortChart,
} from '../demos/echartjs';


const tableTypes = [''];

const TablePage = () => {
  return (
    <Page
      title="Tables"
      breadcrumbs={[{ name: 'tables', active: true }]}
      className="TablePage"
    >
      {tableTypes.map((tableType, index) => (
        <Row key={index}>
          <Col>
            <Card className="mb-3">
              <CardHeader>Monthly Purchase & Sales Data </CardHeader>
              <CardBody>
                <Row>
                  <Col>
                    <Monthly_PS_Data/>
                  </Col>
                  
                  <Col>
                    <Monthly_PS_Chart/>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      ))}

      <Row>
        <Col>
          <Card className="mb-3">
            <CardHeader>Cohort Data</CardHeader>
            <CardBody>
              <Row>
                <Col>
                  <Cohort_Data/>
                </Col>

                <Col>
                  <CohortChart/>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
      
      <Row>
        <Col>
          <Card className="mb-3">
            <CardHeader>SubCategory Sales Data</CardHeader>
            <CardBody>
              <Row>
                <Col>
                  <SubCategory_Sales_Data/>
                </Col>

                <Col>
                  <SubCategory_Sales_Chart/>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col>
          <Card className="mb-3">
            <CardHeader>Category Cumulative Purchase Data</CardHeader>
            <CardBody>
              <Row>
                <Col>
                  <Category_cumPurchase_Data/>
                </Col>

                <Col>
                  <Category_cumPurchase/>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col>
          <Card className="mb-3">
            <CardHeader>Segment OrderCount Data</CardHeader>
            <CardBody>
              <Row>
                <Col>
                  <Segment_orderCount_Data/>
                </Col>

                <Col>
                  <Segment_orderCount/>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col>
          <Card className="mb-3">
            <CardHeader>SankeyChart_Data</CardHeader>
            <CardBody>
              <Row>
                <Col>
                  <SankeyChart_Data/>
                </Col>

                <Col>
                  <SankeyChart/>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>      
    </Page>
  );
};

export default TablePage;
