"""
Improved seed script.

WHY THIS EXISTS
---------------
The original seed script used `https://placehold.co/200x80?text=...` for partner
logos. That service just draws a flat gray box with your text stamped on it —
that gray box IS the final image, nothing was failing to load. It looks bad
because it *is* a bare-bones placeholder, not because anything broke.

WHAT CHANGED
------------
1. Partner logos now render as branded, colored SVG "wordmark" placeholders
   generated locally (no network call, so they never fail to load, and they
   match your site's green/black palette instead of generic gray).
2. Every asset field that should eventually hold a REAL file (logos, team
   photos, papers, etc.) is driven from the REAL_ASSETS dict below. Drop a
   real URL or a path under /mnt/user-data/uploads/... in there and the
   script will use it automatically. Anything you don't fill in falls back
   to the polished placeholder.
3. Nothing else about the DB logic changed — same models, same idempotent
   "insert if not exists" behavior as before.

HOW TO ADD YOUR REAL ASSETS
----------------------------
- If you have a real file (e.g. a partner logo PNG, a headshot, a PDF):
    Upload it, then in claude.ai it'll live at /mnt/user-data/uploads/<name>.
    For a *deployed* app you need it hosted somewhere public (S3, Cloudinary,
    your own /static folder, etc.) — a local file path won't be reachable by
    a browser rendering your live site. Put that public URL in REAL_ASSETS.
- If you don't have it yet, leave the entry as None and the placeholder
  generator below fills the gap with something that actually looks decent.
"""

from datetime import datetime, timedelta
import base64
import uuid

from app.db.session import SessionLocal
from app.models.project import Project
from app.models.team import TeamMember
from app.models.event import Event
from app.models.research_paper import ResearchPaper
from app.models.gallery import GalleryImage
from app.models.learning_resource import LearningResource
from app.models.partner import Partner

db = SessionLocal()

print("Seeding database with sample data...")

# ---------------------------------------------------------------------------
# REAL ASSET OVERRIDES
# Fill any of these in with real, publicly-reachable URLs as you get them.
# Keys map 1:1 to the "name"/"title" fields used below so it's obvious what
# each override is for. Leave as None to use the generated placeholder.
# ---------------------------------------------------------------------------
REAL_ASSETS = {
    "partners": {
        "Beta-Tech Labs": None,
        "Stellar Development Foundation": None,
        "Zindua School": None,
        "Deep Learning Indaba": None,
    },
    "team_photos": {
        "Alouzious Muhereza": None,
        "Tracy Ainembabazi": None,
        "Cosmass Tumwesigye": None,
        "Grace Nabirye": None,
    },
    "papers_pdf": {
        "Trust Modeling in Autonomous AI Agent Networks": None,
        "AI-Driven Crop Disease Diagnosis for Smallholder Farmers": None,
        "Low-Resource Speech Recognition for Regional Languages": None,
        "Predictive Modeling for Campus Resource Management": None,
    },
    "learning_video": {
        "Introduction to Neural Networks": None,
        "Building Your First FastAPI Backend": None,
        "Prompt Engineering for LLMs": None,
        "Deploying ML Models to Production": None,
    },
}

# ---------------------------------------------------------------------------
# PLACEHOLDER GENERATOR
# Produces a clean, on-brand SVG wordmark as a data URI, so it renders
# instantly with zero network dependency and never shows a broken-image icon.
# ---------------------------------------------------------------------------
BRAND_GREEN = "#00C853"
BRAND_BLACK = "#0B0B0B"


def logo_placeholder(name: str, bg: str = BRAND_BLACK, fg: str = BRAND_GREEN) -> str:
    """Branded wordmark placeholder for partner logos (200x80)."""
    label = name if len(name) <= 22 else name[:19] + "..."
    svg = f'''<svg xmlns="http://www.w3.org/2000/svg" width="200" height="80">
  <rect width="200" height="80" rx="10" fill="{bg}"/>
  <text x="50%" y="54%" text-anchor="middle" dominant-baseline="middle"
        font-family="Arial, Helvetica, sans-serif" font-size="15"
        font-weight="700" fill="{fg}">{label}</text>
</svg>'''
    encoded = base64.b64encode(svg.encode("utf-8")).decode("ascii")
    return f"data:image/svg+xml;base64,{encoded}"


