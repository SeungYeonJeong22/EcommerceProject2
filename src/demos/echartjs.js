import React, { useEffect, useState } from 'react';
import ECharts, { EChartsReactProps } from 'echarts-for-react';
import axios from 'axios';

// Profit
// export function Profit(){
//     return fetch( 'https://49sukr7ld9.execute-api.ap-northeast-2.amazonaws.com/default12/API_Gateway_lambda', {
//       method: "POST",
//       headers: {
//       "Content-Type" : "application/json",
//       },
//       body: "Monthly_PS_sql",
//     })
//     .then( (response)=> response.json() )
//     .then( (rdata)=>{
//         let order = rdata.map(data => new Date(data['Order Month']))
//         let sal = rdata.map(data => data['Sales'])
  
//         var totalSales = sal.reduce((x, y) => x + y);
  
//         var maxYear = new Date(Math.max.apply(null, order));
//         maxYear = maxYear.getFullYear()
       
//         var thisYearSales = []
//         var prevYearSales = []
//         order.map((v,i) => {
//           if(v.getFullYear() === maxYear){
//             thisYearSales.push(sal[i])
//           }else if(v.getFullYear() === maxYear-1){
//             prevYearSales.push(sal[i])
//           }
//         })
  
//         var thisYearTotalSales = thisYearSales.reduce((x, y) => x + y);
//         var prevYearTotalSales = prevYearSales.reduce((x, y) => x + y);
  
//         var SalesPercent = thisYearTotalSales / prevYearTotalSales
  
//         totalSales = Math.round(totalSales / 1000000).toString() + "M"
//         thisYearTotalSales = Math.round(thisYearTotalSales / 1000000).toString() + "M"
//         SalesPercent = Math.round(SalesPercent) * 100
  
  
  
//       return {
//           totalSales : totalSales,
//           thisYearTotalSales : thisYearTotalSales,
//           prevYearSales : prevYearSales,
//           SalesPercent : SalesPercent
//       }
//     })
// };

// NewUser Percent 
// export function NewUser(){
//     const [percent, setPercent] = useState(0)
//     const [thisYearCnt, setThisYearCnt] = useState(0)
    
//     useEffect(() => {
//         const fetchData = async () => {
//             try{
//                 const response = await axios.get(
//                     `https://9s33kmrpxl.execute-api.ap-northeast-2.amazonaws.com/Dashboard/sqlquery/?sql=First_Purchase_sql`
//                 );
//                 let year = response.map(data => data['FirstPurchaseDate'])
//                 var prevYearCnt = 0
//                 var thisYearCnt = 0
//                 year.forEach(val => {
//                   if(val == "2013"){
//                     prevYearCnt += 1
//                   }else{
//                     thisYearCnt += 1
//                   }
//                 })
            
//                 var percent = Math.round((thisYearCnt / prevYearCnt) * 100)
//                 setPercent(percent)
//                 setThisYearCnt(thisYearCnt)
//             }
            
//             catch(e){
//                 console.log("error : ", e)
//             }
//         }

//         fetchData();
//         }, []);

//     return {
//         percent : percent,
//         thisYearCnt : thisYearCnt,
//     }        
// }

//Monthly_purchase_sales_chart
export function Monthly_PS_Chart(){
    const [orderMonth, setOrderMonth] = useState([])
    const [purchase, setPurchase] = useState([])
    const [sales, setSales] = useState([])
    
    const colors = ['#5470C6', '#91CC75'];    
    const options = {   
        color: colors,
        tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'cross'
        }
        },
        grid: {
        right: '20%',
        left : '15%'
        },
        legend: {
            data: ['Purchase Count', 'Sales']
        },
        xAxis: [
        {
            type: 'category',
            axisTick: {
            alignWithLabel: true
            },
            data: orderMonth
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
                color: colors[0]
            }
            },
            axisLabel: {
            formatter: '{value}'
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
                color: colors[1]
            }
            },
            axisLabel: {
            formatter: '{value}'
            }
        }
        ],
        series: [
        {
            name: 'Purchase Count',
            type: 'bar',
            data: purchase
        },
        {
            name: 'Sales',
            type: 'line',
            yAxisIndex: 1,
            data: sales
        }
        ]
    }

    useEffect(() => {
      const fetchData = async () => {
        try{
            const response = await axios.get(
                `https://9s33kmrpxl.execute-api.ap-northeast-2.amazonaws.com/Dashboard/sqlquery/?sql=Monthly_PS_sql`
            );
            var ord = response.data.map(data => data['Order Month']);
            var pur = response.data.map(data => data['Purchases']);
            var sal = response.data.map(data => data['Sales']);

            setOrderMonth(ord)
            setPurchase(pur)
            setSales(sal)
        }
        
        catch(e){
            console.log("error : ", e)
        }
      }

    fetchData();
    }, []);

	return (
        <div>
            <ECharts
                option={options}
                opts={{ renderer: 'svg', width: 'auto', height: 'auto' }}
        />
        </div>
    );
};

