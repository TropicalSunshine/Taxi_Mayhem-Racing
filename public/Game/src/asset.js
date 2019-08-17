import roads from "images/roads.png";
import heart_empty from "images/heart"
import heart from "images/heart."

const IMAGE_NAMES = [
  "roads.png",
  "heart_empty.png",
  'heart_empty.png',
  'heart.png'
];

const AUDIO_NAMES = [

];

const images = {};
const audios = {};

const downloadImage = Promise.all(IMAGE_NAMES.map(downloadI));
const downloadAudio = Promise.all(AUDIO_NAMES.map(downloadA));

function downloadI(assetName) {
  return new Promise(resolve => {
    const asset = new Image();
    asset.onload = () => {
      console.log(`Downloaded ${assetName}`);
      images[assetName] = asset;
      resolve();
    };
    asset.src = assetName;
  });
}

function downloadA(assetName) {
  return new Promise(resolve => {
    const asset = new Audio();
    asset.onload = () => {
      console.log(`Downloaded ${assetName}`);
      audios[assetName] = asset;
      resolve();
    };
    asset.src = `src/audio/${assetName}`;
  });
}


export const downloadImages = () => downloadImage;
export const downloadAudios = () => downloadAudio;

export const getImage = assetName => images[assetName];

export const getAudio = assetName => audios[assetName];
