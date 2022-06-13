Here we have a sockets application made in node ( TS + <a href="(https://nodejs.org/api/net.html)">net module</a>). A small chat was made for real-time communication between two customers.

How to use:
On your machine, run the server.ts file first (you can use the <a href="https://www.npmjs.com/package/ts-node">'ts-node server.ts'</a> command). ready, your server is already live on port 2800

Then run the client applications (you can use the command <a href="https://www.npmjs.com/package/ts-node">'ts-node client.ts'</a>). Okay, your client will be listening to the server on port 2800, so just start sending messages. 
You can run multiple terminals with multiple clients to test.
if you want to go out with a client, just type 'go out'. When there are no more clients in the broadcast list, the server is closed.
