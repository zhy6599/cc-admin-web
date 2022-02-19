export const columnToIcon = (v) => {
  let t = '';
  switch (v) {
    case 'INT':
    case 'DOUBLE':
    case 'FLOAT':
    case 'LONG':
    case 'number':
      t = 'mdi-numeric';
      break;
    case 'DATETIME':
    case 'date':
      t = 'today';
      break;
    case 'POINT':
      t = 'mdi-map-marker-radius';
      break;
    default:
      t = 'mdi-alphabetical-variant';
  }
  return t;
};

export const modelType = [
  { label: '维度', value: 'category' },
  { label: '指标', value: 'value' },
];

export const visualType = [
  { label: '字符', value: 'string' },
  { label: '数字', value: 'number' },
  { label: '日期', value: 'date' },
];

export const dbToVisualType = (v) => {
  let t = '';
  switch (v) {
    case 'int':
    case 'bigint':
    case 'double':
    case 'float':
    case 'long':
    case 'number':
      t = 'number';
      break;
    case 'datetime':
    case 'date':
      t = 'date';
      break;
    default:
      t = 'string';
  }
  return t;
};

export const dbToModelType = (v) => {
  let t = '';
  switch (dbToVisualType(v)) {
    case 'number':
      t = 'value';
      break;
    default:
      t = 'category';
  }
  return t;
};

export const searchType = [
  { label: '查询变量', value: 'query' },
  { label: '权限变量', value: 'auth' },
];

export const databaseType = [
  { label: 'JDBC', value: 'jdbc' },
  { label: 'EXCEL', value: 'excel' },
];

export const calculateType = [
  { label: '聚合函数', value: '' },
  { label: '求和', value: 'sum' },
  { label: '平均数', value: 'avg' },
  { label: '数量', value: 'count' },
  { label: '去重条数', value: 'COUNTDISTINCT' },
  { label: '最大值', value: 'max' },
  { label: '最小值', value: 'min' },
];

export const sortType = [
  { label: '升序', value: undefined, icon: 'mdi-sort-ascending' },
  { label: '升序', value: 'asc', icon: 'mdi-sort-ascending' },
  { label: '降序', value: 'desc', icon: 'mdi-sort-descending' },
];

export const leftRightType = [
  { label: '左侧', value: undefined, icon: 'mdi-format-horizontal-align-left' },
  { label: '右侧', value: '1', icon: 'mdi-format-horizontal-align-right' },
];

export const themeMap = {
  shine: [
    '#c12e34', '#e6b600', '#0098d9', '#2b821d',
    '#005eaa', '#339ca8', '#cda819', '#32a487',
  ],
  infographic: [
    '#C1232B', '#27727B', '#FCCE10', '#E87C25', '#B5C334',
    '#FE8463', '#9BCA63', '#FAD860', '#F3A43B', '#60C0DD',
    '#D7504B', '#C6E579', '#F4E001', '#F0805A', '#26C0C0',
  ],
  roma: ['#E01F54', '#001852', '#f5e8c8', '#b8d2c7', '#c6b38e',
    '#a4d8c2', '#f3d999', '#d3758f', '#dcc392', '#2e4783',
    '#82b6e9', '#ff6347', '#a092f1', '#0a915d', '#eaf889',
    '#6699FF', '#ff6666', '#3cb371', '#d5b158', '#38b6b6',
  ],
  macarons: [
    '#2ec7c9', '#b6a2de', '#5ab1ef', '#ffb980', '#d87a80',
    '#8d98b3', '#e5cf0d', '#97b552', '#95706d', '#dc69aa',
    '#07a2a4', '#9a7fd1', '#588dd5', '#f5994e', '#c05050',
    '#59678c', '#c9ab00', '#7eb00a', '#6f5553', '#c14089',
  ],
};

