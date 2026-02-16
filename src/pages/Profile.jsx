import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';
import { Loader2, Upload } from 'lucide-react';
import './Profile.css';

export default function Profile() {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [hasResume, setHasResume] = useState(false);
  const [resumePreview, setResumePreview] = useState('');

  const handleFileChange = (e) => {
    const selected = e.target.files?.[0];
    if (selected) {
      if (!['application/pdf', 'text/plain'].includes(selected.type)) {
        toast({ title: "Invalid file", description: "Only PDF or TXT allowed", variant: "destructive" });
        return;
      }
      if (selected.size > 5 * 1024 * 1024) {
        toast({ title: "File too large", description: "Max 5MB", variant: "destructive" });
        return;
      }
      setFile(selected);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('resume', file);

    try {
      const res = await fetch('http://localhost:5000/api/resume', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) throw new Error('Upload failed');

      const data = await res.json();
      setHasResume(true);
      setResumePreview(data.extractedText?.substring(0, 300) + '...' || '');
      toast({ title: "Success", description: "Resume uploaded & text extracted" });
      setFile(null);
    } catch (err) {
      toast({ title: "Error", description: err.message || "Upload failed", variant: "destructive" });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background p-6 flex items-center justify-center">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>Your Profile</CardTitle>
          <CardDescription>Upload or update your resume (PDF or TXT only)</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {!hasResume && (
            <div className="p-6 bg-muted rounded-lg text-center text-muted-foreground">
              No resume found. Upload to enable AI job matching.
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Resume File</label>
              <Input
                type="file"
                accept=".pdf,.txt"
                onChange={handleFileChange}
                disabled={uploading}
              />
              <p className="text-xs text-muted-foreground mt-1">PDF or TXT • Max 5MB</p>
            </div>

            {file && (
              <div className="text-sm text-muted-foreground">
                Selected: {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
              </div>
            )}

            <Button
              onClick={handleUpload}
              disabled={uploading || !file}
              className="w-full"
            >
              {uploading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Uploading & Extracting...
                </>
              ) : hasResume ? 'Replace Resume' : 'Upload Resume'}
            </Button>
          </div>

          {resumePreview && (
            <div className="pt-4 border-t">
              <h3 className="text-sm font-medium mb-2">Extracted Text Preview</h3>
              <div className="p-4 bg-muted rounded-md text-sm whitespace-pre-wrap max-h-60 overflow-y-auto">
                {resumePreview}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}