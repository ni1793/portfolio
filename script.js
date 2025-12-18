// ===============================================
// 1. 資料設定
// ===============================================

const projects = [
    { 
        id: 1, title: "是你嘗試著踢球,還是球引領著你到某方?", category: "展覽主視覺設計", 
        cover: "images/project1/01.jpg", description: "楊祐丞個展", 
        images: ["images/project1/01.jpg", "images/project1/02.jpg", "images/project1/03.jpg"] 
    },
    { 
        id: 2, title: "∞One", category: "展覽主視覺設計", 
        cover: "images/project2/01.jpg", description: "廖琳俐個展", 
        images: ["images/project2/01.jpg", "images/project2/02.jpg"] 
    },
    { 
        id: 3, title: "平衡的輪廓", category: "展覽主視覺設計", 
        cover: "images/project3/01.jpg", description: "李芷筠、張舫少芹雙個展", 
        images: ["images/project3/01.jpg", "images/project3/02.jpg", "images/project3/03.jpg", "images/project3/04.jpg"] 
    },
    { 
        id: 4, title: "繼續播放", category: "展覽網頁宣傳", 
        cover: "images/project4/01.jpg", description: "張舫少芹個展", 
        images: ["images/project4/01.jpg", "images/project4/02.jpg", "images/project4/03.jpg", "images/project4/04.jpg"] 
    },
    { 
        id: 5, title: "櫻桃丘比特", category: "中文logo標準字設計", 
        cover: "images/project5/01.jpg", description: "櫻桃丘比特女僕咖啡廳", 
        images: ["images/project5/01.jpg", "images/project5/02.jpg", "images/project5/03.jpg"] 
    },
    { 
        id: 6, title: "麵屋濃軒", category: "logo標準字及海報設計", 
        cover: "images/project6/01.jpg", description: "麵屋濃軒拉麵店", 
        images: ["images/project6/01.jpg", "images/project6/02.jpg", "images/project6/03.jpg", "images/project6/04.jpg", "images/project6/05.jpg", "images/project6/06.jpg"] 
    },
    { 
        id: 7, title: "水耀日", category: "展覽主視覺設計", 
        cover: "images/project7/01.jpg", description: "廖琳俐個展", 
        images: ["images/project7/01.jpg", "images/project7/02.jpg", "images/project7/03.jpg"] 
    },

    { 
        id: 8, title: "擁有一具纖薄的身體", category: "展覽主視覺設計", 
        cover: "images/project8/01.jpg", description: "彭思錡個展", 
        images: ["images/project8/01.jpg", "images/project8/02.jpg", "images/project8/03.jpg", "images/project8/04.jpg", "images/project8/05.jpg", "images/project8/06.jpg"] 
    },
    { 
        id: 9, title: "視界的距離", category: "展覽主視覺設計",  
        cover: "images/project9/01.jpg", description: "張舫少芹個展", 
        images: ["images/project9/01.jpg", "images/project9/02.jpg", "images/project9/03.jpg","images/project9/04.jpg", "images/project9/05.jpg" ] 
    },
    { 
        id: 10, title: "插畫 Illustration", category: "插畫作品", 
        cover: "images/project10/01.jpg", description: "", 
        images: ["images/project10/01.jpg", "images/project10/02.jpg", "images/project10/03.jpg", "images/project10/04.jpg", "images/project10/05.jpg", "images/project10/06.jpg", "images/project10/07.jpg", "images/project10/08.jpg"] 
    }
];

