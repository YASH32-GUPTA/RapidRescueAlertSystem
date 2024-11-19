// customVideo.js
import { ReadData } from "../GCP/Read.js";

const videoLinksOne = [];
const videoLinksTwo = [];
const videoLinksThree = [];
const videoLinksFour = [];

async function fetchData() {
    console.log("fetch start");

    let dataSet = await ReadData();

    console.log(dataSet) ;

    dataSet.map((video) => {
        if (video.data.place === 'Place A') {
            videoLinksOne.unshift(video.data);
        } if (video.data.place === 'Place B' ) {
            videoLinksTwo.unshift(video.data);
        } if (video.data.place === 'Place C') {
            videoLinksThree.unshift(video.data);
        } if (video.data.place === 'Place D') {
            videoLinksFour.unshift(video.data);
        }
    });

}

await fetchData();

export { videoLinksOne, videoLinksTwo, videoLinksThree, videoLinksFour, fetchData };
