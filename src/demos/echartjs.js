// import React, { useEffect, useState } from 'react';
// import ECharts, { EChartsReactProps } from 'echarts-for-react';
// import axios from 'axios';

// export function Monthly_PS_Chart(){
//     const [orderMonth, setOrderMonth] = useState([])
//     const [purchase, setPurchase] = useState([])
//     const [sales, setSales] = useState([])
//     const [options, setOption] = useState(0)
    
//     const colors = ['#5470C6', '#91CC75'];
    

//     useEffect(() => {
//       let completed = false; //초기에는 실행해야 되기때문에 false flag 변수
  
//       //query를 리턴하는 함수를 result에 할당
//       async function get() {
//         const result = await axios.get(
//           `https://9s33kmrpxl.execute-api.ap-northeast-2.amazonaws.com/Dashboard/sqlquery/?sql=Monthly_PS_sql`
//         );
//         if (!completed) {
//           setOrderMonth(result.data["Order Month"])
//           setPurchase(result.data["Purchases"])
//           setSales(result.data["Sales"])

//           var opt = {
//             color: colors,
//             tooltip: {
//               trigger: 'axis',
//               axisPointer: {
//                 type: 'cross'
//               }
//             },
//             grid: {
//               right: '20%'
//             },
//             toolbox: {
//               feature: {
//                 dataView: { show: true, readOnly: false },
//                 restore: { show: true },
//                 saveAsImage: { show: true }
//               }
//             },
//             legend: {
//               data: ['Purchase Count', 'Sales']
//             },
//             xAxis: [
//               {
//                 type: 'category',
//                 axisTick: {
//                   alignWithLabel: true
//                 },
//                 data: orderMonth
//               }
//             ],
//             yAxis: [
//               {
//                 type: 'value',
//                 name: 'Purchase Count',
//                 position: 'right',
//                 alignTicks: true,
//                 axisLine: {
//                   show: true,
//                   lineStyle: {
//                     color: colors[0]
//                   }
//                 },
//                 axisLabel: {
//                   formatter: '{value}'
//                 }
//               },
//               {
//                 type: 'value',
//                 name: 'Sales',
//                 position: 'left',
//                 alignTicks: true,
//                 axisLine: {
//                   show: true,
//                   lineStyle: {
//                     color: colors[1]
//                   }
//                 },
//                 axisLabel: {
//                   formatter: '{value}'
//                 }
//               }
//             ],
//             series: [
//               {
//                 name: 'Purchase Count',
//                 type: 'bar',
//                 data: purchase
//               },
//               {
//                 name: 'Sales',
//                 type: 'line',
//                 yAxisIndex: 1,
//                 data: sales
//               }
//             ]
//           }
//         setOption(opt)
//       }
//       get();
//       return () => {
//         completed = true;
//       }
//     }
//    }, []);


// 	return (
//         <div>
//       <ECharts
//         option={options}
//         opts={{ renderer: 'svg', width: 'auto', height: 'auto' }}
//       />
//     </div>

//   );
// }