lst = [1,2,3,4,5]

for x in lst:
    if x == 2:
        continue
    elif x > 4:
        break
    else:
        print(x)
else:
    print("Looped Successfully")
