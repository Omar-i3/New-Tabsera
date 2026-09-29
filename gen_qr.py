import qrcode
import io
import base64
import json

def get_b64_qr(url):
    qr = qrcode.QRCode(
        version=1,
        error_correction=qrcode.constants.ERROR_CORRECT_H,
        box_size=10,
        border=2
    )
    qr.add_data(url)
    qr.make(fit=True)
    img = qr.make_image(fill_color='#020617', back_color='#ffffff')
    buf = io.BytesIO()
    img.save(buf, format='PNG')
    return base64.b64encode(buf.getvalue()).decode('utf-8')

data = {
    'tabsera': get_b64_qr('https://omar-i3.github.io/Tabsera/'),
    'zad': get_b64_qr('https://Omar-i3.github.io/Zad-Al-Momen/')
}

with open('qr_codes.json', 'w', encoding='utf-8') as f:
    json.dump(data, f)

print('QR codes generated successfully!')