const albumData = [
    // 1. 資料夾：Travel (放在左下)
    { 
        type: 'folder', id: 101, title: "Travel", category: "Album", 
        cover: "images/album/01.jpg", description: "Journey", 
        images: ["images/album/01.jpg", "images/album/02.jpg"],
        pos: { left: 75, top: 25, rotate: -3 } // 固定位置 %
    },
    // 2. 資料夾：Snapshots (放在右上)
    { 
        type: 'folder', id: 102, title: "Snapshots", category: "Album", 
        cover: "images/album/02.jpg", description: "Daily Life", 
        images: ["images/album/02.jpg", "images/album/03.jpg"],
        pos: { left: 75, top: 10, rotate: 2 }
    },
    
    // 3. 小工具：時鐘 (放在左上，最顯眼)
    { 
        type: 'widget-clock', id: 'w1', title: 'Clock', 
        pos: { left: 20, top: 10, rotate: 0 } 
    },
    // 4. 小工具：行事曆 (放在右下)
    { 
        type: 'widget-calendar', id: 'w2', title: 'Calendar', 
        pos: { left: 20, top: 30, rotate: 0 } 
    },
    // 5. 小工具：備忘錄 (放在中間偏下)
    { 
        type: 'widget-note', id: 'w3', title: 'Notes', 
        pos: { left: 45, top: 35, rotate: 4 } 
    }
];

// ===============================================
// 2. 初始化頁面內容
// ===============================================

const workGrid = document.getElementById('work-grid');
const tickerTrack = document.getElementById('ticker-track');

// 生成作品集網格
projects.forEach(project => {
    const card = document.createElement('div');
    card.classList.add('work-card');
    card.innerHTML = `
        <div class="image-wrapper"><img src="${project.cover}" alt="${project.title}"loading="lazy"></div>
        <div class="work-info"><span>${project.title}</span><span>${project.category}</span></div>
    `;
    card.addEventListener('click', () => openProjectDetail(project));
    workGrid.appendChild(card);
});

// 生成頂部跑馬燈
const allCovers = projects.map(p => p.cover);
const tickerImages = [...allCovers, ...allCovers, ...allCovers];
tickerImages.forEach(src => {
    const item = document.createElement('div');
    item.classList.add('ticker-item');
    item.innerHTML = `<img src="${src}" alt="ticker">`;
    tickerTrack.appendChild(item);
});

// ===============================================
// 3. 桌面資料夾與小工具功能 (固定位置版)
// ===============================================

function renderDesktopFolders() {
    const container = document.getElementById('desktop-folders-container');
    if (!container) return;
    container.innerHTML = '';

    // 判斷是否為電腦版 (寬度 > 768px)
    const isDesktop = window.innerWidth > 768;

    albumData.forEach((item) => {
        let el;

        // --- 1. 判斷類型並建立 HTML 結構 ---
        
        // A. 資料夾 (Folder)
        if (item.type === 'folder') {
            el = document.createElement('div');
            el.className = 'folder';
            el.onclick = () => openProjectDetail(item);
            el.innerHTML = `
                <div class="folder-icon">
                    <svg viewBox="0 0 100 100" fill="#007AFF">
                        <path d="M10,35 L40,35 L45,25 L90,25 C95.5,25 100,29.5 100,35 L100,85 C100,90.5 95.5,95 90,95 L10,95 C4.5,95 0,90.5 0,85 L0,45 C0,39.5 4.5,35 10,35 Z" opacity="0.8"></path>
                        <rect x="0" y="40" width="100" height="55" rx="5" ry="5"></rect>
                    </svg>
                </div>
                <span class="folder-name">${item.title}</span>
            `;
        } 
        // B. 時鐘 (Clock)
        else if (item.type === 'widget-clock') {
            el = document.createElement('div');
            el.className = 'desktop-widget widget-clock';
            // 產生 12 個刻度
            let marks = '';
            for(let i=0; i<12; i++) {
                marks += `<div class="clock-mark" style="transform: rotate(${i*30}deg) translateY(5px)"></div>`;
            }
            el.innerHTML = `
                <div class="clock-face">
                    ${marks}
                    <div class="hand hour" id="widget-hour"></div>
                    <div class="hand minute" id="widget-minute"></div>
                    <div class="hand second" id="widget-second"></div>
                </div>
            `;
            // 啟動時鐘更新
            requestAnimationFrame(updateWidgetClock);
        }
        // C. 行事曆 (Calendar)
        else if (item.type === 'widget-calendar') {
            const now = new Date();
            const dayNames = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
            el = document.createElement('div');
            el.className = 'desktop-widget widget-calendar';
            el.innerHTML = `
                <div class="cal-header">${dayNames[now.getDay()]}</div>
                <div class="cal-body">${now.getDate()}</div>
            `;
        }
        // D. 備忘錄 (Notes)
        else if (item.type === 'widget-note') {
            el = document.createElement('div');
            el.className = 'desktop-widget widget-note';
            el.innerHTML = `
                <div class="note-title">To Do</div>
                <ul class="note-list">
                    <li>聽音樂 🎧</li>
                    <li>更新作品集</li>
                    <li>發呆...</li>
                </ul>
            `;
        }

        // --- 2. 設定位置 (關鍵修改) ---
        if (el) {
            // 只有在「電腦版」且該物件有設定「pos」時，才固定位置
            if (isDesktop && item.pos) {
                el.style.left = item.pos.left + '%';
                el.style.top = item.pos.top + '%';
                
                // 如果有設定旋轉角度就用，沒有就預設不轉
                const rotate = item.pos.rotate || 0;
                el.style.transform = `rotate(${rotate}deg)`;
            } else {
                // 手機版：清空所有定位樣式
                el.style.position = ''; 
                el.style.left = '';
                el.style.top = '';
                el.style.transform = ''; 
                el.style.margin = ''; 
            }
            
            container.appendChild(el);
        }
    });
}

