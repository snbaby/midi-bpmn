<template lang="html">
    <a-spin :spinning="spinning" :tip="tip">
        <div v-if="errMessage.length > 0">
            {{errMessage}}
        </div>
        <div v-else class="spin-content" ref="midiBpmnViewer">
        </div>
    </a-spin>
</template>

<script>
    import BpmnViewer from 'bpmn-js';
    import {processError} from './../../midi-bpmn-util/util'

    export default {
        name: 'midiBpmnViewer',
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
        computed: {},
        methods: {
            init() {
                const self = this;
                self.spinning = true;
                self.errMessage = '';
                const req = {
                    url: '/api/bpm/process-definition/xml',
                    method: 'post',
                    data: {
                        "process-definition-id": self.data
                    }
                }
                self.axios(req).then(res => {
                    self.viewer = new BpmnViewer({
                        container: self.$refs.midiBpmnViewer,
                        height: self.height,
                        width: '100%'
                    })
                    self.viewer.importXML(res.bpmn20Xml, err => {
                        self.$refs.midiBpmnViewer
                            .getElementsByClassName('bjs-container')[0]
                            .removeChild(self.$refs.midiBpmnViewer.getElementsByClassName('bjs-powered-by')[0]); // 移除logo
                        if (err) {
                            console.error('解析流程定义XML失败', err)
                            processError(self, '解析流程定义XML失败')
                        } else {
                            const canvas = self.viewer.get('canvas')
                            canvas.zoom('fit-viewport', 'auto')
                        }
                        self.spinning = false;
                    })
                }).catch(err => {
                    console.error('获取流程定义XML失败', err)
                    processError(self, '获取流程定义XML失败')
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
</style>
