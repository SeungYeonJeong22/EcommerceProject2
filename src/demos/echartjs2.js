import React, { Component, useState } from 'react';
import ECharts, { EChartsReactProps } from 'echarts-for-react';

// Profit
export function Profit(){
  return fetch( 'https://49sukr7ld9.execute-api.ap-northeast-2.amazonaws.com/default12/API_Gateway_lambda', {
    method: "POST",
    headers: {
    "Content-Type" : "application/json",
    },
    body: "Monthly_PS_sql",
  })
  .then( (response)=> response.json() )
  .then( (rdata)=>{
      let order = rdata.map(data => new Date(data['Order Month']))
      let sal = rdata.map(data => data['Sales'])

      var totalSales = sal.reduce((x, y) => x + y);

      var maxYear = new Date(Math.max.apply(null, order));
      maxYear = maxYear.getFullYear()
     
      var thisYearSales = []
      var prevYearSales = []
      order.map((v,i) => {
        if(v.getFullYear() === maxYear){
          thisYearSales.push(sal[i])
        }else if(v.getFullYear() === maxYear-1){
          prevYearSales.push(sal[i])
        }
      })

      var thisYearTotalSales = thisYearSales.reduce((x, y) => x + y);
      var prevYearTotalSales = prevYearSales.reduce((x, y) => x + y);

      var SalesPercent = thisYearTotalSales / prevYearTotalSales

      totalSales = Math.round(totalSales / 1000000).toString() + "M"
      thisYearTotalSales = Math.round(thisYearTotalSales / 1000000).toString() + "M"
      SalesPercent = Math.round(SalesPercent* 100) 



    return {
        totalSales : totalSales,
        thisYearTotalSales : thisYearTotalSales,
        prevYearSales : prevYearSales,
        SalesPercent : SalesPercent
    }
  })
};

// NewUser Percent 
export function NewUser(){
  return fetch( 'https://49sukr7ld9.execute-api.ap-northeast-2.amazonaws.com/default12/API_Gateway_lambda', {
    method: "POST",
    headers: {
    "Content-Type" : "application/json",
    },
    body: "First_Purchase_sql",
  })
  .then( (response)=> response.json() )
  .then( (rdata)=>{
    let year = rdata.map(data => data['FirstPurchaseDate'])

    var prevYearCnt = 0
    var thisYearCnt = 0
    year.forEach(val => {
      if(val == "2013"){
        prevYearCnt += 1
      }else{
        thisYearCnt += 1
      }
    })

    var percent = Math.round((thisYearCnt / prevYearCnt) * 100)
    return {
      percent : percent,
      thisYearCnt : thisYearCnt,
    }
  })
}

// purchaseCount
export function purchaseCount(){
  return fetch( 'https://49sukr7ld9.execute-api.ap-northeast-2.amazonaws.com/default12/API_Gateway_lambda', {
    method: "POST",
    headers: {
    "Content-Type" : "application/json",
    },
    body: "purchaseCntData_sql",
  })
  .then( (response)=> response.json() )
  .then( (rdata)=>{
      let pct2013 = rdata.map(data => data['purchaseCnt_2013'])
      let pct2014 = rdata.map(data => data['purchaseCnt_2014'])

      let pctPercent = Math.round(pct2014/pct2013*100)

    return {
      pct2014 : pct2014,
      pctPercent : pctPercent
    }
  })
};

//Monthly_purchase_sales_chart
export class Monthly_PS_Chart extends Component{
    constructor(props){
        super(props)
        this.state = {
            orderMonth : ['11','22','33','44','55'],
            purchase : [1,2,3,4,5],
            sales : [6,7,8,9,0],
            option : {}
        }
    }

    aa = []
    bb = []
    cc =[]

