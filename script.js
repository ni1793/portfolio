// ===============================================
// 1. 資料設定
// ===============================================

const projects = [
    { 
        id: 1, title: "是你嘗試著踢球,還是球引領著你到某方?", category: "展覽主視覺設計", 
        cover: "images/project1/02.jpg", description: "楊祐丞個展", 
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

// 這裡保留圖片資料，但會用於上方的 AI 精選區，而不是桌面的資料夾
const aiImages = [
    "images/album/a1/01.jpg", "images/album/a1/02.jpg", "images/album/a1/03.jpg", 
    "images/album/a1/04.jpg", "images/album/a2/01.jpg", "images/album/a2/02.jpg", 
    "images/album/a2/03.jpg", "images/album/a3/01.jpg", "images/album/a3/02.jpg", "images/album/a3/03.jpg", 
    "images/album/a4/01.jpg", "images/album/a4/02.jpg", "images/album/a4/03.jpg", "images/album/a4/04.jpg", 
    "images/album/a5/01.jpg", "images/album/a5/02.jpg", "images/album/a5/03.jpg", "images/album/a5/04.jpg", "images/album/a5/05.jpg", 
    "images/album/a6/01.jpg", "images/album/a6/02.jpg", "images/album/a6/03.jpg", "images/album/a6/04.jpg", "images/album/a6/05.jpg", "images/album/a6/06.jpg"
];

const desktopWidgets = [
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
        <div class="image-wrapper"><img src="${project.cover}" alt="${project.title}" loading="lazy"></div>
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
// 3. 桌面小工具 (移除資料夾)
// ===============================================

function renderDesktopFolders() {
    const container = document.getElementById('desktop-folders-container');
    if (!container) return;
    container.innerHTML = '';

    const isDesktop = window.innerWidth > 768;

    // ★★★ 修改重點：只渲染 Widget，完全不渲染 folder 類型的項目 ★★★
    desktopWidgets.forEach((item) => {
        let el;
        
        // B. 時鐘 (Clock)
        if (item.type === 'widget-clock') {
            el = document.createElement('div');
            el.className = 'desktop-widget widget-clock';
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

        if (el) {
            if (isDesktop && item.pos) {
                el.style.left = item.pos.left + '%';
                el.style.top = item.pos.top + '%';
                const rotate = item.pos.rotate || 0;
                el.style.transform = `rotate(${rotate}deg)`;
            } else {
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

renderDesktopFolders();
window.addEventListener('resize', renderDesktopFolders);

// ===============================================
// ★★★ 4. 修改：AI Feature Section & Gallery (固定佈局版) ★★★
// ===============================================

const aiFeatureSection = document.getElementById('ai-feature-trigger');
const aiBgCollage = document.getElementById('ai-feature-bg');
const aiOverlay = document.getElementById('ai-overlay');
const aiOverlayGrid = document.getElementById('ai-overlay-grid');

// A. 初始化上方區塊背景 (邏輯更新：固定座標 + 隨機圖片)
function initAIFeature() {
    if(!aiBgCollage) return;
    aiBgCollage.innerHTML = ''; // 清空

    // 1. 定義固定座標 (參考 Project 313 的圍繞式佈局)
    // 這些是固定的「坑」，座標以 % 為單位 (left, top)，width 控制大小
    // 中心點約為 50, 50 (標題位置)，我們避開中間
    const fixedLayout = [
        // --- 左半邊 ---
        { left: 25, top: 25, width: 15 }, // 左上 (加大)
        { left: 18, top: 50, width: 14 }, // 正左
        { left: 28, top: 75, width: 16 }, // 左下

        // --- 右半邊 ---
        { left: 75, top: 25, width: 16 }, // 右上
        { left: 82, top: 50, width: 14 }, // 正右
        { left: 72, top: 75, width: 17 }, // 右下

        // --- 中間補強 ---
        { left: 45, top: 18, width: 13 }, // 正上方
        { left: 55, top: 82, width: 15 }  // 正下方
    ];

    // 2. 資料篩選邏輯：同資料夾只取一張 (避免重複)
    const folderMap = {};
    // 先隨機打亂原始圖片庫
    const shuffledSource = [...aiImages].sort(() => 0.5 - Math.random());

    shuffledSource.forEach(path => {
        const folder = path.substring(0, path.lastIndexOf('/'));
        if (!folderMap[folder]) {
            folderMap[folder] = path;
        }
    });
    
    // 取得篩選後的圖片清單
    const selectedImages = Object.values(folderMap);

    // 3. 將圖片填入固定坑位
    // 我們只跑 fixedLayout 的迴圈，如果圖片不夠就只填前面幾個
    fixedLayout.forEach((slot, index) => {
        // 如果圖片用完了就停止
        if (index >= selectedImages.length) return;

        const src = selectedImages[index]; // 依序取出隨機排序後的圖片
        const img = document.createElement('img');
        img.src = src;
        img.className = 'ai-floating-img';
        
        // 套用固定樣式
        img.style.width = `${slot.width}%`;
        img.style.left = `${slot.left}%`;
        img.style.top = `${slot.top}%`;
        
        // 確保直立不旋轉，並設定基準點置中
        img.style.transform = `translate(-50%, -50%)`;

        aiBgCollage.appendChild(img);
    });

    // 4. 滑鼠視差效果 (Parallax)
    aiFeatureSection.addEventListener('mousemove', (e) => {
        // 計算滑鼠相對於視窗中心的偏移量 (-1 到 1)
        const x = (e.clientX / window.innerWidth - 0.5) * 2; 
        const y = (e.clientY / window.innerHeight - 0.5) * 2;
        
        const imgs = document.querySelectorAll('.ai-floating-img');
        imgs.forEach((img, i) => {
            // 設定移動係數：有些動得快(20px)，有些動得慢(10px)
            // 偶數索引動得快一點，製造層次感
            const intensity = (i % 2 === 0) ? 20 : 10;
            
            const moveX = x * intensity;
            const moveY = y * intensity;
            
            // 重要：保留 translate(-50%, -50%) 讓定位準確，再疊加視差位移
            img.style.transform = `translate(calc(-50% + ${moveX}px), calc(-50% + ${moveY}px))`;
        });
    });

    // 點擊觸發全螢幕
    aiFeatureSection.addEventListener('click', openAIOverlay);
}

// B. 開啟全螢幕圖庫 (保持不變，包含手機版滾動偵測)
function openAIOverlay() {
    aiOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    if (aiOverlayGrid.children.length === 0) {
        aiImages.forEach(src => {
            const item = document.createElement('div');
            item.className = 'ai-gallery-item';
            
            const img = document.createElement('img');
            img.src = src;
            img.loading = "lazy";
            
            item.appendChild(img);
            aiOverlayGrid.appendChild(item);
        });
        observeImagesInView();
    }
}

// C. 輔助函式 (保持不變)
function observeImagesInView() {
    const observerOptions = { root: aiOverlay, threshold: 0.2 };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('in-view');
            else entry.target.classList.remove('in-view'); 
        });
    }, observerOptions);
    const items = document.querySelectorAll('.ai-gallery-item');
    items.forEach(item => observer.observe(item));
}

function closeAIOverlay() {
    aiOverlay.classList.remove('active');
    document.body.style.overflow = '';
}

// 執行初始化
initAIFeature();

// ===============================================
// 5. 原有 Modal 邏輯
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

function toggleContactOverlay(show) {
    const overlay = document.getElementById('custom-contact-overlay');
    if (show) overlay.classList.remove('hidden');
    else overlay.classList.add('hidden');
}

// ===============================================
// 6. WebGL Shader (修正版：讓上方的 WebGL 正確顯示)
// ===============================================

const container = document.getElementById('canvas-container');
const portfolioSection = document.querySelector('.portfolio-section');
const heroSection = document.querySelector('.hero-section');
const aiSection = document.querySelector('.ai-feature-section'); // 新增

const scene = new THREE.Scene();
const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
container.appendChild(renderer.domElement);

const vertexShader = `varying vec2 vUv; void main() { vUv = uv; gl_Position = vec4(position, 1.0); }`;
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
let isHeroVisible = true;

window.addEventListener('scroll', () => {
    targetScroll = window.scrollY;
    
    if (window.scrollY > window.innerHeight * 0.5) {
        if (isHeroVisible) {
            // ★★★ 修改：同時讓 AI 區塊與作品集顯示 ★★★
            portfolioSection.style.opacity = 1;
            if(aiSection) aiSection.style.opacity = 1; // 新增
            
            heroSection.style.opacity = 0;
            heroSection.style.visibility = 'hidden';
            isHeroVisible = false;
        }
    } else {
        if (!isHeroVisible) {
            portfolioSection.style.opacity = 0;
            if(aiSection) aiSection.style.opacity = 0; // 新增
            
            heroSection.style.opacity = 1;
            heroSection.style.visibility = 'visible';
            isHeroVisible = true;
        }
    }
});

function animate() {
    requestAnimationFrame(animate);
    
    // ★★★ 移除睡眠邏輯，確保變形效果始終運作 ★★★
    // 原本的 return 邏輯刪除，確保 user 滾動時始終有反應

    currentScroll += (targetScroll - currentScroll) * 0.05;
    const velocity = (targetScroll - currentScroll) * 0.005;
    let progress = currentScroll / triggerHeight;
    progress = Math.max(0, Math.min(progress, 1.2));

    uniforms.uVelocity.value = velocity;
    uniforms.uProgress.value = progress;
    renderer.render(scene, camera);
}
animate();

window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    triggerHeight = window.innerHeight * 1.0;
    uniforms.uRatio.value = window.innerWidth / window.innerHeight;
});

// ===============================================
// 7. 自訂游標與互動 (保留)
// ===============================================

const cursor = document.getElementById('custom-cursor');
document.addEventListener('mousemove', (e) => {
    cursor.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
});
document.addEventListener('mouseover', (e) => {
    const target = e.target;
    if (target.closest('a') || target.closest('button') || target.closest('.work-card') || 
        target.closest('.folder') || target.closest('.close-btn') || target.closest('.custom-dock-item') ||
        target.closest('.info-value') || target.closest('.social-link') || target.closest('.magic-text') ||     
        target.closest('#magic-word') || target.closest('.contact-trigger') || target.closest('.ai-feature-section') || 
        target.closest('.close-btn-ai')
       ) {
        document.body.classList.add('hovering');
    } else {
        document.body.classList.remove('hovering');
    }
});

// ===============================================
// 8. 左上角時鐘與 NI 互動 (保留)
// ===============================================
function updateClock() {
    const timeDisplay = document.getElementById('time-part');
    if (!timeDisplay) return;
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    timeDisplay.textContent = `${hours}:${minutes}:${seconds}`;
    requestAnimationFrame(updateClock);
}
updateClock();

function toggleMagic(element) {
    if (element.classList.contains('is-active')) {
        toggleContactOverlay(true);
    } else {
        element.style.transform = "rotateY(90deg)";
        setTimeout(() => {
            element.textContent = "NI";
            element.classList.add('is-active');
            element.style.transform = "rotateY(360deg) scale(1.2)";
        }, 150);
    }
}

// ===============================================
// 9. 第二個 WebGL 渲染器 (橘色液體)
// ===============================================
(function initTransitionWebGL() {
    const transContainer = document.getElementById('transition-container');
    const transCanvas = document.getElementById('transition-canvas');
    if (!transContainer || !transCanvas) return;

    const transScene = new THREE.Scene();
    const transCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const transRenderer = new THREE.WebGLRenderer({ canvas: transCanvas, alpha: true, antialias: true });
    transRenderer.setSize(window.innerWidth, window.innerHeight);
    transRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));

    const fragmentShader = `
        varying vec2 vUv;
        uniform float uProgress; 
        uniform float uVelocity;
        uniform float uRatio;
        vec4 c_bg = vec4(0.0, 0.0, 0.0, 0.0); 
        vec3 c_edge = vec3(1.0, 0.45, 0.05); 
        vec3 c_body = vec3(0.05, 0.05, 0.05); 
        void main() {
            vec2 center = vec2(0.5, 1.3); 
            vec2 pos = vUv - center;
            pos.x *= 0.9 * uRatio; 
            float dist = length(pos);
            float centerFocus = 1.0 - smoothstep(0.0, 0.7, abs(pos.x));
            centerFocus = centerFocus * centerFocus; 
            float warp = sin(pos.x * 5.0 + uProgress * 2.0) * uVelocity * 0.1;
            dist -= warp;
            float progressValue = (uProgress * 1.5 + 0.5) - dist;
            float baseTail = 0.02; 
            float extraTail = 0.25 * centerFocus;
            float totalTailLength = baseTail + extraTail;
            float bodyCutoff = 0.5;
            float bodyMask = smoothstep(bodyCutoff, bodyCutoff + 0.01, progressValue);
            float glowStart = bodyCutoff - totalTailLength;
            float glowMask = smoothstep(glowStart, bodyCutoff, progressValue);
            float glowGradient = (progressValue - glowStart) / totalTailLength;
            glowGradient = clamp(glowGradient, 0.0, 1.0); 
            glowGradient = pow(glowGradient, 0.6);
            vec4 finalColor = c_bg;
            float finalGlowAlpha = glowMask * (1.0 - bodyMask);
            finalColor.rgb = mix(finalColor.rgb, c_edge, finalGlowAlpha * glowGradient * 1.8);
            finalColor.a = max(finalColor.a, finalGlowAlpha);
            finalColor.rgb = mix(finalColor.rgb, c_body, bodyMask);
            finalColor.a = max(finalColor.a, bodyMask);
            gl_FragColor = finalColor;
        }
    `;

    const uniforms = { uProgress: { value: 1.0 }, uVelocity: { value: 0 }, uRatio: { value: window.innerWidth / window.innerHeight } };
    const material = new THREE.ShaderMaterial({ vertexShader, fragmentShader, uniforms, transparent: true });
    transScene.add(new THREE.Mesh(geometry, material));

    let currentTransScroll = 1;
    let targetTransScroll = 1;
    let isTransVisible = false;

    window.addEventListener('scroll', () => {
        const rect = transContainer.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        isTransVisible = (rect.top < viewportHeight && rect.bottom > 0);
        if (isTransVisible) {
            const start = rect.top + window.scrollY;
            const distance = window.scrollY - start;
            const totalDistance = rect.height - viewportHeight;
            let progress = distance / totalDistance;
            progress = Math.max(0, Math.min(1, progress));
            targetTransScroll = 1.0 - progress;
        }
    });

    function animateTrans() {
        requestAnimationFrame(animateTrans);
        if (!isTransVisible) return;
        currentTransScroll += (targetTransScroll - currentTransScroll) * 0.08;
        const velocity = (targetTransScroll - currentTransScroll) * 8.0;
        uniforms.uProgress.value = currentTransScroll;
        uniforms.uVelocity.value = velocity;
        transRenderer.render(transScene, transCamera);
    }
    animateTrans();

    window.addEventListener('resize', () => {
        transRenderer.setSize(window.innerWidth, window.innerHeight);
        uniforms.uRatio.value = window.innerWidth / window.innerHeight;
    });
})();

// ===============================================
// 10. 提示與檔案室邏輯 (保留)
// ===============================================

const hintBubble = document.getElementById('hint-bubble');
const bubbleContent = document.querySelector('.bubble-content');
let isHintRevealed = false;

window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const viewportHeight = window.innerHeight;
    if (scrollY > viewportHeight * 0.5 && scrollY < viewportHeight * 2.5) {
        hintBubble.classList.add('show');
    } else {
        hintBubble.classList.remove('show');
        setTimeout(() => { resetBubbleState(); }, 500);
    }
});

