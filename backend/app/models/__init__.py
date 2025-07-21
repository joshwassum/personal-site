# Database Models Package
from .database import Base, get_db
from .admin import AdminUser
from .blog import BlogPost, PostStatus
from .newsletter import Newsletter, NewsletterStatus
from .contact import ContactMessage
from .sections import SectionVisibility

# Update AdminUser to include relationships
from sqlalchemy.orm import relationship

# Add relationships to AdminUser
AdminUser.blog_posts = relationship("BlogPost", back_populates="author")
AdminUser.newsletters = relationship("Newsletter", back_populates="author") 