export const chartTypes = [{
  name: 'table',
  icon: 'mdi-table',
  label: '表格',
},
{
  name: 'line',
  icon: 'mdi-chart-line',
  label: '折线图',
},
{
  name: 'bar',
  icon: 'mdi-chart-bar',
  label: '柱状图',
},
{
  name: 'scatter',
  icon: 'mdi-chart-scatter-plot',
  label: '散点图',
},
{
  name: 'pie',
  icon: 'mdi-chart-pie',
  label: '饼状图',
},
{
  name: 'radar',
  icon: 'mdi-spider-web',
  label: '雷达图',
},
{
  name: 'funnel',
  icon: 'filter_list',
  label: '漏斗图',
},
{
  name: 'wordCloud',
  icon: 'mdi-file-word',
  label: '词云',
},
{
  name: 'gauge',
  icon: 'mdi-gauge',
  label: '仪表盘',
},
{
  name: 'donut',
  icon: 'mdi-chart-donut-variant',
  label: '环形图',
},
{
  name: 'maps',
  icon: 'mdi-google-maps',
  label: '地图',
},
{
  name: 'custom',
  icon: 'mdi-puzzle-edit-outline',
  label: '自定义',
}];
export const borderTypeOptions = [
  { label: '实线', value: 'solid' },
  { label: '虚线', value: 'dashed' },
  { label: '点线', value: 'dotted' },
];
export const leftAlignOptions = [
  { label: '自动', value: 'auto' },
  { label: '居左', value: 'left' },
  { label: '居中', value: 'center' },
  { label: '居右', value: 'right' },
];
export const topAlignOptions = [
  { label: '自动', value: 'auto' },
  { label: '置顶', value: 'top' },
  { label: '居中', value: 'middle' },
  { label: '置底', value: 'bottom' },
];
export const orientOptions = [
  { label: '水平', value: 'horizontal' },
  { label: '垂直', value: 'vertical' },
];
export const labelPositionOptions = [
  { label: '外部', value: 'outside' },
  { label: '内部', value: 'inside' },
  { label: '中间', value: 'center' },
];
export const picSetOptions = [
  { label: '重复', value: 'repeat' },
  { label: '拉伸', value: 'stretch' },
  { label: '不重复', value: 'no-repeat' },
  { label: '水平重复', value: 'repeat-x' },
  { label: '垂直重复', value: 'repeat-y' },
];
export const fontWeightOptions = [
  { label: 'normal', value: 'normal' },
  { label: 'bold', value: 'bold' },
  { label: 'bolder', value: 'bolder' },
  { label: 'lighter', value: 'lighter' },
];
export const fontStyleOptions = [
  { label: 'normal', value: 'normal' },
  { label: 'italic', value: 'italic' },
  { label: 'oblique', value: 'oblique' },
];
export const topBottomOptions = [
  { label: '顶部', value: 'top' },
  { label: '底部', value: 'bottom' },
];
export const themeOptions = [
  { label: 'shine', value: 'shine' },
  { label: 'infographic', value: 'infographic' },
  { label: 'roma', value: 'roma' },
  { label: 'macarons', value: 'macarons' },
];
export const modelTools = [
  { name: 'select', icon: 'mdi-filter-plus-outline', label: '数据提取' },
  { name: 'join', icon: 'mdi-vector-line', label: '数据关联' },
  { name: 'extract', icon: 'mdi-format-list-bulleted-type', label: '分组提取' },
  { name: 'summary', icon: 'mdi-graph-outline', label: '分组汇总' },
  { name: 'identifier', icon: 'mdi-format-list-numbered', label: '分组编号' },
  { name: 'merge', icon: 'mdi-forwardburger', label: '数据合并' },
  { name: 'layer', icon: 'mdi-view-split-horizontal', label: '数据分层' },
  { name: 'slice', icon: 'mdi-calendar-weekend', label: '日期分层' },
  { name: 'only', icon: 'mdi-gamepad-circle-right', label: '取唯一值' },
  { name: 'repeat', icon: 'mdi-hexagon-slice-5', label: '重复检测' },
  { name: 'convert', icon: 'mdi-select-multiple', label: '行列转换' },
  { name: 'sort', icon: 'mdi-sort-alphabetical-ascending', label: '数据排序' },
];

