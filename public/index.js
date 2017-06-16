console.log(11);


//如果你希望javascript也使用HMR，一个简单的做法是在entry文件内添加以下代码
if (module.hot) {
    module.hot.accept();
}