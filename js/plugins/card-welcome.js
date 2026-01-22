let ipLocation; // 确保 ipLocation 在全局范围内定义

// 进行 fetch 请求
fetch('https://api.nsmao.net/api/ip/query?key=FlY5I6P3Zj6flKBgpY9bMV5rwX') //申请key:https://api.nsmao.net
	.then(response => {
		if (!response.ok) {
			throw new Error('Network response was not ok');
		}
		return response.json();
	})
	.then(data => {
		ipLocation = data;
		if (isHomePage()) {
			showWelcome();
		}
	})
	.catch(error => console.error('Error:', error));

function getDistance(e1, n1, e2, n2) {
	const R = 6371;
	const { sin, cos, asin, PI, hypot } = Math;
	let getPoint = (e, n) => {
		e *= PI / 180;
		n *= PI / 180;
		return { x: cos(n) * cos(e), y: cos(n) * sin(e), z: sin(n) };
	};

	let a = getPoint(e1, n1);
	let b = getPoint(e2, n2);
	let c = hypot(a.x - b.x, a.y - b.y, a.z - b.z);
	let r = asin(c / 2) * 2 * R;
	return Math.round(r);
}

function showWelcome() {
	if (!ipLocation || !ipLocation.data) {
		console.error('ipLocation data is not available.');
		return;
	}

	let dist = getDistance(121.471541, 31.259207000000035, ipLocation.data.lng, ipLocation.data.lat); // 修改自己的经度（121.471541）纬度（31.259207000000035）
	let pos = ipLocation.data.country;
	let ip = ipLocation.ip;
	let posdesc;

	switch (ipLocation.data.country) {
		case "日本":
			posdesc = "よろしく，一起去看樱花吗";
			break;
		case "美国":
			posdesc = "Let us live in peace!";
			break;
		case "英国":
			posdesc = "想同你一起夜乘伦敦眼";
			break;
		case "俄罗斯":
			posdesc = "干了这瓶伏特加！";
			break;
		case "法国":
			posdesc = "C'est La Vie";
			break;
		case "德国":
			posdesc = "Die Zeit verging im Fluge.";
			break;
		case "澳大利亚":
			posdesc = "一起去大堡礁吧！";
			break;
		case "加拿大":
			posdesc = "拾起一片枫叶赠予你";
			break;
		case "中国":
			pos = ipLocation.data.prov + " " + ipLocation.data.city + " " + ipLocation.data.district;
			switch (ipLocation.data.prov) {
				case "北京市":
					posdesc = "北——京——欢迎你~~~";
					break;
				case "上海市":
					posdesc = "走在外滩，感受历史与现代的交融。";
					break;
				case "广东省":
					switch (ipLocation.data.city) {
						case "广州市":
							posdesc = "看小蛮腰，喝早茶了嘛~";
							break;
						case "深圳市":
							posdesc = "今天你逛商场了嘛~";
							break;
						default:
							posdesc = "带你感受广东的热情与美食！";
							break;
					}
					break;
				case "浙江省":
					switch (ipLocation.data.city) {
						case "杭州市":
							posdesc = "西湖美景，三月天~";
							break;
						case "宁波市":
							posdesc = "来宁波，感受大海的气息。";
							break;
						default:
							posdesc = "这里是浙江，充满江南的韵味！";
							break;
					}
					break;
				case "四川省":
					switch (ipLocation.data.city) {
						case "成都市":
							posdesc = "宽窄巷子，成都慢生活。";
							break;
						case "绵阳市":
							posdesc = "享受科技城的宁静与创新。";
							break;
						default:
							posdesc = "来四川，品麻辣火锅，赏壮丽山河。";
							break;
					}
					break;
				case "福建省":
					switch (ipLocation.data.city) {
						case "厦门市":
							posdesc = "鼓浪屿听海，厦门美食让人流连忘返。";
							break;
						case "福州市":
							posdesc = "有福之州，来此感受千年古城。";
							break;
						default:
							posdesc = "福建山水如画，美景无处不在。";
							break;
					}
					break;
				case "山东省":
					switch (ipLocation.data.city) {
						case "青岛市":
							posdesc = "来青岛喝啤酒，看大海吧！";
							break;
						case "济南市":
							posdesc = "泉城济南，四面荷花三面柳。";
							break;
						default:
							posdesc = "山东好客，欢迎来感受齐鲁文化！";
							break;
					}
					break;
				case "江苏省":
					switch (ipLocation.data.city) {
						case "南京市":
							posdesc = "六朝古都南京，历史与现代的碰撞。";
							break;
						case "苏州市":
							posdesc = "来苏州，感受园林之美。";
							break;
						default:
							posdesc = "水乡泽国，江南佳丽地。";
							break;
					}
					break;
				case "河北省":
					posdesc = "燕赵大地，英雄辈出的河北，等你探索！";
					break;
				case "河南省":
					switch (ipLocation.data.city) {
						case "郑州市":
							posdesc = "中原大地，郑州是交通枢纽与历史重镇。";
							break;
						case "洛阳市":
							posdesc = "千年古都洛阳，牡丹花开的城市。";
							break;
						default:
							posdesc = "这里是河南，历史悠久文化灿烂。";
							break;
					}
					break;
				case "湖南省":
					switch (ipLocation.data.city) {
						case "长沙市":
							posdesc = "热辣长沙，吃小龙虾逛黄兴路步行街。";
							break;
						default:
							posdesc = "湖南，烟雨迷蒙的湘江流过这片土地。";
							break;
					}
					break;
				case "湖北省":
					switch (ipLocation.data.city) {
						case "武汉市":
							posdesc = "来大武汉，过长江大桥，吃热干面！";
							break;
						default:
							posdesc = "湖北，长江中游的明珠，风景秀丽。";
							break;
					}
					break;
				case "安徽省":
					switch (ipLocation.data.city) {
						case "合肥市":
							posdesc = "创新之城合肥，科教文化汇聚地。";
							break;
						default:
							posdesc = "安徽山水，黄山、九华山欢迎你。";
							break;
					}
					break;
				case "广西壮族自治区":
					switch (ipLocation.data.city) {
						case "桂林市":
							posdesc = "桂林山水甲天下，风景如画。";
							break;
						case "南宁市":
							posdesc = "绿城南宁，宜居宜游。";
							break;
						default:
							posdesc = "广西山清水秀，民俗风情浓郁。";
							break;
					}
					break;
				case "贵州省":
					posdesc = "来贵州，品茅台，赏黄果树瀑布。";
					break;
				case "云南省":
					switch (ipLocation.data.city) {
						case "昆明市":
							posdesc = "春城昆明，四季如春，风景秀丽。";
							break;
						case "大理市":
							posdesc = "苍山洱海，大理古城，你来了就不想走。";
							break;
						default:
							posdesc = "云南风景独特，风情万种。";
							break;
					}
					break;
				case "西藏自治区":
					posdesc = "世界屋脊西藏，神秘而纯净。";
					break;
				case "新疆维吾尔自治区":
					posdesc = "辽阔新疆，民族风情与壮丽景观并存。";
					break;
				case "内蒙古自治区":
					posdesc = "草原辽阔的内蒙古，等你来策马奔腾。";
					break;
				case "宁夏回族自治区":
					posdesc = "宁夏，塞上江南，黄河流经的美丽地方。";
					break;
				case "海南省":
					posdesc = "阳光、沙滩、椰风海韵，欢迎来海南度假。";
					break;
				default:
					posdesc = "带我去你的城市逛逛吧！";
					break;
			}
			break;
		default:
			posdesc = "带我去你的国家逛逛吧";
			break;
	}

	// 根据本地时间切换欢迎语
	// let timeChange;
	// let date = new Date();
	// if (date.getHours() >= 5 && date.getHours() < 11) timeChange = "<span>🌤️ 早上好，一日之计在于晨</span>";
	// else if (date.getHours() >= 11 && date.getHours() < 13) timeChange = "<span>☀️ 中午好，记得午休喔~</span>";
	// else if (date.getHours() >= 13 && date.getHours() < 17) timeChange = "<span>🕞 下午好，饮茶先啦！</span>";
	// else if (date.getHours() >= 17 && date.getHours() < 19) timeChange = "<span>🚶‍♂️ 即将下班，记得按时吃饭~</span>";
	// else if (date.getHours() >= 19 && date.getHours() < 24) timeChange = "<span>🌙 晚上好，夜生活嗨起来！</span>";
	// else timeChange = "夜深了，早点休息，少熬夜";

	let welcomeInfoElement = document.getElementById("welcome-info");

	if (welcomeInfoElement) {
		// welcomeInfoElement.innerHTML =
		// 	`欢迎来自 <b><span style="color: var(--efu-main)">${pos}</span></b> 的小友💖<br>
		// 	当前位置距博主约 <b><span style="color: var(--efu-main)">${dist.toFixed(2)}</span></b> 公里！<br>
		// 	${timeChange}<br>
		// 	Tip：<b><span style="font-size: 15px;">${posdesc}</span></b>`;
		welcomeInfoElement.innerHTML =
			`欢迎来自 <b><span style="color: var(--efu-main)">${pos}</span></b> 的朋友~<br>
			当前位置距博主约 <b><span style="color: var(--efu-main)">${dist.toFixed(2)}</span></b> 公里！<br>
			Tip：<b><span style="font-size: 15px;">${posdesc}</span></b>`;
	}
}

function handlePjaxComplete() {
	if (isHomePage()) {
		showWelcome();
	}
}

function isHomePage() {
	return window.location.pathname === '/' || window.location.pathname === '/index.html';
}

window.onload = function () {
	if (isHomePage()) {
		showWelcome();
	}
	document.addEventListener("pjax:complete", handlePjaxComplete);
}