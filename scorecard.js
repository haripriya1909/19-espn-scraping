const url="https://www.espncricinfo.com//series/ipl-2020-21-1210595/mumbai-indians-vs-chennai-super-kings-1st-match-1216492/full-scorecard";
const request=require("request");
const cheerio=require("cheerio");
function processScorecard()
{
    request(url,cb);
}
//venue date opponenet  result run balls fours sixes strike rate

request(url,cb);
function cb(err,response,html)
{
    if(err)
    {
        console.log(err);
    }
    else{
        // console.log(html);
        extractMatchDetail(html);
    }
}

function extractMatchDetail(html)
{
   //ipl-team-player-runs-balls-sixes-venue-date-opponent
   //venue-date-result-common
//    venue date  = .match-header-container .description
// result=    .event .status-text

let $=cheerio.load(html);
let desc=$(".match-header-container .description");
let result=$(".event .status-text");
let strinArr= desc.text().split(",");
let venue = strinArr[1].trim();
let date= strinArr[2].trim();
result=result.text();
let innings=$(".match-scorecard-page .match-scorecard-table .Collapsible")
let htmlstring="";
for(let i=0;i<innings.length;i++)
{
    // htmlstring+=$(innings[i]).html();
    let teamname=$(innings[i]).find("h5").text();
    teamname=teamname.split("INNINGS")[0].trim();
    let opponentIndex=i==0 ?1 : 0;
    let opponentName=$(innings[opponentIndex]).find("h5").text();
    opponentName=opponentName.split("INNNINGS")[0].trim();
    let cinnings=$(innings[i]);

    let allrows=cinnings.find(".table.batsman tbody tr");
    for(let j=0;j<allrows.length;j++)
    {
       let allcols=$(allrows[j]).find("td");
       let isworthy=$(allcols[0]).hasClass("batsman-cell");
       if(isworthy==true)
       {
        //    console.log(allcols.text());
        let playername=$(allcols[0]).text().trim();
        let runs=$(allcols[2]).text().trim();
        let balls=$(allcols[3]).text().trim();
        let fours=$(allcols[5]).text().trim();
        let sixes=$(allcols[6]).text().trim();
        let sr =$(allcols[7]).text().trim();

        console.log(`${playername} ${runs} ${balls} ${fours} ${sixes} ${sr}`);
       }
    }
    // console.log(`${venue} : ${date} : ${teamname} : ${opponentName} : ${result}`);

}
// console.log(htmlstring);
}

// .match-scorecard-page .match-scorecard-table .Collapsible

module.exports={
    ps:processScorecard
}