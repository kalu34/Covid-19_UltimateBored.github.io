const HistoricUSvalues = 'https://api.covidtracking.com/v1/us/daily.json'
const CurrentUSvalues  = 'https://api.covidtracking.com/v1/us/current.json'
const UShistoricvaluesforadate  = 'https://api.covidtracking.com/v1/us/20200501.json'
const Currentvaluesforallstates = 'https://api.covidtracking.com/v1/states/current.json'
const Currentvaluesforasinglestate = 'https://api.covidtracking.com/v1/states/ca/current.json'

let tracker = 1;

function fetchData(url) {
    return fetch(url)
      .then(response => response.json())
      .then(data => {
        // Process the data or perform any additional operations
        return data; // Return the data to be used outside the fetch() scope
      })
      .catch(error => {
        // Handle any errors that occurred during the fetch
        console.error(error);
      });
  }
  function onload(){
    fetchData(HistoricUSvalues)
      .then(data => {
        const reversedData = data.reverse()
        const postiveData = reversedData.map(element => element.positive);
         const date = reversedData.map(element => element.date)
        //Line Chart
        Highcharts.chart('top_left', {
            title: {
              text: 'Historic US Values Over The Past 2 Year Of Covid-19'
            },
            xAxis: {
              categories: date
            },
            yAxis: {
              title: {
                text: 'Covid-19 postive test result per day'
              }
            },
            series: [{
              name: 'Postive Test Result',
              data: postiveData,
            },{
                name: 'Negative Test Result',
                data: reversedData.map(element => element.negative),
              },
              {
                name: 'Pending',
                data: reversedData.map(element => element.pending),
              },{
                name: 'hospitalizedCumulative',
                data: reversedData.map(element => element.death),
              }
              ,{
                name: 'death',
                data: reversedData.map(element => element.hospitalizedCumulative),
              }]
          });

         // Create the chart --- For Defalut Browser ----------------------------
          Highcharts.chart('left_bottom_left', {
              chart: {
                  type: 'bar'
                },
              title: {
                text: 'Us Historic Value'
              },
              xAxis: {
                categories: reversedData.map(element => element.date)
              },
              yAxis: {
                title: {
                  text: 'Value'
                }
              },
              series: [{
                name: 'Series 1',
                data: reversedData.map(element => element.pending)
              },
              {
                      name: 'series 2',
                      data: [3,2,1,4]
          
              }]
            });
        // Creating the pie Chart -----------------------------------
        var myChart = echarts.init(document.getElementById('left_bottom_right'));
        option = {
            title: {
              text: 'Historic Us Data',
              left: 'center',
              textStyle: {
                color: 'white' // Change this to your desired color
              },
            },
            tooltip: {
              trigger: 'item'
            },
            legend: {
              orient: 'vertical',
              left: 'left',
              textStyle: {
                color: 'white' // Change this to your desired color
              },
            },
            series: [
              {
                name: 'Historic US values',
                type: 'pie',
                center: ['65%', '59%'],
                radius: '60%',
                data: [
                  { value: data[419].positive, name: 'positive' },
                  { value: data[419].negative, name: 'negative' },
                  { value: data[419].pending, name: 'pending' },
                  { value: data[419].hospitalized, name: 'hospitalized' },
                  { value: data[419].death, name: 'death' }
                ],
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
        myChart.setOption(option);
        // --------------------------- pie chart End here---------------

      })
  }
// Historic US values---------------------------------------------------------------------------------------------
document.querySelector('#HistoricUSvalues').addEventListener('click', onload)
const Show_Date = document.getElementById('submit_input')
Show_Date.addEventListener('click', function(){
   const searchDate = document.getElementById('search_date').value;
   const searchDateNew = searchDate.replace(/-/g, "")
   const lastDate = parseInt(searchDateNew)

   fetchData(HistoricUSvalues)
    .then(data => {
        data.forEach(element => {
            if(element.date === lastDate){
                const data = {
                    categories: ['postitive', 'Negative', 'Pending','Hospitalized','death'],
                    series: [
                      {
                        name: ' comparision 1',
                        data: [element.positive, element.negative, element.pending,element.hospitalized, element.death]
                      },
                      
                    ]
                  };
                // Assuming you have the data prepared as shown in step 3
            Highcharts.chart('left_bottom_left', {
                    chart: {
                    type: 'column'
                 },
                title: {
                 text: 'Bar Chart'
             },
             xAxis: {
                     categories: data.categories
                     },
                     yAxis: {
             title: {
             text: 'Value'
                     }
                 },
                    series: data.series
                     })
                     var myChart = echarts.init(document.getElementById('left_bottom_right'));
                    option = {
                    title: {
                      text: 'Historic Us Data',
                      left: 'center',
                      textStyle: {
                        color: 'white' // Change this to your desired color
                      },
                    },
                    tooltip: {
                      trigger: 'item'
                    },
                    legend: {
                      orient: 'vertical',
                      left: 'left',
                      textStyle: {
                        color: 'white' // Change this to your desired color
                      },
                      textlabel: {
                        left: 'left'
                      }
                    },
                    series: [
                      {
                        name: 'Historic US values',
                        type: 'pie',
                        center: ['65%', '59%'],
                        radius: '60%',
                        data: [
                          { value: element.inIcuCurrently, name: 'inIcuCurrently' },
                          { value: element.onVentilatorCurrently, name: 'onVentilatorCurrently' },
                          { value: element.onVentilatorCumulative, name: 'onVentilatorCumulative' },
                          { value: element.deathIncrease, name: 'deathIncrease' },
                          { value: element.hospitalizedIncrease, name: 'hospitalizedIncrease' }
                        ],
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
                myChart.setOption(option);
             }
             //------- second Pie Chart Goes here
          });
    })
   
});
//Current US values ---------------------------------------------------------------------------------------------------
document.getElementById('CurrentUSvalues').addEventListener('click', function(){
    fetchData(CurrentUSvalues)
        .then(data => {
                  //Line Chart
        Highcharts.chart('top_left', {
          chart: {
                    type: 'bar'
                  },
          title: {
            text: 'Current Covid-19'
          },
          xAxis: {
            categories: data[0].totalTestResults
          },
          yAxis: {
            title: {
              text: 'Covid-19 postive test result per day'
            }
          },
          series: [{
            name: 'Total Test Result',
            data: [data[0].positive, data[0].negative, data[0].pending, data[0].hospitalized, data[0].death],
          }]
        });
        ///// End of Line Chart
        Highcharts.chart('left_bottom_left', {
          chart: {
              type: 'bar'
            },
          title: {
            text: 'Current Us Value'
          },
          xAxis: {
            categories: data[0].date
          },
          yAxis: {
            title: {
              text: 'Value'
            }
          },
          series: [{
            name: ' Pending and Hospitalized',
            data:  [data[0].hospitalizedCurrently, data[0].inIcuCumulative, data[0].positiveIncrease, data[0].pending, data[0].onVentilatorCumulative]
          }]
        });

        //  end of Bar
        var myChart = echarts.init(document.getElementById('left_bottom_right'));
        option = {
            title: {
              text: 'Current Us Data',
              left: 'center',
              textStyle: {
                color: 'white' // Change this to your desired color
              },
            },
            tooltip: {
              trigger: 'item'
            },
            legend: {
              orient: 'vertical',
              left: 'left',
              textStyle: {
                color: 'white' // Change this to your desired color
              },
            },
            series: [
              {
                name: 'Historic US values',
                type: 'pie',
                center: ['65%', '59%'],
                radius: '60%',
                data: [
                  { value: data[0].pending, name: 'positive' },
                  { value: data[0].hospitalizedCurrently, name: 'hospitalizedCurrently' },
                  { value: data[0].positiveIncrease, name: 'positiveIncrease' },
                  { value: data[0].inIcuCumulative, name: 'inIcuCumulative' },
                  { value: data[0].hospitalizedIncrease, name: 'hospitalizedIncrease' }
                ],
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
        myChart.setOption(option);
        // End of  Chart

        })
})

// US historic values for a date
document.getElementById('UShistoricvaluesforadate').addEventListener('click', function(){
  fetchData(UShistoricvaluesforadate)
      .then(data => {
                //Line Chart
      Highcharts.chart('top_left', {
        chart: {
                  type: 'column'
                },
        title: {
          text: 'US historic values for a date'
        },
        xAxis: {
          categories: ['positive','negative','pending','hospitalized','death']
        },
        yAxis: {
          title: {
            text: 'Covid-19 postive test result per day'
          }
        },
        series: [{
          name: 'Total Test Result',
          data: [data.positive, data.negative, data.pending, data.hospitalized, data.death],
        },{
          name: 'Total Test Result',
          data: [data.negative, data.positive, data.positive, data.death, data.negative ]
        }]
      });
      ///// End of Line Chart
      Highcharts.chart('left_bottom_left', {
        chart: {
            type: 'bar'
          },
        title: {
          text: 'Current Us Value'
        },
        xAxis: {
          categories: data.date
        },
        yAxis: {
          title: {
            text: 'Value'
          }
        },
        series: [{
          name: ' Pending and Hospitalized',
          data:  [data.hospitalizedCurrently, data.inIcuCumulative, data.positiveIncrease, data.pending, data.onVentilatorCumulative]
        }]
      });

      //  end of Bar
      var myChart = echarts.init(document.getElementById('left_bottom_right'));
      
      myChart.setOption(option);
      // End of  Chart

      })
})

// Historic values for all states-----------------------------------------------------------------------------------
document.querySelector('.specialClass').addEventListener('click', function(){
    fetch(Currentvaluesforallstates)
    .then(response => response.json())
    .then(data => {
        // Line Graph
    Highcharts.chart('top_left', {
      title: {
        text: 'Current values for all states'
      },
      xAxis: {
        categories: data.map(element => element.state)
      },
      yAxis: {
        title: {
          text: 'Covid-19 postive test result  for all states'
        }
      },
      series: [{
        name: 'Postive Test Result',
        data: data.map(element => element.positive)
      },{
          name: 'Negative Test Result',
          data: data.map(element => element.negative),
        },
        {
          name: 'Pending',
          data: data.map(element => element.pending),
        },{
          name: 'death',
          data: data.map(element => element.death),
        }
        ,{
          name: ' hospitalizedCumulative',
          data: data.map(element => element.hospitalizedCumulative),
        }]
    });

//  End Of Line Graph
// const element1 = data.map(element => element.state)
// const elementValue = data.map(element1 => element1.negative);

// var myChart = echarts.init(document.getElementById('left_bottom_right'));
// option = {
//   chart: {
    
//   },
//   xAxis: {
//     type: 'category',
//     boundaryGap: false,
//     data: element1
//   },
//   yAxis: {
//     type: 'value'
//   },
//   series: [
//     {
//       data: elementValue,
//       type: 'line',
//       areaStyle: {}
//     }
//   ]
// };
// myChart.setOption(option);
Highcharts.chart('left_bottom_left', {
  title: {
    text: 'Current US values Of Covid-19'
  },
  xAxis: {
    categories: data.map(element => element.state)
  },
  yAxis: {
    title: {
      text: 'Covid-19 postive test result per day'
    }
  },
  series: [{
    name: 'Negative People Count',
    data: data.map(element1 => element1.negative)
  },{
    name: 'positive People Count',
    data: data.map(element1 => element1.positive)
  }]
});

// End of bar graph
var myChart = echarts.init(document.getElementById('left_bottom_right'));
option = {
  title: {
    text: 'US Current values for all date',
    left: 'right',
    textStyle: {
      color: 'white' // Change this to your desired color
    },
  },
  tooltip: {
    trigger: 'item'
  },
  legend: {
    orient: 'vertical',
    left: 'left',
    textStyle: {
      color: 'white' // Change this to your desired color
    },
  },
  series: [
    {
      name: 'Historic US values',
      type: 'pie',
      center: ['65%', '59%'],
      radius: '50%',
      data: [
        { value: data[6].positive, name: 'positive' },
        { value: data[18].hospitalizedCurrently, name: 'hospitalizedCurrently' },
        { value: data[33].negative, name: 'negative' },
        { value: data[45].inIcuCumulative, name: 'inIcuCumulative' },
        { value: data[24].hospitalizedIncrease, name: 'hospitalizedIncrease' }
      ],
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
myChart.setOption(option);
    })

    // 
})

//Currentvaluesforasinglestate----------------------------------------------------------------------------------
document.querySelector('#Currentvaluesforasinglestate').addEventListener('click', function(){
  const searchedValue = document.getElementById('searchedValue').value
  const url = `api.covidtracking.com/v1/states/${searchedValue}/current.json`
  fetch( `https://api.covidtracking.com/v1/states/${searchedValue}/current.json`)
    .then(respond => respond.json())
    .then(data => {
      Highcharts.chart('top_left', {
        title: {
          text: 'Current values for all states'
        },
        xAxis: {
          categories: ['positive','hospitalizedCurrently','inIcuCurrently','onVentilatorCurrently','death','positiveIncrease','hospitalizedDischarged'],
        },
        yAxis: {
          title: {
            text: 'Covid-19 postive test result  for all states'
          }
        },
        series: [{
          name: 'Postive Test Result',
          data: [data.positive, data.hospitalizedCurrently,data.inIcuCurrently, data.onVentilatorCurrently, data.death, data.positiveIncrease, data.hospitalizedDischarged],
        }]
      });
      // Bar Chart
      Highcharts.chart('left_bottom_left', {
        chart: {
          type: 'column'
        },
        title: {
          text: 'Current Us Covid-19 Show case of Each Searched Text'
        },
        xAxis: {
          categories: ['positive','hospitalizedCurrently','inIcuCurrently','onVentilatorCurrently','death','positiveIncrease','hospitalizedDischarged'],
        },
        yAxis: {
          title: {
            text: 'inIcuCurrently'
          }
        },
        series: [{
          name: 'Total Description of the State',
          data: [data.positive, data.hospitalizedCurrently,data.inIcuCurrently, data.onVentilatorCurrently, data.death, data.positiveIncrease, data.hospitalizedDischarged],
        }]
      });
      // Pie Chart
      var myChart = echarts.init(document.querySelector('#left_bottom_right'))
      option = {
        tooltip: {
          trigger: 'item'
        },
        legend: {
          top: '5%',
          left: 'left',
          textStyle: {
            color: '#fff',
          }
        },
        series: [
          {
            center : ['55%', '60%'],
            name: 'Current values for a single state',
            type: 'pie',
            radius: ['30%', '65%'],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: 30,
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: true
            },
            data: [
              { value: data.positive, name: 'positive' },
              { value: data.hospitalizedCurrently, name: 'hospitalizedCurrently' },
              { value: data.inIcuCurrently, name: 'inIcuCurrently' },
              { value: data.onVentilatorCurrently, name: 'Union onVentilatorCurrently' },
              { value: data.death, name: 'death' },
              { value: data.positiveIncrease, name: 'positiveIncrease' },
              { value: data.hospitalizedDischarged, name: 'hospitalizedDischarged' }
            ]
          }
        ]
      };
      myChart.setOption(option)
      //  End of Chart
    })
    .catch(error => {
      console.log('There is an error fetching this api' + error)
    })
})

// HIstoric Value for A single State
document.querySelector('#Historicvaluesforasinglestate').addEventListener('click', function(){
  const searchedValue = document.getElementById('searchedValue_1').value
  fetch( `https://api.covidtracking.com/v1/states/${searchedValue}/daily.json`)
    .then(respond => respond.json())
    .then(data => {
      data.reverse()
      // Line Chart 
      Highcharts.chart('top_left', {
        title: {
          text: 'Covid-19  test result  for Each states In the Past 2 Year'
        },
        xAxis: {
          categories: data.map(element => element.date)
        },
        yAxis: {
          title: {
            text: 'Covid-19  test result  for Each states In the Past 2 Year'
          }
        },
        series: [{
          name: 'Postive Test Result',
          data: data.map(element => element.positive)
        },{
            name: 'Negative Test Result',
            data: data.map(element => element.negative),
          },
          {
            name: 'Pending',
            data: data.map(element => element.pending),
          },{
            name: 'death',
            data: data.map(element => element.death),
          }
          ,{
            name: ' hospitalizedCumulative',
            data: data.map(element => element.hospitalizedCumulative),
          }]
      });
  
      // Bar Chart

      Highcharts.chart('left_bottom_left', {
        
        title: {
          text: "Total Test Result In `${element.state}` Now"
        },
        xAxis: {
          categories: data.map(element => element.date)
        },
        yAxis: {
          title: {
            text: 'Covid-19 postive test result per day'
          }
        },
        chart: {
          type: 'column'
        },
        series: [{
          name: 'Population',
          data: data.map(element => element.totalTestResults),
        }]
      });
      // Pie Chart
      var myChart = echarts.init(document.querySelector('#left_bottom_right'))
      option = {
        title: {
          text: 'Historic values',
          left: 'center',
          textStyle : {
            color : '#fff',

          }
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          textStyle: {
            color: 'white'
          }
        },
        series: [
          {
            name: 'Historic values',
            type: 'pie',
            center: ['60%','60%'],
            radius: '50%',
            data: [
              { value: 1048, name: 'Positive' },
              { value: 735, name: 'negative' },
              { value: 580, name: 'Pending' },
              { value: 484, name: ' Hospitalized' },
              { value: 300, name: 'death' }
            ],
            label: {
              textStyle: {
                color: 'white'
              }
            },
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
      myChart.setOption(option)
      //  End of Chart
    })
    .catch(error => {
      console.log('There is an error fetching this api' + error)
    })
})


//  Tracker 
const btns = document.querySelectorAll('.search_content')

for( let i = 0; i < btns.length; i++){
  btns[i].addEventListener('click', function(){
    var current = document.getElementsByClassName('active')
    current[0].className =  current[0].className.replace(" active");
    this.className += " active"
  })
}
