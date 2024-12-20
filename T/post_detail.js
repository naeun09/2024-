document.addEventListener('DOMContentLoaded', function () {
    const postId = new URLSearchParams(window.location.search).get('id');
    const posts = JSON.parse(localStorage.getItem('posts')) || [];
    const post = posts[postId];

    if (post) {
        document.querySelector('.post-title').textContent = post.title;
        document.querySelector('.post-content').textContent = post.content;
    }

    const comments = JSON.parse(localStorage.getItem(`comments_${postId}`)) || [];
    const commentsList = document.querySelector('.comments-list');

    function displayComments() {
        commentsList.innerHTML = '';
        comments.forEach(comment => {
            const div = document.createElement('div');
            div.classList.add('comment');
            div.innerHTML = `<strong>${comment.name}</strong><p>${comment.text}</p>`;
            commentsList.appendChild(div);
        });
    }

    displayComments();

    document.getElementById('addComment').addEventListener('click', function () {
        const name = document.getElementById('commenter').value;
        const text = document.getElementById('comment').value;

        if (name && text) {
            comments.push({ name, text });
            localStorage.setItem(`comments_${postId}`, JSON.stringify(comments));
            displayComments();
            document.getElementById('commenter').value = '';
            document.getElementById('comment').value = '';
        }
    });
});
