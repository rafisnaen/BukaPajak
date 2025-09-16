// components/ProjectDetailDialog.tsx
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { CheckCircle, Clock } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

export interface ProjectDetail {
  id: number;
  name: string;
  description: string;
  budget: number;
  image: string;
  status: string;
  category: string;
  startDate: string;
  averageRating: number;
  ratings: {
    innovation: number;
    societalBenefit: number;
    transparency: number;
    executionQuality: number;
    budgetEfficiency: number;
  };
  comments: {
    id: number;
    userAvatar: string;
    userName: string;
    rating: number;
    date: string;
    content: string;
    likes: number;
  }[];
  stages: {
    id: number;
    name: string;
    progress: number;
    deadline: string;
    status: string;
    imageUrl: string;
    date: string;
  }[];
}

interface ProjectDetailsDialogProps {
  project: ProjectDetail;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ProjectDetailsDialog = ({ project, open, onOpenChange }: ProjectDetailsDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>{project.name}</DialogTitle>
        </DialogHeader>
        
        <ScrollArea className="max-h-[70vh] pr-4">
          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-4">Progres Pengerjaan Proyek</h3>
            
            <div className="relative border-l-2 border-muted pl-8 space-y-8">
              {project.stages.map((stage, index) => (
                <div key={index} className="relative">
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
                    
                    <div className="overflow-hidden rounded-lg border mb-3">
                      <img 
                        src={stage.imageUrl} 
                        alt={stage.name} 
                        className="w-full h-auto object-cover" 
                      />
                    </div>

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