// 桌面時鐘更新函式
function updateWidgetClock() {
    const now = new Date();
    const sec = now.getSeconds();
    const min = now.getMinutes();
    const hour = now.getHours();

    const secDeg = (sec / 60) * 360;
    const minDeg = ((min + sec/60) / 60) * 360;
    const hourDeg = ((hour + min/60) / 12) * 360;

    const elSec = document.getElementById('widget-second');
    const elMin = document.getElementById('widget-minute');
    const elHour = document.getElementById('widget-hour');

    if (elSec && elMin && elHour) {
        elSec.style.transform = `translateX(-50%) rotate(${secDeg}deg)`;
        elMin.style.transform = `translateX(-50%) rotate(${minDeg}deg)`;
        elHour.style.transform = `translateX(-50%) rotate(${hourDeg}deg)`;
    }
    requestAnimationFrame(updateWidgetClock);
}

// 隨機位置產生器 (保持不變)
function getRandomPosition(index, placedPositions) {
    let top, left;
    let safe = false;
    let attempts = 0;
    
    const centerXMin = 30; const centerXMax = 70; 
    const centerYMin = 10; const centerYMax = 25;

    // 限制生成高度，留白給底部的 Dock 和 Spotify
    const maxTop = 65; 
    const minTop = 15;
    
    const minDistanceX = 12; // 稍微增加間距以免小工具互撞
    const minDistanceY = 15;

    while (!safe && attempts < 150) {
        left = Math.random() * 85 + 5; 
        top = Math.random() * (maxTop - minTop) + minTop; 

        const inCenterX = left > centerXMin && left < centerXMax;
        const inCenterY = top > centerYMin && top < centerYMax;
        const hitsText = inCenterX && inCenterY;

        let hitsFolder = false;
        for (let pos of placedPositions) {
            const distLeft = Math.abs(left - pos.left);
            const distTop = Math.abs(top - pos.top);
            if (distLeft < minDistanceX && distTop < minDistanceY) {
                hitsFolder = true; break;
            }
        }
        if (!hitsText && !hitsFolder) safe = true;
        attempts++;
    }
    
    if (!safe) { left = 5 + (index * 12) % 90; top = 20 + (index * 10) % 40; }
    
    return { top, left };
}

renderDesktopFolders();
window.addEventListener('resize', renderDesktopFolders);
// ===============================================
// 4. Modal 邏輯 (包含聯絡人視窗)
// ===============================================

const modal = document.getElementById('project-modal');
const modalTitle = document.getElementById('modal-title');
const modalCat = document.getElementById('modal-category');
const modalDesc = document.getElementById('modal-desc');
const modalGallery = document.getElementById('modal-gallery');

