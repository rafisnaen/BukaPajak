import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Star, ThumbsUp, Calendar, DollarSign, MessageCircle, Image, CheckCircle } from "lucide-react"; // Impor CheckCircle
import { Project } from "@/data/detailed-provinces";
import { useState } from "react";
import CommentForm from "./comment-form";
import { toast }  from "@/components/ui/sonner"; // Menggunakan sonner untuk toast
import ProjectDetailsDialog from "./ProjectDetailDialog";

interface ProjectCardProps {
  project: Project;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  const [showDetails, setShowDetails] = useState(false);
  const [showProjectDetails, setShowProjectDetails] = useState(false);

  const formatCurrency = (amount: number) => {
    return `Rp ${(amount / 1000000000).toFixed(1)}M`;
  };

  const getStatusColor = (status: string) => {
    return status === 'completed' ? 'bg-green-500' : 'bg-blue-500';
  };

  const getStatusText = (status: string) => {
    return status === 'completed' ? 'Selesai' : 'Berlangsung';
  };

  const getRatingColor = (rating: number) => {
    if (rating >= 4) return 'text-green-500';
    if (rating >= 3) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getQualityText = (rating: number) => {
    if (rating >= 4.5) return 'Sangat Baik';
    if (rating >= 3.5) return 'Baik';
    if (rating >= 2.5) return 'Buruk';
    return 'Sangat Buruk';
  };

  const ratingCategories = [
    { key: 'innovation', label: 'Inovasi', value: project.ratings.innovation },
    { key: 'societalBenefit', label: 'Manfaat Masyarakat', value: project.ratings.societalBenefit },
    { key: 'transparency', label: 'Transparansi', value: project.ratings.transparency },
    { key: 'executionQuality', label: 'Kualitas Pelaksanaan', value: project.ratings.executionQuality },
    { key: 'budgetEfficiency', label: 'Efisiensi Anggaran', value: project.ratings.budgetEfficiency }
  ];

  const handleCommentSubmit = (commentData: any) => {
    toast.success("Feedback Berhasil Dikirim", {
        description: "Terima kasih atas feedback Anda terhadap proyek ini.",
        icon: <CheckCircle className="w-4 h-4" />, // Menambahkan ikon centang
      });
  };

  return (
    <>
      <Card 
        className="hover:shadow-xl hover:scale-105 transition-all duration-300 border-border hover:border-primary/30 hover:shadow-primary/20 cursor-pointer group"
        onClick={() => setShowProjectDetails(true)}
      >
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <CardTitle className="text-lg font-semibold text-foreground mb-2">{project.name}</CardTitle>
              <div className="flex items-center gap-2 mb-2">
                <Badge className={`${getStatusColor(project.status)} text-white`}>
                  {getStatusText(project.status)}
                </Badge>
                <Badge variant="outline">{project.category}</Badge>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className={`text-sm font-medium ${getRatingColor(project.averageRating)}`}>
                {project.averageRating.toFixed(1)}
              </span>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="w-full h-48 bg-muted rounded-lg flex items-center justify-center">
            <div className="text-center text-muted-foreground">
              <Image className="w-12 h-12 mx-auto mb-2" />
              <p className="text-sm">Foto Proyek</p>
            </div>
          </div>
          
          <p className="text-sm text-muted-foreground line-clamp-2">{project.description}</p>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-primary" />
              <div>
                <p className="text-sm font-medium">{formatCurrency(project.budget)}</p>
                <p className="text-xs text-muted-foreground">Budget</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-secondary" />
              <div>
                <p className="text-sm font-medium">{project.startDate}</p>
                <p className="text-xs text-muted-foreground">Mulai</p>
              </div>
            </div>
          </div>

          <Button 
            variant="outline" 
            size="sm" 
            onClick={(e) => {
              e.stopPropagation();
              setShowDetails(!showDetails);
            }}
            className="w-full"
          >
            {showDetails ? 'Sembunyikan Detail' : 'Lihat Detail & Rating'}
          </Button>

          {showDetails && (
            <>
              <Separator />
              
              <div className="space-y-3">
                <h4 className="font-medium text-foreground">Penilaian Kategori</h4>
                {ratingCategories.map((category) => (
                  <div key={category.key} className="space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">{category.label}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">{getQualityText(category.value)}</span>
                        <span className={`text-sm ${getRatingColor(category.value)}`}>
                          {category.value}/5
                        </span>
                      </div>
                    </div>
                    <Progress value={category.value * 20} className="h-2" />
                  </div>
                ))}
              </div>

              <Separator />

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-foreground">Komentar Masyarakat</h4>
                  <Badge variant="secondary">
                    <MessageCircle className="w-3 h-3 mr-1" />
                    {project.comments.length}
                  </Badge>
                </div>
                
                {project.comments.slice(0, 2).map((comment) => (
                  <div key={comment.id} className="bg-muted/50 rounded-lg p-3 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs">
                          {comment.userAvatar}
                        </div>
                        <span className="text-sm font-medium">{comment.userName}</span>
                        <div className="flex items-center gap-1">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3 h-3 ${
                                i < comment.rating ? 'text-yellow-400 fill-current' : 'text-muted-foreground'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <span className="text-xs text-muted-foreground">{comment.date}</span>
                    </div>
                    <p className="text-sm text-foreground">{comment.content}</p>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <ThumbsUp className="w-3 h-3" />
                      <span className="text-xs">{comment.likes} suka</span>
                    </div>
                  </div>
                ))}
                
                {project.comments.length > 2 && (
                  <Button variant="ghost" size="sm" className="w-full">
                    Lihat Semua Komentar ({project.comments.length})
                  </Button>
                )}
                
                <CommentForm 
                  projectId={project.id} 
                  onSubmit={handleCommentSubmit}
                />
              </div>
            </>
          )}
        </CardContent>
      </Card>
      <ProjectDetailsDialog 
        project={project} 
        open={showProjectDetails} 
        onOpenChange={setShowProjectDetails} 
      />
    </>
  );
};

export default ProjectCard;