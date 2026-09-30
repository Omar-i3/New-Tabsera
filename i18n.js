/* ==========================================================================
   🌍 نظام الترجمة متعدد اللغات (i18n) — تبصرة
   يدعم: العربية، الإنجليزية، الفرنسية، التركية، الأردية، الإندونيسية
   ========================================================================== */

const I18N_STORAGE_KEY = 'tabsirah_language';

const RTL_LANGUAGES = ['ar', 'ur'];

const SUPPORTED_LANGUAGES = [
    { code: 'ar', name: 'العربية', flag: '🇸🇦', dir: 'rtl' },
    { code: 'en', name: 'English', flag: '🇬🇧', dir: 'ltr' },
    { code: 'fr', name: 'Français', flag: '🇫🇷', dir: 'ltr' },
    { code: 'tr', name: 'Türkçe', flag: '🇹🇷', dir: 'ltr' },
    { code: 'ur', name: 'اردو', flag: '🇵🇰', dir: 'rtl' },
    { code: 'id', name: 'Indonesia', flag: '🇮🇩', dir: 'ltr' },
];

/* ---------- قاموس الترجمات ---------- */
const translations = {

/* ═══════════════ العربية (ar) — الافتراضية ═══════════════ */
ar: {
    // التطبيق
    "app.name": "تبصرة",
    "app.subtitle": "مساعدك الشرعي الرقمي",

    // الشريط الجانبي
    "sidebar.newChat": "محادثة جديدة",
    "sidebar.recentChats": "المحادثات الأخيرة",
    "sidebar.noChats": "لا توجد محادثات",
    "sidebar.visitor": "زائر",
    "sidebar.notRegistered": "غير مسجّل",
    "sidebar.login": "دخول",
    "sidebar.logout": "خروج",

    // الهيدر
    "header.title": "مساعد تبصرة الرقمي",
    "header.active": "نشط الآن",

    // المحادثة
    "chat.placeholder": "اكتب سؤالك الشرعي هنا...",
    "chat.modeDetailed": "مفصّل بالأدلة",
    "chat.modeConcise": "موجز وسريع",
    "chat.send": "إرسال",
    "chat.loading": "جاري التفكير وتحضير الرد الشرعي...",
    "chat.copy": "نسخ",
    "chat.copied": "تم",
    "chat.whatsapp": "واتساب",
    "chat.regenerate": "إعادة التوليد",
    "chat.latestMessages": "أحدث الرسائل",
    "chat.disclaimer": "مساعد تبصرة يقدم استشارات وإجابات بناءً على المصادر الشرعية، يرجى التثبت في الفتاوى المعقدة.",
    "chat.errorConnection": "عذراً، حدث خطأ في الاتصال بالخادم: ",
    "chat.editTooltip": "تعديل السؤال وإعادة إرساله",
    "chat.likeTooltip": "إجابة مفيدة ودقيقة",
    "chat.dislikeTooltip": "إجابة غير دقيقة",

    // شاشة الترحيب
    "welcome.greeting": "السلام عليكم ورحمة الله وبركاته",
    "welcome.subtitle": "أنا مساعد تبصرة الرقمي، كيف يمكنني مساعدتك اليوم؟",
    "welcome.card1Title": "آداب الدعاء المستجاب",
    "welcome.card1Desc": "تعرف على الأوقات والشروط التي يُرجى فيها القبول",
    "welcome.card1Prompt": "ما هي آداب وأوقات إجابة الدعاء؟",
    "welcome.card2Title": "أذكار الصباح والمساء",
    "welcome.card2Desc": "الأدعية والأذكار الحافظة من السنة النبوية",
    "welcome.card2Prompt": "اذكر لي أذكار الصباح كاملة",

    // الإعدادات
    "settings.title": "إعدادات تبصرة",
    "settings.subtitle": "تخصيص الحساب، المظهر، والمحادثات",
    "settings.tabs.account": "الحساب",
    "settings.tabs.appearance": "المظهر والخط",
    "settings.tabs.chat": "المحادثة",
    "settings.tabs.data": "البيانات",
    "settings.tabs.about": "عن تبصرة",

    // الحساب
    "settings.account.notRegisteredGoogle": "غير مسجّل بحساب Google",
    "settings.account.editName": "تعديل الاسم المعروض",
    "settings.account.namePlaceholder": "أدخل اسمك...",
    "settings.account.saveName": "حفظ الاسم",
    "settings.account.logoutFull": "تسجيل الخروج من الحساب",
    "settings.account.cloudInfo": "تسجيل الدخول بحساب Google يحفظ جميع محادثاتك واستشاراتك سحابياً لتصل إليها تلقائياً من أي هاتف أو جهاز آخر.",
    "settings.account.registeredUser": "مستخدم مسجّل",
    "settings.account.settingsTooltip": "إعدادات الحساب",

    // المظهر
    "settings.appearance.themeColor": "لون السمة والتمييز",
    "settings.appearance.emerald": "زمردي",
    "settings.appearance.gold": "ذهبي",
    "settings.appearance.sky": "سماوي",
    "settings.appearance.purple": "بنفسجي",
    "settings.appearance.rose": "ياقوتي",
    "settings.appearance.fontSize": "حجم خط المحادثات",
    "settings.appearance.fontSmall": "صغير",
    "settings.appearance.fontMedium": "قياسي",
    "settings.appearance.fontLarge": "كبير",
    "settings.appearance.fontFamily": "نوع الخط العربي",
    "settings.appearance.cairo": "خط كايرو (عصري - الافتراضي)",
    "settings.appearance.amiri": "خط أميري (أصالة ونصوص شرعية)",
    "settings.appearance.tajawal": "خط تجوال (ناعم وحديث)",
    "settings.appearance.oled": "سواد فاحم لشاشات OLED",
    "settings.appearance.oledDesc": "خلفية سوداء بالكامل لتوفير البطارية وإبراز النصوص",
    "settings.appearance.language": "لغة الواجهة",

    // المحادثة (إعدادات)
    "settings.chat.defaultMode": "نمط الإجابة الشرعية الافتراضي",
    "settings.chat.detailed": "مفصّل بالأدلة",
    "settings.chat.detailedDesc": "تخريج، أدلة، وأقوال العلماء",
    "settings.chat.concise": "موجز وسريع",
    "settings.chat.conciseDesc": "الحكم المباشر بنقاط واضحة",
    "settings.chat.salawat": "الصلاة على النبي ﷺ والافتتاح بالسلام",
    "settings.chat.salawatDesc": "تضمين الصلاة على رسول الله ﷺ في بداية الإجابات",
    "settings.chat.enterSend": "الإرسال بمفتاح Enter",
    "settings.chat.enterSendDesc": "إرسال مباشر بـ Enter والسطر الجديد بـ Shift+Enter",
    "settings.chat.sound": "صوت خفيف عند اكتمال الرد",
    "settings.chat.soundDesc": "إشعار صوتي ناعم يخبرك بانتهاء المساعد من الكتابة",

    // البيانات
    "settings.data.savedChats": "المحادثات المحفوظة",
    "settings.data.chatCount": "{count} محادثة محفوظة",
    "settings.data.export": "تصدير المحادثات",
    "settings.data.deleteTitle": "مسح سجل المحادثات",
    "settings.data.deleteDesc": "حذف جميع الأسئلة والمحادثات السابقة نهائياً",
    "settings.data.deleteBtn": "مسح الكل",

    // عن تبصرة
    "settings.about.title": "تبصرة - مساعدك الشرعي الرقمي",
    "settings.about.version": "الإصدار 2.5",
    "settings.about.desc": "منصة ذكاء اصطناعي إسلامية متخصصة في الإجابات الشرعية والفقهية والأسرية وفق منهج أهل السنة والجماعة، مدعومة بالأدلة الصحيحة وتخريج الأحاديث.",
    "settings.about.developer": "تطوير وتصميم:",
    "settings.about.developerName": "عمر",

    // بنر iOS
    "ios.title": "ثبّت تطبيق تبصرة على الآيفون 📲",
    "ios.desc": "اضغط زر المشاركة 📤 ثم اختر (إضافة إلى الشاشة الرئيسية)",

    // رسائل تنبيهية
    "alert.nameRequired": "يرجى إدخال اسم صحيح.",
    "alert.nameUpdated": "تم تحديث اسمك بنجاح! ✨",
    "alert.nameError": "حدث خطأ أثناء تعديل الاسم: ",
    "alert.noChatsExport": "لا توجد أي محادثات لتصديرها.",
    "alert.deleteConfirm": "⚠️ هل أنت متأكد من رغبتك في مسح كافة المحادثات نهائياً؟ لا يمكن التراجع عن هذا الإجراء.",
    "alert.deleteSuccess": "تم مسح جميع المحادثات بنجاح.",
    "alert.renamePrompt": "أدخل اسماً جديداً للمحادثة:",
    "alert.loginFileError": "⚠️ تنبيه أمني من Google:\n\nجوجل تمنع تسجيل الدخول مباشرة من الملفات المحلية (file:///c:/...).\n\nلتسجيل الدخول، يرجى تشغيل الموقع عبر سيرفر محلي (مثل Live Server في VS Code) أو تشغيل خادم محلي:\npython -m http.server 3000\nثم فتح الرابط: http://localhost:3000",
    "alert.loginError": "خطأ في تسجيل الدخول: ",

    // متفرقات
    "misc.newConversation": "محادثة جديدة",
    "misc.islamicQuery": "استفسار شرعي",
    "misc.newIslamicChat": "محادثة شرعية جديدة",
    "misc.thankPositive": "شكراً لتقييمك الإيجابي! ✨",
    "misc.thankNegative": "شكراً لملاحظتك، نسعى للتحسين!",
    "misc.sharePrefix": "*من تطبيق تبصرة:*\n\n",

    // التصدير
    "export.header": "محادثات واستشارات تبصرة الرقمي",
    "export.dateLabel": "تاريخ التصدير:",
    "export.chatLabel": "محادثة",
    "export.user": "المستخدم",
    "export.assistant": "مساعد تبصرة",
    // الذكاء الاصطناعي الشرعي (AI Settings)
    "settings.tabs.ai": "الذكاء الشرعي",
    "settings.ai.title": "تخصيص الذكاء الاصطناعي الشرعي",
    "settings.ai.fiqhSchool": "المذهب الفقهي المعتمد",
    "settings.ai.schoolRajih": "الراجح والدليل (افتراضي)",
    "settings.ai.schoolHanafi": "المذهب الحنفي",
    "settings.ai.schoolMaliki": "المذهب المالكي",
    "settings.ai.schoolShafii": "المذهب الشافعي",
    "settings.ai.schoolHanbali": "المذهب الحنبلي",
    "settings.ai.schoolComparative": "مقارنة المذاهب الأربعة",
    "settings.ai.personaTitle": "عمق الإجابة ونمط المساعد",
    "settings.ai.personaScholar": "طالب علم وباحث مؤصل",
    "settings.ai.personaScholarDesc": "أدلة تفصيلية، أصول فقه، ونصوص التراث والترجيح",
    "settings.ai.personaEasy": "فتوى ميسرة للمسلم المعاصر",
    "settings.ai.personaEasyDesc": "إجابة مباشرة وسهلة بلغة واضحة وخطوات عملية",
    "settings.ai.personaTarbiyah": "موعظة وتزكية قلبية",
    "settings.ai.personaTarbiyahDesc": "تركيز على الجانب الإيماني والرقائق ومقاصد الشريعة",
    "settings.ai.clarifyTitle": "الاستيضاح الذكي في المسائل المشروطة",
    "settings.ai.clarifyDesc": "طرح أسئلة استيضاحية إذا كان السؤال يحتمل تفاصيل مؤثرة في الفتوى",
    "settings.ai.hadithVerifyTitle": "تخريج وتحقيق الأحاديث دائماً",
    "settings.ai.hadithVerifyDesc": "إلزام المساعد بعزو الحديث وبيان صحته (صحيح، حسن، ضعيف...)",
    "settings.ai.quranCitationTitle": "عزو الآيات بالرسم القرآني والسورة",
    "settings.ai.quranCitationDesc": "تأطير الآيات الكريمة مع ذكر اسم السورة ورقم الآية",

    // عناصر التفاعل
    "chat.stop": "إيقاف التوليد",
    "chat.stopped": "تم إيقاف التوليد بناءً على طلبك.",
    "hadith.sahih": "صحيح",
    "hadith.hasan": "حسن",
    "hadith.daif": "ضعيف",
    "hadith.muttafaq": "متفق عليه",
    "hadith.source": "التخريج",
    "clarify.title": "خيارات لتحديد حالتك بدقة:",

    // الوسائط المتعددة (Multimodal)
    "chat.attachImage": "إرفاق صورة للتحليل الشرعي",
    "chat.voiceRecord": "تسجيل رسالة صوتية",
    "chat.voiceListening": "جاري الاستماع... تحدّث الآن",
    "chat.voiceStop": "إيقاف التسجيل الصوتي",
    "chat.voiceNotSupported": "عذراً، متصفحك لا يدعم التعرف على الصوت.",
    "chat.voiceError": "حدث خطأ في التقاط الصوت: ",
    "chat.imageTooLarge": "حجم الصورة كبير جداً، يرجى اختيار صورة أصغر من 10 ميجابايت.",
    "chat.liveModeTitle": "وضع المحادثة الحية",
    "chat.liveModeListening": "جاري الاستماع... (تحدّث الآن)",
    "chat.liveModeSpeaking": "المساعد يتحدث معك الآن...",
    "header.liveMode": "مكالمة",
},

/* ═══════════════ English (en) ═══════════════ */
en: {
    "app.name": "Tabsera",
    "app.subtitle": "Your Digital Islamic Assistant",

    "sidebar.newChat": "New Chat",
    "sidebar.recentChats": "Recent Chats",
    "sidebar.noChats": "No conversations yet",
    "sidebar.visitor": "Guest",
    "sidebar.notRegistered": "Not signed in",
    "sidebar.login": "Sign In",
    "sidebar.logout": "Sign Out",

    "header.title": "Tabsera Digital Assistant",
    "header.active": "Online",

    "chat.placeholder": "Type your Islamic question here...",
    "chat.modeDetailed": "Detailed with Evidence",
    "chat.modeConcise": "Brief & Quick",
    "chat.send": "Send",
    "chat.loading": "Thinking and preparing the Islamic response...",
    "chat.copy": "Copy",
    "chat.copied": "Copied",
    "chat.whatsapp": "WhatsApp",
    "chat.regenerate": "Regenerate",
    "chat.latestMessages": "Latest Messages",
    "chat.disclaimer": "Tabsera provides consultations based on authentic Islamic sources. Please verify complex rulings with qualified scholars.",
    "chat.errorConnection": "Sorry, a connection error occurred: ",
    "chat.editTooltip": "Edit and resend the question",
    "chat.likeTooltip": "Helpful and accurate answer",
    "chat.dislikeTooltip": "Inaccurate answer",

    "welcome.greeting": "Assalamu Alaikum wa Rahmatullahi wa Barakatuh",
    "welcome.subtitle": "I'm Tabsera, your digital Islamic assistant. How can I help you today?",
    "welcome.card1Title": "Etiquettes of Accepted Du'a",
    "welcome.card1Desc": "Learn about the times and conditions when prayers are most likely accepted",
    "welcome.card1Prompt": "What are the etiquettes and best times for making Du'a?",
    "welcome.card2Title": "Morning & Evening Adhkar",
    "welcome.card2Desc": "Protective supplications from the Prophetic Sunnah",
    "welcome.card2Prompt": "List the complete morning Adhkar for me",

    "settings.title": "Tabsera Settings",
    "settings.subtitle": "Customize account, appearance, and conversations",
    "settings.tabs.account": "Account",
    "settings.tabs.appearance": "Appearance & Font",
    "settings.tabs.chat": "Conversation",
    "settings.tabs.data": "Data",
    "settings.tabs.about": "About Tabsera",

    "settings.account.notRegisteredGoogle": "Not signed in with Google",
    "settings.account.editName": "Edit Display Name",
    "settings.account.namePlaceholder": "Enter your name...",
    "settings.account.saveName": "Save Name",
    "settings.account.logoutFull": "Sign Out from Account",
    "settings.account.cloudInfo": "Sign in with Google to sync your conversations and consultations to the cloud, accessible from any device automatically.",
    "settings.account.registeredUser": "Registered User",
    "settings.account.settingsTooltip": "Account Settings",

    "settings.appearance.themeColor": "Theme & Accent Color",
    "settings.appearance.emerald": "Emerald",
    "settings.appearance.gold": "Gold",
    "settings.appearance.sky": "Sky",
    "settings.appearance.purple": "Purple",
    "settings.appearance.rose": "Rose",
    "settings.appearance.fontSize": "Chat Font Size",
    "settings.appearance.fontSmall": "Small",
    "settings.appearance.fontMedium": "Medium",
    "settings.appearance.fontLarge": "Large",
    "settings.appearance.fontFamily": "Arabic Font Style",
    "settings.appearance.cairo": "Cairo (Modern - Default)",
    "settings.appearance.amiri": "Amiri (Classic & Scholarly)",
    "settings.appearance.tajawal": "Tajawal (Smooth & Modern)",
    "settings.appearance.oled": "Deep Black for OLED Displays",
    "settings.appearance.oledDesc": "Full black background to save battery and enhance readability",
    "settings.appearance.language": "Interface Language",

    "settings.chat.defaultMode": "Default Islamic Response Style",
    "settings.chat.detailed": "Detailed with Evidence",
    "settings.chat.detailedDesc": "Hadith grading, evidence, and scholars' opinions",
    "settings.chat.concise": "Brief & Quick",
    "settings.chat.conciseDesc": "Direct ruling with clear points",
    "settings.chat.salawat": "Salawat upon the Prophet ﷺ",
    "settings.chat.salawatDesc": "Include blessings upon the Messenger ﷺ at the beginning of responses",
    "settings.chat.enterSend": "Send with Enter Key",
    "settings.chat.enterSendDesc": "Send directly with Enter, new line with Shift+Enter",
    "settings.chat.sound": "Sound on Response Completion",
    "settings.chat.soundDesc": "A gentle notification sound when the assistant finishes typing",

    "settings.data.savedChats": "Saved Conversations",
    "settings.data.chatCount": "{count} saved conversations",
    "settings.data.export": "Export Conversations",
    "settings.data.deleteTitle": "Clear Chat History",
    "settings.data.deleteDesc": "Permanently delete all questions and previous conversations",
    "settings.data.deleteBtn": "Clear All",

    "settings.about.title": "Tabsera — Your Digital Islamic Assistant",
    "settings.about.version": "Version 2.5",
    "settings.about.desc": "An Islamic AI platform specializing in Sharia, Fiqh, and family guidance following the methodology of Ahl al-Sunnah wal-Jama'ah, supported by authentic evidence and Hadith verification.",
    "settings.about.developer": "Developed & Designed by:",
    "settings.about.developerName": "Omar",

    "ios.title": "Install Tabsera on your iPhone 📲",
    "ios.desc": "Tap the Share button 📤 then choose (Add to Home Screen)",

    "alert.nameRequired": "Please enter a valid name.",
    "alert.nameUpdated": "Your name has been updated successfully! ✨",
    "alert.nameError": "An error occurred while updating the name: ",
    "alert.noChatsExport": "No conversations to export.",
    "alert.deleteConfirm": "⚠️ Are you sure you want to permanently delete all conversations? This action cannot be undone.",
    "alert.deleteSuccess": "All conversations have been cleared successfully.",
    "alert.renamePrompt": "Enter a new name for the conversation:",
    "alert.loginFileError": "⚠️ Google Security Notice:\n\nGoogle blocks sign-in directly from local files (file:///c:/...).\n\nTo sign in, please run the site via a local server (e.g., Live Server in VS Code) or run:\npython -m http.server 3000\nThen open: http://localhost:3000",
    "alert.loginError": "Sign-in error: ",

    "misc.newConversation": "New Conversation",
    "misc.islamicQuery": "Islamic Query",
    "misc.newIslamicChat": "New Islamic Conversation",
    "misc.thankPositive": "Thanks for your positive feedback! ✨",
    "misc.thankNegative": "Thanks for your feedback, we strive to improve!",
    "misc.sharePrefix": "*From Tabsera App:*\n\n",

    "export.header": "Tabsera Digital Conversations & Consultations",
    "export.dateLabel": "Export Date:",
    "export.chatLabel": "Conversation",
    "export.user": "User",
    "export.assistant": "Tabsera Assistant",
    // Islamic AI Settings
    "settings.tabs.ai": "Islamic AI",
    "settings.ai.title": "Islamic AI Customization",
    "settings.ai.fiqhSchool": "Preferred Fiqh School",
    "settings.ai.schoolRajih": "Preponderant Opinion (Default)",
    "settings.ai.schoolHanafi": "Hanafi School",
    "settings.ai.schoolMaliki": "Maliki School",
    "settings.ai.schoolShafii": "Shafi'i School",
    "settings.ai.schoolHanbali": "Hanbali School",
    "settings.ai.schoolComparative": "Four Schools Comparison",
    "settings.ai.personaTitle": "Response Depth & Persona",
    "settings.ai.personaScholar": "Scholar & Researcher",
    "settings.ai.personaScholarDesc": "Detailed proofs, Usul al-Fiqh, and classical scholars' views",
    "settings.ai.personaEasy": "Facilitated Practical Fatwa",
    "settings.ai.personaEasyDesc": "Direct, simple answer with clear practical steps",
    "settings.ai.personaTarbiyah": "Spiritual & Heartfelt Advice",
    "settings.ai.personaTarbiyahDesc": "Focus on Iman, purification of the heart, and rulings' wisdom",
    "settings.ai.clarifyTitle": "Smart Clarification on Conditional Rulings",
    "settings.ai.clarifyDesc": "Ask clarifying questions when rulings depend on specific circumstances",
    "settings.ai.hadithVerifyTitle": "Always Verify & Grade Hadiths",
    "settings.ai.hadithVerifyDesc": "Require source citations and authenticity grading (Sahih, Hasan, Da'if)",
    "settings.ai.quranCitationTitle": "Quran Verse Citations & Calligraphy",
    "settings.ai.quranCitationDesc": "Frame Quranic verses with Surah name and Ayah number",

    // Interactive elements
    "chat.stop": "Stop Generation",
    "chat.stopped": "Generation stopped at your request.",
    "hadith.sahih": "Sahih (Authentic)",
    "hadith.hasan": "Hasan (Good)",
    "hadith.daif": "Da'if (Weak)",
    "hadith.muttafaq": "Muttafaq 'Alayh",
    "hadith.source": "Citation",
    "clarify.title": "Options to clarify your situation:",

    // Multimodal
    "chat.attachImage": "Attach image for Islamic analysis",
    "chat.voiceRecord": "Record voice question",
    "chat.voiceListening": "Listening... Speak now",
    "chat.voiceStop": "Stop voice recording",
    "chat.voiceNotSupported": "Sorry, your browser does not support Speech Recognition.",
    "chat.voiceError": "Voice recognition error: ",
    "chat.imageTooLarge": "Image is too large, please select an image under 10MB.",
    "chat.readAloud": "Listen to response",
    "chat.stopReading": "Stop reading aloud",
    "chat.imageAttached": "Attached image",

},

/* ═══════════════ Français (fr) ═══════════════ */
fr: {
    "app.name": "Tabsera",
    "app.subtitle": "Votre assistant islamique numérique",

    "sidebar.newChat": "Nouvelle discussion",
    "sidebar.recentChats": "Discussions récentes",
    "sidebar.noChats": "Aucune discussion",
    "sidebar.visitor": "Visiteur",
    "sidebar.notRegistered": "Non connecté",
    "sidebar.login": "Connexion",
    "sidebar.logout": "Déconnexion",

    "header.title": "Assistant numérique Tabsera",
    "header.active": "En ligne",

    "chat.placeholder": "Écrivez votre question islamique ici...",
    "chat.modeDetailed": "Détaillé avec preuves",
    "chat.modeConcise": "Bref et rapide",
    "chat.send": "Envoyer",
    "chat.loading": "Réflexion et préparation de la réponse islamique...",
    "chat.copy": "Copier",
    "chat.copied": "Copié",
    "chat.whatsapp": "WhatsApp",
    "chat.regenerate": "Régénérer",
    "chat.latestMessages": "Messages récents",
    "chat.disclaimer": "Tabsera fournit des consultations basées sur des sources islamiques authentiques. Veuillez vérifier les avis complexes auprès de savants qualifiés.",
    "chat.errorConnection": "Désolé, une erreur de connexion s'est produite : ",
    "chat.editTooltip": "Modifier et renvoyer la question",
    "chat.likeTooltip": "Réponse utile et précise",
    "chat.dislikeTooltip": "Réponse inexacte",

    "welcome.greeting": "Assalamou Alaykoum wa Rahmatoullahi wa Barakatouh",
    "welcome.subtitle": "Je suis Tabsera, votre assistant islamique numérique. Comment puis-je vous aider aujourd'hui ?",
    "welcome.card1Title": "Règles du Do'a exaucé",
    "welcome.card1Desc": "Découvrez les moments et conditions propices à l'exaucement",
    "welcome.card1Prompt": "Quelles sont les règles et les meilleurs moments pour le Do'a ?",
    "welcome.card2Title": "Adhkar du matin et du soir",
    "welcome.card2Desc": "Les invocations protectrices de la Sunnah prophétique",
    "welcome.card2Prompt": "Donnez-moi les Adhkar complets du matin",

    "settings.title": "Paramètres de Tabsera",
    "settings.subtitle": "Personnaliser le compte, l'apparence et les conversations",
    "settings.tabs.account": "Compte",
    "settings.tabs.appearance": "Apparence et police",
    "settings.tabs.chat": "Conversation",
    "settings.tabs.data": "Données",
    "settings.tabs.about": "À propos",

    "settings.account.notRegisteredGoogle": "Non connecté avec Google",
    "settings.account.editName": "Modifier le nom affiché",
    "settings.account.namePlaceholder": "Entrez votre nom...",
    "settings.account.saveName": "Enregistrer le nom",
    "settings.account.logoutFull": "Se déconnecter du compte",
    "settings.account.cloudInfo": "Connectez-vous avec Google pour synchroniser vos conversations dans le cloud, accessibles automatiquement depuis n'importe quel appareil.",
    "settings.account.registeredUser": "Utilisateur enregistré",
    "settings.account.settingsTooltip": "Paramètres du compte",

    "settings.appearance.themeColor": "Couleur du thème et accentuation",
    "settings.appearance.emerald": "Émeraude",
    "settings.appearance.gold": "Or",
    "settings.appearance.sky": "Ciel",
    "settings.appearance.purple": "Violet",
    "settings.appearance.rose": "Rose",
    "settings.appearance.fontSize": "Taille de la police du chat",
    "settings.appearance.fontSmall": "Petit",
    "settings.appearance.fontMedium": "Moyen",
    "settings.appearance.fontLarge": "Grand",
    "settings.appearance.fontFamily": "Style de police arabe",
    "settings.appearance.cairo": "Cairo (Moderne - Par défaut)",
    "settings.appearance.amiri": "Amiri (Classique et savant)",
    "settings.appearance.tajawal": "Tajawal (Fluide et moderne)",
    "settings.appearance.oled": "Noir profond pour écrans OLED",
    "settings.appearance.oledDesc": "Fond noir complet pour économiser la batterie et améliorer la lisibilité",
    "settings.appearance.language": "Langue de l'interface",

    "settings.chat.defaultMode": "Style de réponse islamique par défaut",
    "settings.chat.detailed": "Détaillé avec preuves",
    "settings.chat.detailedDesc": "Vérification des hadiths, preuves et avis des savants",
    "settings.chat.concise": "Bref et rapide",
    "settings.chat.conciseDesc": "Verdict direct avec des points clairs",
    "settings.chat.salawat": "Prière sur le Prophète ﷺ",
    "settings.chat.salawatDesc": "Inclure la prière sur le Messager ﷺ au début des réponses",
    "settings.chat.enterSend": "Envoyer avec la touche Entrée",
    "settings.chat.enterSendDesc": "Envoi direct avec Entrée, nouvelle ligne avec Maj+Entrée",
    "settings.chat.sound": "Son à la fin de la réponse",
    "settings.chat.soundDesc": "Une notification sonore douce lorsque l'assistant termine d'écrire",

    "settings.data.savedChats": "Conversations enregistrées",
    "settings.data.chatCount": "{count} conversations enregistrées",
    "settings.data.export": "Exporter les conversations",
    "settings.data.deleteTitle": "Effacer l'historique",
    "settings.data.deleteDesc": "Supprimer définitivement toutes les questions et conversations précédentes",
    "settings.data.deleteBtn": "Tout effacer",

    "settings.about.title": "Tabsera — Votre assistant islamique numérique",
    "settings.about.version": "Version 2.5",
    "settings.about.desc": "Une plateforme d'IA islamique spécialisée dans les réponses jurisprudentielles et familiales selon la méthodologie d'Ahl al-Sunnah wal-Jama'ah, soutenue par des preuves authentiques.",
    "settings.about.developer": "Développé et conçu par :",
    "settings.about.developerName": "Omar",

    "ios.title": "Installez Tabsera sur votre iPhone 📲",
    "ios.desc": "Appuyez sur le bouton Partager 📤 puis choisissez (Ajouter à l'écran d'accueil)",

    "alert.nameRequired": "Veuillez entrer un nom valide.",
    "alert.nameUpdated": "Votre nom a été mis à jour avec succès ! ✨",
    "alert.nameError": "Une erreur s'est produite lors de la mise à jour du nom : ",
    "alert.noChatsExport": "Aucune conversation à exporter.",
    "alert.deleteConfirm": "⚠️ Êtes-vous sûr de vouloir supprimer définitivement toutes les conversations ? Cette action est irréversible.",
    "alert.deleteSuccess": "Toutes les conversations ont été supprimées avec succès.",
    "alert.renamePrompt": "Entrez un nouveau nom pour la conversation :",
    "alert.loginFileError": "⚠️ Avis de sécurité Google :\n\nGoogle bloque la connexion depuis les fichiers locaux (file:///c:/...).\n\nPour vous connecter, lancez le site via un serveur local (ex : Live Server dans VS Code) ou exécutez :\npython -m http.server 3000\nPuis ouvrez : http://localhost:3000",
    "alert.loginError": "Erreur de connexion : ",

    "misc.newConversation": "Nouvelle conversation",
    "misc.islamicQuery": "Requête islamique",
    "misc.newIslamicChat": "Nouvelle conversation islamique",
    "misc.thankPositive": "Merci pour votre retour positif ! ✨",
    "misc.thankNegative": "Merci pour votre remarque, nous cherchons à nous améliorer !",
    "misc.sharePrefix": "*Depuis l'application Tabsera :*\n\n",

    "export.header": "Conversations et consultations de Tabsera",
    "export.dateLabel": "Date d'exportation :",
    "export.chatLabel": "Conversation",
    "export.user": "Utilisateur",
    "export.assistant": "Assistant Tabsera",
    // IA Islamique
    "settings.tabs.ai": "IA Islamique",
    "settings.ai.title": "Personnalisation de l'IA Islamique",
    "settings.ai.fiqhSchool": "École juridique (Madhhab)",
    "settings.ai.schoolRajih": "Avis prépondérant (Défaut)",
    "settings.ai.schoolHanafi": "École Hanafite",
    "settings.ai.schoolMaliki": "École Malikite",
    "settings.ai.schoolShafii": "École Chaféite",
    "settings.ai.schoolHanbali": "École Hanbalite",
    "settings.ai.schoolComparative": "Comparaison des 4 écoles",
    "settings.ai.personaTitle": "Profondeur et style de réponse",
    "settings.ai.personaScholar": "Chercheur et étudiant en sciences",
    "settings.ai.personaScholarDesc": "Preuves détaillées, Usul al-Fiqh et textes classiques",
    "settings.ai.personaEasy": "Fatwa simplifiée et accessible",
    "settings.ai.personaEasyDesc": "Réponse directe et claire avec étapes pratiques",
    "settings.ai.personaTarbiyah": "Exhortation et purification de l'âme",
    "settings.ai.personaTarbiyahDesc": "Accent sur la foi, la spiritualité et les sagesses",
    "settings.ai.clarifyTitle": "Clarification intelligente des cas",
    "settings.ai.clarifyDesc": "Poser des questions de précision si la règle dépend du contexte",
    "settings.ai.hadithVerifyTitle": "Vérification et gradation des Hadiths",
    "settings.ai.hadithVerifyDesc": "Indiquer la source et l'authenticité (Sahih, Hasan, Da'if)",
    "settings.ai.quranCitationTitle": "Citation des versets et sourates",
    "settings.ai.quranCitationDesc": "Encadrement calligraphique avec nom de sourate et verset",

    // Éléments interactifs
    "chat.stop": "Arrêter la génération",
    "chat.stopped": "Génération arrêtée à votre demande.",
    "hadith.sahih": "Sahih (Authentique)",
    "hadith.hasan": "Hasan (Bon)",
    "hadith.daif": "Da'if (Faible)",
    "hadith.muttafaq": "Unanimement reconnu",
    "hadith.source": "Source",
    "clarify.title": "Options pour préciser votre situation :",

    // Multimodal
    "chat.attachImage": "Joindre une image pour analyse islamique",
    "chat.voiceRecord": "Enregistrer un message vocal",
    "chat.voiceListening": "Écoute en cours... Parlez maintenant",
    "chat.voiceStop": "Arrêter l'enregistrement vocal",
    "chat.voiceNotSupported": "Désolé, votre navigateur ne prend pas en charge la reconnaissance vocale.",
    "chat.voiceError": "Erreur de capture vocale : ",
    "chat.imageTooLarge": "L'image est trop volumineuse (maximum 10 Mo).",
    "chat.readAloud": "Écouter la réponse",
    "chat.stopReading": "Arrêter la lecture",
    "chat.imageAttached": "Image jointe",

},

/* ═══════════════ Türkçe (tr) ═══════════════ */
tr: {
    "app.name": "Tabsera",
    "app.subtitle": "Dijital İslami Asistanınız",

    "sidebar.newChat": "Yeni Sohbet",
    "sidebar.recentChats": "Son Sohbetler",
    "sidebar.noChats": "Henüz sohbet yok",
    "sidebar.visitor": "Ziyaretçi",
    "sidebar.notRegistered": "Giriş yapılmadı",
    "sidebar.login": "Giriş",
    "sidebar.logout": "Çıkış",

    "header.title": "Tabsera Dijital Asistan",
    "header.active": "Çevrimiçi",

    "chat.placeholder": "İslami sorunuzu buraya yazın...",
    "chat.modeDetailed": "Delillerle Detaylı",
    "chat.modeConcise": "Kısa ve Hızlı",
    "chat.send": "Gönder",
    "chat.loading": "İslami cevap düşünülüyor ve hazırlanıyor...",
    "chat.copy": "Kopyala",
    "chat.copied": "Kopyalandı",
    "chat.whatsapp": "WhatsApp",
    "chat.regenerate": "Yeniden Üret",
    "chat.latestMessages": "Son Mesajlar",
    "chat.disclaimer": "Tabsera, güvenilir İslami kaynaklara dayalı danışmanlık sunar. Karmaşık fetvalarda lütfen yetkili âlimlere danışın.",
    "chat.errorConnection": "Üzgünüz, bir bağlantı hatası oluştu: ",
    "chat.editTooltip": "Soruyu düzenle ve yeniden gönder",
    "chat.likeTooltip": "Yararlı ve doğru cevap",
    "chat.dislikeTooltip": "Yanlış cevap",

    "welcome.greeting": "Esselamu Aleyküm ve Rahmetullahi ve Berekâtuh",
    "welcome.subtitle": "Ben Tabsera, dijital İslami asistanınız. Bugün size nasıl yardımcı olabilirim?",
    "welcome.card1Title": "Kabul Edilen Duanın Adabı",
    "welcome.card1Desc": "Kabul edilme ümidi olan zaman ve şartları öğrenin",
    "welcome.card1Prompt": "Duanın adabı ve kabul edilme zamanları nelerdir?",
    "welcome.card2Title": "Sabah ve Akşam Zikirleri",
    "welcome.card2Desc": "Peygamber Sünnetinden koruyucu dualar",
    "welcome.card2Prompt": "Bana sabah zikirlerini tam olarak listele",

    "settings.title": "Tabsera Ayarları",
    "settings.subtitle": "Hesap, görünüm ve sohbet ayarlarını özelleştirin",
    "settings.tabs.account": "Hesap",
    "settings.tabs.appearance": "Görünüm ve Yazı Tipi",
    "settings.tabs.chat": "Sohbet",
    "settings.tabs.data": "Veriler",
    "settings.tabs.about": "Hakkında",

    "settings.account.notRegisteredGoogle": "Google ile giriş yapılmadı",
    "settings.account.editName": "Görünen Adı Düzenle",
    "settings.account.namePlaceholder": "Adınızı girin...",
    "settings.account.saveName": "Adı Kaydet",
    "settings.account.logoutFull": "Hesaptan Çıkış Yap",
    "settings.account.cloudInfo": "Sohbetlerinizi ve danışmanlıklarınızı buluta senkronize etmek için Google ile giriş yapın, herhangi bir cihazdan otomatik erişim sağlayın.",
    "settings.account.registeredUser": "Kayıtlı Kullanıcı",
    "settings.account.settingsTooltip": "Hesap Ayarları",

    "settings.appearance.themeColor": "Tema ve Vurgu Rengi",
    "settings.appearance.emerald": "Zümrüt",
    "settings.appearance.gold": "Altın",
    "settings.appearance.sky": "Gök Mavisi",
    "settings.appearance.purple": "Mor",
    "settings.appearance.rose": "Gül",
    "settings.appearance.fontSize": "Sohbet Yazı Boyutu",
    "settings.appearance.fontSmall": "Küçük",
    "settings.appearance.fontMedium": "Orta",
    "settings.appearance.fontLarge": "Büyük",
    "settings.appearance.fontFamily": "Arapça Yazı Tipi Stili",
    "settings.appearance.cairo": "Cairo (Modern - Varsayılan)",
    "settings.appearance.amiri": "Amiri (Klasik ve Akademik)",
    "settings.appearance.tajawal": "Tajawal (Akıcı ve Modern)",
    "settings.appearance.oled": "OLED Ekranlar İçin Derin Siyah",
    "settings.appearance.oledDesc": "Pil tasarrufu ve okunabilirlik için tam siyah arka plan",
    "settings.appearance.language": "Arayüz Dili",

    "settings.chat.defaultMode": "Varsayılan İslami Cevap Tarzı",
    "settings.chat.detailed": "Delillerle Detaylı",
    "settings.chat.detailedDesc": "Hadis tahriç, deliller ve âlimlerin görüşleri",
    "settings.chat.concise": "Kısa ve Hızlı",
    "settings.chat.conciseDesc": "Net noktalarla doğrudan hüküm",
    "settings.chat.salawat": "Peygamber ﷺ'e Salavat",
    "settings.chat.salawatDesc": "Cevapların başında Rasulullah ﷺ'e salavat eklenmesi",
    "settings.chat.enterSend": "Enter Tuşu ile Gönder",
    "settings.chat.enterSendDesc": "Enter ile doğrudan gönder, yeni satır için Shift+Enter",
    "settings.chat.sound": "Cevap Tamamlandığında Ses",
    "settings.chat.soundDesc": "Asistan yazmayı bitirdiğinde hafif bir bildirim sesi",

    "settings.data.savedChats": "Kayıtlı Sohbetler",
    "settings.data.chatCount": "{count} kayıtlı sohbet",
    "settings.data.export": "Sohbetleri Dışa Aktar",
    "settings.data.deleteTitle": "Sohbet Geçmişini Temizle",
    "settings.data.deleteDesc": "Tüm soru ve önceki sohbetleri kalıcı olarak sil",
    "settings.data.deleteBtn": "Tümünü Temizle",

    "settings.about.title": "Tabsera — Dijital İslami Asistanınız",
    "settings.about.version": "Sürüm 2.5",
    "settings.about.desc": "Ehl-i Sünnet vel-Cemaat metodolojisine göre şer'i, fıkhi ve ailevi rehberlik konusunda uzmanlaşmış, sahih delillerle desteklenen bir İslami yapay zekâ platformu.",
    "settings.about.developer": "Geliştiren ve Tasarlayan:",
    "settings.about.developerName": "Omar",

    "ios.title": "Tabsera'yı iPhone'unuza yükleyin 📲",
    "ios.desc": "Paylaş düğmesine 📤 dokunun, ardından (Ana Ekrana Ekle) seçeneğini seçin",

    "alert.nameRequired": "Lütfen geçerli bir ad girin.",
    "alert.nameUpdated": "Adınız başarıyla güncellendi! ✨",
    "alert.nameError": "Ad güncellenirken bir hata oluştu: ",
    "alert.noChatsExport": "Dışa aktarılacak sohbet yok.",
    "alert.deleteConfirm": "⚠️ Tüm sohbetleri kalıcı olarak silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.",
    "alert.deleteSuccess": "Tüm sohbetler başarıyla temizlendi.",
    "alert.renamePrompt": "Sohbet için yeni bir ad girin:",
    "alert.loginFileError": "⚠️ Google Güvenlik Bildirimi:\n\nGoogle, yerel dosyalardan (file:///c:/...) doğrudan giriş yapmayı engelliyor.\n\nGiriş yapmak için siteyi yerel bir sunucu ile çalıştırın (ör: VS Code'da Live Server) veya şunu çalıştırın:\npython -m http.server 3000\nArdından açın: http://localhost:3000",
    "alert.loginError": "Giriş hatası: ",

    "misc.newConversation": "Yeni Sohbet",
    "misc.islamicQuery": "İslami Soru",
    "misc.newIslamicChat": "Yeni İslami Sohbet",
    "misc.thankPositive": "Olumlu geri bildiriminiz için teşekkürler! ✨",
    "misc.thankNegative": "Geri bildiriminiz için teşekkürler, gelişmeye çalışıyoruz!",
    "misc.sharePrefix": "*Tabsera Uygulamasından:*\n\n",

    "export.header": "Tabsera Dijital Sohbetler ve Danışmanlıklar",
    "export.dateLabel": "Dışa Aktarım Tarihi:",
    "export.chatLabel": "Sohbet",
    "export.user": "Kullanıcı",
    "export.assistant": "Tabsera Asistanı",
    // İslami Yapay Zekâ
    "settings.tabs.ai": "İslami Yapay Zekâ",
    "settings.ai.title": "İslami Yapay Zekâ Özelleştirmesi",
    "settings.ai.fiqhSchool": "Tercih Edilen Fıkıh Mezhebi",
    "settings.ai.schoolRajih": "Delille Tercih Edilen (Varsayılan)",
    "settings.ai.schoolHanafi": "Hanefi Mezhebi",
    "settings.ai.schoolMaliki": "Maliki Mezhebi",
    "settings.ai.schoolShafii": "Şafii Mezhebi",
    "settings.ai.schoolHanbali": "Hanbeli Mezhebi",
    "settings.ai.schoolComparative": "Dört Mezhep Karşılaştırması",
    "settings.ai.personaTitle": "Cevap Derinliği ve Tarzı",
    "settings.ai.personaScholar": "İlim Talebesi ve Araştırmacı",
    "settings.ai.personaScholarDesc": "Detaylı deliller, fıkıh usulü ve klasik kaynaklar",
    "settings.ai.personaEasy": "Kolaylaştırılmış Pratik Fetva",
    "settings.ai.personaEasyDesc": "Açık, anlaşılır ve doğrudan pratik cevap",
    "settings.ai.personaTarbiyah": "Manevi Öğüt ve Nefis Terbiyesi",
    "settings.ai.personaTarbiyahDesc": "İman, kalbi incelikler ve hükümlerin hikmetleri",
    "settings.ai.clarifyTitle": "Şarta Bağlı Durumlarda Akıllı Netleştirme",
    "settings.ai.clarifyDesc": "Hüküm duruma göre değişiyorsa açıklayıcı sorular sor",
    "settings.ai.hadithVerifyTitle": "Hadis Tahrici ve Sıhhat Tespiti",
    "settings.ai.hadithVerifyDesc": "Kaynak ve sıhhat derecesini (Sahih, Hasen, Zayıf) belirt",
    "settings.ai.quranCitationTitle": "Ayet ve Sure Bilgisi Gösterimi",
    "settings.ai.quranCitationDesc": "Ayetleri sure adı ve ayet numarasıyla çerçevele",

    // Etkileşimli öğeler
    "chat.stop": "Üretimi Durdur",
    "chat.stopped": "Üretim isteğiniz üzerine durduruldu.",
    "hadith.sahih": "Sahih",
    "hadith.hasan": "Hasen",
    "hadith.daif": "Zayıf",
    "hadith.muttafaq": "Müttefekun Aleyh",
    "hadith.source": "Tahric",
    "clarify.title": "Durumunuzu netleştirmek için seçenekler:",

    // Multimodal
    "chat.attachImage": "İslami analiz için resim ekle",
    "chat.voiceRecord": "Sesli soru kaydet",
    "chat.voiceListening": "Dinleniyor... Şimdi konuşun",
    "chat.voiceStop": "Ses kaydını durdur",
    "chat.voiceNotSupported": "Üzgünüz, tarayıcınız konuşma tanımayı desteklemiyor.",
    "chat.voiceError": "Ses yakalama hatası: ",
    "chat.imageTooLarge": "Resim çok büyük, lütfen 10 MB'den küçük bir resim seçin.",
    "chat.readAloud": "Cevabı sesli dinle",
    "chat.stopReading": "Sesli okumayı durdur",
    "chat.imageAttached": "Ekli resim",

},

/* ═══════════════ اردو (ur) ═══════════════ */
ur: {
    "app.name": "تبصرہ",
    "app.subtitle": "آپ کا ڈیجیٹل اسلامی معاون",

    "sidebar.newChat": "نئی بات چیت",
    "sidebar.recentChats": "حالیہ بات چیت",
    "sidebar.noChats": "کوئی بات چیت نہیں",
    "sidebar.visitor": "مہمان",
    "sidebar.notRegistered": "سائن ان نہیں ہے",
    "sidebar.login": "سائن ان",
    "sidebar.logout": "سائن آؤٹ",

    "header.title": "تبصرہ ڈیجیٹل معاون",
    "header.active": "آن لائن",

    "chat.placeholder": "اپنا اسلامی سوال یہاں لکھیں...",
    "chat.modeDetailed": "دلائل کے ساتھ تفصیلی",
    "chat.modeConcise": "مختصر اور فوری",
    "chat.send": "بھیجیں",
    "chat.loading": "اسلامی جواب پر غور اور تیاری ہو رہی ہے...",
    "chat.copy": "کاپی",
    "chat.copied": "کاپی ہو گیا",
    "chat.whatsapp": "واٹس ایپ",
    "chat.regenerate": "دوبارہ بنائیں",
    "chat.latestMessages": "تازہ ترین پیغامات",
    "chat.disclaimer": "تبصرہ مستند اسلامی ذرائع کی بنیاد پر مشاورت فراہم کرتا ہے۔ پیچیدہ فتاوی کے لیے مستند علماء سے رجوع کریں۔",
    "chat.errorConnection": "معذرت، کنکشن میں خرابی ہوئی: ",
    "chat.editTooltip": "سوال میں ترمیم کریں اور دوبارہ بھیجیں",
    "chat.likeTooltip": "مفید اور درست جواب",
    "chat.dislikeTooltip": "غلط جواب",

    "welcome.greeting": "السلام علیکم ورحمۃ اللہ وبرکاتہ",
    "welcome.subtitle": "میں تبصرہ ہوں، آپ کا ڈیجیٹل اسلامی معاون۔ آج میں آپ کی کیسے مدد کر سکتا ہوں؟",
    "welcome.card1Title": "قبول دعا کے آداب",
    "welcome.card1Desc": "ان اوقات اور شرائط کو جانیں جن میں قبولیت کی امید ہے",
    "welcome.card1Prompt": "دعا کے آداب اور قبولیت کے بہترین اوقات کیا ہیں؟",
    "welcome.card2Title": "صبح و شام کے اذکار",
    "welcome.card2Desc": "نبوی سنت سے حفاظتی دعائیں",
    "welcome.card2Prompt": "مجھے صبح کے مکمل اذکار بتائیں",

    "settings.title": "تبصرہ کی ترتیبات",
    "settings.subtitle": "اکاؤنٹ، ظاہری شکل اور بات چیت کو اپنی مرضی کے مطابق بنائیں",
    "settings.tabs.account": "اکاؤنٹ",
    "settings.tabs.appearance": "ظاہری شکل اور فونٹ",
    "settings.tabs.chat": "بات چیت",
    "settings.tabs.data": "ڈیٹا",
    "settings.tabs.about": "تبصرہ کے بارے میں",

    "settings.account.notRegisteredGoogle": "گوگل سے سائن ان نہیں ہے",
    "settings.account.editName": "ظاہر ہونے والا نام تبدیل کریں",
    "settings.account.namePlaceholder": "اپنا نام درج کریں...",
    "settings.account.saveName": "نام محفوظ کریں",
    "settings.account.logoutFull": "اکاؤنٹ سے سائن آؤٹ",
    "settings.account.cloudInfo": "اپنی بات چیت اور مشاورت کو کلاؤڈ میں محفوظ کرنے کے لیے گوگل سے سائن ان کریں، کسی بھی ڈیوائس سے خودکار رسائی حاصل کریں۔",
    "settings.account.registeredUser": "رجسٹرڈ صارف",
    "settings.account.settingsTooltip": "اکاؤنٹ کی ترتیبات",

    "settings.appearance.themeColor": "تھیم اور نمایاں رنگ",
    "settings.appearance.emerald": "زمرد",
    "settings.appearance.gold": "سنہری",
    "settings.appearance.sky": "آسمانی",
    "settings.appearance.purple": "بنفشی",
    "settings.appearance.rose": "گلابی",
    "settings.appearance.fontSize": "چیٹ فونٹ سائز",
    "settings.appearance.fontSmall": "چھوٹا",
    "settings.appearance.fontMedium": "درمیانہ",
    "settings.appearance.fontLarge": "بڑا",
    "settings.appearance.fontFamily": "عربی فونٹ کا انداز",
    "settings.appearance.cairo": "قاہرہ (جدید - ڈیفالٹ)",
    "settings.appearance.amiri": "امیری (کلاسیکی اور علمی)",
    "settings.appearance.tajawal": "تجوال (ہموار اور جدید)",
    "settings.appearance.oled": "OLED اسکرینوں کے لیے گہرا سیاہ",
    "settings.appearance.oledDesc": "بیٹری بچانے اور پڑھنے کی سہولت کے لیے مکمل سیاہ پس منظر",
    "settings.appearance.language": "انٹرفیس کی زبان",

    "settings.chat.defaultMode": "ڈیفالٹ اسلامی جواب کا انداز",
    "settings.chat.detailed": "دلائل کے ساتھ تفصیلی",
    "settings.chat.detailedDesc": "حدیث کی تخریج، دلائل اور علماء کی آراء",
    "settings.chat.concise": "مختصر اور فوری",
    "settings.chat.conciseDesc": "واضح نکات کے ساتھ براہ راست حکم",
    "settings.chat.salawat": "نبی ﷺ پر درود",
    "settings.chat.salawatDesc": "جوابات کی ابتدا میں رسول اللہ ﷺ پر درود شامل کریں",
    "settings.chat.enterSend": "Enter کلید سے بھیجیں",
    "settings.chat.enterSendDesc": "Enter سے براہ راست بھیجیں، نئی لائن کے لیے Shift+Enter",
    "settings.chat.sound": "جواب مکمل ہونے پر آواز",
    "settings.chat.soundDesc": "معاون کی تحریر مکمل ہونے پر ہلکی اطلاعی آواز",

    "settings.data.savedChats": "محفوظ شدہ بات چیت",
    "settings.data.chatCount": "{count} محفوظ شدہ بات چیت",
    "settings.data.export": "بات چیت برآمد کریں",
    "settings.data.deleteTitle": "بات چیت کی تاریخ صاف کریں",
    "settings.data.deleteDesc": "تمام سوالات اور پچھلی بات چیت مستقل طور پر حذف کریں",
    "settings.data.deleteBtn": "سب صاف کریں",

    "settings.about.title": "تبصرہ — آپ کا ڈیجیٹل اسلامی معاون",
    "settings.about.version": "ورژن 2.5",
    "settings.about.desc": "اہل سنت والجماعت کے منہج کے مطابق شرعی، فقہی اور خاندانی رہنمائی میں مہارت رکھنے والا اسلامی AI پلیٹ فارم، مستند دلائل اور تخریج احادیث کے ساتھ۔",
    "settings.about.developer": "تیار کردہ اور ڈیزائن:",
    "settings.about.developerName": "عمر",

    "ios.title": "تبصرہ کو اپنے آئی فون پر انسٹال کریں 📲",
    "ios.desc": "شیئر بٹن 📤 دبائیں پھر (ہوم اسکرین میں شامل کریں) منتخب کریں",

    "alert.nameRequired": "براہ کرم ایک درست نام درج کریں۔",
    "alert.nameUpdated": "آپ کا نام کامیابی سے اپ ڈیٹ ہو گیا! ✨",
    "alert.nameError": "نام اپ ڈیٹ کرتے وقت خرابی ہوئی: ",
    "alert.noChatsExport": "برآمد کرنے کے لیے کوئی بات چیت نہیں۔",
    "alert.deleteConfirm": "⚠️ کیا آپ واقعی تمام بات چیت مستقل طور پر حذف کرنا چاہتے ہیں؟ یہ عمل واپس نہیں کیا جا سکتا۔",
    "alert.deleteSuccess": "تمام بات چیت کامیابی سے صاف ہو گئی۔",
    "alert.renamePrompt": "بات چیت کے لیے نیا نام درج کریں:",
    "alert.loginFileError": "⚠️ گوگل سیکیورٹی نوٹس:\n\nگوگل مقامی فائلوں (file:///c:/...) سے براہ راست سائن ان کو روکتا ہے۔\n\nسائن ان کرنے کے لیے، سائٹ کو مقامی سرور کے ذریعے چلائیں (مثلاً VS Code میں Live Server) یا چلائیں:\npython -m http.server 3000\nپھر کھولیں: http://localhost:3000",
    "alert.loginError": "سائن ان میں خرابی: ",

    "misc.newConversation": "نئی بات چیت",
    "misc.islamicQuery": "اسلامی سوال",
    "misc.newIslamicChat": "نئی اسلامی بات چیت",
    "misc.thankPositive": "آپ کے مثبت تاثرات کا شکریہ! ✨",
    "misc.thankNegative": "آپ کے تاثرات کا شکریہ، ہم بہتری کی کوشش کرتے ہیں!",
    "misc.sharePrefix": "*تبصرہ ایپ سے:*\n\n",

    "export.header": "تبصرہ ڈیجیٹل بات چیت اور مشاورت",
    "export.dateLabel": "برآمد کی تاریخ:",
    "export.chatLabel": "بات چیت",
    "export.user": "صارف",
    "export.assistant": "تبصرہ معاون",
    // اسلامی AI
    "settings.tabs.ai": "اسلامی AI",
    "settings.ai.title": "اسلامی مصنوعی ذہانت کی ترتیبات",
    "settings.ai.fiqhSchool": "پسندیدہ فقہی مسلک",
    "settings.ai.schoolRajih": "راجح مع دلیل (پہلے سے طے شدہ)",
    "settings.ai.schoolHanafi": "فقہ حنفی",
    "settings.ai.schoolMaliki": "فقہ مالکی",
    "settings.ai.schoolShafii": "فقہ شافعی",
    "settings.ai.schoolHanbali": "فقہ حنبلی",
    "settings.ai.schoolComparative": "چاروں مذاہب کا تقابلی جائزہ",
    "settings.ai.personaTitle": "جواب کی گہرائی اور انداز",
    "settings.ai.personaScholar": "طالب علم و محقق",
    "settings.ai.personaScholarDesc": "تفصیلی دلائل، اصول فقہ، اور کتب تراث سے حوالے",
    "settings.ai.personaEasy": "آسان اور عام فہم فتویٰ",
    "settings.ai.personaEasyDesc": "سیدھا اور واضح جواب عام مسلمانوں کے لیے",
    "settings.ai.personaTarbiyah": "نصیحت اور تزکیہ نفس",
    "settings.ai.personaTarbiyahDesc": "ایمانیات، روحانی تربیت، اور احکام کی حکمتیں",
    "settings.ai.clarifyTitle": "مشروط مسائل میں ذہین استفسار",
    "settings.ai.clarifyDesc": "اگر مسئلہ حالات پر منحصر ہو تو پہلے وضاحت طلب کرے",
    "settings.ai.hadithVerifyTitle": "احادیث کی تخریج اور صحت کا بیان",
    "settings.ai.hadithVerifyDesc": "حدیث کا ماخذ اور درجہ (صحیح، حسن، ضعیف) لازمی بتائے",
    "settings.ai.quranCitationTitle": "قرآنی آیات و سورتوں کا حوالہ",
    "settings.ai.quranCitationDesc": "آیات کو سورت کے نام اور آیت نمبر کے ساتھ فریم کرے",

    // انٹرایکٹو عناصر
    "chat.stop": "روک دیں",
    "chat.stopped": "آپ کی درخواست پر جواب روک دیا گیا۔",
    "hadith.sahih": "صحیح",
    "hadith.hasan": "حسن",
    "hadith.daif": "ضعیف",
    "hadith.muttafaq": "متفق علیہ",
    "hadith.source": "تخریج",
    "clarify.title": "اپنی حالت کی درست وضاحت کے لیے منتخب کریں:",

    // ملٹی موڈل (Multimodal)
    "chat.attachImage": "شرعی تجزیہ کے لیے تصویر منسلک کریں",
    "chat.voiceRecord": "صوتی پیغام ریکارڈ کریں",
    "chat.voiceListening": "سن رہا ہے... اب بولیں",
    "chat.voiceStop": "صوتی ریکارڈنگ روکیں",
    "chat.voiceNotSupported": "معذرت، آپ کا براؤزر آواز کی شناخت کو سپورٹ نہیں کرتا۔",
    "chat.voiceError": "آواز ریکارڈ کرنے میں خرابی: ",
    "chat.imageTooLarge": "تصویر بہت بڑی ہے، براہ کرم 10MB سے چھوٹی تصویر منتخب کریں۔",
    "chat.readAloud": "جواب سنیں",
    "chat.stopReading": "تلاوت / پڑھنا روکیں",
    "chat.imageAttached": "منسلک تصویر",

},

/* ═══════════════ Bahasa Indonesia (id) ═══════════════ */
id: {
    "app.name": "Tabsera",
    "app.subtitle": "Asisten Islami Digital Anda",

    "sidebar.newChat": "Obrolan Baru",
    "sidebar.recentChats": "Obrolan Terbaru",
    "sidebar.noChats": "Belum ada obrolan",
    "sidebar.visitor": "Tamu",
    "sidebar.notRegistered": "Belum masuk",
    "sidebar.login": "Masuk",
    "sidebar.logout": "Keluar",

    "header.title": "Asisten Digital Tabsera",
    "header.active": "Online",

    "chat.placeholder": "Tulis pertanyaan Islami Anda di sini...",
    "chat.modeDetailed": "Detail dengan Dalil",
    "chat.modeConcise": "Singkat & Cepat",
    "chat.send": "Kirim",
    "chat.loading": "Sedang berpikir dan menyiapkan jawaban Islami...",
    "chat.copy": "Salin",
    "chat.copied": "Disalin",
    "chat.whatsapp": "WhatsApp",
    "chat.regenerate": "Buat Ulang",
    "chat.latestMessages": "Pesan Terbaru",
    "chat.disclaimer": "Tabsera memberikan konsultasi berdasarkan sumber-sumber Islami yang autentik. Mohon verifikasi fatwa kompleks dengan ulama yang berkompeten.",
    "chat.errorConnection": "Maaf, terjadi kesalahan koneksi: ",
    "chat.editTooltip": "Edit dan kirim ulang pertanyaan",
    "chat.likeTooltip": "Jawaban bermanfaat dan akurat",
    "chat.dislikeTooltip": "Jawaban tidak akurat",

    "welcome.greeting": "Assalamu'alaikum Warahmatullahi Wabarakatuh",
    "welcome.subtitle": "Saya Tabsera, asisten Islami digital Anda. Bagaimana saya bisa membantu Anda hari ini?",
    "welcome.card1Title": "Adab Doa yang Mustajab",
    "welcome.card1Desc": "Pelajari waktu dan syarat ketika doa paling mungkin dikabulkan",
    "welcome.card1Prompt": "Apa saja adab dan waktu terbaik untuk berdoa?",
    "welcome.card2Title": "Dzikir Pagi & Petang",
    "welcome.card2Desc": "Doa-doa pelindung dari Sunnah Nabi",
    "welcome.card2Prompt": "Sebutkan dzikir pagi yang lengkap",

    "settings.title": "Pengaturan Tabsera",
    "settings.subtitle": "Sesuaikan akun, tampilan, dan percakapan",
    "settings.tabs.account": "Akun",
    "settings.tabs.appearance": "Tampilan & Font",
    "settings.tabs.chat": "Percakapan",
    "settings.tabs.data": "Data",
    "settings.tabs.about": "Tentang",

    "settings.account.notRegisteredGoogle": "Belum masuk dengan Google",
    "settings.account.editName": "Edit Nama Tampilan",
    "settings.account.namePlaceholder": "Masukkan nama Anda...",
    "settings.account.saveName": "Simpan Nama",
    "settings.account.logoutFull": "Keluar dari Akun",
    "settings.account.cloudInfo": "Masuk dengan Google untuk menyinkronkan percakapan dan konsultasi Anda ke cloud, dapat diakses dari perangkat apa pun secara otomatis.",
    "settings.account.registeredUser": "Pengguna Terdaftar",
    "settings.account.settingsTooltip": "Pengaturan Akun",

    "settings.appearance.themeColor": "Warna Tema & Aksen",
    "settings.appearance.emerald": "Zamrud",
    "settings.appearance.gold": "Emas",
    "settings.appearance.sky": "Langit",
    "settings.appearance.purple": "Ungu",
    "settings.appearance.rose": "Mawar",
    "settings.appearance.fontSize": "Ukuran Font Obrolan",
    "settings.appearance.fontSmall": "Kecil",
    "settings.appearance.fontMedium": "Sedang",
    "settings.appearance.fontLarge": "Besar",
    "settings.appearance.fontFamily": "Gaya Font Arab",
    "settings.appearance.cairo": "Cairo (Modern - Default)",
    "settings.appearance.amiri": "Amiri (Klasik & Ilmiah)",
    "settings.appearance.tajawal": "Tajawal (Halus & Modern)",
    "settings.appearance.oled": "Hitam Pekat untuk Layar OLED",
    "settings.appearance.oledDesc": "Latar belakang hitam penuh untuk menghemat baterai dan meningkatkan keterbacaan",
    "settings.appearance.language": "Bahasa Antarmuka",

    "settings.chat.defaultMode": "Gaya Jawaban Islami Default",
    "settings.chat.detailed": "Detail dengan Dalil",
    "settings.chat.detailedDesc": "Takhrij hadits, dalil, dan pendapat ulama",
    "settings.chat.concise": "Singkat & Cepat",
    "settings.chat.conciseDesc": "Hukum langsung dengan poin-poin jelas",
    "settings.chat.salawat": "Shalawat atas Nabi ﷺ",
    "settings.chat.salawatDesc": "Menyertakan shalawat atas Rasulullah ﷺ di awal jawaban",
    "settings.chat.enterSend": "Kirim dengan Tombol Enter",
    "settings.chat.enterSendDesc": "Kirim langsung dengan Enter, baris baru dengan Shift+Enter",
    "settings.chat.sound": "Suara saat Jawaban Selesai",
    "settings.chat.soundDesc": "Suara notifikasi lembut saat asisten selesai mengetik",

    "settings.data.savedChats": "Percakapan Tersimpan",
    "settings.data.chatCount": "{count} percakapan tersimpan",
    "settings.data.export": "Ekspor Percakapan",
    "settings.data.deleteTitle": "Hapus Riwayat Obrolan",
    "settings.data.deleteDesc": "Hapus semua pertanyaan dan percakapan sebelumnya secara permanen",
    "settings.data.deleteBtn": "Hapus Semua",

    "settings.about.title": "Tabsera — Asisten Islami Digital Anda",
    "settings.about.version": "Versi 2.5",
    "settings.about.desc": "Platform AI Islami yang mengkhususkan diri dalam bimbingan syar'i, fikih, dan keluarga mengikuti metodologi Ahlus Sunnah wal Jama'ah, didukung oleh dalil-dalil autentik dan verifikasi hadits.",
    "settings.about.developer": "Dikembangkan & Didesain oleh:",
    "settings.about.developerName": "Omar",

    "ios.title": "Instal Tabsera di iPhone Anda 📲",
    "ios.desc": "Ketuk tombol Bagikan 📤 lalu pilih (Tambah ke Layar Utama)",

    "alert.nameRequired": "Silakan masukkan nama yang valid.",
    "alert.nameUpdated": "Nama Anda berhasil diperbarui! ✨",
    "alert.nameError": "Terjadi kesalahan saat memperbarui nama: ",
    "alert.noChatsExport": "Tidak ada percakapan untuk diekspor.",
    "alert.deleteConfirm": "⚠️ Apakah Anda yakin ingin menghapus semua percakapan secara permanen? Tindakan ini tidak dapat dibatalkan.",
    "alert.deleteSuccess": "Semua percakapan berhasil dihapus.",
    "alert.renamePrompt": "Masukkan nama baru untuk percakapan:",
    "alert.loginFileError": "⚠️ Pemberitahuan Keamanan Google:\n\nGoogle memblokir login langsung dari file lokal (file:///c:/...).\n\nUntuk masuk, jalankan situs melalui server lokal (mis: Live Server di VS Code) atau jalankan:\npython -m http.server 3000\nLalu buka: http://localhost:3000",
    "alert.loginError": "Kesalahan masuk: ",

    "misc.newConversation": "Percakapan Baru",
    "misc.islamicQuery": "Pertanyaan Islami",
    "misc.newIslamicChat": "Percakapan Islami Baru",
    "misc.thankPositive": "Terima kasih atas umpan balik positif Anda! ✨",
    "misc.thankNegative": "Terima kasih atas umpan balik Anda, kami berusaha untuk lebih baik!",
    "misc.sharePrefix": "*Dari Aplikasi Tabsera:*\n\n",

    "export.header": "Percakapan & Konsultasi Digital Tabsera",
    "export.dateLabel": "Tanggal Ekspor:",
    "export.chatLabel": "Percakapan",
    "export.user": "Pengguna",
    "export.assistant": "Asisten Tabsera",
    // AI Islami
    "settings.tabs.ai": "AI Islami",
    "settings.ai.title": "Kustomisasi AI Islami",
    "settings.ai.fiqhSchool": "Madzhab Fikih Pilihan",
    "settings.ai.schoolRajih": "Pendapat Rajih (Default)",
    "settings.ai.schoolHanafi": "Madzhab Hanafi",
    "settings.ai.schoolMaliki": "Madzhab Maliki",
    "settings.ai.schoolShafii": "Madzhab Syafi'i",
    "settings.ai.schoolHanbali": "Madzhab Hanbali",
    "settings.ai.schoolComparative": "Perbandingan Empat Madzhab",
    "settings.ai.personaTitle": "Kedalaman Jawaban & Gaya Asisten",
    "settings.ai.personaScholar": "Penuntut Ilmu & Peneliti",
    "settings.ai.personaScholarDesc": "Dalil terperinci, Ushul Fiqh, dan pandangan ulama klasik",
    "settings.ai.personaEasy": "Fatwa Praktis & Mudah",
    "settings.ai.personaEasyDesc": "Jawaban langsung dan jelas dengan langkah praktis",
    "settings.ai.personaTarbiyah": "Nasihat & Penyucian Jiwa",
    "settings.ai.personaTarbiyahDesc": "Fokus pada keimanan, tazkiyatun nufus, dan hikmah hukum",
    "settings.ai.clarifyTitle": "Klarifikasi Cerdas Kasus Bersyarat",
    "settings.ai.clarifyDesc": "Tanyakan detail jika hukum bergantung pada kondisi penanya",
    "settings.ai.hadithVerifyTitle": "Takhrij & Tingkat Keotentikan Hadits",
    "settings.ai.hadithVerifyDesc": "Wajib mencantumkan sumber dan derajat (Shahih, Hasan, Dha'if)",
    "settings.ai.quranCitationTitle": "Kutipan Ayat & Surat Al-Qur'an",
    "settings.ai.quranCitationDesc": "Bingkai ayat Al-Qur'an dengan nama surat dan nomor ayat",

    // Elemen Interaktif
    "chat.stop": "Hentikan Jawaban",
    "chat.stopped": "Pembuatan jawaban dihentikan sesuai permintaan Anda.",
    "hadith.sahih": "Shahih",
    "hadith.hasan": "Hasan",
    "hadith.daif": "Dha'if",
    "hadith.muttafaq": "Muttafaq 'Alaih",
    "hadith.source": "Takhrij",
    "clarify.title": "Pilihan untuk memperjelas kondisi Anda:",

    // Multimodal
    "chat.attachImage": "Lampirkan gambar untuk analisis syar'i",
    "chat.voiceRecord": "Rekam pesan suara",
    "chat.voiceListening": "Mendengarkan... Bicaralah sekarang",
    "chat.voiceStop": "Hentikan rekaman suara",
    "chat.voiceNotSupported": "Maaf, browser Anda tidak mendukung Pengenalan Suara.",
    "chat.voiceError": "Kesalahan perekaman suara: ",
    "chat.imageTooLarge": "Gambar terlalu besar, silakan pilih gambar di bawah 10MB.",
    "chat.readAloud": "Dengarkan jawaban",
    "chat.stopReading": "Hentikan pembacaan",
    "chat.imageAttached": "Gambar terlampir",

},

}; // نهاية قاموس الترجمات

