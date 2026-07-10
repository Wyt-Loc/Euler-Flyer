.. Euler Flyer documentation master file.

.. title:: Euler Flyer 技术文档

.. raw:: html

   <link rel="preconnect" href="https://fonts.googleapis.com">
   <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
   <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Noto+Sans+SC:wght@400;500;700&display=swap" rel="stylesheet">
   <link rel="stylesheet" href="_static/brushcode-home.css">
   <script>document.documentElement.classList.add("bc-home-page");</script>

   <div class="bc-home" id="top">
     <canvas id="bc-field" aria-hidden="true"></canvas>
     <div class="bc-grain" aria-hidden="true"></div>

     <header class="bc-header">
       <a class="bc-brand" href="#top" aria-label="Euler Flyer home">
         <span class="bc-brand-mark"></span>
         <span>Euler Flyer</span>
       </a>
       <nav class="bc-nav" aria-label="首页导航">
         <a href="#docs">Docs</a>
         <a href="#flow">Flow</a>
         <a href="#topics">Topics</a>
         <a href="https://github.com/Wyt-Loc/Euler-Flyer">GitHub</a>
       </nav>
     </header>

     <main class="bc-stage">
       <section class="bc-hero" aria-labelledby="bc-hero-title">
         <div class="bc-hero-copy">
           <p class="bc-eyebrow">BrushCode / Euler Flyer technical notebook</p>
           <h1 id="bc-hero-title">把飞行器工程文档，做成可追踪的知识场。</h1>
           <p class="bc-hero-text">
             记录 Euler Flyer 项目的环境搭建、仿真配置、制导算法、角度跟踪、自定义消息与工程验证过程。
           </p>
           <div class="bc-hero-actions">
             <a class="bc-primary-action" href="#docs">进入文档</a>
             <a class="bc-secondary-action" href="环境搭建.html">环境搭建</a>
           </div>
         </div>

         <aside class="bc-orbit" aria-label="文档状态">
           <div class="bc-orbit-ring">
             <button class="bc-orbit-core bc-sound-toggle" type="button" aria-pressed="false" aria-label="开启环境音">
               <span class="bc-disc-label">Sound</span>
               <strong>07</strong>
               <span class="bc-sound-bars" aria-hidden="true"><i></i><i></i><i></i></span>
             </button>
           </div>
           <p>从本地编译环境到仿真验证，把项目推进中的关键路径整理成可复现手册。</p>
         </aside>
       </section>

       <section class="bc-ticker" aria-label="主题">
         <div class="bc-ticker-track">
           <span>Flight dynamics</span>
           <span>Guidance</span>
           <span>ArduPilot</span>
           <span>Gazebo</span>
           <span>ROS messages</span>
           <span>Simulation</span>
           <span>Build environment</span>
         </div>
       </section>

       <section class="bc-frame bc-docs" id="docs" aria-labelledby="bc-docs-title">
         <div class="bc-section-heading">
           <p class="bc-eyebrow">Project documentation</p>
           <h2 id="bc-docs-title">核心文档入口。</h2>
         </div>

         <div class="bc-doc-grid">
           <article class="bc-doc-card bc-feature-card">
             <div class="bc-card-meta">
               <span>Start here</span>
               <span>Build</span>
             </div>
             <h3>环境搭建</h3>
             <p>整理 Euler Flyer 的依赖、工具链、本地编译与基础运行环境。</p>
             <a href="环境搭建.html">打开文档</a>
           </article>

           <article class="bc-doc-card">
             <div class="bc-card-meta">
               <span>Guidance</span>
               <span>Control</span>
             </div>
             <h3>制导项目</h3>
             <p>围绕制导、控制与仿真验证展开的项目记录。</p>
             <a href="制导项目.html">打开文档</a>
           </article>

           <article class="bc-doc-card">
             <div class="bc-card-meta">
               <span>Tracking</span>
               <span>Method</span>
             </div>
             <h3>角度跟踪法</h3>
             <p>记录角度跟踪相关思路、参数与工程实现脉络。</p>
             <a href="角度跟踪法.html">打开文档</a>
           </article>
         </div>
       </section>

       <section class="bc-frame bc-flow" id="flow" aria-labelledby="bc-flow-title">
         <div class="bc-section-heading">
           <p class="bc-eyebrow">Engineering flow</p>
           <h2 id="bc-flow-title">按工程链路继续阅读。</h2>
         </div>

         <div class="bc-note-list">
           <a class="bc-note-row" href="搭建本地编译环境.html">
             <span>01</span>
             <strong>搭建本地编译环境</strong>
             <small>Toolchain</small>
           </a>
           <a class="bc-note-row" href="Ardupilot编译配置过程.html">
             <span>02</span>
             <strong>ArduPilot 编译配置过程</strong>
             <small>ArduPilot</small>
           </a>
           <a class="bc-note-row" href="Gazebo环境配置过程.html">
             <span>03</span>
             <strong>Gazebo 环境配置过程</strong>
             <small>Simulation</small>
           </a>
           <a class="bc-note-row" href="添加自定义消息.html">
             <span>04</span>
             <strong>添加自定义消息</strong>
             <small>ROS / Msg</small>
           </a>
         </div>
       </section>

       <section class="bc-frame bc-topics" id="topics" aria-labelledby="bc-topics-title">
         <div class="bc-section-heading">
           <p class="bc-eyebrow">Topic map</p>
           <h2 id="bc-topics-title">选择一个频段。</h2>
         </div>
         <div class="bc-topic-cloud">
           <a href="环境搭建.html">环境搭建</a>
           <a href="制导项目.html">制导</a>
           <a href="角度跟踪法.html">角度跟踪</a>
           <a href="Gazebo环境配置过程.html">Gazebo</a>
           <a href="Ardupilot编译配置过程.html">ArduPilot</a>
           <a href="添加自定义消息.html">自定义消息</a>
           <a href="搭建本地编译环境.html">本地编译</a>
         </div>
       </section>
     </main>
   </div>

   <script src="_static/brushcode-home.js"></script>

.. toctree::
   :maxdepth: 2
   :caption: 项目目录
   :hidden:

   环境搭建
   制导项目
   添加自定义消息
   c++语言
   bootloader
