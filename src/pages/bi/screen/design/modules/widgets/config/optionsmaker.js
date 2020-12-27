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
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c}',
    },
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
        opacity: config.series.bar.itemStyle.opacity / 100,
        barBorderRadius: config.series.bar.itemStyle.barBorderRadius,
      },
    };
    if (config.series.bar.stack) {
      series.stack = 'same';
    }
    if (config.series.bar.barWidth > 0) {
      series.barWidth = config.series.bar.barWidth;
    }
    seriesList.push(series);
  });
  const xAxis = {
    ...config.xAxis,
    data: chartData.xAxisData,
  };
  const yAxis = [];
  if (config.yAxis.master.show) {
    const master = {
      type: 'value',
      position: 'left',
    };
    if (config.yAxis.master.name) {
      master.name = config.yAxis.master.name;
    }
    if (config.yAxis.master.unit) {
      master.axisLabel = { formatter: `{value} ${config.yAxis.master.unit}` };
    }
    yAxis.push(master);
  }
  if (config.yAxis.slave.show) {
    const slave = {
      type: 'value',
      position: 'right',
    };
    if (config.yAxis.slave.name) {
      slave.name = config.yAxis.slave.name;
    }
    if (config.yAxis.slave.unit) {
      slave.axisLabel = { formatter: `{value} ${config.yAxis.slave.unit}` };
    }
    yAxis.push(slave);
  }
  return {
    title: config.title,
    color: config.colors,
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        crossStyle: {
          color: '#999',
        },
      },
    },
    legend: config.legend,
    grid: {
      left: `${config.grid.left}%`,
      top: `${config.grid.top}%`,
      right: `${config.grid.right}%`,
      bottom: `${config.grid.bottom}%`,
    },
    xAxis,
    yAxis,
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
    tooltip: {},
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
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c}',
    },
    legend: config.legend,
    series: seriesList,
  };
};

const makeGaugeOption = (config, chartData) => {
  const seriesList = [];
  const series = {
    type: config.type,
    min: chartData.min,
    max: chartData.max,
    radius: '75%',
    data: chartData.dataList,
  };
  seriesList.push(series);
  return {
    title: config.title,
    color: config.colors,
    tooltip: {
      trigger: 'item',
      formatter: '{b} : {c}',
    },
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
  }
  return {};
};
