const pool = require("./db");
console.log(pool);
(async () => {
  const connection = await pool.getConnection();
  console.log("数据库连接成功");

  // 删除表（如果存在）
  await connection.execute("DROP TABLE IF EXISTS transactions");
  await connection.execute("DROP TABLE IF EXISTS provinces");
  await connection.execute("DROP TABLE IF EXISTS users");

  // 创建用户表
  await connection.execute(`
    CREATE TABLE users (
        id INT AUTO_INCREMENT PRIMARY KEY COMMENT '用户ID',
        username VARCHAR(50) NOT NULL UNIQUE COMMENT '用户名',
        password_hash VARCHAR(255) NOT NULL COMMENT '密码哈希',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间'
    );
  `);
  console.log("用户表创建成功");

  // 创建交易表
  await connection.execute(`
    CREATE TABLE transactions (
        id INT AUTO_INCREMENT PRIMARY KEY COMMENT '交易ID',
        province VARCHAR(50) NOT NULL COMMENT '所属省份',
        crop_type VARCHAR(50) NOT NULL COMMENT '作物类型',
        transaction_volume INT NOT NULL COMMENT '交易量（吨）',
        transaction_price DECIMAL(10, 2) NOT NULL COMMENT '成交价（元/吨）',
        planting_season VARCHAR(50) NOT NULL COMMENT '播种期',
        transaction_date DATE NOT NULL COMMENT '交易日期',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '记录创建时间',
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '记录更新时间'
    );
  `);
  console.log("交易表创建成功");

  // 创建省份表
  await connection.execute(`
    CREATE TABLE provinces (
        id INT AUTO_INCREMENT PRIMARY KEY COMMENT '省份ID',
        province_name VARCHAR(50) NOT NULL UNIQUE COMMENT '省份名称',
        website_url VARCHAR(255) COMMENT '官网链接',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '记录创建时间',
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '记录更新时间'
    );
  `);
  console.log("省份表创建成功");

  // 插入省份数据
  await connection.execute(`
    INSERT INTO provinces (province_name, website_url)
    VALUES 
      ('全国', 'http://www.grainmarket.com'),
      ('湖北', 'http://www.hbgrain.com/xxfw/jyfxbg_new/'),
      ('广东', 'https://www.gdgrain.com/#!/list?params=%7B%22type%22:%226%22%7D'),
      ('广西', 'https://www.gxgrain.com'),
      ('云南', 'https://www.yngrain.com'),
      ('福建', 'https://fjgrainmarket.com/news_list_182232.html'),
      ('江西', 'https://www.ex-grain.cn/News'),
      ('湖南', 'http://www.hunangrain.com.cn'),
      ('贵州', 'https://www.grainmarket.com.cn/centerweb/info/detail/1038023'),
      ('四川', 'http://www.scgrain.com'),
      ('重庆', 'https://www.grainmarket.com.cn/centerweb/search/result/1/重庆%20交易'),
      ('安徽', 'https://lswz.ah.gov.cn/lssj/index.html'),
      ('江苏', 'https://lsj.jiangsu.gov.cn'),
      ('上海', 'https://www.shyouandme.com/shanghailiangyou/index.htm'),
      ('河南', 'http://www.ygrain.com'),
      ('山东', 'http://www.sdgrainmarket.com.cn/xxfw-llgc/xxfw-llgc_p1.html'),
      ('山西', 'http://www.minor-crops.com.cn'),
      ('北京', 'https://www.bjlsjyzx.com/lyxx-sz/lyxx-sz_p1.html'),
      ('天津', NULL),
      ('河北', 'http://www.hebgrain.cn'),
      ('陕西', 'https://www.shaangrain.com'),
      ('宁夏', 'http://www.nxgrain.net/xinxizhoubao/'),
      ('甘肃', NULL),
      ('青海', NULL),
      ('新疆', NULL),
      ('西藏', NULL),
      ('内蒙古', 'https://www.grainmarket.com.cn/centerweb/region/NM'),
      ('辽宁', 'https://nync.ln.gov.cn/nync/zfxxgk/fdzdgknr/tjxx/ncpxx/index.shtml'),
      ('吉林', 'https://www.jllssc.com/jyjg/index.jhtml'),
      ('黑龙江', 'http://www.hljge.com.cn/jyfw.html'),
      ('海南', NULL);
  `);
  console.log("省份数据插入成功");

  // 插入交易数据（示例数据）
  await connection.execute(`
    INSERT INTO transactions (province, crop_type, transaction_volume, transaction_price, planting_season, transaction_date)
    VALUES 
      ('湖北', '稻谷', 800, 3000.50, '春播', '2024-11-01'),
      ('广东', '稻谷', 1200, 3100.00, '春播', '2024-11-02'),
      ('广西', '稻谷', 600, 2900.75, '秋播', '2024-11-03'),
      ('云南', '稻谷', 500, 2800.00, '春播', '2024-11-04'),
      ('福建', '稻谷', 450, 3200.00, '秋播', '2024-11-05');
  `);
  console.log("交易数据插入成功");

  // 关闭数据库连接
  await connection.end();
  console.log("数据库初始化完成");
})();
