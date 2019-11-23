<template lang="html">
    <a-spin :spinning="spinning" :tip="tip">
        <div v-if="errMessage.length > 0">
            {{errMessage}}
        </div>
        <div v-else class="spin-content" ref="midiBpmnModeler">
        </div>
    </a-spin>
</template>

<script>

    export default {
        name: 'midiBpmnModeler',
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
            }
        }
    }
</script>

<style lang="scss" scoped>
</style>
