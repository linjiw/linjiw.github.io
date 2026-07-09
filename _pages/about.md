---
layout: about
title: about
permalink: /
subtitle: Ph.D. Student in Computer Science at <a href='https://cs.gmu.edu/'>George Mason University</a>

profile:
  align: right
  image: prof_pic.jpg
  image_circular: false # crops the image to make it circular
  more_info: >
    <p>RobotiXX Lab</p>
    <p>George Mason University</p>
    <p>Fairfax, VA 22030</p>

selected_papers: true # includes a list of papers marked as "selected={true}"
social: true # includes social icons at the bottom of the page

highlights:
  - value: "2×"
    label: first-author papers at IROS 2025
  - value: "1st"
    label: place, 2025 BARN Challenge (simulation)
  - value: "5/5"
    label: physical off-road trials (RTW) vs 2/5 baseline
  - value: "3×"
    label: faster off-road training with adaptive rewards

announcements:
  enabled: true # includes a list of news items
  scrollable: true # adds a vertical scroll bar if there are more than 3 news items
  limit: 5 # leave blank to include all the news in the `_news` folder

latest_posts:
  enabled: true
  scrollable: true # adds a vertical scroll bar if there are more than 3 new posts items
  limit: 3 # leave blank to include all the blog posts
---

I am a Ph.D. student in Computer Science at George Mason University, advised by [Dr. Xuesu Xiao](https://cs.gmu.edu/~xiao/) at the [RobotiXX Lab](https://robotixx.cs.gmu.edu/). I study **curriculum learning for robotics**: how robots can learn complex behaviors efficiently by training on the right task, at the right difficulty, at the right time.

I am first author of two IROS 2025 papers. [GACL](https://arxiv.org/abs/2508.02988) (with [Peter Stone](https://www.cs.utexas.edu/~pstone/), UT Austin) grounds automatic curriculum generation in real robot performance, improving success rates by 6.8% on wheeled navigation and 6.1% on quadruped locomotion over state-of-the-art methods. [Reward Training Wheels](https://arxiv.org/abs/2503.15724) adapts auxiliary rewards as the robot learns — like training wheels that fade away — cutting off-road training time by 3× and succeeding in 5/5 physical off-road trials versus 2/5 for the baseline. I also co-authored [DDP](https://arxiv.org/abs/2503.20521) (IROS 2025), a navigation planner that won **1st place in the simulation phase of the 2025 BARN Challenge**, and [II-NVM](https://arxiv.org/abs/2504.08204) (IEEE RA-L 2025) on normal-vector-assisted SLAM. My current research extends curriculum learning to humanoid robots.

Before my Ph.D., I completed an M.S. in Mechanical Engineering at Carnegie Mellon University (GPA 3.94/4.0) working on 3D perception and AR-guided robotics, and a B.S. in Mechanical Engineering at the University of Cincinnati. In summer 2025 I was a Software Development Engineer Intern at AWS, where I built a statistical regression-testing and visualization platform that cut performance analysis time from 8 hours to 15 minutes.

Explore my [publications]({{ "/publications/" | relative_url }}), [projects]({{ "/projects/" | relative_url }}), and [CV]({{ "/cv/" | relative_url }}). This site also has two other worlds — [**linji OS**]({{ "/os/" | relative_url }}), a terminal-and-desktop tour, and the [**research canvas**]({{ "/canvas/" | relative_url }}), an infinite map of how everything connects — switch anytime with the pill at the bottom of the screen ✨