def avatar_placeholder(name: str, bg: str = BRAND_GREEN, fg: str = BRAND_BLACK) -> str:
    """Initials-based avatar placeholder for team photos (400x400)."""
    initials = "".join(part[0].upper() for part in name.split()[:2])
    svg = f'''<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400">
  <rect width="400" height="400" fill="{bg}"/>
  <text x="50%" y="54%" text-anchor="middle" dominant-baseline="middle"
        font-family="Arial, Helvetica, sans-serif" font-size="140"
        font-weight="800" fill="{fg}">{initials}</text>
</svg>'''
    encoded = base64.b64encode(svg.encode("utf-8")).decode("ascii")
    return f"data:image/svg+xml;base64,{encoded}"


def asset(category: str, key: str, fallback: str) -> str:
    """Return the real asset override if present, else the fallback."""
    return REAL_ASSETS.get(category, {}).get(key) or fallback


# ---------- PROJECTS ----------
# Cover images are generic, non-identifiable stock photography (farm field,
# audio waveform, water tank, hackathon desk) — no real people or orgs
# depicted, so these are left as-is rather than routed through REAL_ASSETS.
projects_data = [
    {
        "site": "main", "title": "CropSense AI", "slug": "cropsense-ai",
        "cover_image_url": "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=800",
        "abstract": "An AI-powered crop disease detection tool for smallholder farmers in Kabale.",
        "description": "CropSense AI uses computer vision to identify common crop diseases from a smartphone photo, giving farmers instant treatment recommendations.",
        "tech_stack": ["Python", "TensorFlow", "React Native"],
        "github_url": "https://github.com/kabai/cropsense-ai",
        "live_url": "https://cropsense.kabai.dev",
        "status": "ongoing",
    },
    {
        "site": "main", "title": "Kinyarwanda Speech Recognition", "slug": "kinyarwanda-speech-recognition",
        "cover_image_url": "https://images.unsplash.com/photo-1589254065878-42c9da997008?q=80&w=800",
        "abstract": "Building an open-source speech-to-text model for local Kinyarwanda dialects.",
        "description": "This project collects and annotates speech data to train a low-resource ASR model for regional languages spoken around Kabale.",
        "tech_stack": ["Python", "PyTorch", "Whisper"],
        "github_url": "https://github.com/kabai/kinyarwanda-asr",
        "status": "ongoing",
    },
    {
        "site": "main", "title": "Campus Water Predictor", "slug": "campus-water-predictor",
        "cover_image_url": "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?q=80&w=800",
        "abstract": "A predictive model forecasting water shortages on campus based on usage patterns.",
        "description": "Using historical consumption data, this tool predicts water shortage risk days in advance, helping campus facilities plan proactively.",
        "tech_stack": ["Python", "scikit-learn", "FastAPI"],
        "status": "completed",
    },
    {
        "site": "indabax", "title": "IndabaX Attendance Bot", "slug": "indabax-attendance-bot",
        "cover_image_url": "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=800",
        "abstract": "A facial-recognition based attendance system built during an IndabaX hackathon weekend.",
        "description": "Built in 48 hours during an IndabaX workshop, this tool automates attendance tracking for club events using facial recognition.",
        "tech_stack": ["Python", "OpenCV", "Flask"],
        "github_url": "https://github.com/kabai/indabax-attendance",
        "status": "completed",
    },
]

for p in projects_data:
    if not db.query(Project).filter(Project.slug == p["slug"]).first():
        db.add(Project(**p))
db.commit()
print(f"✔ Seeded {len(projects_data)} projects")

