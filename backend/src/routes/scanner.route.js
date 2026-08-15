import express from 'express'
import { getBarcodtext } from '../Controllers/Scanner.controller.js';

const scannerRoute=express.Router();


scannerRoute.post('/barcode',getBarcodtext);


export default scannerRoute;