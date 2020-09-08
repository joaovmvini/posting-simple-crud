import { mainRefs } from "./refs.js";

export function updateFeed(posts = []) {
  const postHtml = (title, content) => {
    return `<div class="post">
    <div class="user-profile">
      <span class="material-icons"> person </span>
    </div>
    <span class="post-title">${title}</span>
    <div class="post-content">${content}</div>
  </div>
    </div>`;
  };

  const allPosts = document.getElementById("all-posts");

  if (!(posts.constructor === Array)) {
    return allPosts.insertAdjacentHTML(
      "beforeend",
      postHtml(posts.title, posts.content)
    );
  }
  posts.forEach((post) => {
    allPosts.insertAdjacentHTML(
      "beforeend",
      postHtml(post.title, post.content)
    );
  });
}

export function handleUserPost() {
  const postContent = document.getElementsByTagName("textarea")[0];
  const postTitle = document.getElementById("post-title");

  document
    .getElementById("btnPost")
    .addEventListener("click", function sendPostDataToServer() {
      const postObj = {
        user: mainRefs.getUser(),
        content: postContent.value,
        title: postTitle.value,
      };
      fetch("posts", {
        method: "POST",
        body: JSON.stringify(postObj),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((finalResponse) => {
          updateFeed(finalResponse);
        });
    });
}
