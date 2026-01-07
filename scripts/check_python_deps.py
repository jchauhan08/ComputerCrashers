#!/usr/bin/env python3
"""Simple dependency check used by the Makefile targets."""

from __future__ import annotations

import importlib
import sys
from typing import Sequence

REQUIRED_IMPORTS: Sequence[str] = (
    "mammoth",
    "PIL",  # provided by the `pillow` PyPI package
    "docx",  # provided by the `python-docx` PyPI package
    "markdownify",
)

PIP_PACKAGES: Sequence[str] = (
    "mammoth",
    "pillow",
    "python-docx",
    "markdownify",
)


def main() -> None:
    missing: list[str] = []
    for package in REQUIRED_IMPORTS:
        try:
            importlib.import_module(package)
        except Exception:
            missing.append(package)

    if missing:
        joined = ", ".join(missing)
        print(f"❌ Missing Python packages: {joined}")
        print(
            "   Run: make install-deps   (or)   "
            f"{sys.executable} -m pip install {' '.join(PIP_PACKAGES)}"
        )
        sys.exit(1)

    print("✓ Python deps OK")


if __name__ == "__main__":
    main()