    colors = ['#5470C6', '#91CC75'];
    options11 = {
        color: this.colors,
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross'
            }
        },
        legend: {
            data: ['Purchase Count', 'Sales']
        },
        xAxis: [
            {
                type: 'category',
                axisTick: {alignWithLabel: true},
                data: this.aa,
                axisLabel : {
                  fontSize: '10'
                }
            }
        ],
        yAxis: [
            {
            type: 'value',
            name: 'Purchase Count',
            position: 'right',
            alignTicks: true,
            axisLine: {
                show: true,
                lineStyle: {
                color: this.colors[0]
                }
            },
            axisLabel: {
                formatter: '{value}',
                fontSize: '10'
            }
            },
            {
            type: 'value',
            name: 'Sales',
            position: 'left',
            alignTicks: true,
            axisLine: {
                show: true,
                lineStyle: {
                color: this.colors[1]
                }
            },
            axisLabel: {
                formatter: '{value}',
                fontSize: '9'
            }
        }
    ],
    series: [
        {
            name: 'Purchase Count',
            type: 'bar',
            data: this.bb
        },
        {
            name: 'Sales',
            type: 'line',
            yAxisIndex: 1,
            data: this.cc
        }
        ]
    };

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
              let order = rdata.map(data => data['Order Month'])
              let purc = rdata.map(data => data['Purchases'])
              let sal = rdata.map(data => data['Sales'])
      
              this.setState({orderMonth : order, purchase:purc, sales:sal})
      
              this.options11.xAxis[0].data = order
              this.options11.series[0].data = purc
              this.options11.series[1].data = sal
      
              this.setState({option : this.options11})
          })
        }

    render(){
        return (
            <ECharts
                    option={this.state.option}
              opts={{ renderer: 'svg', width: 'auto', height: 'auto' }}
            />
          );
    }
}

// subcategory_sales_purchase
export class SubCategory_Sales_Chart extends Component{
  constructor(props){
      super(props)
      this.state = {
          orderMonth : ['11','22','33','44','55'],
          purchase : [1,2,3,4,5],
          sales : [6,7,8,9,0],
          option : {}
      }
  }

  aa = []
  bb = []
  cc =[]

  colors = ['#5470C6','#91CC75'];
  options11 = {
      color: this.colors,
      tooltip: {
          trigger: 'axis',
          axisPointer: {
              type: 'cross'
          }
      },
      legend: {
          data: ['Sales', 'Purchase Count']
      },
      xAxis: [
          {
              type: 'category',
              axisTick: {alignWithLabel: true},
              data: this.aa,
              axisLabel : {
                fontSize: '8'
              }
          }
      ],
      yAxis: [
          {
          type: 'value',
          name: 'Purchase Count',
          position: 'right',
          alignTicks: true,
          axisLine: {
              show: true,
              lineStyle: {
              color: this.colors[1]
              }
          },
          axisLabel: {
              formatter: '{value}',
              fontSize: '10'
          }
          },
          {
          type: 'value',
          name: 'Sales',
          position: 'left',
          alignTicks: true,
          axisLine: {
              show: true,
              lineStyle: {
              color: this.colors[0]
              }
          },
          axisLabel: {
              formatter: '{value}',
              fontSize: '9'
          }
      }
  ],
  series: [
    {
      name: 'Sales',
      type: 'bar',
      yAxisIndex: 1,
      data: this.cc
  },
      {
          name: 'Purchase Count',
          type: 'bar',
          data: this.bb
      },
      ]
  };

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
    
            this.options11.xAxis[0].data = order
            this.options11.series[1].data = purc
            this.options11.series[0].data = sal
    
            this.setState({option : this.options11})
        })
      }

  render(){
      return (
          <ECharts
                  option={this.state.option}
            opts={{ renderer: 'svg', width: 'auto', height: 'auto' }}
          />
        );
  }
}

export class Vip_subCategory_Chart extends Component{
  constructor(props){
      super(props)
      this.state = {
          orderMonth : ['11','22','33','44','55'],
          purchase : [1,2,3,4,5],
          sales : [6,7,8,9,0],
          option : {}
      }
  }

  aa = []
  bb = []
  cc =[]

