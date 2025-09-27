export interface UploadResponse {
    public_id: string;
    secure_url: string;
    width: number;
    height: number;
    format: string;
}

export class CloudinaryUploader {
    private cloudName: string;
    private cloudPreset: string;

    constructor(cloudName: string, uploadPreset: string) {
        this.cloudName = cloudName;
        this.cloudPreset = uploadPreset
    }

    async uploadImage(file: File): Promise<UploadResponse> {
        const url = `https://api.cloudinary.com/v1_1/${this.cloudName}/image/upload`;

        const formData = new FormData()
        formData.append("file", file)
        formData.append("upload_preset", this.cloudPreset);

        const res = await fetch(url, { method: 'POST', body: formData})

        if (!res.ok) throw new Error("Upload failed")

        return res.json() as Promise<UploadResponse>;
    }

    attachInput(inputId: string, previewId: string) {
        const input = document.getElementById(inputId) as HTMLInputElement;
        const preview = document.getElementById(previewId) as HTMLDivElement;

        if (!input) throw new Error(`No input element with id=${inputId}`);
        if (!preview) throw new Error(`No preview with element with id=${previewId}`);

        input.addEventListener("change", async () => {
            if (!input.files || input.files.length === 0) return 

            const file = input.files[0]

          try {
        const result = await this.uploadImage(file);
        preview.innerHTML = `
          <p style="color: green;">✅ Upload successful!</p>
          <img src="${result.secure_url}" width="150" />
        `;
        console.log("Uploaded:", result);
      } catch (err) {
        preview.innerHTML = `<p style="color: red;">❌ Upload failed</p>`;
        console.error("Upload error:", err);
      }

        })
    }
}
