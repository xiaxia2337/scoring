import sys
import os

if getattr(sys, 'frozen', False):
    app_dir = os.path.dirname(sys.executable)
    os.chdir(app_dir)
    template_dir = os.path.join(app_dir, 'templates')
    if os.path.exists(template_dir):
        sys.path.insert(0, app_dir)
else:
    app_dir = os.path.dirname(os.path.abspath(__file__))
    sys.path.insert(0, app_dir)

from app import app, init_db
import webbrowser
import time

print("=" * 50)
print("   评分系统 Web 服务")
print("=" * 50)
print()
print("正在启动服务器...")
print()

init_db()

def run_server():
    app.run(host='0.0.0.0', port=5000, debug=False, use_reloader=False)

import threading
server_thread = threading.Thread(target=run_server, daemon=True)
server_thread.start()

time.sleep(2)

print("=" * 50)
print("服务器启动成功！")
print("=" * 50)
print()
print("服务地址: http://localhost:5000")
print()
print("正在打开浏览器...")
time.sleep(1)
webbrowser.open("http://localhost:5000")
print()
print("关闭此窗口将停止服务")
print()

try:
    while True:
        time.sleep(1)
except KeyboardInterrupt:
    print("\n服务已停止")
