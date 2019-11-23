// 导入组件
import midiBpmnModeler from './src/midi-bpmn-modeler'

// 为组件提供 install 安装方法，供按需引入
midiBpmnModeler.install = function (Vue) {
  Vue.component(midiBpmnModeler.name, midiBpmnModeler)
}

// 默认导出组件
export default midiBpmnModeler
