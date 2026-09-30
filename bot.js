/* ==========================================================================
   🌙 مساعد تبصرة الرقمي - السكربت الموحد (bot.js)
   تطوير وتصميم: عمر
   ========================================================================== */

const firebaseConfig = {
    apiKey: "AIzaSyBtBRNXE0El8yajD4KmrKHlD8-3lYG7rJc",
    authDomain: "islamic-bot-omar.firebaseapp.com",
    projectId: "islamic-bot-omar",
    storageBucket: "islamic-bot-omar.firebasestorage.app",
    messagingSenderId: "1026416229910",
    appId: "1:1026416229910:web:e18f26fe9fc3703a43bf37",
    measurementId: "G-B2SYM1YPGE"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// تفعيل حفظ البيانات محلياً للمزامنة بين التبويبات وتسريع التحميل
try {
    db.enablePersistence({ synchronizeTabs: true }).catch(() => { });
} catch (e) { }

const WORKER_URL = "https://zad-bot-proxy.almohanadgamer.workers.dev";

const SYSTEM_INSTRUCTION = `أنت 'تبصرة' - رفيق ومساعد وباحث شرعي وفكري رقمي فائق الذكاء، طُوّرت وصُممت من قِبَل (عمر).

طبيعتك وأسلوبك الحواري (Conversational & Engaging like ChatGPT & Gemini):
- أنت لست مجرد آلة لإلقاء الفتاوى الجاهزة أو سرد نصوص مسبقة، بل أنت (محاور ذكي، ناصح، عميق التفكير، متفاعل ومرن).
- تناقش، تحاور، وتتبادل الأفكار مع المستخدم بكل أريحية وسلاسة، وتستمع لوجهات نظره وأسئلته الاستفسارية أو التعقيبية.
- أسلوبك طبيعي وعفوي كأخ حكيم وصديق ناصح، يجمع بين الرزانة الشرعية واللطف الإنساني، بعيداً عن الجمود والجفاف والردود المبتورة.
- عندما يطرح المستخدم مسألة أو استفساراً، لا تختم كلامك بجدار مسدود؛ بل اختم ردك بلباقة بفتح أفق لمواصلة الحديث (مثلاً: سؤال استيضاحي، أو اقتراح زاوية أخرى للنقاش، أو توضيح نقطة مرتبطة بالمسألة).
- إذا ناقشك المستخدم في فكرة، أو طلب توضيح شبهة، أو استفسر عن سبب حكم معين، ناقشه بمقارعة الحجة بالحجة، واستخدم المنطق العقلي السليم المعضد بالدليل الشرعي من الكتاب والسنة ومقاصد الشريعة الإسلامية.
- تستوعب كامل سياق الحوار السابق بدقة؛ وتدرك تتابع الأسئلة وما أشار إليه المستخدم في رسائله السابقة دون أن تفقد خيط النقاش.

مجال عملك وتخصصك الأساسي:
- مجالك هو كل ما يهم المسلم في دينه ودنياه من منظور إسلامي: (الفقه وأحكام العبادات والمعاملات، تفسير القرآن الكريم، علوم الحديث والتخريج، العقيدة، الاستشارات الأسرية والنفسية والأخلاقية، مقاصد الشريعة، والرد على التساؤلات الفكرية).
- في الأحكام الشرعية: تحرَّ الدليل الصحيح وانسب الأقوال لأئمة أهل السنة المعتبرين باعتدال وتجرد، مع توضيح حكمة التشريع وأثره في حياة المسلم.
- إذا سألك المستخدم من أنت أو من طورك وصنعك: أجب باعتزاز بأنك مساعد تبصرة، ومطورك وصانعك هو (عمر).`;


let currentUser = null;
let currentChatId = localStorage.getItem('tabsirah_current_chat_id') || Date.now();
let currentChatHistory = JSON.parse(localStorage.getItem('tabsirah_current_active_chat')) || [];
let archivedChats = [];
let answerMode = localStorage.getItem('tabsirah_mode') || 'detailed';

// 🧠 إعدادات وتخصيصات الذكاء الاصطناعي الشرعي
let activeAbortController = null;
let currentFiqhSchool = localStorage.getItem('tabsirah_fiqh_school') || 'rajih';
let currentAiPersona = localStorage.getItem('tabsirah_ai_persona') || 'easy';
let clarifyEnabled = localStorage.getItem('tabsirah_clarify_enabled') !== 'false';
let hadithVerifyEnabled = localStorage.getItem('tabsirah_hadith_verify_enabled') !== 'false';
let quranCitationEnabled = localStorage.getItem('tabsirah_quran_citation_enabled') !== 'false';

window.setFiqhSchool = function (school) {
    currentFiqhSchool = school;
    localStorage.setItem('tabsirah_fiqh_school', school);
    window.applyStoredSettingsToUI();
};

window.setAiPersona = function (persona) {
    currentAiPersona = persona;
    localStorage.setItem('tabsirah_ai_persona', persona);
    window.applyStoredSettingsToUI();
};

window.toggleClarify = function (enabled) {
    clarifyEnabled = enabled;
    localStorage.setItem('tabsirah_clarify_enabled', enabled ? 'true' : 'false');
};

window.toggleHadithVerify = function (enabled) {
    hadithVerifyEnabled = enabled;
    localStorage.setItem('tabsirah_hadith_verify_enabled', enabled ? 'true' : 'false');
};

window.toggleQuranCitation = function (enabled) {
    quranCitationEnabled = enabled;
    localStorage.setItem('tabsirah_quran_citation_enabled', enabled ? 'true' : 'false');
};

// 🌟 دالة بناء System Prompt الديناميكي التكيفي
function buildSystemPrompt() {
    const lang = typeof window.getCurrentLang === 'function' ? window.getCurrentLang() : 'ar';
    let base = SYSTEM_INSTRUCTION;

    // المذهب الفقهي المعتمد
    const fiqhDirectives = {
        rajih: "المعتمد في الفتوى والأحكام: بيان القول الراجح بالدليل من الكتاب والسنة وأقوال جمهور فقهاء أهل السنة والجماعة، دون تعصب لمذهب معين، مع الإشارة لاختلاف العلماء بأدب وتجرد.",
        hanafi: "المعتمد في الفتوى والأحكام: الالتزام بمذهب الإمام أبي حنيفة النعمان رحمه الله وأصحابه (أبو يوسف ومحمد بن الحسن)، وبيان المعتمد والراجح في المذهب الحنفي.",
        maliki: "المعتمد في الفتوى والأحكام: الالتزام بمذهب إمام دار الهجرة مالك بن أنس رحمه الله وأهل المدينة، وبيان المعتمد والمشهور في المذهب المالكي (مثل ما في خليل والرسالة).",
        shafii: "المعتمد في الفتوى والأحكام: الالتزام بمذهب الإمام الشافعي رحمه الله (المذهب الجديد المعتمد عند أئمة الشافعية كالنووي والرافعي).",
        hanbali: "المعتمد في الفتوى والأحكام: الالتزام بمذهب الإمام أحمد بن حنبل رحمه الله، وفق المعتمد والمحرر عند فقهاء الحنابلة (كالبهوتي وابن قدامة).",
        comparative: "المنهج المطلوب: مقارنة المذاهب الفقهية الأربعة المتبوعة (الحنفي، المالكي، الشافعي، الحنبلي) في كل مسألة خلافية، وذكر قول كل مذهب ودليله باختصار وتلخيص جميل ومنصف ثم بيان الراجح بالدليل."
    };
    base += "\n\n[المذهب الفقهي المعتمد]:\n" + (fiqhDirectives[currentFiqhSchool] || fiqhDirectives.rajih);

    // نمط وعمق المساعد
    const personaDirectives = {
        scholar: "الأسلوب والعمق: باحث شرعي ومحقق متعمق. توسع في ذكر الأدلة ووجوه الدلالة وأقوال أئمة السلف وكتب التراث، وخرّج الأدلة واذكر القواعد الأصولية والفقهية المناسبة للمسألة.",
        easy: "الأسلوب والعمق: فتوى ميسرة للمسلم المعاصر. اجعل الإجابة مباشرة، مبسطة، بلغة رصينة ومفهومة وعملية، وتجنب الإغراق في المصطلحات الأصولية الصعبة، وقدّم الحكم والعمل المطلوب بوضوح.",
        tarbiyah: "الأسلوب والعمق: واعظ ناصح ومربٍّ حكيم. ركز على تزكية النفس، والرقائق، وأثر العبادة على القلب، ومقاصد الشريعة، والحكمة الربانية من التشريع إلى جانب الحكم الفقهي."
    };
    base += "\n\n[نمط الطرح وعمق الإجابة]:\n" + (personaDirectives[currentAiPersona] || personaDirectives.easy);

    // قاعدة الاستيضاح الذكي
    if (clarifyEnabled) {
        base += `\n\n[مهم جداً - الاستيضاح الذكي في المسائل المشروطة]:
إذا سألك المستخدم عن مسألة فقهية أو استشارة تتوقف فتواها على تفاصيل وحال السائل (مثل: نسيان أو شك في الصلاة، مسائل الطهارة والوضوء، الطلاق والأيمان والنذور، المعاملات المالية والشروط، صيام المريض والمسافر):
1. اطرح سؤالاً استيضاحياً ذكياً لتستبين حالته وظروفه المؤثرة في الحكم.
2. ضع في نهاية إجابتك خيارات سريعة تفاعلية محددة للحالات المحتملة، بهذا التنسيق الحرفي حصراً:
[خيار: نص الحالة الأولى]
[خيار: نص الحالة الثانية]
[خيار: نص الحالة الثالثة]
لكي يضغط المستخدم على خياره فوراً وتكمل له الفتوى بدقة.`;
    }

    // قاعدة تحقيق وتخريج الأحاديث
    if (hadithVerifyEnabled) {
        base += `\n\n[قاعدة التحقق وتخريج الأحاديث النبوية]:
في أي حديث شريف تستشهد به، يجب عليك تحرّي الصحة والتخريج الدقيق وتنسيقه كالتالي:
📜 «نص الحديث الشريف»
التخريج: [اسم الكتاب أو المخرج: رواه البخاري / مسلم / الترمذي...] | الدرجة: [صحيح / حسن / ضعيف / متفق عليه]`;
    }

    // قاعدة الآيات القرآنية
    if (quranCitationEnabled) {
        base += `\n\n[تنسيق الآيات القرآنية]:
اكتب الآيات القرآنية بأقواس المصحف مع عزوها باسم السورة ورقم الآية:
﴿نص الآية الكريمة﴾ [سورة اسم السورة: رقم الآية]`;
    }

    // توجيه اللغة
    if (lang !== 'ar') {
        const langNames = { en: 'English', fr: 'French', tr: 'Turkish', ur: 'Urdu', id: 'Indonesian' };
        const langName = langNames[lang] || 'English';
        base += `\n\n[Language Directive]: Please provide your answer primarily in ${langName}. Preserve sacred Islamic phrases with accurate translations and context.`;
    }

    return base;
}

// 🎙️ & 🖼️ حالة الوسائط المتعددة (Multimodal State)
let currentSelectedImage = null; // { dataUrl: string, name: string, size: string }
let voiceRecognition = null;
let isVoiceRecording = false;
let currentSpeakingMsgId = null;

// دالة تفريغ الصورة المحددة
window.clearSelectedImage = function () {
    currentSelectedImage = null;
    const previewContainer = document.getElementById('image-preview-container');
    const previewImg = document.getElementById('image-preview-img');
    const fileInput = document.getElementById('image-file-input');
    if (previewContainer) previewContainer.classList.add('hidden');
    if (previewImg) previewImg.src = '';
    if (fileInput) fileInput.value = '';
};

// دالة تحديد ومعالجة الصورة المختارة من المستخدم
window.handleImageSelect = function (file) {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
        alert(typeof t === 'function' ? t('chat.imageTooLarge') : 'يرجى اختيار ملف صورة صالح.');
        return;
    }
    // حد أقصى 10 ميجابايت
    if (file.size > 10 * 1024 * 1024) {
        alert(typeof t === 'function' ? t('chat.imageTooLarge') : 'حجم الصورة كبير جداً، يرجى اختيار صورة أصغر من 10 ميجابايت.');
        return;
    }

    const reader = new FileReader();
    reader.onload = function (e) {
        const dataUrl = e.target.result;
        currentSelectedImage = {
            dataUrl: dataUrl,
            name: file.name,
            size: (file.size / 1024).toFixed(1) + ' KB'
        };

        const previewContainer = document.getElementById('image-preview-container');
        const previewImg = document.getElementById('image-preview-img');
        const previewName = document.getElementById('image-preview-name');
        const previewSize = document.getElementById('image-preview-size');

        if (previewImg) previewImg.src = dataUrl;
        if (previewName) previewName.textContent = file.name;
        if (previewSize) previewSize.textContent = (typeof t === 'function' ? t('chat.imageAttached') : 'صورة مرفقة') + ` (${currentSelectedImage.size})`;
        if (previewContainer) previewContainer.classList.remove('hidden');
        if (window.lucide) lucide.createIcons();

        const chatInput = document.getElementById('chat-input');
        if (chatInput) chatInput.focus();
    };
    reader.readAsDataURL(file);
};

