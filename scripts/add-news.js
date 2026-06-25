const fs = require('fs');
const data = JSON.parse(fs.readFileSync('src/data/news-data.json', 'utf8'));

const newItems = [
  // 国内项目资讯 (10 items)
  {
    id: 'proj-binzhou-20-key-projects-2026',
    title: '山东滨州2026年20大重点项目全面推进：津潍高铁铺轨75%、庆章高速年底通车',
    summary: '滨州20个重点项目涵盖交通基建、产业升级、生态治理、民生保障、新能源与智慧城市六大领域。津潍高铁轨道铺设完成75%，庆章高速（136亿）路基完成85%，风电叶片及智能装备制造厂房建设完成95%，产城融合智慧大脑主体封顶。',
    source: '滨州市政府官网',
    sourceUrl: 'https://baijiahao.baidu.com/s?id=1868250462713050148',
    category: '国内项目资讯',
    language: 'zh',
    publishedAt: '2026-06-17T10:00:00+08:00',
    heat: 88,
    tags: ['重点项目', '滨州', '津潍高铁', '庆章高速', '水网筑基']
  },
  {
    id: 'proj-mit-humanoid-robot-practice-2026',
    title: '工信部联合国资委：2026年人形机器人与具身智能实景实训专项行动正式启动',
    summary: '工信部与国资委联合发文，面向制造业、服务业等场景开展人形机器人与具身智能实景实训。聚焦工业制造、医疗健康、家庭服务、特殊环境等四大应用领域，推动具身智能技术从实验室走向规模化落地。',
    source: '工业和信息化部',
    sourceUrl: 'https://www.miit.gov.cn/jgsj/kjs/wjfb/art/2026/art_cd666691abf8471fb8553d463aa416e3.html',
    category: '国内项目资讯',
    language: 'zh',
    publishedAt: '2026-06-03T15:00:00+08:00',
    heat: 85,
    tags: ['人形机器人', '具身智能', '工信部', '国资委', '实景实训']
  },
  {
    id: 'proj-jinan-smart-city-cloud-service',
    title: '济南起步区政务云服务项目成交，数字城市建设进入加速期',
    summary: '济南新旧动能转换起步区2026年政务云服务项目正式成交，加速数字城市建设进程。项目编号SDGP370193000202601000160，涵盖政务云基础设施运维、数据治理、安全合规及智慧应用四大模块，为起步区数智化转型奠定基础。',
    source: '中国政府采购网',
    sourceUrl: 'http://www.ccgp.gov.cn/cggg/dfgg/zbgg/202606/t20260617_26764918.htm',
    category: '国内项目资讯',
    language: 'zh',
    publishedAt: '2026-06-17T14:00:00+08:00',
    heat: 75,
    tags: ['政务云', '智慧城市', '济南', '数字经济', '政府采购']
  },
  {
    id: 'proj-jiangxi-jiaotou-energy-bidding',
    title: '江西省交投新能源集团2026-2027年招标代理服务中标结果公示',
    summary: '江西省交投新能源集团及司属单位2026至2027年招标代理服务中标结果正式公示。中标单位为江西交投嘉特信招标咨询有限公司，项目于6月12日开标，覆盖新能源集团及其子公司未来两年的招标采购代理需求。',
    source: '江西省公共资源交易平台',
    sourceUrl: 'http://ggzy.jiangxi.gov.cn/jyxx/002013/002013002/20260622/be844766-f597-4291-8924-95a15c98b353.html',
    category: '国内项目资讯',
    language: 'zh',
    publishedAt: '2026-06-22T09:00:00+08:00',
    heat: 70,
    tags: ['江西', '交投新能源', '招标代理', '公共资源', '政府采购']
  },
  {
    id: 'proj-zhejiang-boying-solar-storage',
    title: '浙江博英新能源年产50万套光伏+20万套储能设备扩建项目获批',
    summary: '浙江博英新能源年产50万套户用光伏发电系统、20万套户用及工商业储能电池设备扩建项目通过环评审批。项目位于嘉兴市秀洲区，标志着工商业储能赛道持续升温，户用光储一体化成为新能源领域重点方向。',
    source: '嘉兴市生态环境局',
    sourceUrl: 'https://www.xiuzhou.gov.cn/col/col1229410724/art/2026/art_0b39bb565d3743b2834942f66d7c3a25.html',
    category: '国内项目资讯',
    language: 'zh',
    publishedAt: '2026-06-18T11:00:00+08:00',
    heat: 80,
    tags: ['新能源', '光伏', '储能', '浙江', '环评审批']
  },
  {
    id: 'proj-shanghai-disney-river-construction',
    title: '上海国际旅游度假区南一片区河道二期建设工程获批，完善世界级旅游目的地配套',
    summary: '上海市发改委批复上海国际旅游度假区南一片区河道二期建设工程（沪发改环资〔2026〕100号）。项目位于浦东新区，将为国际旅游度假区的防洪排涝和水环境提升提供基础设施保障，进一步完善世界级旅游目的地的市政配套。',
    source: '上海市发改委',
    sourceUrl: 'https://app.fgw.sh.gov.cn/',
    category: '国内项目资讯',
    language: 'zh',
    publishedAt: '2026-06-18T08:00:00+08:00',
    heat: 72,
    tags: ['上海', '国际旅游度假区', '河道建设', '基础设施', '发改委批复']
  },
  {
    id: 'proj-binzhou-digital-economy-park',
    title: '滨州新能源数字经济科创产业园启动建设：数据中心+智能厂房+研发基地三位一体',
    summary: '滨州高新区新能源数字经济科创产业园一期启动基础施工，项目含数据中心、智能厂房及研发基地。2026年5月完成建设工程规划许可公示，6月启动主体施工，标志着数字经济赋能传统工业城市转型升级进入实质性阶段。',
    source: '滨州高新区管委会',
    sourceUrl: 'https://baijiahao.baidu.com/s?id=1868250462713050148',
    category: '国内项目资讯',
    language: 'zh',
    publishedAt: '2026-06-15T10:00:00+08:00',
    heat: 78,
    tags: ['数字经济', '科创产业园', '滨州', '数据中心', '产业升级']
  },
  {
    id: 'proj-xiajiang-highway-land-acquisition',
    title: '新干—兴国高速公路峡江段征地补偿安置方案公布，交通基建惠及革命老区',
    summary: '峡江县发布新干—兴国高速公路新建工程项目峡江段征地补偿安置方案（峡府字〔2026〕40号）。项目作为江西省高速路网重要组成部分，将大幅改善赣中南革命老区交通条件，为沿线经济发展打通动脉。',
    source: '峡江县人民政府',
    sourceUrl: 'https://xiajiangxian.okcis.cn/',
    category: '国内项目资讯',
    language: 'zh',
    publishedAt: '2026-06-20T08:00:00+08:00',
    heat: 74,
    tags: ['峡江', '高速公路', '征地补偿', '江西', '基础设施']
  },
  {
    id: 'proj-zhongmian-hr-outsourcing',
    title: '中国中免人力资源外包服务采购项目评审完成，北京外企中标',
    summary: '中国旅游集团中免股份有限公司人力资源外包服务采购项目（寻源单编号：ZMCGXY202605060006）完成评审。北京外企人力资源服务有限公司中标，项目覆盖订单运营支持等业务板块，助力免税龙头企业优化人力管理效能。',
    source: '新浪财经',
    sourceUrl: 'https://finance.sina.com.cn/stock/aigc/zab/2026-06-16/doc-inicpzzy6336991.shtml',
    category: '国内项目资讯',
    language: 'zh',
    publishedAt: '2026-06-15T09:00:00+08:00',
    heat: 65,
    tags: ['中国中免', '人力资源', '采购招标', '央企', '服务外包']
  },
  {
    id: 'proj-zhongdiangang-legal-consulting',
    title: '深圳中电港80万常年法律顾问服务采购，上市合规需求驱动专业化服务',
    summary: '深圳中电港技术股份有限公司启动常年法律顾问服务采购项目（企业自筹80万元），涵盖公司治理、监管合规、重大决策支持等多个法律服务领域。随着监管环境日趋复杂，科技型企业法律合规服务需求持续增长。',
    source: '新浪财经',
    sourceUrl: 'https://finance.sina.com.cn/stock/aigc/zab/2026-06-16/doc-inicpzzy6334933.shtml',
    category: '国内项目资讯',
    language: 'zh',
    publishedAt: '2026-06-15T10:00:00+08:00',
    heat: 62,
    tags: ['深圳中电港', '法律顾问', '企业采购', '合规', '科技服务']
  },
  // 国内政府补贴 (10 items)
  {
    id: 'subsidy-specialized-refined-2026',
    title: '工信部2026年专精特新"小巨人"企业认定启动：4月25日起在线申报，6月30日截止',
    summary: '工信部发布2026年度专精特新"小巨人"企业认定和复核通知（工信厅企业函〔2026〕117号）。第八批认定于4月25日至5月25日线上填报，省级推荐截止6月30日。此前已认定5批共1.46万家，中央财政给予每家最高600万元奖补。',
    source: '工业和信息化部',
    sourceUrl: 'https://www.miit.gov.cn/zwgk/zcwj/wjfb/tz/art/2026/art_76ee858469814146a1ce17becc6bb325.html',
    category: '国内政府补贴',
    language: 'zh',
    publishedAt: '2026-03-23T16:00:00+08:00',
    heat: 92,
    tags: ['专精特新', '小巨人', '工信部', '企业认定', '财政补贴']
  },
  {
    id: 'subsidy-national-purchase-2026',
    title: '2026年国补政策延续：625亿首批资金已下达，数码家电15%补贴单人最高省1.1万',
    summary: '商务部等5部门联合发布2026年消费品以旧换新政策，首批625亿元国补资金已下达到位。覆盖十类家电及数码智能产品，消费者享受15%购新补贴（单件最高500元），单人累计至高可省11000元。政策同时加大对设备更新和智能家居适老化的支持。',
    source: '商务部',
    sourceUrl: 'https://news.cyol.com/gb/articles/2026-01/02/content_lbRd33hWog.html',
    category: '国内政府补贴',
    language: 'zh',
    publishedAt: '2026-01-02T08:00:00+08:00',
    heat: 90,
    tags: ['国补', '以旧换新', '数码补贴', '家电补贴', '625亿']
  },
  {
    id: 'subsidy-henan-tech-qualification',
    title: '河南省2026年科技口11项资质资金申报指南：高新技术企业+瞪羚企业+创新龙头',
    summary: '河南省科技厅发布2026年科技创新企业梯度培育申报指南，涵盖科技型中小企业入库、高新技术企业认定（最高50万奖励）、瞪羚企业遴选（最高200万）、创新龙头企业培育（最高500万）等11项资质与资金支持，十五五开局之年政策窗口全面开启。',
    source: '搜狐',
    sourceUrl: 'https://www.sohu.com/a/1036474797_120756848',
    category: '国内政府补贴',
    language: 'zh',
    publishedAt: '2026-06-20T09:00:00+08:00',
    heat: 86,
    tags: ['河南', '高新技术企业', '瞪羚企业', '资质申报', '科技补贴']
  },
  {
    id: 'subsidy-shandong-innovative-sme-2026',
    title: '山东省公布2026年度创新型中小企业名单，梯次培育助力企业逐级跃升',
    summary: '山东省工信厅正式公布2026年度创新型中小企业名单，进一步完善"创新型中小企业—专精特新中小企业—专精特新小巨人企业"三级梯次培育体系。入选企业将获得政策咨询、融资对接、市场开拓等精准服务，优先推荐申报省级专精特新认定。',
    source: '新华网山东',
    sourceUrl: 'http://www.sd.xinhuanet.com/20260622/4a7ae5101a1e49078f064ee1e5205971/c.html',
    category: '国内政府补贴',
    language: 'zh',
    publishedAt: '2026-06-22T10:00:00+08:00',
    heat: 82,
    tags: ['山东', '创新型中小企业', '专精特新', '梯次培育', '政策扶持']
  },
  {
    id: 'subsidy-central-fiscal-industrial-2026',
    title: '2026年工业企业可申报中央财政资金全览：预算内投资+专项资金+超长期国债',
    summary: '梳理2026年工业企业可申报的中央财政预算资金三大渠道：中央预算内投资专项（智能制造、绿色低碳等方向）、中央财政专项资金（首台套保险补偿、中小企业发展专项等）、超长期特别国债（设备更新、重大科技攻关等），每条渠道明确支持方向与申报窗口。',
    source: '大数跨境',
    sourceUrl: 'https://www.10100.com/article/120365677',
    category: '国内政府补贴',
    language: 'zh',
    publishedAt: '2026-03-19T14:00:00+08:00',
    heat: 84,
    tags: ['中央财政', '预算内投资', '专项资金', '超长期国债', '设备更新']
  },
  {
    id: 'subsidy-hubei-college-entrepreneur-500k',
    title: '湖北大学生创业扶持最高50万正在申报，"真金白银"激励青年创业就业',
    summary: '2026年湖北省大学生创业扶持项目正在申报中，最高可获50万元无偿扶持资金。面向毕业5年内的高校毕业生，覆盖科技研发、文化创意、现代服务等领域。申报通过"湖北政务服务网"在线提交，项目评审后经公示无异议拨付至企业账户。',
    source: '湖北省人社厅',
    sourceUrl: 'http://rst.hubei.gov.cn/bmdt/spbb/202605/t20260506_5928426.shtml',
    category: '国内政府补贴',
    language: 'zh',
    publishedAt: '2026-05-06T08:00:00+08:00',
    heat: 83,
    tags: ['湖北', '大学生创业', '50万补贴', '青年创业', '无偿扶持']
  },
  {
    id: 'subsidy-qingcheng-startup-grant',
    title: '庆城县2026年一次性创业补贴开始申报：覆盖退役军人、返乡创业等多类人群',
    summary: '庆城县发布2026年一次性创业补贴申报公告，符合条件者经乡镇（社区）审核后提交县人社部门审定，公示无异议后拨付至社保卡银行账户。补贴对象包括就业困难人员、退役军人、返乡创业农民工等重点群体，申报流程全链条公开透明。',
    source: '庆城县人民政府',
    sourceUrl: 'https://www.chinaqingcheng.gov.cn/xwdt/tzgg/content_111082',
    category: '国内政府补贴',
    language: 'zh',
    publishedAt: '2026-06-25T08:00:00+08:00',
    heat: 76,
    tags: ['庆城县', '创业补贴', '一次性补贴', '退役军人', '返乡创业']
  },
  {
    id: 'subsidy-yongding-employment-driven-subsidy',
    title: '永定区创业带动就业补贴申请指南发布：按带动就业人数给予梯度式补贴',
    summary: '龙岩市永定区发布2026年创业带动就业补贴申请指南，按企业吸纳就业人数给予梯度式补贴。申请人需提供营业执照、劳动合同复印件、员工花名册等材料，材料报区劳动就业中心审核。补贴资金直接拨付至企业银行基本户，切实降低创业初期人力成本。',
    source: '永定区人民政府',
    sourceUrl: 'http://www.yongding.gov.cn/xxgk/zdxxgk/wgjy/jyzcwj/202604/t20260410_2285957.htm',
    category: '国内政府补贴',
    language: 'zh',
    publishedAt: '2026-04-10T10:00:00+08:00',
    heat: 73,
    tags: ['永定区', '创业带动就业', '就业补贴', '龙岩', '小微企业']
  },
  {
    id: 'subsidy-lufeng-ecommerce-startup',
    title: '禄丰市电商创业项目补贴申报进行中：首次创业+正常运营1年以上即可申请',
    summary: '禄丰市发布2026年一次性创业补贴及电商创业项目补贴申报公告。首次创业且工商注册时间在2023年12月20日后、正常运营1年以上的市场主体均可申请。电商创业项目额外享受专项补贴，补贴通过云南省惠民惠农补贴一卡通平台发放至申请人社保卡。',
    source: '禄丰市人民政府',
    sourceUrl: 'https://www.ynlf.gov.cn/info/1011/226124.htm',
    category: '国内政府补贴',
    language: 'zh',
    publishedAt: '2026-04-30T09:00:00+08:00',
    heat: 74,
    tags: ['禄丰市', '电商创业', '创业补贴', '云南', '一卡通']
  },
  {
    id: 'subsidy-yunnan-ecommerce-630-deadline',
    title: '6月30日截止！2026年电商创业项目补贴申报最后窗口期来临',
    summary: '云南省电商创业项目补贴申报将于6月30日截止。补贴通过云南省惠民惠农补贴资金一卡通管理平台发放至申请人社会保障卡银行账户。特别注意：补贴发放时申请人若已入职机关/国企或注销营业执照，资金不予发放。符合条件的创业者须抓紧最后窗口期提交申请。',
    source: '云岭先锋',
    sourceUrl: 'https://ylxf.1237125.cn/show/news/display/513592',
    category: '国内政府补贴',
    language: 'zh',
    publishedAt: '2026-06-18T10:00:00+08:00',
    heat: 79,
    tags: ['电商创业', '补贴申报', '6月30日截止', '云南', '创业扶持']
  }
];

data.items.push(...newItems);
data.lastUpdated = '2026-06-25T13:38:00+08:00';
fs.writeFileSync('src/data/news-data.json', JSON.stringify(data, null, 2));

const cats = {};
data.items.forEach(i => { cats[i.category] = (cats[i.category] || 0) + 1; });
console.log('Done. Total items:', data.items.length);
console.log('Categories:');
Object.entries(cats).sort((a, b) => b[1] - a[1]).forEach(([k, v]) => console.log('  ' + k + ': ' + v));
