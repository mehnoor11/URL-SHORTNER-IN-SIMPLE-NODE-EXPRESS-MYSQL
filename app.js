import express from 'express';
import bodyParser from 'body-parser';   
import  urlshortnerRoutes  from "./routes/shortner.route.js";

const app = express();
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.use(bodyParser.json()); 
// Routes
app.use(urlshortnerRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`:rocket: Server running at http://localhost:${PORT}`));

 