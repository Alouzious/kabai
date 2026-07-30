from app.db.session import SessionLocal
from app.models.core_value import CoreValue

def run():
    db = SessionLocal()
    try:
        values = [
            {
                "title": "Community First",
                "description": "We build for and with our community, ensuring every project solves a real problem people here actually face.",
                "icon_name": "Users",
                "order": 0,
            },
            {
                "title": "Hands-On Learning",
                "description": "We learn by building. Every member works on real projects, not just theory, from day one.",
                "icon_name": "Wrench",
                "order": 1,
            },
            {
                "title": "Access for All",
                "description": "AI education shouldn't depend on location. We make it accessible to any student in Kabale willing to learn.",
                "icon_name": "Unlock",
                "order": 2,
            },
            {
                "title": "Integrity in Research",
                "description": "We hold our work, and each other, to a high standard of honesty, rigor and academic integrity.",
                "icon_name": "ShieldCheck",
                "order": 3,
            },
        ]

        for v in values:
            exists = db.query(CoreValue).filter(
                CoreValue.site == "main", CoreValue.title == v["title"]
            ).first()
            if not exists:
                db.add(CoreValue(site="main", **v))

        db.commit()
        print("Core values seeded successfully.")
    finally:
        db.close()

if __name__ == "__main__":
    run()
