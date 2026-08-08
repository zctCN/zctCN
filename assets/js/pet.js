/* ==================== 桌面宠物 - 小猫咪 ==================== */
(function () {
    'use strict';

    // ===== 配置 =====
    const CONFIG = {
        followSpeed: 0.06,          // 跟随鼠标速度（越大越快）
        blinkIntervalMin: 2000,      // 最小眨眼间隔(ms)
        blinkIntervalMax: 5000,      // 最大眨眼间隔(ms)
        bubbleDuration: 2500,        // 气泡显示时长(ms)
        idleTimeout: 15000,          // 空闲多久后睡觉(ms)
        clickHearts: ['❤️', '💜', '💙', '💚', '🧡', '💛'],
        messages: [
            '喵~ 你好呀！',
            '一起写代码吧！',
            '记得喝水哦~',
            '你今天真好看！',
            '摸摸头~',
            '写博客辛苦了！',
            '要按时吃饭呀',
            '加油！你可以的！',
            '喵呜~ 陪你一起努力',
            '这个点该休息啦~',
            '代码写完了吗？',
            '偷偷告诉你，我喜欢你~',
            '保持好奇，持续学习！',
            '你是我最喜欢的人类！'
        ],
        idleMessages: [
            '我困了...zzZ',
            '主人去哪了？',
            '好无聊啊...',
            '陪我玩嘛~'
        ]
    };

    // ===== DOM 元素 =====
    const container = document.getElementById('petContainer');
    const pet = document.getElementById('pet');
    const petHead = document.getElementById('petHead');
    const petTail = document.getElementById('petTail');
    const petMouth = document.getElementById('petMouth');
    const petBubble = document.getElementById('petBubble');
    const eyes = document.querySelectorAll('.pet-eye');

    if (!container || !pet) {
        console.warn('[Pet] 找不到宠物元素，请检查HTML是否正确插入');
        return;
    }

    // ===== 状态 =====
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let petX = window.innerWidth - 80;  // 初始位置：右下角
    let petY = window.innerHeight - 100;
    let isDragging = false;
    let dragOffsetX = 0;
    let dragOffsetY = 0;
    let lastMouseX = mouseX;
    let lastMouseY = mouseY;
    let isMoving = false;
    let moveTimeout = null;
    let idleTimeout = null;
    let isSleeping = false;
    let isWalking = false;
    let currentMessage = '';

    // ===== 鼠标跟踪 =====
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        // 拖拽中
        if (isDragging) {
            petX = mouseX - dragOffsetX;
            petY = mouseY - dragOffsetY;
            clampPetPosition();
            applyPetPosition();
            return;
        }

        // 检测是否在移动
        const moved = Math.abs(mouseX - lastMouseX) > 2 || Math.abs(mouseY - lastMouseY) > 2;
        if (moved) {
            lastMouseX = mouseX;
            lastMouseY = mouseY;
            resetIdleTimer();
        }
    });

    // ===== 位置限制 =====
    function clampPetPosition() {
        const margin = 10;
        const maxX = window.innerWidth - container.offsetWidth - margin;
        const maxY = window.innerHeight - container.offsetHeight - margin;
        petX = Math.max(margin, Math.min(petX, maxX));
        petY = Math.max(margin, Math.min(petY, maxY));
    }

    // ===== 应用位置 =====
    function applyPetPosition() {
        container.style.left = petX + 'px';
        container.style.top = petY + 'px';
        container.style.bottom = 'auto';
        container.style.right = 'auto';
    }

    // ===== 跟随鼠标动画循环 =====
    function animate() {
        if (!isDragging && !isSleeping) {
            // 计算朝向鼠标的方向
            const targetX = mouseX - container.offsetWidth / 2;
            const targetY = mouseY - container.offsetHeight / 2;

            // 平滑跟随（只在鼠标移动时跟随）
            const dx = targetX - petX;
            const dy = targetY - petY;
            const distance = Math.sqrt(dx * dx + dy * dy);

            // 距离太近就不跟了，保持一定距离
            if (distance > 80) {
                petX += dx * CONFIG.followSpeed;
                petY += dy * CONFIG.followSpeed;
                clampPetPosition();
                applyPetPosition();

                // 走路动画
                if (!isWalking && distance > 30) {
                    isWalking = true;
                    pet.classList.add('walking');
                }
            } else if (isWalking) {
                isWalking = false;
                pet.classList.remove('walking');
            }

            // 头部看向鼠标
            updateHeadDirection(mouseX, mouseY);
        }

        requestAnimationFrame(animate);
    }

    // ===== 头部朝向 =====
    function updateHeadDirection(mx, my) {
        if (isSleeping) return;

        const rect = container.getBoundingClientRect();
        const petCenterX = rect.left + rect.width / 2;
        const petCenterY = rect.top + rect.height / 2;

        const dx = mx - petCenterX;
        const dy = my - petCenterY;

        petHead.classList.remove('look-left', 'look-right', 'look-up');

        if (Math.abs(dx) > 30) {
            if (dx < 0) petHead.classList.add('look-left');
            else petHead.classList.add('look-right');
        }

        if (dy < -40) {
            petHead.classList.add('look-up');
        }
    }

    // ===== 眨眼系统 =====
    function scheduleBlink() {
        const delay = randomBetween(CONFIG.blinkIntervalMin, CONFIG.blinkIntervalMax);
        setTimeout(() => {
            blink();
            scheduleBlink();
        }, delay);
    }

    function blink() {
        eyes.forEach(eye => {
            eye.classList.add('blink');
            setTimeout(() => eye.classList.remove('blink'), 150);
        });
    }

    // ===== 气泡系统 =====
    function showBubble(text, duration) {
        if (!petBubble) return;
        petBubble.textContent = text;
        petBubble.classList.add('show');
        currentMessage = text;

        clearTimeout(pet._bubbleTimeout);
        pet._bubbleTimeout = setTimeout(() => {
            petBubble.classList.remove('show');
        }, duration || CONFIG.bubbleDuration);
    }

    function randomMessage() {
        return CONFIG.messages[Math.floor(Math.random() * CONFIG.messages.length)];
    }

    function randomIdleMessage() {
        return CONFIG.idleMessages[Math.floor(Math.random() * CONFIG.idleMessages.length)];
    }

    // ===== 点击互动 =====
    pet.addEventListener('click', (e) => {
        e.stopPropagation();

        if (isSleeping) {
            // 叫醒
            wakeUp();
            showBubble('诶？你回来啦！', 2000);
            return;
        }

        // 开心表情
        petMouth.classList.add('happy');
        setTimeout(() => petMouth.classList.remove('happy'), 1000);

        // 跳跃
        pet.classList.add('jumping');
        setTimeout(() => pet.classList.remove('jumping'), 500);

        // 尾巴摇摆
        petTail.classList.add('wag');
        setTimeout(() => petTail.classList.remove('wag'), 1000);

        // 随机爱心
        spawnHeart(e.clientX, e.clientY);

        // 随机气泡
        showBubble(randomMessage(), 2500);

        // 点击波纹
        spawnRipple();
    });

    // ===== 爱心粒子 =====
    function spawnHeart(x, y) {
        const heart = document.createElement('div');
        heart.className = 'pet-heart';
        heart.textContent = CONFIG.clickHearts[Math.floor(Math.random() * CONFIG.clickHearts.length)];

        const rect = container.getBoundingClientRect();
        heart.style.left = (rect.width / 2) + 'px';
        heart.style.bottom = '50px';

        // 随机水平偏移
        const hx = randomBetween(-30, 30);
        heart.style.setProperty('--hx', hx + 'px');

        container.appendChild(heart);
        setTimeout(() => heart.remove(), 1200);
    }

    // ===== 点击波纹 =====
    function spawnRipple() {
        const ripple = document.createElement('div');
        ripple.className = 'pet-click-effect';
        container.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
    }

    // ===== 拖拽功能 =====
    container.addEventListener('mousedown', (e) => {
        if (e.button !== 0) return; // 只响应左键
        isDragging = true;
        container.classList.add('dragging');
        const rect = container.getBoundingClientRect();
        dragOffsetX = e.clientX - rect.left;
        dragOffsetY = e.clientY - rect.top;
        e.preventDefault();
    });

    document.addEventListener('mouseup', () => {
        if (isDragging) {
            isDragging = false;
            container.classList.remove('dragging');
            showBubble('放我下来啦~', 1500);
        }
    });

    // ===== 空闲检测 =====
    function resetIdleTimer() {
        clearTimeout(idleTimeout);
        if (isSleeping) wakeUp();

        idleTimeout = setTimeout(() => {
            goSleep();
        }, CONFIG.idleTimeout);
    }

    // ===== 睡觉 =====
    function goSleep() {
        if (isSleeping) return;
        isSleeping = true;
        pet.classList.add('sleeping');
        showBubble(randomIdleMessage(), 3000);
    }

    // ===== 醒来 =====
    function wakeUp() {
        isSleeping = false;
        pet.classList.remove('sleeping');
    }

    // ===== 鼠标进入/离开 =====
    container.addEventListener('mouseenter', () => {
        if (!isSleeping) {
            petTail.classList.add('wag');
            showBubble('喵~ 摸到我啦！', 1500);
        }
    });

    container.addEventListener('mouseleave', () => {
        petTail.classList.remove('wag');
        if (!isSleeping) {
            setTimeout(() => {
                if (!petBubble.matches(':hover')) {
                    petBubble.classList.remove('show');
                }
            }, 500);
        }
    });

    // ===== 主题适配 =====
    function updatePetColor() {
        const theme = document.documentElement.getAttribute('data-theme');
        const root = getComputedStyle(document.documentElement);
        const primaryColor = root.getPropertyValue('--primary-color').trim() || '#6366f1';

        // 动态更新宠物颜色为主题主色
        const styleId = 'pet-dynamic-style';
        let styleEl = document.getElementById(styleId);
        if (!styleEl) {
            styleEl = document.createElement('style');
            styleEl.id = styleId;
            document.head.appendChild(styleEl);
        }
        styleEl.textContent = `
            .pet-body, .pet-head, .pet-ear, .pet-leg, .pet-tail {
                background-color: ${primaryColor} !important;
            }
            .pet-ear {
                border-bottom-color: ${primaryColor} !important;
            }
        `;
    }

    // 监听主题变化
    const themeObserver = new MutationObserver(() => updatePetColor());
    themeObserver.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['data-theme']
    });

    // ===== 工具函数 =====
    function randomBetween(min, max) {
        return Math.random() * (max - min) + min;
    }

    // ===== 初始化 =====
    function init() {
        // 设置初始位置
        petX = window.innerWidth - 120;
        petY = window.innerHeight - 150;
        clampPetPosition();
        applyPetPosition();

        // 启动动画循环
        animate();

        // 启动眨眼
        scheduleBlink();

        // 启动空闲检测
        resetIdleTimer();

        // 适配主题
        updatePetColor();

        // 入场打招呼
        setTimeout(() => {
            showBubble('喵~ 我是你的小跟班！', 3000);
        }, 1000);

        console.log('%c🐱 小猫咪已上线！', 'color: #6366f1; font-size: 14px; font-weight: bold;');
    }

    // DOM加载后初始化
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // ===== 窗口大小变化时重新限制位置 =====
    window.addEventListener('resize', () => {
        clampPetPosition();
        applyPetPosition();
    });

    // ===== 页面可见性变化（标签页切换） =====
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            goSleep();
        } else {
            wakeUp();
        }
    });

})();
