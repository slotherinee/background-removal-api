# 🧼 Background Removal API

A powerful HTTP API for removing backgrounds from images using AI-powered `@imgly/background-removal-node`.

## 📋 Features

- **AI-Powered**: Uses advanced machine learning models for precise background removal
- **Multiple Formats**: Supports JPEG, PNG, WebP image formats
- **Configurable**: Customizable output settings (quality, format, model size)
- **RESTful**: Simple HTTP API interface
- **Fast**: Optimized for performance

## 🚀 Getting Started

### Prerequisites

- Node.js 16+ 
- npm or yarn

### Installation

```bash
git clone <your-repo-url>
cd background-removal-api
npm install
```

### Development

```bash
npm run dev
```

The server will start on `http://localhost:3000`

### Production

```bash
npm run build
npm start
```

## 📡 API Reference

### Remove Background

Remove the background from an uploaded image.

**Endpoint:** `POST /api/remove-background`

**Content-Type:** `multipart/form-data`

#### Request Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `image` | File | ✅ Yes | Image file to process (JPEG, PNG, WebP) |
| `config` | JSON String | ❌ No | Configuration options (see below) |

#### Configuration Options

```json
{
  "model": "medium",           // "small" or "medium" - AI model size
  "debug": false,              // Enable debug mode
  "output": {
    "format": "image/png",     // "image/png", "image/jpeg", "image/webp", "image/x-rgba8"
    "quality": 0.8,            // 0.0 to 1.0 (for JPEG/WebP)
    "type": "foreground"       // "foreground", "background", "mask"
  }
}
```

#### Response

- **Success (200)**: Returns the processed image as binary data
- **Error (400)**: Invalid request or missing image
- **Error (500)**: Processing failed

## 🔧 Usage Examples

### Using cURL

#### Basic Background Removal

```bash
curl -X POST \
  http://localhost:3000/api/remove-background \
  -F "image=@/path/to/your/image.jpg" \
  --output result.png
```

#### With Custom Configuration

```bash
curl -X POST \
  http://localhost:3000/api/remove-background \
  -F "image=@/path/to/your/image.jpg" \
  -F 'config={"model":"small","output":{"format":"image/jpeg","quality":0.9}}' \
  --output result.jpg
```

#### Get Only the Mask

```bash
curl -X POST \
  http://localhost:3000/api/remove-background \
  -F "image=@/path/to/your/image.jpg" \
  -F 'config={"output":{"type":"mask"}}' \
  --output mask.png
```

#### High Quality WebP Output

```bash
curl -X POST \
  http://localhost:3000/api/remove-background \
  -F "image=@/path/to/your/image.jpg" \
  -F 'config={"output":{"format":"image/webp","quality":0.95}}' \
  --output result.webp
```

### Using Postman

#### Setup

1. **Method**: POST
2. **URL**: `http://localhost:3000/api/remove-background`
3. **Headers**: 
   - Remove `Content-Type` header (Postman will set it automatically for form-data)

#### Body Configuration

1. Select **form-data**
2. Add fields:

| Key | Type | Value |
|-----|------|-------|
| `image` | File | Select your image file |
| `config` | Text | `{"model":"medium","output":{"format":"image/png"}}` |

#### Save Response

1. Click **Send**
2. In the response section, click **Save Response** → **Save to a file**
3. Choose filename with appropriate extension (`.png`, `.jpg`, `.webp`)

### Using JavaScript/Fetch

```javascript
const formData = new FormData();
formData.append('image', fileInput.files[0]);
formData.append('config', JSON.stringify({
  model: 'medium',
  output: {
    format: 'image/png',
    quality: 0.8
  }
}));

fetch('http://localhost:3000/api/remove-background', {
  method: 'POST',
  body: formData
})
.then(response => response.blob())
.then(blob => {
  const url = URL.createObjectURL(blob);
  const img = document.createElement('img');
  img.src = url;
  document.body.appendChild(img);
});
```

### Using Python (requests)

```python
import requests

url = 'http://localhost:3000/api/remove-background'
files = {'image': open('input.jpg', 'rb')}
data = {'config': '{"model":"medium","output":{"format":"image/png"}}'}

response = requests.post(url, files=files, data=data)

if response.status_code == 200:
    with open('output.png', 'wb') as f:
        f.write(response.content)
    print("Background removed successfully!")
else:
    print("Error:", response.json())
```

## ⚙️ Configuration Details

### Models

- **`small`**: Faster processing, lower quality
- **`medium`**: Balanced speed and quality (recommended)

### Output Types

- **`foreground`**: Returns the subject with transparent background
- **`background`**: Returns only the background
- **`mask`**: Returns black/white mask

### Output Formats

- **`image/png`**: Best for transparency (default)
- **`image/jpeg`**: Smaller file size (no transparency)
- **`image/webp`**: Modern format with good compression
- **`image/x-rgba8`**: Raw RGBA data

## 🎯 Use Cases

- **E-commerce**: Product photography
- **Profile Pictures**: Social media avatars
- **Design**: Graphic design workflows
- **Photography**: Portrait editing
- **Content Creation**: Marketing materials

## 🚨 Error Handling

The API returns JSON error responses for failures:

```json
{
  "error": "Failed to remove background",
  "details": "Specific error message"
}
```

Common errors:
- **No image provided**: Missing `image` field
- **Unsupported format**: Invalid image file
- **Processing failed**: AI model error
- **Invalid config**: Malformed JSON configuration

## 📊 Performance Tips

1. **Use smaller models** for faster processing when quality isn't critical
2. **Optimize image size** before upload (recommend max 2048px)
3. **Choose appropriate output format** (JPEG for smaller files, PNG for transparency)
4. **Batch processing**: Process multiple images in parallel

## 🔒 Security Notes

- API accepts file uploads - implement file size limits in production
- Validate file types on the client side
- Consider rate limiting for production deployment
- Monitor disk space (temporary files are cleaned up automatically)

## 📝 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

---

**Powered by [@imgly/background-removal-node](https://img.ly/showcases/cesdk/web/background-removal)**
