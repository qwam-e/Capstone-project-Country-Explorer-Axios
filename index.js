import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import axios from "axios";

const app = express();
const port = process.env.PORT || 3000;

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
                result: result[Math.floor(Math.random() * result.length)],
            });
    }catch(error)  {
        console.error(`GET error: ${error.message}`);
        res.render("index", { error: "Country not found. Please try again." });
    }
});

app.post("/", async (req, res) => {
    
    try {
        const carousel = [];
        const countryName =  req.body.country ? req.body.country.trim() : "";

        const { data: result } = await axios.get(`${API_URL}/name/${countryName}`);
        // console.log(result);
        res.render("index", 
            {
                result: result[0]
            })
    }catch (error) {
        console.error(`POST error: ${error.message}`);
        if (error.response && error.response.status === 404) {
            return res.render("index", {
                result: null, 
                error: `Country not found. Please try again.`
            });
        }
    }
});

app.get("/api/countries", async (req, res) => {
  try {
    const { data } = await axios.get(
      `${API_URL}/all?fields=name,flags,capital,region,population,currencies`
    );

    const countries = data
      .sort(() => 0.5 - Math.random())
      .slice(0, 15)
      .map(c => ({
        name: c.name.common,
        flag: c.flags.svg,
        capital: c.capital?.[0] || "N/A",
        population: c.population,
        currency: Object.values(c.currencies || {})[0]?.name || "N/A",
        symbol: Object.values(c.currencies || {})[0]?.symbol || "?",
        region: c.region
      }));

    res.json(countries);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch countries" });
  }
});

app.listen(port, console.log(`Server running on http://localhost:${port}`));