function openProjectDetail(item) {
    modalTitle.textContent = item.title;
    modalCat.textContent = item.category;
    modalDesc.textContent = item.description;
    
    modalGallery.innerHTML = '';
    item.images.forEach(imgSrc => {
        const img = document.createElement('img');
        img.src = imgSrc;
        img.loading = "lazy";
        modalGallery.appendChild(img);
    });

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
document.getElementById('hint-bubble').style.display = 'none';
}

function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
document.getElementById('hint-bubble').style.display = '';
}

// 切換聯絡人視窗
function toggleContactOverlay(show) {
    const overlay = document.getElementById('custom-contact-overlay');
    if (show) {
        overlay.classList.remove('hidden');
    } else {
        overlay.classList.add('hidden');
    }
}

// ===============================================
// 5. WebGL Shader
// ===============================================

const container = document.getElementById('canvas-container');
const portfolioSection = document.querySelector('.portfolio-section');
const heroSection = document.querySelector('.hero-section');

const scene = new THREE.Scene();
const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
container.appendChild(renderer.domElement);

const vertexShader = `
    varying vec2 vUv;
    void main() { vUv = uv; gl_Position = vec4(position, 1.0); }
`;

const fragmentShader = `
    varying vec2 vUv;
    uniform float uProgress; 
    uniform float uVelocity;
    uniform float uRatio;
    vec3 c_bg = vec3(1.0, 1.0, 1.0);
    vec3 c_edge = vec3(1.0, 0.45, 0.05);
    vec3 c_body = vec3(0.05, 0.05, 0.05);

    void main() {
        vec2 center = vec2(0.5, 1.2); 
        vec2 pos = vUv - center;
        pos.x *= 0.6 * uRatio; 
        float dist = length(pos);
        
        float centerFocus = 1.0 - smoothstep(0.0, 0.8, abs(pos.x));
        centerFocus = pow(centerFocus, 1.5);
        
        float warp = sin(pos.x * 5.0 + uProgress) * uVelocity * 0.2;
        dist -= warp;
        
        float progressValue = (uProgress * 2.5) - dist;
        float edgeWidth = 0.02 + (0.04 * centerFocus);

        float bodyMask = smoothstep(0.5, 0.51, progressValue);
        float glowStart = 0.5 - edgeWidth;
        float glowMask = smoothstep(glowStart, 0.5, progressValue);
        float glowGradient = (progressValue - glowStart) / edgeWidth;
        glowGradient = clamp(glowGradient, 0.0, 1.0);

        vec3 finalColor = c_bg;
        float finalGlowAlpha = glowMask * (1.0 - bodyMask);
        finalColor = mix(finalColor, c_edge, finalGlowAlpha * glowGradient * 1.5);
        finalColor = mix(finalColor, c_body, bodyMask);
        gl_FragColor = vec4(finalColor, 1.0);
    }
`;

const uniforms = {
    uProgress: { value: 0 },
    uVelocity: { value: 0 },
    uRatio: { value: window.innerWidth / window.innerHeight }
};

const geometry = new THREE.PlaneGeometry(2, 2);
const material = new THREE.ShaderMaterial({ vertexShader, fragmentShader, uniforms, transparent: true });
scene.add(new THREE.Mesh(geometry, material));

let currentScroll = 0;
let targetScroll = 0;
let triggerHeight = window.innerHeight * 1.0; 

let isHeroVisible = true; // 新增狀態旗標

window.addEventListener('scroll', () => {
    targetScroll = window.scrollY;
    
    // 只有當狀態真的改變時，才去動 CSS
    if (window.scrollY > window.innerHeight * 0.6) {
        if (isHeroVisible) {
            portfolioSection.style.opacity = 1;
            heroSection.style.opacity = 0;
            heroSection.style.visibility = 'hidden'; // 多加這行，讓滑鼠事件也穿透
            isHeroVisible = false;
        }
    } else {
        if (!isHeroVisible) {
            portfolioSection.style.opacity = 0;
            heroSection.style.opacity = 1;
            heroSection.style.visibility = 'visible';
            isHeroVisible = true;
        }
    }
});

