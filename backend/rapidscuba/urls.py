from django.conf import settings
from django.contrib import admin
from django.http import FileResponse, Http404
from django.urls import include, path, re_path

INDEX_HTML = settings.FRONTEND_DIST / "index.html"


def spa(_request, *args, **kwargs):  # noqa: ARG001
    """Serve the React SPA for any non-API, non-admin path.

    React Router (BrowserRouter) handles client-side routing, so every
    unknown URL must serve index.html so the browser can hand control to
    React. /admin/ and /api/ are matched by Django before this catch-all.
    """
    if not INDEX_HTML.exists():
        raise Http404(
            "Frontend not built. Run `npm run build` from the repo root."
        )
    return FileResponse(open(INDEX_HTML, "rb"), content_type="text/html")


urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", include("accounts.urls")),
    path("api/", include("inquiries.urls")),
    path("api/", include("analytics.urls")),
    # Catch-all for the React SPA. WhiteNoise serves real static files
    # (assets/, vite.svg, robots.txt, sitemap.xml) before this is hit.
    re_path(r"^(?:.*)/?$", spa, name="spa"),
]