  colors = ['#5470C6', '#91CC75'];
  options11 = {
    color: this.colors,
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'cross'
        }
    },
    legend: {
        data: ['Sales', 'Purchase Count']
    },
    xAxis: [
        {
            type: 'category',
            axisTick: {alignWithLabel: true},
            data: this.aa,
            axisLabel : {
              fontSize: '8'
            }
        }
    ],
    yAxis: [
        {
        type: 'value',
        name: 'Purchase Count',
        position: 'right',
        alignTicks: true,
        axisLine: {
            show: true,
            lineStyle: {
            color: this.colors[1]
            }
        },
        axisLabel: {
            formatter: '{value}',
            fontSize: '10'
        }
        },
        {
        type: 'value',
        name: 'Sales',
        position: 'left',
        alignTicks: true,
        axisLine: {
            show: true,
            lineStyle: {
            color: this.colors[0]
            }
        },
        axisLabel: {
            formatter: '{value}',
            fontSize: '9'
        }
    }
],
series: [
  {
    name: 'Sales',
    type: 'bar',
    yAxisIndex: 1,
    data: this.cc
},
    {
        name: 'Purchase Count',
        type: 'bar',
        data: this.bb
    },
    ]
  };

  componentDidMount()
  {
        fetch( 'https://49sukr7ld9.execute-api.ap-northeast-2.amazonaws.com/default12/API_Gateway_lambda', {
          method: "POST",
          headers: {
          "Content-Type" : "application/json",
          },
          body: "vip_subCategory_sql",
        })
        .then( (response)=> response.json() )
        .then( (rdata)=>{
          //   console.log("rdata : ", rdata)
            let order = rdata.map(data => data['Sub-Category'])
            let purc = rdata.map(data => data['Order_cnt'])
            let sal = rdata.map(data => data['Total_Sales'])

            this.setState({orderMonth : order, purchase:purc, sales:sal})
    
            this.options11.xAxis[0].data = order
            this.options11.series[1].data = purc
            this.options11.series[0].data = sal
    
            this.setState({option : this.options11})
        })
      }

  render(){
      return (
          <ECharts
                  option={this.state.option}
            opts={{ renderer: 'svg', width: 'auto', height: 'auto' }}
          />
        );
  }
}

// Cohort
export class CohortChart extends Component{
    constructor(props){
        super(props)
        this.state = {
            firstPurchaseQ  : [],
            qDiff           : [],
            retention       : [],
            option : {}
        }
    }

    aa = [1,2,3]
    bb = [1,2,3]
    cc = [1,2,3]

