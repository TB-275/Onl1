const $ = (selector) => document.querySelector(selector);

const legacyLevels = [
  { title: 'Khởi đầu tĩnh lặng', nodes: [[18, 50], [50, 18], [82, 50], [50, 82]], edges: [[0,1],[1,2],[2,3],[3,0],[0,2]], clue: 'DẤU SAO' },
  { title: 'Cánh cửa nghiêng', nodes: [[18, 23], [50, 18], [82, 30], [71, 72], [30, 82], [20, 54]], edges: [[0,1],[1,2],[2,3],[3,4],[4,5],[5,0],[1,4],[0,4]], clue: 'LA BÀN'},
  { title: 'Con mắt của đêm', nodes: [[16, 50], [34, 25], [66, 25], [84, 50], [66, 75], [34, 75], [50, 50]], edges: [[0,1],[1,2],[2,3],[3,4],[4,5],[5,0],[0,6],[1,6],[3,6],[4,6],[0,3],[1,4]], clue: 'CON MẮT'},
  { title: 'Mạch ngầm', nodes: [[17, 20], [50, 20], [83, 20], [83, 50], [83, 80], [50, 80], [17, 80], [17, 50], [50, 50]], edges: [[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,7],[7,0],[1,8],[3,8],[5,8],[7,8],[1,5],[3,7]], clue: 'MẠCH NGẦM'},
  { title: 'Mặt nạ kép', nodes: [[18, 30], [35, 18], [50, 30], [65, 18], [82, 30], [70, 50], [82, 70], [65, 82], [50, 70], [35, 82], [18, 70], [30, 50]], edges: [[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,7],[7,8],[8,9],[9,10],[10,11],[11,0],[2,4],[4,6],[6,8],[8,10],[10,0],[2,8]], clue: 'MẶT NẠ'},
  { title: 'Nhịp cầu vắng', nodes: [[16, 32], [33, 20], [50, 32], [67, 20], [84, 32], [72, 58], [84, 78], [50, 68], [16, 78], [28, 58]], edges: [[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,7],[7,8],[8,9],[9,0],[0,2],[2,4],[4,7],[7,0]], clue: 'NHỊP CẦU' },
  { title: 'Khóa thời gian', nodes: [[50, 16], [75, 28], [82, 55], [66, 81], [34, 81], [18, 55], [25, 28], [50, 50]], edges: [[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,0],[0,7],[7,2],[7,4],[7,6],[0,4],[2,6]], clue: 'ĐỒNG HỒ'},
  { title: 'Tín hiệu xa', nodes: [[15, 50], [28, 28], [50, 15], [72, 28], [85, 50], [72, 72], [50, 85], [28, 72], [50, 50]], edges: [[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,7],[7,0],[0,8],[2,8],[4,8],[6,8],[0,4],[2,6]], clue: 'TÍN HIỆU'},
  { title: 'Vết nứt đỏ', nodes: [[16, 22], [50, 16], [84, 22], [72, 50], [84, 78], [50, 84], [16, 78], [28, 50], [50, 50], [50, 30], [50, 70]], edges: [[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,7],[7,0],[0,9],[9,8],[8,10],[10,4],[0,10],[10,9],[9,4],[4,8],[8,0]], clue: ' VẾT NỨT'},
  { title: 'Điểm hội tụ', nodes: [[15, 15], [50, 15], [85, 15], [85, 50], [85, 85], [50, 85], [15, 85], [15, 50], [30, 30], [70, 30], [70, 70], [30, 70]], edges: [[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,7],[7,0],[8,9],[9,10],[10,11],[11,8],[0,8],[2,9],[4,10],[6,11],[0,4],[2,6],[8,10],[9,11]], clue: 'HỘI TỤ' }
];

function normalizeNodes(rawNodes) {
  const xs = rawNodes.map(({ x }) => x); const ys = rawNodes.map(({ y }) => y);
  const minX = Math.min(...xs); const minY = Math.min(...ys);
  const width = Math.max(...xs) - minX || 1; const height = Math.max(...ys) - minY || 1;
  const scale = 76 / Math.max(width, height);
  const offsetX = (100 - width * scale) / 2 - minX * scale;
  const offsetY = (100 - height * scale) / 2 - minY * scale;
  return rawNodes.map(({ x, y }) => [Number((x * scale + offsetX).toFixed(2)), Number((y * scale + offsetY).toFixed(2))]);
}

