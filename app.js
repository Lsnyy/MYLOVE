// app.js
const gameList = document.getElementById("gameList");
const filterButtons = document.querySelectorAll(".filter-buttons button");
const searchInput = document.getElementById("searchInput");

// 定义全局变量存储当前过滤条件
let currentFilter = "all";
let currentSearchKeyword = "";

// 综合过滤函数
function filterGames() {
    const filteredGames = games.filter(game => {
        // 分类筛选
        const matchCategory = currentFilter === "all" || game.category === currentFilter;
        // 关键词搜索（标题或分类）
        const matchSearch = game.title.toLowerCase().includes(currentSearchKeyword) || 
                           game.category.toLowerCase().includes(currentSearchKeyword);
        return matchCategory && matchSearch;
    });
    loadGames(filteredGames);
}

// 动态加载游戏列表
function loadGames(gamesToLoad) {
    gameList.innerHTML = "";
    gamesToLoad.forEach(game => {
         gameList.innerHTML += `
       <a href="redirect.html?url=${encodeURIComponent(game.url)}" class="game-card" target="_blank">
           <img src="${game.image}" alt="${game.title}">
           <h3>${game.title}</h3>
       </a >
   `;
    });
}

// 分类按钮点击事件
filterButtons.forEach(button => {
    button.addEventListener("click", () => {
        filterButtons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");
        currentFilter = button.dataset.filter;
        filterGames();
    });
});

// 搜索框输入事件（实时搜索）
searchInput.addEventListener("input", (e) => {
    currentSearchKeyword = e.target.value.trim().toLowerCase();
    filterGames();
});

// 初始化页面
filterGames();
