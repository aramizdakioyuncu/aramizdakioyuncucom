import os

filepath = r'c:\Users\monster-berkaytikeno\web\aramizdakioyuncucom\src\lib\constants\seedData.ts'

with open(filepath, 'r', encoding='utf-8') as f:
    lines = f.readlines()

print(f"Total lines before: {len(lines)}")

# Lines 1-257 are clean (index 0-256)
# Lines 258-312 are junk (index 257-311)
# Lines 313+ are clean (index 312+)

clean_lines = lines[:257] + ['\n'] + lines[312:]

print(f"Total lines after: {len(clean_lines)}")

with open(filepath, 'w', encoding='utf-8') as f:
    f.writelines(clean_lines)

print("Done! Removed orphaned STEP 3 code.")
