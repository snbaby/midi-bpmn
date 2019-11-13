<template>
    <div id="app">
        <midi-bpmn-viewer :data="processDefId"></midi-bpmn-viewer>
    </div>
</template>

<script>

    export default {
        name: 'app',
        components: {
        },
        data() {
            return {
                color: '#ff0000',
                processDefId: ''
            }
        },
        methods: {
            headleChangeColor() {
                console.log('颜色改变')
            }
        },
        created() {
            setTimeout(() => {
                this.processDefId = 'Process_1:1719:187453'
            }, 2000)
        }
    }
</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }
</style>