export const chartList = [
  {
    selected: false,
    name: '文字',
    icon: 'text_fields',
    type: 'text',
  },
  {
    selected: false,
    name: '图片',
    icon: 'mdi-file-image',
    type: 'image',
  },
  {
    selected: false,
    name: '边框',
    icon: 'mdi-postage-stamp',
    type: 'border',
  },
  {
    selected: false,
    name: '装饰',
    icon: 'mdi-cannabis',
    type: 'decoration',
  },
  {
    selected: false,
    name: '排名',
    icon: 'mdi-sort-variant',
    type: 'rank',
  },
  {
    selected: false,
    name: '图表',
    icon: 'mdi-chart-bar',
    type: 'chart',
  },
  {
    selected: false,
    name: '视频',
    icon: 'mdi-video-box',
    type: 'video',
  },
  {
    selected: false,
    name: '万能组件',
    icon: 'mdi-radiology-box-outline',
    type: 'omnipotent',
  },
  {
    selected: false,
    name: '自定义',
    icon: 'mdi-airplane-takeoff',
    type: 'custom',
  },
  {
    selected: false,
    name: '背景设置',
    icon: 'mdi-cog-outline',
    type: 'cursor',
  },
];

export const ellipsis = (value, vlength = 25) => {
  if (!value) {
    return '';
  }
  if (value.length > vlength) {
    return `${value.slice(0, vlength)}...`;
  }
  return value;
};