const rawLevels = [
  {
    title: 'Tam giác',
    nodes: [{id:0, x:350, y:200}, {id:1, x:200, y:500}, {id:2, x:500, y:500}],
    edges: [[0,1], [1,2], [2,0]], startNodeId: 0,
    clue: 'MẢNH GHÉP 01', clueText: '3x3'
  },
  {
    title: 'Vuông chéo',
    nodes: [{id:0, x:150, y:50}, {id:1, x:50, y:100}, {id:2, x:100, y:100}, {id:3, x:200, y:100},{id:4, x:250, y:100},{id:5, x:100, y:150},{id:6, x:200, y:150},{id:7, x:50, y:200},{id:8, x:100, y:200},{id:9, x:200, y:200},{id:10, x:250, y:200},{id:11, x:150, y:250}],
    edges: [[0,2], [0,3],[1,2],[1,5],[2,3],[2,5],[3,4],[3,6],[4,6],[5,8],[5,7],[6,9],[6,10],[7,8],[8,9],[8,11],[9,10],[9,11]], startNodeId: 0,
    clue: 'MẢNH GHÉP 02', clueText: '5x5'
  },
  {
    title: 'Ngôi nhà',
    nodes: [{id:0, x:100, y:300}, {id:1, x:300, y:300}, {id:2, x:100, y:150}, {id:3, x:300, y:150}, {id:4, x:200, y:50}],
    edges: [[0,1], [0,2], [0,3], [1,2], [1,3], [2,3], [2,4], [3,4]], startNodeId: 0,
    clue: 'MẢNH GHÉP 03', clueText: "5x3"
  },
  {
    title: 'Kim cương',
    nodes: [{id:0, x:200, y:50}, {id:1, x:100, y:200}, {id:2, x:300, y:200}, {id:3, x:200, y:350}],
    edges: [[0,1], [0,2], [1,2], [1,3], [2,3]], startNodeId: 1,
    clue: 'MẢNH GHÉP 04', clueText: '5x3'
  },
  {
    title: 'Đồng hồ cát',
    nodes: [{id:0, x:100, y:100}, {id:1, x:300, y:100}, {id:2, x:200, y:200}, {id:3, x:100, y:300}, {id:4, x:300, y:300}],
    edges: [[0,1], [0,2], [1,2], [2,3], [2,4], [3,4], [0,3]], startNodeId: 3,
    clue: 'MẢNH GHÉP 05', clueText: '3x5'
  },
  {
    title: 'Phong thư',
    nodes: [{id:0, x:100, y:100}, {id:1, x:300, y:100}, {id:2, x:300, y:300}, {id:3, x:100, y:300}, {id:4, x:40, y:200}, {id:5, x:360, y:200}, {id:6, x:200, y:100}, {id:7, x:200, y:300}, {id:8, x:200, y:200}],
    edges: [[0,6], [6,1], [1,2], [2,7], [7,3], [3,0], [0,8], [8,2], [1,8], [8,3], [0,4], [4,3], [1,5], [5,2], [6,8], [8,7]], startNodeId: 6,
    clue: 'MẢNH GHÉP 06', clueText: '5x5'
   
  },
  {
    title: 'Bẫy kim cương',
    nodes: [{id:0, x:100, y:200}, {id:1, x:200, y:200}, {id:2, x:300, y:200}, {id:3, x:150, y:120}, {id:4, x:250, y:120}, {id:5, x:150, y:280}, {id:6, x:250, y:280}, {id:7, x:200, y:50}],
    edges: [[0,1], [1,2], [0,3], [3,1], [1,5], [5,0], [1,4], [4,2], [2,6], [6,1], [3,7], [7,4], [3,4]], startNodeId: 0,
    clue: 'MẢNH GHÉP 07', clueText: '4x5'
  },
  {
    title: 'Lục giác mê cung',
    nodes: [{id:0, x:200, y:200}, {id:1, x:200, y:120}, {id:2, x:270, y:160}, {id:3, x:270, y:240}, {id:4, x:200, y:280}, {id:5, x:130, y:240}, {id:6, x:130, y:160}, {id:7, x:200, y:50}],
    edges: [[1,2], [2,3], [4,5], [5,6], [6,1], [1,0], [2,0], [3,0], [4,0], [5,0], [6,0], [6,7], [7,2]], startNodeId: 1,
    clue: 'MẢNH GHÉP 08', clueText: '7x3'
  },
  {
     title: 'Mạng nhện',
    nodes: [{id:0, x:200, y:200}, {id:1, x:200, y:120}, {id:2, x:280, y:200}, {id:3, x:200, y:280}, {id:4, x:120, y:200}, {id:5, x:200, y:50}, {id:6, x:350, y:200}, {id:7, x:200, y:350}, {id:8, x:50, y:200}],
    edges: [[1,2], [2,3], [3,4], [4,1], [5,8], [6,7], [7,8], [5,1], [1,0], [0,3], [3,7], [8,4], [4,0], [0,2], [2,6]], startNodeId: 7,
    clue: 'MẢNH GHÉP 09', clueText: '5x5'
  },
  {
    title: 'Mạn đà la',
    nodes: [{id:0, x:200, y:60}, {id:1, x:320, y:130}, {id:2, x:320, y:270}, {id:3, x:200, y:340}, {id:4, x:80, y:270}, {id:5, x:80, y:130}],
    edges: [[1,2], [2,3], [3,4], [4,5], [5,0], [0,2], [2,4], [4,0], [1,3], [3,5], [5,1],[0,1]], startNodeId: 0,
    clue: 'MẢNH GHÉP 10', clueText: '5x5'
  }
];
const levels = rawLevels.map(level => ({ ...level, nodes: normalizeNodes(level.nodes) }));

