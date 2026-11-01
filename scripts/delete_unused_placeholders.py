# -*- coding: utf-8 -*-
"""
Delete unused placeholder menu photos (approved by user).
Target:
  - public/images/businesses/*/*_menu_*.webp
  - md5 == e064eab8403c1c406133ecc8cca7cec3
  - not in gallery_urls of businesses-registry.json and khem-beach-businesses.json
"""

import os
import hashlib
import json
from datetime import datetime

REPO_DIR = "/Users/admin/dev/my-phu-quoc"
DRIVE_DIR = "/Users/admin/내 드라이브(namdo772@gmail.com)/PhuQuoc"

BIZ_PATH = os.path.join(REPO_DIR, "data/businesses-registry.json")
KHEM_PATH = os.path.join(REPO_DIR, "data/khem-beach-businesses.json")
PUBLIC_IMG_DIR = os.path.join(REPO_DIR, "public/images/businesses")

DRIVE_LIST_PATH = os.path.join(DRIVE_DIR, "docs/progress/2026-11-01/삭제대상_플레이스홀더.txt")
REPO_LIST_PATH = os.path.join(REPO_DIR, "docs/progress/2026-11-01/삭제대상_플레이스홀더.txt")

TARGET_MD5 = "e064eab8403c1c406133ecc8cca7cec3"

biz_data = json.load(open(BIZ_PATH, encoding="utf-8"))
khem_data = json.load(open(KHEM_PATH, encoding="utf-8"))

referenced_urls = set()
for b in biz_data + khem_data:
    for u in b.get("gallery_urls", []):
        referenced_urls.add(u)

print(f"Total referenced gallery_urls: {len(referenced_urls)}")

# 1. Collect targets
deletion_targets = []
for root, dirs, files in os.walk(PUBLIC_IMG_DIR):
    for f in files:
        if "_menu_" in f and f.endswith(".webp"):
            full_path = os.path.join(root, f)
            with open(full_path, "rb") as bf:
                h = hashlib.md5(bf.read()).hexdigest()
            rel = "/" + os.path.relpath(full_path, os.path.join(REPO_DIR, "public"))
            if h == TARGET_MD5 and rel not in referenced_urls:
                size = os.path.getsize(full_path)
                deletion_targets.append({
                    "full_path": full_path,
                    "rel_path": rel,
                    "md5": h,
                    "size": size
                })

print(f"Found {len(deletion_targets)} files matching deletion criteria.")
if len(deletion_targets) != 820:
    print(f"ERROR: Expected exactly 820 files, but found {len(deletion_targets)}. Aborting!")
    exit(1)

# 2. Save target list to text file before deletion
list_content = [
    f"# 삭제 대상 플레이스홀더 목록 (사용자 승인 완료 - {datetime.now().isoformat()})",
    f"# 총 삭제 대상 파일 수: {len(deletion_targets)}개",
    f"# 삭제 기준: md5 == {TARGET_MD5} AND gallery_urls 미참조",
    "-" * 80
]

for idx, t in enumerate(deletion_targets, 1):
    list_content.append(f"{idx:03d} | {t['rel_path']} | {t['size']} bytes | {t['md5']}")

os.makedirs(os.path.dirname(DRIVE_LIST_PATH), exist_ok=True)
with open(DRIVE_LIST_PATH, "w", encoding="utf-8") as f:
    f.write("\n".join(list_content) + "\n")
print(f"Saved deletion list to Drive: {DRIVE_LIST_PATH}")

os.makedirs(os.path.dirname(REPO_LIST_PATH), exist_ok=True)
with open(REPO_LIST_PATH, "w", encoding="utf-8") as f:
    f.write("\n".join(list_content) + "\n")
print(f"Saved deletion list to Repo: {REPO_LIST_PATH}")

# 3. Perform Deletion
deleted_count = 0
for t in deletion_targets:
    os.remove(t["full_path"])
    deleted_count += 1

print(f"Successfully deleted {deleted_count} placeholder files.")

# 4. Post-deletion Verifications
remaining_menu_webps = []
remaining_target_md5_files = []

for root, dirs, files in os.walk(PUBLIC_IMG_DIR):
    for f in files:
        if "_menu_" in f and f.endswith(".webp"):
            full_path = os.path.join(root, f)
            remaining_menu_webps.append(full_path)
            with open(full_path, "rb") as bf:
                h = hashlib.md5(bf.read()).hexdigest()
            if h == TARGET_MD5:
                remaining_target_md5_files.append(full_path)

print(f"\n--- Verification 1: 남은 *_menu_*.webp 수 ---")
print(f"Count: {len(remaining_menu_webps)} (Expected: 60)")
assert len(remaining_menu_webps) == 60, f"Expected 60, got {len(remaining_menu_webps)}"

print(f"\n--- Verification 2: md5 중복 0 확인 ---")
print(f"Files with md5 {TARGET_MD5}: {len(remaining_target_md5_files)} (Expected: 0)")
assert len(remaining_target_md5_files) == 0, f"Expected 0, got {len(remaining_target_md5_files)}"

print(f"\n--- Verification 3: gallery_urls 참조 파일 전부 존재 확인 ---")
missing_referenced = []
for u in referenced_urls:
    local_path = os.path.join(REPO_DIR, "public", u.lstrip("/"))
    if not os.path.exists(local_path):
        missing_referenced.append((u, local_path))

print(f"Referenced URLs checked: {len(referenced_urls)}")
print(f"Missing referenced files: {len(missing_referenced)} (Expected: 0)")
assert len(missing_referenced) == 0, f"Expected 0 missing, got {len(missing_referenced)}"

print("\nALL VERIFICATIONS PASSED SUCCESSFULLY!")
