#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
merge_translations_v3.py
docs/translation_completed_terms_v3.md에 작성된 113개 번역 항목(impact, member, intake)을
lib/i18n/locales/의 ja.ts, zh.ts, ru.ts, hi.ts 파일에 안전하게 병합합니다.
"""

import re
import subprocess

def main():
    with open('docs/translation_completed_terms_v3.md', 'r', encoding='utf-8') as f:
        doc = f.read()

    snippets_raw = re.findall(r'### 📋 (.*?)\s*```typescript\n(.*?)```', doc, re.DOTALL)
    snippets = {}
    for title, code in snippets_raw:
        if 'ja.ts' in title:
            snippets['ja'] = code.strip()
        elif 'zh.ts' in title:
            snippets['zh'] = code.strip()
        elif 'ru.ts' in title:
            snippets['ru'] = code.strip()
        elif 'hi.ts' in title:
            snippets['hi'] = code.strip()

    print(f"Extracted snippets for: {list(snippets.keys())}")

    for lang, snippet in snippets.items():
        filepath = f'lib/i18n/locales/{lang}.ts'
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()

        # Check if already merged
        if 'intake:' in content:
            print(f"{filepath} already has intake:. Skipping.")
            continue

        target = '  search: {'
        if target not in content:
            print(f"Error: Could not find target in {filepath}")
            continue

        # Format snippet with 2 spaces indentation
        indented_lines = []
        for line in snippet.splitlines():
            if line.strip():
                indented_lines.append(f"  {line}")
            else:
                indented_lines.append("")
        snippet_formatted = "\n".join(indented_lines) + ",\n"

        # Standardize metaTitle brand to 'Hello Sunset Town' matching existing ja/zh/ru/hi titles
        snippet_formatted = snippet_formatted.replace('Good Life in Phu Quoc', 'Hello Sunset Town')
        snippet_formatted = snippet_formatted.replace('Good Life Phu Quoc', 'Hello Sunset Town')

        new_content = content.replace(target, f"{snippet_formatted}{target}")

        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Successfully merged 113 keys into {filepath}!")

if __name__ == '__main__':
    main()
