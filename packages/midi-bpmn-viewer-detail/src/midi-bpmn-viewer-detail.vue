<template lang="html">
    <a-spin :spinning="spinning" :tip="tip">
        <div  v-if="errMessage.length > 0">
            {{errMessage}}
        </div>
        <div v-else class="spin-content" ref="midiBpmnViewerDetail">
        </div>
    </a-spin>
</template>

<script>
    //import BpmnViewer from 'bpmn-js';

    export default {
        name: 'midiBpmnViewerDetail',
        props: {
            data: {
                type: String,
                required: true
            },
            tip:{
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
                    url: '/api/json/get',
                    method: 'post',
                    data: {
                        "ACT_HI_ACTINST:ACT_HI_ACTINST[]": {
                            '@column': '*',
                            'PROC_INST_ID_':self.data
                        }
                    }
                }
                self.axios(req).then(res=>{
                    console.log(res)
                    /*self.viewer = new BpmnViewer({
                        container: self.$refs.midiBpmnViewer,
                        height: self.height,
                        width: '100%'
                    })
                    self.viewer.importXML(res.data.bpmn20Xml, err => {
                        document
                            .getElementsByClassName('bjs-container')[0]
                            .removeChild(document.getElementsByClassName('bjs-powered-by')[0]); // 移除logo
                        if (!err) {
                            const canvas = self.viewer.get('canvas')
                            canvas.zoom('fit-viewport', 'auto')
                        }else{
                            console.log(err)
                        }

                        self.spinning = false;
                    })*/
                }).catch(err =>{
                    console.log('err', err)
                    self.spinning = false;
                    if(err && err.response && err.response.data && err.response.data.message){
                        self.errMessage = err.response.data.message
                    }else{
                        self.errMessage = '加载异常,请联系管理员进行处理'
                    }
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
</style>
