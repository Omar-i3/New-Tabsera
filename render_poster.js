const fs = require('fs');
const puppeteer = require('puppeteer-core');

const qrData = JSON.parse(fs.readFileSync('qr_codes.json', 'utf8'));

const html = `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <title>مساعد تبصرة الشرعي الذكي</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Amiri:ital,wght@0,400;0,700;1,400&family=Cairo:wght@400;500;600;700;800;900&family=Tajawal:wght@400;500;700;800&display=swap" rel="stylesheet">
  <style>
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    body {
      width: 720px;
      height: 1280px;
      background: #020712;
      font-family: 'Cairo', sans-serif;
      color: #f1f5f9;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 16px;
      overflow: hidden;
    }

    /* الإطار الخارجي الملكي مع زوايا ذهبية */
    .poster-frame {
      width: 100%;
      height: 100%;
      background: radial-gradient(ellipse at 50% 12%, #0e2752 0%, #071733 45%, #030b1a 100%);
      border: 1.5px solid rgba(212, 175, 55, 0.45);
      border-radius: 28px;
      position: relative;
      padding: 24px 20px 18px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      box-shadow: 0 0 50px rgba(7, 23, 51, 0.9), inset 0 0 35px rgba(2, 6, 23, 0.8);
      overflow: hidden;
    }

    /* نجوم ونقاط إيمانية في الخلفية */
    .poster-frame::before {
      content: '';
      position: absolute;
      inset: 0;
      background-image: 
        radial-gradient(circle at 18% 12%, rgba(255, 255, 255, 0.4) 1px, transparent 1px),
        radial-gradient(circle at 82% 14%, rgba(255, 255, 255, 0.3) 1px, transparent 1px),
        radial-gradient(circle at 12% 48%, rgba(212, 175, 55, 0.4) 1.2px, transparent 1.2px),
        radial-gradient(circle at 88% 52%, rgba(212, 175, 55, 0.35) 1.2px, transparent 1.2px),
        radial-gradient(circle at 25% 75%, rgba(255, 255, 255, 0.25) 1px, transparent 1px),
        radial-gradient(circle at 75% 78%, rgba(255, 255, 255, 0.3) 1px, transparent 1px);
      pointer-events: none;
    }

    /* زوايا الزخرفة الذهبية */
    .corner-decor {
      position: absolute;
      width: 44px;
      height: 44px;
      pointer-events: none;
    }
    .corner-tl { top: 12px; left: 12px; }
    .corner-tr { top: 12px; right: 12px; transform: scaleX(-1); }
    .corner-bl { bottom: 12px; left: 12px; transform: scaleY(-1); }
    .corner-br { bottom: 12px; right: 12px; transform: scale(-1); }

    /* الهيدر العلوي */
    .header-section {
      text-align: center;
      position: relative;
      z-index: 2;
    }

    .top-badge {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 5px 22px;
      background: linear-gradient(135deg, rgba(30, 58, 95, 0.7) 0%, rgba(15, 23, 42, 0.9) 100%);
      border: 1px solid rgba(246, 196, 69, 0.6);
      border-radius: 9999px;
      color: #fcd34d;
      font-size: 13.5px;
      font-weight: 700;
      letter-spacing: 0.5px;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
      margin-bottom: 10px;
    }

    .app-emblem {
      width: 62px;
      height: 62px;
      margin: 0 auto 8px;
      background: linear-gradient(135deg, #064e3b 0%, #022c22 100%);
      border: 2px solid #10b981;
      border-radius: 18px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      box-shadow: 0 0 25px rgba(16, 185, 129, 0.4), inset 0 0 12px rgba(16, 185, 129, 0.2);
    }
    .app-emblem svg {
      width: 28px;
      height: 28px;
      color: #34d399;
    }
    .app-emblem span {
      font-size: 9px;
      font-weight: 800;
      color: #a7f3d0;
      margin-top: 1px;
    }

    .main-title {
      font-family: 'Amiri', serif;
      font-size: 38px;
      font-weight: 700;
      color: #ffffff;
      line-height: 1.15;
      text-shadow: 0 2px 14px rgba(0, 0, 0, 0.7);
      margin-bottom: 2px;
    }
    .subtitle {
      font-size: 13px;
      font-weight: 500;
      color: #cbd5e1;
      max-width: 520px;
      margin: 0 auto 6px;
      line-height: 1.4;
    }
    .golden-star {
      display: inline-block;
      color: #f59e0b;
      font-size: 11px;
      filter: drop-shadow(0 0 8px rgba(245, 158, 11, 0.9));
    }

    /* شبكة البطاقات */
    .cards-container {
      display: flex;
      flex-direction: column;
      gap: 9px;
      position: relative;
      z-index: 2;
    }

    .feature-card {
      background: rgba(10, 24, 48, 0.75);
      border: 1px solid rgba(40, 80, 140, 0.55);
      border-radius: 16px;
      padding: 11px 14px;
      box-shadow: 0 4px 18px rgba(0, 0, 0, 0.35);
      position: relative;
    }

    .card-head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 4px;
    }

    .card-title-wrap {
      display: flex;
      align-items: center;
      gap: 7px;
    }
    .card-icon {
      width: 28px;
      height: 28px;
      border-radius: 8px;
      background: rgba(30, 64, 115, 0.6);
      border: 1px solid rgba(56, 189, 248, 0.35);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 14px;
      shrink: 0;
    }
    .card-title {
      font-size: 14px;
      font-weight: 800;
      color: #f6c445;
    }

    .card-badge {
      font-size: 10px;
      font-weight: 700;
      padding: 2px 9px;
      border-radius: 6px;
      background: rgba(246, 196, 69, 0.15);
      border: 1px solid rgba(246, 196, 69, 0.4);
      color: #fde68a;
    }

    .card-desc {
      font-size: 11.5px;
      line-height: 1.55;
      color: #cbd5e1;
    }
    .card-desc strong {
      color: #ffffff;
      font-weight: 700;
    }
    .card-desc .gold-text {
      color: #fbbf24;
      font-weight: 700;
    }

    /* صف ثنائي البطاقات */
    .two-col-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 9px;
    }
    .two-col-grid .feature-card {
      padding: 10px 12px;
    }
    .two-col-grid .card-title {
      font-size: 13px;
    }
    .two-col-grid .card-desc {
      font-size: 11px;
      line-height: 1.45;
    }

    /* وسوم المزايا (Pills) */
    .tags-list {
      display: flex;
      flex-wrap: wrap;
      gap: 5px;
      margin-top: 6px;
    }
    .tag-item {
      font-size: 10.5px;
      font-weight: 600;
      padding: 3px 8px;
      border-radius: 7px;
      background: rgba(15, 34, 65, 0.9);
      border: 1px solid rgba(56, 189, 248, 0.3);
      color: #e2e8f0;
      display: inline-flex;
      align-items: center;
      gap: 4px;
    }
    .tag-item.gold-tag {
      border-color: rgba(245, 158, 11, 0.4);
      color: #fde68a;
      background: rgba(245, 158, 11, 0.1);
    }

    /* شريط PWA المميز */
    .pwa-card {
      background: linear-gradient(135deg, rgba(6, 78, 59, 0.6) 0%, rgba(15, 23, 42, 0.8) 100%);
      border: 1px solid rgba(16, 185, 129, 0.5);
      border-radius: 12px;
      padding: 8px 14px;
      text-align: center;
      color: #ecfdf5;
      font-size: 12.5px;
      font-weight: 700;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      box-shadow: 0 4px 15px rgba(6, 78, 59, 0.25);
    }

    /* قسم الباركود في الأسفل */
    .qr-section-box {
      background: rgba(8, 20, 42, 0.85);
      border: 1.2px solid rgba(212, 175, 55, 0.4);
      border-radius: 18px;
      padding: 12px 14px;
      text-align: center;
      position: relative;
      z-index: 2;
      box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4);
    }
    .qr-section-title {
      font-size: 13.5px;
      font-weight: 800;
      color: #f6c445;
      margin-bottom: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
    }
    .qr-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
    }
    .qr-card {
      background: rgba(13, 30, 60, 0.7);
      border: 1px solid rgba(56, 189, 248, 0.35);
      border-radius: 14px;
      padding: 10px 8px;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .qr-card.highlight {
      border-color: rgba(16, 185, 129, 0.55);
      background: linear-gradient(180deg, rgba(6, 78, 59, 0.25) 0%, rgba(13, 30, 60, 0.8) 100%);
    }
    .qr-card-title {
      font-size: 12px;
      font-weight: 800;
      color: #f8fafc;
      margin-bottom: 6px;
      display: flex;
      align-items: center;
      gap: 5px;
    }
    .qr-img-wrap {
      width: 96px;
      height: 96px;
      background: #ffffff;
      padding: 5px;
      border-radius: 10px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    }
    .qr-img-wrap img {
      width: 100%;
      height: 100%;
      display: block;
    }
    .qr-url {
      font-size: 10.5px;
      font-family: 'Tajawal', sans-serif;
      font-weight: 700;
      color: #94a3b8;
      margin-top: 6px;
      direction: ltr;
    }
    .qr-card.highlight .qr-url {
      color: #6ee7b7;
    }

    /* الفوتر السفلي */
    .footer-text {
      text-align: center;
      font-size: 11px;
      font-weight: 600;
      color: #94a3b8;
      position: relative;
      z-index: 2;
      padding-top: 2px;
    }
    .footer-text span {
      color: #f6c445;
      font-weight: 700;
    }
  </style>
</head>
<body>

  <div class="poster-frame">
    <!-- زخارف الزوايا الذهبية الأربع -->
    <svg class="corner-decor corner-tl" viewBox="0 0 50 50">
      <path d="M 0,46 L 0,22 Q 0,0 22,0 L 46,0" fill="none" stroke="#f6c445" stroke-width="2.5" stroke-linecap="round"/>
      <circle cx="8" cy="8" r="2.5" fill="#f6c445"/>
    </svg>
    <svg class="corner-decor corner-tr" viewBox="0 0 50 50">
      <path d="M 0,46 L 0,22 Q 0,0 22,0 L 46,0" fill="none" stroke="#f6c445" stroke-width="2.5" stroke-linecap="round"/>
      <circle cx="8" cy="8" r="2.5" fill="#f6c445"/>
    </svg>
    <svg class="corner-decor corner-bl" viewBox="0 0 50 50">
      <path d="M 0,46 L 0,22 Q 0,0 22,0 L 46,0" fill="none" stroke="#f6c445" stroke-width="2.5" stroke-linecap="round"/>
      <circle cx="8" cy="8" r="2.5" fill="#f6c445"/>
    </svg>
    <svg class="corner-decor corner-br" viewBox="0 0 50 50">
      <path d="M 0,46 L 0,22 Q 0,0 22,0 L 46,0" fill="none" stroke="#f6c445" stroke-width="2.5" stroke-linecap="round"/>
      <circle cx="8" cy="8" r="2.5" fill="#f6c445"/>
    </svg>

    <!-- الهيدر العلوي -->
    <div class="header-section">
      <div class="top-badge">
        <span>✨</span> مُسَاعِدُكَ الشَّرْعِيُّ الذَّكِيُّ الشَّامِلُ <span>✨</span>
      </div>

      <div class="app-emblem">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
          <path d="M19 3v4"></path>
          <path d="M21 5h-4"></path>
        </svg>
        <span>تبصرة</span>
      </div>

      <h1 class="main-title">مساعد تبصرة</h1>
      <p class="subtitle">بوابتك الرقمية إلى الفتاوى الشرعية والعلوم الإسلامية الموثقة بالذكاء الاصطناعي</p>
      <div class="golden-star">◆</div>
    </div>

    <!-- شبكة المزايا -->
    <div class="cards-container">
      
      <!-- ميزة 1: شات شرعي متقدم -->
      <div class="feature-card">
        <div class="card-head">
          <div class="card-title-wrap">
            <div class="card-icon">🕌</div>
            <h2 class="card-title">شات واستشارات شرعية موثقة وفورية</h2>
          </div>
          <span class="card-badge">مدعوم بـ DeepSeek</span>
        </div>
        <p class="card-desc">
          إجابات شرعية ذكية ودقيقة مستندة إلى <strong>الكتاب والسنة</strong> بفهم سلف الأمة، مع <span class="gold-text">توثيق الأدلة وتخريج الأحاديث</span> وأقوال أهل العلم بلغة رصينة وميسرة تناسب جميع المستويات.
        </p>
      </div>

      <!-- ميزة 2 + 3: شبكة بعمودين -->
      <div class="two-col-grid">
        <div class="feature-card">
          <div class="card-head">
            <div class="card-title-wrap">
              <div class="card-icon">📜</div>
              <h3 class="card-title">فتاوى كبار العلماء</h3>
            </div>
          </div>
          <p class="card-desc">
            منهجية علمية معتمدة مستمدة من: <strong>ابن باز • ابن عثيمين • الألباني • اللجنة الدائمة • عثمان الخميس</strong>.
          </p>
        </div>

        <div class="feature-card">
          <div class="card-head">
            <div class="card-title-wrap">
              <div class="card-icon">⚡</div>
              <h3 class="card-title">أنماط إجابة مرنة</h3>
            </div>
          </div>
          <p class="card-desc">
            اختر بين <strong>مفصّل بالأدلة</strong> وتخريج الأحاديث، أو <strong>موجز وسريع</strong> للحكم الفقهي المباشر بنقاط واضحة.
          </p>
        </div>
      </div>

      <!-- ميزة 4: الاستيضاح الذكي والسيناريوهات -->
      <div class="feature-card">
        <div class="card-head">
          <div class="card-title-wrap">
            <div class="card-icon">💡</div>
            <h3 class="card-title">استيضاح فقهي وتحديد دقيق للمسألة</h3>
          </div>
          <span class="card-badge">أزرار سياقية ذكية</span>
        </div>
        <p class="card-desc">
          خيارات تفاعلية تظهر تلقائياً لتحديد تفاصيل حالتك الفقهية وظروف السؤال، لضمان فتوى دقيقة ومطابقة لحالتك دون أي التباس.
        </p>
      </div>

      <!-- ميزة 5: بطاقات الموسوعة وتخريج الأحاديث -->
      <div class="feature-card">
        <div class="card-head">
          <div class="card-title-wrap">
            <div class="card-icon">📖</div>
            <h3 class="card-title">بطاقات الأحاديث والآيات والخدمات الذكية</h3>
          </div>
        </div>
        <p class="card-desc">
          عرض جمالي للآيات القرآنية وبطاقات مخصصة للأحاديث النبوية مع بيان درجة الحديث والمصدر:
        </p>
        <div class="tags-list">
          <span class="tag-item gold-tag">✨ الآيات الكريمة</span>
          <span class="tag-item gold-tag">📜 أحاديث مخرجة (صحيح/حسن)</span>
          <span class="tag-item">🌐 6 لغات عالمية</span>
          <span class="tag-item">🔊 نطق صوتي فوري</span>
          <span class="tag-item">💾 حفظ وأرشفة المحادثات</span>
          <span class="tag-item">🎨 تحكم بحجم ونوع الخط والسمات</span>
        </div>
      </div>

      <!-- ميزة 6: PWA تطبيق ويب تقدمي -->
      <div class="pwa-card">
        <span>📲</span>
        <span>تطبيق ويب تقدمي (PWA) – تثبيت فوري خفيف وسريع على كافة الأجهزة (آيفون، أندرويد، كمبيوتر)</span>
      </div>

    </div>

    <!-- قسم الباركود QR Code -->
    <div class="qr-section-box">
      <div class="qr-section-title">
        <span>📲</span> امسح الباركود لزيارة المواقع مباشرة بكاميرا الجوال
      </div>
      <div class="qr-grid">
        <div class="qr-card highlight">
          <div class="qr-card-title">
            <span>🌙</span> مساعد تبصرة الرقمي
          </div>
          <div class="qr-img-wrap">
            <img src="data:image/png;base64,${qrData.tabsera}" alt="QR Tabsera">
          </div>
          <div class="qr-url">omar-i3.github.io/Tabsera</div>
        </div>

        <div class="qr-card">
          <div class="qr-card-title">
            <span>⭐</span> بوابة زاد المؤمن
          </div>
          <div class="qr-img-wrap">
            <img src="data:image/png;base64,${qrData.zad}" alt="QR Zad Al-Momen">
          </div>
          <div class="qr-url">Omar-i3.github.io/Zad-Al-Momen</div>
        </div>
      </div>
    </div>

    <!-- الفوتر -->
    <div class="footer-text">
      🌙 مساعد تبصرة الشرعي وزاد المؤمن – إعداد وتطوير: <span>عمر</span> • وقف إيماني وصدقة جارية
    </div>

  </div>

</body>
</html>
`;

fs.writeFileSync('poster_tabsera.html', html, 'utf8');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\\\Program Files\\\\Google\\\\Chrome\\\\Application\\\\chrome.exe',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({
    width: 720,
    height: 1280,
    deviceScaleFactor: 2
  });

  await page.goto('file:///' + __dirname.replace(/\\\\/g, '/') + '/poster_tabsera.html', {
    waitUntil: 'networkidle0'
  });

  // انتظار تحميل الخطوط
  await page.evaluateHandle('document.fonts.ready');

  const outputPath = 'tabsera_poster.png';
  await page.screenshot({
    path: outputPath,
    clip: { x: 0, y: 0, width: 720, height: 1280 }
  });

  await browser.close();
  console.log('Poster rendered successfully to ' + outputPath);
})();
