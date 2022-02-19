<template>
  <q-page class="row q-pa-sm">
    <div class="col column q-pa-xs">
      <q-card class="col column">
        <div class="col containers" ref="canvas" />
      </q-card>
    </div>
    <panel ref="panel" class="col-2 column" v-if="bpmnModeler" :formData.sync="formData" :modeler="bpmnModeler" :flowDef.sync="flowDef" />
  </q-page>
</template>

<script>
import BpmnModeler from 'bpmn-js/lib/Modeler'; // bpmn-js 设计器
import panel from './propertypanel'; // 属性面板
import BpmData from './bpmdata';

export default {
  components: {
    panel,
  },
  props: {
    formData: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      bpmnModeler: null,
      element: null,
      bpmData: new BpmData(),
      flowDef: {
        id: '',
        flowType: '',
        nodes: '',
      },
    };
  },
  mounted() {
    const { canvas } = this.$refs;
    // 生成实例
    this.bpmnModeler = new BpmnModeler({
      container: canvas,
    });

    // 监听流程图改变事件
    const me = this;
    this.bpmnModeler.on('commandStack.changed', (a, b, c) => {
      this.bpmnModeler.saveXML({ format: true }, (err, xml) => {
        me.flowDef.nodes = err ? null : xml;
      });
    });
  },
  methods: {
    assignFormData() {
    },
    init() {
      this.loadDiagram();
    },
    loadDiagram() {
      this.$axios.get(`/flow/def/queryById?id=${this.$route.query.id}`).then(({ result }) => {
        if (result) {
          // 直接覆盖会引起对象传递失效，只能采用属性赋值
          this.flowDef.id = result.id;
          this.flowDef.flowType = result.flowType;
          this.flowDef.nodes = result.nodes;
          this.$refs.panel.init();
          // 将字符串转换成图显示出来
          this.bpmnModeler.importXML(this.flowDef.nodes, (err) => {
            if (!err) {
              this.adjustPalette();
            }
          });
        } else {
          const bpmnXmlStr = `
          <?xml version="1.0" encoding="UTF-8"?>
            <bpmn2:definitions xmlns:bpmn2="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:di="http://www.omg.org/spec/DD/20100524/DI" id="sample-diagram" targetNamespace="http://bpmn.io/schema/bpmn" xsi:schemaLocation="http://www.omg.org/spec/BPMN/20100524/MODEL BPMN20.xsd">
              <bpmn2:process id="process1567044459787" name="流程1567044459787">
                <bpmn2:documentation>描述</bpmn2:documentation>
                <bpmn2:startEvent id="StartEvent_01ydzqe" name="开始">
                  <bpmn2:outgoing>SequenceFlow_1qw929z</bpmn2:outgoing>
                </bpmn2:startEvent>
                <bpmn2:endEvent id="EndEvent_0pnmjd3">
                  <bpmn2:incoming>SequenceFlow_0h8za82</bpmn2:incoming>
                </bpmn2:endEvent>
                <bpmn2:sequenceFlow id="SequenceFlow_0h8za82" sourceRef="ExclusiveGateway_1sq33g6" targetRef="EndEvent_0pnmjd3" />
              </bpmn2:process>
              <bpmndi:BPMNDiagram id="BPMNDiagram_1">
                <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="process1567044459787">
                  <bpmndi:BPMNShape id="StartEvent_01ydzqe_di" bpmnElement="StartEvent_01ydzqe">
                    <dc:Bounds x="232" y="291" width="36" height="36" />
                    <bpmndi:BPMNLabel>
                      <dc:Bounds x="239" y="272" width="22" height="14" />
                    </bpmndi:BPMNLabel>
                  </bpmndi:BPMNShape>
                  <bpmndi:BPMNShape id="EndEvent_0pnmjd3_di" bpmnElement="EndEvent_0pnmjd3">
                    <dc:Bounds x="832" y="272" width="36" height="36" />
                  </bpmndi:BPMNShape>
                </bpmndi:BPMNPlane>
              </bpmndi:BPMNDiagram>
            </bpmn2:definitions>
          `;
          // 将字符串转换成图显示出来
          this.bpmnModeler.importXML(bpmnXmlStr, (err) => {
            if (!err) {
              this.adjustPalette();
            }
          });
          this.$refs.panel.init();
        }
      });
    },
    save() {
      this.flowDef.id = this.$route.query.id;
      if (!this.flowDef.flowType) {
        this.$warn('请选择工作流类型！');
        return;
      }
      this.$q.loading.show();
      this.$axios.post('/flow/def/save', this.flowDef).then((r) => {
        this.$q.notify(r.message);
      }).finally(() => {
        this.$q.loading.hide();
      });
    },
    // 调整左侧工具栏排版
    adjustPalette() {
      // 获取 bpmn 设计器实例
      const { canvas } = this.$refs;
      const djsPalette = canvas.children[0].children[1].children[4];
      const djsPalStyle = {
        width: '130px',
        padding: '5px',
        background: 'white',
        left: '20px',
        borderRadius: 0,
      };
      Object.keys(djsPalStyle).forEach((key) => {
        djsPalette.style[key] = djsPalStyle[key];
      });
      const palette = djsPalette.children[0];
      const allGroups = palette.children;
      // 修改控件样式

      Object.keys(allGroups).forEach((gKey) => {
        const group = allGroups[gKey];
        Object.keys(group.children).forEach((cKey) => {
          const control = group.children[cKey];
          const controlStyle = {
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
            width: '100%',
            padding: '5px',
          };
          if (control.className && control.dataset && control.className.indexOf('entry') !== -1) {
            const controlProps = this.bpmData.getControl(
              control.dataset.action,
            );
            control.innerHTML = `<div style='font-size: 14px;font-weight:500;margin-left:15px;'>${
              controlProps.title
            }</div>`;
            Object.keys(controlStyle).forEach((csKey) => {
              control.style[csKey] = controlStyle[csKey];
            });
            if (controlProps.display) {
              control.style.display = controlProps.display;
            }
          }
        });
      });
    },
  },
  beforeDestroy() {
    this.assignFormData();
  },
};
</script>
<style lang="stylus">
/* 左边工具栏以及编辑节点的样式 */
@import '~src/css/bpmn/diagram-js.css'
@import '~src/css/bpmn/bpmn-font/css/bpmn.css'
@import '~src/css/bpmn/bpmn-font/css/bpmn-codes.css'
@import '~src/css/bpmn/bpmn-font/css/bpmn-embedded.css'

.containers
  .bjs-powered-by
    display none
</style>