function animate() {
    requestAnimationFrame(animate);
    currentScroll += (targetScroll - currentScroll) * 0.05;
    const velocity = (targetScroll - currentScroll) * 0.005;
    let progress = currentScroll / triggerHeight;
    progress = Math.max(0, Math.min(progress, 1.2));

    uniforms.uVelocity.value = velocity;
    uniforms.uProgress.value = progress;
function animate() {
    requestAnimationFrame(animate);

    // ▼▼▼ 新增這段：如果捲動超過螢幕高度，就停止渲染 ▼▼▼
    if (window.scrollY > window.innerHeight) {
        return; // 直接跳出，不耗費 GPU
    }
    // ▲▲▲ 休眠結束 ▲▲▲

    currentScroll += (targetScroll - currentScroll) * 0.05;
    const velocity = (targetScroll - currentScroll) * 0.005;
    let progress = currentScroll / triggerHeight;
    progress = Math.max(0, Math.min(progress, 1.2));

    uniforms.uVelocity.value = velocity;
    uniforms.uProgress.value = progress;
    renderer.render(scene, camera);
}}

animate();
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
container.appendChild(renderer.domElement);
    triggerHeight = window.innerHeight * 1.0;
    uniforms.uRatio.value = window.innerWidth / window.innerHeight;
});

// ===============================================
// 6. 自訂游標邏輯
// ===============================================

const cursor = document.getElementById('custom-cursor');

document.addEventListener('mousemove', (e) => {
    cursor.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
});

// Hover 效果
const interactiveElements = document.querySelectorAll('a, button, .work-card, .folder, .close-btn, .custom-dock-item, .info-value, .social-link');

document.addEventListener('mouseover', (e) => {
    const target = e.target;
    if (target.closest('a') || 
        target.closest('button') || 
        target.closest('.work-card') || 
        target.closest('.folder') ||
        target.closest('.close-btn') ||
        target.closest('.custom-dock-item') ||
        target.closest('.info-value') ||
        target.closest('.social-link')) {
        document.body.classList.add('hovering');
    } else {
        document.body.classList.remove('hovering');
    }
});

// Spotify Widget 區域：隱藏自訂紅點
const spotifyWidget = document.querySelector('.spotify-widget');
if (spotifyWidget) {
    spotifyWidget.addEventListener('mouseenter', () => {
        cursor.style.opacity = '0'; 
    });
    spotifyWidget.addEventListener('mouseleave', () => {
        cursor.style.opacity = '1'; 
    });
}

// script.js

// ===============================================
// 7. 左上角即時時鐘 (修改版) & 互動彩蛋
// ===============================================

function updateClock() {
    // 修改目標：只抓取數字部分的 span
    const timeDisplay = document.getElementById('time-part');
    if (!timeDisplay) return;

    const now = new Date();
    
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    // 只更新時間數字，保留後面的 span 結構
    timeDisplay.textContent = `${hours}:${minutes}:${seconds}`;

    requestAnimationFrame(updateClock);
}

// 啟動時鐘
updateClock();

// --- 新增：點擊 "in" 的互動函式 ---
function toggleMagic(element) {
    // 檢查是否已經變成 NI 了
    if (element.classList.contains('is-active')) {
        // 第 2 階段：已經是 NI 了，點擊打開聯絡視窗
        toggleContactOverlay(true);
    } else {
        // 第 1 階段：還是 in，執行變身動畫
        
        // 1. 先旋轉一半 (90度)
        element.style.transform = "rotateY(90deg)";
        
        // 2. 在旋轉到看不見時，偷換文字
        setTimeout(() => {
            element.textContent = "NI"; // 改成 NI
            element.classList.add('is-active'); //這會觸發 CSS 的變色與最終旋轉
            
            // 因為 CSS 設定 rotateY(180deg)，這裡文字會是反的
            // 所以我們不需要在這裡手動設回 0deg，而是利用 180deg 剛好翻轉的效果
            // 但因為文字鏡像了，我們可以用 scaleX(-1) 修正，或者直接用 rotate(360)
            // 為了簡單，我們讓它轉一圈變正：
            element.style.transform = "rotateY(360deg) scale(1.2)";
            
        }, 150); // 等待 CSS transition 一半的時間
    }
}
// ===============================================
// 8. 第二個 WebGL 渲染器：區塊間的過渡特效 (橘色黏液版)
// ===============================================

