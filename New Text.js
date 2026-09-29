const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

const onclickRegex = /onclick="([^"]+)"/g;
let match;
const onclicks = [];
while ((match = onclickRegex.exec(html)) !== null) {
  onclicks.push(match[1]);
}
console.log('Total onclick handlers found:', onclicks.length);
const unique = [...new Set(onclicks)];
console.log('Unique handlers:', unique);

// Check if each function is defined on window in bot.js or i18n.js
const botJs = fs.readFileSync('bot.js', 'utf8');
const i18nJs = fs.readFileSync('i18n.js', 'utf8');
const combined = botJs + '\n' + i18nJs;

unique.forEach(handler => {
  // Extract function name
  const fnMatch = handler.match(/([a-zA-Z0-9_]+)\s*\(/);
  if (fnMatch) {
    const fnName = fnMatch[1];
    if (fnName === 'encodeURIComponent' || fnName === 'decodeURIComponent') return;
    const hasDef = combined.includes(`window.${fnName}`) ||
      combined.includes(`function ${fnName}`) ||
      combined.includes(`${fnName} = function`) ||
      combined.includes(`${fnName} = (`);
    if (!hasDef) {
      console.log('MISSING FUNCTION DEFINITION:', fnName, 'in handler:', handler);
    } else {
      console.log('OK:', fnName);
    }
  }
});
