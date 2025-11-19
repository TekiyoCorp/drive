"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useState, useEffect } from "react";
import Container from "../global/container";
import Wrapper from "../global/wrapper";

interface SelectOption {
  value: string;
  label: string;
}

interface ApplicationFormContent {
  title?: string;
  description?: string;
  fieldLabels?: Record<string, string>;
  apportOptions?: SelectOption[];
  experienceOptions?: SelectOption[];
}

const ApplicationForm = () => {
  const [content, setContent] = useState<ApplicationFormContent | null>(null);
  const [formData, setFormData] = useState({
    nomComplet: "",
    telephone: "",
    email: "",
    ville: "",
    apport: "",
    experience: "",
    commentaires: "",
  });

  useEffect(() => {
    let isMounted = true;

    const fetchContent = async () => {
      try {
        const baseURL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
        const apiToken = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN || process.env.STRAPI_API_TOKEN;

        const response = await fetch(
          `${baseURL}/api/open-agency-application-form?populate=*`,
          {
            headers: {
              ...(apiToken ? { Authorization: `Bearer ${apiToken}` } : {}),
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          return;
        }

        const result = await response.json();
        const node = result?.data;
        const attributes = node ? node.attributes ?? node : null;

        if (!isMounted) return;

        setContent(attributes);
      } catch (_err) {
        // Ignore errors, fall back to defaults
      }
    };

    fetchContent();
    return () => {
      isMounted = false;
    };
  }, []);

  const title = content?.title ?? "Candidature";
  const description = content?.description ?? "Envoyez votre candidature en évaluant support, zone et dispo, puis on vous rappelle sous 24 h si ça marche.";
  
  // Form field labels and placeholders
  const fieldLabels = content?.fieldLabels || {
    nomComplet: "Nom complet",
    telephone: "Numéro de téléphone",
    email: "Email",
    ville: "Ville",
    apport: "Apport",
    experience: "Expérience pro",
    commentaires: "Commentaires",
  };

  // Select options
  const apportOptions = content?.apportOptions || [
    { value: "0-5000", label: "0 - 5 000€" },
    { value: "5000-10000", label: "5 000 - 10 000€" },
    { value: "10000-20000", label: "10 000 - 20 000€" },
    { value: "20000+", label: "20 000€+" },
  ];

  const experienceOptions = content?.experienceOptions || [
    { value: "debutant", label: "Débutant" },
    { value: "1-3ans", label: "1-3 ans" },
    { value: "3-5ans", label: "3-5 ans" },
    { value: "5ans+", label: "5+ ans" },
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // TODO: Submit to Strapi or API endpoint
  };

  return (
    <div className="flex flex-col items-center justify-center w-full py-16 lg:py-24 text-white" id="application-form">
      <Wrapper>
        <div className="flex items-start gap-10 max-md:flex-col">
          <Container
            animation="fadeRight"
            delay={0.2}
            className="flex-1 w-full"
          >
            <h1 className="text-[56px] font-normal">{title}</h1>
            <p className="text-white/60 text-lg">
              {description.split(" <br /> ").map((part: string, idx: number, arr: string[]) => (
                <span key={idx}>
                  {part}
                  {idx < arr.length - 1 && <br className="max-md:hidden" />}
                </span>
              ))}
            </p>
          </Container>

          <Container animation="fadeLeft" delay={0.4} className="flex-1 w-full">
            <form onSubmit={handleSubmit} className="space-y-6">
              <Container animation="fadeUp" delay={0.6}>
                <div className="space-y-2">
                  <Input
                    type="text"
                    placeholder={fieldLabels.nomComplet}
                    value={formData.nomComplet}
                    onChange={(e) =>
                      handleInputChange("nomComplet", e.target.value)
                    }
                    className="bg-transparent border-0 border-b border-[#BFBFBF] rounded-none px-2 py-4 text-white focus:border-white focus:ring-0 focus-visible:ring-0 placeholder:text-white"
                  />
                </div>
              </Container>

              <Container animation="fadeUp" delay={0.8}>
                <div className="space-y-2">
                  <Input
                    type="tel"
                    placeholder={fieldLabels.telephone}
                    value={formData.telephone}
                    onChange={(e) =>
                      handleInputChange("telephone", e.target.value)
                    }
                    className="bg-transparent border-0 border-b border-[#BFBFBF] rounded-none px-2 py-4 text-white focus:border-white focus:ring-0 focus-visible:ring-0 placeholder:text-white"
                  />
                </div>
              </Container>

              <Container animation="fadeUp" delay={1.0}>
                <div className="space-y-2">
                  <Input
                    type="email"
                    placeholder={fieldLabels.email}
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="bg-transparent border-0 border-b border-[#BFBFBF] rounded-none px-2 py-4 text-white focus:border-white focus:ring-0 focus-visible:ring-0 placeholder:text-white"
                  />
                </div>
              </Container>

              <Container animation="fadeUp" delay={1.2}>
                <div className="space-y-2">
                  <Input
                    type="text"
                    placeholder={fieldLabels.ville}
                    value={formData.ville}
                    onChange={(e) => handleInputChange("ville", e.target.value)}
                    className="bg-transparent border-0 border-b border-[#BFBFBF] rounded-none px-2 py-4 text-white focus:border-white focus:ring-0 focus-visible:ring-0 placeholder:text-white"
                  />
                </div>
              </Container>

              <Container animation="fadeUp" delay={1.4}>
                <div className="space-y-2">
                  <Select
                    onValueChange={(value) =>
                      handleInputChange("apport", value)
                    }
                  >
                    <SelectTrigger className="!bg-transparent w-full border-0 border-b border-[#BFBFBF] rounded-none px-2 py-4 text-white focus:border-white focus:ring-0 focus-visible:ring-0 h-auto">
                      <SelectValue
                        placeholder={fieldLabels.apport}
                        className="text-white placeholder:!text-white"
                      />
                    </SelectTrigger>
                    <SelectContent className="!bg-[#1C1C1C] border-[#BFBFBF]/20 text-white">
                      {apportOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </Container>

              <Container animation="fadeUp" delay={1.6}>
                <div className="space-y-2">
                  <Select
                    onValueChange={(value) =>
                      handleInputChange("experience", value)
                    }
                  >
                    <SelectTrigger className="!bg-transparent w-full border-0 border-b border-[#BFBFBF] rounded-none px-2 py-4 text-white focus:border-white focus:ring-0 focus-visible:ring-0 h-auto">
                      <SelectValue
                        placeholder={fieldLabels.experience}
                        className="!text-white placeholder:!text-white"
                      />
                    </SelectTrigger>
                    <SelectContent className="!bg-[#1C1C1C] border-[#BFBFBF]/20 text-white">
                      {experienceOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </Container>

              <Container animation="fadeUp" delay={1.8}>
                <Textarea
                  id="commentaires"
                  placeholder={fieldLabels.commentaires}
                  value={formData.commentaires}
                  onChange={(e) =>
                    handleInputChange("commentaires", e.target.value)
                  }
                  className="!bg-transparent border-0 border-b border-[#BFBFBF] rounded-none px-2 py-4 text-white focus:border-white focus:ring-0 focus-visible:ring-0 placeholder:text-white min-h-[150px] resize-none"
                />
              </Container>

              <Container animation="scaleUp" delay={2.0}>
                <div className="pt-8 mx-auto md:w-fit max-md:px-4">
                  <Button
                    type="submit"
                    className="bg-white text-black font-medium py-3 h-11 w-full md:px-32 rounded-full text-base mx-auto"
                  >
                    {content?.submitButtonText || "ENVOYER"}
                  </Button>
                </div>
              </Container>
            </form>
          </Container>
        </div>
      </Wrapper>
    </div>
  );
};

export default ApplicationForm;