// Cohort
export function CohortChart(){
    const [firstPurchaseQ, setFirstPurchaseQ] = useState([])
    const [qDiff, setQDiff] = useState([])
    const [retention, setRetention] = useState([])
    
    const options = {
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
          data: qDiff,
          axisTick: {alignWithLabel: true},
          splitArea: {
            show: true
          }
        },
        yAxis: {
          type: 'category',
          data: firstPurchaseQ,
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
          max: 100,
          fontSize: "8",
          calculable: true,
          orient: 'horizontal',
          left: 'center',
        },
        series: [
          {
            name: 'user retention',
            type: 'heatmap',
            data: retention,
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


    useEffect(() => {
      const fetchData = async () => {
        try{
            const response = await axios.get(
                `https://9s33kmrpxl.execute-api.ap-northeast-2.amazonaws.com/Dashboard/sqlquery/?sql=Cohort_sql`
            );
            var fpq = response.data.map(data => data['First Purchase Q']);
            var qdf = response.data.map(data => data['Q Diff']);
            var ret = response.data.map(data => data['retention']);

            var set = new Set(fpq)
            const uni_fp = [...set];

            var set = new Set(qdf)
            const uni_qDiff = [...set];

            let t_user_retention = []
            let cnt = 0
          
            const uni_qDiff_copy =  uni_qDiff.slice();
          
            for (var i=uni_fp.length-1; i>=-1; i--){
              for (var j in uni_qDiff_copy){
                t_user_retention.push([parseInt(i), parseInt(j), Math.round(ret[cnt] * 100)])
                cnt += 1;
              }
              uni_qDiff_copy.pop();
            }
          
            const userRetention = t_user_retention.map(function (item){
            //   console.log("item : ",item)
              return [item[1], item[0], item[2] || '-'];
            });            

            setFirstPurchaseQ(uni_fp.reverse());
            setQDiff(uni_qDiff)
            setRetention(userRetention)
        }
        
        catch(e){
            console.log("error : ", e)
        }
      }

    fetchData();
    }, []);

	return (
        <div>
            <ECharts
                option={options}
                opts={{ renderer: 'svg', width: 'auto', height: 'auto' }}
        />
        </div>
    );
};

// Category cumPurchase
export function Category_cumPurchase(){
    const [category, setCategory] = useState([])
    const [orderCount, setOrderCount] = useState([])

    const options = {
      title: {
        text: 'Categorical Cumulative Purchase Count',
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
  
    useEffect(() => {
        const fetchData = async () => {
          try{
              const response = await axios.get(
                  `https://9s33kmrpxl.execute-api.ap-northeast-2.amazonaws.com/Dashboard/sqlquery/?sql=cumPurchase_sql`
              );
              var cat = response.data.map(data => data['category']);
              var odc = response.data.map(data => data['orderCount']);

              setCategory(cat);
              setOrderCount(odc);

              for(var i = 0; i<category.length; i++){
                console.log("orderCount : ", orderCount)
                options.series[0].data.push({value:orderCount[i], name:category[i]})
              }
          }
          
          catch(e){
              console.log("error : ", e)
          }
        }
  
      fetchData();
      }, []);
  
      return (
          <div>
              <ECharts
                  option={options}
                  opts={{ renderer: 'svg', width: 'auto', height: 'auto' }}
          />
          </div>
      );
};

export function Segment_orderCount(){
    const [segment, setSegment] = useState([])
    const [category, setCategory] = useState([])
    const [subCategory, setSubCategory] = useState([])
    const [orderCount, setOrderCount] = useState([])

    const colors = [
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
  
    const options = {
        series: {
          type: 'sunburst',
          data: "",
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
  
    useEffect(() => {
        const fetchData = async () => {
          try{
              const response = await axios.get(
                  `https://9s33kmrpxl.execute-api.ap-northeast-2.amazonaws.com/Dashboard/sqlquery/?sql=Segment_orderCount_sql`
              );
              var seg = response.data.map(data => data['segment']);
              var cat = response.data.map(data => data['Category']);
              var s_cat = response.data.map(data => data['Sub-Category']);
              var odc = response.data.map(data => data['orderCount']);
  
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

              setSegment(seg);
              setCategory(cat);
              setSubCategory(s_cat);
              setOrderCount(odc)

              var data = []
              var cnt = 0
              var idxCnt = 0
  
              for(var i = 0; i<segment.length; i++){
                data.push(createChildren(segment[i]))
  
                for(var j=0; j<category.length; j++){
                  if("children" in data[i]){
                    data[i]['children'].push(createChildren(category[j]))
                  }else{
                    data[i]['children'] = [createChildren(category[j])]
                    idxCnt+=1
                  }
                
                  for (var k=change_categoryIdx[idxCnt-1]; k<change_categoryIdx[idxCnt]; k++){
                    if("children" in data[i]['children'][j]){
                      data[i]['children'][j]['children'].push(createChildren(subCategory[k], orderCount[cnt]))
                    }else{
                      data[i]['children'][j]['children'] = [createChildren(subCategory[k], orderCount[cnt])]
                    }
                    cnt+=1
                  }
                }
              }
            options.series.data = data
          }
          
          catch(e){
              console.log("error : ", e)
          }
        }

        const createChildren = (name, value=0) => {
            var randColor = colors[Math.floor(Math.random() * colors.length)];
            // console.log("randColor : ",randColor)
        
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
  
      fetchData();
      }, []);
  
      return (
          <div>
              <ECharts
                  option={options}
                  opts={{ renderer: 'svg', width: 'auto', height: 'auto' }}
          />
          </div>
      );   
};

//Sankey Chart
export function SankeyChart(){
    const [market, setMarket] = useState([])
    const [cntCust_ID, setCntCust_ID] = useState([])
    const [segment, setSegment] = useState([])
    const [sumQuantity, setSumQuantity] = useState([])
    const [category, setCategory] = useState([])

    const colors = [
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
  
    const options = {
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
  
    useEffect(() => {
        const fetchData = async () => {
          try{
              const response = await axios.get(
                  `https://9s33kmrpxl.execute-api.ap-northeast-2.amazonaws.com/Dashboard/sqlquery/?sql=SankeyChartData_sql`
              );
              var mark    = response.data.map(data => data['Market']);
              var cntCID    = response.data.map(data => data['cntCust_ID']);
              var seg  = response.data.map(data => data['Segment']);
              var sQt    = response.data.map(data => data['sumQuantity']);
              var sCat    = response.data.map(data => data['sub-category']);
  
              let createD = createData(mark, seg, sCat);
              let createL = createLink(mark, seg, sCat, cntCID, sQt)

              options.series[0].data=createD
              options.series[0].links=createL

              setMarket(mark)
              setCntCust_ID(cntCID)
              setSegment(seg)
              setSumQuantity(sQt)
              setCategory(sCat)
          }
          
          catch(e){
              console.log("error : ", e)
          }
        }

        const createData = (market=null, segment=null, category=null) => {
            var t = new Set(market)
            market = [...t];
        
            var t = new Set(segment)
            segment = [...t];
        
            var t = new Set(category)
            category = [...t];
        
            var data = []
            for(var i=0; i < market.length; i++){
              var randColor = colors[Math.floor(Math.random() * colors.length)];
              data.push({
                name: market[i],
                itemStyle:{
                  color: randColor,
                  borderColor: randColor
                }
              })
            }
        
            for(var i=0; i < segment.length; i++){
              var randColor = colors[Math.floor(Math.random() * colors.length)];      
              data.push({
                name: segment[i],
                itemStyle:{
                  color: randColor,
                  borderColor: randColor
                }
              })
            }
        
            for(var i=0; i < category.length; i++){
              var randColor = colors[Math.floor(Math.random() * colors.length)];
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
        
          const createLink = (market=null, segment=null, category=null, cntCust_ID=0, sumQuantity=0) => {
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
  
      fetchData();
      }, []);
  
      return (
          <div>
              <ECharts
                  option={options}
                  opts={{ renderer: 'svg', width: 'auto', height: 'auto' }}
          />
          </div>
      );   
};