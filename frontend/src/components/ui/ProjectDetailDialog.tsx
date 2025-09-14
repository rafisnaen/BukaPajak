import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Project } from "@/data/detailed-provinces";
import { CheckCircle, Clock } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

interface ProjectDetailsDialogProps {
  project: Project;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ProjectDetailsDialog = ({ project, open, onOpenChange }: ProjectDetailsDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {/* PERBAIKAN: Mengubah ukuran dialog dari max-w-3xl menjadi max-w-xl */}
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>{project.name}</DialogTitle>
        </DialogHeader>
        
        {/* PERBAIKAN: Menambahkan ScrollArea agar konten tidak meluber dan lebih rapi */}
        <ScrollArea className="max-h-[70vh] pr-4">
          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-4">Progres Pengerjaan Proyek</h3>
            
            {/* PERBAIKAN: Memperbaiki UI Timeline agar lebih ringkas */}
            <div className="relative border-l-2 border-muted pl-8 space-y-8">
              {project.stages.map((stage, index) => (
                <div key={index} className="relative">
                  {/* Titik pada timeline */}
                  <div className="absolute -left-[2.1rem] top-1 h-8 w-8 rounded-full bg-background border-2 flex items-center justify-center">
                    {stage.status === 'selesai' ? 
                      <CheckCircle className="w-4 h-4 text-success" /> : 
                      <Clock className="w-4 h-4 text-warning animate-pulse" />
                    }
                  </div>
                  
                  <div className="flex flex-col">
                    <div className="mb-2">
                        <p className="font-semibold text-foreground leading-tight">{stage.name}</p>
                        <p className="text-xs text-muted-foreground">{stage.date}</p>
                    </div>
                    
                    {/* Kontainer gambar */}
                    <div className="overflow-hidden rounded-lg border mb-3">
                      <img 
                        src={stage.imageUrl} 
                        alt={stage.name} 
                        className="w-full h-auto object-cover" 
                      />
                    </div>

                    {/* Status */}
                    <div className="flex items-center">
                       <Badge variant={stage.status === 'selesai' ? 'default' : 'secondary'} className="capitalize">
                        {stage.status}
                       </Badge>
                    </div>

                  </div>
                </div>
              ))}
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectDetailsDialog;