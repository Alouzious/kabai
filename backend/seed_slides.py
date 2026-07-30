from datetime import datetime
from app.db.session import SessionLocal
from app.models.slide import Slide

def run():
    db = SessionLocal()
    try:
        slides = [
            {
                "site": "main",
                "image_url": "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1600&auto=format&fit=crop",
                "caption": "Weekly ML workshop — Kabale University AI Club members working through a hands-on model-building session.",
                "order": 0,
            },
            {
                "site": "main",
                "image_url": "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1600&auto=format&fit=crop",
                "caption": "Members collaborating on a data science project during our Saturday build sessions.",
                "order": 1,
            },
            {
                "site": "main",
                "image_url": "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1600&auto=format&fit=crop",
                "caption": "IndabaX Kabale hackathon — teams pitching solutions built over a 48-hour sprint.",
                "order": 2,
            },
            {
                "site": "main",
                "image_url": "https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=1600&auto=format&fit=crop",
                "caption": "Mentorship session with industry guests sharing real-world AI career paths.",
                "order": 3,
            },
        ]

        for s in slides:
            exists = db.query(Slide).filter(
                Slide.site == s["site"], Slide.image_url == s["image_url"]
            ).first()
            if not exists:
                db.add(Slide(**s, is_active=True))

        db.commit()
        print("Slides seeded successfully.")
    finally:
        db.close()

if __name__ == "__main__":
    run()
