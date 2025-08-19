import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Heart, CreditCard, Users, CheckCircle, Images } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Donate = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState("");
  const [donorInfo, setDonorInfo] = useState({
    name: "",
    email: "",
    message: ""
  });

  const presetAmounts = [5000, 10000, 25000, 50000, 100000, 250000];

  const submitDonation = useMutation({
    mutationFn: async (data: { amount: number; donorInfo: typeof donorInfo }) => {
      // Simulate API call - replace with actual payment processor
      const response = await fetch('/api/donate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) throw new Error('Failed to process donation');
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Thank You!",
        description: "Your donation has been processed successfully.",
      });
      navigate('/thank-you');
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to process donation. Please try again.",
        variant: "destructive",
      });
    }
  });

  const handleAmountSelect = (amount: number) => {
    setSelectedAmount(amount);
    setCustomAmount("");
  };

  const handleCustomAmountChange = (value: string) => {
    setCustomAmount(value);
    setSelectedAmount(parseFloat(value) || null);
  };

  const handleSubmit = () => {
    if (!selectedAmount || selectedAmount <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please select or enter a valid donation amount.",
        variant: "destructive",
      });
      return;
    }

    if (!donorInfo.name || !donorInfo.email) {
      toast({
        title: "Missing Information",
        description: "Please provide your name and email address.",
        variant: "destructive",
      });
      return;
    }

    submitDonation.mutate({ amount: selectedAmount, donorInfo });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <Heart className="mx-auto h-16 w-16 text-primary mb-6" />
            <h1 className="text-4xl font-bold text-foreground mb-4">Make a Difference Today</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Your generous contribution directly helps Nigerians receive the medical care and support they deserve. Together, we can build a healthier, stronger Nigeria.
            </p>
          </div>

          {/* Impact Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card className="text-center card-trust">
              <CardContent className="pt-6">
                <CreditCard className="mx-auto h-10 w-10 text-primary mb-4" />
                <h3 className="text-2xl font-bold text-foreground mb-2">₦100,000,000+</h3>
                <p className="text-muted-foreground">Total funds distributed</p>
              </CardContent>
            </Card>
            <Card className="text-center card-warm">
              <CardContent className="pt-6">
                <Users className="mx-auto h-10 w-10 text-secondary mb-4" />
                <h3 className="text-2xl font-bold text-foreground mb-2">500+</h3>
                <p className="text-muted-foreground">Nigerian families helped</p>
              </CardContent>
            </Card>
            <Card className="text-center card-trust">
              <CardContent className="pt-6">
                <CheckCircle className="mx-auto h-10 w-10 text-primary mb-4" />
                <h3 className="text-2xl font-bold text-foreground mb-2">95%</h3>
                <p className="text-muted-foreground">Funds go directly to aid</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Donation Form */}
            <Card className="shadow-medium">
              <CardHeader>
                <CardTitle className="text-2xl">Your Donation</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Preset Amounts */}
                <div>
                  <Label className="form-label">Choose an amount</Label>
                  <div className="grid grid-cols-2 gap-3">
                    {presetAmounts.map((amount) => (
                      <Button
                        key={amount}
                        type="button"
                        variant={selectedAmount === amount ? "default" : "outline"}
                        onClick={() => handleAmountSelect(amount)}
                        className="touch-target text-lg font-semibold"
                      >
                        ₦{amount.toLocaleString()}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Custom Amount */}
                <div>
                  <Label htmlFor="customAmount" className="form-label">Or enter a custom amount</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground font-medium">₦</span>
                    <Input
                      id="customAmount"
                      type="number"
                      value={customAmount}
                      onChange={(e) => handleCustomAmountChange(e.target.value)}
                      className="form-input pl-8"
                      placeholder="Enter amount"
                      min="1"
                    />
                  </div>
                </div>

                {/* Donor Information */}
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="donorName" className="form-label">Full Name *</Label>
                    <Input
                      id="donorName"
                      value={donorInfo.name}
                      onChange={(e) => setDonorInfo(prev => ({ ...prev, name: e.target.value }))}
                      className="form-input"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="donorEmail" className="form-label">Email Address *</Label>
                    <Input
                      id="donorEmail"
                      type="email"
                      value={donorInfo.email}
                      onChange={(e) => setDonorInfo(prev => ({ ...prev, email: e.target.value }))}
                      className="form-input"
                      placeholder="your.email@example.com"
                    />
                  </div>
                  <div>
                    <Label htmlFor="donorMessage" className="form-label">Message (Optional)</Label>
                    <Input
                      id="donorMessage"
                      value={donorInfo.message}
                      onChange={(e) => setDonorInfo(prev => ({ ...prev, message: e.target.value }))}
                      className="form-input"
                      placeholder="Leave a message of hope..."
                    />
                  </div>
                </div>

                <Button
                  onClick={handleSubmit}
                  disabled={!selectedAmount || submitDonation.isPending}
                  className="w-full btn-hero touch-target"
                >
                  {submitDonation.isPending 
                    ? "Processing..." 
                    : `Donate ${selectedAmount ? `₦${selectedAmount.toLocaleString()}` : ''}`
                  }
                </Button>
              </CardContent>
            </Card>

            {/* How Your Donation Helps */}
            <div className="space-y-6">
              <Card className="card-warm">
                <CardHeader>
                  <CardTitle className="text-xl">How Your Donation Helps</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="bg-secondary text-secondary-foreground rounded-full p-2 flex-shrink-0">
                      <CreditCard className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">₦5,000</h4>
                      <p className="text-muted-foreground">Provides basic medical supplies for one family</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="bg-primary text-primary-foreground rounded-full p-2 flex-shrink-0">
                      <Heart className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">₦10,000</h4>
                      <p className="text-muted-foreground">Covers emergency medication for a chronic condition</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="bg-secondary text-secondary-foreground rounded-full p-2 flex-shrink-0">
                      <Users className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">₦25,000</h4>
                      <p className="text-muted-foreground">Funds a critical medical consultation</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="bg-primary text-primary-foreground rounded-full p-2 flex-shrink-0">
                      <CheckCircle className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">₦50,000+</h4>
                      <p className="text-muted-foreground">Supports a family through a medical emergency</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="card-trust">
                <CardHeader>
                  <CardTitle className="text-xl">Our Commitment</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                      <span>100% secure donation processing</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                      <span>95% of funds go directly to aid</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                      <span>Monthly impact reports provided</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                      <span>Tax-deductible receipts issued</span>
                    </div>
                  </div>
                  
                  <div className="mt-6 pt-4 border-t border-border">
                    <Button asChild variant="outline" className="w-full">
                      <Link to="/gallery">
                        <Images className="h-4 w-4 mr-2" />
                        See the Impact of Your Donations
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Donate;