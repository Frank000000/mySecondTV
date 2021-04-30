<template>
  <canvas id="heart-rate"></canvas>
</template>

<script>
import F2 from "@antv/f2";

export default {
  name: 'HealthRateChart',
  props: {
    chartData: {
      type: Array,
    },
    index: {
      type: Number,
    },
    maxHeartRate: Number,
    minHeartRate: Number,
  },
  data() {
    return {
      chart: null,
      maxValue: 0,
      maxIndex: 0,
      minValue: 0,
      minIndex: 0,
      averageData: {},
    };
  },
  mounted() {
    this.handleHealthData();
  },
  watch: {
    chartData(newValue, oldValue) {
      if (newValue !== oldValue) {
        this.chart && this.chart.clear();
        this.handleHealthData();
      }
    },
  },
  methods: {
    getWeek(time) {
      const date = new Date(time.replace(/-/g, "/")).getDay();
      const weekDay = ["日", "一", "二", "三", "四", "五", "六"];
      return weekDay[date];
    },
    handleHealthData() {
      if (this.index === 1) {
        this.dayChart();
      } else if (this.index === 2) {
        this.weekChart();
      } else if (this.index === 3) {
        this.weekChart();
      }
    },
    dayChart() {
      let time = 0;
      let initData = {};

      this.chartData.forEach((item, index) => {
        item.time = item.measureTime.slice(11);
        item.value = item.heartRate && +item.heartRate;
        if (item.value > this.maxValue) {
          this.maxValue = item.value;
          this.maxIndex = index;
        }
        if (item.value == null) {
        } else if (item.value < 60) {
          item["msg"] = "过缓";
        } else if (item.value > 100) {
          item["msg"] = "过速";
        } else {
          item["msg"] = "正常";
        }
        initData[item.time] = item;
      });
      const chartData = Object.values(initData);

      this.chart = new F2.Chart({
        id: "heart-rate",
        pixelRatio: window.devicePixelRatio,
      });
      let config = {
        time: {
          tickCount: 5,
        },
        value: {
          tickCount: 5,
          min: 0,
        },
      };
      if (chartData[0] && !chartData[0].value) {
        config = {
          value: {
          },
          time: {
            tickCount: 5,
          },
        };
      }
      this.chart.source(chartData, config);
      this.chart.axis('time', {
        label: function label(text, index, total) {
          const textCfg = {
            fill:'rgba(240,240,240,0.60)',
            fontSize: '32'
          };
          return textCfg;
        }
      });
      this.chart.axis('value', {
        label: function label(text, index, total) {
          const textCfg = {
            fill:'rgba(240,240,240,0.60)',
            fontSize: '32'
          };
          return textCfg;
        }
      });
      // this.chart.label()
      this.chart.legend({
        position: "top",
        align: "left",
        itemWidth: 45,
      });
      this.chart.tooltip({
        offsetY: 15, // y 方向的偏移
        layout: "vertical",
        showTitle: true,
        showCrosshairs: true,
        onShow: function onShow(ev) {
          var items = ev.items;
          items.forEach((item) => {
            item.name = null;
            // item.title = null;
            item.value = `${item.origin.value} 次/分`;
          });
        },
        background: {
          radius: 2,
          fill: "#fff",
          padding: [5, 8],
        }, // tooltip 内容框的背景样式
        titleStyle: {
          fontSize: 12,
          fill: "#B9B6C4",
          textAlign: "start",
          textBaseline: "top",
        },
        nameStyle: {
          fontSize: 12,
          fill: "#595D6A",
          textAlign: "start",
          textBaseline: "middle",
        }, // tooltip name 项的文本样式配置
        valueStyle: {
          fontSize: 12,
          fill: "#595D6A",
          textAlign: "start",
          textBaseline: "middle",
        }, // tooltip value 项的文本样式配置
      });

      if (chartData.length === 1) {
        this.chart
          .point()
          .position("time*value")
          .style({
            fillOpacity: 0.3,
          })
          .shape("smooth");
      } else {
        this.chart
          .area()
          .position("time*value")
          .style({
            fillOpacity: 0.3,
          })
          .shape("smooth");
      }


      // this.chart.line().position("time*value").shape("smooth");
      this.chart.render();
    },
    weekChart() {
      let chartDatas = [];
      if (this.index === 2) {
        let date = new Date().getTime();
        for (let i = 6; i >= 0; i--) {
          let time = new Date(date - i * 24 * 60 * 60 * 1000).pattern(
            "yyyy-MM-dd"
          );
          this.averageData[this.getWeek(time)] = {
            dateTime: time,
            maxHeartRate: null,
            minHeartRate: null,
            time: this.getWeek(time),
            value: null,
          };
        }

        console.log(this.chartData)

        this.chartData.forEach((item) => {
          item.time = this.getWeek(item.dateTime);
          item.value = [
              item.minHeartRate,
              item.maxHeartRate === item.minHeartRate
                ? item.maxHeartRate + 5
                : item.maxHeartRate,
            ]
          this.$set(this.averageData, this.getWeek(item.dateTime), item);
        });
        chartDatas = Object.values(this.averageData);
      } else {
        this.chartData.forEach((item) => {
          item.time = item.dateTime.slice(5);
          item.value = [
              item.minHeartRate,
              item.maxHeartRate === item.minHeartRate
                ? item.maxHeartRate + 5
                : item.maxHeartRate,
            ]
        });
        chartDatas = this.chartData;
      }

      this.chart = new F2.Chart({
        id: "heart-rate",
        pixelRatio: window.devicePixelRatio,
      });
      let config = {
        time: {
          tickCount: 5,
        },
        value: {
          tickCount: 5,
          // min: this.minHeartRate - 10,
          // max: this.maxHeartRate + 10
        },
      };
      let axiosConfig = {};
      // if (this.chartData[0].value[0] ===) {
      //   config = {
      //     value: {
      //       max: 10,
      //       min: 0,
      //       tickInterval: 2,
      //     },
      //   };
      //   axiosConfig = {
      //     label: null,
      //   };
      // }
      this.chart.source(chartDatas, config);
      this.chart.axis("time", axiosConfig);
      this.chart.tooltip({
        offsetX: 25, // x 方向的偏移
        offsetY: 25,
        showItemMarker: false,
        showTitle: true, // 展示  tooltip 的标题
        layout: "vertical",
        onShow: function onShow(ev) {
          const items = ev.items;
          console.log(items);

          items[0].name = null;
          items[0].title = items[0].origin.dateTime.slice(5);
          items[0].value = `${items[0].origin.minHeartRate}-${items[0].origin.maxHeartRate} 次/分`;
        },
        background: {
          radius: 2,
          fill: "#fff",
          padding: [5, 8],
        }, // tooltip 内容框的背景样式
        titleStyle: {
          fontSize: 12,
          fill: "#B9B6C4",
          textAlign: "start",
          textBaseline: "top",
        },
        nameStyle: {
          fontSize: 12,
          fill: "#595D6A",
          textAlign: "start",
          textBaseline: "middle",
        }, // tooltip name 项的文本样式配置
        valueStyle: {
          fontSize: 12,
          fill: "#595D6A",
          textAlign: "start",
          textBaseline: "middle",
        }, // tooltip value 项的文本样式配置
      });

      this.chart
        .interval()
        .position("time*value")
        .style({
          fillOpacity: 0.65,
          radius: [5, 5, 5, 5],
        })
        .size(10);

      this.chart.render();
    },
  },
}
</script>

<style scoped lang="scss">
#heart-rate{
  width: 100%;
  height: 100%;
}
</style>