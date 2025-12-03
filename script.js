// --- 1. 資料區 (每個 {} 代表一個桌面上的資料夾) ---
const projectsData = [
    {
        id: 1,
        title: "視界的距離-展覽主視覺設計",
        cover: "images/project1/cover.jpg",
        description: "我用望遠鏡，看見我想看見的東西，是你，是透過孔洞看見的風景",
        images: [
            "images/project1/01.jpg",  // 第一張
            "images/project1/02.jpg",  // 第二張
            "images/project1/03.jpg",  // 第三張
            "images/project1/04.jpg",  // 每一張後面都要有逗號
            "images/project1/05.jpg"   // 最後一張可以不用逗號
        ]
    },
    {
        id: 2,
        title: "擁有一具纖薄的身體-展覽主視覺設計",
        cover: "images/project2/cover.jpg",
        description: " ",
        images: [
            "images/project2/01.jpg",  // 第一張
            "images/project2/02.jpg",  // 第二張
            "images/project2/03.jpg",  // 第三張
            "images/project2/04.jpg",  // 每一張後面都要有逗號
            "images/project2/05.jpg",  
            "images/project2/06.jpg"   // 最後一張可以不用逗號
        ]
    },
    {
        id: 3,
        title: "繼續播放-展覽網頁宣傳",
        cover: "images/project3/cover.jpg",
        description: " ",
        images: [
            "images/project3/01.jpg",  // 第一張
            "images/project3/02.jpg",  // 第二張
            "images/project3/03.jpg",  // 第三張
            "images/project3/04.jpg"
        ]
    },
    {
        id: 4,
        title: "平衡的輪廓-展覽主視覺設計",
        cover: "images/project4/cover.jpg",
        description: " ",
        images: [
            "images/project4/01.jpg",  // 第一張
            "images/project4/02.jpg",  // 第二張
            "images/project4/03.jpg"
        ]
    },
    {
        id: 5,
        title: "插畫 Illustration",
        cover: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800",
        description: "為雜誌繪製的系列插圖。",
        images: ["https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800"]
    },
     // 你可以繼續增加更多，資料夾會自動變多...
];

// --- 2. 頁面切換 ---
function navigateTo(pageId) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(pageId).classList.add('active');
}

// --- 3. 首頁文字跟隨滑鼠 ---
const homePage = document.getElementById('home-page');
const heroText = document.getElementById('hero-text');

homePage.addEventListener('mousemove', (e) => {
    const x = (window.innerWidth / 2 - e.pageX) / 25;
    const y = (window.innerHeight / 2 - e.pageY) / 25;
    heroText.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;
});

// --- 4. 隨機撒資料夾 (含防重疊邏輯) ---
function renderDesktopFolders() {
    const container = document.getElementById('desktop-folders-container');
    container.innerHTML = '';

    const isDesktop = window.innerWidth > 768;
    
    // 用來記錄已經放置的位置，避免重疊
    let placedPositions = [];

    projectsData.forEach((project, index) => {
        const folder = document.createElement('div');
        folder.className = 'folder';
        folder.onclick = () => openProjectDetail(project.id);
        
        folder.innerHTML = `
            <div class="folder-icon">
                <svg viewBox="0 0 100 100" fill="#007AFF">
                    <path d="M10,35 L40,35 L45,25 L90,25 C95.5,25 100,29.5 100,35 L100,85 C100,90.5 95.5,95 90,95 L10,95 C4.5,95 0,90.5 0,85 L0,45 C0,39.5 4.5,35 10,35 Z" opacity="0.8"></path>
                    <rect x="0" y="40" width="100" height="55" rx="5" ry="5"></rect>
                </svg>
            </div>
            <span class="folder-name">${project.title}</span>
        `;

        if (isDesktop) {
            // 傳入 index 和 目前已放置的清單
            const pos = getRandomPosition(index, placedPositions);
            
            folder.style.left = pos.left + '%';
            folder.style.top = pos.top + '%';
            
            // 隨機旋轉角度 (-8度 ~ +8度)
            const rotate = (Math.random() * 16 - 8).toFixed(1); 
            folder.style.transform = `rotate(${rotate}deg)`;

            // 記錄這個位置成功了
            placedPositions.push(pos);
        }

        container.appendChild(folder);
    });
}

// 計算位置函數：避開中間文字 + 避開其他資料夾
function getRandomPosition(index, placedPositions) {
    let top, left;
    let safe = false;
    let attempts = 0;

    // 定義中間不可放置的區域 (文字區)
    const centerXMin = 30; // %
    const centerXMax = 70; // %
    const centerYMin = 35; // %
    const centerYMax = 65; // %

    // 定義每個資料夾的「安全距離」(避免重疊)
    // 因為單位是 %，這裡設定大概 8% ~ 10% 的寬高作為安全範圍
    const minDistanceX = 8; 
    const minDistanceY = 12;

    while (!safe && attempts < 150) { // 嘗試 150 次
        // 隨機生成 5% ~ 90% 的位置
        left = Math.random() * 85 + 5; 
        top = Math.random() * 75 + 5; 

        // 1. 檢查是否撞到中間文字
        const inCenterX = left > centerXMin && left < centerXMax;
        const inCenterY = top > centerYMin && top < centerYMax;
        const hitsText = inCenterX && inCenterY;

        // 2. 檢查是否撞到其他已經存在的資料夾
        let hitsFolder = false;
        for (let pos of placedPositions) {
            // 檢查水平和垂直距離是否都太近
            const distLeft = Math.abs(left - pos.left);
            const distTop = Math.abs(top - pos.top);
            
            if (distLeft < minDistanceX && distTop < minDistanceY) {
                hitsFolder = true;
                break; // 撞到了，不用再檢查其他的，直接重算
            }
        }

        // 如果既沒撞到文字，也沒撞到資料夾，就是安全的
        if (!hitsText && !hitsFolder) {
            safe = true;
        }
        attempts++;
    }
    
    // 如果算了150次還是找不到位置 (可能資料夾太多)，就強制找個空位或堆疊
    if (!safe) {
        // 簡單的降級策略：隨便放旁邊
        left = 5 + (index * 5) % 20; 
        top = 10 + (index * 10) % 80;
    }

    return { top, left };
}