# ---------- TEAM MEMBERS ----------
current_year = datetime.utcnow().year
team_data = [
    {
        "site": "main", "name": "Alouzious Muhereza", "role": "Technical Lead",
        "bio": "Leads technical direction for the IndabaX AI Club and KAB AI platform.",
        "photo_url": asset("team_photos", "Alouzious Muhereza", avatar_placeholder("Alouzious Muhereza")),
        "year": current_year, "is_current": True,
    },
    {
        "site": "main", "name": "Tracy Ainembabazi", "role": "Events Coordinator",
        "bio": "Organizes workshops, bootcamps, and community events for the club.",
        "photo_url": asset("team_photos", "Tracy Ainembabazi", avatar_placeholder("Tracy Ainembabazi")),
        "year": current_year, "is_current": True,
    },
    {
        "site": "main", "name": "Cosmass Tumwesigye", "role": "Research Lead",
        "bio": "Coordinates research initiatives and publications across the club.",
        "photo_url": asset("team_photos", "Cosmass Tumwesigye", avatar_placeholder("Cosmass Tumwesigye")),
        "year": current_year, "is_current": True,
    },
    {
        "site": "main", "name": "Grace Nabirye", "role": "Former President",
        "bio": "Founded the club and led it through its first two years.",
        "photo_url": asset("team_photos", "Grace Nabirye", avatar_placeholder("Grace Nabirye")),
        "year": current_year - 1, "is_current": False, "is_alumni_active": True,
    },
]

for t in team_data:
    exists = db.query(TeamMember).filter(
        TeamMember.name == t["name"], TeamMember.year == t["year"]
    ).first()
    if not exists:
        db.add(TeamMember(**t))
db.commit()
print(f"✔ Seeded {len(team_data)} team members")

# ---------- EVENTS ----------
events_data = [
    {
        "site": "main", "title": "AI Beyond Code: Entering the Agentic Era",
        "description": "A holiday masterclass exploring how AI agents are reshaping software development.",
        "banner_url": "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=800",
        "event_date": datetime.utcnow() + timedelta(days=14), "is_past": False,
    },
    {
        "site": "main", "title": "Intro to Machine Learning Bootcamp",
        "description": "A 3-day hands-on bootcamp covering ML fundamentals for beginners.",
        "banner_url": "https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?q=80&w=800",
        "event_date": datetime.utcnow() - timedelta(days=30), "is_past": True,
    },
    {
        "site": "indabax", "title": "IndabaX Kabale 2026",
        "description": "The flagship annual IndabaX gathering, bringing together AI practitioners across the region.",
        "banner_url": "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=800",
        "event_date": datetime.utcnow() + timedelta(days=60), "is_past": False,
    },
    {
        "site": "indabax", "title": "IndabaX Demo Day 2025",
        "description": "Students showcased final projects from the year's IndabaX learning track.",
        "banner_url": "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?q=80&w=800",
        "event_date": datetime.utcnow() - timedelta(days=120), "is_past": True,
    },
]

event_ids = []
for e in events_data:
    existing = db.query(Event).filter(Event.title == e["title"]).first()
    if not existing:
        event = Event(**e)
        db.add(event)
        db.commit()
        db.refresh(event)
        event_ids.append(event.id)
    else:
        event_ids.append(existing.id)
print(f"✔ Seeded {len(events_data)} events")

# ---------- RESEARCH PAPERS ----------
# NOTE: pdf_url still points at example.com placeholders unless you fill in
# REAL_ASSETS["papers_pdf"]. There isn't a sensible "placeholder PDF" to
# generate the way we did for images, so upload real papers when ready.
papers_data = [
    {
        "title": "Trust Modeling in Autonomous AI Agent Networks",
        "authors": "Alouzious Muhereza",
        "abstract": "Explores trust as a transferable, composable property in multi-agent AI systems.",
        "category": "AI Systems", "year": "2026",
        "pdf_url": asset("papers_pdf", "Trust Modeling in Autonomous AI Agent Networks",
                          "https://example.com/papers/trust-modeling-ai-agents.pdf"),
    },
    {
        "title": "AI-Driven Crop Disease Diagnosis for Smallholder Farmers",
        "authors": "CropSense AI Team",
        "abstract": "A computer vision approach to early crop disease detection in East Africa.",
        "category": "AI in Agriculture", "year": "2025",
        "pdf_url": asset("papers_pdf", "AI-Driven Crop Disease Diagnosis for Smallholder Farmers",
                          "https://example.com/papers/cropsense-diagnosis.pdf"),
    },
    {
        "title": "Low-Resource Speech Recognition for Regional Languages",
        "authors": "Kinyarwanda ASR Team",
        "abstract": "Techniques for training speech models with limited annotated data.",
        "category": "NLP", "year": "2025",
        "pdf_url": asset("papers_pdf", "Low-Resource Speech Recognition for Regional Languages",
                          "https://example.com/papers/low-resource-asr.pdf"),
    },
    {
        "title": "Predictive Modeling for Campus Resource Management",
        "authors": "Campus Water Predictor Team",
        "abstract": "Applying time-series forecasting to campus utility management.",
        "category": "Applied ML", "year": "2024",
        "pdf_url": asset("papers_pdf", "Predictive Modeling for Campus Resource Management",
                          "https://example.com/papers/campus-water-predictor.pdf"),
    },
]

