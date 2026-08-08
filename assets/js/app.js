/* ========================================
   墨白博客 - 主应用脚本
   功能：主题切换、搜索、文章渲染、弹窗、动画
   ======================================== */

(function () {
    'use strict';

    // ========================================
    // 全局状态
    // ========================================
    const state = {
        theme: localStorage.getItem('theme') || 'light',
        visibleArticles: 6,
        articlesPerLoad: 6,
        searchOpen: false,
        modalOpen: false
    };

    // ========================================
    // 初始化
    // ========================================
    document.addEventListener('DOMContentLoaded', function () {
        initTheme();
        renderFeaturedPost();
        renderArticles();
        renderCategories();
        initEventListeners();
        initScrollAnimations();
        initStatCounters();
    });

    // ========================================
    // 主题切换
    // ========================================
    function initTheme() {
        document.documentElement.setAttribute('data-theme', state.theme);
        updateThemeIcon();
    }

    function toggleTheme() {
        state.theme = state.theme === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', state.theme);
        localStorage.setItem('theme', state.theme);
        updateThemeIcon();
    }

    function updateThemeIcon() {
        const icon = document.querySelector('.theme-toggle i');
        if (icon) {
            icon.className = state.theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
        }
    }

    // ========================================
    // 文章渲染
    // ========================================
    function renderFeaturedPost() {
        const featured = blogData.articles.find(a => a.featured);
        if (!featured) return;

        const container = document.getElementById('featuredPost');
        container.innerHTML = `
            <article class="featured-card" onclick="openArticle(${featured.id})">
                <div class="featured-image">
                    <img src="${featured.image}" alt="${featured.title}" loading="lazy">
                    <div class="featured-overlay">
                        <span class="featured-tag">精选文章</span>
                    </div>
                </div>
                <div class="featured-content">
                    <div class="featured-meta">
                        <span><i class="fas fa-folder"></i> ${featured.categoryName}</span>
                        <span><i class="fas fa-calendar"></i> ${formatDate(featured.date)}</span>
                        <span><i class="fas fa-clock"></i> ${featured.readTime}</span>
                    </div>
                    <h3>${featured.title}</h3>
                    <p>${featured.excerpt}</p>
                    <div class="featured-author">
                        <div class="author-avatar">
                            <i class="fas fa-user"></i>
                        </div>
                        <div class="author-info">
                            <span class="author-name">${featured.author}</span>
                            <span class="author-role">全栈工程师 / 写作者</span>
                        </div>
                    </div>
                </div>
            </article>
        `;
    }

    function renderArticles() {
        const container = document.getElementById('articlesGrid');
        const articles = blogData.articles.filter(a => !a.featured);
        const visible = articles.slice(0, state.visibleArticles);

        container.innerHTML = visible.map(article => `
            <article class="article-card" onclick="openArticle(${article.id})">
                <div class="article-image">
                    <img src="${article.image}" alt="${article.title}" loading="lazy">
                    <span class="article-category">${article.categoryName}</span>
                </div>
                <div class="article-body">
                    <div class="article-meta">
                        <span><i class="fas fa-calendar"></i> ${formatDate(article.date)}</span>
                        <span><i class="fas fa-eye"></i> ${formatNumber(article.views)}</span>
                    </div>
                    <h3 class="article-title">${article.title}</h3>
                    <p class="article-excerpt">${article.excerpt}</p>
                    <div class="article-footer">
                        <div class="article-author">
                            <div class="article-author-avatar">
                                <i class="fas fa-user"></i>
                            </div>
                            <span class="article-author-name">${article.author}</span>
                        </div>
                        <span class="article-read-time">${article.readTime}</span>
                    </div>
                </div>
            </article>
        `).join('');

        // 更新加载更多按钮状态
        const loadMoreBtn = document.getElementById('loadMoreBtn');
        if (state.visibleArticles >= articles.length) {
            loadMoreBtn.style.display = 'none';
        } else {
            loadMoreBtn.style.display = 'inline-flex';
        }
    }

    function loadMoreArticles() {
        state.visibleArticles += state.articlesPerLoad;
        renderArticles();
    }

    // ========================================
    // 分类渲染
    // ========================================
    function renderCategories() {
        const container = document.getElementById('categoriesGrid');
        container.innerHTML = blogData.categories.map(cat => {
            const gradientMap = {
                'frontend': 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                'backend': 'linear-gradient(135deg, #10b981, #059669)',
                'ai': 'linear-gradient(135deg, #f59e0b, #d97706)',
                'devops': 'linear-gradient(135deg, #ef4444, #dc2626)',
                'life': 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
                'tools': 'linear-gradient(135deg, #06b6d4, #0891b2)',
                'design': 'linear-gradient(135deg, #ec4899, #db2777)',
                'tutorial': 'linear-gradient(135deg, #14b8a6, #0d9488)'
            };
            const bg = gradientMap[cat.id] || 'var(--gradient-primary)';

            return `
                <button class="category-card" onclick="filterByCategory('${cat.id}')">
                    <div class="category-icon" style="background: ${bg}; color: white;">
                        <i class="fas ${cat.icon}"></i>
                    </div>
                    <h3>${cat.name}</h3>
                    <p>${cat.description}</p>
                    <span class="category-count">${cat.count} 篇文章</span>
                </button>
            `;
        }).join('');
    }

    // ========================================
    // 文章详情弹窗
    // ========================================
    window.openArticle = function (id) {
        const article = blogData.articles.find(a => a.id === id);
        if (!article) return;

        const modal = document.getElementById('articleModal');
        const body = document.getElementById('modalBody');

        body.innerHTML = `
            <div class="article-header">
                <img src="${article.image}" alt="${article.title}">
                <h2>${article.title}</h2>
                <div class="article-meta-full">
                    <span><i class="fas fa-user"></i> ${article.author}</span>
                    <span><i class="fas fa-calendar"></i> ${formatDate(article.date)}</span>
                    <span><i class="fas fa-clock"></i> ${article.readTime}</span>
                    <span><i class="fas fa-eye"></i> ${formatNumber(article.views)} 阅读</span>
                    <span><i class="fas fa-heart"></i> ${article.likes} 点赞</span>
                </div>
            </div>
            <div class="article-content">
                ${article.content}
            </div>
            <div style="margin-top: 40px; padding-top: 24px; border-top: 1px solid var(--border-color);">
                <button class="btn btn-outline" onclick="closeArticle()">
                    <i class="fas fa-arrow-left"></i> 返回列表
                </button>
            </div>
        `;

        modal.classList.add('active');
        state.modalOpen = true;
        document.body.style.overflow = 'hidden';
    };

    window.closeArticle = function () {
        const modal = document.getElementById('articleModal');
        modal.classList.remove('active');
        state.modalOpen = false;
        document.body.style.overflow = '';
    };

    // ========================================
    // 搜索功能
    // ========================================
    function openSearch() {
        const overlay = document.getElementById('searchOverlay');
        overlay.classList.add('active');
        state.searchOpen = true;
        document.body.style.overflow = 'hidden';
        setTimeout(() => {
            document.getElementById('searchInput').focus();
        }, 100);
    }

    function closeSearch() {
        const overlay = document.getElementById('searchOverlay');
        overlay.classList.remove('active');
        state.searchOpen = false;
        document.body.style.overflow = '';
        document.getElementById('searchInput').value = '';
        document.getElementById('searchResults').innerHTML = '';
    }

    function performSearch(query) {
        const resultsContainer = document.getElementById('searchResults');
        if (!query.trim()) {
            resultsContainer.innerHTML = '';
            return;
        }

        const results = blogData.articles.filter(article =>
            article.title.toLowerCase().includes(query.toLowerCase()) ||
            article.excerpt.toLowerCase().includes(query.toLowerCase()) ||
            article.categoryName.includes(query)
        );

        if (results.length === 0) {
            resultsContainer.innerHTML = `
                <div style="padding: 40px; text-align: center; color: var(--text-muted);">
                    <i class="fas fa-search" style="font-size: 2rem; margin-bottom: 16px; opacity: 0.5;"></i>
                    <p>没有找到相关文章</p>
                </div>
            `;
            return;
        }

        resultsContainer.innerHTML = results.map(article => `
            <div class="search-result-item" onclick="openArticle(${article.id}); closeSearch();">
                <h4>${highlightMatch(article.title, query)}</h4>
                <p>${article.excerpt.substring(0, 80)}...</p>
            </div>
        `).join('');
    }

    function highlightMatch(text, query) {
        const regex = new RegExp(`(${query})`, 'gi');
        return text.replace(regex, '<mark style="background: var(--primary-light); color: var(--primary-color); padding: 0 2px; border-radius: 2px;">$1</mark>');
    }

    window.filterByCategory = function (categoryId) {
        const articles = blogData.articles.filter(a => a.category === categoryId);
        if (articles.length === 0) return;

        // 打开第一篇
        openArticle(articles[0].id);
    };

    // ========================================
    // 导航栏滚动效果
    // ========================================
    function handleScroll() {
        const navbar = document.getElementById('navbar');
        const backToTop = document.getElementById('backToTop');

        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    }

    // ========================================
    // 移动端菜单
    // ========================================
    function toggleMobileMenu() {
        const menu = document.getElementById('navMenu');
        menu.classList.toggle('active');
    }

    // ========================================
    // 统计数字动画
    // ========================================
    function initStatCounters() {
        const counters = document.querySelectorAll('.stat-number');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(counter => observer.observe(counter));
    }

    function animateCounter(element) {
        const target = parseInt(element.getAttribute('data-count'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current).toLocaleString();
        }, 16);
    }

    // ========================================
    // 滚动动画
    // ========================================
    function initScrollAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1 });

        // 观察所有需要动画的元素
        const animatedElements = document.querySelectorAll('.article-card, .category-card, .section-header');
        animatedElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    }

    // ========================================
    // 订阅表单
    // ========================================
    function handleSubscribe(e) {
        e.preventDefault();
        const input = e.target.querySelector('input[type="email"]');
        const email = input.value.trim();

        if (!email || !isValidEmail(email)) {
            showNotification('请输入有效的邮箱地址', 'error');
            return;
        }

        showNotification('订阅成功！感谢你的关注 🎉', 'success');
        input.value = '';
    }

    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    // ========================================
    // 通知系统
    // ========================================
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
            <span>${message}</span>
        `;

        // 添加样式
        Object.assign(notification.style, {
            position: 'fixed',
            top: '90px',
            right: '24px',
            padding: '14px 24px',
            borderRadius: '12px',
            background: type === 'success' ? '#10b981' : '#ef4444',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
            zIndex: '3000',
            transform: 'translateX(120%)',
            transition: 'transform 0.3s ease',
            fontSize: '0.95rem',
            fontWeight: '500'
        });

        document.body.appendChild(notification);

        // 滑入
        requestAnimationFrame(() => {
            notification.style.transform = 'translateX(0)';
        });

        // 3秒后移除
        setTimeout(() => {
            notification.style.transform = 'translateX(120%)';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    // ========================================
    // 工具函数
    // ========================================
    function formatDate(dateStr) {
        const date = new Date(dateStr);
        return date.toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' });
    }

    function formatNumber(num) {
        if (num >= 10000) {
            return (num / 10000).toFixed(1) + '万';
        }
        if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'k';
        }
        return num.toString();
    }

    // ========================================
    // 事件监听
    // ========================================
    function initEventListeners() {
        // 主题切换
        document.getElementById('themeToggle').addEventListener('click', toggleTheme);

        // 搜索
        document.getElementById('searchBtn').addEventListener('click', openSearch);
        document.getElementById('searchClose').addEventListener('click', closeSearch);
        document.getElementById('searchInput').addEventListener('input', (e) => {
            performSearch(e.target.value);
        });

        // 搜索框快捷键
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                if (state.searchOpen) closeSearch();
                if (state.modalOpen) closeArticle();
            }
            if (e.key === '/' && !state.searchOpen && !state.modalOpen) {
                e.preventDefault();
                openSearch();
            }
        });

        // 搜索遮罩点击关闭
        document.getElementById('searchOverlay').addEventListener('click', (e) => {
            if (e.target === e.currentTarget) closeSearch();
        });

        // 弹窗关闭
        document.getElementById('modalClose').addEventListener('click', closeArticle);
        document.getElementById('modalOverlay').addEventListener('click', closeArticle);

        // 移动端菜单
        document.getElementById('mobileMenuBtn').addEventListener('click', toggleMobileMenu);

        // 导航链接点击后关闭移动菜单
        document.querySelectorAll('.nav-link').addEventListener('click', () => {
            document.getElementById('navMenu').classList.remove('active');
        });

        // 加载更多
        document.getElementById('loadMoreBtn').addEventListener('click', loadMoreArticles);

        // 回到顶部
        document.getElementById('backToTop').addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });

        // 订阅表单
        document.getElementById('subscribeForm').addEventListener('submit', handleSubscribe);

        // 滚动监听
        window.addEventListener('scroll', handleScroll, { passive: true });

        // 导航链接高亮
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');

        window.addEventListener('scroll', () => {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop - 100;
                if (window.scrollY >= sectionTop) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + current) {
                    link.classList.add('active');
                }
            });
        }, { passive: true });
    }

    // 为 NodeList 添加 forEach 支持（兼容旧浏览器）
    if (!NodeList.prototype.forEach) {
        NodeList.prototype.forEach = Array.prototype.forEach;
    }

})();