(function initTransitionWebGL() {
    const transContainer = document.getElementById('transition-container');
    const transCanvas = document.getElementById('transition-canvas');

    if (!transContainer || !transCanvas) return;

    // --- 初始化第二個 THREE.js 場景 ---
    const transScene = new THREE.Scene();
    const transCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const transRenderer = new THREE.WebGLRenderer({ 
        canvas: transCanvas, 
        alpha: true, // 允許透明
        antialias: true 
    });
    transRenderer.setSize(window.innerWidth, window.innerHeight);
    transRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));

    // --- Shader 定義 (移植自您的範例，並調整方向) ---
    const vertexShader = `
        varying vec2 vUv;
        void main() { vUv = uv; gl_Position = vec4(position, 1.0); }
    `;

    const fragmentShader = `
        varying vec2 vUv;
        uniform float uProgress; 
        uniform float uVelocity;
        uniform float uRatio;

        // 背景色 (透明)
        vec4 c_bg = vec4(0.0, 0.0, 0.0, 0.0); 
        // 邊緣色 (亮橘色)
        vec3 c_edge = vec3(1.0, 0.45, 0.05); 
        // 主體色 (純黑，連接上方的作品集)
        vec3 c_body = vec3(0.05, 0.05, 0.05); 

        void main() {
            // --- 1. 形狀與位置 ---
            // 設定中心在頂部上方 (1.3)，讓液體看起來是從上面流下來/拉上去的
            vec2 center = vec2(0.5, 1.3); 
            vec2 pos = vUv - center;
            pos.x *= 0.9 * uRatio; 
            float dist = length(pos);

            // --- 2. 中間集中度 ---
            float centerFocus = 1.0 - smoothstep(0.0, 0.7, abs(pos.x));
            centerFocus = centerFocus * centerFocus; 

            // 速度扭曲
            float warp = sin(pos.x * 5.0 + uProgress * 2.0) * uVelocity * 0.1;
            dist -= warp;

            // --- 3. 進度計算 ---
            // 隨著 uProgress 從 1 變 0，黑色區域會逐漸縮小
            float progressValue = (uProgress * 1.5 + 0.5) - dist;

            // --- 4. 色散範圍 (尾巴) ---
            float baseTail = 0.02; 
            float extraTail = 0.25 * centerFocus; // 中間尾巴更長
            float totalTailLength = baseTail + extraTail;

            // --- 5. 繪製 ---
            float bodyCutoff = 0.5;
            float bodyMask = smoothstep(bodyCutoff, bodyCutoff + 0.01, progressValue);

            float glowStart = bodyCutoff - totalTailLength;
            float glowMask = smoothstep(glowStart, bodyCutoff, progressValue);
            
            float glowGradient = (progressValue - glowStart) / totalTailLength;
            glowGradient = clamp(glowGradient, 0.0, 1.0); 
            glowGradient = pow(glowGradient, 0.6);

            // --- 6. 合成 ---
            vec4 finalColor = c_bg;
            
            // 橘色光暈
            float finalGlowAlpha = glowMask * (1.0 - bodyMask);
            finalColor.rgb = mix(finalColor.rgb, c_edge, finalGlowAlpha * glowGradient * 1.8);
            finalColor.a = max(finalColor.a, finalGlowAlpha);

            // 黑色主體
            finalColor.rgb = mix(finalColor.rgb, c_body, bodyMask);
            finalColor.a = max(finalColor.a, bodyMask);

            gl_FragColor = finalColor;
        }
    `;

    const uniforms = {
        uProgress: { value: 1.0 }, // 初始全黑
        uVelocity: { value: 0 },
        uRatio: { value: window.innerWidth / window.innerHeight }
    };

    const geometry = new THREE.PlaneGeometry(2, 2);
    const material = new THREE.ShaderMaterial({ 
        vertexShader, fragmentShader, uniforms, transparent: true 
    });
    transScene.add(new THREE.Mesh(geometry, material));

    // --- 捲動監聽與動畫 ---
    let currentTransScroll = 1;
    let targetTransScroll = 1;
    let isTransVisible = false;

    window.addEventListener('scroll', () => {
        const rect = transContainer.getBoundingClientRect();
        const viewportHeight = window.innerHeight;

        // 判斷容器是否在畫面中
        isTransVisible = (rect.top < viewportHeight && rect.bottom > 0);
        
        if (isTransVisible) {
            // 計算捲動進度 (0% ~ 100%)
            const start = rect.top + window.scrollY; // 容器頂端絕對位置
            const distance = window.scrollY - start; // 已捲動距離
            const totalDistance = rect.height - viewportHeight; // 可捲動總長度

            let progress = distance / totalDistance;
            progress = Math.max(0, Math.min(1, progress));
            
            // 捲動時：進度 0 (剛進入) -> uProgress 1 (全黑)
            //        進度 1 (離開)   -> uProgress 0 (消失)
            targetTransScroll = 1.0 - progress;
        }
    });

    function animateTrans() {
        requestAnimationFrame(animateTrans);
        if (!isTransVisible) return;

        // 平滑插值
        currentTransScroll += (targetTransScroll - currentTransScroll) * 0.08;
        const velocity = (targetTransScroll - currentTransScroll) * 8.0;

        uniforms.uProgress.value = currentTransScroll;
        uniforms.uVelocity.value = velocity;
        transRenderer.render(transScene, transCamera);
    }
    animateTrans();

    window.addEventListener('resize', () => {
        const width = window.innerWidth;
        const height = window.innerHeight;
        transRenderer.setSize(width, height);
        uniforms.uRatio.value = width / height;
    });

})();
// script.js - 提示泡泡邏輯 (兩階段互動版)

