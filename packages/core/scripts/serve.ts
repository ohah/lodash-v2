/**
 * 정적 파일 서버 — 브라우저 ESM 테스트용 (file:// 은 ESM 로드 불가)
 */
const port = Number(process.env.PORT) || 3967;
const server = Bun.serve({
  port,
  fetch(req) {
    const url = new URL(req.url);
    let path = url.pathname === "/" ? "/test-browser.html" : url.pathname;
    if (!path.startsWith("/")) path = "/" + path;
    const file = new URL(".." + path, import.meta.url);
    return new Response(Bun.file(file), {
      headers: {
        "Content-Type": path.endsWith(".js") ? "application/javascript" : path.endsWith(".html") ? "text/html" : "application/octet-stream",
      },
    });
  },
});
console.log(`Serving at http://localhost:${server.port}`);
