---
layout: about
title: about
permalink: /classic/
seo_title: AI Robotics Engineer & Robot Learning Researcher
subtitle: AI Robotics Engineer · Automatic Curriculum Learning · Deep RL · Embodied Agents

profile:
  align: right
  image: prof_pic.jpg
  alt: Portrait of Linji Wang
  image_circular: false # crops the image to make it circular
  more_info: >
    <p>RobotiXX Lab</p>
    <p>George Mason University</p>
    <p>Fairfax, VA 22030</p>

selected_papers: true # includes a list of papers marked as "selected={true}"
social: true # includes social icons at the bottom of the page

highlights:
  - value: "2"
    label: first/co-first-author papers at IROS 2025
  - value: "348"
    label: humanoid trajectories in Moving Through Clutter
  - value: "2nd"
    label: place in both phases, 2025 BARN Challenge
  - value: "5/5"
    label: physical off-road trials (RTW) vs 2/5 baseline

announcements:
  enabled: true # includes a list of news items
  scrollable: true # adds a vertical scroll bar if there are more than 3 news items
  limit: 5 # leave blank to include all the news in the `_news` folder

latest_posts:
  enabled: false
  scrollable: true # adds a vertical scroll bar if there are more than 3 new posts items
  limit: 3 # leave blank to include all the blog posts
---

<div class="classic-intro">
  <p class="classic-lede">I build adaptive training systems that decide <strong>what an embodied agent should practice next</strong> and <strong>how its rewards should change as it improves</strong>.</p>
  <p>I am a Computer Science Ph.D. researcher at George Mason University's <a href="https://robotixx.cs.gmu.edu/">RobotiXX Lab</a>, advised by <a href="https://people.cs.gmu.edu/~xiao/">Xuesu Xiao</a>. My work spans automatic curriculum learning, deep reinforcement learning, GPU-parallel robot simulation, physical off-road validation, and ongoing humanoid policy inference.</p>
</div>

<nav class="audience-router" aria-label="Choose a portfolio path">
  <a class="audience-route" href="{{ '/assets/pdf/resume.pdf' | relative_url }}" target="_blank" rel="noopener">
    <span>HIRING PATH</span>
    <strong>One-page resume</strong>
    <small>Experience, skills, publications, education →</small>
  </a>
  <a class="audience-route" href="{{ '/canvas/' | relative_url }}">
    <span>TECHNICAL PATH</span>
    <strong>Guided research canvas</strong>
    <small>Methods, authorship, evidence, and platforms →</small>
  </a>
  <a class="audience-route" href="https://scholar.google.com/citations?user=VURUgFMAAAAJ" target="_blank" rel="noopener">
    <span>RESEARCH RECORD</span>
    <strong>Google Scholar</strong>
    <small>Publications and citations →</small>
  </a>
</nav>

<section class="classic-thesis" aria-labelledby="thesis-heading">
  <div class="classic-thesis-copy">
    <span class="classic-eyebrow">RESEARCH THESIS</span>
    <h2 id="thesis-heading">Make training adapt to the learner.</h2>
    <p><strong>GACL adapts tasks.</strong> <strong>Reward Training Wheels adapts auxiliary rewards.</strong> Together they form a capability-aware training program: observe performance, estimate competence, and present the right challenge.</p>
  </div>
  <div class="classic-thesis-visual">
    {% include embodied_loop.liquid variant='light' %}
  </div>
</section>

<section class="classic-focus" aria-label="Signature research contributions">
  <article class="focus-card">
    <span class="focus-role">FIRST AUTHOR · IROS 2025</span>
    <h3><a href="https://arxiv.org/abs/2508.02988">GACL</a></h3>
    <p>Designed a grounded automatic curriculum framework using task representations, online performance history, and limited target-distribution samples.</p>
    <strong class="focus-evidence">+6.8% wheeled navigation · +6.1% quadruped locomotion</strong>
  </article>
  <article class="focus-card">
    <span class="focus-role">CO-FIRST AUTHOR · IROS 2025</span>
    <h3><a href="https://arxiv.org/abs/2503.15724">Reward Training Wheels</a></h3>
    <p>Co-developed proficiency-conditioned auxiliary-reward adaptation for robot RL.</p>
    <strong class="focus-evidence">Simulation: 3× faster to threshold · Physical: 5/5 vs 2/5</strong>
  </article>
  <article class="focus-card">
    <span class="focus-role">THIRD AUTHOR · ARXIV 2026</span>
    <h3><a href="https://arxiv.org/abs/2603.05993">Moving Through Clutter</a></h3>
    <p>VR data collection and evaluation for scene-aware humanoid locomotion, paired with an ongoing <a href="https://github.com/linjiw/motion_tracking_controller_bfm">C++/ROS 2/ONNX policy-inference prototype</a>.</p>
    <strong class="focus-evidence">348 trajectories · 145 cluttered 3D scenes</strong>
  </article>
</section>

<p class="classic-breadth"><strong>Research + production breadth.</strong> I also co-authored RL-based <a href="https://arxiv.org/abs/2510.05330">Adaptive Dynamics Planning</a> (4th author, ICRA 2026) and <a href="https://arxiv.org/abs/2503.20521">DDP</a> (3rd author, IROS 2025); the DDP-based RobotiXX system placed 2nd in both phases of the 2025 BARN Challenge. At AWS, I worked in C on PostgreSQL-based database internals, join processing, performance, and compatibility for <a href="https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/user-apg-adaptive-join.html">Amazon Aurora PostgreSQL</a> in summer 2026, after building statistical performance-testing infrastructure for RDS Proxy in summer 2025. Before my Ph.D., I completed an M.S. in Mechanical Engineering at Carnegie Mellon (GPA 3.94/4.0), working on 3D perception and AR scene inpainting, and a magna cum laude B.S. from the University of Cincinnati.</p>

<div class="classic-utility" aria-label="Portfolio links">
  <a href="{{ '/projects/' | relative_url }}">Projects</a>
  <a href="{{ '/publications/' | relative_url }}">All publications</a>
  <a href="{{ '/cv/' | relative_url }}">Full web CV</a>
  <a href="mailto:joewwang@outlook.com">Email</a>
</div>
