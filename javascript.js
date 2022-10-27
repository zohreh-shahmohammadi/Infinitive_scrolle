const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];


const count = 30;
//get Access_Key from https://unsplash.com/oauth/application
const apiKey = 'Access_Key';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

//check if all image were loaded 
function imageLoaded(){
    imagesLoaded++;
    if(imagesLoaded === totalImages){
        ready = true;
        //loader icone
        loader.hidden = true;
    }
}
//helper function set attribiutes Dom
function setAttributes(element,attribiutes){
    for (const key in attribiutes){
        element.setAttribute(key,attribiutes[key]);
    }
}
// Create Element For Links & Photos,Add to Dom
function displayPhotos(){
    imagesLoaded = 0;
    totalImages = photosArray.length;
    photosArray.forEach((photo) => {
const item = document.createElement('a');
setAttributes(item,{
href : photo.links.html,
target:'_blank',
});
const img = document.createElement('img');
setAttributes(img,{
src:photo.urls.regular,
alt:photo.alt_description,
title : photo.alt_description,
});
img.addEventListener('load',imageLoaded);
item.appendChild(img);
imageContainer.appendChild(item);
    });
}
//GET photos from from unsplash api
 async function getPhotos(){
    try{
const response = await fetch(apiUrl);
photosArray = await response.json();
displayPhotos();
    }catch(error){

    }
 }

 //check to see if scrolling near bottom of page ,load More Photos
 window.addEventListener('scroll',() =>{
   if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){
   ready= false;
    getPhotos();
   }
 });
 getPhotos();