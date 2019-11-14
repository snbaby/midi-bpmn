<template lang="html">
    <a-spin :spinning="spinning" :tip="tip">
        <div v-if="errMessage.length > 0">
            {{errMessage}}
        </div>
        <div v-else class="spin-content" ref="midiBpmnViewerDetail">
        </div>
    </a-spin>
</template>

<script>
    import BpmnViewer from 'bpmn-js';
    import {processError} from './../../midi-bpmn-util/util'

    const async = require("async");

    export default {
        name: 'midiBpmnViewerDetail',
        props: {
            data: {
                type: String,
                required: true
            },
            tip: {
                type: String,
                required: false,
                default: 'loading...'
            },
            height: {
                type: Number,
                required: false,
                default: 400
            }
        },
        data() {
            return {
                viewer: null,
                spinning: true,
                errMessage: '',

                element: null,
                overlayId: null
            }
        },
        watch: {
            data(val) {
                if (val.trim().length > 0) {
                    this.init()
                }
            }
        },
        methods: {
            init() {
                const self = this;
                self.spinning = true;
                self.errMessage = '';
                async.waterfall([
                    function (callback) {
                        const req = {
                            url: '/api/json/get',
                            method: 'post',
                            data: {
                                "ACT_HI_ACTINST:ACT_HI_ACTINST[]": {
                                    '@column': '*',
                                    'PROC_INST_ID_': self.data,
                                    '@order': 'SEQUENCE_COUNTER_+'
                                }
                            }
                        }
                        self.axios(req).then(res => {
                            if (res.status == 200) {
                                if (res.ACT_HI_ACTINST && res.ACT_HI_ACTINST.length > 0) {
                                    callback(null, res.ACT_HI_ACTINST)
                                } else {
                                    console.error('当前实例不存在', res)
                                    callback('当前实例不存在')
                                }
                            } else {
                                console.error('获取活动ACT_HI_ACTINST失败', res)
                                callback('获取活动ACT_HI_ACTINST失败')
                            }
                        }).catch(err => {
                            console.error('访问/api/json/get失败', err)
                            callback('访问/api/json/get失败')
                        })
                    },
                    function (ACT_HI_ACTINST, callback) {
                        const req = {
                            url: '/api/bpm/process-definition/xml',
                            method: 'post',
                            data: {
                                "process-definition-id": ACT_HI_ACTINST[0].procDefId_
                            }
                        }
                        self.axios(req).then(res => {
                            callback(null, {
                                xml: res.bpmn20Xml,
                                ACT_HI_ACTINST: ACT_HI_ACTINST
                            })
                        }).catch(err => {
                            console.error('获取流程定义失败', err)
                            callback('获取流程定义失败')
                        })
                    }
                ], function (err, result) {
                    if (err) {
                        processError(self, err)
                    } else {
                        self.ACT_HI_ACTINST = result.ACT_HI_ACTINST
                        self.xml = result.xml
                        self.renderViewer()
                    }
                });
            },
            renderViewer() {
                const self = this
                self.viewer = new BpmnViewer({
                    container: self.$refs.midiBpmnViewerDetail,
                    height: self.height,
                    width: '100%'
                })
                self.viewer.importXML(self.xml, err => {
                    self.$refs.midiBpmnViewerDetail
                        .getElementsByClassName('bjs-container')[0]
                        .removeChild(self.$refs.midiBpmnViewerDetail.getElementsByClassName('bjs-powered-by')[0]); // 移除logo
                    if (err) {
                        console.error('解析流程定义XML失败', err)
                        processError(self, '解析流程定义XML失败')
                    } else {
                        const canvas = self.viewer.get('canvas')
                        canvas.zoom('fit-viewport', 'auto')

                        const eventBus = self.viewer.get('eventBus')
                        const events = ['element.click']

                        events.forEach(function(event) {
                            eventBus.on(event, function(e) {
                                self.$emit('cb', e.element);//回传点击事件
                            })
                        })
                        self.renderMarker()
                    }
                })
            },
            renderMarker(){
                const self = this
                const canvas = self.viewer.get('canvas')
                self.ACT_HI_ACTINST.forEach(item=>{
                    if (item.actType_ === 'parallelGateway') {
                        canvas.addMarker(item.actId_, 'complete')
                        return
                    }

                    if (item.actInstState_ === 0) {
                        canvas.addMarker(item.actId_, 'todo')
                    } else if (item.actInstState_ === 1) {
                        canvas.addMarker(item.actId_, 'over')
                    } else if (item.actInstState_ === 2) {
                        canvas.addMarker(item.actId_, 'terminal')
                    } else if (item.actInstState_ === 4) {
                        canvas.addMarker(item.actId_, 'complete')
                    } else {
                        canvas.addMarker(item.actId_, 'other')
                    }
                })
                self.spinning = false
            }
        }
    }
</script>

<style lang="scss">
    .diagram-note {
        width: 400px;
        background-color: white;
        -moz-box-shadow: 2px 2px 10px #909090;
        -webkit-box-shadow: 2px 2px 10px #909090;
        box-shadow: 2px 2px 10px #909090;

        .ant-form-item {
            margin-bottom: 0px !important;
        }

        .ant-row {
            height: 20px !important;
        }
        .ant-form-item-label {
            line-height: 20px !important;
        }

        .ant-form-item-control {
            line-height: 20px !important;
        }
    }

    .todo:not(.djs-connection) .djs-visual > :nth-child(1) {
        stroke: #b7eb8f !important; /* color elements as red */
        fill: #f6ffed !important; /* color elements as red */
        fill-opacity: 0.5 !important;
    }
    .todo:not(.djs-connection) .djs-visual > :nth-child(2) {
        fill: #52c41a !important; /* color elements as red */
    }
    .over:not(.djs-connection) .djs-visual > :nth-child(1) {
        stroke: #91d5ff !important; /* color elements as red */
        fill: #e6f7ff !important; /* color elements as red */
        fill-opacity: 0.5 !important;
    }
    .over:not(.djs-connection) .djs-visual > :nth-child(2) {
        fill: #1890ff !important; /* color elements as red */
    }

    .terminal:not(.djs-connection) .djs-visual > :nth-child(1) {
        stroke: #ffa39e !important; /* color elements as red */
        fill: #fff1f0 !important; /* color elements as red */
        fill-opacity: 0.5 !important;
    }
    .terminal:not(.djs-connection) .djs-visual > :nth-child(2) {
        fill: #f5222d !important; /* color elements as red */
    }

    .complete:not(.djs-connection) .djs-visual > :nth-child(1) {
        stroke: #87e8de !important; /* color elements as red */
        fill: #e6fffb !important; /* color elements as red */
        fill-opacity: 0.5 !important;
    }
    .complete:not(.djs-connection) .djs-visual > :nth-child(2) {
        fill: #13c2c2 !important; /* color elements as red */
    }
    .other:not(.djs-connection) .djs-visual > :nth-child(1) {
        stroke: #ffd591 !important; /* color elements as red */
        fill: #fff7e6 !important; /* color elements as red */
        fill-opacity: 0.5 !important;
    }
    .other:not(.djs-connection) .djs-visual > :nth-child(2) {
        fill: #fa8c16 !important; /* color elements as red */
    }
</style>
