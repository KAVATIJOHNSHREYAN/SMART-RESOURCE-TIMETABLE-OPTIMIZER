import os
import sys

# Add the backend directory to python path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from sqlalchemy.orm import Session
from app.core.database import SessionLocal, engine, Base
from app.models.users import User, RoleEnum
from app.core.security import get_password_hash

def seed_users():
    # Ensure tables exist
    Base.metadata.create_all(bind=engine)
    
    db: Session = SessionLocal()
    try:
        users_to_create = [
            {
                "email": "admin@srto.com",
                "full_name": "System Administrator",
                "hashed_password": get_password_hash("admin123"),
                "role": RoleEnum.ADMIN,
                "is_active": True
            },
            {
                "email": "faculty01@srto.com",
                "full_name": "Demo Faculty",
                "hashed_password": get_password_hash("faculty123"),
                "role": RoleEnum.FACULTY,
                "is_active": True
            },
            {
                "email": "student01@srto.com",
                "full_name": "Demo Student",
                "hashed_password": get_password_hash("student123"),
                "role": RoleEnum.STUDENT,
                "is_active": True
            }
        ]

        for user_data in users_to_create:
            # Check if user already exists
            existing_user = db.query(User).filter(User.email == user_data["email"]).first()
            if not existing_user:
                new_user = User(**user_data)
                db.add(new_user)
                print(f"Created user: {user_data['email']}")
            else:
                print(f"User already exists: {user_data['email']}")
                
        db.commit()
        print("Database seeding completed.")
    except Exception as e:
        print(f"An error occurred: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    seed_users()
