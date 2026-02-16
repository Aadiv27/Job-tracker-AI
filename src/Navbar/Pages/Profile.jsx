
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';

export default function Profile() {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e) => {
    if (e.target.files?.[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return toast({ title: "Please select a file", variant: "destructive" });

    setUploading(true);
    const formData = new FormData();
    formData.append('resume', file);

    try {
      // Backend endpoint call (baad mein connect karenge)
      // const res = await fetch('/api/resume', { method: 'POST', body: formData });
      // if (res.ok) toast({ title: "Resume uploaded!" });
      toast({ title: "Resume uploaded (mock)" }); // abhi mock
    } catch {
      toast({ title: "Upload failed", variant: "destructive" });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="container mx-auto py-8 px-4 max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle>Your Profile & Resume</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Upload / Update Resume (PDF or TXT)</label>
            <Input type="file" accept=".pdf,.txt" onChange={handleFileChange} />
            <p className="text-xs text-muted-foreground mt-1">Max 5MB • PDF or plain text</p>
          </div>
          <Button onClick={handleUpload} disabled={uploading || !file} className="w-full">
            {uploading ? "Uploading..." : "Upload Resume"}
          </Button>

          {/* Later: show current resume status / download link */}
          <div className="pt-4 border-t">
            <p className="text-sm text-muted-foreground">
              Current resume: Not uploaded yet (will show extracted text preview later)
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}