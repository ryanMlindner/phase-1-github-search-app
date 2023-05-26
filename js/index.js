const gitAPIUserQueryEndpt = 'https://api.github.com/search/users?q='

const userListDisplay = document.getElementById("user-list");
const repoListDisplay = document.getElementById("repo-list");
document.getElementById("github-form").addEventListener("submit", userSearch);
function userSearch(event) {
  event.preventDefault();
  user = document.getElementById("search").value;
  fetch(`${gitAPIUserQueryEndpt}${user}`, {
    headers: {
      "Accept" : "application/vnd.github.v3+json"
    }
  })
  .then((resp) => resp.json())
  .then((json) => {
    console.log(json);
    const dataCollection = json.items;
    for (let index= 0; index < dataCollection.length; index++) {
      const listItem = document.createElement("li");
      const login = dataCollection[index].login;
      const url = dataCollection[index].html_url;
      listItem.textContent = `login: ${login}, url: ${url}`;
      
      const avatarImg = document.createElement("img");
      const avatar = dataCollection[index].avatar_url;
      avatarImg.src = avatar;
      listItem.append(avatarImg)
      userListDisplay.append(listItem);
    }
  })
}