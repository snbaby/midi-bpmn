<template lang="html">
    <div ref="midiBpmnViewer">
    </div>
</template>

<script>
    import BpmnViewer from 'bpmn-js';

    export default {
        name: 'midiBpmnViewer',
        props: {
            data: {
                type: String,
                required: true
            },
            xml: {
                type: String,
                required: false,
                default: "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<bpmn:definitions xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xmlns:bpmn=\"http://www.omg.org/spec/BPMN/20100524/MODEL\" xmlns:bpmndi=\"http://www.omg.org/spec/BPMN/20100524/DI\" xmlns:dc=\"http://www.omg.org/spec/DD/20100524/DC\" xmlns:di=\"http://www.omg.org/spec/DD/20100524/DI\" id=\"Definitions_0fppxr8\" targetNamespace=\"http://bpmn.io/schema/bpmn\"><bpmn:process id=\"midi-bpmn-viewer\" name=\"midi-bpmn-viewer\" isExecutable=\"true\"><bpmn:startEvent id=\"StartEvent_1\" name=\"begin&#10;\"><bpmn:outgoing>SequenceFlow_06149m3</bpmn:outgoing></bpmn:startEvent><bpmn:endEvent id=\"EndEvent_1j5fvk0\"><bpmn:incoming>SequenceFlow_06149m3</bpmn:incoming></bpmn:endEvent><bpmn:sequenceFlow id=\"SequenceFlow_06149m3\" sourceRef=\"StartEvent_1\" targetRef=\"EndEvent_1j5fvk0\" /></bpmn:process><bpmndi:BPMNDiagram id=\"BPMNDiagram_1\"><bpmndi:BPMNPlane id=\"BPMNPlane_1\" bpmnElement=\"midi-bpmn-viewer\"><bpmndi:BPMNShape id=\"_BPMNShape_StartEvent_2\" bpmnElement=\"StartEvent_1\"><dc:Bounds x=\"359\" y=\"223\" width=\"36\" height=\"36\" /><bpmndi:BPMNLabel><dc:Bounds x=\"364\" y=\"266\" width=\"27\" height=\"27\" /></bpmndi:BPMNLabel></bpmndi:BPMNShape><bpmndi:BPMNShape id=\"EndEvent_1j5fvk0_di\" bpmnElement=\"EndEvent_1j5fvk0\"><dc:Bounds x=\"445\" y=\"223\" width=\"36\" height=\"36\" /></bpmndi:BPMNShape><bpmndi:BPMNEdge id=\"SequenceFlow_06149m3_di\" bpmnElement=\"SequenceFlow_06149m3\"><di:waypoint x=\"395\" y=\"241\" /><di:waypoint x=\"445\" y=\"241\" /></bpmndi:BPMNEdge></bpmndi:BPMNPlane></bpmndi:BPMNDiagram></bpmn:definitions>"
            },
            height: {
                type: Number,
                required: false,
                default: 400
            }
        },
        data() {
            return {
                viewer: null
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
                this.axios(
                    {
                        url: '/api/bpm/process-definition/xml',
                        method: 'post',
                        data: {"process-definition-id":"Process_1:1719:187453"}
                    }
                ).then(res=>{
                    console.log('dd',res)
                }).catch(err =>{
                    console.log(err)
                })
                console.log('processDefId', this.date)
                const self = this;
                this.$refs.midiBpmnViewer.innerHTML = '';
                self.viewer = new BpmnViewer({
                    container: this.$refs.midiBpmnViewer,
                    height: self.height,
                    width: '100%'
                })
                self.viewer.importXML(self.xml, err => {
                    document
                        .getElementsByClassName('bjs-container')[0]
                        .removeChild(document.getElementsByClassName('bjs-powered-by')[0]); // 移除logo
                    if (err) {
                        console.error('midiBpmnViewer', err)
                    }

                    const canvas = self.viewer.get('canvas')
                    canvas.zoom('fit-viewport', 'auto')
                })
            }
        },
        mounted() {
            this.init()
        }
    }
</script>

<style lang="scss" scoped>
</style>
