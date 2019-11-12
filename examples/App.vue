<template>
    <div id="app">
        <midi-bpmn-viewer ></midi-bpmn-viewer>
    </div>
</template>

<script>

    export default {
        name: 'app',
        components: {
        },
        data() {
            return {
                color: '#ff0000'
            }
        },
        methods: {
            headleChangeColor() {
                console.log('颜色改变')
            }
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
