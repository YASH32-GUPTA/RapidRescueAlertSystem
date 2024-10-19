import { ReadData } from "../GCP/Read";

const videoLinksOne = [];
const videoLinksTwo = [] ;
const videoLinksThree = [] ;
const videoLinksFour = [] ;



async function fetchData()
{   
    let dataSet = await ReadData() ; 


    console.log("data" , dataSet ) ;

    dataSet.map((video)=>{
        if( video.data.place == 'Place A')
        {   
            videoLinksOne.unshift(video.data)
        }
        else if(video.data.place == 'Place B')
        {
            videoLinksTwo.unshift(video.data)
        }
        else if(video.data.place == 'Place C')
        {
            videoLinksThree.unshift(video.data)   
        }
        else if(video.data.place == 'Place D')
        {
            videoLinksFour.unshift(video.data)
        }
    })

    console.log(videoLinksOne) ;
    
}

await fetchData() ; 





export { videoLinksOne , videoLinksTwo , videoLinksThree , videoLinksFour  };
  