/* ---------- دوال الترجمة ---------- */

/**
 * الحصول على اللغة الحالية المحفوظة
 */
function getCurrentLang() {
    return localStorage.getItem(I18N_STORAGE_KEY) || 'ar';
}

/**
 * جلب نص مترجم حسب المفتاح واللغة الحالية
 * @param {string} key - مفتاح الترجمة (مثل "chat.send")
 * @param {object} [params] - قيم بديلة (مثل {count: 5})
 * @returns {string}
 */
function t(key, params) {
    const lang = getCurrentLang();
    let text = (translations[lang] && translations[lang][key])
        || (translations['ar'] && translations['ar'][key])
        || key;

    // استبدال المتغيرات مثل {count}
    if (params) {
        Object.keys(params).forEach(p => {
            text = text.replace(`{${p}}`, params[p]);
        });
    }
    return text;
}

/**
 * تطبيق الترجمات على جميع العناصر ذات data-i18n
 */
function applyTranslations() {
    // ترجمة النصوص
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (key) el.textContent = t(key);
    });

    // ترجمة placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        if (key) el.placeholder = t(key);
    });

    // ترجمة titles (tooltips)
    document.querySelectorAll('[data-i18n-title]').forEach(el => {
        const key = el.getAttribute('data-i18n-title');
        if (key) el.title = t(key);
    });
}

