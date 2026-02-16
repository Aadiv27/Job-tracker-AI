import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

export default function ApplyPopup({ job, open, onClose, onApplyStatus }) {

  const handleChoice = (choice) => {
    onApplyStatus(choice); // 'yes', 'no', 'earlier'
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Did you apply?</DialogTitle>
        </DialogHeader>
        <p className="py-4">
          Did you apply to <strong>{job?.title}</strong> at <strong>{job?.company}</strong>?
        </p>
        <DialogFooter className="flex flex-col sm:flex-row gap-3">
          <Button variant="outline" onClick={() => handleChoice('no')}>No, just browsing</Button>
          <Button variant="outline" onClick={() => handleChoice('earlier')}>Applied Earlier</Button>
          <Button onClick={() => handleChoice('yes')}>Yes, Applied</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}