// 🎙️ دوال تحويل الصوت إلى نص (Speech-to-Text)
window.initVoiceRecognition = function () {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return null;

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = true;

    // مطابقة لغة التعرف الصوتي مع لغة التطبيق الحالية
    const currentLang = typeof window.getCurrentLang === 'function' ? window.getCurrentLang() : 'ar';
    const langMap = {
        ar: 'ar-SA',
        en: 'en-US',
        fr: 'fr-FR',
        tr: 'tr-TR',
        ur: 'ur-PK',
        id: 'id-ID'
    };
    recognition.lang = langMap[currentLang] || 'ar-SA';

    recognition.onstart = function () {
        isVoiceRecording = true;
        const voiceBtn = document.getElementById('voice-record-btn');
        const statusBox = document.getElementById('voice-recording-status');
        if (voiceBtn) {
            voiceBtn.classList.add('recording-active');
            voiceBtn.classList.remove('text-slate-400');
        }
        if (statusBox) statusBox.classList.remove('hidden');
        if (window.lucide) lucide.createIcons();
    };

    recognition.onresult = function (event) {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
            transcript += event.results[i][0].transcript;
        }
        const chatInput = document.getElementById('chat-input');
        if (chatInput && transcript) {
            chatInput.value = transcript;
            chatInput.style.height = 'auto';
            chatInput.style.height = (chatInput.scrollHeight) + 'px';
        }
    };

    recognition.onerror = function (event) {
        console.warn("Speech recognition error:", event.error);
        if (event.error !== 'no-speech') {
            const errMsg = typeof t === 'function' ? t('chat.voiceError') : 'حدث خطأ في التقاط الصوت: ';
            alert(errMsg + event.error);
        }
        window.stopVoiceRecording();
    };

    recognition.onend = function () {
        window.stopVoiceRecording();
    };

    return recognition;
};

window.toggleVoiceRecording = function () {
    if (isVoiceRecording) {
        window.stopVoiceRecording();
    } else {
        window.startVoiceRecording();
    }
};

window.startVoiceRecording = function () {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
        alert(typeof t === 'function' ? t('chat.voiceNotSupported') : 'عذراً، متصفحك لا يدعم التعرف على الصوت.');
        return;
    }
    try {
        if (voiceRecognition) {
            voiceRecognition.abort();
        }
        voiceRecognition = window.initVoiceRecognition();
        voiceRecognition.start();
    } catch (e) {
        console.error("Failed to start speech recognition:", e);
        window.stopVoiceRecording();
    }
};

window.stopVoiceRecording = function () {
    isVoiceRecording = false;
    if (voiceRecognition) {
        try { voiceRecognition.stop(); } catch (e) { }
    }
    const voiceBtn = document.getElementById('voice-record-btn');
    const statusBox = document.getElementById('voice-recording-status');
    if (voiceBtn) {
        voiceBtn.classList.remove('recording-active');
        voiceBtn.classList.add('text-slate-400');
    }
    if (statusBox) statusBox.classList.add('hidden');
    if (window.lucide) lucide.createIcons();
};

// 🔊 دوال قراءة الرد صوتياً باللغة العربية الفصحى بصوت رجالي طبيعي متقن
let globalAudioElement = null;

window.speakMessageText = function (msgId, btn) {
    // 1. إذا كان الصوت يعمل بالفعل لنفس الرسالة -> إيقاف
    if (currentSpeakingMsgId === msgId) {
        if (globalAudioElement) {
            globalAudioElement.pause();
            globalAudioElement = null;
        }
        if (window.speechSynthesis) window.speechSynthesis.cancel();
        window.resetTTSButtons();
        currentSpeakingMsgId = null;
        return;
    }

    // إيقاف أي قراءة صوتية سابقة
    if (globalAudioElement) {
        globalAudioElement.pause();
        globalAudioElement = null;
    }
    if (window.speechSynthesis) window.speechSynthesis.cancel();
    window.resetTTSButtons();

    const msgEl = document.getElementById(msgId);
    let rawText = '';
    if (msgEl) {
        rawText = msgEl.getAttribute('data-raw-text') || '';
        if (!rawText) {
            const proseEl = msgEl.querySelector('.prose-chat');
            if (proseEl) rawText = proseEl.innerText || proseEl.textContent || '';
        }
    }
    if (!rawText) return;

    // تنظيف النصوص وعلامات الترقيم والرموز الخاصة
    let textToSpeak = rawText
        .replace(/\[خيار:\s*.*?\]/g, '')
        .replace(/\[.*?\]\(.*?\)/g, '')
        .replace(/```[\s\S]*?```/g, '')
        .replace(/`([^`]+)`/g, '$1')
        .replace(/[*#_~]/g, '')
        .replace(/[📜«»﴿﴾]/g, ' ')
        .replace(/<[^>]*>/g, '')
        .trim();

    if (!textToSpeak) return;

    currentSpeakingMsgId = msgId;
    if (btn) {
        btn.innerHTML = `<i data-lucide="square" class="w-3.5 h-3.5 fill-current"></i> <span>إيقاف</span>`;
        btn.classList.add('speaking-active', 'text-emerald-400');
        if (window.lucide) lucide.createIcons();
    }

    // دالة التراجع لاستخدام Web Speech Synthesis كخيار بديل في حال تعذر الصوت السحابي
    const fallbackToBrowserTTS = () => {
        if (!('speechSynthesis' in window)) {
            window.resetTTSButtons();
            currentSpeakingMsgId = null;
            return;
        }
        const utterance = new SpeechSynthesisUtterance(textToSpeak);
        utterance.lang = 'ar-SA';
        utterance.rate = 0.90;
        utterance.pitch = 0.80; // نبرة صوت رجالية عميقة

        const voices = window.speechSynthesis.getVoices();
        // تفضيل الأصوات الرجالية العربية الواضحة في المتصفح
        const maleVoice = voices.find(v => {
            const n = (v.name || '').toLowerCase();
            const l = (v.lang || '').toLowerCase();
            return (l.startsWith('ar') || n.includes('arabic')) && 
                   (n.includes('maged') || n.includes('naayf') || n.includes('shakir') || n.includes('tariq') || n.includes('male') || n.includes('hamed') || n.includes('david'));
        }) || voices.find(v => (v.lang || '').toLowerCase().startsWith('ar'));

        if (maleVoice) {
            utterance.voice = maleVoice;
            utterance.lang = maleVoice.lang;
        }

        utterance.onend = () => {
            window.resetTTSButtons();
            currentSpeakingMsgId = null;
        };
        utterance.onerror = () => {
            window.resetTTSButtons();
            currentSpeakingMsgId = null;
        };
        window.speechSynthesis.speak(utterance);
    };

    // 🌟 تشغيل الصوت العربي الطبيعي عبر خدمة TTS عالية الدقة ومجانية
    try {
        const encodedText = encodeURIComponent(textToSpeak.substring(0, 500)); // نطق الجزء المطلوب بفصاحة تامة
        const ttsUrl = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodedText}&tl=ar&client=tw-ob`;

        const audio = new Audio(ttsUrl);
        globalAudioElement = audio;

        audio.onended = () => {
            window.resetTTSButtons();
            currentSpeakingMsgId = null;
            globalAudioElement = null;
        };

        audio.onerror = () => {
            console.warn("Cloud Arabic TTS failed, switching to local voice...");
            fallbackToBrowserTTS();
        };

        const playPromise = audio.play();
        if (playPromise !== undefined) {
            playPromise.catch(err => {
                console.warn("Audio play blocked, using fallback:", err);
                fallbackToBrowserTTS();
            });
        }
    } catch(err) {
        fallbackToBrowserTTS();
    }
};

window.resetTTSButtons = function () {
    document.querySelectorAll('.tts-read-btn').forEach(b => {
        b.innerHTML = `<i data-lucide="volume-2" class="w-3.5 h-3.5"></i> <span>${typeof t === 'function' ? t('chat.readAloud') : 'استماع'}</span>`;
        b.classList.remove('speaking-active', 'text-emerald-400');
    });
    if (window.lucide) lucide.createIcons();
};

// معالج النقر على خيارات الاستيضاح التفاعلية السريعة
window.handleQuickScenario = function (scenarioText) {
    const chatInput = document.getElementById('chat-input');
    if (chatInput) {
        chatInput.value = scenarioText;
    }
    window.executeBotRequest(scenarioText, false);
};