// --- 5. 打開作品詳情 (Modal 模式) ---
function openProjectDetail(id) {
    const project = projectsData.find(p => p.id === id);
    if (!project) return;

    // 1. 填入標題
    document.getElementById('detail-title').innerText = "攝影作品";
    
    // 2. 填入內容
    const content = document.getElementById('detail-content');
    const imagesHtml = project.images.map(img => 
        `<img src="${img}" style="width:100%; border-radius:8px; margin-bottom:20px; box-shadow:0 2px 10px rgba(0,0,0,0.1);">`
    ).join('');
    
content.innerHTML = `
        <div class="detail-info" style="margin-bottom:30px;">
            <h2 style="margin-top:0; font-size: 1.3rem;">${project.title}</h2>
            
            <p style="color:#666; line-height:1.6;">${project.description}</p>
        </div>
        <div class="detail-images">${imagesHtml}</div>
        
        <div style="height:50px;"></div>
    `;

    // 3. 顯示視窗 (移除 hidden class)
    const modal = document.getElementById('project-modal');
    modal.classList.remove('hidden');
}

// --- 6. 關閉作品詳情 ---
function closeProjectModal() {
    const modal = document.getElementById('project-modal');
    modal.classList.add('hidden');
    
    // 關閉後清空內容 (選配，讓下次打開不會閃一下舊內容)
    setTimeout(() => {
        document.getElementById('detail-content').innerHTML = '';
    }, 300);
}
// --- 6. 登入畫面邏輯 ---

// 更新時間與日期
function updateClock() {
    const now = new Date();
    const timeElement = document.getElementById('clock-time');
    const dateElement = document.getElementById('clock-date');
    
    // 時間格式 HH:MM
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    timeElement.textContent = `${hours}:${minutes}`;

    // 日期格式 (例如：Monday, June 5)
    const options = { weekday: 'long', month: 'long', day: 'numeric' };
    dateElement.textContent = now.toLocaleDateString('en-US', options);
}

// 啟動時鐘
setInterval(updateClock, 1000);
updateClock(); // 頁面載入時先執行一次

// 解鎖進入桌面
function unlockScreen() {
    const loginPage = document.getElementById('login-page');
    const homePage = document.getElementById('home-page');
    
    // 1. 登入頁淡出
    loginPage.classList.add('hidden');
    
    // 2. 等待動畫結束後，將主頁設為 active (這樣 desktop folders 才會開始運算位置)
    // 稍微延遲一點點讓視覺更順暢
    setTimeout(() => {
        navigateTo('home-page');
        
        // 觸發一次重新排版，確保資料夾位置正確
        renderDesktopFolders(); 
    }, 300);
}

// 支援按 Enter 鍵解鎖
document.addEventListener('keydown', (e) => {
    const loginPage = document.getElementById('login-page');
    // 只有在登入頁還沒消失時才有效
    if (e.key === 'Enter' && !loginPage.classList.contains('hidden')) {
        unlockScreen();
    }
});

// --- 攝影作品資料區 ---
const photographyData = [
    "images/album/01.jpg",
    "images/album/02.jpg",
    "images/album/03.jpg"
];

// --- 打開相簿函式 (更新版) ---
function openPhotoGallery() {
    document.getElementById('detail-title').innerText = "攝影作品";
    const content = document.getElementById('detail-content');
    
    // ▼▼▼ 修改這裡：加上 onclick="openLightbox(...)" ▼▼▼
    const galleryHtml = photographyData.map(imgSrc => 
        `<div class="photo-item" onclick="openLightbox('${imgSrc}')">
            <img src="${imgSrc}" loading="lazy">
         </div>`
    ).join('');
    
    content.innerHTML = `
        <div class="detail-info">
            <p style="color:#666;">透過鏡頭記錄下的畫面</p>
        </div>
        <div class="photo-grid">
            ${galleryHtml}
        </div>
        <div style="height:50px;"></div>
    `;

    const modal = document.getElementById('project-modal');
    modal.classList.remove('hidden');
}

// --- 新增：燈箱控制功能 ---
function openLightbox(src) {
    const lightbox = document.getElementById('lightbox');
    const img = document.getElementById('lightbox-img');
    
    img.src = src; // 設定大圖路徑
    lightbox.classList.remove('hidden'); // 顯示燈箱
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.classList.add('hidden'); // 隱藏燈箱
    
    // 清空圖片 src，避免下次打開時閃爍舊圖
    setTimeout(() => {
        document.getElementById('lightbox-img').src = '';
    }, 300);
}