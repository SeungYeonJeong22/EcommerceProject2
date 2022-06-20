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
                <tr>
                    <th scope="row">4</th>
                    <td>{this.state.orderMonth[3]}</td>
                    <td>{this.state.purchase[3]}  </td>
                    <td>{this.state.sales[3]}     </td>
                </tr>
                <tr>
                    <th scope="row">5</th>
                    <td>{this.state.orderMonth[4]}</td>
                    <td>{this.state.purchase[4]}  </td>
                    <td>{this.state.sales[4]}     </td>
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
            const user_ret = []
            
            for (var i=uni_fp.length-1; i>=-1; i--){
                for (var j in uni_qDiff_copy){
                    t_user_retention.push([parseInt(i), parseInt(j), Math.round(ret[cnt] * 100)])
                    user_ret.push(Math.round(ret[cnt] * 100))
                    cnt += 1;
                }
                uni_qDiff_copy.pop();
            }
            
            const userRetention = t_user_retention.map(function (item){
                return [item[1], item[0], item[2] || '-'];
            });

            this.setState({firstPurchaseQ : uni_fp, qDiff:uni_qDiff, retention:user_ret})
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
                    <th>Retention</th>
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

export class SubCategory_Sales_Data extends Component{
    constructor(props){
        super(props)
        this.state = {
            orderMonth : [],
            purchase : [],
            sales : [],
        }
    }

    componentDidMount()
    {
          fetch( 'https://49sukr7ld9.execute-api.ap-northeast-2.amazonaws.com/default12/API_Gateway_lambda', {
            method: "POST",
            headers: {
            "Content-Type" : "application/json",
            },
            body: "SubCategory_Sales_sql",
          })
          .then( (response)=> response.json() )
          .then( (rdata)=>{
            //   console.log("rdata : ", rdata)
              let order = rdata.map(data => data['품목'])
              let purc = rdata.map(data => data['품목 구매건수'])
              let sal = rdata.map(data => data['품목 매출'])
      
              this.setState({orderMonth : order, purchase:purc, sales:sal})
      
              this.setState({option : this.options11})
          })
        }

    render(){
        return (
            <Card body>
            <Table>
                <thead>
                <tr>
                    <th>#</th>
                    <th>품목</th>
                    <th>품목 매출</th>
                    <th>품목 구매 건수</th>
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
                <tr>
                    <th scope="row">4</th>
                    <td>{this.state.orderMonth[3]}</td>
                    <td>{this.state.purchase[3]}  </td>
                    <td>{this.state.sales[3]}     </td>
                </tr>
                <tr>
                    <th scope="row">5</th>
                    <td>{this.state.orderMonth[4]}</td>
                    <td>{this.state.purchase[4]}  </td>
                    <td>{this.state.sales[4]}     </td>
                </tr>
                </tbody>
            </Table>
            </Card>
        );
    }
}

export class Category_cumPurchase_Data extends Component{
    constructor(props){
        super(props)
        this.state = {
            category : [],
            orderCount : [],
        }
    }

    componentDidMount()
    {
          fetch( 'https://49sukr7ld9.execute-api.ap-northeast-2.amazonaws.com/default12/API_Gateway_lambda', {
            method: "POST",
            headers: {
            "Content-Type" : "application/json",
            },
            body: "cumPurchase_sql",
          })
          .then( (response)=> response.json() )
          .then( (rdata)=>{
              let category = rdata.map(data => data['category'])
              let orderCount = rdata.map(data => data['orderCount'])
      
              this.setState({category:category, orderCount:orderCount})
          })
        }

    render(){
        return (
            <Card body>
            <Table>
                <thead>
                <tr>
                    <th>#</th>
                    <th>Category</th>
                    <th>Cumulative Purchase Count</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <th scope="row">1</th>
                    <td>{this.state.category[0]}</td>
                    <td>{this.state.orderCount[0]}  </td>
                </tr>
                <tr>
                    <th scope="row">2</th>
                    <td>{this.state.category[1]}</td>
                    <td>{this.state.orderCount[1]}  </td>
                </tr>
                <tr>
                    <th scope="row">3</th>
                    <td>{this.state.category[2]}</td>
                    <td>{this.state.orderCount[2]}  </td>
                </tr>
                </tbody>
            </Table>
            </Card>
        );
    }
}

export class Segment_orderCount_Data extends Component{
    constructor(props){
        super(props)
        this.state = {
            segment : [],
            category    : [],
            subCategory : [],
            orderCount  : [],
        }
    }

