import express from 'express';
import routes from "./modules";
import path from 'path';
import cors from 'cors';

const app = express();
app.use(cors())
app.use(express.json());
app.use(routes);
app.use('/uploads', express.static(path.resolve(__dirname, 'modules', 'uploads')))

app.listen(3333);
