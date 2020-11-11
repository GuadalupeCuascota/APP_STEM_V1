import { Router } from 'express';
class ArchivosRoutes{
public router: Router= Router();
constructor(){
    this.config();
    }
    config(): void{
        this.router.get('/');  
    }
}