import { mainRefs, mainClasses } from "./refs.js";

export function updateFeed(posts = []) {
  const postHtml = (title, content) => {
    return `<div class="post">
    <div class="post-options">
      <div class="update-post"></div>
      <div class="delete-post"></div>
    </div>
    <div class="user-profile">
      <span class="material-icons"> person </span>
    </div>
    <span class="post-title">${title}</span>
    <div class="post-content">${content}</div>
  </div>`;
  };

  const allPosts = document.getElementById("all-posts");

  if (!(posts.constructor === Array)) {
    allPosts.insertAdjacentHTML(
      "beforeend",
      postHtml(posts.title, posts.content)
    );
    allPosts.lastChild.objectData = posts;
    allPosts.lastChild.addEventListener("click", updatePost);
    return;
  }
  posts
    .sort((a, b) => a.id - b.id)
    .forEach((post) => {
      allPosts.insertAdjacentHTML(
        "beforeend",
        postHtml(post.title, post.content)
      );
      allPosts.lastChild.objectData = post;
      allPosts.lastChild.addEventListener("click", updatePost);
    });
}

function handleUserPost() {
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
          console.log(finalResponse);
          updateFeed(finalResponse);
        });
    });
}

export function postHandler() {
  handleUserPost();
}

function EditPost() {
  function setNewData(obj) {
    console.log(obj);
    const { titleRef, contentRef, data } = obj;
    titleRef.textContent = data.title;
    contentRef.textContent = data.content;
  }
  function addListeners(e) {
    const titleInput = document.getElementById("edit-post-title");
    const contentInput = document.getElementById("edit-post-content");
    document.getElementById("edit-post-btn").onclick = function (event) {
      const post = e.target.closest(".post");
      const [titleRef, contentRef] = [
        post.lastElementChild.previousElementSibling,
        post.lastElementChild,
      ];
      const objectData = post.objectData;
      const updatedData = {
        title: titleInput.value,
        content: contentInput.value,
        user: mainRefs.getUser(),
      };
      fetch(`post/${objectData.id}/update`, {
        method: "POST",
        body: JSON.stringify(updatedData),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((finalRes) => {
          setNewData({
            titleRef: titleRef,
            contentRef: contentRef,
            data: finalRes,
          });
          unshowEditArea();
          // clear inputs
          titleInput.value = "";
          contentInput.value = "";
        });
    };
  }

  function showEditArea() {
    mainRefs.userArea.className = mainClasses.userArea + " hidden";
    mainRefs.editArea.className = mainClasses.editArea + " visible";
  }
  function unshowEditArea() {
    mainRefs.editArea.className = mainClasses.editArea + " hidden";
    mainRefs.userArea.className = mainClasses.userArea + " visible";
  }

  return {
    showEditArea,
    addListeners,
  };
}

function updatePost(e) {
  const editPost = EditPost();
  if (e.target && e.target.className === "update-post") {
    editPost.showEditArea();
    editPost.addListeners(e);
  }
}

export function deletePost() {}
