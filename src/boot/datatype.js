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
  { name: 'unique', icon: 'mdi-gamepad-circle-right', label: '取唯一值' },
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
    name: '背景设置',
    icon: 'mdi-cog-outline',
    type: 'cursor',
  },
];