/**
 * تعيين لغة التطبيق
 * @param {string} langCode - كود اللغة (ar, en, fr, tr, ur, id)
 */
function setAppLanguage(langCode) {
    if (!translations[langCode]) return;

    localStorage.setItem(I18N_STORAGE_KEY, langCode);

    // تحديث اتجاه الصفحة
    const dir = RTL_LANGUAGES.includes(langCode) ? 'rtl' : 'ltr';
    document.documentElement.setAttribute('lang', langCode);
    document.documentElement.setAttribute('dir', dir);

    // إغلاق نافذة الإعدادات فوراً لمنع تجمّد طبقة البلور عند تغيير الاتجاه
    if (typeof window.closeAccountModal === 'function') {
        window.closeAccountModal();
    }

    // إعادة ضبط حالة السايدبار بعد تغيير الاتجاه لمنع تعليقه
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    if (sidebar) {
        if (dir === 'ltr') {
            sidebar.classList.remove('translate-x-full');
            sidebar.classList.remove('sidebar-open');
        } else {
            sidebar.classList.add('translate-x-full');
            sidebar.classList.remove('sidebar-open');
        }
    }
    if (overlay) overlay.classList.add('hidden');

    // تطبيق الترجمات الثابتة
    applyTranslations();

    // تحديث أزرار اللغة في الإعدادات
    updateLanguageButtons(langCode);

    // تحديث عنوان الصفحة
    document.title = t('settings.about.title');

    // إعادة رسم الأيقونات بعد ترجمة الصفحة
    if (window.lucide) lucide.createIcons();

    // إعادة رسم المحتوى الديناميكي إذا كانت الدوال متاحة
    if (typeof window.refreshDynamicContent === 'function') {
        window.refreshDynamicContent();
    }
}

