import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { ChevronLeft, ChevronRight, Upload, FileText, CheckCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface FormData {
  // Step 1: Personal Information
  fullName: string;
  email: string;
  phone: string;
  address: string;
  age: string;
  gender: string;
  
  // Step 2: Ailment Details
  ailmentType: string;
  description: string;
  treatmentProgress: string;
  
  // Step 3: Documents
  documents: File[];
}

const RequestHelp = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    age: '',
    gender: '',
    ailmentType: '',
    description: '',
    treatmentProgress: '',
    documents: []
  });

  const submitForm = useMutation({
    mutationFn: async (data: FormData) => {
      // Simulate API call - replace with actual backend endpoint
      const formDataToSubmit = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (key === 'documents' && Array.isArray(value)) {
          value.forEach((file) => formDataToSubmit.append('documents[]', file));
        } else {
          formDataToSubmit.append(key, value as string);
        }
      });
      
      const response = await fetch('/api/request-help', {
        method: 'POST',
        body: formDataToSubmit,
      });
      
      if (!response.ok) throw new Error('Failed to submit request');
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Request Submitted Successfully",
        description: "We'll review your request and contact you soon.",
      });
      navigate('/thank-you');
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to submit request. Please try again.",
        variant: "destructive",
      });
    }
  });

  const handleInputChange = (field: keyof FormData, value: string | File[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (files: FileList) => {
    const fileArray = Array.from(files);
    handleInputChange('documents', [...formData.documents, ...fileArray]);
  };

  const nextStep = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleSubmit = () => {
    submitForm.mutate(formData);
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.fullName && formData.email && formData.phone && formData.address && formData.age && formData.gender;
      case 2:
        return formData.ailmentType && formData.description && formData.treatmentProgress;
      case 3:
        return formData.documents.length > 0;
      default:
        return false;
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="fullName" className="form-label">Full Name *</Label>
                <Input
                  id="fullName"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                  className="form-input"
                  placeholder="Enter your full name"
                />
              </div>
              <div>
                <Label htmlFor="email" className="form-label">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="form-input"
                  placeholder="your.email@example.com"
                />
              </div>
              <div>
                <Label htmlFor="phone" className="form-label">Phone Number *</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="form-input"
                  placeholder="+1 (555) 123-4567"
                />
              </div>
              <div>
                <Label htmlFor="age" className="form-label">Age *</Label>
                <Input
                  id="age"
                  type="number"
                  value={formData.age}
                  onChange={(e) => handleInputChange('age', e.target.value)}
                  className="form-input"
                  placeholder="25"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="address" className="form-label">Address *</Label>
              <Textarea
                id="address"
                value={formData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                className="form-input"
                placeholder="Enter your full address"
                rows={3}
              />
            </div>
            <div>
              <Label htmlFor="gender" className="form-label">Gender *</Label>
              <Select value={formData.gender} onValueChange={(value) => handleInputChange('gender', value)}>
                <SelectTrigger className="form-input">
                  <SelectValue placeholder="Select your gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                  <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            <div>
              <Label htmlFor="ailmentType" className="form-label">Type of Ailment *</Label>
              <Select value={formData.ailmentType} onValueChange={(value) => handleInputChange('ailmentType', value)}>
                <SelectTrigger className="form-input">
                  <SelectValue placeholder="Select ailment type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="medical-emergency">Medical Emergency</SelectItem>
                  <SelectItem value="chronic-illness">Chronic Illness</SelectItem>
                  <SelectItem value="surgery">Surgery</SelectItem>
                  <SelectItem value="mental-health">Mental Health</SelectItem>
                  <SelectItem value="disability">Disability Support</SelectItem>
                  <SelectItem value="medication">Medication Access</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="description" className="form-label">Detailed Description *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                className="form-input"
                placeholder="Please provide a detailed description of your condition and how we can help..."
                rows={5}
              />
            </div>
            <div>
              <Label htmlFor="treatmentProgress" className="form-label">Current Treatment Progress *</Label>
              <Textarea
                id="treatmentProgress"
                value={formData.treatmentProgress}
                onChange={(e) => handleInputChange('treatmentProgress', e.target.value)}
                className="form-input"
                placeholder="Describe any current treatments, medications, or progress you've made..."
                rows={4}
              />
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6">
            <div>
              <Label className="form-label">Supporting Documents *</Label>
              <div className="border-2 border-dashed border-input rounded-lg p-8 text-center hover:border-primary transition-colors">
                <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-lg font-medium mb-2">Upload your documents</p>
                <p className="text-muted-foreground mb-4">
                  Doctor's reports, Medical Records, Prescriptions, and NIN Slip.
                </p>
                <input
                  type="file"
                  multiple
                  accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                  onChange={(e) => e.target.files && handleFileUpload(e.target.files)}
                  className="hidden"
                  id="file-upload"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => document.getElementById('file-upload')?.click()}
                  className="touch-target"
                >
                  Choose Files
                </Button>
              </div>
            </div>
            {formData.documents.length > 0 && (
              <div>
                <Label className="form-label">Uploaded Files</Label>
                <div className="space-y-2">
                  {formData.documents.map((file, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-accent rounded-lg">
                      <FileText className="h-5 w-5 text-primary" />
                      <span className="flex-1 text-sm">{file.name}</span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          const newDocs = formData.documents.filter((_, i) => i !== index);
                          handleInputChange('documents', newDocs);
                        }}
                      >
                        Remove
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-4">Request Help</h1>
            <p className="text-xl text-muted-foreground">
              We're here to support you through your journey. Please provide your information below.
            </p>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-8">
                {[1, 2, 3].map((step) => (
                  <div key={step} className="flex items-center">
                    <div className={`
                      flex items-center justify-center w-10 h-10 rounded-full border-2 font-semibold
                      ${currentStep >= step 
                        ? 'bg-primary text-primary-foreground border-primary' 
                        : 'bg-background text-muted-foreground border-muted'
                      }
                    `}>
                      {currentStep > step ? <CheckCircle className="h-6 w-6" /> : step}
                    </div>
                    {step < 3 && (
                      <div className={`
                        w-16 h-1 mx-4
                        ${currentStep > step ? 'bg-primary' : 'bg-muted'}
                      `} />
                    )}
                  </div>
                ))}
              </div>
            </div>
            <Progress value={(currentStep / 3) * 100} className="h-2" />
          </div>

          {/* Form Card */}
          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle className="text-2xl">
                {currentStep === 1 && "Personal Information"}
                {currentStep === 2 && "Ailment Details"}
                {currentStep === 3 && "Supporting Documents"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {renderStep()}
              
              <div className="flex justify-between mt-8">
                <Button
                  type="button"
                  variant="outline"
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  className="touch-target"
                >
                  <ChevronLeft className="h-4 w-4 mr-2" />
                  Previous
                </Button>
                
                {currentStep < 3 ? (
                  <Button
                    type="button"
                    onClick={nextStep}
                    disabled={!isStepValid()}
                    className="btn-cta-primary touch-target"
                  >
                    Next
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </Button>
                ) : (
                  <Button
                    type="button"
                    onClick={handleSubmit}
                    disabled={!isStepValid() || submitForm.isPending}
                    className="btn-cta-primary touch-target"
                  >
                    {submitForm.isPending ? "Submitting..." : "Submit Request"}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default RequestHelp;