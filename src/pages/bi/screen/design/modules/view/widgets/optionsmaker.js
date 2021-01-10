const makePieOption = (config, chartData) => {
  const seriesList = [];
  chartData.seriesDataList.forEach((seriesData) => {
    const series = {
      name: seriesData.name,
      type: config.type,
      data: seriesData.dataList,
      center: [`${config.series.center.x}%`, `${config.series.center.y}%`],
      radius: [config.series.pie.radius.min, config.series.pie.radius.max],
      roseType: config.series.pie.roseType,
      hoverAnimation: config.series.pie.hoverAnimation,
      avoidLabelOverlap: config.series.pie.avoidLabelOverlap,
    };
    seriesList.push(series);
  });
  return {
    title: config.title,
    color: config.colors,
    tooltip: config.tooltip,
    legend: config.legend,
    series: seriesList,
  };
};
const makeDonutOption = (config, chartData) => {
  const seriesList = [];
  chartData.seriesDataList.forEach((seriesData, index) => {
    const dataName = config.series.donut.lable.template.replace('name', seriesData.name)
      .replace('value', seriesData.value);
    const series = {
      name: seriesData.name,
      type: 'pie',
      label: config.series.donut.lable,
      labelLine: {
        normal: {
          show: false,
        },
      },
      emphasis: {
        label: {
          show: true,
          fontSize: '20',
          fontWeight: 'bold',
        },
      },
      data: [
        {
          value: Math.min(seriesData.value, config.series.donut.total),
          name: dataName,
        },
        {
          value: Math.max(0, config.series.donut.total - seriesData.value),
          itemStyle: {
            normal: {
              color: config.series.donut.noDataColor,
            },
          },
        },
      ],
      radius: [`${90 - (index + 1) * config.series.donut.width}%`, `${90 - index * config.series.donut.width}%`],
    };
    seriesList.push(series);
  });
  return {
    title: config.title,
    color: config.colors,
    tooltip: config.tooltip,
    legend: config.legend,
    series: seriesList,
  };
};

const makeLineBarOption = (config, chartData) => {
  const seriesList = [];
  chartData.seriesDataList.forEach((seriesData) => {
    const series = {
      name: seriesData.name,
      type: config.type,
      data: seriesData.dataList,
      yAxisIndex: seriesData.axisIndex === '1' ? 1 : 0,
      itemStyle: {
        normal: {
          opacity: config.series.bar.itemStyle.opacity / 100,
          barBorderRadius: config.series.bar.itemStyle.barBorderRadius,
          label: {
            show: config.series.bar.itemStyle.show,
            position: config.series.bar.itemStyle.position,
            textStyle: {
              color: config.series.bar.itemStyle.color,
            },
          },
        },
      },
    };
    // 右轴作为 折线图来处理
    if (config.yAxis.slave.show && config.yAxis.slave.asLine && seriesData.axisIndex === '1') {
      series.type = 'line';
    }
    if (config.series.line.showArea) {
      series.areaStyle = {};
    }
    if (config.series.line.smooth) {
      series.smooth = true;
    }
    if (!config.series.line.showSymbol) {
      series.symbol = 'none';
    }
    if (config.series.bar.stack) {
      series.stack = 'same';
    }
    if (config.series.bar.barWidth > 0) {
      series.barWidth = config.series.bar.barWidth;
    }
    if (config.type === 'scatter') {
      series.symbolSize = function symbolSize(data) {
        if (data * config.series.scatter.symbolSizeRatio < config.series.scatter.symbolSize.min) {
          return config.series.scatter.symbolSize.min;
        }
        if (data * config.series.scatter.symbolSizeRatio > config.series.scatter.symbolSize.max) {
          return config.series.scatter.symbolSize.max;
        }
        return data * config.series.scatter.symbolSizeRatio;
      };
    }
    seriesList.push(series);
  });
  const xAxis = [{
    ...config.xAxis,
    data: chartData.xAxisData,
    axisLine: config.xAxis.axisLine,
  }];
  const yAxis = [];
  const master = {
    type: 'value',
    position: 'left',
    show: config.yAxis.master.show,
    splitLine: {
      show: config.yAxis.master.splitLine.show,
    },
    axisLine: config.yAxis.master.axisLine,
  };
  if (config.yAxis.master.name) {
    master.name = config.yAxis.master.name;
  }
  master.axisLabel = {
    ...config.yAxis.master.axisLabel,
  };
  if (config.yAxis.master.unit) {
    master.axisLabel.formatter = `{value} ${config.yAxis.master.unit}`;
  }
  yAxis.push(master);
  const slave = {
    type: 'value',
    position: 'right',
    show: config.yAxis.slave.show,
    splitLine: {
      show: config.yAxis.slave.splitLine.show,
    },
    axisLine: config.yAxis.slave.axisLine,
  };
  if (config.yAxis.slave.name) {
    slave.name = config.yAxis.slave.name;
  }
  slave.axisLabel = { ...config.yAxis.slave.axisLabel };
  if (config.yAxis.slave.unit) {
    slave.axisLabel.formatter = `{value} ${config.yAxis.slave.unit}`;
  }
  yAxis.push(slave);
  return {
    title: config.title,
    color: config.colors,
    tooltip: config.tooltip,
    legend: config.legend,
    grid: {
      left: `${config.grid.left}%`,
      top: `${config.grid.top}%`,
      right: `${config.grid.right}%`,
      bottom: `${config.grid.bottom}%`,
    },
    xAxis: config.series.horizontal ? yAxis : xAxis,
    yAxis: config.series.horizontal ? xAxis : yAxis,
    series: seriesList,
  };
};