const clueIcons = {
  'DẤU SAO': `<svg viewBox="0 0 100 100" aria-hidden="true"><circle cx="50" cy="50" r="27" fill="none" stroke="#575750"/><path d="M50 17 57 42 82 50 57 57 50 83 43 57 18 50 43 42Z" fill="none" stroke="#e85445" stroke-width="1.5"/><circle cx="50" cy="50" r="3" fill="#f6a64f"/></svg>`,
  'LA BÀN': `<svg viewBox="0 0 100 100" aria-hidden="true"><circle cx="50" cy="50" r="31" fill="none" stroke="#575750"/><path d="M50 22 58 50 50 78 42 50Z" fill="none" stroke="#9fe0d4"/><path d="M22 50h56M50 22v56" stroke="#575750"/><circle cx="50" cy="50" r="3" fill="#e85445"/></svg>`,
  'CON MẮT': `<svg viewBox="0 0 100 100" aria-hidden="true"><path d="M14 50Q50 17 86 50Q50 83 14 50Z" fill="none" stroke="#9fe0d4"/><circle cx="50" cy="50" r="12" fill="none" stroke="#e85445"/><circle cx="50" cy="50" r="3" fill="#f6a64f"/></svg>`,
  'MẠCH NGẦM': `<svg viewBox="0 0 100 100" aria-hidden="true"><path d="M20 22H80V78H20ZM20 22l60 56M80 22 20 78M50 22v56M20 50h60" fill="none" stroke="#575750"/><circle cx="50" cy="50" r="9" fill="none" stroke="#e85445"/><circle cx="50" cy="50" r="2" fill="#f6a64f"/></svg>`,
  'MẶT NẠ': `<svg viewBox="0 0 100 100" aria-hidden="true"><path d="M23 33Q50 17 77 33v23q-27 27-54 0Z" fill="none" stroke="#f6a64f"/><circle cx="38" cy="45" r="5" fill="none" stroke="#9fe0d4"/><circle cx="62" cy="45" r="5" fill="none" stroke="#9fe0d4"/><path d="M42 63h16" stroke="#e85445"/></svg>`,
  'NHỊP CẦU': `<svg viewBox="0 0 100 100" aria-hidden="true"><path d="M17 66Q50 18 83 66" fill="none" stroke="#9fe0d4"/><path d="M17 72Q50 27 83 72" fill="none" stroke="#e85445"/><path d="M25 54v16m16-27v17m18-21v18m16-6v17" stroke="#575750"/></svg>`,
  'ĐỒNG HỒ': `<svg viewBox="0 0 100 100" aria-hidden="true"><circle cx="50" cy="50" r="30" fill="none" stroke="#f6a64f"/><path d="M50 50V29M50 50l17 10" stroke="#e85445" stroke-width="2"/><circle cx="50" cy="50" r="3" fill="#9fe0d4"/></svg>`,
  'TÍN HIỆU': `<svg viewBox="0 0 100 100" aria-hidden="true"><circle cx="50" cy="50" r="4" fill="#e85445"/><path d="M50 37a13 13 0 0 1 13 13M50 27a23 23 0 0 1 23 23M50 63a13 13 0 0 0 13-13M50 73a23 23 0 0 0 23-23" fill="none" stroke="#9fe0d4"/></svg>`,
  ' VẾT NỨT': `<svg viewBox="0 0 100 100" aria-hidden="true"><path d="M25 17 43 42 34 56 57 64 49 83 75 55 57 45 67 26" fill="none" stroke="#e85445" stroke-width="2"/><circle cx="25" cy="17" r="3" fill="#f6a64f"/></svg>`,
  'HỘI TỤ': `<svg viewBox="0 0 100 100" aria-hidden="true"><path d="M17 17h66v66H17ZM17 17l33 33 33-33M83 83 50 50 17 83" fill="none" stroke="#575750"/><circle cx="50" cy="50" r="8" fill="none" stroke="#e85445"/><circle cx="50" cy="50" r="2" fill="#f6a64f"/></svg>`
};

