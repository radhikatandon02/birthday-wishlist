import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Gift, Plus, Cake, Sparkles, PartyPopper } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getWishlists } from "@/lib/wishlist";

export default function Index() {
  const wishlists = getWishlists();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-soft opacity-60" />
        <div className="container max-w-3xl py-24 px-4 relative">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.2 }}
              className="inline-flex items-center justify-center w-24 h-24 rounded-full gradient-warm mb-6"
            >
              <PartyPopper className="w-12 h-12 text-primary-foreground" />
            </motion.div>
            <h1 className="text-5xl md:text-6xl font-bold font-display text-foreground leading-tight">
              Birthday<br />
              <span className="bg-clip-text text-transparent gradient-warm">Wishlist</span>
            </h1>
            <p className="text-xl text-muted-foreground mt-4 max-w-md mx-auto">
              Create your dream gift list and share it with the people who care about you.
            </p>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
              <Link to="/create">
                <Button size="lg" className="gradient-warm text-primary-foreground font-semibold text-lg px-10 py-6 rounded-2xl shadow-lifted hover:opacity-90 transition-opacity mt-8">
                  <Plus className="w-5 h-5 mr-2" /> Create Wishlist
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* How it works */}
      <div className="container max-w-3xl py-16 px-4">
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: Gift, title: "Add Gifts", desc: "Add links and prices for gifts you'd love to receive." },
            { icon: Sparkles, title: "Share Link", desc: "Get a unique link to share with friends and family." },
            { icon: Cake, title: "Celebrate!", desc: "Sit back and let the magic happen on your big day." },
          ].map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.15 }}
              className="bg-card rounded-2xl p-6 shadow-card text-center"
            >
              <div className="w-12 h-12 rounded-xl gradient-soft flex items-center justify-center mx-auto mb-3">
                <step.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display font-semibold text-foreground">{step.title}</h3>
              <p className="text-muted-foreground text-sm mt-1">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Existing wishlists */}
      {wishlists.length > 0 && (
        <div className="container max-w-3xl pb-16 px-4">
          <h2 className="text-2xl font-display font-bold text-foreground mb-6">Your Wishlists</h2>
          <div className="space-y-3">
            {wishlists.map((w) => (
              <Link key={w.id} to={`/wishlist/${w.id}?created=true`}>
                <div className="bg-card rounded-2xl p-5 shadow-card hover:shadow-lifted transition-shadow flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full gradient-warm flex items-center justify-center flex-shrink-0">
                    <Cake className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="font-display font-semibold text-foreground">{w.name}'s Wishlist</p>
                    <p className="text-muted-foreground text-sm">{w.gifts.length} gift{w.gifts.length !== 1 ? "s" : ""}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
