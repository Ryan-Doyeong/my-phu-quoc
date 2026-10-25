"""업체별 메뉴 JSON 생성 도우미.

품목을 짧은 튜플로 적으면 작업지시문 8항 형식의 JSON으로 바꿔 저장한다.
item 튜플: (name_original, name_ko, desc_original, desc_ko, price_vnd, tags, price_note)
뒤쪽 값은 생략 가능.
"""
import json
import os

BASE = os.path.join(os.path.dirname(__file__), "..")
DB = os.path.join(BASE, "..", "3_푸꾸옥_선셋타운_전체시설_마스터DB.json")


def _db_row(name_google):
    with open(DB, encoding="utf-8") as f:
        for row in json.load(f):
            if row["name_google"] == name_google:
                return row
    raise KeyError(name_google)


def item(t, source_ref="s1"):
    t = list(t) + [None] * (7 - len(t))
    name_o, name_k, d_o, d_k, price, tags, note = t
    return {
        "name_original": name_o,
        "name_ko": name_k,
        "description_original": d_o,
        "description_ko": d_k,
        "price_vnd": price,
        "unit_original": None,
        "unit_ko": None,
        "price_note": note,
        "tags": tags or [],
        "source_ref": source_ref,
    }


def section(orig, ko, items, source_ref="s1"):
    return {"section_original": orig, "section_ko": ko,
            "items": [item(t, source_ref) for t in items]}


def save(name_google, info_level, status, sources, sections=None, *,
         menu_date=None, stale=False, price_note_global=None, known_dishes=None,
         price_range=None, conflicts=None, db_corrections=None, worker_notes=""):
    row = _db_row(name_google)
    data = {
        "name_google": name_google,
        "name_display": row["name_display"],
        "place_id": row["place_id"],
        "master_category": row["master_category"],
        "info_level": info_level,
        "status": status,
        "menu_date": menu_date,
        "stale": stale,
        "currency": "VND",
        "price_note_global": price_note_global,
        "sources": sources,
        "sections": sections or [],
        "known_dishes": known_dishes or [],
        "price_range": price_range,
        "conflicts": conflicts or [],
        "db_corrections": db_corrections or [],
        "worker_notes": worker_notes,
    }
    path = os.path.join(BASE, f"{row['place_id']}.json")
    with open(path, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    n = sum(len(s["items"]) for s in data["sections"])
    print(f"saved {path} | level={info_level} items={n}")
    return data
