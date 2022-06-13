import * as net from 'net'
import * as readline from 'readline'

const readLine = readline.createInterface({
    input:process.stdin,
    output:process.stdout
})
let username:string = ''
let i = 0
const client = new net.Socket()
client.connect(2800,'localhost',()=>{
    console.log("conexão realizada - cliente")
    console.log("Digite seu usuário")
    readLine.addListener('line',line =>{
        if(line == "sair"){
            client.end()
            readLine.close()
            return
        }
        if(i == 0){
            let obj = {
                username:line,
                body:null
            }
            username = line
            client.write(JSON.stringify(obj))

        }
        if(i == 1){
            let obj = {
                username:username,
                body:line
            }
            client.write(JSON.stringify(obj))
        }
        i = 1
    })

})
client.on("data",data=>{
    console.log(data.toString())
})