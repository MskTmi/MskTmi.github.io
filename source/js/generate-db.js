// 用于解决 https://github.com/LouisBarranqueiro/hexo-algoliasearch/issues/173
// 生成前运行 $ node generate-db.js
const Hexo = require('hexo');
const fs = require('fs');

// 忽略循环引用
function safeStringify(obj) {
    const seen = new WeakSet();
    return JSON.stringify(obj, (key, value) => {
        if (typeof value === 'object' && value !== null) {
            if (seen.has(value)) {
                return;
            }
            seen.add(value);
        }
        return value;
    }, 2);
}

async function generateDb() {
    const hexo = new Hexo(process.cwd(), {});

    try {
        console.log('Initializing Hexo...');
        await hexo.init(); // 初始化 Hexo
        console.log('Loading data...');
        await hexo.load(); // 加载 Hexo 数据

        // 获取完整的 Hexo 数据
        const data = hexo.locals.toObject();

        // 使用 safeStringify 写入 db.json
        const outputPath = './db.json';
        fs.writeFileSync(outputPath, safeStringify(data));
        console.log(`db.json has been generated at: ${outputPath}`);
    } catch (err) {
        console.error('Error generating db.json:', err);
        process.exit(1);
    }
}

generateDb();
