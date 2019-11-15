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
                    Authorization:'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiIxODYwMDkiLCJleHBpcmVUaW1lIjozMTQwODQ5MjI1MDAwLCJhdXRoIjoiaW8udmVydHguZXh0LmF1dGguamRiYy5pbXBsLkpEQkNBdXRoSW1wbEA3MTc3YTQ0MiIsInBlcm1pc3Npb25zIjpbInJvbGU6c2VjcmV0VXNlciIsInJvbGU6amNqcyJdLCJpc3MiOiJtaWRpLWFzbSIsIm5pY2tuYW1lIjoiJUU4JUE5JUI5JUU2JUI1JUE5IiwiZXhwIjoxNTczOTA1NTU5LCJqdGkiOiIxODYwMDkifQ.dcs_RKX_4B_OVd8s2DtLwPCxXlrYo40Vlmp_IfYYLNKCQpBhYWl1fw0GjNVEC_3eJjF6lBwjCbMMpefynrG-SE2OXqYVhqIfCNWp4WKgsnI1-yV2z-7O5j7Sc4fe5y_avnHDukZXr5HjWr2YQfhNKd18jHqNKdpvgtEcVhg-cx_fED8ouv10iIKyNGsYxPgokVZgtFLGQITSyWu2pGvETmOPIYTpf31W0G4MWvxYpTozUeTxaPmOUeqxxXMDy9CABMjPejJk_y8lfOL7NZhMWhYVpwSo5hobenmmf9OX04gV5UnqTuoKjGKKXoF9wQ8T3Yyro9TSQjNOl7Fg0DIMlw'
                },
                pathRewrite: { '^/api/bpm': '/bpm' }
            },
            '/api/json/get': {
                target: 'http://192.168.2.215:6331',
                changeOrigin: true,
                headers: {
                    Authorization:'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiIxODYwMDkiLCJleHBpcmVUaW1lIjozMTQwODQ5MjI1MDAwLCJhdXRoIjoiaW8udmVydHguZXh0LmF1dGguamRiYy5pbXBsLkpEQkNBdXRoSW1wbEA3MTc3YTQ0MiIsInBlcm1pc3Npb25zIjpbInJvbGU6c2VjcmV0VXNlciIsInJvbGU6amNqcyJdLCJpc3MiOiJtaWRpLWFzbSIsIm5pY2tuYW1lIjoiJUU4JUE5JUI5JUU2JUI1JUE5IiwiZXhwIjoxNTczOTA1NTU5LCJqdGkiOiIxODYwMDkifQ.dcs_RKX_4B_OVd8s2DtLwPCxXlrYo40Vlmp_IfYYLNKCQpBhYWl1fw0GjNVEC_3eJjF6lBwjCbMMpefynrG-SE2OXqYVhqIfCNWp4WKgsnI1-yV2z-7O5j7Sc4fe5y_avnHDukZXr5HjWr2YQfhNKd18jHqNKdpvgtEcVhg-cx_fED8ouv10iIKyNGsYxPgokVZgtFLGQITSyWu2pGvETmOPIYTpf31W0G4MWvxYpTozUeTxaPmOUeqxxXMDy9CABMjPejJk_y8lfOL7NZhMWhYVpwSo5hobenmmf9OX04gV5UnqTuoKjGKKXoF9wQ8T3Yyro9TSQjNOl7Fg0DIMlw'
                },
                pathRewrite: { '^/api/json/get': '/json/get/box02/json/sql' }
            }
        }
    }
}
