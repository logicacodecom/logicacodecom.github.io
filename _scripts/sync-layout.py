"""Refresh static shared markup; no runtime fetch or build server is required."""
import argparse
from pathlib import Path
import re

ROOT = Path(__file__).resolve().parents[1]
PAGES = ["index.html", "services.html", "about-us.html", "contact.html", "services/ai-automation.html", "services/enterprise-architecture.html"]
parser = argparse.ArgumentParser()
parser.add_argument("--check", action="store_true", help="Fail if shared markup needs syncing")
args = parser.parse_args()
stale = []
for filename in PAGES:
    path = ROOT / filename
    original = path.read_text(encoding="utf-8")
    updated = original
    for part in ("header", "footer"):
        fragment = (ROOT / "_includes" / f"site-{part}.html").read_text(encoding="utf-8").strip()
        pattern = rf"<!-- shared:{part}:start -->.*?<!-- shared:{part}:end -->"
        replacement = f"<!-- shared:{part}:start -->\n{fragment}\n<!-- shared:{part}:end -->"
        updated, count = re.subn(pattern, lambda _: replacement, updated, flags=re.S)
        if count != 1:
            raise SystemExit(f"Expected one {part} marker pair in {filename}, got {count}")
    if updated != original:
        stale.append(filename)
        if not args.check:
            path.write_text(updated, encoding="utf-8")
if args.check and stale:
    raise SystemExit("Run python _scripts/sync-layout.py: " + ", ".join(stale))
print("Shared layout is current." if not stale else "Updated: " + ", ".join(stale))
