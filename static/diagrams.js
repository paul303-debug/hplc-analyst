/**
 * HPLC Equipment Diagrams — inline SVGs with CSS animations.
 * Rendered when the assistant includes [diagram:<key>] in a response.
 */

const DIAGRAMS = {

  /* ───────────── 1. Full HPLC System Flow ───────────── */
  "hplc-system": {
    title: "Agilent 1290 Infinity II — System Flow",
    svg: `
<svg viewBox="0 0 820 260" xmlns="http://www.w3.org/2000/svg" class="hplc-diagram">
  <defs>
    <marker id="arrow" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
      <path d="M0,0 L8,3 L0,6 Z" fill="#3b82f6"/>
    </marker>
    <linearGradient id="flowGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#3b82f6" stop-opacity="0.1"/>
      <stop offset="50%" stop-color="#3b82f6" stop-opacity="0.5"/>
      <stop offset="100%" stop-color="#3b82f6" stop-opacity="0.1"/>
    </linearGradient>
  </defs>

  <!-- Flow line (tubing) -->
  <path d="M90,130 H175 M225,130 H310 M360,130 H450 M500,130 H590 M640,130 H730"
        stroke="#93c5fd" stroke-width="3" fill="none" marker-end="url(#arrow)"/>

  <!-- Animated flow particles -->
  <circle r="4" fill="#3b82f6" opacity="0.8">
    <animateMotion dur="4s" repeatCount="indefinite"
      path="M90,130 H175 M225,130 H310 M360,130 H450 M500,130 H590 M640,130 H730"/>
  </circle>
  <g class="flow-particles">
    <circle cx="0" cy="130" r="3" fill="#3b82f6" opacity="0.7"><animate attributeName="cx" values="90;730" dur="4s" repeatCount="indefinite"/></circle>
    <circle cx="0" cy="130" r="3" fill="#60a5fa" opacity="0.5"><animate attributeName="cx" values="90;730" dur="4s" begin="1s" repeatCount="indefinite"/></circle>
    <circle cx="0" cy="130" r="3" fill="#93c5fd" opacity="0.4"><animate attributeName="cx" values="90;730" dur="4s" begin="2s" repeatCount="indefinite"/></circle>
  </g>

  <!-- 1. Solvent Reservoirs -->
  <g transform="translate(10,70)">
    <rect width="80" height="90" rx="6" fill="#f0f9ff" stroke="#3b82f6" stroke-width="1.5"/>
    <text x="40" y="35" text-anchor="middle" font-size="11" font-weight="600" fill="#1e40af">Solvent</text>
    <text x="40" y="50" text-anchor="middle" font-size="11" font-weight="600" fill="#1e40af">Reservoirs</text>
    <!-- Bottles -->
    <rect x="12" y="60" width="18" height="22" rx="2" fill="#bfdbfe" stroke="#3b82f6" stroke-width="1"/>
    <text x="21" y="75" text-anchor="middle" font-size="8" fill="#1e40af">A</text>
    <rect x="50" y="60" width="18" height="22" rx="2" fill="#dbeafe" stroke="#3b82f6" stroke-width="1"/>
    <text x="59" y="75" text-anchor="middle" font-size="8" fill="#1e40af">B</text>
  </g>

  <!-- 2. Binary Pump -->
  <g transform="translate(150,75)">
    <rect width="80" height="80" rx="6" fill="#f0f9ff" stroke="#3b82f6" stroke-width="1.5"/>
    <text x="40" y="30" text-anchor="middle" font-size="11" font-weight="600" fill="#1e40af">Binary</text>
    <text x="40" y="45" text-anchor="middle" font-size="11" font-weight="600" fill="#1e40af">Pump</text>
    <text x="40" y="65" text-anchor="middle" font-size="9" fill="#64748b">1300 bar</text>
    <!-- Pump icon -->
    <circle cx="40" cy="58" r="0" fill="none" stroke="#3b82f6" stroke-width="1" opacity="0.4">
      <animate attributeName="r" values="0;12;0" dur="1.5s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="0.6;0;0.6" dur="1.5s" repeatCount="indefinite"/>
    </circle>
  </g>

  <!-- 3. Autosampler -->
  <g transform="translate(290,75)">
    <rect width="80" height="80" rx="6" fill="#f0f9ff" stroke="#3b82f6" stroke-width="1.5"/>
    <text x="40" y="30" text-anchor="middle" font-size="11" font-weight="600" fill="#1e40af">Auto-</text>
    <text x="40" y="45" text-anchor="middle" font-size="11" font-weight="600" fill="#1e40af">sampler</text>
    <text x="40" y="65" text-anchor="middle" font-size="9" fill="#64748b">Inject</text>
  </g>

  <!-- 4. Column Compartment -->
  <g transform="translate(430,65)">
    <rect width="80" height="100" rx="6" fill="#fefce8" stroke="#ca8a04" stroke-width="1.5"/>
    <text x="40" y="25" text-anchor="middle" font-size="11" font-weight="600" fill="#854d0e">Column</text>
    <text x="40" y="40" text-anchor="middle" font-size="9" fill="#854d0e">Thermostatted</text>
    <!-- Column tube -->
    <rect x="25" y="50" width="30" height="40" rx="3" fill="#fef3c7" stroke="#ca8a04" stroke-width="1"/>
    <text x="40" y="75" text-anchor="middle" font-size="8" fill="#854d0e">C18</text>
    <text x="40" y="97" text-anchor="middle" font-size="8" fill="#92400e">±0.1°C</text>
  </g>

  <!-- 5. Detector -->
  <g transform="translate(570,75)">
    <rect width="80" height="80" rx="6" fill="#f0fdf4" stroke="#16a34a" stroke-width="1.5"/>
    <text x="40" y="30" text-anchor="middle" font-size="11" font-weight="600" fill="#166534">Detector</text>
    <text x="40" y="48" text-anchor="middle" font-size="9" fill="#166534">DAD / FLD</text>
    <text x="40" y="62" text-anchor="middle" font-size="9" fill="#166534">ELSD / MS</text>
  </g>

  <!-- 6. Data System -->
  <g transform="translate(720,80)">
    <rect width="80" height="70" rx="6" fill="#faf5ff" stroke="#7c3aed" stroke-width="1.5"/>
    <text x="40" y="28" text-anchor="middle" font-size="11" font-weight="600" fill="#5b21b6">Data</text>
    <text x="40" y="43" text-anchor="middle" font-size="11" font-weight="600" fill="#5b21b6">System</text>
    <text x="40" y="60" text-anchor="middle" font-size="8" fill="#7c3aed">OpenLab CDS</text>
  </g>

  <!-- Waste -->
  <g>
    <line x1="730" y1="155" x2="730" y2="210" stroke="#94a3b8" stroke-width="2" stroke-dasharray="4"/>
    <text x="730" y="230" text-anchor="middle" font-size="10" fill="#94a3b8">Waste</text>
  </g>

  <!-- Title -->
  <text x="410" y="25" text-anchor="middle" font-size="13" font-weight="700" fill="#1e293b">
    Agilent 1290 Infinity II — HPLC Flow Path
  </text>

  <!-- Flow direction label -->
  <text x="410" y="250" text-anchor="middle" font-size="10" fill="#94a3b8">
    Mobile phase flow →
  </text>
</svg>`
  },

  /* ───────────── 2. Column Separation ───────────── */
  "column-separation": {
    title: "Chromatographic Separation",
    svg: `
<svg viewBox="0 0 700 320" xmlns="http://www.w3.org/2000/svg" class="hplc-diagram">
  <text x="350" y="22" text-anchor="middle" font-size="13" font-weight="700" fill="#1e293b">
    Column Separation — Differential Migration
  </text>

  <!-- Column body -->
  <g transform="translate(60,40)">
    <rect x="0" y="0" width="180" height="250" rx="8" fill="#fefce8" stroke="#ca8a04" stroke-width="2"/>
    <text x="90" y="-8" text-anchor="middle" font-size="10" fill="#854d0e" font-weight="600">Column (C18 Stationary Phase)</text>

    <!-- Packing particles (static) -->
    <g fill="#e5e7eb" opacity="0.5">
      <circle cx="25" cy="30" r="6"/><circle cx="45" cy="35" r="5"/><circle cx="70" cy="28" r="6"/>
      <circle cx="95" cy="32" r="5"/><circle cx="120" cy="30" r="6"/><circle cx="145" cy="35" r="5"/>
      <circle cx="160" cy="28" r="6"/><circle cx="35" cy="55" r="5"/><circle cx="60" cy="58" r="6"/>
      <circle cx="85" cy="52" r="5"/><circle cx="110" cy="56" r="6"/><circle cx="135" cy="60" r="5"/>
      <circle cx="155" cy="55" r="6"/><circle cx="20" cy="80" r="5"/><circle cx="50" cy="82" r="6"/>
      <circle cx="75" cy="78" r="5"/><circle cx="100" cy="85" r="6"/><circle cx="130" cy="80" r="5"/>
      <circle cx="160" cy="82" r="6"/><circle cx="30" cy="108" r="5"/><circle cx="55" cy="105" r="6"/>
      <circle cx="80" cy="110" r="5"/><circle cx="110" cy="108" r="6"/><circle cx="140" cy="105" r="5"/>
      <circle cx="25" cy="135" r="6"/><circle cx="50" cy="132" r="5"/><circle cx="75" cy="138" r="6"/>
      <circle cx="105" cy="135" r="5"/><circle cx="130" cy="130" r="6"/><circle cx="155" cy="136" r="5"/>
      <circle cx="35" cy="162" r="6"/><circle cx="65" cy="158" r="5"/><circle cx="90" cy="165" r="6"/>
      <circle cx="120" cy="160" r="5"/><circle cx="150" cy="162" r="6"/><circle cx="20" cy="190" r="5"/>
      <circle cx="50" cy="185" r="6"/><circle cx="80" cy="192" r="5"/><circle cx="110" cy="188" r="6"/>
      <circle cx="140" cy="190" r="5"/><circle cx="165" cy="185" r="6"/>
      <circle cx="30" cy="215" r="5"/><circle cx="60" cy="218" r="6"/><circle cx="90" cy="212" r="5"/>
      <circle cx="120" cy="215" r="6"/><circle cx="150" cy="218" r="5"/>
    </g>

    <!-- Analyte band A (fast — weak interaction, moves quickly) -->
    <rect x="5" y="0" width="170" height="24" rx="4" fill="#22c55e" opacity="0.6">
      <animate attributeName="y" values="0;230" dur="3s" repeatCount="indefinite"/>
      <animate attributeName="height" values="24;16" dur="3s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="0.7;0.5" dur="3s" repeatCount="indefinite"/>
    </rect>

    <!-- Analyte band B (medium) -->
    <rect x="5" y="0" width="170" height="24" rx="4" fill="#f59e0b" opacity="0.6">
      <animate attributeName="y" values="0;150" dur="3s" repeatCount="indefinite"/>
      <animate attributeName="height" values="24;20" dur="3s" repeatCount="indefinite"/>
    </rect>

    <!-- Analyte band C (slow — strong interaction with stationary phase) -->
    <rect x="5" y="0" width="170" height="24" rx="4" fill="#ef4444" opacity="0.6">
      <animate attributeName="y" values="0;80" dur="3s" repeatCount="indefinite"/>
      <animate attributeName="height" values="24;22" dur="3s" repeatCount="indefinite"/>
    </rect>

    <!-- Inlet arrow -->
    <line x1="90" y1="-25" x2="90" y2="0" stroke="#3b82f6" stroke-width="2" marker-end="url(#arrow2)"/>
    <text x="90" y="-30" text-anchor="middle" font-size="9" fill="#3b82f6">Sample + Mobile Phase</text>
  </g>

  <defs>
    <marker id="arrow2" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
      <path d="M0,0 L8,3 L0,6 Z" fill="#3b82f6"/>
    </marker>
  </defs>

  <!-- Legend -->
  <g transform="translate(300,60)">
    <text x="0" y="0" font-size="12" font-weight="600" fill="#1e293b">How It Works</text>
    <text x="0" y="22" font-size="10" fill="#475569">Different analytes interact with the</text>
    <text x="0" y="36" font-size="10" fill="#475569">stationary phase at different strengths,</text>
    <text x="0" y="50" font-size="10" fill="#475569">causing them to migrate at different speeds.</text>

    <rect x="0" y="70" width="14" height="14" rx="2" fill="#22c55e" opacity="0.7"/>
    <text x="22" y="82" font-size="10" fill="#475569">Analyte A — weak retention (elutes first)</text>

    <rect x="0" y="92" width="14" height="14" rx="2" fill="#f59e0b" opacity="0.7"/>
    <text x="22" y="104" font-size="10" fill="#475569">Analyte B — moderate retention</text>

    <rect x="0" y="114" width="14" height="14" rx="2" fill="#ef4444" opacity="0.7"/>
    <text x="22" y="126" font-size="10" fill="#475569">Analyte C — strong retention (elutes last)</text>
  </g>

  <!-- Resulting chromatogram mini -->
  <g transform="translate(300,210)">
    <text x="0" y="0" font-size="11" font-weight="600" fill="#1e293b">Resulting Chromatogram</text>
    <line x1="0" y1="80" x2="350" y2="80" stroke="#cbd5e1" stroke-width="1"/>
    <line x1="0" y1="15" x2="0" y2="80" stroke="#cbd5e1" stroke-width="1"/>
    <text x="175" y="98" text-anchor="middle" font-size="9" fill="#94a3b8">Retention Time →</text>
    <text x="-8" y="50" text-anchor="middle" font-size="9" fill="#94a3b8" transform="rotate(-90,-8,50)">Signal</text>

    <!-- Peaks -->
    <path d="M60,80 Q70,30 80,80" fill="none" stroke="#22c55e" stroke-width="2" class="draw-peak" style="--delay:0s"/>
    <path d="M150,80 Q165,20 180,80" fill="none" stroke="#f59e0b" stroke-width="2" class="draw-peak" style="--delay:0.5s"/>
    <path d="M260,80 Q280,15 300,80" fill="none" stroke="#ef4444" stroke-width="2" class="draw-peak" style="--delay:1s"/>
    <text x="70" y="75" text-anchor="middle" font-size="8" fill="#22c55e">A</text>
    <text x="165" y="75" text-anchor="middle" font-size="8" fill="#f59e0b">B</text>
    <text x="280" y="75" text-anchor="middle" font-size="8" fill="#ef4444">C</text>
  </g>
</svg>`
  },

  /* ───────────── 3. ESI-MS Interface ───────────── */
  "ms-source": {
    title: "LC/MS — Electrospray Ionization (ESI)",
    svg: `
<svg viewBox="0 0 740 280" xmlns="http://www.w3.org/2000/svg" class="hplc-diagram">
  <text x="370" y="22" text-anchor="middle" font-size="13" font-weight="700" fill="#1e293b">
    Electrospray Ionization (ESI) — LC/MS Interface
  </text>

  <!-- HPLC Eluent inlet -->
  <g transform="translate(20,80)">
    <rect width="100" height="50" rx="6" fill="#eff6ff" stroke="#3b82f6" stroke-width="1.5"/>
    <text x="50" y="22" text-anchor="middle" font-size="10" font-weight="600" fill="#1e40af">HPLC</text>
    <text x="50" y="36" text-anchor="middle" font-size="10" font-weight="600" fill="#1e40af">Eluent</text>
  </g>

  <!-- Capillary / Spray needle -->
  <g transform="translate(130,90)">
    <rect width="120" height="6" rx="2" fill="#94a3b8"/>
    <rect width="120" height="6" rx="2" y="24" fill="#94a3b8"/>
    <text x="60" y="20" text-anchor="middle" font-size="9" fill="#64748b">Spray Needle</text>
    <!-- Voltage label -->
    <text x="60" y="48" text-anchor="middle" font-size="9" fill="#dc2626" font-weight="600">+3-5 kV</text>
  </g>

  <!-- Spray / Taylor Cone -->
  <g transform="translate(260,85)">
    <!-- Taylor cone shape -->
    <polygon points="0,0 0,30 30,15" fill="#bfdbfe" opacity="0.6"/>
    <!-- Spray droplets (animated) -->
    <g class="spray-droplets">
      <circle cx="40" cy="15" r="4" fill="#3b82f6" opacity="0.6">
        <animate attributeName="cx" values="30;120" dur="1.5s" repeatCount="indefinite"/>
        <animate attributeName="r" values="4;2;1" dur="1.5s" repeatCount="indefinite"/>
        <animate attributeName="opacity" values="0.7;0.4;0" dur="1.5s" repeatCount="indefinite"/>
      </circle>
      <circle cx="40" cy="8" r="3" fill="#60a5fa" opacity="0.5">
        <animate attributeName="cx" values="30;110" dur="1.5s" begin="0.3s" repeatCount="indefinite"/>
        <animate attributeName="cy" values="8;5" dur="1.5s" begin="0.3s" repeatCount="indefinite"/>
        <animate attributeName="r" values="3;1.5;0.5" dur="1.5s" begin="0.3s" repeatCount="indefinite"/>
      </circle>
      <circle cx="40" cy="22" r="3" fill="#60a5fa" opacity="0.5">
        <animate attributeName="cx" values="30;115" dur="1.5s" begin="0.6s" repeatCount="indefinite"/>
        <animate attributeName="cy" values="22;25" dur="1.5s" begin="0.6s" repeatCount="indefinite"/>
        <animate attributeName="r" values="3;1.5;0.5" dur="1.5s" begin="0.6s" repeatCount="indefinite"/>
      </circle>
      <circle cx="40" cy="12" r="2.5" fill="#93c5fd" opacity="0.4">
        <animate attributeName="cx" values="30;100" dur="1.5s" begin="0.9s" repeatCount="indefinite"/>
        <animate attributeName="r" values="2.5;1;0.3" dur="1.5s" begin="0.9s" repeatCount="indefinite"/>
      </circle>
    </g>
    <text x="70" y="50" text-anchor="middle" font-size="9" fill="#3b82f6">Charged Droplets</text>
  </g>

  <!-- Desolvation region -->
  <g transform="translate(380,55)">
    <rect width="80" height="90" rx="6" fill="#fefce8" stroke="#ca8a04" stroke-width="1.5" stroke-dasharray="4"/>
    <text x="40" y="20" text-anchor="middle" font-size="9" font-weight="600" fill="#854d0e">Desolvation</text>
    <!-- Drying gas arrows -->
    <text x="40" y="40" text-anchor="middle" font-size="8" fill="#ca8a04">N₂ gas</text>
    <text x="40" y="55" text-anchor="middle" font-size="8" fill="#ca8a04">+ heat</text>
    <!-- Ion symbols -->
    <text x="25" y="78" font-size="10" fill="#dc2626" font-weight="600">[M+H]⁺</text>
  </g>

  <!-- MS Inlet -->
  <g transform="translate(480,60)">
    <rect width="80" height="80" rx="6" fill="#f0fdf4" stroke="#16a34a" stroke-width="1.5"/>
    <text x="40" y="22" text-anchor="middle" font-size="9" font-weight="600" fill="#166534">Capillary</text>
    <text x="40" y="36" text-anchor="middle" font-size="9" font-weight="600" fill="#166534">Inlet</text>
    <text x="40" y="58" text-anchor="middle" font-size="9" fill="#166534">Sampling</text>
    <text x="40" y="72" text-anchor="middle" font-size="9" fill="#166534">Cone</text>
  </g>

  <!-- Mass Analyzer -->
  <g transform="translate(580,50)">
    <rect width="130" height="100" rx="8" fill="#faf5ff" stroke="#7c3aed" stroke-width="2"/>
    <text x="65" y="25" text-anchor="middle" font-size="10" font-weight="600" fill="#5b21b6">Triple Quad</text>
    <text x="65" y="42" text-anchor="middle" font-size="10" font-weight="600" fill="#5b21b6">Mass Analyzer</text>
    <!-- Q1 → Q2 → Q3 -->
    <g transform="translate(10,55)">
      <rect width="28" height="30" rx="3" fill="#e9d5ff" stroke="#7c3aed" stroke-width="1"/>
      <text x="14" y="19" text-anchor="middle" font-size="9" fill="#5b21b6">Q1</text>
      <rect x="38" width="28" height="30" rx="3" fill="#e9d5ff" stroke="#7c3aed" stroke-width="1"/>
      <text x="52" y="19" text-anchor="middle" font-size="9" fill="#5b21b6">Q2</text>
      <rect x="76" width="28" height="30" rx="3" fill="#e9d5ff" stroke="#7c3aed" stroke-width="1"/>
      <text x="90" y="19" text-anchor="middle" font-size="9" fill="#5b21b6">Q3</text>
      <!-- Arrows between quads -->
      <line x1="30" y1="15" x2="36" y2="15" stroke="#7c3aed" stroke-width="1.5"/>
      <line x1="68" y1="15" x2="74" y2="15" stroke="#7c3aed" stroke-width="1.5"/>
    </g>
  </g>

  <!-- Connecting arrows -->
  <line x1="122" y1="105" x2="130" y2="105" stroke="#94a3b8" stroke-width="2"/>
  <line x1="462" y1="100" x2="478" y2="100" stroke="#94a3b8" stroke-width="2"/>
  <line x1="562" y1="100" x2="578" y2="100" stroke="#94a3b8" stroke-width="2"/>

  <!-- Bottom labels -->
  <g transform="translate(0,200)">
    <text x="20" y="10" font-size="10" font-weight="600" fill="#1e293b">Process:</text>
    <text x="20" y="28" font-size="9" fill="#475569">1. HPLC eluent enters spray needle under high voltage</text>
    <text x="20" y="43" font-size="9" fill="#475569">2. Taylor cone forms → charged droplets spray into chamber</text>
    <text x="20" y="58" font-size="9" fill="#475569">3. Heated N₂ gas desolvates droplets → bare ions form</text>
    <text x="20" y="73" font-size="9" fill="#475569">4. Ions enter mass analyzer for m/z separation (MRM mode)</text>
  </g>
</svg>`
  },

  /* ───────────── 4. Animated Chromatogram ───────────── */
  "chromatogram": {
    title: "HPLC Chromatogram — Reading the Output",
    svg: `
<svg viewBox="0 0 720 310" xmlns="http://www.w3.org/2000/svg" class="hplc-diagram">
  <text x="360" y="22" text-anchor="middle" font-size="13" font-weight="700" fill="#1e293b">
    HPLC Chromatogram — Key Parameters
  </text>

  <!-- Axes -->
  <line x1="60" y1="220" x2="680" y2="220" stroke="#1e293b" stroke-width="1.5"/>
  <line x1="60" y1="220" x2="60" y2="40" stroke="#1e293b" stroke-width="1.5"/>

  <!-- Axis labels -->
  <text x="370" y="245" text-anchor="middle" font-size="11" fill="#1e293b">Retention Time (min)</text>
  <text x="25" y="130" text-anchor="middle" font-size="11" fill="#1e293b" transform="rotate(-90,25,130)">Detector Response (mAU)</text>

  <!-- Time ticks -->
  <g font-size="9" fill="#64748b">
    <line x1="60" y1="220" x2="60" y2="225" stroke="#64748b"/><text x="60" y="236" text-anchor="middle">0</text>
    <line x1="160" y1="220" x2="160" y2="225" stroke="#64748b"/><text x="160" y="236" text-anchor="middle">2</text>
    <line x1="260" y1="220" x2="260" y2="225" stroke="#64748b"/><text x="260" y="236" text-anchor="middle">4</text>
    <line x1="360" y1="220" x2="360" y2="225" stroke="#64748b"/><text x="360" y="236" text-anchor="middle">6</text>
    <line x1="460" y1="220" x2="460" y2="225" stroke="#64748b"/><text x="460" y="236" text-anchor="middle">8</text>
    <line x1="560" y1="220" x2="560" y2="225" stroke="#64748b"/><text x="560" y="236" text-anchor="middle">10</text>
    <line x1="660" y1="220" x2="660" y2="225" stroke="#64748b"/><text x="660" y="236" text-anchor="middle">12</text>
  </g>

  <!-- Baseline -->
  <line x1="60" y1="218" x2="680" y2="218" stroke="#e2e8f0" stroke-width="1"/>

  <!-- Chromatogram trace (animated drawing) -->
  <path class="chromatogram-trace" d="
    M60,218
    L100,218
    Q115,218 120,210 Q130,185 140,150 Q150,100 155,80 Q160,60 165,80 Q170,100 180,150 Q190,185 200,210 Q205,218 210,218
    L280,218
    Q295,218 300,210 Q310,170 320,120 Q330,70 340,55 Q345,48 350,55 Q360,70 370,120 Q380,170 390,210 Q395,218 400,218
    L440,218
    Q450,218 455,212 Q462,195 470,170 Q478,145 482,138 Q486,132 490,138 Q498,160 505,180 Q512,200 518,212 Q522,218 530,218
    L680,218
  " fill="none" stroke="#3b82f6" stroke-width="2.5"
     stroke-dasharray="1200" stroke-dashoffset="1200">
    <animate attributeName="stroke-dashoffset" from="1200" to="0" dur="3s" fill="freeze" begin="0.5s"/>
  </path>

  <!-- Peak labels (fade in after trace draws) -->
  <g opacity="0">
    <animate attributeName="opacity" from="0" to="1" dur="0.5s" fill="freeze" begin="2s"/>

    <!-- Peak 1 — Solvent front / void -->
    <text x="165" y="55" text-anchor="middle" font-size="9" fill="#64748b">t₀</text>
    <line x1="165" y1="60" x2="165" y2="75" stroke="#cbd5e1" stroke-width="1" stroke-dasharray="3"/>

    <!-- Peak 2 — Main API peak -->
    <text x="345" y="38" text-anchor="middle" font-size="9" font-weight="600" fill="#1e40af">API Peak</text>
    <line x1="345" y1="42" x2="345" y2="50" stroke="#3b82f6" stroke-width="1" stroke-dasharray="3"/>

    <!-- Peak 3 — Impurity -->
    <text x="485" y="122" text-anchor="middle" font-size="9" fill="#dc2626">Impurity</text>
    <line x1="485" y1="126" x2="485" y2="132" stroke="#ef4444" stroke-width="1" stroke-dasharray="3"/>

    <!-- Resolution annotation -->
    <line x1="350" y1="225" x2="485" y2="225" stroke="#f59e0b" stroke-width="1.5"/>
    <line x1="350" y1="222" x2="350" y2="228" stroke="#f59e0b" stroke-width="1.5"/>
    <line x1="485" y1="222" x2="485" y2="228" stroke="#f59e0b" stroke-width="1.5"/>
    <text x="418" y="237" text-anchor="middle" font-size="9" fill="#f59e0b" font-weight="600">Resolution (Rs)</text>
  </g>

  <!-- Key parameters legend -->
  <g transform="translate(60,260)" opacity="0">
    <animate attributeName="opacity" from="0" to="1" dur="0.5s" fill="freeze" begin="3s"/>
    <text x="0" y="10" font-size="10" font-weight="600" fill="#1e293b">Key Parameters:</text>
    <text x="0" y="28" font-size="9" fill="#475569">t₀ = void time  |  tR = retention time  |  Rs ≥ 2.0 for baseline separation  |  Tailing factor ≤ 2.0 (USP)</text>
    <text x="0" y="43" font-size="9" fill="#475569">System Suitability: RSD ≤ 2.0% (n=5), Resolution, Theoretical Plates (N ≥ 2000)</text>
  </g>
</svg>`
  },

  /* ───────────── 5. Pressure Diagnostics ───────────── */
  "troubleshooting-pressure": {
    title: "Pressure Troubleshooting Guide",
    svg: `
<svg viewBox="0 0 750 380" xmlns="http://www.w3.org/2000/svg" class="hplc-diagram">
  <text x="375" y="22" text-anchor="middle" font-size="13" font-weight="700" fill="#1e293b">
    HPLC Pressure Troubleshooting — Decision Tree
  </text>

  <!-- Root question -->
  <g transform="translate(275,40)">
    <rect width="200" height="40" rx="8" fill="#3b82f6" stroke="none"/>
    <text x="100" y="25" text-anchor="middle" font-size="11" font-weight="600" fill="white">Pressure Problem?</text>
  </g>

  <!-- Branch lines from root -->
  <line x1="315" y1="80" x2="150" y2="115" stroke="#94a3b8" stroke-width="1.5"/>
  <line x1="375" y1="80" x2="375" y2="115" stroke="#94a3b8" stroke-width="1.5"/>
  <line x1="435" y1="80" x2="600" y2="115" stroke="#94a3b8" stroke-width="1.5"/>

  <!-- HIGH PRESSURE branch -->
  <g transform="translate(50,115)">
    <rect width="200" height="35" rx="6" fill="#fef2f2" stroke="#ef4444" stroke-width="1.5"/>
    <text x="100" y="22" text-anchor="middle" font-size="11" font-weight="600" fill="#dc2626">Too HIGH</text>
  </g>
  <g transform="translate(10,170)" font-size="9" fill="#475569">
    <rect width="280" height="115" rx="6" fill="#fff" stroke="#e5e7eb" stroke-width="1"/>
    <text x="15" y="20" font-weight="600" fill="#1e293b">Check (top → bottom):</text>
    <circle cx="15" cy="37" r="3" fill="#ef4444"/>
    <text x="25" y="40">Inline filter / guard column clogged?</text>
    <circle cx="15" cy="55" r="3" fill="#ef4444"/>
    <text x="25" y="58">Column inlet frit blocked?</text>
    <circle cx="15" cy="73" r="3" fill="#ef4444"/>
    <text x="25" y="76">Column degraded? (check backpressure)</text>
    <circle cx="15" cy="91" r="3" fill="#ef4444"/>
    <text x="25" y="94">Tubing kinked or wrong ID?</text>
    <circle cx="15" cy="109" r="3" fill="#ef4444"/>
    <text x="25" y="112">Mobile phase viscosity too high?</text>
  </g>

  <!-- FLUCTUATING branch -->
  <g transform="translate(275,115)">
    <rect width="200" height="35" rx="6" fill="#fefce8" stroke="#f59e0b" stroke-width="1.5"/>
    <text x="100" y="22" text-anchor="middle" font-size="11" font-weight="600" fill="#d97706">Fluctuating</text>
  </g>
  <g transform="translate(240,170)" font-size="9" fill="#475569">
    <rect width="270" height="115" rx="6" fill="#fff" stroke="#e5e7eb" stroke-width="1"/>
    <text x="15" y="20" font-weight="600" fill="#1e293b">Check (most common first):</text>
    <circle cx="15" cy="37" r="3" fill="#f59e0b"/>
    <text x="25" y="40">Air bubbles — degas mobile phase</text>
    <circle cx="15" cy="55" r="3" fill="#f59e0b"/>
    <text x="25" y="58">Check valve failure (pump noise?)</text>
    <circle cx="15" cy="73" r="3" fill="#f59e0b"/>
    <text x="25" y="76">Pump seal wear (dripping?)</text>
    <circle cx="15" cy="91" r="3" fill="#f59e0b"/>
    <text x="25" y="94">Loose fitting (check all connections)</text>
    <circle cx="15" cy="109" r="3" fill="#f59e0b"/>
    <text x="25" y="112">Degasser malfunction?</text>
  </g>

  <!-- LOW PRESSURE branch -->
  <g transform="translate(500,115)">
    <rect width="200" height="35" rx="6" fill="#f0fdf4" stroke="#22c55e" stroke-width="1.5"/>
    <text x="100" y="22" text-anchor="middle" font-size="11" font-weight="600" fill="#16a34a">Too LOW</text>
  </g>
  <g transform="translate(465,170)" font-size="9" fill="#475569">
    <rect width="270" height="115" rx="6" fill="#fff" stroke="#e5e7eb" stroke-width="1"/>
    <text x="15" y="20" font-weight="600" fill="#1e293b">Check:</text>
    <circle cx="15" cy="37" r="3" fill="#22c55e"/>
    <text x="25" y="40">Leak in system (wet fittings?)</text>
    <circle cx="15" cy="55" r="3" fill="#22c55e"/>
    <text x="25" y="58">Solvent reservoir empty / line dry?</text>
    <circle cx="15" cy="73" r="3" fill="#22c55e"/>
    <text x="25" y="76">Column disconnected or bypassed?</text>
    <circle cx="15" cy="91" r="3" fill="#22c55e"/>
    <text x="25" y="94">Flow rate set correctly?</text>
    <circle cx="15" cy="109" r="3" fill="#22c55e"/>
    <text x="25" y="112">Proportioning valve failure?</text>
  </g>

  <!-- Animated pulsing pressure gauge -->
  <g transform="translate(625,30)">
    <circle cx="40" cy="20" r="18" fill="none" stroke="#3b82f6" stroke-width="2"/>
    <line x1="40" y1="20" x2="40" y2="6" stroke="#1e293b" stroke-width="2" stroke-linecap="round">
      <animateTransform attributeName="transform" type="rotate" values="-30,40,20;30,40,20;-30,40,20" dur="2s" repeatCount="indefinite"/>
    </line>
    <circle cx="40" cy="20" r="3" fill="#1e293b"/>
    <text x="40" y="50" text-anchor="middle" font-size="8" fill="#64748b">bar</text>
  </g>

  <!-- Footer -->
  <text x="375" y="310" text-anchor="middle" font-size="9" fill="#94a3b8">
    Systematic approach: disconnect from detector → column → autosampler → pump to isolate source.
  </text>
  <text x="375" y="325" text-anchor="middle" font-size="9" fill="#94a3b8">
    Normal operating pressure for 1290: depends on column, flow rate, and mobile phase.
  </text>
  <text x="375" y="340" text-anchor="middle" font-size="9" fill="#94a3b8">
    Document all observations in the instrument logbook (GMP requirement).
  </text>
</svg>`
  }
};

/**
 * Replace [diagram:<key>] tokens in text with rendered SVG.
 * Returns an HTML string with the diagrams embedded.
 */
function renderDiagrams(html) {
  return html.replace(/\[diagram:([\w-]+)\]/g, (match, key) => {
    const d = DIAGRAMS[key];
    if (!d) return match;
    return `
      <div class="diagram-container">
        <div class="diagram-header">
          <span class="diagram-icon">&#9881;</span> ${d.title}
        </div>
        <div class="diagram-body">${d.svg}</div>
      </div>`;
  });
}
