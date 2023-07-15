const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader')

const apiKey = "lS-9Vz9qS7HO7PhyqXY1MBHe-LLlhgM0kYfbo_5s8aU"
let count = 30;
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`
let photos = [];
let imagesLoaded = 0;
let totalImages = 0;
let ready = false;

const imageLoaded = () => {
    
    imagesLoaded++;
    if(imagesLoaded === totalImages){
        ready = true;
    }
}


const displayPhotos = () => {
    totalImages = photos.length
    photos.forEach((photo)=> {
        const photoItem = document.createElement('a');
        photoItem.setAttribute('href', photo.links.html);
        photoItem.setAttribute('target', '_blank');
        
        const img = document.createElement('img');
        img.setAttribute('src', photo.urls.regular);
        img.setAttribute('alt', photo.alt_description);
        img.setAttribute('title', photo.alt_description);

        img.addEventListener('load', imageLoaded);

        photoItem.appendChild(img);
        imageContainer.appendChild(photoItem);
    })
}
const scrollEvent = () => {
    if(window.scrollY + window.innerHeight >= document.body.offsetHeight-1000 && ready) {
        ready = false;
        getPhotos()
        imagesLoaded = 0;
        
    }
}

const getPhotos = async () => {
    try {
        const response = await fetch(apiUrl);
        photos = await response.json();
        displayPhotos();
        loader.hidden = true;
    } catch (error) {
        //Catch Error 
    }
}
//On load
getPhotos();

//Event Listeners
window.addEventListener('scroll', scrollEvent)