import express from 'express';
import hpp from 'hpp';
import rateLimit from 'express-rate-limit';
import compression from 'compression';
import cors from 'cors';
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';
import xss from 'xss-clean';
import { globalErrorHandler } from './utils/error-handler.js';
import apiV1 from './src/routes/api-v1.js';

const bootStrap = (app) => { 

 app.use(express.json({limit: '50mb'})); // Parse JSON bodies 
 app.use(hpp());
 app.use(compression());
 app.use(cors());
 app.use(helmet());

 const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, 
    max: 100, 
    message: 'Too many requests from this IP, please try again later.',
  });
  
  app.use(limiter);
  app.use(mongoSanitize());
  app.use(xss());


const port = process.env.PORT || 3000;

app.use(apiV1); 

app.get('/',(req,res)=>{
    res.json({
        message: 'Welcome to the E-commerce API'
    })
})
// Handle 404 errors
app.all('*',(req,res)=>res.status(404).json({
    message: 'Not found'
}));

//global error handler middleware
app.use(globalErrorHandler);

// Start the server
app.listen(port, () => console.log(`E-commerce app listening on port ${port}!`));

}
export default bootStrap;