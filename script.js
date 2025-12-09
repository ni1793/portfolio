// ===============================================
// 1. 資料設定
// ===============================================

const projects = [
    { 
        id: 1, title: "視界的距離", category: "展覽主視覺設計",  
        cover: "images/project1/01.jpg", description: "The Distance Anywhere", 
        images: ["images/project1/01.jpg", "images/project1/02.jpg", "images/project1/03.jpg","images/project1/04.jpg", "images/project1/05.jpg" ] 
    },
    { 
        id: 2, title: "擁有一具纖薄的身體", category: "展覽主視覺設計", 
        cover: "images/project2/01.jpg", description: "Possessing a Vulnerable Body", 
        images: ["images/project2/01.jpg", "images/project2/02.jpg", "images/project2/03.jpg", "images/project2/04.jpg", "images/project2/05.jpg", "images/project2/06.jpg"] 
    },
    { 
        id: 3, title: "繼續播放", category: "展覽網頁宣傳", 
        cover: "images/project3/01.jpg", description: "Continuation of Play", 
        images: ["images/project3/01.jpg", "images/project3/02.jpg", "images/project3/03.jpg", "images/project3/04.jpg"] 
    },
    { 
        id: 4, title: "平衡的輪廓", category: "展覽主視覺設計", 
        cover: "images/project4/01.jpg", description: "Harmonic Silhouette", 
        images: ["images/project4/01.jpg", "images/project4/02.jpg", "images/project4/03.jpg", "images/project4/04.jpg"] 
    },
    { 
        id: 5, title: "插畫 Illustration", category: "插畫作品", 
        cover: "images/project5/01.jpg", description: "Personal Collection", 
        images: ["images/project5/01.jpg", "images/project5/02.jpg", "images/project5/03.jpg", "images/project5/04.jpg", "images/project5/05.jpg", "images/project5/06.jpg", "images/project5/07.jpg", "images/project5/08.jpg"] 
    }
];

const albumData = [
    { id: 101, title: "Snap 01", category: "Album", cover: "images/album/01.jpg", description: "Daily Life", images: ["images/album/01.jpg"] },
    { id: 102, title: "Snap 02", category: "Album", cover: "images/album/02.jpg", description: "Textures", images: ["images/album/02.jpg"] },
    { id: 103, title: "Snap 03", category: "Album", cover: "images/album/03.jpg", description: "Portraits", images: ["images/album/03.jpg"] },
    { id: 104, title: "Travel", category: "Album", cover: "images/album/01.jpg", description: "Journey", images: ["images/album/01.jpg", "images/album/02.jpg"] },
    { id: 105, title: "Sketch", category: "Album", cover: "images/album/02.jpg", description: "Drafts", images: ["images/album/02.jpg", "images/album/03.jpg"] }
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
        <div class="image-wrapper"><img src="${project.cover}" alt="${project.title}"></div>
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
// 3. 桌面資料夾功能 (防止重疊下方物件)
// ===============================================

function renderDesktopFolders() {
    const container = document.getElementById('desktop-folders-container');
    if (!container) return;
    container.innerHTML = '';

    const isDesktop = window.innerWidth > 768;
    let placedPositions = [];

    albumData.forEach((album, index) => {
        const folder = document.createElement('div');
        folder.className = 'folder';
        folder.onclick = () => openProjectDetail(album);
        
        folder.innerHTML = `
            <div class="folder-icon">
                <svg viewBox="0 0 100 100" fill="#007AFF">
                    <path d="M10,35 L40,35 L45,25 L90,25 C95.5,25 100,29.5 100,35 L100,85 C100,90.5 95.5,95 90,95 L10,95 C4.5,95 0,90.5 0,85 L0,45 C0,39.5 4.5,35 10,35 Z" opacity="0.8"></path>
                    <rect x="0" y="40" width="100" height="55" rx="5" ry="5"></rect>
                </svg>
            </div>
            <span class="folder-name">${album.title}</span>
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
    
    const centerXMin = 30; const centerXMax = 70; 
    const centerYMin = 10; const centerYMax = 25; // 避開標題區

    // 限制生成高度，留白給底部的 Dock 和 Spotify
    const maxTop = 65; 
    const minTop = 15;
    
    const minDistanceX = 8; const minDistanceY = 12;

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
    
    // 如果嘗試失敗，強制排列在上方安全區
    if (!safe) { left = 5 + (index * 10) % 90; top = 20 + (index * 10) % 40; }
    
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
}

function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
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

window.addEventListener('scroll', () => {
    targetScroll = window.scrollY;
    if (window.scrollY > window.innerHeight * 0.6) {
        portfolioSection.style.opacity = 1;
        heroSection.style.opacity = 0;
    } else {
        portfolioSection.style.opacity = 0;
        heroSection.style.opacity = 1;
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
    renderer.render(scene, camera);
}

animate();
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    triggerHeight = window.innerHeight * 1.0;
    uniforms.uRatio.value = window.innerWidth / window.innerHeight;
});

// ===============================================
// 6. 自訂游標邏輯
// ===============================================

const cursor = document.getElementById('custom-cursor');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
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

// ===============================================
// 7. 左上角即時時鐘
// ===============================================

function updateClock() {
    const timeDisplay = document.getElementById('current-time');
    if (!timeDisplay) return;

    const now = new Date();
    
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    // 格式：HH:MM:SS in Taiwan
    const timeString = `${hours}:${minutes}:${seconds} in Taiwan`;

    timeDisplay.textContent = timeString;

    requestAnimationFrame(updateClock);
}

// 啟動時鐘
updateClock();
// script.js - 貼在檔案最尾端

// script.js - 請貼在檔案最下面

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
    transRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

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
        vec3 c_body = vec3(0.02, 0.02, 0.02); 

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