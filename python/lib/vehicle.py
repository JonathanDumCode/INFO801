
class Vahicle():
    def __init__(self, tankSize, tankVolume):
        self.tankSize = tankSize
        self.tankVolume = tankVolume


    def isTankFull(self):
        if self.tankVolume >= self.tankSize:
            return True
        return False
    
    def pourGas(self, gasVolume):
        need_to_full = self.tankSize - self.tankSize
        if gasVolume > need_to_full:
            return (gasVolume - need_to_full)
        return False
        
    def needFuel(self):
        pass

    
    


