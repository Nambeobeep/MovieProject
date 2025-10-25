const STUDIO_GHIBLI_API = "https://ghibliapi.vercel.app/films";

window.onload = function() {
    taiphim();
};

async function taiphim() {
    try {
        document.getElementById("movie-list").innerHTML = "Đang tải dữ liệu...";
        const response = await fetch(STUDIO_GHIBLI_API);
        if(!response.ok) throw new Error('không thể tải dữ liệu phim');
        const data = await response.json();
        renderFilms(data);
    } catch (error) {
        document.getElementById("movie-list").innerHTML = "Lỗi khi tải dữ liệu phim: " + error.message;
    }
}
function renderFilms(films) {
    const html = films.map(phim => 
        `<div class="movie-card">
            <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjBmMGYwIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPk5vIEltYWdlPC90ZXh0Pjwvc3ZnPg==" alt="${phim.title}">
            <h3>${phim.title}</h3>
            <p><strong>Năm:</strong> ${phim.release_date}</p>
            <p><strong>Đạo diễn:</strong> ${phim.director}</p>
            <p><strong>Mô tả:</strong> ${phim.description}</p>
        </div>`
    ).join('');
    document.getElementById("movie-list").innerHTML = html;
}