function genericClueIcon(number) {
  return `<svg viewBox="0 0 100 100" aria-hidden="true"><rect x="18" y="18" width="64" height="64" rx="8" fill="none" stroke="#8d42b4"/><text x="50" y="62" text-anchor="middle" fill="#8d42b4" font-size="35" font-family="Arial">${number}</text></svg>`;
}
for (let i = 1; i <= 10; i += 1) clueIcons[`MẢNH GHÉP ${pad(i)}`] = genericClueIcon(i);

// The reveal tables are obfuscated so they are not left as readable text in the page source.
const encodedRevealData = 'Mms9KCslLDprcxISawRrZWsGa2VreGtlawhrZWsZa2VrfmtlaxtrZWsMa2VrDWsUZRJrB2tlawxrZWsRa2VrHWtla3trZWt5a2VrC2tlawVrZWscaxRlEmsKa2VrBWtlaxxrZWsMa2VremtlaxFrZWsCa2VrDGtlaxBrFGUSaw1rZWsGa2VrBmtlaxtrZWt9a2VrfWtlawZrZWsZa2VrB2sUZRJrD2tlawBrZWsHa2VrDWtla3xrZWt4a2VrHWtlaxtrZWsIaxRlEmsaa2VrHWtlawhrZWsba2Vrf2tla39rZWsHa2VrBmtlax5rFGUSawJrZWsMa2VrEGtla35rZWt7a2VreWtlawtrZWsGa2VrEWsUZRJrBGtlawhrZWsZa2VrcWtla3FrZWtxa2VrB2tlawZrZWseaxRlEmsba2VrDGtlaw1rZWtwa2Vremtla3prZWsNa2VrBmtlax1rFGUSaw9rZWsAa2VrB2tlawhrZWsFa2VreGtla3lrZWsRa2VraGsUFDQ=';
function decodeRevealData() {
  const key = 73;
  const encodedTableLayoutData = 'Mms9KCslLDprcxIyazsmPjprc3playomJTwkJzprc3playosJSU6a3MSawRrZWsGa2VreGtlawprZWsca2VrCGtlaxtrZWsMa2VrDWsUNGUyazsmPjprc3tlayomJTwkJzprc3xlayosJSU6a3MSawtrZWsIa2VrB2tlaw5rZWt7a2VrHWtlawZrZWsAa2VreWtla2hrFDRlMms7Jj46a3N9ZWsqJiU8JCc6a3N6ZWsqLCUlOmtzEmsEa2VrCGtlawdrZWsBa2Vremtlaw5rZWsBa2VrDGtlaxlrZWsIa2VrC2tlawprFDRlMms7Jj46a3N6ZWsqJiU8JCc6a3N9ZWsqLCUlOmtzEmsKa2VrAWtlawBrZWsIa2VrfWtlawJrZWsBa2VrBmtlawhrZWsRa2VrEGtlaxNrFDRlMms7Jj46a3N9ZWsqJiU8JCc6a3N9ZWsqLCUlOmtzEmsda2VrAGtlawRrZWs8a2VrAmtlawFrZWsGa2VrCGtlaxtrZWsMa2VrDWtla3ZrZWsZa2VrBWtlaxxrZWsaaxQ0ZTJrOyY+OmtzfGVrKiYlPCQnOmtzemVrKiwlJTprcxJrB2tlawFrZWsAa2VrB2tla39rZWsda2VrAWtlawhrZWsQa2VrBWtlawZrZWsAa2VrCGtlaxhrZWsbaxQ0ZTJrOyY+OmtzemVrKiYlPCQnOmtzfGVrKiwlJTprcxJrBGtlawhrZWsda2VrfmtlawFrZWsca2VrGWtlax1rZWsba2VrBmtlawdrZWsOa2VrH2tlax5rZWsRaxQ0ZTJrOyY+OmtzfWVrKiYlPCQnOmtzfGVrKiwlJTprcxJrDWtlaxxrZWsGa2VrB2tla3FrZWsOa2VrDWtlawBrZWsEa2VrBmtlax1rZWsHa2VrDGtlax1rZWsaa2VrCGtlawtrZWsKa2VrDWtlawxrFDRlMms7Jj46a3N8ZWsqJiU8JCc6a3N9ZWsqLCUlOmtzEmsKa2VrCGtlawdrZWsBa2VrcGtlawprZWsca2VrCGtlawRrZWsGa2VrHWtlaw1rZWsca2VrBmtlawdrZWsOa2VrD2tlawBrZWsDa2VrAmsUNGUyazsmPjprc3xlayomJTwkJzprc3xlayosJSU6a3MSax1rZWsGa2VrCGtlawdrZWt4a2VreWtlawprZWsca2VrBmtlawBrZWsBa2VrBmtlawBrZWsHa2VrAWtlawhrZWsHa2VrAWtlax1rZWsGa2VrB2tlaw5rZWsBa2VraGtla3ZrFDQUNA==';
  const bytes = Uint8Array.from(atob(encodedTableLayoutData), (character) => character.charCodeAt(0) ^ key);
  return JSON.parse(new TextDecoder().decode(bytes));
}