/**
 * تحديث أزرار اختيار اللغة (تمييز الزر النشط)
 */
function updateLanguageButtons(activeLang) {
    SUPPORTED_LANGUAGES.forEach(lang => {
        const btn = document.getElementById(`btn-lang-${lang.code}`);
        if (!btn) return;
        if (lang.code === activeLang) {
            btn.className = 'lang-opt py-2 px-2 rounded-xl border border-emerald-500/40 bg-emerald-600/20 text-emerald-300 text-[11px] font-bold flex flex-col items-center gap-1 transition shadow-sm';
        } else {
            btn.className = 'lang-opt py-2 px-2 rounded-xl border border-slate-800 bg-slate-950 text-slate-400 text-[11px] font-medium flex flex-col items-center gap-1 transition hover:border-slate-700';
        }
    });
}

/**
 * تهيئة اللغة عند تحميل الصفحة
 */
function initLanguage() {
    const lang = getCurrentLang();
    const dir = RTL_LANGUAGES.includes(lang) ? 'rtl' : 'ltr';
    document.documentElement.setAttribute('lang', lang);
    document.documentElement.setAttribute('dir', dir);
    applyTranslations();
    updateLanguageButtons(lang);
}

// تصدير الدوال للاستخدام في bot.js
window.t = t;
window.getCurrentLang = getCurrentLang;
window.setAppLanguage = setAppLanguage;
window.applyTranslations = applyTranslations;
window.initLanguage = initLanguage;
window.updateLanguageButtons = updateLanguageButtons;
window.SUPPORTED_LANGUAGES = SUPPORTED_LANGUAGES;
window.RTL_LANGUAGES = RTL_LANGUAGES;

