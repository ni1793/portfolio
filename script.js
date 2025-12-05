// ==========================================
// 1. 作品集資料區 (projectsData)
// ==========================================
const projectsData = [
    {
        id: 1,
        title: "視界的距離-展覽主視覺設計",
        cover: "images/project1/cover.jpg",
        description: "我用望遠鏡，看見我想看見的東西，是你，是透過孔洞看見的風景",
        images: [
            "images/project1/01.jpg",
            "images/project1/02.jpg",
            "images/project1/03.jpg",
            "images/project1/04.jpg",
            "images/project1/05.jpg"
        ]
    },
    {
        id: 2,
        title: "擁有一具纖薄的身體-展覽主視覺設計",
        cover: "images/project2/cover.jpg",
        description: " ",
        images: [
            "images/project2/01.jpg",
            "images/project2/02.jpg",
            "images/project2/03.jpg",
            "images/project2/04.jpg",
            "images/project2/05.jpg",
            "images/project2/06.jpg"
        ]
    },
    {
        id: 3,
        title: "繼續播放-展覽網頁宣傳",
        cover: "images/project3/cover.jpg",
        description: " ",
        images: [
            "images/project3/01.jpg",
            "images/project3/02.jpg",
            "images/project3/03.jpg",
            "images/project3/04.jpg"
        ]
    },
    {
        id: 4,
        title: "平衡的輪廓-展覽主視覺設計",
        cover: "images/project4/cover.jpg",
        description: " ",
        images: [
            "images/project4/01.jpg",
            "images/project4/02.jpg",
            "images/project4/03.jpg"
        ]
    },
    {
        id: 5,
        title: "插畫 Illustration",
        cover: "images/project5/cover.jpg",
        description: " ",
        images: [
            "images/project5/01.jpg",
            "images/project5/02.jpg",
            "images/project5/03.jpg",
            "images/project5/04.jpg",
            "images/project5/05.jpg",
            "images/project5/06.jpg",
            "images/project5/07.jpg",
            "images/project5/08.jpg"
        ]
    }
];

// ==========================================
// 2. 攝影相簿資料區
// ==========================================
const photographyData = [
    "images/album/01.jpg",
    "images/album/02.jpg",
    "images/album/03.jpg"
];

// ==========================================
// 3. 基礎功能
// ==========================================
function navigateTo(pageId) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(pageId).classList.add('active');
}

const homePage = document.getElementById('home-page');
const heroText = document.getElementById('hero-text');

if (homePage && heroText) {
    homePage.addEventListener('mousemove', (e) => {
        const x = (window.innerWidth / 2 - e.pageX) / 25;
        const y = (window.innerHeight / 2 - e.pageY) / 25;
        heroText.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;
    });
}

// ==========================================
// 4. 生成桌面資料夾
// ==========================================
function renderDesktopFolders() {
    const container = document.getElementById('desktop-folders-container');
    if (!container) return; // 保護機制
    container.innerHTML = ''; // 清空舊內容

    const isDesktop = window.innerWidth > 768;
    let placedPositions = [];

    projectsData.forEach((project, index) => {
        const folder = document.createElement('div');
        folder.className = 'folder';
        // 確保這裡綁定的是 openProjectDetail，並傳入正確的 ID
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
            const pos = getRandomPosition(index, placedPositions);
            folder.style.left = pos.left + '%';
            folder.style.top = pos.top + '%';
            const rotate = (Math.random() * 16 - 8).toFixed(1); 
            folder.style.transform = `rotate(${rotate}deg)`;
            placedPositions.push(pos);
        }

        container.appendChild(folder);
    });
}

function getRandomPosition(index, placedPositions) {
    let top, left;
    let safe = false;
    let attempts = 0;
    const centerXMin = 30;
    const centerXMax = 70; 
    const centerYMin = 35;
    const centerYMax = 65; 
    const minDistanceX = 8; 
    const minDistanceY = 12;

    while (!safe && attempts < 150) {
        left = Math.random() * 85 + 5; 
        top = Math.random() * 75 + 5; 

        const inCenterX = left > centerXMin && left < centerXMax;
        const inCenterY = top > centerYMin && top < centerYMax;
        const hitsText = inCenterX && inCenterY;

        let hitsFolder = false;
        for (let pos of placedPositions) {
            const distLeft = Math.abs(left - pos.left);
            const distTop = Math.abs(top - pos.top);
            if (distLeft < minDistanceX && distTop < minDistanceY) {
                hitsFolder = true;
                break;
            }
        }

        if (!hitsText && !hitsFolder) {
            safe = true;
        }
        attempts++;
    }
    
    if (!safe) {
        left = 5 + (index * 5) % 20; 
        top = 10 + (index * 10) % 80;
    }
    return { top, left };
}

// ==========================================
// 5. 打開作品詳情 (重要功能)
// ==========================================
function openProjectDetail(id) {
    const project = projectsData.find(p => p.id === id);
    if (!project) return;

    const titleEl = document.getElementById('detail-title');
    const contentEl = document.getElementById('detail-content');
    const modal = document.getElementById('project-modal');

    // 如果 HTML 裡找不到 modal，就在 Console 報錯
    if (!modal || !titleEl || !contentEl) {
        console.error("找不到 Modal 的 HTML 元素，請檢查 index.html");
        return;
    }

    // 1. 填入標題
    titleEl.innerText = project.title;
    
    // 2. 填入圖片
    const imagesHtml = project.images.map(img => 
        `<img src="${img}" style="width:100%; border-radius:8px; margin-bottom:20px; box-shadow:0 2px 10px rgba(0,0,0,0.1);">`
    ).join('');
    
    contentEl.innerHTML = `
        <div class="detail-info" style="margin-bottom:30px;">
            <h2 style="margin-top:0; font-size: 1.5rem;">${project.title}</h2>
            <p style="color:#666; line-height:1.6;">${project.description}</p>
        </div>
        <div class="detail-images">${imagesHtml}</div>
        <div style="height:50px;"></div>
    `;

    // 3. 顯示視窗
    modal.classList.remove('hidden');
}

