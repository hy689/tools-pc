const {execSync} = require('child_process')


async function deploy() {
    try {
        process.chdir('/code/tools')
        console.log('当前目录：', process.cwd())
        execSync('git pull', { stdio: 'inherit' })
        console.log('git pull 执行完成')
        execSync('npm run build', { stdio: 'inherit' })
        console.log('npm run build 执行完成')
        execSync('rm -rf /usr/share/nginx/html/*')
        console.log('删除 /usr/share/nginx/html/* 执行完成')
        execSync('cp -rf dist/* /usr/share/nginx/html/')
        console.log('cp -rf dist/* /usr/share/nginx/html/ 执行完成')
        execSync('systemctl restart nginx')
        console.log('重启nginx')
        

    } catch (error) {
        console.error(`exec error: ${error}`)
        
    }
}

deploy()