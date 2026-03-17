import contextlib
import http.server
import os
import socket
import socketserver


HOST = "127.0.0.1"
PORT_CANDIDATES = [3000, 3001, 3002, 4173, 8000, 8080]


def pick_port():
    for port in PORT_CANDIDATES:
        with contextlib.closing(socket.socket(socket.AF_INET, socket.SOCK_STREAM)) as sock:
            sock.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
            try:
                sock.bind((HOST, port))
            except OSError:
                continue
            return port
    raise RuntimeError("No free local port found in the configured port list.")


def main():
    os.chdir(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
    port = pick_port()
    handler = http.server.SimpleHTTPRequestHandler

    class ReusableTCPServer(socketserver.TCPServer):
        allow_reuse_address = True

    with ReusableTCPServer((HOST, port), handler) as httpd:
        print(f"Serving static site at http://{HOST}:{port}")
        print("Press Ctrl+C to stop.")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nServer stopped.")


if __name__ == "__main__":
    main()