function closeProjectModal() {
    const modal = document.getElementById('project-modal');
    if(modal) modal.classList.add('hidden');
    setTimeout(() => {
        const content = document.getElementById('detail-content');
        if(content) content.innerHTML = '';
    }, 300);
}

// ==========================================
// 6. 打開相簿
// ==========================================
function openPhotoGallery() {
    const titleEl = document.getElementById('detail-title');
    const contentEl = document.getElementById('detail-content');
    const modal = document.getElementById('project-modal');
    
    if (!modal) {
        console.error("Modal 遺失");
        return;
    }

    titleEl.innerText = "攝影作品";
    
    const galleryHtml = photographyData.map(imgSrc => 
        `<div class="photo-item" onclick="openLightbox('${imgSrc}')">
            <img src="${imgSrc}" loading="lazy">
         </div>`
    ).join('');
    
    contentEl.innerHTML = `
        <div class="detail-info">
            <h2 style="font-size: 1.5rem; margin-top:0;">Photography</h2>
            <p style="color:#666;">這裡是我透過鏡頭記錄下的畫面。</p>
        </div>
        <div class="photo-grid">
            ${galleryHtml}
        </div>
        <div style="height:50px;"></div>
    `;

    modal.classList.remove('hidden');
}

// ==========================================
// 7. 燈箱功能
// ==========================================
function openLightbox(src) {
    const lightbox = document.getElementById('lightbox');
    const img = document.getElementById('lightbox-img');
    if (lightbox && img) {
        img.src = src;
        lightbox.classList.remove('hidden');
    }
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        lightbox.classList.add('hidden');
        setTimeout(() => {
            const img = document.getElementById('lightbox-img');
            if(img) img.src = '';
        }, 300);
    }
}

// ==========================================
// 8. 登入與時鐘
// ==========================================
function updateClock() {
    const now = new Date();
    const timeElement = document.getElementById('clock-time');
    const dateElement = document.getElementById('clock-date');
    
    if (timeElement && dateElement) {
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        timeElement.textContent = `${hours}:${minutes}`;

        const options = { weekday: 'long', month: 'long', day: 'numeric' };
        dateElement.textContent = now.toLocaleDateString('en-US', options);
    }
}

setInterval(updateClock, 1000);
updateClock(); 

function unlockScreen() {
    const loginPage = document.getElementById('login-page');
    loginPage.classList.add('hidden');
    
    setTimeout(() => {
        navigateTo('home-page');
        // 關鍵：解鎖後才生成資料夾，避免位置計算錯誤
        renderDesktopFolders(); 
    }, 300);
}

document.addEventListener('keydown', (e) => {
    const loginPage = document.getElementById('login-page');
    if (e.key === 'Enter' && loginPage && !loginPage.classList.contains('hidden')) {
        unlockScreen();
    }
});

// ==========================================
// 9. 自定義滑鼠游標邏輯
// ==========================================
const cursor = document.getElementById('custom-cursor');

// 只有在非手機裝置才執行
if (window.innerWidth > 768 && cursor) {

    // 1. 跟隨滑鼠移動
    document.addEventListener('mousemove', (e) => {
        // 只有當不在 spotify 上面時，才顯示
        // (透過下面的 mouseenter/leave 控制 opacity，這裡只要負責動就好)
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        // 初始載入時顯示 (加個簡單判斷避免衝突)
        if (!e.target.closest('.spotify-widget')) {
             cursor.style.opacity = '1';
        }
    });

    // 2. 點擊效果
    document.addEventListener('mousedown', () => cursor.classList.add('clicking'));
    document.addEventListener('mouseup', () => cursor.classList.remove('clicking'));

    // 3. 智慧偵測：滑過可點擊物件變大
    const clickables = document.querySelectorAll('a, button, .folder, .dock-item, .password-wrapper, .traffic-light, .window-header span');
    
    // 靜態物件
    clickables.forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('hovering'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('hovering'));
    });
    
    // 動態物件 (相簿、聯絡人按鈕)
    document.addEventListener('mouseover', (e) => {
        if (e.target.closest('.photo-item') || e.target.closest('.action-btn')) {
            cursor.classList.add('hovering');
        }
    });
    document.addEventListener('mouseout', (e) => {
        if (e.target.closest('.photo-item') || e.target.closest('.action-btn')) {
            cursor.classList.remove('hovering');
        }
    });

    // 4. ▼▼▼ 新增：Spotify 區域游標處理 ▼▼▼
    const spotifyWidget = document.querySelector('.spotify-widget');
    if (spotifyWidget) {
        spotifyWidget.addEventListener('mouseenter', () => {
            cursor.style.opacity = '0'; // 進去時隱藏圓圈，只剩系統箭頭
        });
        spotifyWidget.addEventListener('mouseleave', () => {
            cursor.style.opacity = '1'; // 出來時圓圈浮現
        });
    }
}