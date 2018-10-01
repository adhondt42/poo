import {createConnection} from 'mysql';

let connection = createConnection({
    host: '192.168.99.100',
    password: 'root',
    database: 'monopolesql',
    user: 'root',
})

connection.connect()

export {connection}



//     VM: '192.168.99.100',
// container : IP:172.17.0.2 || Gateway:172.17.0.1