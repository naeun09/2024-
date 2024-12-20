document.addEventListener('DOMContentLoaded', function () {
    const contentDiv = document.querySelector('.content');
    const posts = JSON.parse(localStorage.getItem('posts')) || [];

    if (posts.length === 0) {
        contentDiv.innerHTML = '<p>추가된 글이 없습니다.</p>';
    } else {
        posts.forEach((post, index) => {
            const card = document.createElement('div');
            card.classList.add('card');
            card.innerHTML = `
            <h3><a href="post_detail.html?id=${index}">${post.title}</a></h3>
            <p>${post.content}</p>
            <button class="delete-btn" data-index="${index}">삭제</button>
            `;
            contentDiv.appendChild(card);
        });

        const deleteButtons = document.querySelectorAll('.delete-btn');
        deleteButtons.forEach(button => {
            button.addEventListener('click', function () {
                if (confirm('이 글을 삭제하시겠습니까?')) {
                    const index = this.getAttribute('data-index');
                    deletePost(index);
                }                
                
            });
        });
    }
});

function deletePost(index) {
    const posts = JSON.parse(localStorage.getItem('posts')) || [];
    posts.splice(index, 1);
    localStorage.setItem('posts', JSON.stringify(posts));
    location.reload();
}