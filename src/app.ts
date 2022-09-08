import express, { Application } from 'express';
import cors from 'cors';

import ErrorMiddleware from './middleware/error.middleware';
import Controller from './utils/interface/controller.interface';

class App {
    public express: Application;
    public port: number;

    constructor(controllers: Controller[], port: number){
        this.express = express();
        this.port = port;

        this.initialiseMiddileware();
        this.initialiseControllers(controllers);
        this.initialiseErrorHandling();
    }

    //To initiate middlewares
    private initialiseMiddileware(): void {
        this.express.use(cors());
        this.express.use(express.json());
        this.express.use(express.urlencoded({ extended : false}));
    }

    //To initiate controllers
    private initialiseControllers(controllers: Controller[]): void {
        controllers.forEach((controller: Controller) => {
            this.express.use('/api',controller.router)
        })
    }

    //To initiate error handler
    private initialiseErrorHandling(): void {
        this.express.use(ErrorMiddleware);
    }

    //listen function 
    public listen(): void {
        this.express.listen(this.port, () => {
            console.log(`App listening to port ${this.port}`)
        })
    }
}

export default App