function removeActiveClasses() {
    const activeButtons = document.getElementsByClassName("active");
    for(let btn of activeButtons){
        btn.classList.remove("active");
    }
}

function loadCategories() {
    // fetch the data
    fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then(res=>res.json())
    .then(data=> displayCategories(data.categories))
    
}

function displayCategories(categories) {

    const categoriesContainer = document.getElementById("category-container");

    for(let cat of categories){
        const categoryDiv = document.createElement("div");
        categoryDiv.innerHTML = `
            <button id="btn-${cat.category_id}" onclick="loadcategoriesVideos('${cat.category_id}')" class="btn btn-sm hover:bg-[#FF1F3D] hover:text-white">${cat.category}</button>
        `;
        categoriesContainer.append(categoryDiv);
    }

}

const loadVideoDetails = (id) => {
    const url = `https://openapi.programming-hero.com/api/phero-tube/video/${id}`
    fetch(url)
    .then(res=>res.json())
    .then(data => displayvideoDetails(data.video))
}

const displayvideoDetails = (video) => {
    console.log(video);
    document.getElementById("video_details").showModal();
    const detailsContainer = document.getElementById("details_container");
    detailsContainer.innerHTML = `
    <div class="card bg-base-100 image-full shadow-sm">
    <figure>
        <img
        src="${video.thumbnail}"
        alt="Shoes" />
    </figure>
    <div class="card-body">
        <h2 class="card-title">${video.title}</h2>
        <p>${video.description}</p>
        <p>${video.authors[0].profile_name}</p>
    </div>
    </div>
    `
}

function loadVideosByCategory() {
    fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
    .then(res=>res.json())
    .then(data => {
        displayVideos(data.videos);
        removeActiveClasses();
        const allButton = document.getElementById("btn-all");
        allButton.classList.add("active");
    })
}

const displayVideos = (videos)=> {
    const videosContainer = document.getElementById("video-container");
    videosContainer.innerHTML = "";

    if(videos.length === 0) {
        videosContainer.innerHTML = `
        <div class="col-span-full flex flex-col items-center text-center justify-center py-30 gap-5">
            <img src="Icon.png" alt="">
            <h2 class="text-2xl font-bold">Oops!! Sorry, There is no content here</h2>
        </div>
        `;
        return;
    }

    videos.forEach(element => {
        //element create
        const videoCard = document.createElement("div");
        videoCard.innerHTML = `
        <div class="card bg-base-100">
        <figure class="relative">
            <img class= "w-full h-[200px] object-cover"
            src="${element.thumbnail}"
            alt="Shoes" />
            <span class="absolute bottom-2 right-2 text-white text-sm bg-black px-2 rounded">3hrs 56 min ago</span>
        </figure>
        <div class="flex gap-3 px-0 py-5">
            <div class="profile">
                <div class="avatar">
                <div class="ring-primary ring-offset-base-100 w-10 rounded-full ring-2 ring-offset-2">
                    <img src="${element.authors[0].profile_picture}" />
                </div>
                </div>
            </div>
            <div class="intro">
                <h2 class="text-sm font-semibold">${element.title}</h2>
                <p class="text-sm text-gray-400">${element.authors[0].profile_name} <img class="w-5 h-5 inline-block" src="https://img.icons8.com/?size=48&id=98A4yZTt9abw&format=png" alt=""></p>
                <p class="text-sm text-gray-400">${element.others.views} views</p>
            </div>
        </div>
        <button onclick="loadVideoDetails('${element.video_id}')" class="btn btn-block">Show Details</button>
        </div>
        `
        videosContainer.append(videoCard);
    });

}

const loadcategoriesVideos = (id)=>{
    const url = `https://openapi.programming-hero.com/api/phero-tube/category/${id}`;
    console.log(url);

    fetch(url)
    .then(res=>res.json())
    .then(data=>{
        removeActiveClasses();
        displayVideos(data.category)
        const clickedButton = document.getElementById(`btn-${id}`);
        clickedButton.classList.add("active");
    })
}

loadCategories();
