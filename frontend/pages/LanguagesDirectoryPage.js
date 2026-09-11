// BHASHA SETU - TRIBAL LANGUAGE DIRECTORY & REGION SELECTION
let selectedRegionFilter = 'All';

function renderLanguagesDirectoryPage() {
  const languages = [
    {
      id: 'santhali',
      name: 'Santhali / Santali',
      localName: 'ᱥᱟᱱᱛᱟᱲᱤ',
      script: 'Ol Chiki (ᱚᱞ ᱪᱤᱠᱤ) & Roman',
      regions: ['Jharkhand', 'Odisha', 'West Bengal', 'Assam'],
      speakers: '7.6 Million',
      description: 'Major language of the Santhal people with official Recognition under the 8th Schedule of the Indian Constitution. Uses the unique indigenous Ol Chiki alphabet created by Pandit Raghunath Murmu.',
      speechAvailable: 'Phonetic browser engine + FastPitch adapter ready',
      translationStatus: '100+ Verified offline words, greetings & classroom phrases'
    },
    {
      id: 'mundari',
      name: 'Mundari',
      localName: 'मुण्डारी',
      script: 'Devanagari, Roman & Mundari Bani',
      regions: ['Jharkhand', 'Odisha', 'West Bengal'],
      speakers: '1.1 Million',
      description: 'Munda language of Jharkhand, historically central to Birsa Munda’s movement and the Chota Nagpur tribal identity. Rich oral tradition and agricultural terminology.',
      speechAvailable: 'Phonetic browser synthesis fallback',
      translationStatus: 'Verified core vocabulary & classroom phrases'
    },
    {
      id: 'ho',
      name: 'Ho',
      localName: '𑢹𑣉𑣉 𑢶𑣁𑢡𑣂',
      script: 'Warang Citi (𑢹𑣉𑣉) & Roman',
      regions: ['Jharkhand', 'Odisha'],
      speakers: '1.4 Million',
      description: 'Spoken primarily in the Kolhan region of Jharkhand and Mayurbhanj in Odisha. Written in the Warang Citi alphabet devised by Lako Bodra.',
      speechAvailable: 'Phonetic speech engine',
      translationStatus: 'Verified lexicon with Warang Citi glyph mapping'
    },
    {
      id: 'kharia',
      name: 'Kharia',
      localName: 'खड़िया',
      script: 'Roman / Devanagari',
      regions: ['Jharkhand', 'Odisha', 'Chhattisgarh'],
      speakers: '300,000+',
      description: 'Austroasiatic language primarily concentrated in Simdega and Gumla districts of Jharkhand. Endangered oral dialect requiring active classroom preservation.',
      speechAvailable: 'Phonetic audio playback',
      translationStatus: 'Authentic school & family vocabulary'
    },
    {
      id: 'kurukh',
      name: 'Kurukh (Oraon)',
      localName: 'कुड़ुख़',
      script: 'Tolong Siki & Devanagari',
      regions: ['Jharkhand', 'Chhattisgarh', 'Odisha', 'West Bengal'],
      speakers: '2.0 Million+',
      description: 'Northern Dravidian language of the Oraon tribal community. Tolong Siki script developed by Dr. Narayan Oraon in 1999.',
      speechAvailable: 'Phonetic audio support',
      translationStatus: 'Verified greetings, classroom, and number vocabulary'
    }
  ];

  const regions = ['All', 'Jharkhand', 'Odisha', 'West Bengal', 'Chhattisgarh', 'Assam'];
  const filtered = selectedRegionFilter === 'All'
    ? languages
    : languages.filter(l => l.regions.includes(selectedRegionFilter));

  return `
    <div>
      <div style="margin-bottom: 24px;">
        <h1 style="font-size: 26px; font-weight: 800;">Tribal Languages of Eastern &amp; Central India</h1>
        <p style="color: var(--text-muted); font-size: 14px; margin-top: 4px;">
          Linguistic profiles, indigenous scripts, regional mapping, and digital corpus status
        </p>
      </div>

      <!-- REGION SELECTOR (SECTION 19) -->
      <div class="card" style="margin-bottom: 24px; padding: 18px 24px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 14px;">
        <div style="display: flex; align-items: center; gap: 10px;">
          <span style="font-size: 22px;">📍</span>
          <div>
            <div style="font-size: 14px; font-weight: 700;">Select Tribal Region:</div>
            <div style="font-size: 12px; color: var(--text-muted);">Filter languages by state prevalence</div>
          </div>
        </div>

        <div style="display: flex; gap: 8px; flex-wrap: wrap;">
          ${regions.map(r => `
            <button 
              class="btn btn-sm ${selectedRegionFilter === r ? 'btn-primary' : 'btn-outline'}" 
              onclick="setRegionFilter('${r}')">
              ${r}
            </button>
          `).join('')}
        </div>
      </div>

      <!-- LINGUISTIC DISCLAIMER BANNER (SECTION 18) -->
      <div style="margin-bottom: 24px; padding: 16px 20px; background: #FFF8E1; border: 1.5px solid #FFE082; border-radius: var(--radius-md); font-size: 13px; color: #5D4037; line-height: 1.5;">
        <strong>⚠️ Digital Corpus &amp; Dialect Notice:</strong> Language resources and translation quality vary by language and available digital data. Regional sub-dialects (e.g. Santhali spoken in Dumka vs. East Singhbhum) feature subtle phonological variations. Bhasha Setu maintains strict linguistic honesty and does not generate synthetic translations for unindexed phrases.
      </div>

      <!-- LANGUAGE CARDS -->
      <div class="grid grid-2">
        ${filtered.map(l => `
          <div class="card" style="display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">
                <div>
                  <h3 style="font-size: 20px;">${l.name}</h3>
                  <div style="font-size: 16px; color: var(--primary); font-weight: 700;">${l.localName}</div>
                </div>
                <span class="badge badge-primary">${l.speakers}</span>
              </div>

              <div style="font-size: 12px; margin-bottom: 12px;">
                <span style="color: var(--text-muted);">Script:</span> <strong>${l.script}</strong><br>
                <span style="color: var(--text-muted);">Prevalent in:</span> <strong>${l.regions.join(', ')}</strong>
              </div>

              <p style="font-size: 13px; color: var(--text-muted); line-height: 1.5; margin-bottom: 14px;">
                ${l.description}
              </p>

              <div style="background: var(--bg-page); padding: 10px 14px; border-radius: var(--radius-sm); font-size: 12px; margin-bottom: 8px;">
                <strong>Translation Corpus:</strong> ${l.translationStatus}
              </div>

              <div style="background: var(--bg-page); padding: 10px 14px; border-radius: var(--radius-sm); font-size: 12px; margin-bottom: 16px;">
                <strong>Speech Availability:</strong> ${l.speechAvailable}
              </div>
            </div>

            <button class="btn btn-primary btn-sm" onclick="setTranslatorPrompt('नमस्ते', 'Hindi', '${l.name.split(' ')[0]}'); window.location.hash='#translate';">
              🔤 Translate to ${l.name.split(' ')[0]}
            </button>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function setRegionFilter(region) {
  selectedRegionFilter = region;
  const appContent = document.getElementById('app-content');
  if (appContent) appContent.innerHTML = renderLanguagesDirectoryPage();
}