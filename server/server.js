let axios = require("axios");
let cheerio = require("cheerio");
let fs = require("fs");

axios.get("https://quran.com/").then(response => {
  if (response.status === 200) {
    const html = response.data;
    const $ = cheerio.load(html);
    // console.log(html);
    let surat = [];
    $(".row li").each(function(i, elem) {
      surat[i] = {
        namaSurat: $(this)
          .find(".col-xs-7")
          .text()
          .trim(),
        makna: $(this)
          .find(".text-uppercase")
          .text()
          .trim()
      };
    });
    const suratList = surat.filter(n => n != undefined);
    fs.writeFile(
      "data/suratList.js",
      JSON.stringify(suratList, null, 4),
      err => {
        console.log("Membuat file berhasil");
      }
    );
    // for (let i = 0; i < surat.length; i++) {
    //   console.log(surat[i]);
    // }
    console.log(surat.length);
  }
}),
  error => console.log(err);
