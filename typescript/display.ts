export default function myconsoleLog (message:string, space:number) {
    for (var i = 0; i < space; i++) {
        console.log ('\n')
    }
    console.log ("--------", message, "--------")
    for (i = 0; i < space; i++) {
        console.log ('\n')
    }
}