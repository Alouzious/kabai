# Campaign static resources

Place the club constitution PDF here as:

```
constitution.pdf
```

Commit it to git so it reaches the server via `git pull`. Do **not** upload PDFs through the admin UI — the host does not support PDF uploads. Documents other than this constitution should be pasted as external links (e.g. Google Drive) in the admin Resources page.

This folder is served only through the FastAPI API (`GET /api/v1/resources/constitution` and the ZIP download), not as a public Apache static directory.