function handleBubbleClick() {
    if (!isHintRevealed) {
        bubbleContent.innerHTML = '<i class="fas fa-arrow-up"></i> 那個...有空的話...要不要找找看 NI 跟 in...';
        hintBubble.classList.add('expanded');
        isHintRevealed = true;
    } else { scrollToTop(); }
}

function scrollToTop() { window.scrollTo({ top: 0, behavior: 'smooth' }); }
function resetBubbleState() { isHintRevealed = false; bubbleContent.innerHTML = '🤫'; hintBubble.classList.remove('expanded'); }

const scrollHint = document.getElementById('scroll-hint');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) scrollHint.classList.add('hide');
    else scrollHint.classList.remove('hide');
});
function scrollToContent() { window.scrollTo({ top: window.innerHeight, behavior: 'smooth' }); }

const archiveData = [
    { id: "01", title: "原界。物種 SOUL ORIGIN ARCHIVE", tags: ["UI 介面設計", "前端開發", "AI 美術生成"], stack: "HTML / CSS / JS, Midjourney", desc: "結合 AI 圖像與神祕學風格的 RWD 網站。\n獨立完成從視覺定調、積分邏輯運算到程式開發，將複雜的人格分析轉化為高質感的視覺體驗。", link: "https://ni1793.github.io/SOUL-ORIGIN-ARCHIVE/" },
    { id: "02", title: "ECHO", tags: ["敘事設計", "網頁視覺設計"], stack: "Retro Styling, 遊戲化邏輯", desc: "以 2000 年代復古網頁為載體的敘事實驗。\n融合「踩地雷」機制與隱藏線索，透過懷舊的 Lo-fi 視覺風格，引導玩家進行沉浸式的劇情探索。", link: "https://ni1793.github.io/ECHO/" },
    { id: "03", title: "人類飲食補完計劃", tags: ["UX 使用者體驗", "工具開發"], stack: "Mobile-First, JavaScript", desc: "專為戶外實境遊戲開發的規則與計時網頁。\n採用 Mobile-First 策略，透過高對比視覺與直覺操作，解決玩家在動態環境下的即時資訊需求。", link: "https://ni1793.github.io/THE-EAT---TABLE-COMPLETENESS/" },
    { id: "04", title: "幼稚園園長守則", tags: ["介面動態設計", "概念設計"], stack: "Dashboard UI, 互動回饋", desc: "模擬監控系統的互動介面。\n透過儀表板 (Dashboard) 設計語言與動態回饋，為特定遊戲腳本創造出具備「掌控感」的角色扮演體驗。", link: "https://ni1793.github.io/kindergarten-principal/" }
];

