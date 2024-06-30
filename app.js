import axios from "axios";
import cheerio from "cheerio"; // Corrected import
import pretty from "pretty";
import fs from "fs";

const url = "https://en.wikipedia.org/wiki/Virat_Kohli";

async function scrapData() {
  try {
    const { data } = await axios.get(url); // Corrected to use axios.get

    const $ = cheerio.load(data); // Corrected cheerio usage
    const listItems = $("p");
    const arr = [];

    listItems.each((idx, el) => {
      const item = $(el).text();
      arr.push(item);
    });
    console.log(arr);

    fs.writeFile("data.json", JSON.stringify(arr, null, 3), (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Success");
      }
    });
  } catch (err) {
    console.log(err.message);
  }
}

scrapData();
