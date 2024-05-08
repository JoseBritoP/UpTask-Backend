import express from 'express';
import cors, {CorsOptions} from 'cors'
import morgan from 'morgan'
import mainRouter from './routes';
import { corsOptions } from './config/cors';

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(cors(corsOptions));

app.use('/', mainRouter );

export default app;