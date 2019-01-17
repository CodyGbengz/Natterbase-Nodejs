import bodyParser from 'body-parser';
import express from 'express';
import routes from './routes';


const app = express()

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const port = process.env.PORT || 8080;

app.use(routes);

app.get('*', (req, res) => {res.send('here')});
app.listen(port);