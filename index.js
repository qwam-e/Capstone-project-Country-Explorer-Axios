import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));

const bearerToken = process.env.BEARER_TOKEN;

const API_URL = "https://api.restcountries.com/countries/v5";

app.get("/", async(req, res) => {
    try {
        const {data: response } = await axios.get(API_URL, {
            headers: {
                Authorization: bearerToken
            },
            params: {
                limit: 100,
                response_fields: "names, capitals, flag, currencies, population, region",
            }
        });

        const result = response.data.objects;

        res.render("index", 
            {
                result: result[Math.floor(Math.random() * result.length)],
                error: `Country not found. Please try again.`
            });

    } catch(error)  {
        console.error(`Failed to make request: ${error}`);  
        res.render("index", 
            {
                error: `Country not found. Please try again.`,
                result: null
            });
    }
});

app.post("/search", async(req, res) => {
    
    try {
        const carousel = [];
        const userInput =  req.body.country ? req.body.country.trim() : "";

        const { data: response } = await axios.get(`${API_URL}/names.common`, {
            headers: {
                Authorization: bearerToken
            },
            params: {
                q: userInput
            }
        });

        const result = response.data.objects;

        res.render("index", 
            {
                result: result[0],
                error: null
            });
    }catch (error) {
        console.error(`Failed to make request: ${error.message}`);
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
    const { data: response } = await axios.get(API_URL, {
        headers: {
            Authorization: bearerToken
        },
        params: {
            limit: "100",
            response_fields: "names, capitals, flag, currencies, population, region",
                
        }
    });

    // console.log(response.data.objects); APT output
    const countries = response.data.objects
      .sort(() => 0.5 - Math.random())
      .slice(0, 15)
      .map(c => ({
        name: c.names.official ,
        flag: c.flag.url_svg,
        capital: c.capitals?.[0].name || "N/A",
        population: c.population,
        currency: Object.values(c.currencies || {})[0]?.name || "N/A",
        symbol: Object.values(c.currencies || {})[0]?.symbol || "?",
        region: c.region
      }));

    res.json(countries);

  } catch (error) {
    console.error("API error:", error);
    res.status(500).json({ error: "Failed to fetch countries" });
  }
});

app.listen(port, console.log(`Server running on http://localhost:${port}`));