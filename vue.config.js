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
                    Authorization:'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiIxODkwNDkiLCJleHBpcmVUaW1lIjozMTQwODQ5MjI1MDAwLCJhdXRoIjoiaW8udmVydHguZXh0LmF1dGguamRiYy5pbXBsLkpEQkNBdXRoSW1wbEAyMTE2ZTEyMyIsInBlcm1pc3Npb25zIjpbInJvbGU6c2VjcmV0VXNlciIsInJvbGU6YWRtaW5pc3RyYXRvciIsInJvbGU6c2VjdXJpdHkiLCJyb2xlOmF1ZGl0b3IiLCJyb2xlOmpjanMiXSwiaXNzIjoibWlkaS1hc20iLCJuaWNrbmFtZSI6IiVFNSU4OCU5OCVFNiVBRiU4NSIsImV4cCI6MTU3MzczNzQ3OCwianRpIjoiMTg5MDQ5In0.x8yZozE0H43ynkqUYY3LN6lmVsuE8R8DKuxgD7FMPrBgfq5h60IEbUcmjSBovw0NFZq86uzW_8Wu2aUfwLVCfY6HQBneG3N5VAFIdi8mtcEoSw6cC3cJiHy7pEYbxMMFbkeawrlKM5n1M2okJzEMv2fecqz8dSE258T-wgjq5_cqnN9z-WfH_b0Y6aY82OwolsMNESemAxP7k1XswHOjrdnYu0ohvf5dteL7LC2t7KUsLyo5iXefdrxmfLB9cbG7W8Qs9m-jc2ZGEezFXk70dfxRhaAk9CmZB_LAZM9wkngwWEdU0z-x9dqRVgnHVgy4b6niHoGwlpJqFPU5Um_GRw'
                },
                pathRewrite: { '^/api/bpm': '/bpm' }
            },
            '/api/json/get': {
                target: 'http://192.168.2.215:6331',
                changeOrigin: true,
                headers: {
                    Authorization:'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiIxODkwNDkiLCJleHBpcmVUaW1lIjozMTQwODQ5MjI1MDAwLCJhdXRoIjoiaW8udmVydHguZXh0LmF1dGguamRiYy5pbXBsLkpEQkNBdXRoSW1wbEAyMTE2ZTEyMyIsInBlcm1pc3Npb25zIjpbInJvbGU6c2VjcmV0VXNlciIsInJvbGU6YWRtaW5pc3RyYXRvciIsInJvbGU6c2VjdXJpdHkiLCJyb2xlOmF1ZGl0b3IiLCJyb2xlOmpjanMiXSwiaXNzIjoibWlkaS1hc20iLCJuaWNrbmFtZSI6IiVFNSU4OCU5OCVFNiVBRiU4NSIsImV4cCI6MTU3MzczNzQ3OCwianRpIjoiMTg5MDQ5In0.x8yZozE0H43ynkqUYY3LN6lmVsuE8R8DKuxgD7FMPrBgfq5h60IEbUcmjSBovw0NFZq86uzW_8Wu2aUfwLVCfY6HQBneG3N5VAFIdi8mtcEoSw6cC3cJiHy7pEYbxMMFbkeawrlKM5n1M2okJzEMv2fecqz8dSE258T-wgjq5_cqnN9z-WfH_b0Y6aY82OwolsMNESemAxP7k1XswHOjrdnYu0ohvf5dteL7LC2t7KUsLyo5iXefdrxmfLB9cbG7W8Qs9m-jc2ZGEezFXk70dfxRhaAk9CmZB_LAZM9wkngwWEdU0z-x9dqRVgnHVgy4b6niHoGwlpJqFPU5Um_GRw'
                },
                pathRewrite: { '^/api/json/get': '/json/get/box02/json/sql' }
            }
        }
    }
}
