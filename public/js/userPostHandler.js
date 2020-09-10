import { mainRefs, mainClasses } from "./refs.js";

function insertPostListeners(ref, orientation = 0) {
  /* orientation:
   *  1: insert post with the bottom-top order
   *  0: insert post with the top-bottom order
   */
  if (orientation) {
    ref.firstElementChild.addEventListener("click", updatePost);
    ref.firstElementChild.addEventListener("click", deletePost);
    return;
  }
  ref.lastElementChild.addEventListener("click", updatePost);
  ref.lastElementChild.addEventListener("click", deletePost);
}
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
      "afterbegin",
      postHtml(posts.title, posts.content)
    );
    allPosts.firstElementChild.objectData = posts;
    insertPostListeners(allPosts, 1);
    return;
  }
  posts
    .sort((a, b) => b.id - a.id)
    .forEach((post) => {
      allPosts.insertAdjacentHTML(
        "beforeend",
        postHtml(post.title, post.content)
      );
      allPosts.lastElementChild.objectData = post;
      insertPostListeners(allPosts);
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
          updateFeed(finalResponse);
        });
    });
}

export function postHandler() {
  handleUserPost();
}

function EditPost() {
  function setNewData(obj) {
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
      fetch(`post/update/${objectData.id}`, {
        method: "POST",
        body: JSON.stringify(updatedData),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((finalRes) => {
          if (!finalRes.error) {
            setNewData({
              titleRef: titleRef,
              contentRef: contentRef,
              data: finalRes,
            });
            unshowEditArea();
            // clear inputs
            titleInput.value = "";
            contentInput.value = "";
          } else {
            alert(finalRes.error);
          }
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

function PostDeleter() {
  function addListeners(e) {
    const post = e.target.closest(".post");
    const postObject = post.objectData;

    document.getElementById("delete-btn").onclick = function () {
      fetch(`post/delete/${postObject.id}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
        },
      })
        .then((res) => res.json())
        .then((finalRes) => {
          console.log("Deleted post:", finalRes);
          alert("Your post was been deleted");
          deleteDisplayedPost(post);
          destroyConfirmation();
        });
    };

    document.getElementById("cancel-delete-btn").onclick = function () {
      destroyConfirmation();
    };
  }
  function deleteDisplayedPost(post) {
    return post.remove();
  }
  function destroyConfirmation() {
    mainRefs.userArea.className = mainClasses.userArea;
    return document.getElementById("delete-confirmation").remove();
  }
  function displayDeleteConfirmation() {
    const confirmationHtml = `<div id="delete-confirmation">
      <span>Are you sure about delete this post?</span>
      <div class="delete-btn-box">
      <input type="button" value="Delete" id="delete-btn">
      <input type="button" value="Cancel" id="cancel-delete-btn">
      </div>
    </div>`;
    mainRefs.userArea.className = mainClasses.userArea + " opacity";
    return document.body.insertAdjacentHTML("beforeend", confirmationHtml);
  }

  return {
    addListeners,
    displayDeleteConfirmation,
  };
}
function deletePost(e) {
  const postDeleter = PostDeleter();

  if (e.target && e.target.className === "delete-post") {
    postDeleter.displayDeleteConfirmation();
    postDeleter.addListeners(e);
  }
}

function updatePost(e) {
  const editPost = EditPost();
  if (e.target && e.target.className === "update-post") {
    editPost.showEditArea();
    editPost.addListeners(e);
  }
}
