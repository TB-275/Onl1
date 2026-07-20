const $ = (selector) => document.querySelector(selector);

const legacyLevels = [
  { title: 'Khởi đầu tĩnh lặng', nodes: [[18, 50], [50, 18], [82, 50], [50, 82]], edges: [[0,1],[1,2],[2,3],[3,0],[0,2]], clue: 'DẤU SAO', clueText: 'Có một phương hướng đang thức giấc.' },
  { title: 'Cánh cửa nghiêng', nodes: [[18, 23], [50, 18], [82, 30], [71, 72], [30, 82], [20, 54]], edges: [[0,1],[1,2],[2,3],[3,4],[4,5],[5,0],[1,4],[0,4]], clue: 'LA BÀN', clueText: 'Phía bắc không nằm ở trên cùng.' },
  { title: 'Con mắt của đêm', nodes: [[16, 50], [34, 25], [66, 25], [84, 50], [66, 75], [34, 75], [50, 50]], edges: [[0,1],[1,2],[2,3],[3,4],[4,5],[5,0],[0,6],[1,6],[3,6],[4,6],[0,3],[1,4]], clue: 'CON MẮT', clueText: 'Thứ đang nhìn bạn không ở ngoài hình vẽ.' },
  { title: 'Mạch ngầm', nodes: [[17, 20], [50, 20], [83, 20], [83, 50], [83, 80], [50, 80], [17, 80], [17, 50], [50, 50]], edges: [[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,7],[7,0],[1,8],[3,8],[5,8],[7,8],[1,5],[3,7]], clue: 'MẠCH NGẦM', clueText: 'Mọi vòng tròn đều dẫn về tâm.' },
  { title: 'Mặt nạ kép', nodes: [[18, 30], [35, 18], [50, 30], [65, 18], [82, 30], [70, 50], [82, 70], [65, 82], [50, 70], [35, 82], [18, 70], [30, 50]], edges: [[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,7],[7,8],[8,9],[9,10],[10,11],[11,0],[2,4],[4,6],[6,8],[8,10],[10,0],[2,8]], clue: 'MẶT NẠ', clueText: 'Một khuôn mặt có thể có hai hướng.' },
  { title: 'Nhịp cầu vắng', nodes: [[16, 32], [33, 20], [50, 32], [67, 20], [84, 32], [72, 58], [84, 78], [50, 68], [16, 78], [28, 58]], edges: [[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,7],[7,8],[8,9],[9,0],[0,2],[2,4],[4,7],[7,0]], clue: 'NHỊP CẦU', clueText: 'Khoảng trống cũng là một phần của lối đi.' },
  { title: 'Khóa thời gian', nodes: [[50, 16], [75, 28], [82, 55], [66, 81], [34, 81], [18, 55], [25, 28], [50, 50]], edges: [[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,0],[0,7],[7,2],[7,4],[7,6],[0,4],[2,6]], clue: 'ĐỒNG HỒ', clueText: 'Kim chỉ về nơi bắt đầu, nhưng không quay lại.' },
  { title: 'Tín hiệu xa', nodes: [[15, 50], [28, 28], [50, 15], [72, 28], [85, 50], [72, 72], [50, 85], [28, 72], [50, 50]], edges: [[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,7],[7,0],[0,8],[2,8],[4,8],[6,8],[0,4],[2,6]], clue: 'TÍN HIỆU', clueText: 'Bốn phía gửi cùng một thông điệp.' },
  { title: 'Vết nứt đỏ', nodes: [[16, 22], [50, 16], [84, 22], [72, 50], [84, 78], [50, 84], [16, 78], [28, 50], [50, 50], [50, 30], [50, 70]], edges: [[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,7],[7,0],[0,9],[9,8],[8,10],[10,4],[0,10],[10,9],[9,4],[4,8],[8,0]], clue: ' VẾT NỨT', clueText: 'Đường thẳng nhất đôi khi cần bị bẻ cong.' },
  { title: 'Điểm hội tụ', nodes: [[15, 15], [50, 15], [85, 15], [85, 50], [85, 85], [50, 85], [15, 85], [15, 50], [30, 30], [70, 30], [70, 70], [30, 70]], edges: [[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,7],[7,0],[8,9],[9,10],[10,11],[11,8],[0,8],[2,9],[4,10],[6,11],[0,4],[2,6],[8,10],[9,11]], clue: 'HỘI TỤ', clueText: 'Tất cả những gì đã thấy đang chỉ về một nơi.' }
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
    clue: 'MẢNH GHÉP 01', clueText: 'Một hình tam giác đang chờ được mở khóa.', image: 'doc.png'
  },
  {
    title: 'Vuông chéo',
    nodes: [{id:0, x:150, y:50}, {id:1, x:50, y:100}, {id:2, x:100, y:100}, {id:3, x:200, y:100},{id:4, x:250, y:100},{id:5, x:100, y:150},{id:6, x:200, y:150},{id:7, x:50, y:200},{id:8, x:100, y:200},{id:9, x:200, y:200},{id:10, x:250, y:200},{id:11, x:150, y:250}],
    edges: [[0,2], [0,3],[1,2],[1,5],[2,3],[2,5],[3,4],[3,6],[4,6],[5,8],[5,7],[6,9],[6,10],[7,8],[8,9],[8,11],[9,10],[9,11]], startNodeId: 0,
    clue: 'MẢNH GHÉP 02', clueText: 'Bạn hãy kiểm tra phía dưới gầm bàn làm việc.'
  },
  {
    title: 'Ngôi nhà',
    nodes: [{id:0, x:100, y:300}, {id:1, x:300, y:300}, {id:2, x:100, y:150}, {id:3, x:300, y:150}, {id:4, x:200, y:50}],
    edges: [[0,1], [0,2], [0,3], [1,2], [1,3], [2,3], [2,4], [3,4]], startNodeId: 0,
    clue: 'MẢNH GHÉP 03', clueText: "Mảnh ghép thứ 3 là chữ 'K'."
  },
  {
    title: 'Kim cương',
    nodes: [{id:0, x:200, y:50}, {id:1, x:100, y:200}, {id:2, x:300, y:200}, {id:3, x:200, y:350}],
    edges: [[0,1], [0,2], [1,2], [1,3], [2,3]], startNodeId: 1,
    clue: 'MẢNH GHÉP 04', clueText: 'Có một chiếc chìa khóa giấu trong cuốn sách dày nhất.'
  },
  {
    title: 'Đồng hồ cát',
    nodes: [{id:0, x:100, y:100}, {id:1, x:300, y:100}, {id:2, x:200, y:200}, {id:3, x:100, y:300}, {id:4, x:300, y:300}],
    edges: [[0,1], [0,2], [1,2], [2,3], [2,4], [3,4], [0,3]], startNodeId: 3,
    clue: 'MẢNH GHÉP 05', clueText: 'Nhớ lấy tọa độ: 10 Vĩ độ Bắc...'
  },
  {
    title: 'Mạng nhện',
    nodes: [{id:0, x:200, y:200}, {id:1, x:200, y:120}, {id:2, x:280, y:200}, {id:3, x:200, y:280}, {id:4, x:120, y:200}, {id:5, x:200, y:50}, {id:6, x:350, y:200}, {id:7, x:200, y:350}, {id:8, x:50, y:200}],
    edges: [[1,2], [2,3], [3,4], [4,1], [5,8], [6,7], [7,8], [5,1], [1,0], [0,3], [3,7], [8,4], [4,0], [0,2], [2,6]], startNodeId: 7,
    clue: 'MẢNH GHÉP 06', clueText: 'Tên của kẻ phản bội có 5 chữ cái.'
  },
  {
    title: 'Bẫy kim cương',
    nodes: [{id:0, x:100, y:200}, {id:1, x:200, y:200}, {id:2, x:300, y:200}, {id:3, x:150, y:120}, {id:4, x:250, y:120}, {id:5, x:150, y:280}, {id:6, x:250, y:280}, {id:7, x:200, y:50}],
    edges: [[0,1], [1,2], [0,3], [3,1], [1,5], [5,0], [1,4], [4,2], [2,6], [6,1], [3,7], [7,4], [3,4]], startNodeId: 0,
    clue: 'MẢNH GHÉP 07', clueText: 'Nhật ký trang 42: Góc khuất sau giá sách.'
  },
  {
    title: 'Lục giác mê cung',
    nodes: [{id:0, x:200, y:200}, {id:1, x:200, y:120}, {id:2, x:270, y:160}, {id:3, x:270, y:240}, {id:4, x:200, y:280}, {id:5, x:130, y:240}, {id:6, x:130, y:160}, {id:7, x:200, y:50}],
    edges: [[1,2], [2,3], [4,5], [5,6], [6,1], [1,0], [2,0], [3,0], [4,0], [5,0], [6,0], [6,7], [7,2],[3,4]], startNodeId: 1,
    clue: 'MẢNH GHÉP 08', clueText: 'Ghép các chữ cái đầu tiên của mọi manh mối lại.'
  },
  {
    title: 'Phong thư',
    nodes: [{id:0, x:100, y:100}, {id:1, x:300, y:100}, {id:2, x:300, y:300}, {id:3, x:100, y:300}, {id:4, x:40, y:200}, {id:5, x:360, y:200}, {id:6, x:200, y:100}, {id:7, x:200, y:300}, {id:8, x:200, y:200}],
    edges: [[0,6], [6,1], [1,2], [2,7], [7,3], [3,0], [0,8], [8,2], [1,8], [8,3], [0,4], [4,3], [1,5], [5,2], [6,8], [8,7]], startNodeId: 6,
    clue: 'MẢNH GHÉP 09', clueText: 'Gõ vào bức tường gạch thứ 3 từ dưới lên.'
  },
  {
    title: 'Mạn đà la',
    nodes: [{id:0, x:200, y:60}, {id:1, x:320, y:130}, {id:2, x:320, y:270}, {id:3, x:200, y:340}, {id:4, x:80, y:270}, {id:5, x:80, y:130}],
    edges: [[1,2], [2,3], [3,4], [4,5], [5,0], [0,2], [2,4], [4,0], [1,3], [3,5], [5,1],[0,1]], startNodeId: 0,
    clue: 'MẢNH GHÉP 10', clueText: ''
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
  $('#levelSelect').value = String(state.level);
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

function openResultModal(data) { $('#clueArt').innerHTML = clueIcons[data.clue]; $('#modalKicker').textContent = `MỞ KHÓA MANH MỐI ${pad(state.level + 1)}`; $('#modalTitle').textContent = state.level === levels.length - 1 ? 'Mọi nét đã hội tụ.' : 'Một nét đã hoàn thành.'; $('#modalText').textContent = data.clueText; $('#clueCaption').textContent = data.clue; $('#nextButton').textContent = state.level === levels.length - 1 ? 'MỞ KHÓA MẢNH GHÉP CUỐI ' : 'MÀN TIẾP THEO '; $('#nextButton').insertAdjacentHTML('beforeend', '<span>→</span>'); $('#modalBackdrop').hidden = false; $('#nextButton').focus(); }
function renderClueStack() { $('#clueStack').innerHTML = state.clues.map((levelIndex) => { const clue = levels[levelIndex]; return `<div class="clue-card"><div>${clueIcons[clue.clue]}</div><div><b>${pad(levelIndex+1)} · ${clue.clue}</b><span>${clue.clueText}</span></div></div>`; }).join(''); }
function resetLevel() { renderLevel(); }
function setupLevelTester() {
  const selector = $('#levelSelect');
  selector.innerHTML = levels.map((level, index) => `<option value="${index}">Màn ${pad(index + 1)} · ${level.title}</option>`).join('');
  selector.value = String(state.level);
  selector.addEventListener('change', (event) => {
    state.level = Number(event.target.value);
    state.clues = [];
    renderClueStack();
    renderLevel();
  });
}

board.addEventListener('pointerdown', (event) => { event.preventDefault(); board.setPointerCapture(event.pointerId); const node = nearestNode(getPoint(event)); if (state.currentNode === null) beginPath(node); else stepTo(node); });
board.addEventListener('pointermove', (event) => { if (state.currentNode === null || state.complete) return; const point = getPoint(event); const node = nearestNode(point, 5.8); if (node !== null && node !== state.currentNode) stepTo(node); updateDragPreview(point); });
board.addEventListener('pointerup', (event) => { const liftedBeforeFinish = state.currentNode !== null && !state.complete; clearDragPreview(); try { board.releasePointerCapture(event.pointerId); } catch (_) {} if (liftedBeforeFinish) restartAfterLift(); });
board.addEventListener('pointercancel', () => { clearDragPreview(); restartAfterLift(); });
$('#resetButton').addEventListener('click', resetLevel);
$('#nextButton').addEventListener('click', () => { $('#modalBackdrop').hidden = true; if (state.level === levels.length - 1) openFinalModal(); else { state.level += 1; renderLevel(); } });
$('#modalClose').addEventListener('click', () => { $('#modalBackdrop').hidden = true; });
$('#howToPlayButton').addEventListener('click', () => { $('#helpBackdrop').hidden = false; $('#helpStartButton').focus(); });
$('#helpClose').addEventListener('click', () => { $('#helpBackdrop').hidden = true; });
$('#helpStartButton').addEventListener('click', () => { $('#helpBackdrop').hidden = true; });
$('#musicButton').addEventListener('click', (event) => { const active = event.currentTarget.getAttribute('aria-pressed') === 'true'; event.currentTarget.setAttribute('aria-pressed', String(!active)); event.currentTarget.textContent = active ? '♫ Bật Nhạc' : '♫ Tắt Nhạc'; });
document.querySelectorAll('.modal-backdrop').forEach((backdrop) => backdrop.addEventListener('click', (event) => { if (event.target === backdrop && backdrop.id !== 'finalBackdrop') backdrop.hidden = true; }));

setupLevelTester();

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