    options11 = {
        height: '100%',
        tooltip: {
          position: 'top'
        },
        grid: {
          height: 'auto',
          top: 'auto',
        //   left : '6.8%'
        },
        xAxis: {
          type: 'category',
          data: this.aa,
          axisTick: {alignWithLabel: true},
          splitArea: {
            show: true
          }
        },
        yAxis: {
          type: 'category',
          data: this.bb,
          axisLabel: {
            fontSize: '8',
          },
          axisTick: {alignWithLabel: true},
          splitArea: {
            show: true
          }
        },
        visualMap: {
          min: 0,
          max: 1,
          fontSize: "8",
          calculable: true,
          orient: 'horizontal',
          left: 'center',
        },
        series: [
          {
            name: 'user retention',
            type: 'heatmap',
            data: this.cc,
            label: {
              show: true,
              fontSize: "8"
            },
            emphasis: {
              itemStyle: {
                shadowBlur: 1,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      };

    componentDidMount()
    {
          fetch( 'https://49sukr7ld9.execute-api.ap-northeast-2.amazonaws.com/default12/API_Gateway_lambda', {
            method: "POST",
            headers: {
            "Content-Type" : "application/json",
            },
            body: "Cohort_sql",
          })
          .then( (response)=> response.json() )
          .then( (rdata)=>{
            // console.log("cohort rdata : ", rdata)
            let fp = rdata.map(data => data['First Purchase Q'])
            // console.log("cohort fp : ", fp)

            let qd = rdata.map(data => data['Q Diff'])
            // console.log("cohort qd : ", qd)

            let ret = rdata.map(data => data['retention'])
            // console.log("cohort ret : ", ret)

            var set = new Set(fp)
            const uni_fp = [...set];

            var set = new Set(qd)
            const uni_qDiff = [...set];

            let t_user_retention = []
            let cnt = 0
          
            const uni_qDiff_copy =  uni_qDiff.slice();
            // console.log("uni_qDiff_copy : ",uni_qDiff_copy)
            // console.log("uni_fp : ",uni_fp)
          
            for (var i=uni_fp.length-1; i>=-1; i--){
              for (var j in uni_qDiff_copy){
                t_user_retention.push([parseInt(i), parseInt(j), ret[cnt]])
                cnt += 1;
              }
              uni_qDiff_copy.pop();
            }
          
            const userRetention = t_user_retention.map(function (item){
            //   console.log("item : ",item)
              return [item[1], item[0], item[2] || '-'];
            });
    
            this.setState({firstPurchaseQ : uni_fp, qDiff:uni_qDiff, retention:userRetention})


            this.options11.xAxis.data = uni_qDiff
            // console.log("uni_fp : ",uni_fp)
            this.options11.yAxis.data = uni_fp.reverse()
            this.options11.series[0].data = userRetention
      
              this.setState({option : this.options11})
          })
        }

    render(){
        return (
            <ECharts
                    option={this.state.option}
              opts={{ renderer: 'svg', width: 'auto', height: 'auto' }}
            />
          );
    }
};

// Category cumPurchase
export class Category_cumPurchase extends Component{
  constructor(props){
    super(props)
    this.state = {
        category    : [],
        orderCount  : [],
        option : {}
    }
  }

  colors = ['#5470C6']

  options11 = {
    title: {
      // text: 'Categorical Cumulative Purchase Count',
    //   subtext: 'Fake Data',
      left: 'center'
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'vertical',
      left: 'left'
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: '75%',
        data: [],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  };

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
    
            for(var i = 0; i<category.length; i++){
              this.options11.series[0].data.push({value:orderCount[i], name:category[i]})
            }
            
            this.setState({option : this.options11})
        })
      }

  render(){
      return (
          <ECharts
                  option={this.state.option}
            opts={{ renderer: 'svg', width: 'auto', height: 'auto' }}
          />
        );
  }

};

// Segment_Category_subCategory OrderCount by SunBurst Charts
export class Segment_orderCount extends Component{
  constructor(props){
    super(props)
    this.state = {
        segment : [],
        category    : [],
        subCategory : [],
        orderCount  : [],
        option : {}
    }
  }

  colors = [
    '#da0d68',
    '#975e6d',
    '#e0719c',
    '#f99e1c',
    '#ef5a78',
    '#f7f1bd',
    '#da1d23',
    '#dd4c51',
    '#3e0317',
    '#e62969',
    '#6569b0',
    '#ef2d36',
    '#c94a44',
    '#b53b54',
    '#a5446f',
    '#dd4c51',
    '#f2684b',
    '#e73451',
    '#e65656',
    '#f89a1c',
    '#aeb92c',
    '#4eb849',
    '#f68a5c',
    '#baa635',
    '#f7a128',
    '#f26355',
    '#e2631e',
    '#fde404',
    '#7eb138',
    '#ebb40f',
    '#e1c315',
    '#9ea718',
    '#94a76f',
    '#d0b24f',
    '#8eb646',
    '#faef07',
    '#c1ba07',
    '#b09733',
    '#8f1c53',
    '#b34039',
    '#ba9232',
    '#8b6439',
    '#187a2f',
    '#a2b029',
    '#718933',
    '#3aa255',
    '#a2bb2b',
    '#62aa3c',
    '#03a653',
    '#038549',
    '#28b44b',
  ];

  data = [
    {
      name: 'Flora',
      itemStyle: {
        color: '#da0d68'
      }
    },
    {
      name: 'Fruity',
      itemStyle: {
        color: '#da1d23'
      }
    },
    {
      name: 'Sour/\nFermented',
      itemStyle: {
        color: '#ebb40f'
      }
    },
  ];

  options11 = {
    // title: {
    //   text: 'Segment Order Count',
    // //   subtext: 'Fake Data',
    //   left: 'center'
    // },
    series: {
      type: 'sunburst',
      data: this.data,
      radius: [0, '95%'],
      sort: undefined,
      emphasis: {
        focus: 'ancestor'
      },
      levels: [
        {},
        {
          r0: '5%',
          r: '35%',
          itemStyle: {
            borderWidth: 2
          },
          label: {
            rotate: 'tangential',
            fontSize: 9
          }
        },
        {
          r0: '35%',
          r: '70%',
          label: {
            align: 'right',
            fontSize: 8
          }
        },
        {
          r0: '70%',
          r: '75%',
          label: {
            position: 'outside',
            padding: 3,
            silent: false,
            fontSize: 7
          },
          itemStyle: {
            borderWidth: 3
          }
        }
      ]
    }
  };
  
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

            // console.log("subCategory : ", subCategory)

            this.setState({segment:segment, category:category, subCategory:subCategory, orderCount:orderCount})

            var data = []
            var cnt = 0

            for(var i = 0; i<segment.length; i++){
              var idxCnt = 0
              data.push(this.createChildren(segment[i]))

              for(var j=0; j<category.length; j++){
                if("children" in data[i]){
                  data[i]['children'].push(this.createChildren(category[j]))
                  idxCnt+=1
                }else{
                  data[i]['children'] = [this.createChildren(category[j])]
                  idxCnt+=1
                }
              
                for (var k=change_categoryIdx[idxCnt-1]+1; k<=change_categoryIdx[idxCnt]; k++){
                  if("children" in data[i]['children'][j]){
                    data[i]['children'][j]['children'].push(this.createChildren(subCategory[k], orderCount[cnt]))
                  }else{
                    data[i]['children'][j]['children'] = [this.createChildren(subCategory[k], orderCount[cnt])]
                  }
                  cnt+=1
                }
              }
            }

            this.options11.series.data = data

            this.setState({option : this.options11})
        })
      }
      
  render(){
      return (
          <ECharts
                  option={this.state.option}
              opts={{ renderer: 'svg', width: 'auto', height: 'auto' }}
          />
        );
  }

  createChildren = (name, value=0) => {
    var randColor = this.colors[Math.floor(Math.random() * this.colors.length)];
    if(name == "Office Supplies"){
      randColor = "#91CC75"
    }else if(name == "Technology"){
      randColor = "#FAC858"
    }else if(name == "Furniture"){
      randColor = "#5470C6"
    }

    if(value !== 0){
      var child = {
        name: name,
        value : value,
        itemStyle: {color : randColor}
      }
    }else{
      var child = {
        name: name,
        itemStyle: {color: randColor}
      }
    }

    return child
  }
};

