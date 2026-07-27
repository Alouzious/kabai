from app.db.session import SessionLocal
from app.crud.user import create_user, get_user_by_email
from app.schemas.user import UserCreate

db = SessionLocal()

email = input("Admin email: ")
password = input("Admin password: ")
name = input("Full name: ")

if get_user_by_email(db, email):
    print("User already exists.")
else:
    user_in = UserCreate(email=email, password=password, full_name=name, role="super_admin")
    user = create_user(db, user_in)
    print(f"Created super admin: {user.email}")

db.close()