    componentDidMount()
    {
          fetch( 'https://49sukr7ld9.execute-api.ap-northeast-2.amazonaws.com/default12/API_Gateway_lambda', {
            method: "POST",
            headers: {
            "Content-Type" : "application/json",
            },
            body: "Segment_orderCount_sql",
          })
          .then( (response)=> response.json() )
          .then( (rdata)=>{
              let segment = rdata.map(data => data['segment'])
              let category = rdata.map(data => data['Category'])
              let subCategory = rdata.map(data => data['Sub-Category'])
              let orderCount = rdata.map(data => data['orderCount'])
  
              var set = new Set(segment)
              segment = [...set];
  
              
              var change_categoryIdx = [0]
              for(var i=0; i<category.length-1; i++){
                if(category[i] !== category[i+1]){
                  change_categoryIdx.push(i)
                }
              }
  
              var set = new Set(category)
              category = [...set];
  
              var set = new Set(subCategory)
              subCategory = [...set];
  
              this.setState({segment:segment, category:category, subCategory:subCategory, orderCount:orderCount})
          })
        }
    render(){
        return (
            <Card body>
            <Table>
                <thead>
                <tr>
                    <th>#</th>
                    <th>Segment</th>
                    <th>Category</th>
                    <th>Sub-Category</th>
                    <th>OrderCount</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <th scope="row">1</th>
                    <td>{this.state.segment    [0]} </td>
                    <td>{this.state.category   [0]} </td>
                    <td>{this.state.subCategory[0]} </td>
                    <td>{this.state.orderCount [0]} </td>                   
                </tr>
                <tr>
                    <th scope="row">2</th>
                    <td>{this.state.segment    [1]} </td>
                    <td>{this.state.category   [1]} </td>
                    <td>{this.state.subCategory[1]} </td>
                    <td>{this.state.orderCount [1]} </td>    
                </tr>
                <tr>
                    <th scope="row">3</th>
                    <td>{this.state.segment    [2]} </td>
                    <td>{this.state.category   [2]} </td>
                    <td>{this.state.subCategory[2]} </td>
                    <td>{this.state.orderCount [2]} </td>    
                </tr>
                <tr>
                    <th scope="row">4</th>
                    <td>{this.state.segment    [3]} </td>
                    <td>{this.state.category   [3]} </td>
                    <td>{this.state.subCategory[3]} </td>
                    <td>{this.state.orderCount [3]} </td>    
                </tr>
                <tr>
                    <th scope="row">5</th>
                    <td>{this.state.segment    [4]} </td>
                    <td>{this.state.category   [4]} </td>
                    <td>{this.state.subCategory[4]} </td>
                    <td>{this.state.orderCount [4]} </td>    
                </tr>
                </tbody>
            </Table>
            </Card>
        );
    }
}

export class SankeyChart_Data extends Component{
    constructor(props){
        super(props)
        this.state = {
            market     :[],
            cntCust_ID  :[],
            segment     :[],
            sumQuantity :[],
            category    :[],
        }
      }

      componentDidMount()
      {
        fetch( 'https://49sukr7ld9.execute-api.ap-northeast-2.amazonaws.com/default12/API_Gateway_lambda', {
          method: "POST",
          headers: {
          "Content-Type" : "application/json",
          },
          body: "SankeyChartData_sql",
        })
        .then( (response)=> response.json() )
        .then( (rdata)=>{
            let market     = rdata.map(data =>  data['Market'])
            let cntCust_ID  = rdata.map(data => data['cntCust_ID'])
            let segment     = rdata.map(data => data['Segment'])
            let sumQuantity = rdata.map(data => data['sumQuantity'])
            let category    = rdata.map(data => data['sub-category'])
    
            this.setState({market:market, cntCust_ID:cntCust_ID, segment:segment, sumQuantity:sumQuantity, category:category})
        })
      }
      market
      cntCust_ID
      segment
      sumQuantity
      category    
    render(){
        return (
            <Card body>
            <Table>
                <thead>
                <tr>
                    <th>#</th>
                    <th>Market           </th>
                    <th>Customer ID Count</th>
                    <th>Segment          </th>
                    <th>Quantity Sum     </th>
                    <th>Category         </th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <th scope="row">1</th>
                    <td>{this.state.market[0]} </td>
                    <td>{this.state.cntCust_ID[0]} </td>
                    <td>{this.state.segment[0]} </td>
                    <td>{this.state.sumQuantity[0]} </td>                   
                    <td>{this.state.category   [0]} </td>   
                </tr>
                <tr>
                    <th scope="row">2</th>
                    <td>{this.state.market[1]} </td>
                    <td>{this.state.cntCust_ID[1]} </td>
                    <td>{this.state.segment[1]} </td>
                    <td>{this.state.sumQuantity[1]} </td>    
                    <td>{this.state.category   [1]} </td>   
                </tr>
                <tr>
                    <th scope="row">3</th>
                    <td>{this.state.market[2]} </td>
                    <td>{this.state.cntCust_ID[2]} </td>
                    <td>{this.state.segment[2]} </td>
                    <td>{this.state.sumQuantity[2]} </td>   
                    <td>{this.state.category   [2]} </td>    
                </tr>
                <tr>
                    <th scope="row">4</th>
                    <td>{this.state.market[3]} </td>
                    <td>{this.state.cntCust_ID[3]} </td>
                    <td>{this.state.segment[3]} </td>
                    <td>{this.state.sumQuantity[3]} </td>    
                    <td>{this.state.category   [3]} </td>   
                </tr>
                <tr>
                    <th scope="row">5</th>
                    <td>{this.state.market[4]} </td>
                    <td>{this.state.cntCust_ID[4]} </td>
                    <td>{this.state.segment[4]} </td>
                    <td>{this.state.sumQuantity[4]} </td>   
                    <td>{this.state.category   [4]} </td>    
                </tr>
                </tbody>
            </Table>
            </Card>
        );
    }
}