function renderArchive() {
    const container = document.getElementById('archive-container');
    if (!container) return;
    archiveData.forEach((item) => {
        const itemEl = document.createElement('div');
        itemEl.className = 'archive-item';
        itemEl.innerHTML = `
            <div class="archive-header">
                <span class="archive-index">${item.id}</span>
                <span class="archive-title">${item.title}</span>
                <span class="archive-arrow"><i class="fas fa-chevron-down"></i></span>
            </div>
            <div class="archive-body">
                <div class="archive-content-grid">
                    <div class="archive-tags">
                        <div class="tag-group"><h4>Role</h4><p>${item.tags.join('<br>')}</p></div>
                        <div class="tag-group"><h4>Tech</h4><p>${item.stack}</p></div>
                    </div>
                    <div class="archive-desc">
                        <p>${item.desc}</p>
                        <a href="${item.link}" target="_blank" class="btn-visit">VISIT PROJECT <i class="fas fa-arrow-right"></i></a>
                    </div>
                </div>
            </div>
        `;
        const header = itemEl.querySelector('.archive-header');
        header.addEventListener('click', () => {
            const isActive = itemEl.classList.contains('active');
            document.querySelectorAll('.archive-item').forEach(el => { el.classList.remove('active'); el.querySelector('.archive-body').style.maxHeight = null; });
            if (!isActive) { itemEl.classList.add('active'); const body = itemEl.querySelector('.archive-body'); body.style.maxHeight = body.scrollHeight + "px"; }
        });
        container.appendChild(itemEl);
    });
}
renderArchive();