const makeRadarOption = (config, chartData) => {
  const seriesList = [];
  const dataList = [];
  chartData.seriesDataList.forEach((seriesData) => {
    dataList.push({
      name: seriesData.name,
      value: seriesData.dataList,
    });
    seriesList.push({
      type: config.type,
      data: dataList,
    });
  });
  return {
    title: config.title,
    color: config.colors,
    tooltip: config.tooltip,
    radar: {
      shape: 'circle',
      name: {
        textStyle: {
          color: '#fff',
          backgroundColor: '#999',
          borderRadius: 3,
          padding: [3, 5],
        },
      },
      indicator: chartData.indicator,
      center: [`${config.series.center.x}%`, `${config.series.center.y}%`],
    },
    legend: config.legend,
    series: seriesList,
  };
};

const makeWordCloudOption = (config, chartData) => {
  const seriesList = [];
  seriesList.push(
    {
      type: 'wordCloud',
      shape: 'circle',
      sizeRange: [12, 60],
      rotationRange: [-90, 90],
      rotationStep: 45,
      gridSize: 8,
      drawOutOfBound: false,
      textStyle: {
        normal: {
          fontFamily: 'sans-serif',
          fontWeight: 'bold',
          color() {
            return `rgb(${[
              Math.round(Math.random() * 160),
              Math.round(Math.random() * 160),
              Math.round(Math.random() * 160),
            ].join(',')})`;
          },
        },
        emphasis: {
          shadowBlur: 10,
          shadowColor: '#333',
        },
      },

      left: 'center',
      top: 'center',
      width: '70%',
      height: '80%',
      right: null,
      bottom: null,
      data: chartData.dataList,
    },
  );
  return {
    title: config.title,
    series: seriesList,
  };
};
const makeFunnelOption = (config, chartData) => {
  const seriesList = [];
  chartData.seriesDataList.forEach((seriesData) => {
    seriesList.push({
      type: config.type,
      left: `${config.grid.left}%`,
      top: `${config.grid.top}%`,
      right: `${config.grid.right}%`,
      bottom: `${config.grid.bottom}%`,
      width: '80%',
      min: 0,
      max: 100,
      minSize: '0%',
      maxSize: '100%',
      sort: 'descending',
      gap: 2,
      label: {
        show: true,
        position: 'inside',
      },
      labelLine: {
        length: 10,
        lineStyle: {
          width: 1,
          type: 'solid',
        },
      },
      itemStyle: {
        borderColor: '#fff',
        borderWidth: 1,
      },
      emphasis: {
        label: {
          fontSize: 20,
        },
      },
      name: seriesData.name,
      data: seriesData.dataList,
    });
  });
  return {
    title: config.title,
    color: config.colors,
    tooltip: config.tooltip,
    legend: config.legend,
    series: seriesList,
  };
};

const makeGaugeOption = (config, chartData) => {
  const seriesList = [];
  if (!config.series.gauge.showDataName) {
    chartData.dataList.forEach((data) => {
      delete data.name;
    });
  }
  const series = {
    type: config.type,
    min: chartData.min,
    max: chartData.max,
    radius: `${config.series.gauge.radius}%`,
    detail: {
      show: config.series.gauge.detail.show,
      formatter: config.series.gauge.detail.formatter,
      offsetCenter: [`${config.series.gauge.detail.offsetCenter.x}%`, `${config.series.gauge.detail.offsetCenter.y}%`],
      color: config.series.gauge.detail.color,
      fontWeight: config.series.gauge.detail.fontWeight,
      fontStyle: config.series.gauge.detail.fontStyle,
      fontSize: config.series.gauge.detail.fontSize,
    },
    axisLine: {
      show: config.series.gauge.axisLine.show,
      lineStyle: {
        width: config.series.gauge.axisLine.lineStyle.width,
        color: JSON.parse(config.series.gauge.axisLine.lineStyle.color),
      },
    },
    splitLine: {
      show: config.series.gauge.splitLine.show,
      length: config.series.gauge.splitLine.length,
    },
    axisTick: {
      show: config.series.gauge.axisTick.show,
      length: config.series.gauge.axisTick.length,
    },
    axisLabel: {
      show: config.series.gauge.axisLabel.show,
    },
    pointer: {
      show: config.series.gauge.pointer.show,
      length: `${config.series.gauge.pointer.length}%`,
      width: config.series.gauge.pointer.width,
    },
    itemStyle: {
      color: config.series.gauge.itemStyle.color,
      borderWidth: 0,
      borderColor: '#000',
      borderType: 'solid',
      opacity: config.series.gauge.itemStyle.opacity / 100,
    },
    data: chartData.dataList,
    startAngle: config.series.gauge.startAngle,
    endAngle: config.series.gauge.endAngle,
  };
  seriesList.push(series);
  return {
    title: config.title,
    color: config.colors,
    tooltip: config.tooltip,
    legend: config.legend,
    series: seriesList,
  };
};

export const makeOptions = (config, chartData) => {
  if (config.type === 'pie') {
    return makePieOption(config, chartData);
  } if (config.type === 'line' || config.type === 'bar' || config.type === 'scatter') {
    return makeLineBarOption(config, chartData);
  } if (config.type === 'radar') {
    return makeRadarOption(config, chartData);
  } if (config.type === 'wordCloud') {
    return makeWordCloudOption(config, chartData);
  } if (config.type === 'funnel') {
    return makeFunnelOption(config, chartData);
  } if (config.type === 'gauge') {
    return makeGaugeOption(config, chartData);
  } if (config.type === 'donut') {
    return makeDonutOption(config, chartData);
  } if (config.type === 'custom') {
    if (config.custom.option) {
      return JSON.parse(config.custom.option);
    }
  }
  return {};
};
