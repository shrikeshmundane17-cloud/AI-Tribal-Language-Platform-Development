// Transliteration Service for Indigenous Indian Scripts
// Supports Ol Chiki (Santhali) & Warang Citi (Ho) Unicode Mappings

// Ol Chiki Unicode (U+1C50 - U+1C7F)
const OL_CHIKI_MAP = {
  // Letters
  'la': 'ᱚ', 'at': 'ᱛ', 'ag': 'ᱜ', 'ang': 'ᱝ', 'al': 'ᱞ',
  'aak': 'ᱟ', 'aaj': 'ᱠ', 'aam': 'ᱡ', 'aaw': 'ᱢ', 'is': 'ᱣ',
  'iss': 'ᱤ', 'ih': 'ᱥ', 'inj': 'ᱦ', 'ir': 'ᱧ', 'uch': 'ᱨ',
  'ud': 'ᱩ', 'enn': 'ᱪ', 'uyy': 'ᱫ', 'ep': 'ᱬ', 'edd': 'ᱭ',
  'en': 'ᱮ', 'err': 'ᱯ', 'ot': 'ᱰ', 'ott': 'ᱱ', 'ob': 'ᱲ',
  'ov': 'ᱳ', 'oh': 'ᱴ', 'mu': 'ᱵ', 'gahla': 'ᱶ', 'relha': 'ᱷ',
  
  // Direct phonetic roman to Ol Chiki approximations
  'a': 'ᱚ', 'aa': 'ᱟ', 'i': 'ᱤ', 'u': 'ᱩ', 'e': 'ᱮ', 'o': 'ᱳ',
  't': 'ᱛ', 'g': 'ᱜ', 'ng': 'ᱝ', 'l': 'ᱞ', 'k': 'ᱠ', 'j': 'ᱡ',
  'm': 'ᱢ', 'w': 'ᱣ', 's': 'ᱥ', 'h': 'ᱦ', 'nj': 'ᱧ', 'r': 'ᱨ',
  'c': 'ᱪ', 'ch': 'ᱪ', 'd': 'ᱫ', 'n': 'ᱱ', 'y': 'ᱭ', 'p': 'ᱯ',
  'b': 'ᱵ', 'v': 'ᱶ',
  
  // Digits
  '0': '᱐', '1': '᱑', '2': '᱒', '3': '᱓', '4': '᱔',
  '5': '᱕', '6': '᱖', '7': '᱗', '8': '᱘', '9': '᱙'
};

// Common Santhali Words directly mapped to Ol Chiki
const SANTHALI_WORD_GLYPHS = {
  'johar': 'ᱡᱚᱦᱟᱨ',
  'dak': 'ᱫᱟᱠ',
  'jom': 'ᱡᱚᱢ',
  'orak': 'ᱚᱲᱟᱠ',
  'dare': 'ᱫᱟᱨᱮ',
  'sinj': 'ᱥᱤᱧ',
  'chando': 'ᱪᱟᱸᱫᱳ',
  'ayo': 'ᱟᱭᱳ',
  'aba': 'ᱟᱵᱟ',
  'ho': 'ᱦᱳ',
  'bang': 'ᱵᱟᱝ',
  'em': 'ᱮᱢ',
  'sen': 'ᱥᱮᱱ',
  'jomo': 'ᱡᱚᱢᱳ',
  'u': 'ᱩ',
  'naon': 'ᱱᱟᱶ',
  'ato': 'ᱟᱛᱳ',
  'bir': 'ᱵᱤᱨ',
  'nit': 'ᱱᱤᱛ',
  'guru': 'ᱜᱩᱨᱩ',
  'hadam': 'ᱦᱟᱲᱟᱢ',
  'puthi': 'ᱯᱩᱛᱷᱤ',
  'iskul': 'ᱤᱥᱠᱩᱞ',
  'klas': 'ᱠᱞᱟᱥ',
  'path': 'ᱯᱟᱴᱷ',
  'likho': 'ᱞᱤᱠᱷᱳ',
  'paro': 'ᱯᱟᱲᱳ',
  'bujhav': 'ᱵᱩᱡᱷᱟᱹᱣ',
  'sawal': 'ᱥᱟᱣᱟᱞ',
  'jawab': 'ᱡᱟᱣᱟᱵ',
  'thik': 'ᱴᱷᱤᱠ',
  'galat': 'ᱜᱟᱞᱟᱛ',
  'mit': 'ᱢᱤᱛ',
  'bar': 'ᱵᱟᱨ',
  'pe': 'ᱯᱮ',
  'pun': 'ᱯᱩᱱ',
  'more': 'ᱢᱳᱲᱮ',
  'turui': 'ᱛᱩᱨᱩᱭ',
  'eyae': 'ᱮᱭᱟᱭ',
  'iral': 'ᱤᱨᱟᱹᱞ',
  'are': 'ᱟᱨᱮ',
  'gel': 'ᱜᱮᱞ',
  'sukun': 'ᱥᱩᱠᱩᱱ',
  'bihan': 'ᱵᱤᱦᱟᱱ',
  'sam': 'ᱥᱟᱢ',
  'alay': 'ᱟᱞᱟᱭ',
  'seva': 'ᱥᱮᱣᱟ',
  'daram': 'ᱫᱟᱨᱟᱢ'
};

