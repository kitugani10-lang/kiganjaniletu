import { supabase } from '@/integrations/supabase/client';

/** Compress an image file to max ~1MB using canvas */
export async function compressImage(file: File, maxSizeKB = 1024): Promise<File> {
  if (file.size <= maxSizeKB * 1024) return file;

  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      let { width, height } = img;

      const MAX_DIM = 1920;
      if (width > MAX_DIM || height > MAX_DIM) {
        const ratio = Math.min(MAX_DIM / width, MAX_DIM / height);
        width = Math.round(width * ratio);
        height = Math.round(height * ratio);
      }

      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d')!;
      ctx.drawImage(img, 0, 0, width, height);

      canvas.toBlob(
        (blob) => {
          if (blob) {
            resolve(new File([blob], file.name, { type: 'image/jpeg' }));
          } else {
            resolve(file);
          }
        },
        'image/jpeg',
        0.8
      );
    };
    img.src = URL.createObjectURL(file);
  });
}

/** Upload a file to Supabase Storage and return the public URL */
export async function uploadFile(file: File, bucket: string = 'post-images'): Promise<string> {
  const ext = file.name.split('.').pop() || 'bin';
  const path = `${crypto.randomUUID()}.${ext}`;

  const { error } = await supabase.storage
    .from(bucket)
    .upload(path, file, {
      cacheControl: '3600',
      upsert: false,
    });

  if (error) throw new Error(error.message);

  const { data } = supabase.storage.from(bucket).getPublicUrl(path);
  return data.publicUrl;
}
