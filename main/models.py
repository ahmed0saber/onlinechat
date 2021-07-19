from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class message(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    username = models.CharField(max_length=500, blank=True, null=True)
    content = models.TextField()
    date_created = models.DateTimeField(auto_now_add=True)
    
    def save(self, *args, **kwargs):
        self.username = self.user.username
        super(message, self).save(*args, **kwargs)

    def __str__(self):
        return self.content
