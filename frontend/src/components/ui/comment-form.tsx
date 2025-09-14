import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Star, MessageSquarePlus } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface CommentFormProps {
  projectId: string;
  onSubmit: (comment: {
    rating: number;
    ratings: {
      innovation: string;
      societalBenefit: string;
      transparency: string;
      executionQuality: string;
      budgetEfficiency: string;
    };
    content: string;
  }) => void;
}

const CommentForm = ({ projectId, onSubmit }: CommentFormProps) => {
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [content, setContent] = useState("");
  const [ratings, setRatings] = useState({
    innovation: "",
    societalBenefit: "",
    transparency: "",
    executionQuality: "",
    budgetEfficiency: ""
  });

  const qualityOptions = [
    { value: "sangat-buruk", label: "Sangat Buruk" },
    { value: "buruk", label: "Buruk" },
    { value: "baik", label: "Baik" },
    { value: "baik-sekali", label: "Baik Sekali" }
  ];

  const categories = [
    { key: "innovation", label: "Inovasi" },
    { key: "societalBenefit", label: "Manfaat Masyarakat" },
    { key: "transparency", label: "Transparansi" },
    { key: "executionQuality", label: "Kualitas Pelaksanaan" },
    { key: "budgetEfficiency", label: "Efisiensi Anggaran" }
  ];

  const handleSubmit = () => {
    if (rating === 0 || !content.trim()) return;
    
    const allRatingsSelected = Object.values(ratings).every(rating => rating !== "");
    if (!allRatingsSelected) return;

    onSubmit({ rating, ratings, content });
    
    // Reset form
    setRating(0);
    setContent("");
    setRatings({
      innovation: "",
      societalBenefit: "",
      transparency: "",
      executionQuality: "",
      budgetEfficiency: ""
    });
    setOpen(false);
  };

  const handleRatingUpdate = (key: string, value: string) => {
    setRatings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="w-full">
          <MessageSquarePlus className="w-4 h-4 mr-2" />
          Tambah Komentar & Rating
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Berikan Feedback Proyek</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Overall Rating */}
          <div className="space-y-2">
            <Label>Rating Keseluruhan</Label>
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`w-6 h-6 cursor-pointer transition-colors ${
                    i < rating 
                      ? 'text-warning fill-current' 
                      : 'text-muted-foreground hover:text-warning'
                  }`}
                  onClick={() => setRating(i + 1)}
                />
              ))}
              <span className="ml-2 text-sm text-muted-foreground">
                {rating > 0 ? `${rating}/5` : 'Pilih rating'}
              </span>
            </div>
          </div>

          {/* Category Ratings */}
          <div className="space-y-4">
            <Label>Penilaian Kategori</Label>
            {categories.map((category) => (
              <div key={category.key} className="space-y-2">
                <Label className="text-sm text-muted-foreground">{category.label}</Label>
                <Select 
                  value={ratings[category.key as keyof typeof ratings]} 
                  onValueChange={(value) => handleRatingUpdate(category.key, value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih kualitas" />
                  </SelectTrigger>
                  <SelectContent>
                    {qualityOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            ))}
          </div>

          {/* Comment */}
          <div className="space-y-2">
            <Label htmlFor="comment">Komentar</Label>
            <Textarea
              id="comment"
              placeholder="Berikan komentar Anda tentang proyek ini..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={4}
            />
          </div>

          {/* Submit Button */}
          <Button 
            onClick={handleSubmit}
            className="w-full"
            disabled={rating === 0 || !content.trim() || Object.values(ratings).some(r => r === "")}
          >
            Kirim Feedback
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CommentForm;