const REVEAL_TABLES = [
  { rows: 3, columns: 3, cells: ['A', 'L', 'C', 'N', 'O', 'L', 'D', 'N', 'E'] },
  { rows: 5, columns: 5, cells: ['B', 'O', 'V', 'U', 'O', 'O', 'T', 'C', 'V','I','D', 'E', 'A', 'O', 'O', 'S', 'T', 'O', 'H', 'I', 'T', 'R', 'E', 'N','C'] },
  { rows: 5, columns: 3, cells: ['N', 'D', 'N', 'G', 'E', 'T', 'W', 'O', 'M', 'U', 'G', 'N','C','T','O'] },
  { rows: 5, columns: 3, cells: ['P', 'D', 'M', 'H', 'O', 'N', 'G', 'O', 'E', 'O', 'S', 'P','I','O','A'] },
  { rows: 3, columns: 5, cells: ['H', 'H', 'O', 'N', 'U', 'M', 'C', 'E', 'D', 'R', 'V', 'E','R','Y','A'] },
  { rows: 5, columns: 5, cells: ['C', 'H', 'D', 'O', 'W', 'T', 'U', 'Y', 'N', 'H', 'U', 'O', 'W', 'N', 'G','A', 'I', 'N', 'T', 'A', 'P', 'T', 'T', 'U','C'] },
  { rows: 4, columns: 5, cells: ['P', 'H', 'H', 'A', 'X', 'H', 'B', 'I', 'I', 'L', 'H', 'I', 'E', 'E','E', 'O','S','A','I','N'] },
  { rows: 7, columns: 3, cells: ['R', 'O', 'S', 'T', 'Z', 'N', 'O', 'T', 'H', 'R', 'X', 'I', 'K', 'I', 'E', 'D', 'E', 'J', 'H', 'C','N'] },
  { rows: 5, columns: 5, cells: ['N', 'A', 'D', 'F', 'A', 'F', 'M', 'O', 'T', 'V', 'G', 'H', 'I', 'C', 'O', 'T', 'R', 'E', 'R', 'E', 'O', 'U', 'T', 'D','O'] },
  { rows: 5, columns: 5, cells: ['I', 'D', 'T', 'O', 'I', 'F', 'I', 'E', 'N', 'T', 'S', 'U', 'Y', 'N', 'G', 'H', 'S', 'E', 'T', 'L', 'V', 'O', 'J', 'I', 'D'] }
];

function normalizeRevealTables(tables) {
  return levels.map((_, index) => {
    const source = tables[index] || { rows: 3, columns: 3, cells: [] };
    const rows = Math.max(1, Number(source.rows) || 1);
    const columns = Math.max(1, Number(source.columns) || 1);
    const totalCells = rows * columns;
    const sourceCells = Array.isArray(source.cells) ? source.cells : [];
    if (sourceCells.length !== totalCells) {
      console.warn(`Bảng màn ${index + 1}: cần ${totalCells} ký tự, hiện có ${sourceCells.length}. Ô thiếu sẽ để trống.`);
    }
    return {
      rows,
      columns,
      cells: Array.from({ length: totalCells }, (_, cellIndex) => String(sourceCells[cellIndex] ?? '').slice(0, 1))
    };
  });
}

