import * as net from 'net'

let usernames:string[] = [] 
let sockets:net.Socket[] = []

const server = net.createServer(socket => {
  socket.on("connect",()=>{
    console.log("alguem se conectou")

  })
  socket.on('end',()=>{
    let username = usernames[sockets.indexOf(socket)]
    sockets.forEach(user=>{
      if(user != socket)
        user.write(username + " desconectou")
      else
        socket.write("Você se desconectou")
    })
    usernames = removeFromArray(usernames,usernames[sockets.indexOf(socket)])
    sockets = removeFromArray(sockets,socket)
    socket.end()
    if(usernames.length == 0){
      server.close()
    }
  })
  
  socket.on('data',data=>{
    if(data?.toString() != undefined && data.toString() != "[object Object]"){
      let a = {
        username:JSON.parse(data.toString()).username,
        body:JSON.parse(data.toString()).body
      }
      if(!a.body){
        sockets.push(socket)
        usernames.push(a.username)
        sockets.forEach(user=>{
          user.write(a.username.toUpperCase() + " entrou no chat")
        })
        socket.write("\nDigite 'sair' para encerrar sua conexão")
      }
      
      for(let index in usernames){
        if(usernames[index] == a.username && a.body){
          sockets.forEach(user=>{
            if(user != socket)
              user.write(a.username.toUpperCase() + " falou: " + a.body)
          })
        }
      }
    }
    
  })
}).on('error', (err) => {
  throw err;
});
server.listen(2800,'localhost')

function removeFromArray(list:any[], item:any){
  if(typeof list[0] != typeof item){
    console.log(typeof list[0],list,typeof item,item)
    throw new Error("Diferents types")
  }
  let auxList:any[] = []
  list.forEach(itemInList=>{
    if(itemInList != item){
      auxList.push(itemInList)
    }
  })
  return auxList
}
