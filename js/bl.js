// Load posts from localStorage on page load
window.addEventListener('DOMContentLoaded', function() {
    const posts = JSON.parse(localStorage.getItem('userPosts')) || [];
    posts.forEach(post => {
        addPostToDOM(post.content, post.image);
    });
});

document.getElementById('postForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const content = document.getElementById('postContent').value.trim();
    const imageInput = document.getElementById('postImage');
    if (!content) return;

    if (imageInput.files && imageInput.files[0]) {
        const reader = new FileReader();
        reader.onload = function(event) {
            saveAndRenderPost(content, event.target.result);
        };
        reader.readAsDataURL(imageInput.files[0]);
    } else {
        saveAndRenderPost(content, null);
    }
    document.getElementById('postForm').reset();
});

function saveAndRenderPost(content, image) {
    const posts = JSON.parse(localStorage.getItem('userPosts')) || [];
    const post = { content, image };
    posts.unshift(post);
    localStorage.setItem('userPosts', JSON.stringify(posts));
    addPostToDOM(content, image);
}

function addPostToDOM(content, image) {
    const li = document.createElement('li');
    li.style.marginBottom = '20px';
    li.style.background = '#f9f9f9';
    li.style.padding = '15px';
    li.style.borderRadius = '8px';
    li.style.position = 'relative';

    const textDiv = document.createElement('div');
    textDiv.textContent = content;
    li.appendChild(textDiv);

    if (image) {
        const img = document.createElement('img');
        img.style.maxWidth = '100%';
        img.style.marginTop = '10px';
        img.style.borderRadius = '6px';
        img.src = image;
        li.appendChild(img);
    }

    const delBtn = document.createElement('button');
    delBtn.textContent = 'Delete';
    delBtn.style.position = 'absolute';
    delBtn.style.top = '10px';
    delBtn.style.right = '10px';
    delBtn.style.background = '#e74c3c';
    delBtn.style.color = '#fff';
    delBtn.style.border = 'none';
    delBtn.style.padding = '5px 10px';
    delBtn.style.borderRadius = '4px';
    delBtn.style.cursor = 'pointer';
    delBtn.onclick = function() {
        li.remove();
        removePostFromStorage(content, image);
    };
    li.appendChild(delBtn);

    document.getElementById('userPosts').prepend(li);
}

function removePostFromStorage(content, image) {
    let posts = JSON.parse(localStorage.getItem('userPosts')) || [];
    posts = posts.filter(post => !(post.content === content && post.image === image));
    localStorage.setItem('userPosts', JSON.stringify(posts));
}
document.addEventListener('DOMContentLoaded', function() {
    const userPosts = document.getElementById('userPosts');
    const postForm = document.getElementById('postForm');
    const postContent = document.getElementById('postContent');
    const postImage = document.getElementById('postImage');

    postForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const content = postContent.value.trim();
        const file = postImage.files[0];

        if (!content && !file) return;

        const li = document.createElement('li');
        li.className = 'blog-card';

        // Post content
        const divContent = document.createElement('div');
        divContent.textContent = content;
        li.appendChild(divContent);

        // Post image
        if (file) {
            const img = document.createElement('img');
            img.style.maxWidth = '100%';
            img.style.margin = '10px 0';
            img.alt = 'User post image';
            const reader = new FileReader();
            reader.onload = function(e) {
                img.src = e.target.result;
            };
            reader.readAsDataURL(file);
            li.appendChild(img);
        }

        // Like, Share, Comment section
        const actions = document.createElement('div');
        actions.style.display = 'flex';
        actions.style.gap = '20px';
        actions.style.marginTop = '10px';
        actions.style.alignItems = 'center';

        // Like
        const likeBtn = document.createElement('button');
        likeBtn.type = 'button';
        likeBtn.textContent = '👍 Like';
        likeBtn.style.cursor = 'pointer';
        let likeCount = 0;
        const likeCounter = document.createElement('span');
        likeCounter.textContent = ' 0';
        likeBtn.onclick = function() {
            likeCount++;
            likeCounter.textContent = ' ' + likeCount;
        };
        actions.appendChild(likeBtn);
        actions.appendChild(likeCounter);

        // Share
        const shareBtn = document.createElement('button');
        shareBtn.type = 'button';
        shareBtn.textContent = '🔗 Share';
        shareBtn.style.cursor = 'pointer';
        shareBtn.onclick = function() {
            if (navigator.share) {
                navigator.share({
                    text: content,
                    url: window.location.href
                });
            } else {
                navigator.clipboard.writeText(content + ' ' + window.location.href);
                alert('Post link copied to clipboard!');
            }
        };
        actions.appendChild(shareBtn);

        // Comment
        const commentBtn = document.createElement('button');
        commentBtn.type = 'button';
        commentBtn.textContent = '💬 Comment';
        commentBtn.style.cursor = 'pointer';
        actions.appendChild(commentBtn);

        li.appendChild(actions);

        // Comment box and list
        const commentSection = document.createElement('div');
        commentSection.style.marginTop = '10px';
        commentSection.style.display = 'none';

        const commentInput = document.createElement('input');
        commentInput.type = 'text';
        commentInput.placeholder = 'Write a comment...';
        commentInput.style.width = '70%';
        commentInput.style.padding = '5px';

        const commentSubmit = document.createElement('button');
        commentSubmit.type = 'button';
        commentSubmit.textContent = 'Post';
        commentSubmit.style.marginLeft = '8px';

        const commentList = document.createElement('ul');
        commentList.style.listStyle = 'none';
        commentList.style.padding = '0';
        commentList.style.marginTop = '10px';

        commentSubmit.onclick = function() {
            const val = commentInput.value.trim();
            if (val) {
                const commentLi = document.createElement('li');
                commentLi.textContent = val;
                commentList.appendChild(commentLi);
                commentInput.value = '';
            }
        };

        commentSection.appendChild(commentInput);
        commentSection.appendChild(commentSubmit);
        commentSection.appendChild(commentList);

        commentBtn.onclick = function() {
            commentSection.style.display = commentSection.style.display === 'none' ? 'block' : 'none';
        };

        li.appendChild(commentSection);

        userPosts.prepend(li);
        postForm.reset();
    });
});