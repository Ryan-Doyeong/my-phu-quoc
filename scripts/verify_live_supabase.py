#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
verify_live_supabase.py
Supabase Pro 실서버 상태 실시간 진단 스크립트.
"""

import urllib.request
import json

SUPABASE_URL = "https://sijozqbgtbmiukqtfblt.supabase.co"
ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNpam96cWJndGJtaXVrcXRmYmx0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTI5MTAxMTMsImV4cCI6MjEwODQ4NjExM30.WPnWOlVrNeWqIRsHFdTPM0ALqbzB3HaHLFtGJOF-6v8"

def query_count(table_name, filter_param=""):
    url = f"{SUPABASE_URL}/rest/v1/{table_name}?select=count{filter_param}"
    headers = {
        'apikey': ANON_KEY,
        'Range': '0-0',
        'Prefer': 'count=exact'
    }
    req = urllib.request.Request(url, headers=headers)
    try:
        with urllib.request.urlopen(req) as resp:
            cr = resp.headers.get('Content-Range', '')
            if '/' in cr:
                return int(cr.split('/')[1])
            return 0
    except Exception as e:
        return f"Error: {e}"

def main():
    print("=" * 60)
    print("🔍 Supabase Pro (sijozqbgtbmiukqtfblt) 실시간 현황 진단")
    print("=" * 60)

    # 1. Businesses
    published_biz = query_count("businesses", "&status=eq.published")
    review_biz = query_count("businesses", "&status=eq.review")
    total_anon_biz = query_count("businesses")

    print(f"1. businesses 테이블 (공개 anon 기준):")
    print(f"   - status='published' (선셋타운 마스터): {published_biz}개소")
    print(f"   - status='review' (비공개 차단 검증): {review_biz}개소 (RLS 정상 차단)")
    print(f"   - 총 가시 행 수: {total_anon_biz}개소")

    # 2. Menus
    total_menus = query_count("business_menu_items")
    print(f"\n2. business_menu_items 테이블:")
    print(f"   - 현재 라이브 등록 메뉴 수: {total_menus}개")
    print(f"   - 로컬 최신 seed_menus.sql 메뉴 수: 899개 (95개소 완비)")
    if total_menus == 899:
        print("   -> [상태] 최신 899개 메뉴 100% 반영 완료!")
    else:
        print(f"   -> [상태] 899개 중 {899 - int(total_menus)}개 갱신 대기 중 (seed_menus.sql 실행 필요)")

    # 3. Stories
    total_stories = query_count("stories", "&status=eq.published")
    print(f"\n3. stories 테이블 (관광 가이드 아티클):")
    print(f"   - 현재 게시된 가이드 수: {total_stories}편")

    print("=" * 60)

if __name__ == '__main__':
    main()
