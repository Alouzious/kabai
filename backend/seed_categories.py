from app.db.session import SessionLocal
from app.models.category import Category

def slugify(name):
    return name.lower().replace(" ", "-").replace("&", "and")

def run():
    db = SessionLocal()
    try:
        project_cats = ["AI", "Machine Learning", "Web Development", "Agriculture", "Datasets", "Blockchain"]
        pub_cats = ["AI", "Machine Learning", "Agriculture", "Data Science", "Trust & Security"]

        for i, name in enumerate(project_cats):
            slug = slugify(name)
            exists = db.query(Category).filter(Category.slug == slug, Category.type == "project").first()
            if not exists:
                db.add(Category(name=name, slug=slug, type="project", order=i))

        for i, name in enumerate(pub_cats):
            slug = slugify(name)
            exists = db.query(Category).filter(Category.slug == slug, Category.type == "publication").first()
            if not exists:
                db.add(Category(name=name, slug=slug, type="publication", order=i))

        db.commit()
        print("Categories seeded successfully.")
    finally:
        db.close()

if __name__ == "__main__":
    run()
