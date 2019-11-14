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
                errMessage: ''
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
                                    'PROC_INST_ID_': self.data
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
                    }
                    self.spinning = false;
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
</style>
