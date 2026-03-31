import cv2
import shutil

src_path = 'C:/Users/13900K/.gemini/antigravity/brain/06bc6adb-267d-4f6e-9c64-ff5b60a0db1e/media__1774988916069.png'
dest_path = 'C:/Users/13900K/Documents/GitHub/listopatron/public/assets/portada_nueva.png'

# Load the image
img = cv2.imread(src_path)
if img is not None:
    # They said "recortarla un poco hacia la derecha" 
    # Let's crop 80 pixels from the right side, so the people are visually shifted slightly right in the frame
    # Or actually, if we crop the left, the people shift left. If we crop right, people shift right in relative spacing.
    h, w = img.shape[:2]
    # Let's crop 100 pixels off the right side
    cropped = img[:, :w-100]
    
    cv2.imwrite(dest_path, cropped)
    print("Cropped and saved successfully.")
else:
    print("Could not read image")
