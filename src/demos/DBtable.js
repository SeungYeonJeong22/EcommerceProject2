import Page from 'components/Page';
import React, {Component} from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';

export class Monthly_PS_Data extends Component{
    constructor(props){
        super(props)
        this.state = {
            orderMonth : [],
            purchase : [],
            sales : [],
        }
    }

    tableTypes = ['', 'striped'];

    componentDidMount()
    {
          fetch( 'https://49sukr7ld9.execute-api.ap-northeast-2.amazonaws.com/default12/API_Gateway_lambda', {
            method: "POST",
            headers: {
            "Content-Type" : "application/json",
            },
            body: "Monthly_PS_sql",
          })
          .then( (response)=> response.json() )
          .then( (rdata)=>{
            //   console.log("rdata : ", rdata)
              let orderMonth = rdata.map(data => data['Order Month'])
              let purchase = rdata.map(data => data['Purchases'])
              let sales = rdata.map(data => data['Sales'])
      
              this.setState({orderMonth : orderMonth, purchase:purchase, sales:sales})
          })
        }

    render(){
        return (
            <Card body>
            <Table>
                <thead>
                <tr>
                    <th>#</th>
                    <th>Order Month</th>
                    <th>Purchases</th>
                    <th>Sales</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <th scope="row">1</th>
                    <td>{this.state.orderMonth[0]}</td>
                    <td>{this.state.purchase[0]}  </td>
                    <td>{this.state.sales[0]}     </td>
                </tr>
                <tr>
                    <th scope="row">2</th>
                    <td>{this.state.orderMonth[1]}</td>
                    <td>{this.state.purchase[1]}  </td>
                    <td>{this.state.sales[1]}     </td>
                </tr>
                <tr>
                    <th scope="row">3</th>
                    <td>{this.state.orderMonth[2]}</td>
                    <td>{this.state.purchase[2]}  </td>
                    <td>{this.state.sales[2]}     </td>
                </tr>
                </tbody>
            </Table>
            </Card>
        );
    }
}

export class Cohort_Data extends Component{
    constructor(props){
        super(props)
        this.state = {
            firstPurchaseQ  : [],
            qDiff           : [],
            retention       : [],
        }
    }

    componentDidMount(){
        fetch( 'https://49sukr7ld9.execute-api.ap-northeast-2.amazonaws.com/default12/API_Gateway_lambda', {
        method: "POST",
        headers: {
        "Content-Type" : "application/json",
        },
        body: "Cohort_sql",
        })
        .then( (response)=> response.json() )
        .then( (rdata)=>{
            let fp = rdata.map(data => data['First Purchase Q'])

            let qd = rdata.map(data => data['Q Diff'])

            let ret = rdata.map(data => data['retention'])

            var set = new Set(fp)
            const uni_fp = [...set];

            var set = new Set(qd)
            const uni_qDiff = [...set];

            let t_user_retention = []
            let cnt = 0
            
            const uni_qDiff_copy =  uni_qDiff.slice();
            
            for (var i=uni_fp.length-1; i>=-1; i--){
                for (var j in uni_qDiff_copy){
                t_user_retention.push([parseInt(i), parseInt(j), ret[cnt]])
                cnt += 1;
                }
                uni_qDiff_copy.pop();
            }
            
            const userRetention = t_user_retention.map(function (item){
                return [item[1], item[0], item[2] || '-'];
            });

            this.setState({firstPurchaseQ : uni_fp, qDiff:uni_qDiff, retention:userRetention})
        })
    }

    render(){
        return (
            <Card>
            <Table left>
                <thead>
                <tr>
                    <th>#</th>
                    <th>First Purchase Quarter</th>
                    <th>Quarter Diff</th>
                    <th>Sales</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <th scope="row">1</th>
                    <td>{this.state.firstPurchaseQ[0]}</td>
                    <td>{this.state.qDiff[0]}  </td>
                    <td>{this.state.retention[0]}     </td>
                </tr>
                <tr>
                    <th scope="row">2</th>
                    <td>{this.state.firstPurchaseQ[1]}</td>
                    <td>{this.state.qDiff[1]}  </td>
                    <td>{this.state.retention[1]}     </td>
                </tr>
                <tr>
                    <th scope="row">3</th>
                    <td>{this.state.firstPurchaseQ[2]}</td>
                    <td>{this.state.qDiff[2]}  </td>
                    <td>{this.state.retention[2]}     </td>
                </tr>
                <tr>
                    <th scope="row">4</th>
                    <td>{this.state.firstPurchaseQ[3]}</td>
                    <td>{this.state.qDiff[3]}  </td>
                    <td>{this.state.retention[3]}     </td>
                </tr>
                <tr>
                    <th scope="row">5</th>
                    <td>{this.state.firstPurchaseQ[4]}</td>
                    <td>{this.state.qDiff[4]}  </td>
                    <td>{this.state.retention[4]}     </td>
                </tr>
                </tbody>
            </Table>
            </Card>
    )}
};