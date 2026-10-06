#!/usr/bin/env python3
"""Build ouroboros.html article page from the write-up markdown."""
import markdown
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
MD_SRC = Path.home() / "workspace/your_files/ouroboros-loop-writeup.md"
OUT = ROOT / "ouroboros.html"

md_text = MD_SRC.read_text(encoding="utf-8")
# Drop the leading H1 (we render our own hero); keep the rest
md_text = re.sub(r"^# .*\n+", "", md_text, count=1)

body = markdown.markdown(
    md_text,
    extensions=["fenced_code", "tables", "sane_lists"],
)

html = f"""<!DOCTYPE html>
<html lang="en-US">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Ouroboros: A Recursive Dev Loop Where AI Improves Code — Safely | Daniel Krydynski</title>
    <link rel="icon" type="image/x-icon" href="favicon.ico">
    <meta name="description" content="A walkthrough of Ouroboros, an open-source harness that lets AI agents find work, do the work, check the work — and only then ask a human to merge. Including the honest field notes: the reviewer that approved a destructive change, and the guard that cannot be argued with."/>
    <link rel="canonical" href="https://danielkrydynski.github.io/ouroboros.html"/>
    <meta property="og:title" content="Ouroboros: A Recursive Dev Loop Where AI Improves Code — Safely"/>
    <meta property="og:description" content="AI agents that find work, do the work, and check the work — with a human merge gate and deterministic safety rails. Field notes from real runs included."/>
    <meta property="og:url" content="https://danielkrydynski.github.io/ouroboros.html"/>
    <meta property="og:type" content="article"/>
    <meta name="twitter:card" content="summary_large_image"/>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
    <link href="https://maxcdn.bootstrapcdn.com/font-awesome/latest/css/font-awesome.min.css" rel="stylesheet">
    <link href="css/bootstrap.min.css" rel="stylesheet">
    <link href="styles/main.css" rel="stylesheet">
    <link href="styles/theme.css" rel="stylesheet">
    <style>
      body {{ background: #181a1b; color: #e4e6eb; font-family: 'Inter', sans-serif; }}
      .article-nav {{ background: rgba(24,26,27,.95); border-bottom: 1px solid #2c2f33; }}
      .article-nav a {{ color: #e4e6eb; }}
      .article-hero {{ padding: 7rem 0 3rem; text-align: center; }}
      .article-hero .kicker {{ color: #7dd3fc; text-transform: uppercase; letter-spacing: .15em; font-size: .8rem; font-weight: 600; }}
      .article-hero h1 {{ font-weight: 600; font-size: 2.4rem; line-height: 1.2; margin: 1rem auto; max-width: 820px; }}
      .article-hero .lede {{ color: #aeb4bd; font-size: 1.15rem; max-width: 700px; margin: 0 auto 1.5rem; }}
      .article-meta {{ color: #8b9097; font-size: .9rem; }}
      .article-meta .tag {{ display: inline-block; background: #23272b; border: 1px solid #34383d; border-radius: 999px; padding: .15rem .8rem; margin: .15rem; font-size: .8rem; color: #c9ced6; }}
      .article-body {{ max-width: 760px; margin: 0 auto; padding: 0 1.25rem 4rem; font-size: 1.08rem; line-height: 1.75; color: #d7dbe0; }}
      .article-body h2 {{ font-size: 1.7rem; font-weight: 600; margin: 3rem 0 1rem; color: #fff; }}
      .article-body h3 {{ font-size: 1.3rem; font-weight: 600; margin: 2.2rem 0 .8rem; color: #fff; }}
      .article-body p {{ margin-bottom: 1.2rem; }}
      .article-body a {{ color: #7dd3fc; }}
      .article-body ul, .article-body ol {{ margin-bottom: 1.2rem; padding-left: 1.6rem; }}
      .article-body li {{ margin-bottom: .5rem; }}
      .article-body blockquote {{ border-left: 3px solid #007bff; padding: .5rem 1.2rem; margin: 1.5rem 0; color: #aeb4bd; background: #1e2124; border-radius: 0 .4rem .4rem 0; }}
      .article-body code {{ font-family: 'JetBrains Mono', monospace; font-size: .88em; background: #23272b; padding: .15em .4em; border-radius: .3rem; color: #ffd479; }}
      .article-body pre {{ background: #101214; border: 1px solid #2c2f33; border-radius: .5rem; padding: 1.1rem 1.3rem; overflow-x: auto; margin: 1.5rem 0; }}
      .article-body pre code {{ background: none; padding: 0; color: #d7dbe0; }}
      .article-body hr {{ border-color: #2c2f33; margin: 3rem 0; }}
      .article-body table {{ width: 100%; margin-bottom: 1.5rem; font-size: .95rem; }}
      .article-body th, .article-body td {{ border: 1px solid #2c2f33; padding: .55rem .8rem; text-align: left; }}
      .article-body th {{ background: #23272b; }}
      .article-cta {{ max-width: 760px; margin: 0 auto 4rem; padding: 2rem; background: #1e2124; border: 1px solid #2c2f33; border-radius: .75rem; text-align: center; }}
      .article-cta .btn {{ margin: .3rem; }}
      .footer {{ border-top: 1px solid #2c2f33; padding: 2rem 0; }}
    </style>
  </head>
  <body id="top">
    <nav class="navbar navbar-expand-lg fixed-top article-nav">
      <div class="container">
        <a class="navbar-brand" href="index.html">Daniel Krydynski</a>
        <div class="ml-auto">
          <a class="btn btn-sm btn-outline-light" href="index.html">&larr; Back to portfolio</a>
          <a class="btn btn-sm btn-primary" href="https://github.com/danielKrydynski/ouroboros" target="_blank"><i class="fa fa-github"></i> Repo</a>
        </div>
      </div>
    </nav>

    <header class="article-hero">
      <div class="container">
        <div class="kicker">Field notes &middot; Open source</div>
        <h1>Ouroboros: A Recursive Dev Loop Where AI Improves Code &mdash; Safely</h1>
        <p class="lede">A walkthrough of the harness that lets AI agents find work, do the work, check the work &mdash; and only then ask a human to merge. Including the honest parts: the reviewer that approved a destructive change, and the guard that cannot be argued with.</p>
        <div class="article-meta">
          <span>Daniel Krydynski</span> &middot; <span>October 2026</span> &middot; <span>~25 min read</span>
          <div class="mt-2">
            <span class="tag">AI agents</span><span class="tag">LLM</span><span class="tag">Python</span><span class="tag">Open source</span><span class="tag">Ollama</span>
          </div>
        </div>
      </div>
    </header>

    <main class="article-body">
{body}
    </main>

    <div class="container">
      <div class="article-cta">
        <h4 class="mb-3">Try it yourself</h4>
        <p class="text-muted">Ouroboros is open source and runs on local models via Ollama. Clone it, point it at a repo, and let the loop run.</p>
        <a class="btn btn-primary" href="https://github.com/danielKrydynski/ouroboros" target="_blank"><i class="fa fa-github"></i> danielKrydynski/ouroboros</a>
        <a class="btn btn-outline-light" href="index.html#contact">Get in touch</a>
      </div>
    </div>

    <footer class="footer">
      <div class="h4 title text-center">Daniel Krydynski</div>
      <div class="text-center text-muted">
        <p>&copy; 2026 Daniel Krydynski. All rights reserved. &bull; <a href="index.html">Portfolio</a> &bull; <a href="https://github.com/danielKrydynski" target="_blank">GitHub</a> &bull; <a href="https://www.linkedin.com/in/danielkrydynski/" target="_blank">LinkedIn</a></p>
      </div>
    </footer>
  </body>
</html>
"""
OUT.write_text(html, encoding="utf-8")
print(f"Wrote {OUT} ({len(html)//1024} KB)")
