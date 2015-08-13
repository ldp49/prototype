module MathHelper
    
    def gomp p
       Math.exp(-3 * Math.exp(-1 * (p - 0.05) * 15)) 
    end
    
    def wrs (rs, p)
       if rs > 1
          if p > 0.05
              rs - ((rs - 1)*gomp(p))
          else
              rs
          end
       else
            if p > 0.05
               rs + ((1 - rs)*gomp(p))
            else
               rs
            end  
       end
    end
        
end