const hintBubble = document.getElementById('hint-bubble');
const bubbleContent = document.querySelector('.bubble-content');
let isHintRevealed = false; // 狀態標記：false = 顯示表情, true = 顯示文字

// 捲動監聽
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const viewportHeight = window.innerHeight;

    // 顯示邏輯 (離開 Hero 區且未到底部)
    if (scrollY > viewportHeight * 0.5 && scrollY < viewportHeight * 2.5) {
        hintBubble.classList.add('show');
    } else {
        hintBubble.classList.remove('show');
        
        // 關鍵：當泡泡消失時，偷偷把它重置回「🤫」狀態
        // 這樣下次滑過來時，又會變回神秘的樣子
        setTimeout(() => {
            resetBubbleState();
        }, 500); // 等待消失動畫結束後再重置
    }
});

// 點擊處理函式
function handleBubbleClick() {
    if (!isHintRevealed) {
        // 第一階段：點擊 🤫 -> 展開變成文字
        bubbleContent.innerHTML = '<i class="fas fa-arrow-up"></i> 那個...有空的話...要不要找找看 NI 跟 in...';
        hintBubble.classList.add('expanded'); // 觸發 CSS 變身動畫
        isHintRevealed = true; // 標記為已揭曉
    } else {
        // 第二階段：點擊文字 -> 執行回到頂部
        scrollToTop();
    }
}

// 回到頂部
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// 重置泡泡狀態函式
function resetBubbleState() {
    isHintRevealed = false;
    bubbleContent.innerHTML = '🤫';
    hintBubble.classList.remove('expanded');
}
// script.js - 向下捲動提示邏輯

const scrollHint = document.getElementById('scroll-hint');

window.addEventListener('scroll', () => {
    // 只要往下捲動超過 50px，箭頭就消失
    if (window.scrollY > 50) {
        scrollHint.classList.add('hide');
    } else {
        // 如果回到最頂端，箭頭再次出現
        scrollHint.classList.remove('hide');
    }
});

// 點擊箭頭時，平滑捲動到內容區 (約視窗高度的位置)
function scrollToContent() {
    window.scrollTo({
        top: window.innerHeight,
        behavior: 'smooth'
    });
}