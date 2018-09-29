import Server from "./server";

let port = 4000

const server = new Server(port)
server.start(port)