// ⚙️ دالة فتح نافذة الإعدادات المباشرة (متاحة للجميع مع دعم التبويبات)
window.openAccountModal = function () {
    const modal = document.getElementById('account-modal');
    if (!modal) return;

    try {
        const nameDisplay = document.getElementById('modal-user-name-display');
        const emailDisplay = document.getElementById('modal-user-email');
        const nameInput = document.getElementById('modal-display-name-input');
        const avatarEl = document.getElementById('modal-user-avatar');
        const loggedInSection = document.getElementById('logged-in-profile-section');
        const authActionContainer = document.getElementById('modal-auth-action-container');
        const chatsCountEl = document.getElementById('settings-chats-count');

        if (chatsCountEl) {
            chatsCountEl.textContent = typeof t === "function" ? t("settings.data.chatCount", { count: (archivedChats || []).length }) : `${(archivedChats || []).length} محادثة محفوظة`;
        }

        if (currentUser) {
            if (nameDisplay) nameDisplay.textContent = currentUser.displayName || (typeof t === 'function' ? t('settings.account.registeredUser') : 'مستخدم مسجّل');
            if (emailDisplay) emailDisplay.textContent = currentUser.email || '';
            if (nameInput) nameInput.value = currentUser.displayName || '';
            if (loggedInSection) loggedInSection.classList.remove('hidden');
            if (authActionContainer) authActionContainer.innerHTML = '';

            if (avatarEl) {
                if (currentUser.photoURL) {
                    avatarEl.innerHTML = `<img src="${currentUser.photoURL}" class="w-full h-full object-cover rounded-full">`;
                } else {
                    avatarEl.textContent = currentUser.displayName ? currentUser.displayName[0] : '👤';
                }
            }
        } else {
            if (nameDisplay) nameDisplay.textContent = typeof t === 'function' ? t('sidebar.visitor') : 'زائر';
            if (emailDisplay) emailDisplay.textContent = typeof t === 'function' ? t('settings.account.notRegisteredGoogle') : 'غير مسجّل بحساب Google';
            if (loggedInSection) loggedInSection.classList.add('hidden');
            if (authActionContainer) {
                authActionContainer.innerHTML = `<button onclick="handleAuthAction()" class="text-xs bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-1.5 rounded-xl transition font-medium">${typeof t === 'function' ? t('sidebar.login') : 'دخول'}</button>`;
            }
            if (avatarEl) avatarEl.textContent = '👤';
        }

        // تطبيق التفضيلات المخزنة على أزرار الإعدادات بأمان
        if (typeof window.applyStoredSettingsToUI === 'function') {
            window.applyStoredSettingsToUI();
        }
    } catch (err) {
        console.warn("تنبيه عند فتح نافذة الإعدادات:", err);
    }

    modal.style.display = 'flex';
    if (window.lucide) lucide.createIcons();
};

// ❌ دالة إغلاق النافذة
window.closeAccountModal = function () {
    const modal = document.getElementById('account-modal');
    if (modal) modal.style.display = 'none';
};

// 👤 دالة النقر على بطاقة الحساب
window.handleProfileCardClick = function (e) {
    if (e.target.closest('#auth-btn')) {
        window.handleAuthAction();
        return;
    }
    window.openAccountModal();
};

// التحقق من نتيجة تسجيل الدخول عبر Redirect (مهم جداً للهواتف والآيفون)
auth.getRedirectResult().then((result) => {
    if (result && result.user) {
        console.log("تم تسجيل الدخول بنجاح عبر إعادة التوجيه:", result.user.displayName);
    }
}).catch((err) => {
    if (err.code && err.code !== 'auth/credential-already-in-use') {
        console.error("خطأ في تسجيل الدخول عبر التحويل:", err);
    }
});

window.handleAuthAction = function () {
    if (currentUser) {
        auth.signOut();
        window.closeAccountModal();
    } else {
        if (window.location.protocol === 'file:') {
            alert("⚠️ تنبيه أمني من Google:\n\nجوجل تمنع تسجيل الدخول مباشرة من الملفات المحلية (file:///c:/...).\n\nلتسجيل الدخول، يرجى تشغيل الموقع عبر سيرفر محلي (مثل Live Server في VS Code) أو تشغيل خادم محلي:\npython -m http.server 3000\nثم فتح الرابط: http://localhost:3000");
            return;
        }
        const provider = new firebase.auth.GoogleAuthProvider();
        provider.setCustomParameters({ prompt: 'select_account' });

        auth.signInWithPopup(provider).catch(err => {
            if (err.code === 'auth/popup-blocked' || err.code === 'auth/popup-closed-by-user' || /iphone|ipad|ipod|mobile/i.test(navigator.userAgent)) {
                auth.signInWithRedirect(provider);
            } else {
                alert("خطأ في تسجيل الدخول: " + err.message);
            }
        });
    }
};

