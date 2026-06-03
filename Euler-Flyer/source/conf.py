# -*- coding: utf-8 -*-

import os
import sys

# ---------------------------------------------------------
# Path
# ---------------------------------------------------------

sys.path.insert(0, os.path.abspath('.'))

# ---------------------------------------------------------
# Project information
# ---------------------------------------------------------

project = 'Euler Flyer'
copyright = '2026'
author = 'wyt'
release = '1.0.0'

# ---------------------------------------------------------
# General configuration
# ---------------------------------------------------------

extensions = [

    # 官方
    'sphinx.ext.autodoc',
    'sphinx.ext.napoleon',
    'sphinx.ext.viewcode',
    'sphinx.ext.todo',

    # Markdown 支持
    'myst_parser',
    'sphinx.ext.mathjax',
    # UI增强
    'sphinx_design',

    # 代码复制按钮
    'sphinx_copybutton',
]

# TODO 显示
todo_include_todos = True

# 模板目录
templates_path = ['_templates']

# 忽略目录
exclude_patterns = [
    '_build',
    'Thumbs.db',
    '.DS_Store',
]

# 支持 rst 和 md
source_suffix = {
    '.rst': 'restructuredtext',
    '.md': 'markdown',
}

# 中文
language = 'zh_CN'

# ---------------------------------------------------------
# HTML Theme
# ---------------------------------------------------------

html_theme = "pydata_sphinx_theme"

# Logo
html_logo = "_static/logo.png"

# favicon
html_favicon = "_static/favicon.ico"

# 静态资源
html_static_path = ['_static']

# 自定义 CSS
html_css_files = [
    'custom.css',
]

# 自定义 JS
html_js_files = [
    'custom.js',
]

# ---------------------------------------------------------
# Theme options
# ---------------------------------------------------------

html_theme_options = {

    # -------------------------------------------------
    # 导航
    # -------------------------------------------------

    # 导航栏显示几个一级目录
    "header_links_before_dropdown": 6,

    # 左侧目录展开层级
    "show_nav_level": 5,

    # 不自动折叠
    "navigation_depth": 6,

    # 显示上一页下一页
    "show_prev_next": True,

    # -------------------------------------------------
    # Logo
    # -------------------------------------------------

    "logo": {
        "text": "Euler Flyer",
    },

    # -------------------------------------------------
    # GitHub
    # -------------------------------------------------

    "icon_links": [
        {
            "name": "GitHub",
            "url": "https://github.com/Wyt-Loc",
            "icon": "fab fa-github",
            "type": "fontawesome",
        },
    ],

    # -------------------------------------------------
    # 搜索
    # -------------------------------------------------

    "navbar_end": [
        "theme-switcher",
        "navbar-icon-links",
    ],

    # -------------------------------------------------
    # TOC
    # -------------------------------------------------

    "secondary_sidebar_items": [
        "page-toc",
    ],

    # -------------------------------------------------
    # Footer
    # -------------------------------------------------

    "footer_start": ["copyright"],
    "footer_end": [],

    # -------------------------------------------------
    # Dark Mode
    # -------------------------------------------------

    "use_edit_page_button": False,
}

# ---------------------------------------------------------
# Sidebar
# ---------------------------------------------------------

html_sidebars = {
    "**": [
        "sidebar-nav-bs",
    ]
}

# ---------------------------------------------------------
# MyST Markdown
# ---------------------------------------------------------

myst_enable_extensions = [

    # 数学
    "amsmath",
    "dollarmath",

    # 提示块
    "colon_fence",

    # 定义列表
    "deflist",

    # HTML 图片
    "html_image",

    # 自动链接
    "linkify",

    # 替换
    "substitution",
]

# ---------------------------------------------------------
# Code block
# ---------------------------------------------------------

pygments_style = "sphinx"
pygments_dark_style = "monokai"

# ---------------------------------------------------------
# Copy Button
# ---------------------------------------------------------

copybutton_prompt_text = r">>> |\.\.\. |\$ "
copybutton_prompt_is_regexp = True

# ---------------------------------------------------------
# Napoleon
# ---------------------------------------------------------

napoleon_google_docstring = True
napoleon_numpy_docstring = True

# ---------------------------------------------------------
# rst Prolog
# ---------------------------------------------------------

rst_prolog = """
.. role:: red
.. role:: blue
"""

# ---------------------------------------------------------
# HTML title
# ---------------------------------------------------------

html_title = "Euler Flyer"

# ---------------------------------------------------------
# HTML context
# ---------------------------------------------------------

html_context = {
    "default_mode": "dark"
}
