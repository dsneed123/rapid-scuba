from django.conf import settings
from django.contrib import admin
from django.http import FileResponse, Http404
from django.urls import include, path

INDEX_HTML = settings.FRONTEND_DIST / "index.html"


def spa_root(_request):
    if not INDEX_HTML.exists():
        raise Http404(
            "Frontend not built. Run `npm run build` from the repo root."
        )
    return FileResponse(open(INDEX_HTML, "rb"), content_type="text/html")


urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", include("inquiries.urls")),
    # React SPA — uses HashRouter, so all client-side routes come in as "/".
    path("", spa_root, name="spa-root"),
]