document.addEventListener('DOMContentLoaded', () => {
    if (window.lucide) lucide.createIcons();

    const chatForm = document.getElementById('chat-form');
    const chatInput = document.getElementById('chat-input');
    const chatMessages = document.getElementById('chat-messages');
    const saveAccountChangesBtn = document.getElementById('save-account-changes-btn');
    const modalLogoutBtn = document.getElementById('modal-logout-btn');
    const accountModal = document.getElementById('account-modal');

    chatInput?.addEventListener('keydown', (e) => {
        const enterSendEnabled = localStorage.getItem('tabsirah_enter_send') !== 'false';
        if (enterSendEnabled && e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            chatForm?.dispatchEvent(new Event('submit'));
        }
    });

    chatInput?.addEventListener('input', function () {
        this.style.height = 'auto';
        this.style.height = (this.scrollHeight) + 'px';
    });

    // 🖼️ الاستماع لرفع الصور ومشاركتها عبر الملف أو اللصق (Paste)
    const imageFileInput = document.getElementById('image-file-input');
    imageFileInput?.addEventListener('change', function (e) {
        if (this.files && this.files[0]) {
            window.handleImageSelect(this.files[0]);
        }
    });

    // دعم لصق الصور مباشرة في صندوق الكتابة (Paste Image from Clipboard)
    chatInput?.addEventListener('paste', (e) => {
        const items = (e.clipboardData || e.originalEvent?.clipboardData)?.items;
        if (items) {
            for (let i = 0; i < items.length; i++) {
                if (items[i].type.indexOf('image') !== -1) {
                    const blob = items[i].getAsFile();
                    if (blob) {
                        e.preventDefault();
                        window.handleImageSelect(blob);
                        break;
                    }
                }
            }
        }
    });

    auth.onAuthStateChanged((user) => {
        currentUser = user;
        updateUserUI(user);
        loadArchivedChats();
    });

    accountModal?.addEventListener('click', (e) => {
        if (e.target === accountModal) window.closeAccountModal();
    });

    saveAccountChangesBtn?.addEventListener('click', async () => {
        if (!currentUser) return;
        const newNameInput = document.getElementById('modal-display-name-input');
        const newName = newNameInput?.value.trim();

        if (!newName) {
            alert("يرجى إدخال اسم صحيح.");
            return;
        }

        try {
            await currentUser.updateProfile({ displayName: newName });
            updateUserUI(currentUser);
            window.closeAccountModal();
            alert("تم تحديث اسمك بنجاح! ✨");
        } catch (error) {
            alert("حدث خطأ أثناء تعديل الاسم: " + error.message);
        }
    });

    modalLogoutBtn?.addEventListener('click', () => {
        auth.signOut();
        window.closeAccountModal();
    });

    function updateUserUI(user) {
        const userNameEl = document.getElementById('user-name');
        const userStatusEl = document.getElementById('user-status');
        const userAvatarEl = document.getElementById('user-avatar');
        const authBtn = document.getElementById('auth-btn');

        if (user) {
            userNameEl.textContent = user.displayName || (typeof t === 'function' ? t('settings.account.registeredUser') : 'مستخدم مسجّل');
            userStatusEl.textContent = user.email;
            authBtn.textContent = typeof t === 'function' ? t('sidebar.logout') : 'خروج';
            authBtn.className = 'text-xs bg-red-600/20 text-red-400 border border-red-500/30 hover:bg-red-600 hover:text-white px-2 py-1 rounded-lg transition font-medium';
            userAvatarEl.innerHTML = user.photoURL ? `<img src="${user.photoURL}" class="w-full h-full object-cover">` : (user.displayName ? user.displayName[0] : '👤');
        } else {
            userNameEl.textContent = typeof t === 'function' ? t('sidebar.visitor') : 'زائر';
            userStatusEl.textContent = typeof t === 'function' ? t('sidebar.notRegistered') : 'غير مسجّل';
            authBtn.textContent = typeof t === 'function' ? t('sidebar.login') : 'دخول';
            authBtn.className = 'text-xs bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-600 hover:text-white px-2.5 py-1 rounded-lg transition font-medium';
            userAvatarEl.innerHTML = '👤';
        }
    }

    setupSidebarUI();
    renderChatView();

    // ⚖️ إعداد أزرار نمط الإجابة (مفصّل / موجز)
    const modeDetailedBtn = document.getElementById('mode-detailed-btn');
    const modeConciseBtn = document.getElementById('mode-concise-btn');

    function updateModeUI() {
        if (answerMode === 'detailed') {
            modeDetailedBtn?.classList.add('bg-emerald-600/30', 'text-emerald-300', 'border-emerald-500/30', 'shadow-sm');
            modeDetailedBtn?.classList.remove('text-slate-400', 'hover:text-slate-200', 'border-transparent');

            modeConciseBtn?.classList.remove('bg-emerald-600/30', 'text-emerald-300', 'border-emerald-500/30', 'shadow-sm');
            modeConciseBtn?.classList.add('text-slate-400', 'hover:text-slate-200', 'border-transparent');
        } else {
            modeConciseBtn?.classList.add('bg-emerald-600/30', 'text-emerald-300', 'border-emerald-500/30', 'shadow-sm');
            modeConciseBtn?.classList.remove('text-slate-400', 'hover:text-slate-200', 'border-transparent');

            modeDetailedBtn?.classList.remove('bg-emerald-600/30', 'text-emerald-300', 'border-emerald-500/30', 'shadow-sm');
            modeDetailedBtn?.classList.add('text-slate-400', 'hover:text-slate-200', 'border-transparent');
        }
    }

    modeDetailedBtn?.addEventListener('click', () => {
        answerMode = 'detailed';
        localStorage.setItem('tabsirah_mode', 'detailed');
        updateModeUI();
    });

    modeConciseBtn?.addEventListener('click', () => {
        answerMode = 'concise';
        localStorage.setItem('tabsirah_mode', 'concise');
        updateModeUI();
    });
    updateModeUI();

    // ⬇️ زر النزول التلقائي لأسفل المحادثة
    const scrollBottomBtn = document.getElementById('scroll-bottom-btn');
    chatMessages?.addEventListener('scroll', () => {
        const isScrolledUp = (chatMessages.scrollHeight - chatMessages.scrollTop - chatMessages.clientHeight) > 140;
        if (isScrolledUp) {
            scrollBottomBtn?.classList.remove('opacity-0', 'pointer-events-none');
            scrollBottomBtn?.classList.add('opacity-100', 'pointer-events-auto');
        } else {
            scrollBottomBtn?.classList.remove('opacity-100', 'pointer-events-auto');
            scrollBottomBtn?.classList.add('opacity-0', 'pointer-events-none');
        }
    });

    scrollBottomBtn?.addEventListener('click', () => {
        chatMessages?.scrollTo({ top: chatMessages.scrollHeight, behavior: 'smooth' });
    });

    // تحديث حالة زر الإرسال / الإيقاف
    function updateSendButtonState(isGenerating) {
        const sendBtn = document.getElementById('send-btn');
        if (!sendBtn) return;
        if (isGenerating) {
            sendBtn.innerHTML = `<i data-lucide="square" class="w-3.5 h-3.5 fill-current"></i>`;
            sendBtn.className = 'bg-red-600 hover:bg-red-500 text-white p-2 rounded-xl transition shadow-md';
            sendBtn.setAttribute('title', typeof t === 'function' ? t('chat.stop') : 'إيقاف التوليد');
            sendBtn.setAttribute('data-state', 'stop');
        } else {
            sendBtn.innerHTML = `<i data-lucide="arrow-up" class="w-4 h-4"></i>`;
            sendBtn.className = 'bg-emerald-600 hover:bg-emerald-500 text-white p-2 rounded-xl transition shadow-md disabled:opacity-50 disabled:cursor-not-allowed';
            sendBtn.setAttribute('title', typeof t === 'function' ? t('chat.send') : 'إرسال');
            sendBtn.setAttribute('data-state', 'send');
        }
        if (window.lucide) lucide.createIcons();
    }

    // 🚀 دالة المعالجة والإرسال الموحدة للذكاء الاصطناعي (مع دعم عدم القفل وإيقاف التوليد والمدخلات متعددة الوسائط)
    window.executeBotRequest = async function (userText, isRegenerate = false, attachedImage = null) {
        const welcomeScreen = document.getElementById('welcome-screen');
        if (welcomeScreen) welcomeScreen.remove();

        // إيقاف أي قراءة صوتية حالية فور إرسال رسالة جديدة
        if (window.speechSynthesis && window.speechSynthesis.speaking) {
            window.speechSynthesis.cancel();
            window.resetTTSButtons();
        }

        // إذا كان هناك طلب قيد المعالجة، قم بإلغائه بسلاسة
        if (activeAbortController) {
            activeAbortController.abort();
            activeAbortController = null;
        }

        activeAbortController = new AbortController();

        // استخدام الصورة الممررة أو الصورة المختارة حالياً
        const imageToSend = attachedImage || currentSelectedImage;

        // ✨ حقل الكتابة يظل مفصولاً ومتاحاً للكتابة والتفكير دائماً دون قفل
        if (!isRegenerate) {
            appendMessageUI(userText, 'user', imageToSend ? imageToSend.dataUrl : null);
            currentChatHistory.push({
                role: "user",
                content: userText,
                image: imageToSend ? imageToSend.dataUrl : null
            });
            saveCurrentChat();
        }
        chatInput.value = '';
        chatInput.style.height = 'auto';

        // تفريغ الصورة المحددة في صندوق الكتابة بعد إرسالها
        window.clearSelectedImage();

        const loadingDiv = appendLoadingBubble();
        updateSendButtonState(true);

        // تخصيص التوجيه بناءً على النمط المحدد
        const modeInstruction = answerMode === 'concise'
            ? "توجيه إضافي للنمط: يرجى تقديم الحكم الشرعي المباشر باختصار وإيجاز سريع بنقاط واضحة دون إطالة أو حشو."
            : "توجيه إضافي للنمط: يرجى تفصيل الإجابة بذكر الأدلة الشرعية من القرآن الكريم والسنة النبوية وتخريجها وأقوال أهل العلم بتوسع وفائدة.";

        // بناء حمولة الرسائل مع توسيع نافذة الذاكرة السياقية ودعم الرؤية والصور (Conversational Context Memory)
        const recentHistory = currentChatHistory.slice(-20).map(msg => {
            if (msg.role === 'user' && msg.image) {
                return {
                    role: "user",
                    content: [
                        { type: "text", text: msg.content || "حلل هذه الصورة شرعياً وأجب عما فيها." },
                        { type: "image_url", image_url: { url: msg.image } }
                    ]
                };
            }
            return {
                role: msg.role,
                content: msg.content
            };
        });

        const messagesPayload = [
            { role: "system", content: `${buildSystemPrompt()}\n\n${modeInstruction}` },
            ...recentHistory
        ];

        try {
            const response = await fetch(WORKER_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    model: "deepseek-chat",
                    messages: messagesPayload,
                    stream: true
                }),
                signal: activeAbortController.signal
            });

            if (!response.ok) {
                const errText = await response.text().catch(() => response.status);
                throw new Error('HTTP ' + response.status + ': ' + errText);
            }

            // Stop loading bubble, start streaming bubble
            if (loadingDiv) loadingDiv.remove();

            const msgId = 'msg-' + Date.now();
            const streamWrapper = document.createElement('div');
            streamWrapper.className = 'flex gap-2.5 justify-start max-w-3xl my-2';
            streamWrapper.id = msgId;
            const botIconHtml = '<div class=\"w-7 h-7 rounded-lg bg-emerald-600/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30 shrink-0 mt-0.5\"><i data-lucide=\"bot\" class=\"w-4 h-4\"></i></div>';
            streamWrapper.innerHTML = botIconHtml + '<div class=\"bot-msg-bubble bg-slate-900 border border-slate-800 text-slate-200 px-4 py-3 rounded-2xl rounded-tr-none leading-relaxed shadow-sm w-full\"><div class=\"prose-chat\" id=\"stream-content-' + msgId + '\"></div><span id=\"stream-cursor-' + msgId + '\" style=\"display:inline-block;width:2px;height:1em;background:#34d399;border-radius:1px;vertical-align:middle;margin-right:2px;animation:tabsera-blink 1s step-end infinite\"></span></div>';
            chatMessages.appendChild(streamWrapper);
            chatMessages.scrollTop = chatMessages.scrollHeight;
            if (window.lucide) lucide.createIcons();

            const streamContentEl = document.getElementById('stream-content-' + msgId);
            const cursorEl = document.getElementById('stream-cursor-' + msgId);

            // SSE streaming read loop
            const reader = response.body.getReader();
            const decoder = new TextDecoder('utf-8');
            let fullText = '';
            let sseBuffer = '';
            let lastRender = 0;
            const THROTTLE = 40;

            try {
                while (true) {
                    const { done, value } = await reader.read();
                    if (done) break;
                    sseBuffer += decoder.decode(value, { stream: true });
                    const lines = sseBuffer.split('\n');
                    sseBuffer = lines.pop() || '';
                    for (const line of lines) {
                        const t2 = line.trim();
                        if (!t2.startsWith('data: ')) continue;
                        const payload = t2.slice(6).trim();
                        if (payload === '[DONE]') continue;
                        try {
                            const chunk = JSON.parse(payload);
                            const delta = chunk?.choices?.[0]?.delta?.content;
                            if (delta) {
                                fullText += delta;
                                const now = Date.now();
                                if (now - lastRender > THROTTLE && streamContentEl) {
                                    streamContentEl.textContent = fullText;
                                    chatMessages.scrollTop = chatMessages.scrollHeight;
                                    lastRender = now;
                                }
                            }
                        } catch (_) {}
                    }
                }
            } catch (streamErr) {
                // Unexpected EOF: stream ended — use what we have
                console.warn('Stream read ended early, using collected text:', streamErr.message);
                if (!fullText) throw streamErr;
            } finally {
                reader.cancel().catch(() => {});
            }

            // Remove cursor, render full formatted response
            if (cursorEl) cursorEl.remove();
            if (streamContentEl) streamContentEl.innerHTML = formatText(fullText);

            // Inject action toolbar
            const bubbleDiv = streamWrapper.querySelector('.bot-msg-bubble');
            if (bubbleDiv) {
                const toolbar = document.createElement('div');
                toolbar.className = 'flex items-center justify-between mt-2 pt-2 border-t border-slate-800/80 text-xs text-slate-400';
                const copyLbl = typeof t === 'function' ? t('chat.copy') : 'نسخ';
                const readLbl = typeof t === 'function' ? t('chat.readAloud') : 'استماع';
                const waLbl = typeof t === 'function' ? t('chat.whatsapp') : 'واتساب';
                const regenLbl = typeof t === 'function' ? t('chat.regenerate') : 'إعادة';
                toolbar.innerHTML = '<div class=\"flex items-center gap-3\">' +
                    '<button onclick=\"copyToClipboard(\'' + msgId + '\', this)\" class=\"hover:text-emerald-400 flex items-center gap-1 transition\"><i data-lucide=\"copy\" class=\"w-3.5 h-3.5\"></i><span>' + copyLbl + '</span></button>' +
                    '<button onclick=\"speakMessageText(\'' + msgId + '\', this)\" class=\"tts-read-btn hover:text-emerald-400 flex items-center gap-1 transition\"><i data-lucide=\"volume-2\" class=\"w-3.5 h-3.5\"></i><span>' + readLbl + '</span></button>' +
                    '<button onclick=\"shareWhatsApp(\'' + msgId + '\')\" class=\"hover:text-emerald-400 flex items-center gap-1 transition\"><i data-lucide=\"share-2\" class=\"w-3.5 h-3.5\"></i><span>' + waLbl + '</span></button>' +
                    '<button onclick=\"regenerateLastResponse()\" class=\"hover:text-emerald-400 flex items-center gap-1 transition\"><i data-lucide=\"refresh-cw\" class=\"w-3.5 h-3.5\"></i><span>' + regenLbl + '</span></button>' +
                    '</div>' +
                    '<div class=\"flex items-center gap-1 border-r border-slate-800 pr-2 mr-1\">' +
                    '<button onclick=\"rateResponse(this, \'like\')\" class=\"hover:text-emerald-400 p-1 rounded-md transition text-slate-400\"><i data-lucide=\"thumbs-up\" class=\"w-3.5 h-3.5\"></i></button>' +
                    '<button onclick=\"rateResponse(this, \'dislike\')\" class=\"hover:text-red-400 p-1 rounded-md transition text-slate-400\"><i data-lucide=\"thumbs-down\" class=\"w-3.5 h-3.5\"></i></button>' +
                    '</div>';
                bubbleDiv.appendChild(toolbar);
            }
            streamWrapper.setAttribute('data-raw-text', fullText);
            chatMessages.scrollTop = chatMessages.scrollHeight;
            if (window.lucide) lucide.createIcons();

            playNotifySoundIfEnabled();
            currentChatHistory.push({ role: "assistant", content: fullText });
            saveCurrentChat();
            try { await saveChatSession(); } catch (err) { console.warn("Session save:", err); }

        } catch (error) {
            if (loadingDiv) loadingDiv.remove();
            if (error.name === 'AbortError') {
                appendMessageUI(typeof t === 'function' ? t('chat.stopped') : 'تم إيقاف التوليد بناءً على طلبك.', 'bot');
            } else {
                const errPrefix = typeof t === 'function' ? t('chat.errorConnection') : 'عذراً، حدث خطأ في الاتصال بالخادم: ';
                appendMessageUI(errPrefix + error.message, 'bot');
            }
        } finally {
            activeAbortController = null;
            updateSendButtonState(false);
            chatInput.focus();
        }
    };

    chatForm?.addEventListener('submit', async (e) => {
        e.preventDefault();
        const sendBtn = document.getElementById('send-btn');
        // إذا ضغط المستخدم على زر الإيقاف وحقل النص فارغ وليس هناك صورة
        if (sendBtn && sendBtn.getAttribute('data-state') === 'stop' && !chatInput.value.trim() && !currentSelectedImage) {
            if (activeAbortController) {
                activeAbortController.abort();
            }
            return;
        }

        // إيقاف التسجيل الصوتي إن كان جارياً
        if (isVoiceRecording) {
            window.stopVoiceRecording();
        }

        let userText = chatInput.value.trim();
        // إذا كان هناك صورة بدون نص مصاحب، نضع نصاً افتراضياً للتحليل
        if (!userText && currentSelectedImage) {
            userText = typeof t === 'function' ? t('chat.attachImage') : 'يرجى تحليل هذه الصورة شرعياً وبيان الحكم الفقهي أو التفسير المتعلق بها.';
        }

        if (!userText && !currentSelectedImage) return;

        const imgSnapshot = currentSelectedImage ? { ...currentSelectedImage } : null;
        await window.executeBotRequest(userText, false, imgSnapshot);
    });

    function appendMessageUI(text, sender, imageUrl = null) {
        const msgWrapper = document.createElement('div');

        if (sender === 'user') {
            msgWrapper.className = 'group flex justify-end items-center gap-1.5 my-2';
            const encoded = encodeURIComponent(text);
            const imageHtml = imageUrl
                ? `<div class="mb-2 max-w-sm rounded-xl overflow-hidden border border-emerald-400/40 shadow-sm bg-slate-900 cursor-pointer hover:opacity-90 transition" onclick="openImageLightbox('${imageUrl}')"><img src="${imageUrl}" alt="صورة المستخدم" class="max-h-60 w-auto rounded-lg object-contain"></div>`
                : '';

            msgWrapper.innerHTML = `
                <button type="button" onclick="editUserMessage('${encoded}')" class="opacity-0 group-hover:opacity-100 p-1.5 text-slate-400 hover:text-emerald-400 hover:bg-slate-800 rounded-lg transition shrink-0" title="تعديل السؤال وإعادة إرساله">
                    <i data-lucide="pencil" class="w-3.5 h-3.5"></i>
                </button>
                <div class="user-msg-bubble bg-emerald-600 text-white px-4 py-2.5 rounded-2xl rounded-tl-none max-w-xl leading-relaxed shadow-sm">
                    ${imageHtml}
                    <div>${formatText(text)}</div>
                </div>
            `;
        } else {
            msgWrapper.className = 'flex gap-2.5 justify-start max-w-3xl my-2';
            const msgId = 'msg-' + Date.now();
            msgWrapper.innerHTML = `
                <div class="w-7 h-7 rounded-lg bg-emerald-600/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30 shrink-0 mt-0.5">
                    <i data-lucide="bot" class="w-4 h-4"></i>
                </div>
                <div class="bot-msg-bubble bg-slate-900 border border-slate-800 text-slate-200 px-4 py-3 rounded-2xl rounded-tr-none leading-relaxed shadow-sm space-y-2 w-full">
                    <div class="prose-chat">${formatText(text)}</div>
                    <div class="flex items-center justify-between mt-2 pt-2 border-t border-slate-800/80 text-xs text-slate-400">
                        <div class="flex items-center gap-3">
                            <button onclick="copyToClipboard('${msgId}', this)" class="hover:text-emerald-400 flex items-center gap-1 transition" title="${typeof t === 'function' ? t('chat.copy') : 'نسخ'}">
                                <i data-lucide="copy" class="w-3.5 h-3.5"></i> <span>${typeof t === 'function' ? t('chat.copy') : 'نسخ'}</span>
                            </button>
                            <button onclick="speakMessageText('${msgId}', this)" class="tts-read-btn hover:text-emerald-400 flex items-center gap-1 transition" title="${typeof t === 'function' ? t('chat.readAloud') : 'استماع للرد'}">
                                <i data-lucide="volume-2" class="w-3.5 h-3.5"></i> <span>${typeof t === 'function' ? t('chat.readAloud') : 'استماع'}</span>
                            </button>
                            <button onclick="shareWhatsApp('${msgId}')" class="hover:text-emerald-400 flex items-center gap-1 transition" title="${typeof t === 'function' ? t('chat.whatsapp') : 'واتساب'}">
                                <i data-lucide="share-2" class="w-3.5 h-3.5"></i> <span>${typeof t === 'function' ? t('chat.whatsapp') : 'واتساب'}</span>
                            </button>
                            <button onclick="regenerateLastResponse()" class="hover:text-emerald-400 flex items-center gap-1 transition" title="${typeof t === 'function' ? t('chat.regenerate') : 'إعادة التوليد'}">
                                <i data-lucide="refresh-cw" class="w-3.5 h-3.5"></i> <span>${typeof t === 'function' ? t('chat.regenerate') : 'إعادة التوليد'}</span>
                            </button>
                        </div>
                        <div class="flex items-center gap-1 border-r border-slate-800 pr-2 mr-1">
                            <button onclick="rateResponse(this, 'like')" class="hover:text-emerald-400 p-1 rounded-md transition text-slate-400" title="إجابة مفيدة ودقيقة">
                                <i data-lucide="thumbs-up" class="w-3.5 h-3.5"></i>
                            </button>
                            <button onclick="rateResponse(this, 'dislike')" class="hover:text-red-400 p-1 rounded-md transition text-slate-400" title="إجابة غير دقيقة">
                                <i data-lucide="thumbs-down" class="w-3.5 h-3.5"></i>
                            </button>
                        </div>
                    </div>
                </div>
            `;
            msgWrapper.setAttribute('data-raw-text', text);
            msgWrapper.id = msgId;
        }

        chatMessages.appendChild(msgWrapper);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        if (window.lucide) lucide.createIcons();
        return msgWrapper;
    }

    function appendLoadingBubble() {
        const id = 'loading-' + Date.now();
        const msgDiv = document.createElement('div');
        msgDiv.id = id;
        msgDiv.className = 'flex gap-2.5 justify-start max-w-3xl my-2';
        msgDiv.innerHTML = `
            <div class="w-7 h-7 rounded-lg bg-emerald-600/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30 shrink-0">
                <i data-lucide="bot" class="w-4 h-4"></i>
            </div>
            <div class="bg-slate-900 border border-slate-800 text-slate-400 px-4 py-2.5 rounded-2xl rounded-tr-none text-sm flex items-center gap-2">
                <span class="w-2 h-2 bg-emerald-400 rounded-full animate-ping"></span>
                <span>${typeof t === 'function' ? t('chat.loading') : 'جاري التفكير وتحضير الرد الشرعي...'}</span>
            </div>
        `;
        chatMessages.appendChild(msgDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        if (window.lucide) lucide.createIcons();
        return msgDiv;
    }

    function formatText(text) {
        if (!text) return '';

        // 1. استخراج أزرار الاستيضاح الذكي [خيار: ...]
        const clarifyMatches = [];
        const clarifyRegex = /\[خيار:\s*(.*?)\]/g;
        let match;
        while ((match = clarifyRegex.exec(text)) !== null) {
            clarifyMatches.push(match[1].trim());
        }
        let cleanedText = text.replace(clarifyRegex, '');

        // 2. معالجة بطاقات الأحاديث النبوية
        cleanedText = cleanedText.replace(/(?:📜\s*)?«([^»]+)»\s*\n*(?:التخريج:\s*([^|\n]+)\s*\|?\s*)?(?:الدرجة:\s*([^\n]+))?/g, function (m, hadithText, source, grade) {
            let badgeClass = 'hadith-badge-sahih';
            let gradeLabel = grade ? grade.trim() : 'صحيح';
            if (gradeLabel.includes('ضعيف')) badgeClass = 'hadith-badge-daif';
            else if (gradeLabel.includes('حسن')) badgeClass = 'hadith-badge-hasan';
            else if (gradeLabel.includes('متفق')) badgeClass = 'hadith-badge-muttafaq';

            const sourceHtml = source ? `<span class="text-slate-400 text-xs">${source.trim()}</span>` : '';
            return `
<div class="hadith-card my-3">
    <div class="flex items-center justify-between gap-2 mb-1.5">
        <span class="text-xs text-emerald-400 font-semibold flex items-center gap-1">
            <i data-lucide="scroll" class="w-3.5 h-3.5"></i> حديث شريف
        </span>
        <span class="text-[10px] px-2 py-0.5 rounded-md font-bold ${badgeClass}">${gradeLabel}</span>
    </div>
    <div class="font-['Amiri'] text-slate-100 text-base leading-loose my-1">«${hadithText.trim()}»</div>
    ${sourceHtml ? `<div class="text-[11px] text-slate-400 mt-1 border-t border-slate-800/80 pt-1">المصدر: ${sourceHtml}</div>` : ''}
</div>`;
        });

        // 3. معالجة الآيات الكريمة
        cleanedText = cleanedText.replace(/﴿([^﴾]+)﴾(?:\s*\[([^\]]+)\])?/g, function (m, verse, surahInfo) {
            return `
<div class="quran-verse-box my-3">
    <div class="font-['Amiri'] text-emerald-100 text-lg">﴿${verse.trim()}﴾</div>
    ${surahInfo ? `<div class="text-xs text-emerald-400 font-sans mt-1.5 font-medium">${surahInfo.trim()}</div>` : ''}
</div>`;
        });

        let rendered = '';
        if (window.marked) {
            try {
                marked.setOptions({
                    breaks: true,
                    gfm: true
                });
                rendered = marked.parse(cleanedText);
            } catch (e) {
                console.error('Markdown parse error:', e);
                rendered = cleanedText.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br>');
            }
        } else {
            rendered = cleanedText.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br>');
        }

        // 4. إضافة أزرار الاستيضاح الذكي إن وجدت
        if (clarifyMatches.length > 0) {
            const clarifyTitle = typeof t === 'function' ? t('clarify.title') : 'خيارات لتحديد حالتك بدقة:';
            const buttonsHtml = clarifyMatches.map(opt => {
                const escaped = encodeURIComponent(opt);
                return `<button type="button" onclick="window.handleQuickScenario(decodeURIComponent('${escaped}'))" class="clarify-chip"><i data-lucide="chevron-left" class="w-3.5 h-3.5"></i> ${opt}</button>`;
            }).join('');

            rendered += `
<div class="clarify-container">
    <div class="text-xs text-emerald-400 font-semibold mb-2 flex items-center gap-1.5">
        <i data-lucide="help-circle" class="w-3.5 h-3.5"></i>
        <span>${clarifyTitle}</span>
    </div>
    <div class="flex flex-wrap gap-1.5">
        ${buttonsHtml}
    </div>
</div>`;
        }

        return rendered;
    }

    function setupSidebarUI() {
        const sidebar = document.getElementById('sidebar');
        const overlay = document.getElementById('sidebar-overlay');
        const toggleBtn = document.getElementById('toggle-sidebar-btn');
        const closeBtn = document.getElementById('close-sidebar-btn');
        const newChatBtn = document.getElementById('new-chat-btn');

        const toggleSidebar = () => {
            const isLTR = document.documentElement.getAttribute('dir') === 'ltr';
            if (isLTR) {
                sidebar?.classList.toggle('sidebar-open');
                sidebar?.classList.remove('translate-x-full');
            } else {
                sidebar?.classList.toggle('translate-x-full');
                sidebar?.classList.remove('sidebar-open');
            }
            overlay?.classList.toggle('hidden');
        };

        toggleBtn?.addEventListener('click', toggleSidebar);
        closeBtn?.addEventListener('click', toggleSidebar);
        overlay?.addEventListener('click', toggleSidebar);

        newChatBtn?.addEventListener('click', () => {
            currentChatHistory = [];
            currentChatId = Date.now();
            localStorage.setItem('tabsirah_current_chat_id', currentChatId);
            localStorage.removeItem('tabsirah_current_active_chat');
            renderChatView();
            loadArchivedChats();
            if (window.innerWidth < 768) toggleSidebar();
        });
    }

    function renderChatView() {
        chatMessages.innerHTML = '';
        if (currentChatHistory.length > 0) {
            currentChatHistory.forEach(msg => appendMessageUI(msg.content, msg.role === 'user' ? 'user' : 'bot', msg.image || null));
        } else {
            renderWelcomeScreen();
        }
    }

    function renderWelcomeScreen() {
        const greeting = typeof t === 'function' ? t('welcome.greeting') : 'السلام عليكم ورحمة الله وبركاته';
        const subtitle = typeof t === 'function' ? t('welcome.subtitle') : 'أنا مساعد تبصرة الرقمي، كيف يمكنني مساعدتك اليوم؟';
        const card1Title = typeof t === 'function' ? t('welcome.card1Title') : 'آداب الدعاء المستجاب';
        const card1Desc = typeof t === 'function' ? t('welcome.card1Desc') : 'تعرف على الأوقات والشروط التي يُرجى فيها القبول';
        const card1Prompt = typeof t === 'function' ? t('welcome.card1Prompt') : 'ما هي آداب وأوقات إجابة الدعاء؟';
        const card2Title = typeof t === 'function' ? t('welcome.card2Title') : 'أذكار الصباح والمساء';
        const card2Desc = typeof t === 'function' ? t('welcome.card2Desc') : 'الأدعية والأذكار الحافظة من السنة النبوية';
        const card2Prompt = typeof t === 'function' ? t('welcome.card2Prompt') : 'اذكر لي أذكار الصباح كاملة';

        chatMessages.innerHTML = `
            <div id="welcome-screen" class="flex flex-col items-center justify-center min-h-[65vh] text-center space-y-5">
                <div class="w-14 h-14 rounded-2xl bg-emerald-600/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center shadow-lg">
                    <i data-lucide="sparkles" class="w-7 h-7"></i>
                </div>
                <div class="space-y-1">
                    <h2 class="text-xl font-bold text-slate-100">${greeting}</h2>
                    <p class="text-slate-400 text-xs max-w-sm">${subtitle}</p>
                </div>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5 w-full max-w-xl pt-2">
                    <button onclick="sendQuickPrompt('${card1Prompt}')" class="p-3 bg-slate-900 border border-slate-800 hover:border-emerald-500/40 rounded-xl text-right transition group">
                        <p class="text-xs font-semibold text-slate-200 group-hover:text-emerald-400">${card1Title}</p>
                        <p class="text-[10px] text-slate-500 mt-0.5">${card1Desc}</p>
                    </button>
                    <button onclick="sendQuickPrompt('${card2Prompt}')" class="p-3 bg-slate-900 border border-slate-800 hover:border-emerald-500/40 rounded-xl text-right transition group">
                        <p class="text-xs font-semibold text-slate-200 group-hover:text-emerald-400">${card2Title}</p>
                        <p class="text-[10px] text-slate-500 mt-0.5">${card2Desc}</p>
                    </button>
                </div>
            </div>
        `;
        if (window.lucide) lucide.createIcons();
    }

    // دالة تحديث المحتوى الديناميكي عند تبديل اللغة
    window.refreshDynamicContent = function () {
        if (!currentChatHistory || currentChatHistory.length === 0) {
            renderWelcomeScreen();
        }
        if (archivedChats) {
            renderSidebarHistory(archivedChats);
        }
    };

    function saveCurrentChat() {
        localStorage.setItem('tabsirah_current_active_chat', JSON.stringify(currentChatHistory));
        localStorage.setItem('tabsirah_current_chat_id', currentChatId);
    }

    async function saveChatSession() {
        if (!currentChatHistory || currentChatHistory.length === 0) return;
        if (!currentChatHistory.some(m => m.role === 'user')) return;

        const sessionData = {
            id: Number(currentChatId),
            date: new Date().toLocaleString('ar-SA', { dateStyle: 'short', timeStyle: 'short' }),
            messages: [...currentChatHistory]
        };

        // 1. الحفظ المحلي فوراً وتحديث القائمة الجانبية فوراً (تضمن ظهور المحادثة في السايدبار دائماً)
        let localArchives = JSON.parse(localStorage.getItem('tabsirah_archived_chats')) || [];
        const index = localArchives.findIndex(s => Number(s.id) === Number(sessionData.id));
        if (index !== -1) {
            localArchives[index] = { ...localArchives[index], ...sessionData };
        } else {
            localArchives.unshift(sessionData);
        }
        if (localArchives.length > 30) localArchives.pop();
        localStorage.setItem('tabsirah_archived_chats', JSON.stringify(localArchives));
        archivedChats = localArchives;
        renderSidebarHistory(archivedChats);

        // 2. محاولة المزامنة السحابية بهدوء في الخلفية دون رمي أخطاء للواجهة
        if (currentUser) {
            try {
                await db.collection('users').doc(currentUser.uid).collection('chats').doc(String(sessionData.id)).set(sessionData, { merge: true });
            } catch (err) {
                console.warn("تنبيه: تعذر الحفظ في Firestore بسبب الصلاحيات (تحقق من Rules):", err.message);
            }
        }
    }

    let unsubscribeSnapshot = null;

    async function loadArchivedChats() {
        if (unsubscribeSnapshot) {
            unsubscribeSnapshot();
            unsubscribeSnapshot = null;
        }

        // قراءة وعرض المحادثات المحلية أولاً حتى لا تكون القائمة فارغة إطلاقاً
        let localArchives = JSON.parse(localStorage.getItem('tabsirah_archived_chats')) || [];
        archivedChats = localArchives;
        renderSidebarHistory(archivedChats);

        // الاستماع لـ Firestore وتحديث القائمة إذا تم جلب بيانات سحابية بنجاح
        if (currentUser) {
            try {
                unsubscribeSnapshot = db.collection('users').doc(currentUser.uid).collection('chats').orderBy('id', 'desc').limit(30).onSnapshot(snapshot => {
                    if (snapshot && !snapshot.empty) {
                        const cloudChats = snapshot.docs.map(doc => doc.data());
                        // دمج المحادثات السحابية والمحلية بذكاء لضمان عدم ضياع أي محادثة
                        const mergedMap = new Map();
                        cloudChats.forEach(c => { if (c && c.id) mergedMap.set(Number(c.id), c); });
                        localArchives.forEach(c => {
                            if (c && c.id && !mergedMap.has(Number(c.id))) {
                                mergedMap.set(Number(c.id), c);
                            }
                        });
                        archivedChats = Array.from(mergedMap.values()).sort((a, b) => Number(b.id) - Number(a.id));
                        localStorage.setItem('tabsirah_archived_chats', JSON.stringify(archivedChats));
                        renderSidebarHistory(archivedChats);
                    }
                }, error => {
                    console.warn("تنبيه أمان Firestore (المحادثات محفوظة محلياً بنجاح):", error.message);
                });
            } catch (e) {
                console.warn("خطأ snapshot Firestore:", e);
            }
        }
    }

    // 🧠 دالة ذكية لتحديد عنوان المحادثة متجاهلة التحيات
    function getSmartChatTitle(messages) {
        if (!messages || messages.length === 0) return 'محادثة جديدة';

        // قائمة التحيات والافتتاحيات لتخطيها وعدم جعلها عنواناً
        const greetingRegex = /^(أهلا|اهلا|مرحبا|مرحباً|السلام عليكم ورحمة الله وبركاته|السلام عليكم ورحمة الله|السلام عليكم|هلا|سلام|صباح الخير|مساء الخير|هاي|وش اخبارك|كيف حالك|كيفك|يا هلا|هلا والله|وش اقدر اسالك|ماذا تقدم|ايش تقدر تسوي)[!؟،.\s]*$/i;

        // البحث عن أول رسالة مفيدة كتبها المستخدم بعد التحية
        const contentMsg = messages.find(m => m.role === 'user' && !greetingRegex.test(m.content.trim()));

        if (contentMsg) {
            let title = contentMsg.content.trim();
            title = title.replace(/^(السلام عليكم ورحمة الله وبركاته|السلام عليكم ورحمة الله|السلام عليكم|أهلاً|اهلا|مرحبا|مرحباً|هلا وغلا|هلا)[!،.\s]+/i, '').trim();
            if (title.length > 25) {
                title = title.substring(0, 25).trim() + '...';
            }
            return title || 'استفسار شرعي';
        }

        // إذا كانت المحادثة عبارة عن سؤال استكشافي مثل "وش أقدر أسألك"
        const firstUser = messages.find(m => m.role === 'user');
        if (firstUser) {
            let title = firstUser.content.trim();
            if (title.length > 22) title = title.substring(0, 22) + '...';
            return title;
        }
        return 'محادثة شرعية جديدة';
    }

    function renderSidebarHistory(archives) {
        const historyContainer = document.getElementById('history-list');
        if (!historyContainer) return;

        archives = archives.filter(session => session.messages && session.messages.some(m => m.role === 'user'));

        if (archives.length === 0) {
            historyContainer.innerHTML = `<p class="text-[11px] text-slate-500 text-center py-3">${typeof t === "function" ? t("sidebar.noChats") : "لا توجد محادثات"}</p>`;
            return;
        }

        historyContainer.innerHTML = archives.map((session) => {
            const displayTitle = session.title || getSmartChatTitle(session.messages);
            const activeClass = Number(session.id) === Number(currentChatId) ? 'bg-slate-800/90 border-emerald-500/30' : '';

            return `
                <div class="group flex items-center justify-between p-2 rounded-lg hover:bg-slate-800 transition cursor-pointer border border-transparent ${activeClass}" onclick="resumeSession(${session.id})">
                    <div class="flex items-center gap-2 overflow-hidden flex-1 min-w-0">
                        <i data-lucide="message-square" class="w-3.5 h-3.5 text-slate-500 shrink-0"></i>
                        <span class="text-xs text-slate-300 truncate font-medium">${displayTitle}</span>
                    </div>
                    <div class="flex items-center gap-1 shrink-0">
                        <button onclick="event.stopPropagation(); renameSession(${session.id})" class="opacity-0 group-hover:opacity-100 text-slate-500 hover:text-emerald-400 text-xs p-1 transition rounded hover:bg-slate-700" title="تعديل اسم المحادثة">
                            <i data-lucide="edit-3" class="w-3 h-3"></i>
                        </button>
                        <button onclick="event.stopPropagation(); deleteSession(${session.id})" class="opacity-0 group-hover:opacity-100 text-slate-500 hover:text-red-400 text-xs p-1 transition rounded hover:bg-slate-700" title="حذف المحادثة">
                            <i data-lucide="trash-2" class="w-3 h-3"></i>
                        </button>
                    </div>
                </div>
            `;
        }).join('');
        if (window.lucide) lucide.createIcons();
    }

    window.sendQuickPrompt = (text) => {
        const input = document.getElementById('chat-input');
        if (input) {
            input.value = text;
            document.getElementById('chat-form')?.dispatchEvent(new Event('submit'));
        }
    };

    window.resumeSession = (id) => {
        const selected = archivedChats.find(s => Number(s.id) === Number(id));
        if (!selected) return;

        currentChatId = selected.id;
        currentChatHistory = selected.messages;
        saveCurrentChat();
        renderChatView();
        renderSidebarHistory(archivedChats);
    };

    window.deleteSession = async (id) => {
        if (currentUser) {
            try {
                await db.collection('users').doc(currentUser.uid).collection('chats').doc(String(id)).delete();
            } catch (err) {
                console.warn("تنبيه: تعذر حذف المحادثة من السحابة:", err.message);
            }
        }
        archivedChats = archivedChats.filter(s => Number(s.id) !== Number(id));
        localStorage.setItem('tabsirah_archived_chats', JSON.stringify(archivedChats));
        renderSidebarHistory(archivedChats);

        if (Number(currentChatId) === Number(id)) {
            currentChatHistory = [];
            currentChatId = Date.now();
            saveCurrentChat();
            renderChatView();
        }
    };

    window.copyToClipboard = (msgId, btn) => {
        const el = document.getElementById(msgId);
        const text = el ? el.getAttribute('data-raw-text') : '';
        if (text) {
            navigator.clipboard.writeText(text);
            btn.innerHTML = `<i data-lucide="check" class="w-3.5 h-3.5 text-emerald-400"></i> تم`;
            if (window.lucide) lucide.createIcons();
            setTimeout(() => {
                btn.innerHTML = `<i data-lucide="copy" class="w-3.5 h-3.5"></i> نسخ`;
                if (window.lucide) lucide.createIcons();
            }, 2000);
        }
    };

    window.shareWhatsApp = (msgId) => {
        const el = document.getElementById(msgId);
        const text = el ? el.getAttribute('data-raw-text') : '';
        if (text) {
            window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent("*من تطبيق تبصرة:*\n\n" + text)}`, '_blank');
        }
    };

    // ✏️ تعديل السؤال وإعادة تركيزه في صندوق الكتابة
    window.editUserMessage = (encoded) => {
        const text = decodeURIComponent(encoded);
        const input = document.getElementById('chat-input');
        if (input) {
            input.value = text;
            input.focus();
            input.style.height = 'auto';
            input.style.height = (input.scrollHeight) + 'px';
            input.scrollIntoView({ behavior: 'smooth' });
        }
    };

    // 👍 / 👎 تقييم الرد الفقهي
    window.rateResponse = (btn, type) => {
        const parent = btn.parentElement;
        if (!parent) return;
        const buttons = parent.querySelectorAll('button');
        buttons.forEach(b => {
            b.classList.remove('text-emerald-400', 'text-red-400');
            b.classList.add('text-slate-400');
        });
        if (type === 'like') {
            btn.classList.remove('text-slate-400');
            btn.classList.add('text-emerald-400');
            btn.title = "شكراً لتقييمك الإيجابي! ✨";
        } else {
            btn.classList.remove('text-slate-400');
            btn.classList.add('text-red-400');
            btn.title = "شكراً لملاحظتك، نسعى للتحسين!";
        }
    };

    // 🔄 إعادة توليد آخر رد من المساعد
    window.regenerateLastResponse = async () => {
        if (!currentChatHistory || currentChatHistory.length === 0) return;
        let lastUserIndex = -1;
        for (let i = currentChatHistory.length - 1; i >= 0; i--) {
            if (currentChatHistory[i].role === 'user') {
                lastUserIndex = i;
                break;
            }
        }
        if (lastUserIndex === -1) return;

        const lastUserMessage = currentChatHistory[lastUserIndex].content;
        const lastUserImage = currentChatHistory[lastUserIndex].image ? { dataUrl: currentChatHistory[lastUserIndex].image } : null;
        currentChatHistory = currentChatHistory.slice(0, lastUserIndex + 1);
        saveCurrentChat();
        renderChatView();

        if (window.executeBotRequest) {
            await window.executeBotRequest(lastUserMessage, true, lastUserImage);
        }
    };

    // ✏️ تعديل اسم المحادثة
    window.renameSession = async (id) => {
        const session = archivedChats.find(s => Number(s.id) === Number(id));
        if (!session) return;
        const currentTitle = session.title || getSmartChatTitle(session.messages);
        const newTitle = prompt(typeof t === 'function' ? t('alert.renamePrompt') : "أدخل اسماً جديداً للمحادثة:", currentTitle);
        if (!newTitle || !newTitle.trim()) return;

        session.title = newTitle.trim();
        localStorage.setItem('tabsirah_archived_chats', JSON.stringify(archivedChats));
        renderSidebarHistory(archivedChats);

        if (currentUser) {
            try {
                await db.collection('users').doc(currentUser.uid).collection('chats').doc(String(id)).set({ title: session.title }, { merge: true });
            } catch (err) {
                console.warn("تنبيه: تعذر تحديث الاسم في السحابة:", err.message);
            }
        }
    };

    // ⚙️ وظائف إدارة الإعدادات الشاملة (Tabs, Font, Data, Preferences)
    window.switchSettingsTab = function (tabKey) {
        document.querySelectorAll('.settings-tab-btn').forEach(btn => {
            btn.classList.remove('text-emerald-400', 'border-emerald-500');
            btn.classList.add('text-slate-400', 'border-transparent');
        });
        document.querySelectorAll('.settings-tab-content').forEach(c => c.classList.add('hidden'));

        const activeBtn = document.getElementById(`tab-btn-${tabKey}`);
        const activeContent = document.getElementById(`settings-tab-${tabKey}`);
        if (activeBtn) {
            activeBtn.classList.remove('text-slate-400', 'border-transparent');
            activeBtn.classList.add('text-emerald-400', 'border-emerald-500');
        }
        if (activeContent) activeContent.classList.remove('hidden');
        if (window.lucide) lucide.createIcons();
    };

    window.changeFontSize = function (size) {
        localStorage.setItem('tabsirah_font_size', size);
        window.applyStoredSettingsToUI();
    };

    window.changeFontFamily = function (fontKey) {
        localStorage.setItem('tabsirah_font_family', fontKey);
        window.applyStoredSettingsToUI();
    };

    window.setDefaultMode = function (mode) {
        answerMode = mode;
        localStorage.setItem('tabsirah_mode', mode);
        updateModeUI();
        window.applyStoredSettingsToUI();
    };

    window.toggleEnterSend = function (enabled) {
        localStorage.setItem('tabsirah_enter_send', enabled ? 'true' : 'false');
    };

    window.exportAllChats = function () {
        if (!archivedChats || archivedChats.length === 0) {
            alert("لا توجد أي محادثات لتصديرها.");
            return;
        }
        let exportText = `محادثات واستشارات تبصرة الرقمي\nتاريخ التصدير: ${new Date().toLocaleString('ar-SA')}\n=========================================\n\n`;
        archivedChats.forEach((chat, i) => {
            const chatTitle = chat.title || getSmartChatTitle(chat.messages);
            exportText += `\n--- محادثة #${i + 1}: ${chatTitle} (${chat.date || ''}) ---\n`;
            if (chat.messages) {
                chat.messages.forEach(msg => {
                    const senderName = msg.role === 'user' ? 'المستخدم' : 'مساعد تبصرة';
                    exportText += `${senderName}:\n${msg.content}\n\n`;
                });
            }
        });
        const blob = new Blob([exportText], { type: 'text/plain;charset=utf-8' });
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = `tabsera-chats-${Date.now()}.txt`;
        a.click();
    };

    window.clearAllChatsConfirm = async function () {
        if (!confirm("⚠️ هل أنت متأكد من رغبتك في مسح كافة المحادثات نهائياً؟ لا يمكن التراجع عن هذا الإجراء.")) {
            return;
        }

        if (currentUser) {
            try {
                const snapshot = await db.collection('users').doc(currentUser.uid).collection('chats').get();
                const batch = db.batch();
                snapshot.docs.forEach(doc => batch.delete(doc.ref));
                await batch.commit();
            } catch (err) {
                console.error("خطأ حذف محادثات Firestore:", err);
            }
        }
        localStorage.removeItem('tabsirah_archived_chats');
        localStorage.removeItem('tabsirah_current_active_chat');
        localStorage.removeItem('tabsirah_current_chat_id');
        archivedChats = [];
        currentChatHistory = [];
        currentChatId = Date.now();
        renderChatView();
        renderSidebarHistory([]);
        closeAccountModal();
        alert("تم مسح جميع المحادثات بنجاح.");
    };

    // 🎨 تخصيص لون السمة
    window.changeThemeColor = function (themeKey) {
        localStorage.setItem('tabsirah_theme_color', themeKey);
        window.applyStoredSettingsToUI();
    };

    // 🖤 وضع سواد OLED
    window.toggleOledBlack = function (enabled) {
        localStorage.setItem('tabsirah_oled_black', enabled ? 'true' : 'false');
        window.applyStoredSettingsToUI();
    };

    // 🕊️ تفضيل الصلاة على النبي ﷺ
    window.toggleSalawat = function (enabled) {
        localStorage.setItem('tabsirah_salawat', enabled ? 'true' : 'false');
    };

    // 🔔 تفضيل نغمة التنبيه
    window.toggleSoundNotify = function (enabled) {
        localStorage.setItem('tabsirah_sound_notify', enabled ? 'true' : 'false');
    };

    function playNotifySoundIfEnabled() {
        const enabled = localStorage.getItem('tabsirah_sound_notify') === 'true';
        if (!enabled) return;
        try {
            const ctx = new (window.AudioContext || window.webkitAudioContext)();
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(587.33, ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.15);
            gain.gain.setValueAtTime(0.08, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start();
            osc.stop(ctx.currentTime + 0.3);
        } catch (e) { }
    }

    window.applyStoredSettingsToUI = function () {
        // تطبيق حجم الخط
        const size = localStorage.getItem('tabsirah_font_size') || 'medium';
        const chatContainer = document.getElementById('chat-messages');
        if (chatContainer) {
            chatContainer.setAttribute('data-font-size', size);
            chatContainer.classList.remove('text-xs', 'text-sm', 'text-base');
            if (size === 'small') chatContainer.classList.add('text-xs');
            else if (size === 'large') chatContainer.classList.add('text-base');
            else chatContainer.classList.add('text-sm');
        }

        let rootFontSize = '0.9375rem';
        let rootLineHeight = '1.75';
        if (size === 'small') {
            rootFontSize = '0.8125rem';
            rootLineHeight = '1.6';
        } else if (size === 'large') {
            rootFontSize = '1.125rem';
            rootLineHeight = '1.95';
        }
        document.documentElement.style.setProperty('--chat-font-size', rootFontSize);
        document.documentElement.style.setProperty('--chat-line-height', rootLineHeight);

        const chatInput = document.getElementById('chat-input');
        if (chatInput) {
            chatInput.style.fontSize = size === 'small' ? '0.8125rem' : (size === 'large' ? '1.0625rem' : '0.875rem');
        }

        ['small', 'medium', 'large'].forEach(s => {
            const btn = document.getElementById(`btn-font-${s}`);
            if (btn) {
                if (s === size) {
                    btn.className = 'font-size-opt py-2 px-3 rounded-xl border border-emerald-500/40 bg-emerald-600/20 text-emerald-300 text-xs font-medium transition';
                } else {
                    btn.className = 'font-size-opt py-2 px-3 rounded-xl border border-slate-800 bg-slate-950 text-slate-400 text-xs font-medium hover:border-emerald-500/50 transition';
                }
            }
        });

        // تطبيق نوع الخط
        const fontKey = localStorage.getItem('tabsirah_font_family') || 'cairo';
        if (fontKey === 'amiri') {
            document.body.style.fontFamily = "'Amiri', serif";
        } else if (fontKey === 'tajawal') {
            document.body.style.fontFamily = "'Tajawal', sans-serif";
        } else {
            document.body.style.fontFamily = "'Cairo', sans-serif";
        }

        ['cairo', 'amiri', 'tajawal'].forEach(f => {
            const btn = document.getElementById(`btn-font-${f}`);
            if (btn) {
                if (f === fontKey) {
                    btn.className = 'font-fam-opt w-full flex items-center justify-between p-2.5 rounded-xl border border-emerald-500/40 bg-emerald-600/15 text-emerald-300 text-xs transition';
                } else {
                    btn.className = 'font-fam-opt w-full flex items-center justify-between p-2.5 rounded-xl border border-slate-800 bg-slate-950 text-slate-400 text-xs transition hover:border-slate-700';
                }
            }
        });

        // تطبيق لون السمة والتمييز
        const theme = localStorage.getItem('tabsirah_theme_color') || 'emerald';
        const themeColors = {
            emerald: { primary: '#10b981', hover: '#059669', light: 'rgba(16, 185, 129, 0.15)', border: 'rgba(16, 185, 129, 0.3)' },
            gold: { primary: '#f59e0b', hover: '#d97706', light: 'rgba(245, 158, 11, 0.15)', border: 'rgba(245, 158, 11, 0.3)' },
            sky: { primary: '#0ea5e9', hover: '#0284c7', light: 'rgba(14, 165, 233, 0.15)', border: 'rgba(14, 165, 233, 0.3)' },
            purple: { primary: '#8b5cf6', hover: '#7c3aed', light: 'rgba(139, 92, 246, 0.15)', border: 'rgba(139, 92, 246, 0.3)' },
            rose: { primary: '#f43f5e', hover: '#e11d48', light: 'rgba(244, 63, 94, 0.15)', border: 'rgba(244, 63, 94, 0.3)' }
        };

        const activeColors = themeColors[theme] || themeColors.emerald;
        let themeStyle = document.getElementById('theme-dynamic-styles');
        if (!themeStyle) {
            themeStyle = document.createElement('style');
            themeStyle.id = 'theme-dynamic-styles';
            document.head.appendChild(themeStyle);
        }
        themeStyle.innerHTML = `
            :root {
                --theme-pri: ${activeColors.primary};
                --theme-hov: ${activeColors.hover};
            }
            .bg-emerald-600 { background-color: ${activeColors.primary} !important; }
            .bg-emerald-600\\/20, .bg-emerald-600\\/25, .bg-emerald-600\\/30 { background-color: ${activeColors.light} !important; }
            .hover\\:bg-emerald-500:hover { background-color: ${activeColors.hover} !important; }
            .text-emerald-400, .text-emerald-300 { color: ${activeColors.primary} !important; }
            .border-emerald-500\\/30, .border-emerald-500\\/20, .border-emerald-500\\/40 { border-color: ${activeColors.border} !important; }
        `;

        ['emerald', 'gold', 'sky', 'purple', 'rose'].forEach(th => {
            const btn = document.getElementById(`btn-theme-${th}`);
            if (btn) {
                if (th === theme) {
                    btn.className = 'theme-color-btn py-2 px-1.5 rounded-xl border border-emerald-500 bg-slate-800 text-white text-[11px] font-bold flex flex-col items-center gap-1 transition shadow-sm';
                } else {
                    btn.className = 'theme-color-btn py-2 px-1.5 rounded-xl border border-slate-800 bg-slate-950 text-slate-400 text-[11px] font-medium flex flex-col items-center gap-1 transition hover:border-slate-700';
                }
            }
        });

        // تطبيق سواد OLED
        const oledEnabled = localStorage.getItem('tabsirah_oled_black') === 'true';
        const oledCheckbox = document.getElementById('pref-oled-black');
        if (oledCheckbox) oledCheckbox.checked = oledEnabled;
        if (oledEnabled) {
            document.body.classList.add('bg-black');
            document.body.classList.remove('bg-slate-950');
            const mainEl = document.querySelector('main');
            if (mainEl) {
                mainEl.classList.add('bg-black');
                mainEl.classList.remove('bg-slate-950');
            }
        } else {
            document.body.classList.remove('bg-black');
            document.body.classList.add('bg-slate-950');
            const mainEl = document.querySelector('main');
            if (mainEl) {
                mainEl.classList.remove('bg-black');
                mainEl.classList.add('bg-slate-950');
            }
        }

        // تفضيلات الصلاة على النبي
        const salawatPref = localStorage.getItem('tabsirah_salawat');
        const salawatCheckbox = document.getElementById('pref-salawat');
        if (salawatCheckbox && salawatPref !== null) {
            salawatCheckbox.checked = salawatPref !== 'false';
        }

        // تفضيل الصوت
        const soundPref = localStorage.getItem('tabsirah_sound_notify');
        const soundCheckbox = document.getElementById('pref-sound-notify');
        if (soundCheckbox && soundPref !== null) {
            soundCheckbox.checked = soundPref === 'true';
        }

        // النمط الافتراضي
        const defMode = answerMode || 'detailed';
        const detailedBtn = document.getElementById('btn-defmode-detailed');
        const conciseBtn = document.getElementById('btn-defmode-concise');
        if (detailedBtn && conciseBtn) {
            if (defMode === 'detailed') {
                detailedBtn.className = 'def-mode-opt p-2.5 rounded-xl border border-emerald-500/40 bg-emerald-600/20 text-emerald-300 text-xs text-right transition';
                conciseBtn.className = 'def-mode-opt p-2.5 rounded-xl border border-slate-800 bg-slate-950 text-slate-400 text-xs text-right transition hover:border-slate-700';
            } else {
                conciseBtn.className = 'def-mode-opt p-2.5 rounded-xl border border-emerald-500/40 bg-emerald-600/20 text-emerald-300 text-xs text-right transition';
                detailedBtn.className = 'def-mode-opt p-2.5 rounded-xl border border-slate-800 bg-slate-950 text-slate-400 text-xs text-right transition hover:border-slate-700';
            }
        }

        // تفضيل مفتاح Enter
        const enterPref = localStorage.getItem('tabsirah_enter_send');
        const enterCheckbox = document.getElementById('pref-enter-send');
        if (enterCheckbox && enterPref !== null) {
            enterCheckbox.checked = enterPref === 'true';
        }

        // 🧠 تطبيق إعدادات المذهب الفقهي
        const fiqh = localStorage.getItem('tabsirah_fiqh_school') || 'rajih';
        const fiqhNames = {
            rajih: typeof t === 'function' ? t('settings.ai.schoolRajih') : 'الراجح والدليل (افتراضي)',
            hanafi: typeof t === 'function' ? t('settings.ai.schoolHanafi') : 'المذهب الحنفي',
            maliki: typeof t === 'function' ? t('settings.ai.schoolMaliki') : 'المذهب المالكي',
            shafii: typeof t === 'function' ? t('settings.ai.schoolShafii') : 'المذهب الشافعي',
            hanbali: typeof t === 'function' ? t('settings.ai.schoolHanbali') : 'المذهب الحنبلي',
            comparative: typeof t === 'function' ? t('settings.ai.schoolComparative') : 'مقارنة المذاهب الأربعة'
        };
        const fiqhBadge = document.getElementById('current-fiqh-badge');
        if (fiqhBadge && fiqhNames[fiqh]) {
            fiqhBadge.textContent = fiqhNames[fiqh];
        }
        ['rajih', 'hanafi', 'maliki', 'shafii', 'hanbali', 'comparative'].forEach(f => {
            const btn = document.getElementById(`btn-fiqh-${f}`);
            if (btn) {
                if (f === fiqh) {
                    btn.className = 'fiqh-opt p-2.5 rounded-xl border border-emerald-500/40 bg-emerald-600/20 text-emerald-300 text-xs text-right transition font-medium';
                } else {
                    btn.className = 'fiqh-opt p-2.5 rounded-xl border border-slate-800 bg-slate-950 text-slate-400 text-xs text-right transition hover:border-slate-700';
                }
            }
        });

        // 🧠 تطبيق إعدادات نمط وعمق المساعد
        const persona = localStorage.getItem('tabsirah_ai_persona') || 'easy';
        ['easy', 'scholar', 'tarbiyah'].forEach(p => {
            const btn = document.getElementById(`btn-persona-${p}`);
            if (btn) {
                if (p === persona) {
                    btn.className = 'ai-persona-opt w-full p-2.5 rounded-xl border border-emerald-500/40 bg-emerald-600/20 text-emerald-300 text-right transition';
                } else {
                    btn.className = 'ai-persona-opt w-full p-2.5 rounded-xl border border-slate-800 bg-slate-950 text-slate-400 text-right transition hover:border-slate-700';
                }
            }
        });

        // 🧠 تطبيق مفاتيح التبديل
        const clarifyCb = document.getElementById('pref-clarify');
        if (clarifyCb) clarifyCb.checked = localStorage.getItem('tabsirah_clarify_enabled') !== 'false';

        const hadithCb = document.getElementById('pref-hadith-verify');
        if (hadithCb) hadithCb.checked = localStorage.getItem('tabsirah_hadith_verify_enabled') !== 'false';

        const quranCb = document.getElementById('pref-quran-citation');
        if (quranCb) quranCb.checked = localStorage.getItem('tabsirah_quran_citation_enabled') !== 'false';

        // تحديث أزرار اللغة النشطة
        if (typeof updateLanguageButtons === 'function' && typeof getCurrentLang === 'function') {
            updateLanguageButtons(getCurrentLang());
        }
    };
    window.applyStoredSettingsToUI();
});
// تسجيل Service Worker لتفعيل الـ PWA
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js').catch(err => console.log('SW registration failed:', err));
    });
}
// 📱 الكشف المباشر عن جهاز الآيفون وإظهار البنر إذا لم يكن الموقع مثبتاً كـ PWA
document.addEventListener('DOMContentLoaded', () => {
    if (typeof initLanguage === 'function') {
        initLanguage();
    }
    const isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent);
    const isStandalone = window.navigator.standalone || window.matchMedia('(display-mode: standalone)').matches;

    // يظهر البنر فقط إذا كان الجهاز آيفون والموقع مفتوح عبر المتصفح وليس كـ تطبيق مثبّت
    if (isIOS && !isStandalone) {
        const iosBanner = document.getElementById('ios-install-banner');
        if (iosBanner) iosBanner.classList.remove('hidden');
    }
});

// 🖼️ فتح وإغلاق نافذة عرض وتكبير الصور (Lightbox Modal)
window.openImageLightbox = function (imageUrl) {
    const modal = document.getElementById('image-lightbox-modal');
    const img = document.getElementById('lightbox-img');
    if (modal && img) {
        img.src = imageUrl;
        modal.classList.remove('hidden');
    }
};

window.closeImageLightbox = function () {
    const modal = document.getElementById('image-lightbox-modal');
    if (modal) {
        modal.classList.add('hidden');
    }
};