const revealData = { tables: normalizeRevealTables(REVEAL_TABLES) };

function renderCharacterTable(levelIndex) {
  const table = $('#characterTable');
  const tableData = revealData.tables[levelIndex];
  table.replaceChildren();
  table.style.setProperty('--table-columns', tableData.columns);
  table.style.setProperty('--table-rows', tableData.rows);
  tableData.cells.forEach((character, index) => {
    const cell = document.createElement('span');
    cell.className = 'character-cell';
    cell.setAttribute('role', 'gridcell');
    cell.setAttribute('aria-label', `Ký tự ${index + 1}`);
    cell.textContent = character;
    table.appendChild(cell);
  });
}

function renderFinalRevealImage() {
  const host = $('#revealImage');
  host.replaceChildren();
  const image = document.createElement('img');
  image.src = 'mt.jpg';
  image.alt = 'Hình ảnh tổng hợp của màn 10';
  image.decoding = 'async';
  host.appendChild(image);
}

const state = { level: 0, currentNode: null, usedEdges: new Set(), path: [], startedAt: null, timerId: null, complete: false, clues: [] };
const board = $('#board');
const targetLayer = $('#targetLayer');
const progressLayer = $('#progressLayer');
const nodeLayer = $('#nodeLayer');

function pad(n) { return String(n).padStart(2, '0'); }
function edgeKey(a, b) { return a < b ? `${a}-${b}` : `${b}-${a}`; }
function levelData() { return levels[state.level]; }
function formatTime(seconds) { return `${pad(Math.floor(seconds / 60))}:${pad(seconds % 60)}`; }

function renderLevel() {
  const data = levelData();
  state.currentNode = null; state.usedEdges = new Set(); state.path = []; state.startedAt = null; state.complete = false;
  clearInterval(state.timerId); $('#timer').textContent = '00:00';
  $('#missionNumber').textContent = pad(state.level + 1); $('#levelChip').textContent = pad(state.level + 1);
  $('#topLevel').textContent = state.level + 1;
  $('#missionTitle').textContent = data.title; $('#mobileMissionTitle').textContent = data.title;
  $('#edgeCount').textContent = `0 / ${data.edges.length}`; $('#mobileEdgeCount').textContent = `0 / ${data.edges.length} nét`;
  $('#liveStatus').innerHTML = '<span></span> SẴN SÀNG'; $('#liveStatus').classList.remove('done');
  $('#instruction').textContent = 'Nối liền từng điểm mà không nhấc tay.'; $('#boardHint').classList.remove('hidden');
  targetLayer.innerHTML = data.edges.map(([a,b]) => lineMarkup(data.nodes[a], data.nodes[b], 'target-line', edgeKey(a,b))).join('');
  const startNodeId = data.startNodeId ?? 0;
  nodeLayer.innerHTML = data.nodes.map(([x,y], index) => `<circle class="node-dot ${index === startNodeId ? 'start' : ''}" data-node="${index}" cx="${x}" cy="${y}" r="${index === startNodeId ? 2.2 : 1.25}"/>`).join('');
  progressLayer.innerHTML = '';
  board.setAttribute('aria-label', `Màn ${state.level + 1}: ${data.title}. Bắt đầu tại điểm đỏ.`);
}

