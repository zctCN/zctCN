/* ========================================
   墨白博客 - 数据文件
   包含文章、分类等数据
   ======================================== */

const blogData = {
    // 文章分类
    categories: [
        {
            id: 'frontend',
            name: '前端开发',
            icon: 'fa-code',
            color: '#6366f1',
            description: '现代前端框架、工具链与最佳实践分享',
            count: 12
        },
        {
            id: 'backend',
            name: '后端架构',
            icon: 'fa-server',
            color: '#10b981',
            description: '服务端开发、数据库设计与系统架构',
            count: 8
        },
        {
            id: 'ai',
            name: 'AI 技术',
            icon: 'fa-robot',
            color: '#f59e0b',
            description: '人工智能、机器学习与大模型应用',
            count: 10
        },
        {
            id: 'devops',
            name: 'DevOps',
            icon: 'fa-cogs',
            color: '#ef4444',
            description: '持续集成、容器化与云原生技术',
            count: 6
        },
        {
            id: 'life',
            name: '生活随笔',
            icon: 'fa-coffee',
            color: '#8b5cf6',
            description: '读书笔记、旅行见闻与生活感悟',
            count: 9
        },
        {
            id: 'tools',
            name: '效率工具',
            icon: 'fa-tools',
            color: '#06b6d4',
            description: '提升开发效率的工具与技巧分享',
            count: 5
        },
        {
            id: 'design',
            name: '设计美学',
            icon: 'fa-paint-brush',
            color: '#ec4899',
            description: 'UI/UX 设计、视觉美学与创意灵感',
            count: 4
        },
        {
            id: 'tutorial',
            name: '教程指南',
            icon: 'fa-graduation-cap',
            color: '#14b8a6',
            description: '手把手教程与从零开始的入门指南',
            count: 7
        }
    ],

    // 文章列表
    articles: [
        {
            id: 1,
            title: '2026年前端开发趋势：从框架之争到AI辅助编程',
            excerpt: '回顾2025年前端领域的重要变化，展望2026年的技术方向。AI编程助手正在深刻改变我们的开发方式，而Web标准也在持续进化。本文将从框架生态、构建工具、AI集成三个维度深入探讨。',
            content: `
                <p>2025年对前端开发者来说是充满变化的一年。从React 19的稳定发布到Vue 3.5的性能突破，从Vite的生态爆发到Astro的静默革命，前端工具链正在经历前所未有的重构。</p>
                <h3>框架格局：多元化共存</h3>
                <p>React 19引入的Actions和Server Components已经改变了我们构建应用的方式。数据获取不再需要在useEffect中挣扎，RSC让服务端渲染变得自然而高效。而Vue 3.5的响应式系统重写，将性能提升到了新的高度。</p>
                <p>但最令人兴奋的是，Astro和SvelteKit正在证明：不是所有应用都需要一个重量级框架。 Islands Architecture（岛屿架构）让我们能够精确控制哪些组件需要交互性，其余部分保持静态——这极大地提升了性能。</p>
                <h3>AI辅助编程：从Copilot到自主Agent</h3>
                <p>GitHub Copilot已经从一个"代码补全工具"进化为一个"编程伙伴"。2026年，我们看到的不再是简单的行内补全，而是能够理解整个项目上下文、自主完成功能开发的AI Agent。</p>
                <p>Cursor、Windsurf等AI优先编辑器正在重新定义开发体验。它们不只是编辑器，而是集成了代码理解、自动调试、智能重构的全方位开发环境。</p>
                <h3>构建工具：速度与简洁</h3>
                <p>Vite 6的稳定和Turbopack的成熟标志着构建工具进入了"秒级"时代。冷启动时间从分钟级降到秒级，HMR几乎是即时的。开发者体验的提升直接转化为生产力的大幅增长。</p>
                <h3>展望2026</h3>
                <p>2026年前端的核心关键词是<strong>智能化</strong>和<strong>性能</strong>。AI将更深地融入开发流程，而Web平台本身也在不断吸收框架的创新——信号（Signals）、视图过渡（View Transitions）、CSS容器查询等原生特性正在减少对框架的依赖。</p>
                <p>作为开发者，拥抱变化、保持学习是唯一的选择。但更重要的是，不要被工具裹挟——始终记住，技术是为产品服务的。</p>
            `,
            category: 'frontend',
            categoryName: '前端开发',
            author: '墨白',
            authorInitial: '墨',
            date: '2026-07-28',
            readTime: '8 分钟',
            views: 2340,
            likes: 156,
            featured: true,
            image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=500&fit=crop'
        },
        {
            id: 2,
            title: '深入理解React Server Components：原理与实践',
            excerpt: 'React Server Components（RSC）是React架构的重大革新。本文将深入剖析RSC的工作原理、数据流机制，以及在Next.js 15中的最佳实践，帮助你彻底掌握服务端组件。',
            content: `
                <p>React Server Components代表了React团队对"客户端-服务端"边界的一次根本性重新思考。它不是SSR的替代品，而是一种全新的组件模型。</p>
                <h3>核心概念</h3>
                <p>RSC的核心思想很简单：让组件在服务端运行，只将渲染结果发送到客户端。这意味着：</p>
                <p>1. <strong>零客户端JS</strong>：服务端组件不会增加客户端包体积<br>
                2. <strong>直接访问后端资源</strong>：可以安全地调用数据库、读取文件系统<br>
               3. <strong>自动代码分割</strong>：按组件粒度进行代码分割</p>
                <h3>工作原理</h3>
                <p>当浏览器请求一个包含RSC的页面时，服务端会：</p>
                <p>1. 执行服务端组件树<br>
                2. 将结果序列化为一种特殊的流式格式<br>
                3. 通过HTTP流逐步发送到客户端<br>
                4. 客户端React负责水合（hydrate）客户端组件</p>
                <h3>实战建议</h3>
                <p>在使用RSC时，有几个关键原则需要遵循：</p>
                <p><strong>服务端组件默认，客户端组件显式标注。</strong> 用<code>'use client'</code>指令标记需要交互性的组件，其余保持服务端渲染。</p>
                <p><strong>注意数据获取位置。</strong> 在服务端组件中获取数据更加高效——没有额外的网络往返，没有loading状态闪烁。</p>
                <p><strong>合理划分组件边界。</strong> 将交互性组件尽可能缩小，让更多内容保持静态服务端渲染。</p>
            `,
            category: 'frontend',
            categoryName: '前端开发',
            author: '墨白',
            authorInitial: '墨',
            date: '2026-07-22',
            readTime: '12 分钟',
            views: 1890,
            likes: 132,
            featured: false,
            image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&h=400&fit=crop'
        },
        {
            id: 3,
            title: '从零搭建AI驱动的内容推荐系统',
            excerpt: '利用向量数据库和大语言模型，构建一个智能内容推荐引擎。本文涵盖Embedding生成、相似度检索、个性化排序的完整实现方案。',
            content: `
                <p>传统的推荐系统依赖协同过滤或内容标签匹配，但在小规模博客场景下，这些方法往往力不从心。AI驱动的方法为个人站点带来了新的可能。</p>
                <h3>架构概览</h3>
                <p>整个系统分为三层：</p>
                <p><strong>1. 内容理解层</strong>：使用LLM提取文章的关键信息，生成Embedding向量<br>
                <strong>2. 向量存储层</strong>：使用Pinecone或Milvus存储和检索向量<br>
                <strong>3. 个性化排序层</strong>：结合用户行为，动态调整推荐结果</p>
                <h3>Embedding生成策略</h3>
                <p>不是简单地把整篇文章丢给模型。有效的策略是：</p>
                <p>1. 提取文章摘要（用LLM生成200字摘要）<br>
                2. 提取关键词和实体<br>
                3. 结合标题、分类、标签综合生成Embedding</p>
                <h3>实时个性化</h3>
                <p>通过记录用户的阅读行为（停留时间、滚动深度、点击路径），我们可以构建一个轻量级的用户兴趣向量，实时调整推荐结果。</p>
                <p>这种方法不需要海量数据，在小规模场景下同样有效。</p>
            `,
            category: 'ai',
            categoryName: 'AI 技术',
            author: '墨白',
            authorInitial: '墨',
            date: '2026-07-18',
            readTime: '15 分钟',
            views: 3200,
            likes: 289,
            featured: false,
            image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop'
        },
        {
            id: 4,
            title: 'Docker + Kubernetes 微服务部署实战指南',
            excerpt: '从容器化到编排调度，一步步搭建生产级微服务架构。涵盖Docker多阶段构建、K8s部署清单、健康检查、自动扩缩容等核心话题。',
            content: `
                <p>微服务架构的落地离不开容器化技术。本文记录了一个真实项目从单体到微服务的完整迁移过程。</p>
                <h3>容器化策略</h3>
                <p>多阶段构建是减小镜像体积的关键技巧：</p>
                <p>第一阶段编译应用，第二阶段只复制运行时需要的文件。一个Go服务的镜像可以从500MB缩减到20MB。</p>
                <h3>Kubernetes部署清单</h3>
                <p>生产级部署需要考虑：</p>
                <p>1. <strong>资源限制</strong>：requests和limits的合理设置<br>
                2. <strong>健康检查</strong>：liveness和readiness探针<br>
                3. <strong>滚动更新</strong>：maxSurge和maxUnavailable配置<br>
                4. <strong>服务发现</strong>：ClusterIP + Ingress</p>
                <h3>监控与日志</h3>
                <p>Prometheus + Grafana + ELK是经典的监控日志方案。但别忘了分布式追踪——Jaeger或Zipkin能帮你快速定位跨服务调用的瓶颈。</p>
            `,
            category: 'devops',
            categoryName: 'DevOps',
            author: '墨白',
            authorInitial: '墨',
            date: '2026-07-15',
            readTime: '20 分钟',
            views: 1560,
            likes: 98,
            featured: false,
            image: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=600&h=400&fit=crop'
        },
        {
            id: 5,
            title: '在喧嚣中寻找安静：我的数字极简主义实践',
            excerpt: '信息过载的时代，如何重新掌控注意力？分享我过去一年实践数字极简主义的心得：从工具断舍离到专注力训练，找回深度工作的能力。',
            content: `
                <p>2025年初，我做了一个决定：大幅削减数字工具的使用。不是戒网，而是有意识地选择。</p>
                <h3>第一步：数字审计</h3>
                <p>我花了两周记录所有的数字消费：打开哪些App、浏览哪些网站、每天看多少次手机。结果令人震惊——平均每天解锁手机120次，无目的刷屏时间超过3小时。</p>
                <h3>第二步：工具断舍离</h3>
                <p>删除了37个App，只保留真正必要的。社交媒体从5个缩减到1个，而且关闭了所有推送通知。</p>
                <h3>第三步：重塑环境</h3>
                <p>物理环境也很重要。我在书桌上放了一个机械计时器，用纸笔做每日计划，把手机放在另一个房间充电。</p>
                <h3>结果</h3>
                <p>三个月后，我的日均专注时间从2小时提升到了6小时。读书量从每月1本变成了4本。最重要的是，我重新获得了"无聊"的能力——不再需要用信息填塞每一个空闲时刻。</p>
            `,
            category: 'life',
            categoryName: '生活随笔',
            author: '墨白',
            authorInitial: '墨',
            date: '2026-07-10',
            readTime: '6 分钟',
            views: 4200,
            likes: 356,
            featured: false,
            image: 'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=600&h=400&fit=crop'
        },
        {
            id: 6,
            title: 'TypeScript 5.5+ 新特性全面解析',
            excerpt: '从类型推断增强到新的工具类型，TypeScript 5.5及后续版本带来了哪些激动人心的变化？本文结合实战案例，带你掌握最新特性。',
            content: `
                <p>TypeScript的迭代速度令人惊叹。5.5版本引入的若干个特性，正在悄悄改变我们写类型的方式。</p>
                <h3>更智能的类型推断</h3>
                <p>控制流分析得到了显著增强。以前需要显式类型注解的场景，现在编译器能自动推断：</p>
                <p>数组filter的类型收窄、Promise.all的并行推断、条件类型的递归深度等都得到了改善。</p>
                <h3>新的工具类型</h3>
                <p><code>Awaited</code>类型的稳定化让异步类型处理更加优雅。配合新的条件类型推导，很多以前需要复杂hack的场景现在一行就能解决。</p>
                <h3>性能提升</h3>
                <p>5.5版本在大型项目上的编译速度提升了约30%。增量编译的优化尤为明显，保存后的反馈延迟大幅降低。</p>
            `,
            category: 'frontend',
            categoryName: '前端开发',
            author: '墨白',
            authorInitial: '墨',
            date: '2026-07-05',
            readTime: '10 分钟',
            views: 2100,
            likes: 178,
            featured: false,
            image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&h=400&fit=crop'
        },
        {
            id: 7,
            title: 'Rust + WebAssembly：前端性能优化的终极武器',
            excerpt: '当JavaScript遇到性能瓶颈时，Rust编译的WebAssembly模块可以成为破局之道。本文通过一个图像处理案例，展示Rust+WASM的完整开发流程。',
            content: `
                <p>JavaScript在绝大多数场景下性能足够好，但总有一些计算密集型任务让它力不从心：图像处理、音频分析、加密解密、物理模拟……</p>
                <h3>为什么选Rust？</h3>
                <p>相比C/C++，Rust有内存安全保证，不用担心段错误。相比Go，Rust的WASM输出更小、启动更快。wasm-pack工具链让Rust到WASM的编译变得异常简单。</p>
                <h3>实战：图像滤镜</h3>
                <p>我们用Rust实现一个高斯模糊滤镜，对比纯JS实现：</p>
                <p>JS版本处理一张4K图片需要约800ms，而Rust+WASM版本只需120ms——快了近7倍。而且WASM的内存占用更加可控。</p>
                <h3>集成到前端项目</h3>
                <p>wasm-pack build会生成npm包，可以直接在Vite或Webpack项目中使用。配合动态import实现按需加载。</p>
            `,
            category: 'frontend',
            categoryName: '前端开发',
            author: '墨白',
            authorInitial: '墨',
            date: '2026-06-28',
            readTime: '14 分钟',
            views: 1750,
            likes: 145,
            featured: false,
            image: 'https://images.unsplash.com/photo-1605379399642-870262d3d051?w=600&h=400&fit=crop'
        },
        {
            id: 8,
            title: '大语言模型的提示工程：从入门到精通',
            excerpt: '提示工程（Prompt Engineering）是与AI协作的核心技能。本文系统梳理从基础模板到高级技巧的完整知识体系，附大量实战案例。',
            content: `
                <p>和大语言模型对话看似简单，但要获得高质量的输出，需要掌握系统的提示工程方法。</p>
                <h3>基础原则</h3>
                <p>四个核心原则：明确角色、给出示例、指定格式、限制输出。</p>
                <p>一个糟糕的提示："帮我写篇文章"。<br>
                一个优秀的提示："你是一位资深技术博主，请用通俗易懂的语言写一篇关于量子计算的科普文章，面向高中生读者，800字左右，包含2-3个生动类比。"</p>
                <h3>高级技巧</h3>
                <p><strong>思维链（Chain of Thought）</strong>：让模型展示推理过程，显著提升复杂问题的准确率。</p>
                <p><strong>自我一致性（Self-Consistency）</strong>：多次采样取多数答案，减少随机性。</p>
                <p><strong>ReAct模式</strong>：将推理和行动交替进行，让模型能够使用工具（搜索、计算器等）。</p>
                <h3>实战案例库</h3>
                <p>本文附带了20+经过验证的提示模板，涵盖写作、编程、分析、翻译等常见场景，拿来即用。</p>
            `,
            category: 'ai',
            categoryName: 'AI 技术',
            author: '墨白',
            authorInitial: '墨',
            date: '2026-06-22',
            readTime: '18 分钟',
            views: 5600,
            likes: 423,
            featured: false,
            image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=600&h=400&fit=crop'
        },
        {
            id: 9,
            title: 'PostgreSQL性能调优：从慢查询到毫秒响应',
            excerpt: '一个真实的PostgreSQL性能优化案例：从3秒的慢查询到50ms的闪电响应。涵盖执行计划分析、索引策略、查询重写和参数调优。',
            content: `
                <p>每个后端开发者都会遇到数据库性能问题。本文记录了一个电商平台的订单查询优化全过程。</p>
                <h3>问题诊断</h3>
                <p>用户反馈订单列表加载缓慢。用EXPLAIN ANALYZE分析后发现：一个缺少索引的JOIN操作导致了全表扫描，120万行数据逐一比对。</p>
                <h3>优化策略</h3>
                <p>1. <strong>添加复合索引</strong>：根据查询模式设计最左前缀索引<br>
                2. <strong>查询重写</strong>：将子查询改为JOIN，利用索引覆盖<br>
                3. <strong>分区表</strong>：按时间范围分区，热数据保持小体积<br>
                4. <strong>连接池调优</strong>：pgBouncer配置优化</p>
                <h3>结果</h3>
                <p>P99延迟从3200ms降到47ms，数据库CPU使用率下降60%。有时候，一个正确的索引胜过一万行代码优化。</p>
            `,
            category: 'backend',
            categoryName: '后端架构',
            author: '墨白',
            authorInitial: '墨',
            date: '2026-06-18',
            readTime: '16 分钟',
            views: 1980,
            likes: 167,
            featured: false,
            image: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=600&h=400&fit=crop'
        },
        {
            id: 10,
            title: '设计系统的构建之道：从原子到星系',
            excerpt: '如何搭建一套可扩展的设计系统？从设计令牌（Design Tokens）到组件库，从文档站到版本管理，分享我在两个大型项目中的实战经验。',
            content: `
                <p>设计系统不是简单的UI组件库，它是设计语言、开发规范和协作流程的有机结合。</p>
                <h3>设计令牌：系统的基石</h3>
                <p>颜色、间距、字体、阴影——这些基础元素需要以Token的形式管理。CSS变量 + Style Dictionary可以实现多平台同步输出。</p>
                <h3>组件分层</h3>
                <p>借鉴Atomic Design方法论：</p>
                <p><strong>原子</strong>：Button、Input、Tag<br>
                <strong>分子</strong>：SearchBar、FormField<br>
                <strong>有机体</strong>：Navigation、Card<br>
                <strong>模板</strong>：PageLayout、DashboardGrid</p>
                <h3>文档即产品</h3>
                <p>Storybook是组件文档的首选工具。但好的文档不只是展示API，还要讲清楚使用场景、设计意图和可访问性考虑。</p>
            `,
            category: 'design',
            categoryName: '设计美学',
            author: '墨白',
            authorInitial: '墨',
            date: '2026-06-12',
            readTime: '11 分钟',
            views: 1420,
            likes: 112,
            featured: false,
            image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=400&fit=crop'
        },
        {
            id: 11,
            title: '我的2026上半年读书清单与思考',
            excerpt: '上半年读了28本书，挑出最值得推荐的10本。涵盖技术、哲学、历史和小说，每本都附上我的真实感受和关键摘录。',
            content: `
                <p>读书是我保持思考活力的重要方式。2026上半年读了28本书，以下是评分最高的10本。</p>
                <h3>技术类</h3>
                <p><strong>《Designing Data-Intensive Applications》</strong>：分布式系统的圣经，第二版新增了流处理和AI系统章节，依然值得反复阅读。</p>
                <p><strong>《The Pragmatic Programmer》20周年版</strong>：经典中的经典，新版更新了大量现代开发实践。</p>
                <h3>非技术类</h3>
                <p><strong>《思考，快与慢》</strong>： Kahneman的杰作，理解了人类决策中的系统性偏差。</p>
                <p><strong>《百年孤独》</strong>：重读依然震撼。马尔克斯的魔幻现实主义让人相信文字有无穷力量。</p>
                <p><strong>《禅与摩托车维修的艺术》</strong>：关于质量、技术与哲学的深层对话，适合在人生转折期阅读。</p>
                <h3>读书方法</h3>
                <p>我坚持三个原则：做笔记、写读后感、定期回顾。Notion是我的读书数据库，每本书都有标签、评分和关键摘录。</p>
            `,
            category: 'life',
            categoryName: '生活随笔',
            author: '墨白',
            authorInitial: '墨',
            date: '2026-06-08',
            readTime: '9 分钟',
            views: 3800,
            likes: 298,
            featured: false,
            image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600&h=400&fit=crop'
        },
        {
            id: 12,
            title: 'Vite 6 深度实践：打造极致开发体验',
            excerpt: 'Vite已经成为前端构建工具的事实标准。本文深入探讨Vite 6的新特性、插件开发、自定义构建优化，以及如何迁移旧项目。',
            content: `
                <p>从Webpack到Vite的迁移是我2025年做过的最正确的技术决策之一。开发服务器的启动时间从45秒降到了1.2秒。</p>
                <h3>为什么Vite这么快？</h3>
                <p>核心在于两个设计决策：开发时用ESM原生加载（无需打包），生产时用Rollup构建（优化充分）。加上esbuild做依赖预构建，速度优势碾压传统工具。</p>
                <h3>插件生态</h3>
                <p>Vite的插件API兼容Rollup，这意味着庞大的Rollup插件生态可以直接使用。同时Vite特有的钩子（如transformIndexHtml）让特定场景的开发更加灵活。</p>
                <h3>迁移经验</h3>
                <p>从Webpack迁移的关键步骤：</p>
                <p>1. 替换entry配置为index.html中的script标签<br>
                2. 将loader/plugin映射为Vite插件<br>
                3. 环境变量从process.env改为import.meta.env<br>
                4. 逐步迁移，不要一次性重写</p>
            `,
            category: 'frontend',
            categoryName: '前端开发',
            author: '墨白',
            authorInitial: '墨',
            date: '2026-06-03',
            readTime: '13 分钟',
            views: 2300,
            likes: 189,
            featured: false,
            image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=400&fit=crop'
        }
    ]
};