export class SankeyChart extends Component{
  constructor(props){
    super(props)
    this.state = {
        market     :[],
        cntCust_ID  :[],
        segment     :[],
        sumQuantity :[],
        category    :[],
        option : {}
    }
  }

  colors = [
    '#da0d68',
    '#975e6d',
    '#e0719c',
    '#f99e1c',
    '#ef5a78',
    '#f7f1bd',
    '#da1d23',
    '#dd4c51',
    '#3e0317',
    '#e62969',
    '#6569b0',
    '#ef2d36',
    '#c94a44',
    '#b53b54',
    '#a5446f',
    '#dd4c51',
    '#f2684b',
    '#e73451',
    '#e65656',
    '#f89a1c',
    '#aeb92c',
    '#4eb849',
    '#f68a5c',
    '#baa635',
    '#f7a128',
    '#f26355',
    '#e2631e',
    '#fde404',
    '#7eb138',
    '#ebb40f',
    '#e1c315',
    '#9ea718',
    '#94a76f',
    '#d0b24f',
    '#8eb646',
    '#faef07',
    '#c1ba07',
    '#b09733',
    '#8f1c53',
    '#b34039',
    '#ba9232',
    '#8b6439',
    '#187a2f',
    '#a2b029',
    '#718933',
    '#3aa255',
    '#a2bb2b',
    '#62aa3c',
    '#03a653',
    '#038549',
    '#28b44b',
  ];

  data = []
  options11 = {
    title: {
      left: 'center'
    },
    backgroundColor: '#FFFFFF',
    series: [
      {
        type: 'sankey',
        left: 50.0,
        top: 20.0,
        right: 150.0,
        bottom: 25.0,
        data: 0,
        links: 0
      }
    ]          
  };

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

        

        let createD = this.createData(market, segment, category);
        let createL = this.createLink(market, segment, category, cntCust_ID, sumQuantity)

        this.options11.series[0].data=createD
        this.options11.series[0].links=createL

        this.setState({market:market, cntCust_ID:cntCust_ID, segment:segment, sumQuantity:sumQuantity, category:category})
        
        this.setState({option : this.options11})
    })
  }

  createData = (market=null, segment=null, category=null) => {
    var t = new Set(market)
    market = [...t];

    var t = new Set(segment)
    segment = [...t];

    var t = new Set(category)
    category = [...t];

    var data = []
    for(var i=0; i < market.length; i++){
      var randColor = this.colors[Math.floor(Math.random() * this.colors.length)];
      data.push({
        name: market[i],
        itemStyle:{
          color: randColor,
          borderColor: randColor
        }
      })
    }

    for(var i=0; i < segment.length; i++){
      var randColor = this.colors[Math.floor(Math.random() * this.colors.length)];      
      data.push({
        name: segment[i],
        itemStyle:{
          color: randColor,
          borderColor: randColor
        }
      })
    }

    for(var i=0; i < category.length; i++){
      var randColor = this.colors[Math.floor(Math.random() * this.colors.length)];
      data.push({
        name: category[i],
        itemStyle:{
          color: randColor,
          borderColor: randColor
        }
      })
    }

    return data
  }

  createLink = (market=null, segment=null, category=null, cntCust_ID=0, sumQuantity=0) => {
    var links = []
    for(var i=0; i<cntCust_ID.length; i++){
      links.push({
        source: market[i],
        target: segment[i],
        value: cntCust_ID[i]
      }) 
    }

    for(var i=0; i<sumQuantity.length; i++){
      links.push({
        source: segment[i],
        target: category[i],
        value: sumQuantity[i]
      })
    }

    return links
  }

  render(){
      return (
        <ECharts
                option={this.state.option}
          opts={{ renderer: 'svg', width: 'auto', height: 'auto' }}
        />
    );
  }
};

