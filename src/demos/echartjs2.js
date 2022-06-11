import React, { Component, useState } from 'react';
import ECharts, { EChartsReactProps } from 'echarts-for-react';
import { set } from 'react-ga';

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
    //   console.log("rdata : ", rdata)
      let order = rdata.map(data => new Date(data['Order Month']))
      let sal = rdata.map(data => data['Sales'])

      var m_totalSales = sal.reduce((x, y) => x + y);
      // console.log("m_totalSales : ", m_totalSales);

      var maxYear = new Date(Math.max.apply(null, order));
      maxYear = maxYear.getFullYear()
      // console.log("maxYear : ", maxYear)
     
      var thisYearSales = []
      order.map((v,i) => {
        if(v.getFullYear() === maxYear){
          thisYearSales.push(sal[i])
        }
      })

      var m_thisYearTotalSales = thisYearSales.reduce((x, y) => x + y);

      var m_totalSalesPercent = m_thisYearTotalSales / m_totalSales

      console.log("m_thisYearTotalSales : ", m_thisYearTotalSales)
      console.log("m_totalSales : ",m_totalSales)
      console.log("m_totalSalesPercent : ",m_totalSalesPercent)
      
      m_totalSales = Math.round(m_totalSales / 1000000).toString() + "M"
      m_thisYearTotalSales = Math.round(m_thisYearTotalSales / 1000000).toString() + "M"
      m_totalSalesPercent = Math.round(m_totalSalesPercent)



    return {
        totalSales : m_totalSales,
        thisYearTotalSales : m_thisYearTotalSales,
        totalSalesPercent : m_totalSalesPercent
    }
  })
};