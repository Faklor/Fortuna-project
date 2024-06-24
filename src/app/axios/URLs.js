// import {networkInterfaces} from 'os'

//let IP = '192.168.10.102'
let IP = 'localhost'
// async function getIPadress(){
//     const nets = networkInterfaces()
//     const results = Object.create(null) // Or just '{}', an empty object
    
//     for (const name of Object.keys(nets)) {
//         for (const net of nets[name]) {
//             // Skip over non-IPv4 and internal (i.e. 127.0.0.1) addresses
//             // 'IPv4' is in Node <= 17, from 18 it's a number 4 or 6
//             const familyV4Value = typeof net.family === 'string' ? 'IPv4' : 4
//             if (net.family === familyV4Value && !net.internal) {
//                 if (!results[name]) {
//                     results[name] = []
//                 }
//                 results[name].push(net.address)
//             }
//         }
//     }
//     let keys = Object.keys(results)
//     IP = results[`${keys[1]}`].join('')
    
    
   
// }
//getIPadress()


//--------------------------------
let catagoryes = `http://${IP}:5000/api/categoryes`
let teches = `http://${IP}:5000/api/teches`
let workers = `http://${IP}:5000/api/workers`

let addCount = `http://${IP}:5000/api/addCount`
let deleteCount = `http://${IP}:5000/api/deleteCount`
let deletePart = `http://${IP}:5000/api/deletePart`
let addPart = `http://${IP}:5000/api/addPart`
let addOrder = `http://${IP}:5000/api/addOrder`
let updatePart = `http://${IP}:5000/api/updatePart`


export default{
    catagoryes:catagoryes,
    teches:teches,
    workers:workers,

    addCount:addCount,
    deleteCount:deleteCount,
    deletePart:deletePart,
    addPart:addPart,
    addOrder:addOrder,
    updatePart:updatePart
}
