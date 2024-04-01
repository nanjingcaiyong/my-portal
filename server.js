const express = require('express');
const path = require('path');
const app = express();

// 静态文件
app.use(express.static(path.resolve(__dirname, 'dist')));

// 路由重定向
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
});

// 启动服务器
app.listen(5173, () => {
    console.log('Server is running on http://localhost:5173');
});
