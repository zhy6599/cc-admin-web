export const funcDataList = [
  {
    type: '字符串函数',
    expand: true,
    functions: [{
      name: 'LENGTH',
      expression: 'LENGTH(text)',
      remark: '返回文本字符串中字符个数',
      help: 'LENGTH(\'abc\'),返回 3',
      returntype: '数值',
      params: [{
        datatypes: ['字符'],
        name: 'text',
        remark: '要计算长度的文本字符串或者字符类型的字段名',
      }],
    }, {
      name: 'SUBSTR',
      expression: 'SUBSTR(text, start, count)',
      remark: '从文本字符串中指定的位置开始,返回指定长度的字符串',
      help: 'SUBSTR(\'abcdefg\',1,3),返回  \'abc\'',
      returntype: '字符',
      params: [{
        datatypes: ['字符'],
        name: 'text',
        remark: '字符串或者字符类型的字段名',
      }, {
        datatypes: ['数值'],
        name: 'start',
        remark: '开始位置,起始位置为1',
      }, {
        datatypes: ['数值'],
        name: 'count',
        remark: '所截取到的字符子串的个数',
      }],
    }, {
      name: 'LEFT',
      expression: 'LEFT(str, len)',
      remark: '返回字符串 str 中最左边的 len 个字符',
      help: 'LEFT(\'cc-admin\', 4),返回  \'cc-a\'',
      returntype: '字符',
      params: [{
        datatypes: ['字符'],
        name: 'str',
        remark: '字符串或者字符类型的字段名',
      }, {
        datatypes: ['数值'],
        name: 'len',
        remark: '返回的字符个数',
      }],
    }, {
      name: 'RIGHT',
      expression: 'RIGHT(str, len)',
      remark: '返回字符串 str 中最右边的 len 个字符',
      help: 'RIGHT(\'cc-admin\', 3),返回  \'min\'',
      returntype: '字符',
      params: [{
        datatypes: ['字符'],
        name: 'str',
        remark: '字符串或者字符类型的字段名',
      }, {
        datatypes: ['数值'],
        name: 'len',
        remark: '返回的字符个数',
      }],
    }, {
      name: 'TRIM',
      expression: 'TRIM(text)',
      remark: '除了单词之间的空格外,清除文本所有的空格',
      help: 'TRIM(\'  abc defg  \'),返回  \'abc defg\'',
      returntype: '字符',
      params: [{
        datatypes: ['字符'],
        name: 'text',
        remark: '字符串或者字符类型的字段名',
      }],
    }, {
      name: 'LTRIM',
      expression: 'LTRIM(text)',
      remark: '清除文本左侧所有的空格',
      help: 'TRIM(\'  abc defg  \'),返回  \'abc defg  \'',
      returntype: '字符',
      params: [{
        datatypes: ['字符'],
        name: 'text',
        remark: '字符串或者字符类型的字段名',
      }],
    }, {
      name: 'RTRIM',
      expression: 'RTRIM(text)',
      remark: '清除文本右侧所有的空格',
      help: 'TRIM(\'  abc defg  \'),返回  \'  abc defg\'',
      returntype: '字符',
      params: [{
        datatypes: ['字符'],
        name: 'text',
        remark: '字符串或者字符类型的字段名',
      }],
    }, {
      name: 'UPPER',
      expression: 'UPPER(text)',
      remark: '将文本字符串转换为字母全大写形式',
      help: 'UPPER(\'abc\'),返回  \'abc\'',
      returntype: '字符',
      params: [{
        datatypes: ['字符'],
        name: 'text',
        remark: '字符串或者字符类型的字段名',
      }],
    }, {
      name: 'LOWER',
      expression: 'LOWER(text)',
      remark: '将文本字符串转换为字母全小写形式',
      help: 'LOWER(\'abc\'),返回  \'abc\'',
      returntype: '字符',
      params: [{
        datatypes: ['字符'],
        name: 'text',
        remark: '字符串或者字符类型的字段名',
      }],
    }, {
      name: 'CONCAT',
      expression: 'CONCAT(text1,text2)',
      remark: '将两个文本串合并为一个',
      help: 'CONCAT(\'abc\',\'def\'),返回  \'abcdef\'',
      returntype: '字符',
      params: [{
        datatypes: ['字符'],
        name: 'text1',
        remark: '字符串或者字符类型的字段名',
      }, {
        datatypes: ['字符'],
        name: 'text2',
        remark: '字符串或者字符类型的字段名',
      }],
    }, {
      name: 'INSTR',
      expression: 'INSTR(text1,text2)',
      remark: '在一个字符串中搜索指定的子串,返回第一次出现指定的子串的位置',
      help: 'INSTR(\'abcdef\',\'cd\'),返回 3',
      returntype: '数值',
      params: [{
        datatypes: ['字符'],
        name: 'text1',
        remark: '字符串或者字符类型的字段名',
      }, {
        datatypes: ['字符'],
        name: 'text2',
        remark: '字符串或者字符类型的字段名',
      }],
    }, {
      name: 'REPLACE',
      expression: 'REPLACE(text1,text2,text3)',
      remark: '将字符串中的一个或多个字符替换为其他字符',
      help: 'REPLACE(\'abcde\',\'c\',\'b\'),返回  \'abbde\'',
      returntype: '字符',
      params: [{
        datatypes: ['字符'],
        name: 'text1',
        remark: '字符串或者字符类型的字段名',
      }, {
        datatypes: ['字符'],
        name: 'text2',
        remark: '被替换字符串',
      }, {
        datatypes: ['字符'],
        name: 'text3',
        remark: '替换字符串',
      }],
    }, {
      name: 'RPAD',
      expression: 'RPAD(text,length,format)',
      remark: '右补足函数,在参数右边填充指定字符',
      help: 'RPAD(\'abc\',5,\'0\'),返回 \'abc00\'',
      returntype: '字符',
      params: [{
        datatypes: ['字符'],
        name: 'text',
        remark: '字符串或者字符类型的字段名',
      }, {
        datatypes: ['数值'],
        name: 'length',
        remark: '表示需要长度',
      }, {
        datatypes: ['字符'],
        name: 'format',
        remark: '补齐所用字符串',
      }],
    }, {
      name: 'LPAD',
      expression: 'LPAD(text,length,format)',
      remark: '左补足函数,在参数左边填充指定字符',
      help: 'LPAD(\'abc\',5,\'0\'),返回 \'00abc\'',
      returntype: '字符',
      params: [{
        datatypes: ['字符'],
        name: 'text',
        remark: '字符串或者字符类型的字段名',
      }, {
        datatypes: ['数值'],
        name: 'length',
        remark: '表示需要长度',
      }, {
        datatypes: ['字符'],
        name: 'format',
        remark: '补齐所用字符串',
      }],
    }, {
      name: 'TRANSLATE',
      expression: 'TRANSLATE(source,original,replacement)',
      remark: '将字符串中的所选字符替换为替换字符',
      help: 'TRANSLATE(\'1tech23\', \'123\', \'456\'); 会返回 \'4tech56\'',
      returntype: '字符',
      params: [{
        datatypes: ['字符'],
        name: 'source',
        remark: '要转换其中的字符的字符串',
      }, {
        datatypes: ['字符'],
        name: 'original',
        remark: '包含可转换的字符的字符串',
      }, {
        datatypes: ['字符'],
        name: 'replacement',
        remark: '一个字符串，它包含的字符将替换 original中的字符',
      }],
    }],
  },

  {
    type: '数值函数',
    expand: true,
    functions: [{
      name: 'ABS',
      expression: 'ABS(number)',
      remark: '返回参数的绝对值',
      help: 'ABS(-5),返回 5',
      returntype: '数值',
      params: [{
        datatypes: ['数值'],
        name: 'number',
        remark: '数值型参数或者数值型字段名',
      }],
    }, {
      name: 'SIGN',
      expression: 'SIGN(number)',
      remark: '如果参数大于0则返回1，小于0返回-1，等于0返回0',
      help: 'SIGN(-5),返回 -1;SIGN(5),返回 1;SIGN(0),返回 0',
      returntype: '数值',
      params: [{
        datatypes: ['数值'],
        name: 'number',
        remark: '数值型参数或者数值型字段名',
      }],
    }, {
      name: 'CEIL',
      expression: 'CEIL(number)',
      remark: '将参数向上舍入为最接近的整数',
      help: 'CEIL(5.4),返回 6',
      returntype: '数值',
      params: [{
        datatypes: ['数值'],
        name: 'number',
        remark: '数值型参数或者数值型字段名',
      }],
    }, {
      name: 'FLOOR',
      expression: 'FLOOR(number)',
      remark: '将参数向下舍入为最接近的整数',
      help: 'FLOOR(5.4),返回 5',
      returntype: '数值',
      params: [{
        datatypes: ['数值'],
        name: 'number',
        remark: '数值型参数或者数值型字段名',
      }],
    }, {
      name: 'ROUND',
      expression: 'ROUND(number,num_digits)',
      remark: '按照指定的精度进行四舍五入',
      help: 'ROUND(5.42,1),返回 5.4;ROUND(5.66,1),返回 5.7',
      returntype: '数值',
      params: [{
        datatypes: ['数值'],
        name: 'number',
        remark: '数值型参数或者数值型字段名',
      }, {
        datatypes: ['数值'],
        name: 'num_digits',
        remark: '小数位数',
      }],
    }, {
      name: 'TRUNC',
      expression: 'TRUNC(number,num_digits)',
      remark: '按照指定的精度截取（只舍不入）',
      help: 'TRUNC(5.678,2),返回  5.67',
      returntype: '数值',
      params: [{
        datatypes: ['数值'],
        name: 'number',
        remark: '数值型参数或者数值型字段名',
      }, {
        datatypes: ['数值'],
        name: 'num_digits',
        remark: '小数位数',
      }],
    }, {
      name: 'MOD',
      expression: 'MOD(number1,number2)',
      remark: '取模',
      help: 'MOD(15,2),返回  1',
      returntype: '数值',
      params: [{
        datatypes: ['数值'],
        name: 'number1',
        remark: '数值型参数或者数值型字段名',
      }, {
        datatypes: ['数值'],
        name: 'number1',
        remark: '数值型参数或者数值型字段名',
      }],
    }],
  },
  {
    type: '日期函数',
    expand: true,
    functions: [{
      name: 'LAST_DAY',
      expression: 'LAST_DAY(date)',
      remark: '返回指定日期的当月最后一天的日期型数据',
      help: 'LAST_DAY(date),date为2012-04-04,则返回2012-04-30对应的日期型对象',
      returntype: '日期',
      params: [{
        datatypes: ['日期'],
        name: 'date',
        remark: '日期型参数或者字段',
      }],
    }, {
      name: 'ADD_DAYS',
      expression: 'ADD_DAYS(date,days)',
      remark: '增加或减去日',
      help: 'ADD_DAYS(date,2),date为2012-04-04,则返回2012-04-06对应的日期对象',
      returntype: '日期',
      params: [{
        datatypes: ['日期'],
        name: 'date',
        remark: '日期型参数或者字段',
      }, {
        datatypes: ['数值'],
        name: 'days',
        remark: '增加的日',
      }],
    }, {
      name: 'ADD_MONTHS',
      expression: 'ADD_MONTHS(date,months)',
      remark: '增加或减去月份',
      help: 'ADD_MONTHS(date,2),date为2012-04-04,则返回2012-06-04对应的日期对象',
      returntype: '日期',
      params: [{
        datatypes: ['日期'],
        name: 'date',
        remark: '日期型参数或者字段',
      }, {
        datatypes: ['数值'],
        name: 'months',
        remark: '增加的月份',
      }],
    }, {
      name: 'ADD_YEARS',
      expression: 'ADD_YEARS(date,years)',
      remark: '增加或减去年份',
      help: 'ADD_YEARS(date,2),date为2012-04-04,则返回2014-04-04对应的日期对象',
      returntype: '日期',
      params: [{
        datatypes: ['日期'],
        name: 'date',
        remark: '日期型参数或者字段',
      }, {
        datatypes: ['数值'],
        name: 'years',
        remark: '增加的年',
      }],
    }, {
      name: 'NOW',
      expression: 'NOW()',
      remark: '得到当前系统的日期',
      help: 'NOW(),例如今天是2012年4月4日,则返回2012-04-04对应的日期对象',
      returntype: '日期',
      params: [],
    }, {
      name: 'TO_DAYS',
      expression: 'TO_DAYS(date)',
      remark: '将日期转化为从0开始的绝对天数',
      help: 'TO_DAYS(date),date为2013-09-04,返回数值735115',
      returntype: '数值',
      params: [{
        datatypes: ['日期'],
        name: 'date',
        remark: '日期型参数或者字段',
      }],
    }, {
      name: 'HOUR',
      expression: 'HOUR(datetime)',
      remark: '获取指定日期时间的小时数',
      help: 'HOUR(datetime),datetime为2013-09-04 13:33:27,返回数值13',
      returntype: '数值',
      params: [{
        datatypes: ['日期'],
        name: 'datetime',
        remark: '日期时间型参数或者字段',
      }],
    }, {
      name: 'MINUTE',
      expression: 'MINUTE(datetime)',
      remark: '获取指定日期时间的分钟数',
      help: 'MINUTE(datetime),datetime为2013-09-04 13:33:27,返回数值33',
      returntype: '数值',
      params: [{
        datatypes: ['日期'],
        name: 'datetime',
        remark: '日期时间型参数或者字段',
      }],
    }, {
      name: 'SECOND',
      expression: 'SECOND(datetime)',
      remark: '获取指定日期时间的秒数',
      help: 'SECOND(datetime),datetime为2013-09-04 13:33:27,返回数值27',
      returntype: '数值',
      params: [{
        datatypes: ['日期'],
        name: 'datetime',
        remark: '日期时间型参数或者字段',
      }],
    }, {
      name: 'DAY',
      expression: 'DAY(date)',
      remark: '获取指定日期的日',
      help: 'DAY(date),date为2013-09-04,返回数值4',
      returntype: '数值',
      params: [{
        datatypes: ['日期'],
        name: 'date',
        remark: '日期型参数或者字段',
      }],
    }, {
      name: 'MONTH',
      expression: 'MONTH(date)',
      remark: '获取指定日期的月',
      help: 'MONTH(date),date为2013-09-04,返回数值9',
      returntype: '数值',
      params: [{
        datatypes: ['日期'],
        name: 'date',
        remark: '日期型参数或者字段',
      }],
    }, {
      name: 'YEAR',
      expression: 'YEAR(date)',
      remark: '获取指定日期的年',
      help: 'YEAR(date),date为2013-09-04,返回数值2013',
      returntype: '数值',
      params: [{
        datatypes: ['日期'],
        name: 'date',
        remark: '日期型参数或者字段',
      }],
    }, {
      name: 'DATE',
      expression: 'DATE(datetime)',
      remark: '获取指定日期时间的日期',
      help: 'DATE(datetime),date为2013-09-04 13:33:27,返回日期2013-09-04',
      returntype: '日期',
      params: [{
        datatypes: ['日期'],
        name: 'datetime',
        remark: '日期型参数或者字段',
      }],
    }, {
      name: 'TIME',
      expression: 'TIME(datetime)',
      remark: '获取指定日期时间的日期',
      help: 'TIME(datetime),date为2013-09-04 13:33:27',
      returntype: '日期',
      params: [{
        datatypes: ['日期'],
        name: 'datetime',
        remark: '日期型参数或者字段',
      }],
    }, {
      name: 'TIMEDIFF',
      expression: 'TIMEDIFF(start_time,end_time)',
      remark: '获取时间秒差数',
      help: 'TIMEDIFF(start_time,end_time),start_time为2017-01-01 13:33:27,2017-01-01 end_time为13:33:47,返回数值20',
      returntype: '数值',
      params: [{
        datatypes: ['日期'],
        name: 'start_time',
        remark: '日期型参数或者字段',
      }, {
        datatypes: ['日期'],
        name: 'end_time',
        remark: '日期时间型参数或者字段',
      }],
    }, {
      name: 'WEEK',
      expression: 'WEEK(date)',
      remark: '获取指定日期为当年的第几周',
      help: 'WEEK(date),date为2011-01-01,返回数值1',
      returntype: '数值',
      params: [{
        datatypes: ['日期'],
        name: 'date',
        remark: '日期型参数或者字段',
      }],
    }, {
      name: 'DAYNAME',
      expression: 'DAYNAME(date)',
      remark: '返回日期的星期名称',
      help: 'DAYNAME(date),date为2013-11-07,返回数值thursday',
      returntype: '字符',
      params: [{
        datatypes: ['日期'],
        name: 'date',
        remark: '日期型参数或者字段',
      }],
    }],
  },
  {
    type: '转换函数',
    expand: true,
    functions: [{
      name: 'DATE_TO_CHAR',
      expression: 'DATE_TO_CHAR(date,format)',
      remark: '将日期转换为格式化的字符串',
      help: 'DATE_TO_CHAR(date,\'%y-%m-%d\'),date为2012-04-04,返回字符串\'2012-04-04\'',
      returntype: '字符',
      params: [{
        datatypes: ['日期'],
        name: 'date',
        remark: '日期型参数或者字段',
      }, {
        datatypes: ['字符'],
        name: 'format',
        remark: '转换格式，如:\'%y%m%d\',\'%y-%m-%d\',\'%y/%m/%d\'',
      }],
    }, {
      name: 'TO_CHAR',
      expression: 'TO_CHAR(number)',
      remark: '将数值转化为相应字符串',
      help: 'TO_CHAR(number),number为299,返回字符串\'299\'',
      returntype: '字符',
      params: [{
        datatypes: ['数值'],
        name: 'number',
        remark: '数值型参数或者字段',
      }],
    }, {
      name: 'TO_DATE',
      expression: 'TO_DATE(text,format)',
      remark: '将日期字符串转化为一个日期',
      help: 'TO_DATE(\'2012-04-04\',\'%y-%m-%d\'),返回对应日期型对象',
      returntype: '日期',
      params: [{
        datatypes: ['字符'],
        name: 'text',
        remark: '日期字符串参数或者字段',
      }, {
        datatypes: ['字符'],
        name: 'format',
        remark: '字串格式，如:\'%y%m%d\',\'%y-%m-%d\',\'%y/%m/%d\'',
      }],
    }, {
      name: 'DATE_TO_LONG',
      expression: 'DATE_TO_LONG(date)',
      remark: '将日期转化为日期毫秒',
      help: 'DATE_TO_LONG(2017-06-20 22:29:52),返回对应日期型对象 1497968992',
      returntype: '数值',
      params: [{
        datatypes: ['日期'],
        name: 'date',
        remark: '日期或者字段',
      }],
    }, {
      name: 'LONG_TO_DATE',
      expression: 'LONG_TO_DATE(millisecond)',
      remark: '将日期毫秒转化为一个日期',
      help: 'LONG_TO_DATE(1497968992),返回对应日期型对象 2017-06-20 22:29:52',
      returntype: '日期',
      params: [{
        datatypes: ['数值'],
        name: 'millisecond',
        remark: '日期毫秒或者字段',
      }],
    }, {
      name: 'TO_NUMBER',
      expression: 'TO_NUMBER(text)',
      remark: '将给出的字符转换为数字',
      help: 'TO_NUMBER(\'0404\'),返回数值404',
      returntype: '数值',
      params: [{
        datatypes: ['字符'],
        name: 'text',
        remark: '字符串或者字符类型的字段名',
      }],
    }, {
      name: 'TO_TIMESTAMP',
      expression: 'TO_TIMESTAMP(text,format)',
      remark: '将给出的字符转换为时间戳',
      help: 'TO_TIMESTAMP(\'2002-10-20-12.00.00.000000\',\'%y-%m-%d %h:%i:%s\'),返回时间2002-10-20-12.00.00.000000',
      returnType: '日期',
      params: [{
        dataTypes: ['字符'],
        name: 'text',
        remark: '字符串或者字符类型的字段名',
      }, {
        datatypes: ['字符'],
        name: 'format',
        remark: '字串格式，如:\'%y%m%d %h:%i:%s\',\'%y-%m-%d %h:%i:%s\',\'%y/%m/%d %h:%i:%s\'',
      }],
    }],
  },
  {
    type: '逻辑函数',
    expand: true,
    functions: [{
      name: 'ISNULL',
      expression: 'ISNULL(check_expression, replacement_value)',
      remark: '使用指定的替换值替换 null',
      help: 'ISNULL(price, 1.00),price为null时返回1.00, 否则返回price',
      params: [{
        datatypes: ['字符', '数值', '日期'],
        name: 'check_expression',
        remark: '将被检查是否为 null的表达式, 可以是任何类型的',
      }, {
        datatypes: ['字符', '数值', '日期'],
        name: 'replacement_value',
        remark: '为 null时将返回的表达式。必须与check_expresssion 具有相同的类型。',
      }],
    }],
  },
];
