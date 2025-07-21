#!/usr/bin/env python3
"""
Path setup script to fix import issues in the backend.
Import this file at the top of any script that has import problems.
"""
import sys
import os
from pathlib import Path

# Get the backend directory (where this file is located)
backend_dir = Path(__file__).parent.absolute()

# Add to Python path if not already there
if str(backend_dir) not in sys.path:
    sys.path.insert(0, str(backend_dir))
    print(f"Added {backend_dir} to Python path")

# Set environment variable
os.environ['PYTHONPATH'] = str(backend_dir) + os.pathsep + os.environ.get('PYTHONPATH', '') 