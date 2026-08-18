from PIL import Image, ImageDraw, ImageFilter
import math
import os
import struct
import subprocess
import wave

base_dir = r'D:\birth\new one'
images_dir = os.path.join(base_dir, 'images')
music_dir = os.path.join(base_dir, 'music')
os.makedirs(images_dir, exist_ok=True)
os.makedirs(music_dir, exist_ok=True)

for idx in range(1, 7):
    width, height = 900, 1200
    img = Image.new('RGB', (width, height), '#140b18')
    d = ImageDraw.Draw(img)

    for y in range(height):
        t = y / height
        r = int(22 + 120 * t)
        g = int(14 + 40 * t)
        b = int(30 + 80 * t)
        d.line((0, y, width, y), fill=(r, g, b))

    for cx, cy, radius, color in [
        (260, 420, 220, (255, 127, 180)),
        (650, 520, 240, (179, 106, 255)),
        (450, 760, 220, (255, 198, 112)),
    ]:
        for y in range(max(0, cy - radius), min(height, cy + radius)):
            for x in range(max(0, cx - radius), min(width, cx + radius)):
                dist = math.hypot(x - cx, y - cy)
                if dist < radius:
                    alpha = max(0, 1 - (dist / radius))
                    rr, gg, bb = color
                    img.putpixel((x, y), (
                        min(255, int(rr * (0.18 + alpha * 0.9))),
                        min(255, int(gg * (0.18 + alpha * 0.88))),
                        min(255, int(bb * (0.18 + alpha * 0.9))),
                    ))

    s = ImageDraw.Draw(img)
    s.ellipse((300, 180, 580, 360), fill=(240, 190, 200))
    s.ellipse((300, 250, 620, 920), fill=(17, 10, 22))
    s.polygon([(400, 450), (470, 650), (560, 900), (330, 900), (420, 650)], fill=(255, 130, 180))
    s.polygon([(300, 520), (240, 680), (280, 930), (360, 930), (340, 630)], fill=(92, 54, 81))
    s.polygon([(620, 520), (680, 680), (640, 930), (560, 930), (580, 630)], fill=(92, 54, 81))

    vignette = Image.new('RGBA', (width, height), (0, 0, 0, 0))
    vpx = vignette.load()
    cx, cy = width / 2, height / 2
    max_dist = math.hypot(cx, cy)

    for y in range(height):
        for x in range(width):
            dist = math.hypot(x - cx, y - cy)
            alpha = int(110 * (dist / max_dist))
            if alpha > 255:
                alpha = 255
            vpx[x, y] = (0, 0, 0, alpha)

    img = Image.alpha_composite(img.convert('RGBA'), vignette).convert('RGB')
    img = img.filter(ImageFilter.GaussianBlur(0.2))
    img.save(os.path.join(images_dir, f'photo{idx}.jpg'), quality=90)

sample_rate = 22050
seconds = 18
samples = []
for i in range(sample_rate * seconds):
    t = i / sample_rate
    freq = 220 + 40 * math.sin(2 * math.pi * 0.18 * t)
    env = min(1.0, max(0.0, 1.0 - (t / seconds)))
    val = math.sin(2 * math.pi * freq * t) * 0.3 * env
    samples.append(int(max(-1, min(1, val)) * 32767))

wav_path = os.path.join(music_dir, 'love.wav')
with wave.open(wav_path, 'wb') as wav:
    wav.setnchannels(1)
    wav.setsampwidth(2)
    wav.setframerate(sample_rate)
    wav.writeframes(b''.join(struct.pack('<h', s) for s in samples))

ffmpeg_path = r'C:\Users\ELCOT\Downloads\ffmpeg-8.0.1-essentials_build (1)\ffmpeg-8.0.1-essentials_build\bin\ffmpeg.exe'
mp3_path = os.path.join(music_dir, 'love.mp3')
if os.path.exists(ffmpeg_path):
    subprocess.run([ffmpeg_path, '-y', '-i', wav_path, '-codec:a', 'libmp3lame', '-q:a', '4', mp3_path], check=True)
    print('Created 6 gallery images and love song assets.')
else:
    print('Created 6 gallery images. ffmpeg was not found, so MP3 generation was skipped.')
