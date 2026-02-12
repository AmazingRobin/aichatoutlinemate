/* ============================================
   AI Chat OutlineMate - Landing Page Script
   Theme toggle, i18n, scroll animations
   ============================================ */

(function () {
  'use strict';

  // --- i18n translations ---
  var i18n = {
    zh: {
      nav_features: '功能特性',
      nav_platforms: '支持平台',
      nav_screenshots: '使用截图',
      nav_install: '立即安装',
      hero_badge: 'Chrome 浏览器扩展',
      hero_title_1: 'AI 对话，',
      hero_title_2: '一目了然',
      hero_desc: '为 ChatGPT、Gemini、豆包、Kimi、通义千问生成对话大纲导航。快速回溯历史消息，精准定位每一轮对话。',
      hero_cta: '免费安装',
      hero_learn: '了解更多',
      hero_stat_platforms: '支持平台',
      hero_stat_langs: '语言支持',
      hero_stat_free: '完全免费',
      features_tag: '核心功能',
      features_title: '让每一轮对话都触手可及',
      features_desc: '无需翻阅冗长的聊天记录，侧边栏大纲帮你一键直达任意消息。',
      feature_outline: '对话大纲导航',
      feature_outline_desc: '自动提取每轮用户提问，生成可点击的侧边栏大纲，快速跳转到任意对话位置。',
      feature_preview: 'AI 回复预览',
      feature_preview_desc: '在大纲中显示 AI 回复摘要，无需展开即可快速了解每轮对话的核心内容。',
      feature_darkmode: '深色模式适配',
      feature_darkmode_desc: '自动检测页面主题，无缝适配深色与浅色模式，保持视觉一致性。',
      feature_i18n: '中英双语',
      feature_i18n_desc: '支持简体中文和英文界面，自动跟随浏览器语言设置，也可手动切换。',
      feature_keyboard: '键盘导航',
      feature_keyboard_desc: '完整的键盘快捷键支持，使用方向键、Home/End 键快速浏览大纲列表。',
      feature_privacy: '隐私安全',
      feature_privacy_desc: '纯本地运行，不收集任何数据，不发送任何网络请求。你的对话只属于你。',
      platforms_tag: '广泛兼容',
      platforms_title: '支持主流 AI 对话平台',
      platforms_desc: '一个插件，覆盖你常用的所有 AI 助手。',
      platform_doubao: '豆包',
      platform_qwen: '通义千问',
      screenshots_tag: '使用截图',
      screenshots_title: '看看它是如何工作的',
      screenshots_desc: '在不同 AI 平台上的实际使用效果。',
      cta_title: '准备好提升你的 AI 对话体验了吗？',
      cta_desc: '免费安装 OutlineMate，让每一轮 AI 对话都井井有条。',
      cta_button: 'Chrome 应用商店安装',
      footer_copy: '\u00a9 2026 AI Chat OutlineMate. All rights reserved.',
    },
    en: {
      nav_features: 'Features',
      nav_platforms: 'Platforms',
      nav_screenshots: 'Screenshots',
      nav_install: 'Install Now',
      hero_badge: 'Chrome Extension',
      hero_title_1: 'AI Chats,',
      hero_title_2: 'At a Glance',
      hero_desc: 'Generate conversation outline navigation for ChatGPT, Gemini, Doubao, Kimi, and Qwen. Quickly backtrack and precisely locate any message.',
      hero_cta: 'Install Free',
      hero_learn: 'Learn More',
      hero_stat_platforms: 'Platforms',
      hero_stat_langs: 'Languages',
      hero_stat_free: 'Totally Free',
      features_tag: 'Core Features',
      features_title: 'Every conversation at your fingertips',
      features_desc: 'No more scrolling through endless chat history. The sidebar outline takes you to any message in one click.',
      feature_outline: 'Outline Navigation',
      feature_outline_desc: 'Automatically extracts each user prompt to build a clickable sidebar outline for instant navigation.',
      feature_preview: 'AI Reply Preview',
      feature_preview_desc: 'Shows a summary of AI responses in the outline so you can quickly grasp the key content of each turn.',
      feature_darkmode: 'Dark Mode',
      feature_darkmode_desc: 'Automatically detects page theme and seamlessly adapts to both dark and light modes.',
      feature_i18n: 'Bilingual',
      feature_i18n_desc: 'Supports English and Simplified Chinese. Follows browser language by default, or switch manually.',
      feature_keyboard: 'Keyboard Nav',
      feature_keyboard_desc: 'Full keyboard shortcut support. Use arrow keys, Home/End to quickly browse the outline list.',
      feature_privacy: 'Privacy First',
      feature_privacy_desc: 'Runs entirely locally. No data collection, no network requests. Your conversations stay yours.',
      platforms_tag: 'Wide Compatibility',
      platforms_title: 'Works with major AI chat platforms',
      platforms_desc: 'One extension for all your favorite AI assistants.',
      platform_doubao: 'Doubao',
      platform_qwen: 'Qwen',
      screenshots_tag: 'Screenshots',
      screenshots_title: 'See how it works',
      screenshots_desc: 'Real usage across AI platforms.',
      cta_title: 'Ready to level up your AI chat experience?',
      cta_desc: 'Install OutlineMate for free and keep every AI conversation organized.',
      cta_button: 'Install from Chrome Web Store',
      footer_copy: '\u00a9 2026 AI Chat OutlineMate. All rights reserved.',
    },
  };

  var currentLang = 'zh';

  // --- Theme (default: dark) ---
  function getPreferredTheme() {
    var stored = localStorage.getItem('om-theme');
    if (stored === 'light' || stored === 'dark') return stored;
    return 'dark';
  }

  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('om-theme', theme);
  }

  // --- Language ---
  function setLang(lang) {
    currentLang = lang;
    localStorage.setItem('om-lang', lang);
    document.documentElement.setAttribute('lang', lang === 'zh' ? 'zh-CN' : 'en');

    var texts = i18n[lang];
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      if (texts[key] === undefined) return;

      // Preserve child elements (SVGs, etc.)
      var childElements = [];
      for (var i = 0; i < el.childNodes.length; i++) {
        if (el.childNodes[i].nodeType === Node.ELEMENT_NODE) {
          childElements.push(el.childNodes[i]);
        }
      }

      if (childElements.length > 0) {
        // Remove all text nodes
        var toRemove = [];
        for (var j = 0; j < el.childNodes.length; j++) {
          if (el.childNodes[j].nodeType === Node.TEXT_NODE) {
            toRemove.push(el.childNodes[j]);
          }
        }
        toRemove.forEach(function (n) { n.remove(); });

        // Re-insert text
        var lastSvg = el.querySelector('svg:last-of-type');
        if (key === 'hero_learn') {
          el.insertBefore(document.createTextNode(texts[key] + '\n          '), el.firstChild);
        } else {
          if (lastSvg && lastSvg.nextSibling) {
            el.insertBefore(document.createTextNode('\n          ' + texts[key] + '\n        '), lastSvg.nextSibling);
          } else {
            el.appendChild(document.createTextNode('\n          ' + texts[key] + '\n        '));
          }
        }
      } else {
        el.textContent = texts[key];
      }
    });

    // Update screenshot images based on language
    var langAttr = lang === 'zh' ? 'data-cn' : 'data-en';
    document.querySelectorAll('.screenshot-card').forEach(function (card) {
      var img = card.querySelector('img');
      if (img) {
        img.src = card.getAttribute(langAttr);
      }
    });
  }

  // --- Scroll Animations ---
  function initScrollAnimations() {
    var targets = document.querySelectorAll(
      '.feature-card, .platform-card, .screenshot-card, .section-header, .cta-card, .stat-card'
    );

    targets.forEach(function (el) {
      el.classList.add('fade-up');
    });

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    targets.forEach(function (el) {
      observer.observe(el);
    });
  }

  // --- Navbar scroll effect ---
  function initNavbarScroll() {
    var navbar = document.getElementById('navbar');
    window.addEventListener('scroll', function () {
      if (window.scrollY > 20) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }, { passive: true });
  }

  // --- Lightbox ---
  function initLightbox() {
    var lightbox = document.getElementById('lightbox');
    var lightboxImg = document.getElementById('lightboxImg');
    var lightboxClose = document.getElementById('lightboxClose');

    document.querySelectorAll('.screenshot-card img').forEach(function (img) {
      img.style.cursor = 'zoom-in';
      img.addEventListener('click', function (e) {
        e.stopPropagation();
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
      });
    });

    function closeLightbox() {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    }

    lightbox.addEventListener('click', closeLightbox);
    lightboxClose.addEventListener('click', closeLightbox);
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && lightbox.classList.contains('active')) {
        closeLightbox();
      }
    });
  }

  // --- Init ---
  function init() {
    // Theme
    setTheme(getPreferredTheme());

    document.getElementById('themeToggle').addEventListener('click', function () {
      var current = document.documentElement.getAttribute('data-theme');
      setTheme(current === 'dark' ? 'light' : 'dark');
    });

    // Language: detect browser lang, zh regions -> zh, others -> en
    var storedLang = localStorage.getItem('om-lang');
    if (storedLang === 'zh' || storedLang === 'en') {
      currentLang = storedLang;
    } else {
      var browserLang = (navigator.language || navigator.userLanguage || '').toLowerCase();
      currentLang = browserLang.startsWith('zh') ? 'zh' : 'en';
    }
    setLang(currentLang);

    document.getElementById('langToggle').addEventListener('click', function () {
      setLang(currentLang === 'zh' ? 'en' : 'zh');
    });

    // Scroll animations
    initScrollAnimations();
    initNavbarScroll();

    // Lightbox
    initLightbox();

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
      link.addEventListener('click', function (e) {
        var target = document.querySelector(link.getAttribute('href'));
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
