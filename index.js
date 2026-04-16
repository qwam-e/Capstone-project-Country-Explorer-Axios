import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import axios from "axios";

const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));


const API_URL = "https://restcountries.com/v3.1";

app.get("/", async (req, res) => {
    try {
        const { data: result } = await axios.get(`${API_URL}/all?fields=name,flags,capital,region,population,currencies`);
        res.render("index", 
            {
                result: result[Math.floor(Math.random() * result.length)]
            });
            // console.log(result[0]);
            // console.log(Object.values(result[0].currencies)[0].symbol);
    }catch(error)  {
        console.error(`GET error: ${error.message}`);
    }
});

app.post("/", async (req, res) => {
    try {
        const { data: result } = await axios.get(`${API_URL}/name/${req.body.country}`);
        // console.log(result[0]);
        res.render("index", 
            {
                result: result[0]
            })
    }catch (error) {
        console.error(`POST error: ${error.message}`);  
    }
});


app.listen(port, console.log(`Server running on http://localhost:${port}`));