// Warang Citi Unicode (U+118A0 - U+118DF)
const WARANG_CITI_WORD_GLYPHS = {
  'ho': '𑢹𑣉𑣉',
  'johar': '𑢽𑣉𑢡𑣁𑣜',
  'dak': '𑢵𑣁𑢲',
  'jom': '𑢽𑣉𑢶',
  'orak': '𑢡𑣉𑢲𑣁𑢲',
  'guru': '𑢱𑣃𑣜𑣃',
  'chela': '𑢾𑣈𑢬𑣁',
  'iskul': '𑢱𑣈𑢲𑣁𑢬',
  'paro': '𑢹𑣁𑣜𑣉',
  'likho': '𑢬𑣂𑢲𑣉',
  'mind': '𑢾𑣂𑢳',
  'bari': '𑢤𑣁𑣜𑣂',
  'peng': '𑢹𑣈𑢱',
  'puni': '𑢹𑣃𑢳𑣂',
  'mone': '𑢶𑣉𑢳𑣈',
  'ayo': '𑢡𑣁𑢡𑣉',
  'aba': '𑢡𑣁𑢤𑣁',
  'atu': '𑢡𑣁𑢴𑣃',
  'sing': '𑢾𑣂𑢱',
  'chand': '𑢾𑣁𑢳𑢵'
};

class TransliterationService {
  /**
   * Convert Roman Santhali to Ol Chiki script
   */
  toOlChiki(text) {
    if (!text) return '';
    const words = text.split(/\b/);
    return words.map(w => {
      const lower = w.toLowerCase().trim();
      if (SANTHALI_WORD_GLYPHS[lower]) {
        return SANTHALI_WORD_GLYPHS[lower];
      }
      // Character fallback
      let converted = '';
      let i = 0;
      while (i < lower.length) {
        if (i + 2 <= lower.length && OL_CHIKI_MAP[lower.substring(i, i + 2)]) {
          converted += OL_CHIKI_MAP[lower.substring(i, i + 2)];
          i += 2;
        } else if (OL_CHIKI_MAP[lower[i]]) {
          converted += OL_CHIKI_MAP[lower[i]];
          i += 1;
        } else {
          converted += w[i] || '';
          i += 1;
        }
      }
      return converted || w;
    }).join('');
  }

  /**
   * Convert Roman Ho to Warang Citi script
   */
  toWarangCiti(text) {
    if (!text) return '';
    const words = text.split(/\b/);
    return words.map(w => {
      const lower = w.toLowerCase().trim();
      if (WARANG_CITI_WORD_GLYPHS[lower]) {
        return WARANG_CITI_WORD_GLYPHS[lower];
      }
      return w;
    }).join('');
  }

  /**
   * Universal script generator based on target language
   */
  getScriptRepresentations(text, languageId) {
    const lang = (languageId || '').toLowerCase();
    const result = {
      roman: text,
      nativeScript: text,
      scriptName: 'Roman'
    };

    if (lang === 'santhali' || lang === 'sat') {
      result.nativeScript = this.toOlChiki(text);
      result.scriptName = 'Ol Chiki (ᱚᱞ ᱪᱤᱠᱤ)';
    } else if (lang === 'ho' || lang === 'hoc') {
      result.nativeScript = this.toWarangCiti(text);
      result.scriptName = 'Warang Citi (𑢹𑣉𑣉 𑢶𑣁𑢡𑣂)';
    } else if (lang === 'mundari' || lang === 'unr') {
      result.scriptName = 'Devanagari / Roman';
    } else if (lang === 'kharia' || lang === 'khr') {
      result.scriptName = 'Devanagari / Roman';
    } else if (lang === 'kurukh' || lang === 'kru') {
      result.scriptName = 'Tolong Siki / Devanagari';
    }

    return result;
  }
}

module.exports = new TransliterationService();