function lineMarkup(a, b, className, key) { return `<line class="${className}" data-edge="${key}" x1="${a[0]}" y1="${a[1]}" x2="${b[0]}" y2="${b[1]}" />`; }
function getPoint(event) { const rect = board.getBoundingClientRect(); return { x: ((event.clientX - rect.left) / rect.width) * 100, y: ((event.clientY - rect.top) / rect.height) * 100 }; }
function nearestNode(point, maxDistance = 8) {
  let best = null; let bestDistance = maxDistance;
  levelData().nodes.forEach(([x,y], index) => { const distance = Math.hypot(point.x-x, point.y-y); if (distance < bestDistance) { best = index; bestDistance = distance; } });
  return best;
}
function adjacentUnused(node) { return levelData().edges.find(([a,b]) => (a === node || b === node) && !state.usedEdges.has(edgeKey(a,b))); }
function beginPath(node) {
  const startNodeId = levelData().startNodeId ?? 0;
  if (node !== startNodeId || state.complete) return;
  state.currentNode = startNodeId; state.path = [startNodeId]; state.startedAt = Date.now(); $('#boardHint').classList.add('hidden');
  clearInterval(state.timerId); state.timerId = setInterval(() => { $('#timer').textContent = formatTime(Math.floor((Date.now()-state.startedAt)/1000)); }, 1000);
  updateStatus();
}
function updateDragPreview(point) {
  if (state.currentNode === null || state.complete) return;
  const data = levelData();
  let preview = progressLayer.querySelector('.drag-preview');
  if (!preview) {
    preview = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    preview.setAttribute('class', 'drag-preview');
    progressLayer.appendChild(preview);
  }
  const [x, y] = data.nodes[state.currentNode];
  preview.setAttribute('x1', x); preview.setAttribute('y1', y);
  preview.setAttribute('x2', point.x); preview.setAttribute('y2', point.y);
}
function clearDragPreview() {
  progressLayer.querySelector('.drag-preview')?.remove();
}
function restartAfterLift() {
  if (state.currentNode === null || state.complete) return;
  renderLevel();
  $('#instruction').textContent = 'Bạn đã nhấc tay — hãy chơi lại từ điểm đỏ.';
  $('#instruction').classList.add('error-text');
  setTimeout(() => {
    if (!state.complete) $('#instruction').textContent = 'Nối liền từng điểm mà không nhấc tay.';
    $('#instruction').classList.remove('error-text');
  }, 1500);
}
function celebrateNode(node) {
  const dot = nodeLayer.querySelector(`[data-node="${node}"]`);
  if (dot) {
    dot.classList.add('reached');
    setTimeout(() => dot.classList.remove('reached'), 420);
  }
  const [x, y] = levelData().nodes[node];
  const ripple = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  ripple.setAttribute('class', 'node-ripple'); ripple.setAttribute('cx', x); ripple.setAttribute('cy', y); ripple.setAttribute('r', '2');
  nodeLayer.appendChild(ripple);
  setTimeout(() => ripple.remove(), 520);
}
function stepTo(node) {
  if (state.currentNode === null || node === state.currentNode || state.complete) return;
  const edge = levelData().edges.find(([a,b]) => (a === state.currentNode && b === node || b === state.currentNode && a === node) && !state.usedEdges.has(edgeKey(a,b)));
  if (!edge) { flashError(); return; }
  const key = edgeKey(state.currentNode, node); state.usedEdges.add(key); state.path.push(node); state.currentNode = node;
  const [a,b] = [levelData().nodes[edge[0]], levelData().nodes[edge[1]]]; progressLayer.insertAdjacentHTML('beforeend', lineMarkup(a,b,'progress-line',key));
  celebrateNode(node);
  const target = targetLayer.querySelector(`[data-edge="${key}"]`); if (target) target.classList.add('used');
  $('#edgeCount').textContent = `${state.usedEdges.size} / ${levelData().edges.length}`; $('#mobileEdgeCount').textContent = `${state.usedEdges.size} / ${levelData().edges.length} nét`;
  updateStatus();
  if (state.usedEdges.size === levelData().edges.length) completeLevel();
}
function flashError() { $('#instruction').textContent = 'Đường này đã đi qua hoặc không nối với điểm hiện tại.'; $('#instruction').classList.add('error-text'); setTimeout(() => { $('#instruction').textContent = 'Nối liền từng điểm mà không nhấc tay.'; $('#instruction').classList.remove('error-text'); }, 1200); }
function updateStatus() { $('#liveStatus').innerHTML = `<span></span> ${state.currentNode === null ? 'SẴN SÀNG' : 'ĐANG VẼ'}`; }
function completeLevel() {
  state.complete = true; clearInterval(state.timerId); $('#liveStatus').innerHTML = '<span></span> HOÀN THÀNH'; $('#liveStatus').classList.add('done');
  const data = levelData(); state.clues.push(state.level); renderClueStack();
  setTimeout(() => openResultModal(data), 400);
}

