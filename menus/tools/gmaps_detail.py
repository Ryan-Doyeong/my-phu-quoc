"""Google Maps 장소 상세 패널에서 가격대·메뉴 링크·리뷰 수를 읽어온다.

사용법: python3 gmaps_detail.py <place_id> [<place_id> ...]
출력: place_id별 JSON (stdout)
"""
import json
import re
import sys

from playwright.sync_api import sync_playwright


def read_place(page, place_id):
    url = f"https://www.google.com/maps/place/?q=place_id:{place_id}&hl=ko"
    page.goto(url, timeout=30000)
    page.wait_for_timeout(3500)
    main = page.locator('div[role="main"]').last
    text = main.inner_text() if main.count() else ""

    # 가격대: "₫100,000~200,000", "1인당 ₫100–200K", "₫₫" 등
    price_lines = [ln.strip() for ln in text.splitlines() if "₫" in ln]

    # 메뉴 링크 (구글맵 '메뉴' 항목은 data-item-id="menu")
    menu_links = []
    for a in main.locator('a[data-item-id="menu"], a[aria-label*="메뉴"]').all():
        href = a.get_attribute("href")
        if href and href not in menu_links:
            menu_links.append(href)

    # 리뷰 수: aria-label "리뷰 1,234개"
    reviews = None
    for el in main.locator('[aria-label*="리뷰"]').all():
        m = re.search(r"리뷰\s*([\d,]+)\s*개", el.get_attribute("aria-label") or "")
        if m:
            reviews = int(m.group(1).replace(",", ""))
            break

    # 영구 폐업 여부
    closed = "영구 폐업" in text

    return {
        "place_id": place_id,
        "title": page.title(),
        "price_lines": price_lines,
        "menu_links": menu_links,
        "review_count": reviews,
        "permanently_closed": closed,
        "maps_url": url,
    }


def main(ids):
    out = []
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_context(locale="ko-KR").new_page()
        for pid in ids:
            try:
                out.append(read_place(page, pid))
            except Exception as e:  # 개별 실패는 기록만 하고 계속 진행
                out.append({"place_id": pid, "error": str(e)})
        browser.close()
    print(json.dumps(out, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main(sys.argv[1:])