export class SankeyChart2 extends Component{
  constructor(props){
    super(props)
    this.state = {
        custID :[],
        fpc    :[],
        spc    :[],
        option : {}
    }
  }

  colors = [
    '#da0d68',
    '#975e6d',
    '#e0719c',
    '#f99e1c',
    '#ef5a78',
    '#f7f1bd',
    '#da1d23',
    '#dd4c51',
    '#3e0317',
    '#e62969',
    '#6569b0',
    '#ef2d36',
    '#c94a44',
    '#b53b54',
    '#a5446f',
    '#dd4c51',
    '#f2684b',
    '#e73451',
    '#e65656',
    '#f89a1c',
    '#aeb92c',
    '#4eb849',
    '#f68a5c',
    '#baa635',
    '#f7a128',
    '#f26355',
    '#e2631e',
    '#fde404',
    '#7eb138',
    '#ebb40f',
    '#e1c315',
    '#9ea718',
    '#94a76f',
    '#d0b24f',
    '#8eb646',
    '#faef07',
    '#c1ba07',
    '#b09733',
    '#8f1c53',
    '#b34039',
    '#ba9232',
    '#8b6439',
    '#187a2f',
    '#a2b029',
    '#718933',
    '#3aa255',
    '#a2bb2b',
    '#62aa3c',
    '#03a653',
    '#038549',
    '#28b44b',
  ];

  data = []
  options11 = {
    title: {
      left: 'center'
    },
    backgroundColor: '#FFFFFF',
    series: [
      {
        type: 'sankey',
        left: 50.0,
        top: 20.0,
        right: 150.0,
        bottom: 25.0,
        data: 0,
        links: 0
      }
    ]          
  };

  componentDidMount()
  {
    fetch( 'https://49sukr7ld9.execute-api.ap-northeast-2.amazonaws.com/default12/API_Gateway_lambda', {
      method: "POST",
      headers: {
      "Content-Type" : "application/json",
      },
      body: "sankeyChart_purchase_trend",
    })
    .then( (response)=> response.json() )
    .then( (rdata)=>{
        let custID     = rdata.map(data =>  data['Customer ID'])
        let fpc        = rdata.map(data => data['First Purchase Category'])
        let spc        = rdata.map(data => data['Second Purchase Category'])
        

        let createD = this.createData(custID, fpc, spc);
        let createL = this.createLink(custID, fpc, spc)

        this.options11.series[0].data=createD
        this.options11.series[0].links=createL

        this.setState({custID:custID, fpc:fpc, spc:spc})
        
        this.setState({option : this.options11})
    })
  }

  createData = (custID=null, fpc=null, spc=null) => {
    var t = new Set(custID)
    custID = [...t];

    var t = new Set(fpc)
    fpc = [...t];

    var t = new Set(spc)
    spc = [...t];

    var data = []
    for(var i=0; i < custID.length; i++){
      var randColor = this.colors[Math.floor(Math.random() * this.colors.length)];
      // console.log("custID : ", custID[i])
      data.push({
        name: custID[i],
        itemStyle:{
          color: randColor,
          borderColor: randColor
        }
      })
    }

    for(var i=0; i < fpc.length; i++){
      // console.log("fpc : ", fpc[i])
      var randColor = this.colors[Math.floor(Math.random() * this.colors.length)];      
      data.push({
        name: fpc[i],
        itemStyle:{
          color: randColor,
          borderColor: randColor
        }
      })
    }

    for(var i=0; i < spc.length; i++){
      // console.log("spc : ", spc[i])
      var randColor = this.colors[Math.floor(Math.random() * this.colors.length)];
      data.push({
        name: spc[i],
        itemStyle:{
          color: randColor,
          borderColor: randColor
        }
      })
    }

    return data
  }

  createLink = (custID=null, fpc=null, spc=null) => {
    var links = []
    for(var i=0; i<fpc.length; i++){
      links.push({
        source: custID[i],
        target: fpc[i],
        value: 1
      }) 
    }

    for(var i=0; i<spc.length; i++){
      links.push({
        source: fpc[i],
        target: spc[i],
        value: 1
      })
    }

    return links
  }

  render(){
      return (
        <ECharts
                option={this.state.option}
          opts={{ renderer: 'svg', width: 'auto', height: 'auto' }}
        />
    );
  }
};