export const chartConfig = (v, darkModel) => {
  let t = {};
  const color = darkModel ? '#fff' : '#000';
  const colorReverse = darkModel ? '#000' : '#fff';
  switch (v) {
    case 'text':
      t = {
        asDate: false,
        dateFormat: 'YYYY-MM-DD HH:mm:ss',
        marquee: {
          loop: false,
          direction: 'left',
          scrolldelay: 60,
          alternate: false,
        },
        text: '请输入文字',
        color,
        fontSize: 12,
        fontWeight: 'normal',
        textAlign: 'left',
        letterSpacing: 0,
        datas: [],
        viewId: null,
        length: 100,
        slice: true,
        interval: 60,
        loop: true,
        dragState: {
          type: '',
          data: [],
        },
        draging: {
          type: '',
          data: [],
        },
        useBackground: false,
        bgColor: colorReverse,
        src: '',
        backPicSet: 'repeat',
        opacity: 100,
      };
      break;
    case 'image':
      t = {
        src: '',
        opacity: 0,
        loop: false,
        scrolldelay: 6,
        alternate: false,
        overflowHiden: true,
      };
      break;
    case 'border':
      t = {
        borderId: '1',
        color1: '#4fd2dd',
        color2: '#235fa7',
        reverse: false,
        needResize: false,
        backgroundColor: 'transparent',
      };
      break;
    case 'decoration':
      t = {
        decorationId: '1',
        color1: '#4fd2dd',
        color2: '#235fa7',
        reverse: false,
        needResize: false,
        backgroundColor: 'transparent',
      };
      break;
    case 'omnipotent':
      t = {
        content: '',
      };
      break;
    case 'custom':
      t = {
        needResize: false,
        cmpName: '',
        config: '',
      };
      break;
    case 'video':
      t = {
        src: '',
      };
      break;
    case 'group':
      t = {
        chartArray: [],
      };
      break;
    case 'rank':
      t = {
        animation: true,
        showIndex: true,
        data: [
          {
            name: '周口',
            value: 55,
          },
          {
            name: '南阳',
            value: 120,
          },
          {
            name: '西峡',
            value: 78,
          },
          {
            name: '驻马店',
            value: 66,
          },
          {
            name: '新乡',
            value: 80,
          },
          {
            name: '信阳',
            value: 45,
          },
          {
            name: '漯河',
            value: 29,
          }],
        unit: '',
        rowNum: 5,
        waitTime: 2000,
        carousel: 'single',
        sort: true,
        rows: [],
        cols: [],
        orders: [],
        name: '',
        needResize: false,
        fillOpacity: 0,
        cornerRadius: 0,
        stacked: false,
        showLoop: true,
        description: '',
        viewId: null,
        length: 100,
        slice: true,
        interval: 60,
        loop: true,
        dragState: {
          type: '',
          data: [],
        },
        draging: {
          type: '',
          data: [],
        },
      };
      break;
    case 'chart':
      t = {
        rows: [],
        cols: [],
        theme: 'shine',
        colors: themeMap.shine,
        orders: [],
        type: 'line',
        name: '',
        custom: {
          mapId: '',
          option: '',
        },
        table: {
          horizontal: false,
          showIndex: true,
          loop: false,
          glide: false,
          direction: 'up',
          scrolldelay: 6,
          alternate: true,
          tableStyle: {
            borderWidth: 1,
            borderStyle: '',
            color: '#fff',
            backgroundColor: 'transparent',
          },
          tableHead: {
            show: true,
            color: '#FFF',
            fontSize: 12,
            fontWeight: 'bold',
            borderWidth: 1,
            borderStyle: '',
            borderColor: '#feffff',
            backgroundColor: '#00baff',
            textAlign: 'center',
            opacity: 100,
            thHeight: 40,
          },
          tableBody: {
            color: '#FFF',
            fontSize: 12,
            fontWeight: 'bold',
            borderWidth: 1,
            borderStyle: '',
            borderColor: '#feffff',
            textAlign: 'center',
            backgroundColor: '#f8f8f8',
            opacity: 100,
            tdHeight: 40,
          },
        },
        title: {
          show: true,
          text: '',
          subtext: '',
          left: 'center',
          padding: [0, 0, 0, 0],
          paddingTxt: '0, 0, 0, 0',
          top: 'top',
          orient: 'horizontal',
          textStyle: {
            color,
            fontWeight: 'normal',
            fontSize: 18,
          },
          subtextStyle: {
            color,
            fontWeight: 'normal',
            fontSize: 12,
          },
        },
        series: {
          horizontal: false,
          maps: {
            id: '',
            zoom: 10,
            label: {
              show: true,
              color,
            },
            itemStyle: {
              borderColor: colorReverse,
              borderWidth: 1,
              borderType: 'solid',
              opacity: 100,
            },
            visualMap: {
              min: 0,
              max: 0,
              show: false,
              text: ['High', 'Low'],
              textArray: 'High,Low',
              realtime: false,
              inverse: false,
              inRange: {
                color: ['lightskyblue', 'yellow', 'orangered'],
              },
              textStyle: {
                color,
                fontWeight: 'normal',
                fontStyle: 'normal',
                fontSize: 18,
              },
            },
          },
          bar: {
            stack: false,
            barWidth: 0,
            itemStyle: {
              opacity: 100,
              barBorderRadius: 0,
              show: false,
              position: 'top',
              color: 'auto',
            },
          },
          scatter: {
            itemStyle: {
              opacity: 100,
              show: false,
              position: 'top',
              color: 'auto',
            },
            symbolSizeRatio: 1,
            symbolSize: {
              min: 10,
              max: 30,
            },
          },
          line: {
            showArea: false,
            showSymbol: true,
            smooth: false,
            itemStyle: {
              show: false,
              position: 'top',
              color: 'auto',
            },
          },
          pie: {
            radius: { min: 0, max: 100 },
            roseType: false,
            hoverAnimation: false,
            avoidLabelOverlap: false,
            label: {
              show: true,
              position: 'outside',
              formatter: '{b}: {c}',
              rotate: 0,
              color: colorReverse,
              fontStyle: 'normal',
              fontWeight: 'normal',
              fontSize: 12,
              align: 'left',
              verticalAlign: 'top',
            },
            labelLine: {
              show: true,
              length: 15,
              length2: 5,
              smooth: true,
            },
          },
          donut: {
            total: 100,
            width: 10,
            roseType: false,
            hoverAnimation: false,
            avoidLabelOverlap: false,
            noDataColor: colorReverse,
            lable: {
              show: false,
              template: 'name',
              color,
              fontWeight: 'normal',
              fontSize: 18,
              position: 'center',
            },
          },
          gauge: {
            radius: 90,
            startAngle: 225,
            endAngle: -45,
            showDataName: true,
            detail: {
              show: true,
              formatter: '{value}',
              offsetCenter: { x: 0, y: 40 },
              color: '#91c7af',
              fontWeight: 'normal',
              fontStyle: 'normal',
              fontSize: 18,
            },
            axisLine: {
              show: true,
              lineStyle: {
                width: 30,
                color: JSON.stringify([[0.2, '#91c7ae'], [0.8, '#63869e'], [1, '#c23531']]),
              },
            },
            splitLine: {
              show: true,
              length: 30,
            },
            axisTick: {
              show: true,
              length: 8,
            },
            axisLabel: {
              show: true,
              length: 8,
            },
            pointer: {
              show: true,
              length: 80,
              width: 8,
            },
            itemStyle: {
              color: '#91c7af',
              borderWidth: 0,
              borderColor: color,
              borderType: 'solid',
              opacity: 100,
            },
            hoverAnimation: false,
            avoidLabelOverlap: false,
          },
          center: {
            x: 50,
            y: 50,
          },
        },
        yAxis: {
          master: {
            name: '',
            show: true,
            nameRotate: 0,
            nameTextStyle: {
              color,
              fontSize: 12,
              fontWeight: 'normal',
              fontStyle: 'normal',
            },
            splitLine: {
              show: true,
              lineStyle: {
                width: 1,
                color,
                type: 'solid',
              },
            },
            unit: '',
            axisLabel: {
              show: true,
              color,
              rotate: 0,
              fontSize: 12,
              fontWeight: 'normal',
              fontStyle: 'normal',
            },
            axisLine: {
              show: true,
              lineStyle: {
                width: 1,
                color,
                type: 'solid',
              },
            },
            axisTick: {
              show: true,
              length: 5,
            },
          },
          slave: {
            name: '',
            show: false,
            nameRotate: 0,
            nameTextStyle: {
              color,
              fontSize: 12,
              fontWeight: 'normal',
              fontStyle: 'normal',
            },
            asLine: false,
            unit: '',
            splitLine: {
              show: true,
              lineStyle: {
                width: 1,
                color,
                type: 'solid',
              },
            },
            axisLabel: {
              show: true,
              color,
              rotate: 0,
              fontSize: 12,
              fontWeight: 'normal',
              fontStyle: 'normal',
            },
            axisLine: {
              show: true,
              lineStyle: {
                width: 1,
                color,
                type: 'solid',
              },
            },
            axisTick: {
              show: true,
              length: 5,
            },
          },
        },
        xAxis: {
          show: true,
          nameRotate: 0,
          position: 'bottom',
          type: 'category',
          axisPointer: {
            type: 'shadow',
          },
          name: '',
          nameTextStyle: {
            color,
            fontSize: 12,
            fontWeight: 'normal',
            fontStyle: 'normal',
          },
          axisLabel: {
            show: true,
            rotate: 0,
            color,
            fontSize: 12,
            fontWeight: 'normal',
            fontStyle: 'normal',
          },
          axisLine: {
            show: true,
            lineStyle: {
              width: 1,
              color,
              type: 'solid',
            },
          },
          axisTick: {
            show: true,
            length: 5,
          },
        },
        legend: {
          show: true,
          left: 'right',
          top: 'top',
          orient: 'horizontal',
          textStyle: {
            color,
            fontSize: 12,
            fontWeight: 'normal',
            fontStyle: 'normal',
          },
        },
        grid: {
          left: 10,
          top: 10,
          right: 5,
          bottom: 10,
        },
        tooltip: {
          show: true,
          trigger: 'item',
          animation: true,
          formatter: '{a} <br/>{b} : {c}',
        },
        needResize: false,
        fillOpacity: 0,
        cornerRadius: 0,
        stacked: false,
        showLoop: true,
        description: '',
        viewId: null,
        length: 100,
        slice: true,
        interval: 60,
        loop: true,
        dragState: {
          type: '',
          data: [],
        },
        draging: {
          type: '',
          data: [],
        },
      };
      break;
    case 'cursor':
      t = {
        src: '',
        opacity: 0,
        loop: false,
        scrolldelay: 6,
        alternate: false,
      };
      break;
    default:
      t = {};
  }
  return t;
};
