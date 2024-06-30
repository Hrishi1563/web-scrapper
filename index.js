import puppeteer from "puppeteer";

const url =
  "https://indianexpress.com/article/entertainment/malayalam/paradise-darshana-rajendran-roshan-mathew-micro-aggressions-of-toxic-men-9420503/";

const main = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);

  const paras = await page.evaluate(() => {
    const contents = document.getElementById("pcl-full-content");
    if (contents) {
      const paragraphs = contents.getElementsByTagName("p");
      return Array.from(paragraphs)
        .slice(0, 3)
        .map((p) => p.innerText);
    }
    return [];
  });

  console.log(paras);

  await browser.close();
};

main();
