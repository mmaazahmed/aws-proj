import app from './app';
import dotenv from 'dotenv';

dotenv.config();

const port:number=Number(process.env.PORT)


app.listen(port, '0.0.0.0', () => {
    console.log('Run at http://localhost:3000');
});