function openResultModal(data) {
  const isFinalLevel = state.level === levels.length - 1;
  $('#clueArt').hidden = isFinalLevel;
  $('#clueArt').innerHTML = clueIcons[data.clue];
  renderCharacterTable(state.level);
  $('#revealImageWrap').hidden = true;
  $('#revealImage').replaceChildren();
  $('#hintButton').hidden = !isFinalLevel;
  $('#modalKicker').textContent = `MỞ KHÓA MANH MỐI ${pad(state.level + 1)}`;
  $('#modalTitle').textContent = 'Đây là mảnh ghép: '
  $('#modalText').textContent = data.clueText;
  $('#clueCaption').textContent = data.clue;
  $('#nextButton').innerHTML = `${isFinalLevel ? 'MỞ KHÓA MẢNH GHÉP CUỐI' : 'MÀN TIẾP THEO'} <span>→</span>`;
  $('#modalBackdrop').hidden = false;
  $('#nextButton').focus();
}
function renderClueStack() { $('#clueStack').innerHTML = state.clues.map((levelIndex) => { const clue = levels[levelIndex]; return `<div class="clue-card"><div>${clueIcons[clue.clue]}</div><div><b>${pad(levelIndex+1)} · ${clue.clue}</b><span>${clue.clueText}</span></div></div>`; }).join(''); }
function resetLevel() { renderLevel(); }
let activePointerId = null;
board.addEventListener('pointerdown', (event) => {
  if (!event.isPrimary || activePointerId !== null) return;
  event.preventDefault();
  activePointerId = event.pointerId;
  board.setPointerCapture(event.pointerId);
  const point = getPoint(event);
  const node = nearestNode(point);
  if (state.currentNode === null) beginPath(node);
  else stepTo(node);
  updateDragPreview(point);
});
board.addEventListener('pointermove', (event) => {
  if (event.pointerId !== activePointerId || state.currentNode === null || state.complete) return;
  event.preventDefault();
  const point = getPoint(event);
  const node = nearestNode(point, 6.5);
  if (node !== null && node !== state.currentNode) stepTo(node);
  updateDragPreview(point);
});
function finishPointer(event) {
  if (event.pointerId !== activePointerId) return;
  event.preventDefault();
  const liftedBeforeFinish = state.currentNode !== null && !state.complete;
  clearDragPreview();
  try { board.releasePointerCapture(event.pointerId); } catch (_) {}
  activePointerId = null;
  if (liftedBeforeFinish) restartAfterLift();
}
board.addEventListener('pointerup', finishPointer);
board.addEventListener('pointercancel', finishPointer);
$('#resetButton').addEventListener('click', resetLevel);
$('#hintButton').addEventListener('click', () => {
  $('#hintButton').hidden = true;
  renderFinalRevealImage();
  $('#revealImageWrap').hidden = false;
});
$('#nextButton').addEventListener('click', () => { $('#modalBackdrop').hidden = true; if (state.level === levels.length - 1) openFinalModal(); else { state.level += 1; renderLevel(); } });
$('#modalClose').addEventListener('click', () => { $('#modalBackdrop').hidden = true; });
$('#howToPlayButton').addEventListener('click', () => { $('#helpBackdrop').hidden = false; $('#helpStartButton').focus(); });
$('#helpClose').addEventListener('click', () => { $('#helpBackdrop').hidden = true; });
$('#helpStartButton').addEventListener('click', () => { $('#helpBackdrop').hidden = true; });
const musicButton = $('#musicButton');
const musicAudio = $('#musicAudio');
musicAudio.volume = 0.35;
musicButton.addEventListener('click', async () => {
  if (musicAudio.paused) {
    try {
      await musicAudio.play();
      musicButton.setAttribute('aria-pressed', 'true');
      musicButton.textContent = '♫ Tắt Nhạc';
    } catch (_) {
      musicButton.setAttribute('aria-pressed', 'false');
      musicButton.textContent = '♫ Bật Nhạc';
    }
  } else {
    musicAudio.pause();
    musicButton.setAttribute('aria-pressed', 'false');
    musicButton.textContent = '♫ Bật Nhạc';
  }
});
document.querySelectorAll('.modal-backdrop').forEach((backdrop) => backdrop.addEventListener('click', (event) => { if (event.target === backdrop && backdrop.id !== 'finalBackdrop') backdrop.hidden = true; }));

// The last sentence is assembled only after the ten boards are solved.
// It is intentionally stored as masked byte values rather than readable text in the page.
const finalCipher = [
  [30, 117, 7, 106, 9, 117, 4, 2, 106, 9, 117, 11],
  [26, 2, 117, 11, 106, 8, 117, 9]
];
function revealFinal() { const key = 74; return finalCipher.map((part) => part.map((value) => String.fromCharCode(value ^ key)).join('')).join(' · '); }
function openFinalModal() { $('#finalText').textContent = 'Mười cánh cửa, một đường đi. Bạn đã nhìn thấy thứ mà người khác thường bỏ qua.'; $('#finalSecret').textContent = revealFinal(); $('#finalBackdrop').hidden = false; $('#playAgainButton').focus(); }
$('#playAgainButton').addEventListener('click', () => { $('#finalBackdrop').hidden = true; state.level = 0; state.clues = []; renderClueStack(); renderLevel(); });

renderLevel();
