"""
Chạy script này 1 lần trong thư mục gốc project:
  python3 inject-backbutton.py

Script sẽ tự động thêm <script src="/backbutton.js"></script>
vào <head> của tất cả file HTML trong thư mục 2026/
(bỏ qua index.html và các file đã có rồi)
"""
import os, glob

ROOT = os.path.dirname(os.path.abspath(__file__))
INJECT = '<script src="/backbutton.js"></script>\n'
TARGET = os.path.join(ROOT, "2026")

files = glob.glob(os.path.join(TARGET, "**", "*.html"), recursive=True)

if not files:
    print("Không tìm thấy file HTML nào trong thư mục 2026/")
else:
    for path in files:
        with open(path, "r", encoding="utf-8") as f:
            content = f.read()
        
        if "backbutton.js" in content:
            print(f"  skip  {os.path.relpath(path, ROOT)}  (đã có)")
            continue
        
        if "</head>" not in content:
            print(f"  skip  {os.path.relpath(path, ROOT)}  (không có </head>)")
            continue

        new_content = content.replace("</head>", INJECT + "</head>", 1)
        with open(path, "w", encoding="utf-8") as f:
            f.write(new_content)
        print(f"  ✓     {os.path.relpath(path, ROOT)}")

print("\nXong!")