import { useParams, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Gift, ExternalLink, Cake, Copy, Check, ArrowLeft, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getWishlistById, type Wishlist } from "@/lib/wishlist";
import { Confetti } from "@/components/Confetti";
import { Link } from "react-router-dom";

export default function ViewWishlist() {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const [wishlist, setWishlist] = useState<Wishlist | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const isCreator = searchParams.get("created") === "true";

  useEffect(() => {
    if (id) {
      getWishlistById(id).then((w) => {
        setWishlist(w);
        setLoading(false);
        if (w && isCreator) setShowConfetti(true);
      });
    }
  }, [id, isCreator]);

  const shareUrl = `${window.location.origin}/wishlist/${id}`;

  const copyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (!wishlist) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-display font-bold text-foreground mb-2">Wishlist not found</h1>
          <p className="text-muted-foreground mb-6">This wishlist doesn't exist or has been removed.</p>
          <Link to="/">
            <Button className="gradient-warm text-primary-foreground">Go Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  const formattedDate = wishlist.birthday
    ? new Date(wishlist.birthday + "T00:00:00").toLocaleDateString("en-US", { month: "long", day: "numeric" })
    : null;

  return (
    <div className="min-h-screen bg-background">
      {showConfetti && <Confetti />}
      <div className="container max-w-2xl py-12 px-4">
        <Link to="/" className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back
        </Link>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full gradient-warm mb-4">
            <Cake className="w-10 h-10 text-primary-foreground" />
          </div>
          <h1 className="text-4xl font-bold font-display text-foreground">{wishlist.name}'s Birthday Wishlist</h1>
          {formattedDate && <p className="text-accent text-lg font-semibold mt-2">🎂 {formattedDate}</p>}
          {wishlist.message && <p className="text-muted-foreground mt-3 text-lg max-w-md mx-auto italic">"{wishlist.message}"</p>}
        </motion.div>

        {isCreator && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-card rounded-2xl p-5 shadow-card mb-8 flex flex-col sm:flex-row items-center gap-4">
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-foreground text-sm">Share this link with friends & family:</p>
              <p className="text-muted-foreground text-sm truncate">{shareUrl}</p>
            </div>
            <Button onClick={copyLink} className="gradient-warm text-primary-foreground flex-shrink-0">
              {copied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
              {copied ? "Copied!" : "Copy Link"}
            </Button>
          </motion.div>
        )}

        <div className="space-y-4">
          {wishlist.gifts.map((gift, i) => (
            <motion.div
              key={gift.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.08 }}
              className="bg-card rounded-2xl p-5 shadow-card hover:shadow-lifted transition-shadow flex items-center gap-4"
            >
              <div className="w-12 h-12 rounded-xl gradient-soft flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-display font-semibold text-lg text-foreground">{gift.name}</h3>
                {gift.price && <p className="text-muted-foreground text-sm">{gift.price}</p>}
                {gift.note && <p className="text-muted-foreground text-sm italic mt-1">{gift.note}</p>}
              </div>
              {gift.link && (
                <a href={gift.link} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="sm" className="border-primary/30 text-primary hover:bg-primary/5">
                    <ExternalLink className="w-4 h-4 mr-1" /> View
                  </Button>
                </a>
              )}
            </motion.div>
          ))}
        </div>

        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="text-center text-muted-foreground text-sm mt-12">
          Made with 💝 on Birthday Wishlist
        </motion.p>
      </div>
    </div>
  );
}
