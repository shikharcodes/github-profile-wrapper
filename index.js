console.log("github");

const usernameInput = document.getElementById("username");
const showDetailsButton = document.getElementById("showDetails");
const profileInfoDiv = document.getElementById("profileInfo");
const reposInfoDiv = document.getElementById("reposInfo"); 

// using async await

showDetailsButton.addEventListener("click", async () => {
    const username = usernameInput.value;
    console.log(username);

    // fetch data from server with fetch API
    const result = await fetch(`https://api.github.com/users/${username}`);
    const data = await result.json();

    showProfile(data);
    showReposInfo(username);
});

function showProfile(data) {
    // console.log(data);
    profileInfoDiv.innerHTML = `
        <div class="card">
            <div class="card-img">
                <img src=${data.avatar_url} alt=${data.name}>
            </div>
            <div class="card-body">
                <div class="card-title">${data.name}</div>
                <div class="card-subHeading">${data.login}</div>
                <div class="card-text">
                    <p>${data.bio}</p>
                    <p>${data.followers} followers ${data.following} following</p>
                    <button>
                        <a href=${data.html_url}>Checkout this profile</a>
                    </button>
                </div>
            </div>
        </div>
    `;
}

async function showReposInfo(username) {
    const result = await fetch(`https://api.github.com/users/${username}/repos`);
    const projects = await result.json();
    console.log(projects);
    for(let i=0; i<projects.length; i++) {
        reposInfoDiv.innerHTML += `
            <div class="card">
                <div class="card-body">
                    <div class="card-title">${projects[i].name}</div>
                    <div class="card-subHeading">${projects[i].language}</div>
                    <div class="card-text">
                        <button>
                            <a href=${projects[i].html_url}>Do checkout project</a>
                        </button>
                    </div>
                </div>
            </div>                    
        `
    }
}


// using then and catch

// function showReposInfo(username) {
//     fetch(`https://api.github.com/users/${username}/repos`)
//         .then((res) => res.json())
//         .then((projects) => {
//             console.log(projects);
//             for(let i=0; i<projects.length; i++) {
//                 reposInfoDiv.innerHTML += `
//                     <div class="card">
//                         <div class="card-body">
//                             <div class="card-title">${projects[i].name}</div>
//                             <div class="card-subHeading">${projects[i].language}</div>
//                             <div class="card-text">
//                                 <button>
//                                     <a href=${projects[i].html_url}>Do checkout project</a>
//                                 </button>
//                             </div>
//                         </div>
//                     </div>                    
//                 `
//             }
//         })
// }

// showDetailsButton.addEventListener("click", () => {
//     const username = usernameInput.value;
//     console.log(username);

//     // fetch data from server with fetch API
//     fetch(`https://api.github.com/users/${username}`)
//         .then((res) => res.json())
//         .then((data) => {
//             // console.log(data);
//             profileInfoDiv.innerHTML = `
//                 <div class="card">
//                     <div class="card-img">
//                         <img src=${data.avatar_url} alt=${data.name}>
//                     </div>
//                     <div class="card-body">
//                         <div class="card-title">${data.name}</div>
//                         <div class="card-subHeading">${data.login}</div>
//                         <div class="card-text">
//                             <p>${data.bio}</p>
//                             <p>${data.followers} followers ${data.following} following</p>
//                             <button>
//                                 <a href=${data.html_url}>Checkout this profile</a>
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             `;

//             showReposInfo(username);
//         })
// });