const STUDIO_GHIBLI_API = "https://ghibliapi.vercel.app/films";

window.onload = function() {
    taiphim();
};

async function taiphim() {
    try {
        document.getElementById("movieList").innerHTML = "Đang tải dữ liệu...";
        const response = await fetch(STUDIO_GHIBLI_API);
        if(!response.ok) throw new Error('không thể tải dữ liệu phim');
        const data = await response.json();
        renderFilms(data);
    } catch (error) {
        document.getElementById("movieList").innerHTML = "Lỗi khi tải dữ liệu phim: " + error.message;
    }
}
function renderFilms(films) {
    const html = films.map(phim => 
        `<div class="movie-card">
            <img src="${phim.image}" alt="${phim.title}">
            <h3>${phim.title}</h3>
            <p><strong>Năm:</strong> ${phim.release_date}</p>
            <p><strong>Đạo diễn:</strong> ${phim.director}</p>
            <p><strong>Điểm:</strong> ${phim.rt_score}/100</p>
            <p><strong>Mô tả:</strong> ${phim.description}</p>
        </div>`
    ).join('');
    document.getElementById("movieList").innerHTML = html;
}