from django.shortcuts import render
from .models import Feed, Animal, Item

def pasture_planner(request):
    feed_objs = Feed.objects.all()
    animal_objs = Animal.objects.all()
    item_objs = Item.objects.all()
    
    context = {
        "feed_list": feed_objs,
        "animal_list": animal_objs,
        "item_list": item_objs,
    }
    return render(request, "ffxiv_tools/pasture.html", context)