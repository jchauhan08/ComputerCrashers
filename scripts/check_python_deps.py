#!/usr/bin/env python3
"""Simple dependency check used by the Makefile targets."""

from __future__ import annotations

import importlib
import sys
from typing import Sequence

REQUIRED_PACKAGES: Sequence[str] = (
    "mammoth",
    "PIL",
    "docx",
    "markdownify",
)


def main() -> None:
    missing: list[str] = []
    for package in REQUIRED_PACKAGES:
        try:
            importlib.import_module(package)
        except Exception:
            missing.append(package)

    if missing:
        joined = ", ".join(missing)
        print(f"❌ Missing Python packages: {joined}")
        print(
            "   Run: make install-deps   (or)   "
            f"{sys.executable} -m pip install {' '.join(REQUIRED_PACKAGES)}"
        )
        sys.exit(1)

    print("✓ Python deps OK")


if __name__ == "__main__":
    main()
