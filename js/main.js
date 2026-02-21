/**
 * 个人展示网站 - 主要JavaScript
 * 功能：主题切换、导航栏滚动效果、作品筛选、复制功能等
 */

(function() {
    'use strict';

    // ============================================
    // 主题管理
    // ============================================
    const ThemeManager = {
        init() {
            this.themeToggle = document.getElementById('themeToggle');
            this.currentTheme = localStorage.getItem('theme') || 'light';
            
            // 应用保存的主题
            this.applyTheme(this.currentTheme);
            
            // 绑定切换事件
            if (this.themeToggle) {
                this.themeToggle.addEventListener('click', () => this.toggle());
            }
        },

        toggle() {
            const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
            this.applyTheme(newTheme);
            localStorage.setItem('theme', newTheme);
            this.currentTheme = newTheme;
        },

        applyTheme(theme) {
            document.documentElement.setAttribute('data-theme', theme);
        }
    };

    // ============================================
    // 导航栏管理
    // ============================================
    const NavbarManager = {
        init() {
            this.navbar = document.getElementById('navbar');
            this.lastScrollY = 0;
            this.ticking = false;

            if (this.navbar) {
                window.addEventListener('scroll', () => this.handleScroll(), { passive: true });
            }
        },

        handleScroll() {
            if (!this.ticking) {
                window.requestAnimationFrame(() => {
                    const currentScrollY = window.scrollY;
                    
                    // 滚动时添加/移除scrolled类
                    if (currentScrollY > 50) {
                        this.navbar.classList.add('scrolled');
                    } else {
                        this.navbar.classList.remove('scrolled');
                    }

                    this.lastScrollY = currentScrollY;
                    this.ticking = false;
                });
                this.ticking = true;
            }
        }
    };

    // ============================================
    // 作品筛选
    // ============================================
    const WorksFilter = {
        init() {
            this.filterTabs = document.querySelectorAll('.filter-tab');
            this.workCards = document.querySelectorAll('.work-card');
            this.worksGrid = document.getElementById('worksGrid');

            if (this.filterTabs.length > 0 && this.workCards.length > 0) {
                this.bindEvents();
            }
        },

        bindEvents() {
            this.filterTabs.forEach(tab => {
                tab.addEventListener('click', (e) => {
                    const filter = e.target.dataset.filter;
                    this.setActiveTab(e.target);
                    this.filterWorks(filter);
                });
            });
        },

        setActiveTab(activeTab) {
            this.filterTabs.forEach(tab => tab.classList.remove('active'));
            activeTab.classList.add('active');
        },

        filterWorks(category) {
            this.workCards.forEach(card => {
                const cardCategory = card.dataset.category;
                
                if (category === 'all' || cardCategory === category) {
                    card.classList.remove('hidden');
                    // 添加淡入动画
                    card.style.animation = 'none';
                    card.offsetHeight; // 触发重排
                    card.style.animation = 'cardFadeIn 0.4s ease';
                } else {
                    card.classList.add('hidden');
                }
            });
        }
    };

    // ============================================
    // 复制功能
    // ============================================
    const CopyManager = {
        init() {
            this.copyBtn = document.getElementById('copyEmailBtn');
            this.toast = document.getElementById('toast');

            if (this.copyBtn) {
                this.copyBtn.addEventListener('click', () => this.copyEmail());
            }
        },

        async copyEmail() {
            const email = this.copyBtn.dataset.clipboard;
            
            try {
                await navigator.clipboard.writeText(email);
                this.showToast('复制成功');
                this.animateSuccess();
            } catch (err) {
                // 降级方案
                this.fallbackCopy(email);
            }
        },

        fallbackCopy(text) {
            const textarea = document.createElement('textarea');
            textarea.value = text;
            textarea.style.position = 'fixed';
            textarea.style.opacity = '0';
            document.body.appendChild(textarea);
            textarea.select();
            
            try {
                document.execCommand('copy');
                this.showToast('复制成功');
                this.animateSuccess();
            } catch (err) {
                this.showToast('复制失败，请手动复制');
            }
            
            document.body.removeChild(textarea);
        },

        showToast(message) {
            if (!this.toast) return;
            
            const toastMessage = this.toast.querySelector('.toast-message');
            if (toastMessage) {
                toastMessage.textContent = message;
            }
            
            this.toast.classList.add('show');
            
            setTimeout(() => {
                this.toast.classList.remove('show');
            }, 2500);
        },

        animateSuccess() {
            this.copyBtn.classList.add('success-pulse');
            setTimeout(() => {
                this.copyBtn.classList.remove('success-pulse');
            }, 500);
        }
    };

    // ============================================
    // 平滑滚动
    // ============================================
    const SmoothScroll = {
        init() {
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', (e) => {
                    const targetId = anchor.getAttribute('href');
                    if (targetId === '#') return;
                    
                    const targetElement = document.querySelector(targetId);
                    if (targetElement) {
                        e.preventDefault();
                        targetElement.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                });
            });
        }
    };

    // ============================================
    // 页面加载动画
    // ============================================
    const PageLoader = {
        init() {
            // 为页面添加淡入动画
            document.body.classList.add('page-transition');
            
            // 页面加载完成后移除动画类
            window.addEventListener('load', () => {
                setTimeout(() => {
                    document.body.classList.remove('page-transition');
                }, 400);
            });
        }
    };

    // ============================================
    // 滚动显示动画
    // ============================================
    const ScrollReveal = {
        init() {
            this.animatedElements = document.querySelectorAll('.animate-on-scroll');
            
            if (this.animatedElements.length === 0) return;

            const observer = new IntersectionObserver(
                (entries) => this.handleIntersection(entries),
                {
                    root: null,
                    rootMargin: '0px',
                    threshold: 0.1
                }
            );

            this.animatedElements.forEach(el => observer.observe(el));
        },

        handleIntersection(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                }
            });
        }
    };

    // ============================================
    // 按钮波纹效果
    // ============================================
    const RippleEffect = {
        init() {
            document.querySelectorAll('.ripple').forEach(button => {
                button.addEventListener('click', (e) => this.createRipple(e, button));
            });
        },

        createRipple(event, button) {
            const circle = document.createElement('span');
            const diameter = Math.max(button.clientWidth, button.clientHeight);
            const radius = diameter / 2;

            const rect = button.getBoundingClientRect();
            
            circle.style.width = circle.style.height = `${diameter}px`;
            circle.style.left = `${event.clientX - rect.left - radius}px`;
            circle.style.top = `${event.clientY - rect.top - radius}px`;
            circle.classList.add('ripple-effect');

            const existingRipple = button.querySelector('.ripple-effect');
            if (existingRipple) {
                existingRipple.remove();
            }

            button.appendChild(circle);

            setTimeout(() => circle.remove(), 600);
        }
    };

    // ============================================
    // 二维码放大功能
    // ============================================
    const QRCodeZoom = {
        init() {
            // 为联系我页面的二维码添加放大功能
            const qrCodes = document.querySelectorAll('.qr-code');
            
            qrCodes.forEach(qr => {
                qr.addEventListener('click', () => this.zoomQR(qr));
            });
        },

        zoomQR(qrElement) {
            // 创建模态框
            const modal = document.createElement('div');
            modal.className = 'qr-modal';
            modal.innerHTML = `
                <div class="qr-modal-overlay"></div>
                <div class="qr-modal-content">
                    <div class="qr-large-display">
                        ${qrElement.innerHTML}
                    </div>
                    <button class="qr-modal-close">关闭</button>
                </div>
            `;

            // 添加样式
            const style = document.createElement('style');
            style.textContent = `
                .qr-modal {
                    position: fixed;
                    inset: 0;
                    z-index: 3000;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .qr-modal-overlay {
                    position: absolute;
                    inset: 0;
                    background: rgba(0, 0, 0, 0.8);
                    backdrop-filter: blur(10px);
                }
                .qr-modal-content {
                    position: relative;
                    z-index: 1;
                    text-align: center;
                }
                .qr-large-display {
                    width: 300px;
                    height: 300px;
                    background: var(--bg-secondary);
                    border-radius: 20px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-bottom: 20px;
                    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
                }
                .qr-modal-close {
                    padding: 12px 32px;
                    background: var(--gradient-primary);
                    color: white;
                    border: none;
                    border-radius: 9999px;
                    font-size: 16px;
                    font-weight: 600;
                    cursor: pointer;
                    transition: transform 0.2s ease;
                }
                .qr-modal-close:hover {
                    transform: scale(1.05);
                }
            `;

            document.head.appendChild(style);
            document.body.appendChild(modal);

            // 关闭事件
            const closeModal = () => {
                modal.remove();
                style.remove();
            };

            modal.querySelector('.qr-modal-overlay').addEventListener('click', closeModal);
            modal.querySelector('.qr-modal-close').addEventListener('click', closeModal);
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') closeModal();
            }, { once: true });
        }
    };

    // ============================================
    // 键盘快捷键
    // ============================================
    const KeyboardShortcuts = {
        init() {
            document.addEventListener('keydown', (e) => this.handleKeydown(e));
        },

        handleKeydown(e) {
            // Cmd/Ctrl + K 切换主题
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                ThemeManager.toggle();
            }
        }
    };

    // ============================================
    // 初始化所有模块
    // ============================================
    function init() {
        ThemeManager.init();
        NavbarManager.init();
        WorksFilter.init();
        CopyManager.init();
        SmoothScroll.init();
        PageLoader.init();
        ScrollReveal.init();
        RippleEffect.init();
        QRCodeZoom.init();
        KeyboardShortcuts.init();

        console.log('🚀 个人展示网站已加载完成');
        console.log('💡 快捷键: Cmd/Ctrl + K 切换主题');
    }

    // DOM加载完成后初始化
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
