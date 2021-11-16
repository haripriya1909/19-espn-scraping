const url="https://www.espncricinfo.com/series/ipl-2020-21-1210595";
const request=require("request");
const cheerio=require("cheerio");
const Allmatchobj=require("./allmatch");
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
        extract(html);
    }
}
//home
function extract(html)
{
    let $=cheerio.load(html);
    let anchorEle=$("a[data-hover='View All Results']");
    let link=anchorEle.attr("href");
    // console.log(link);
    let fullLink="https://www.espncricinfo.com/"+link;
    Allmatchobj.gAlmatches(fullLink);
}//to get all matches
function getAllMatchesLink(fullLink)
{
  request(fullLink,function (err,response,html)
  {
      if(err)
      {
          console.log(err);
      }
      else{
          extractLink(html);
      }
  });
}

function extractLink(html)
{
    let $=cheerio.load(html);
    let ScorecardElems=$("a[data-hover='Scorecard']");
    for(let i=0;i<ScorecardElems.length;i++)
    {
        let link=$(ScorecardElems[i]).attr("href");
        let fullLink="https://www.espncricinfo.com/"+link;
        console.log(fullLink);
    }
}
