import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Gift, Plus, ExternalLink, Trash2, Share2, Cake, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { generateId, createWishlist, type GiftItem } from "@/lib/wishlist";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";

export default function CreateWishlist() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [name, setName] = useState("");
  const [birthday, setBirthday] = useState("");
  const [message, setMessage] = useState("");
  const [gifts, setGifts] = useState<GiftItem[]>([]);
  const [giftName, setGiftName] = useState("");
  const [giftLink, setGiftLink] = useState("");
  const [giftPrice, setGiftPrice] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const addGift = () => {
    if (!giftName.trim()) return;
    setGifts([...gifts, { id: generateId(), name: giftName.trim(), link: giftLink.trim(), price: giftPrice.trim() || undefined }]);
    setGiftName("");
    setGiftLink("");
    setGiftPrice("");
  };

  const removeGift = (id: string) => setGifts(gifts.filter((g) => g.id !== id));

  const handleCreate = async () => {
    if (!name.trim()) {
      toast({ title: "Please enter a name", variant: "destructive" });
      return;
    }
    if (gifts.length === 0) {
      toast({ title: "Add at least one gift", variant: "destructive" });
      return;
    }
    setIsSubmitting(true);
    try {
      const id = generateId();
      await createWishlist({ id, name: name.trim(), birthday, message: message.trim() || undefined, gifts });
      navigate(`/wishlist/${id}?created=true`);
    } catch (err) {
      toast({ title: "Failed to create wishlist", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-2xl py-12 px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full gradient-warm mb-4">
            <Cake className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-4xl font-bold font-display text-foreground">Create Your Wishlist</h1>
          <p className="text-muted-foreground mt-2 text-lg">Tell your friends & family exactly what you want 🎁</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-card rounded-2xl p-6 shadow-card space-y-6">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-semibold text-foreground mb-1.5 block">Your Name</label>
              <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Sarah" className="bg-secondary/50 border-border" />
            </div>
            <div>
              <label className="text-sm font-semibold text-foreground mb-1.5 block">Birthday</label>
              <Input type="date" value={birthday} onChange={(e) => setBirthday(e.target.value)} className="bg-secondary/50 border-border" />
            </div>
            <div>
              <label className="text-sm font-semibold text-foreground mb-1.5 block">Personal Message (optional)</label>
              <Textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Hey! Here's what I'd love for my birthday..." className="bg-secondary/50 border-border resize-none" rows={3} />
            </div>
          </div>

          <div className="border-t border-border pt-6">
            <h2 className="text-xl font-display font-semibold text-foreground flex items-center gap-2 mb-4">
              <Gift className="w-5 h-5 text-primary" /> Gift Ideas
            </h2>

            {gifts.length > 0 && (
              <div className="space-y-3 mb-6">
                {gifts.map((gift, i) => (
                  <motion.div key={gift.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }} className="flex items-center gap-3 bg-secondary/50 rounded-xl p-3">
                    <div className="w-8 h-8 rounded-full gradient-warm flex items-center justify-center flex-shrink-0">
                      <Sparkles className="w-4 h-4 text-primary-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-foreground truncate">{gift.name}</p>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        {gift.price && <span>{gift.price}</span>}
                        {gift.link && (
                          <a href={gift.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-primary hover:underline">
                            <ExternalLink className="w-3 h-3" /> Link
                          </a>
                        )}
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => removeGift(gift.id)} className="text-muted-foreground hover:text-destructive flex-shrink-0">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </motion.div>
                ))}
              </div>
            )}

            <div className="space-y-3 bg-muted/50 rounded-xl p-4">
              <Input value={giftName} onChange={(e) => setGiftName(e.target.value)} placeholder="Gift name *" className="bg-card border-border" onKeyDown={(e) => e.key === "Enter" && addGift()} />
              <div className="grid grid-cols-2 gap-3">
                <Input value={giftLink} onChange={(e) => setGiftLink(e.target.value)} placeholder="Link (optional)" className="bg-card border-border" />
                <Input value={giftPrice} onChange={(e) => setGiftPrice(e.target.value)} placeholder="Price (optional)" className="bg-card border-border" />
              </div>
              <Button onClick={addGift} variant="outline" className="w-full border-dashed border-primary/40 text-primary hover:bg-primary/5">
                <Plus className="w-4 h-4 mr-2" /> Add Gift
              </Button>
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="mt-8 flex justify-center">
          <Button onClick={handleCreate} disabled={isSubmitting} size="lg" className="gradient-warm text-primary-foreground font-semibold text-lg px-10 py-6 rounded-2xl shadow-lifted hover:opacity-90 transition-opacity">
            <Share2 className="w-5 h-5 mr-2" /> {isSubmitting ? "Creating..." : "Create & Share"}
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
