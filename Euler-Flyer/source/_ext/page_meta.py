# -*- coding: utf-8 -*-
"""在 HTML 页面上下文中注入字数统计。"""

import re

from sphinx.application import Sphinx


def _count_words(text: str) -> int:
    """统计 CJK 字符与英文单词。"""
    cjk = len(re.findall(
        r'[\u4e00-\u9fff\u3400-\u4dbf\uf900-\ufaff]', text,
    ))
    latin = len(re.findall(r'[a-zA-Z]+', text))
    return cjk + latin


def html_page_context_handler(app, pagename, templatename, context, doctree):
    if doctree is None:
        context['page_word_count'] = 0
        return

    context['page_word_count'] = _count_words(doctree.astext())


def setup(app: Sphinx):
    app.connect('html-page-context', html_page_context_handler)

    return {
        'version': '1.0',
        'parallel_read_safe': True,
        'parallel_write_safe': True,
    }
