// 导入组件
import midiBpmnViewer from './src/midi-bpmn-viewer'

// 为组件提供 install 安装方法，供按需引入
midiBpmnViewer.install = function (Vue) {
  Vue.component(midiBpmnViewer.name, midiBpmnViewer)
}

// 默认导出组件
export default midiBpmnViewer