for p in papers_data:
    if not db.query(ResearchPaper).filter(ResearchPaper.title == p["title"]).first():
        db.add(ResearchPaper(**p))
db.commit()
print(f"✔ Seeded {len(papers_data)} research papers")

# ---------- GALLERY IMAGES ----------
gallery_data = [
    {"event_id": event_ids[0], "image_url": "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=800", "year": "2026"},
    {"event_id": event_ids[1], "image_url": "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=800", "year": "2026"},
    {"event_id": event_ids[2], "image_url": "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800", "year": "2026"},
    {"event_id": event_ids[3], "image_url": "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=800", "year": "2025"},
]

for g in gallery_data:
    db.add(GalleryImage(**g))
db.commit()
print(f"✔ Seeded {len(gallery_data)} gallery images")

# ---------- LEARNING RESOURCES ----------
learning_data = [
    {
        "title": "Introduction to Neural Networks", "category": "Machine Learning",
        "difficulty": "beginner",
        "description": "A beginner-friendly walkthrough of how neural networks learn.",
        "cover_image_url": "https://images.unsplash.com/photo-1555255707-c07966088b7b?q=80&w=800",
        "video_url": asset("learning_video", "Introduction to Neural Networks",
                            "https://youtube.com/watch?v=example1"),
    },
    {
        "title": "Building Your First FastAPI Backend", "category": "Web Development",
        "difficulty": "intermediate",
        "description": "Learn to build a REST API from scratch using FastAPI and PostgreSQL.",
        "cover_image_url": "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=800",
        "video_url": asset("learning_video", "Building Your First FastAPI Backend",
                            "https://youtube.com/watch?v=example2"),
    },
    {
        "title": "Prompt Engineering for LLMs", "category": "AI Agents",
        "difficulty": "intermediate",
        "description": "Techniques for writing effective prompts for large language models.",
        "cover_image_url": "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=800",
        "video_url": asset("learning_video", "Prompt Engineering for LLMs",
                            "https://youtube.com/watch?v=example3"),
    },
    {
        "title": "Deploying ML Models to Production", "category": "MLOps",
        "difficulty": "advanced",
        "description": "A practical guide to serving trained models via APIs at scale.",
        "cover_image_url": "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?q=80&w=800",
        "video_url": asset("learning_video", "Deploying ML Models to Production",
                            "https://youtube.com/watch?v=example4"),
    },
]

for l in learning_data:
    if not db.query(LearningResource).filter(LearningResource.title == l["title"]).first():
        db.add(LearningResource(**l))
db.commit()
print(f"✔ Seeded {len(learning_data)} learning resources")

# ---------- PARTNERS ----------
partners_data = [
    {"site": "main", "name": "Beta-Tech Labs",
     "logo_url": asset("partners", "Beta-Tech Labs", logo_placeholder("Beta-Tech Labs")),
     "website_url": "https://betatechlabs.com"},
    {"site": "main", "name": "Stellar Development Foundation",
     "logo_url": asset("partners", "Stellar Development Foundation", logo_placeholder("Stellar Foundation")),
     "website_url": "https://stellar.org"},
    {"site": "indabax", "name": "Zindua School",
     "logo_url": asset("partners", "Zindua School", logo_placeholder("Zindua School")),
     "website_url": "https://zinduaschool.com"},
    {"site": "indabax", "name": "Deep Learning Indaba",
     "logo_url": asset("partners", "Deep Learning Indaba", logo_placeholder("DL Indaba")),
     "website_url": "https://deeplearningindaba.com"},
]

for p in partners_data:
    if not db.query(Partner).filter(Partner.name == p["name"]).first():
        db.add(Partner(**p))
db.commit()
print(f"✔ Seeded {len(partners_data)} partners")

db.close()
print("\n✅ Seeding complete!")
print("   Partner logos & team photos without a REAL_ASSETS override now use")
print("   on-brand generated placeholders instead of plain gray boxes.")
