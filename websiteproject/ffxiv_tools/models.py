from django.db import models


class Item(models.Model):
    item_name = models.CharField(max_length=16)
    suggested_num = models.DecimalField(max_digits=2, decimal_places=1, default=0.0)
    
    def __str__(self):
        return self.item_name

class Animal(models.Model):
    animal_name = models.CharField(max_length=32)
    item_1 = models.ForeignKey(Item, on_delete=models.CASCADE, related_name="item_1")
    item_2 = models.ForeignKey(Item, on_delete=models.CASCADE, related_name="item_2")

    def __str__(self):
        return self.animal_name

class Feed(models.Model):
    feed_name = models.CharField(max_length=24)
    mood_mult = models.DecimalField(max_digits=3, decimal_places=2, default=0.00)

    def __str__(self):
        return self.feed_name