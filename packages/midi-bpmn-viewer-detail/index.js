// 导入组件
import midiBpmnViewerDetail from './src/midi-bpmn-viewer-detail'

// 为组件提供 install 安装方法，供按需引入
midiBpmnViewerDetail.install = function (Vue) {
  Vue.component(midiBpmnViewerDetail.name, midiBpmnViewerDetail)
}

// 默认导出组件
export default midiBpmnViewerDetail
