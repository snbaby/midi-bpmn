module.exports = {
    // 修改 src 为 examples
    pages: {
        index: {
            entry: 'examples/main.js',
            template: 'public/index.html',
            filename: 'index.html'
        }
    },
    // 扩展 webpack 配置，使 packages 加入编译
    chainWebpack: config => {
        config.module
            .rule('js')
            .include
            .add('/packages')
            .end()
            .use('babel')
            .loader('babel-loader')
            .tap(options => {
                // 修改它的选项...
                return options
            })
    },
    devServer: {
        // development server port 8000
        port: 8000,
        proxy: {
            '/api/bpm/process-definition': {
                target: 'http://192.168.2.215:8786',
                changeOrigin: true,
                headers: {
                    Authorization:'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiIxODYwMDkiLCJleHBpcmVUaW1lIjozMTQwODQ5MjI1MDAwLCJhdXRoIjoiaW8udmVydHguZXh0LmF1dGguamRiYy5pbXBsLkpEQkNBdXRoSW1wbEA2Yzc3OTEwZCIsInBlcm1pc3Npb25zIjpbInJvbGU6c2VjcmV0VXNlciIsInJvbGU6amNqcyJdLCJpc3MiOiJtaWRpLWFzbSIsIm5pY2tuYW1lIjoiJUU4JUE5JUI5JUU2JUI1JUE5IiwiZXhwIjoxNTczODEyODMxLCJqdGkiOiIxODYwMDkifQ.hUlL48_wbxhsl_HGmXAXJAK_zHcF5nDCuVfdk0XlFbbFKpVNTF8jGOhsIGyfF3qosTL2N65o3c6kH7KNUuDtbxN8sRcoIZfXdanI2FKM89HUpUGUS4pBg5jnxNhddH-XzzDqCc6lMwiIo3EvW8KZWCLMt9PcdPVMJ5pTTrwiop1h4rvkxrRm83eouBrT-qYimZPPyUb503HJiQzzi-XeTIqb5Fa-DfOtpPizkVi5CUiHGH8aLuOiC6_UZXnbvt_vQXPQhvz8jNOCCkclJD6qT_R0W9cXKmjVO9HKmvVnrxBkg_F7WBMwp99PaFmHI4mdllSVH_hkdkaB8ON-aE7SlA'
                },
                pathRewrite: { '^/api/bpm': '/bpm' }
            },
            '/api/json/get': {
                target: 'http://192.168.2.215:6331',
                changeOrigin: true,
                headers: {
                    Authorization:'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiIxODYwMDkiLCJleHBpcmVUaW1lIjozMTQwODQ5MjI1MDAwLCJhdXRoIjoiaW8udmVydHguZXh0LmF1dGguamRiYy5pbXBsLkpEQkNBdXRoSW1wbEA2Yzc3OTEwZCIsInBlcm1pc3Npb25zIjpbInJvbGU6c2VjcmV0VXNlciIsInJvbGU6amNqcyJdLCJpc3MiOiJtaWRpLWFzbSIsIm5pY2tuYW1lIjoiJUU4JUE5JUI5JUU2JUI1JUE5IiwiZXhwIjoxNTczODEyODMxLCJqdGkiOiIxODYwMDkifQ.hUlL48_wbxhsl_HGmXAXJAK_zHcF5nDCuVfdk0XlFbbFKpVNTF8jGOhsIGyfF3qosTL2N65o3c6kH7KNUuDtbxN8sRcoIZfXdanI2FKM89HUpUGUS4pBg5jnxNhddH-XzzDqCc6lMwiIo3EvW8KZWCLMt9PcdPVMJ5pTTrwiop1h4rvkxrRm83eouBrT-qYimZPPyUb503HJiQzzi-XeTIqb5Fa-DfOtpPizkVi5CUiHGH8aLuOiC6_UZXnbvt_vQXPQhvz8jNOCCkclJD6qT_R0W9cXKmjVO9HKmvVnrxBkg_F7WBMwp99PaFmHI4mdllSVH_hkdkaB8ON-aE7SlA'
                },
                pathRewrite: { '^/api/json/get': '/json/get/box02/json/sql' }
            }
        }
    }
}
