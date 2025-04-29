def maximumCount(nums) -> int:
        n=sorted(list(set(nums)))
        z=n.index(0)
        print(z,n)
        p=len(n[z:])
        n=len(n[:z])
        print(p,z,n)
maximumCount([-2,-1,0,0,1,1])