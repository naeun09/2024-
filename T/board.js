document.addEventListener('DOMContentLoaded', function () {
    const contentDiv = document.querySelector('.content');
    const infos = JSON.parse(localStorage.getItem('infos')) || [];

    if (infos.length === 0) {
        contentDiv.innerHTML = '<p>추가된 정보가 없습니다.</p>';
    } else {
        infos.forEach((info, index) => {
            const card = document.createElement('div');
            card.classList.add('card');
            card.innerHTML = `
            <h3><a href="post_detail.html?id=${index}">${info.title}</a></h3>
            <p>${info.content}</p>
            ${info.image ? `<img src="${info.image}" alt="정보 이미지" style="width:100%; height:auto; margin-top:10px;">` : ''}
            <button class="delete-btn" data-index="${index}">삭제</button>
            `;
            contentDiv.appendChild(card);
        });
        const deleteButtons = document.querySelectorAll('.delete-btn');
        deleteButtons.forEach(button => {
            button.addEventListener('click', function () {
                if (confirm('이 정보를 삭제하시겠습니까?')) {
                    const index = this.getAttribute('data-index');
                    deleteinfos(index);
                }                
                
            });
        });
    }
});

function deleteinfos(index) {
    const infos = JSON.parse(localStorage.getItem('infos')) || [];
    infos.splice(index, 1);
    localStorage.setItem('infos', JSON.stringify(infos));
    location.reload();
}