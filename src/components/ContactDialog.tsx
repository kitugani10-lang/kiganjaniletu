import { Mail, Facebook, Youtube } from 'lucide-react';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface ContactDialogProps {
  trigger: React.ReactNode;
}

export function ContactDialog({ trigger }: ContactDialogProps) {
  const copyEmail = () => {
    navigator.clipboard.writeText('support@kanisakiganjani.com');
    toast.success('Email copied to clipboard!');
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle style={{ fontFamily: 'var(--font-heading)' }}>Contact Us</DialogTitle>
        </DialogHeader>
        <div className="space-y-3 pt-2">
          <button
            onClick={copyEmail}
            className="flex items-center gap-3 w-full rounded-lg border p-3 hover:bg-muted transition-colors text-left"
          >
            <Mail className="h-5 w-5 text-primary shrink-0" />
            <div>
              <p className="text-sm font-medium">Email</p>
              <p className="text-xs text-muted-foreground">support@kanisakiganjani.com</p>
            </div>
          </button>

          <a
            href="https://www.facebook.com/kanisakiganjani"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 w-full rounded-lg border p-3 hover:bg-muted transition-colors"
          >
            <Facebook className="h-5 w-5 text-primary shrink-0" />
            <div>
              <p className="text-sm font-medium">Facebook</p>
              <p className="text-xs text-muted-foreground">Kanisa Kiganjani</p>
            </div>
          </a>

          <a
            href="https://youtube.com/@kanisakiganjani?si=XpVuaBlGMDNgQqlk"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 w-full rounded-lg border p-3 hover:bg-muted transition-colors"
          >
            <Youtube className="h-5 w-5 text-destructive shrink-0" />
            <div>
              <p className="text-sm font-medium">YouTube</p>
              <p className="text-xs text-muted-foreground">@kanisakiganjani</p>
            </div>
          </a>
        </div>
      </DialogContent>
    </Dialog>
  );
}
