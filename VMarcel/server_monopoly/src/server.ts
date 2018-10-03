import { Request, Response } from 'express'
import {GameEnv, Player} from "./models/gameplay"
import {pType, gameDOM} from "./models/interface"
// If default export, {} not needed

let express = require('express')
let bodyParser = require('body-parser')



export default class Server {
    
    readonly port: number
    
    constructor (port: number) {
        this.port = port
    }

    start (port: number) {
        const app = express()
        var GamEnv:any  // same as p1, to modify
        var p1:any      // any because lot of function to right
        var p2:any

        // middlwares 

        app.set('view engine', 'ejs')
        app.use(express.static('public'))
        app.use(bodyParser.urlencoded({ extended: false }));



        app.get('/', function (req: Request, res: Response) {
            GamEnv.getDOM(function(DOM:gameDOM) {
                res.render('pages/index', {p1, p2, DOM})
            })
        }),

        app.get('/action/:id', function (req: Request, res: Response) {
            var i = req.params.id
            GamEnv.getDOM(function(DOM:gameDOM) {
                if (DOM.pCurrent === p1.pName)
                    p1[i](p2.pName, function() {/* Keep it for future */ })
                else 
                    p2[i](p1.pName, function() {})
            })
            res.redirect('/')                
        })

        app.get('/start', function (req: Request, res:Response) {
            res.render('pages/start')
        }),

        app.post('/register_players', function (req: Request, res: Response) {
            GamEnv = new GameEnv()
            p1 = new Player({pId: 1, pName: req.body.p1_name, pCash: 400, pRevenu: 0, pRd: 0, pDevTeam: 0, pInvTeam: 0})
            p2 = new Player({pId: 2, pName: req.body.p2_name, pCash: 400, pRevenu: 0, pRd: 0, pDevTeam: 0, pInvTeam: 0})
            GamEnv.createEnv(req.body.p1_name, req.body.p2_name)
            res.redirect('/')
        })

        app.listen(this.port, function () {
            console.log("Serveur run on port : ", port)
            })
    }
}