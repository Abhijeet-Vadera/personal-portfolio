import { useCallback } from 'react';
import { Auth } from 'aws-amplify';

const API_URL = import.meta.env.VITE_API_URL as string;
const MEDIA_BUCKET_DOMAIN = `https://abhijeet-portfolio-media.s3.amazonaws.com`;
const CF_DOMAIN = import.meta.env.VITE_CLOUDFRONT_DOMAIN as string;

export const getMediaUrl = (key: string) => `${MEDIA_BUCKET_DOMAIN}/${key}`;

export interface MediaAsset {
    id: string;
    key: string;
    url: string;
    name: string;
    size: string;
    type: string;
    lastModified: string;
}

const getAuthHeaders = async (): Promise<Record<string, string>> => {
    try {
        const session = await Auth.currentSession();
        const token = session.getIdToken().getJwtToken();
        return {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        };
    } catch {
        throw new Error('Not authenticated');
    }
};

export const useApi = () => {
    /** GET /content?key=<key> — fetch JSON content from S3 */
    const getContent = useCallback(async (key: string): Promise<unknown> => {
        const headers = await getAuthHeaders();
        const res = await fetch(`${API_URL}/content?key=${encodeURIComponent(key)}`, { headers });
        if (!res.ok) throw new Error(`Failed to load content: ${res.statusText}`);
        const text = await res.text();
        return JSON.parse(text);
    }, []);

    /** POST /content — save JSON content to S3 */
    const saveContent = useCallback(async (key: string, data: unknown): Promise<void> => {
        const headers = await getAuthHeaders();
        const res = await fetch(`${API_URL}/content`, {
            method: 'POST',
            headers,
            body: JSON.stringify({ key, data }),
        });
        if (!res.ok) throw new Error(`Save failed: ${res.statusText}`);
    }, []);

    /** GET /media/list — list all media assets */
    const listMedia = useCallback(async (): Promise<MediaAsset[]> => {
        const headers = await getAuthHeaders();
        const res = await fetch(`${API_URL}/media/list`, { headers });
        if (!res.ok) throw new Error(`Failed to list media: ${res.statusText}`);
        const data = await res.json();
        // data is array of { key, size, lastModified, contentType }
        return (data as Array<{ key: string; size: number; lastModified: string; contentType: string }>).map((item) => ({
            id: item.key,
            key: item.key,
            url: getMediaUrl(item.key),
            name: item.key.split('/').pop() ?? item.key,
            size: item.size > 1024 * 1024
                ? `${(item.size / (1024 * 1024)).toFixed(1)} MB`
                : `${(item.size / 1024).toFixed(0)} KB`,
            type: item.contentType ?? 'image/*',
            lastModified: item.lastModified,
        }));
    }, []);

    /** GET /media/upload-url — get presigned S3 upload URL */
    const getUploadUrl = useCallback(async (
        fileName: string,
        fileType: string
    ): Promise<{ uploadUrl: string; key: string }> => {
        const headers = await getAuthHeaders();
        const res = await fetch(
            `${API_URL}/media/upload-url?fileName=${encodeURIComponent(fileName)}&fileType=${encodeURIComponent(fileType)}`,
            { headers }
        );
        if (!res.ok) throw new Error(`Failed to get upload URL: ${res.statusText}`);
        return res.json();
    }, []);

    /** DELETE /media?key=<key> — delete a media asset from S3 */
    const deleteMedia = useCallback(async (key: string): Promise<void> => {
        const headers = await getAuthHeaders();
        const res = await fetch(`${API_URL}/media?key=${encodeURIComponent(key)}`, {
            method: 'DELETE',
            headers,
        });
        if (!res.ok) throw new Error(`Delete failed: ${res.statusText}`);
    }, []);

    /** Upload a file: get presigned URL → PUT to S3 */
    const uploadMedia = useCallback(async (file: File): Promise<MediaAsset> => {
        // Sanitize filename to match backend SAFE_PATH_REGEX (^[a-zA-Z0-9\-_./]+$)
        const safeFileName = file.name.replace(/[^a-zA-Z0-9.\-_]/g, '_');

        const { uploadUrl, key } = await getUploadUrl(safeFileName, file.type);
        const uploadRes = await fetch(uploadUrl, {
            method: 'PUT',
            body: file,
            headers: { 'Content-Type': file.type },
        });
        if (!uploadRes.ok) throw new Error('S3 upload failed');
        return {
            id: key,
            key,
            url: getMediaUrl(key),
            name: safeFileName,
            size: file.size > 1024 * 1024
                ? `${(file.size / (1024 * 1024)).toFixed(1)} MB`
                : `${(file.size / 1024).toFixed(0)} KB`,
            type: file.type,
            lastModified: new Date().toISOString(),
        };
    }, [getUploadUrl]);

    return { getContent, saveContent, listMedia, getUploadUrl, deleteMedia, uploadMedia };
};
