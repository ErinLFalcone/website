from ffxiv_tools.models import Animal, Item, Feed
import csv


with open(r'C:\Users\ErinL\Desktop\Pasture - Food.csv', newline='') as opencsv:
    csvreader = csv.reader(opencsv)
    for row in csvreader:
        dbinput = Feed(
            feed_name=row[0],
            mood_mult=row[1],
        )
        dbinput.save()
        print(dbinput.id)
        print(dbinput.feed_name)
        print(dbinput.mood_mult)

print("~~~")
print("Food input is done.")
print("~~~")

with open(r'C:\Users\ErinL\Desktop\Pasture - Items.csv', newline='') as opencsv:
    csvreader = csv.reader(opencsv)
    for row in csvreader:
        dbinput = Item(
            item_name=row[0],
            suggested_num=row[1],
        )
        dbinput.save()
        print(dbinput.id)
        print(dbinput.item_name)
        print(dbinput.suggested_num)

print("~~~")
print("Item input is done.")
print("~~~")

with open(r'C:\Users\ErinL\Desktop\Pasture - Animals.csv', newline='') as opencsv:
    csvreader = csv.reader(opencsv)
    for row in csvreader:
        dbinput = Animal(
            animal_name=row[0],
            item_1=Item.objects.get(item_name__exact=row[1]),
            item_2=Item.objects.get(item_name__exact=row[2]),
        )
        dbinput.save()
        print(dbinput.id)
        print(dbinput.animal_name)
        print(dbinput.item_1)
        print(dbinput.item_2)

print("~~~")
print("Animal input is done.")
print("~~~")