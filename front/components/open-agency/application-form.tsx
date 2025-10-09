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
import { useState } from "react";
import Container from "../global/container";
import Wrapper from "../global/wrapper";

const ApplicationForm = () => {
  const [formData, setFormData] = useState({
    nomComplet: "",
    telephone: "",
    email: "",
    ville: "",
    apport: "",
    experience: "",
    commentaires: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full py-16 lg:py-24 text-white">
      <Wrapper>
        <div className="flex items-start gap-10 max-md:flex-col">
          <Container
            animation="fadeRight"
            delay={0.2}
            className="flex-1 w-full"
          >
            <h1 className="text-[56px] font-normal">Candidature</h1>
            <p className="text-white/60 text-lg">
              Envoyez votre candidature en évaluant support, zone et dispo, puis
              <br className="max-md:hidden" />
              on vous rappelle sous 24 h si ça marche.
            </p>
          </Container>

          <Container animation="fadeLeft" delay={0.4} className="flex-1 w-full">
            <form onSubmit={handleSubmit} className="space-y-6">
              <Container animation="fadeUp" delay={0.6}>
                <div className="space-y-2">
                  <Input
                    type="text"
                    placeholder="Nom complet"
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
                    placeholder="Numéro de téléphone"
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
                    placeholder="Email"
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
                    placeholder="Ville"
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
                        placeholder="Apport"
                        className="text-white placeholder:!text-white"
                      />
                    </SelectTrigger>
                    <SelectContent className="!bg-[#1C1C1C] border-[#BFBFBF]/20 text-white">
                      <SelectItem value="0-5000">0 - 5 000€</SelectItem>
                      <SelectItem value="5000-10000">
                        5 000 - 10 000€
                      </SelectItem>
                      <SelectItem value="10000-20000">
                        10 000 - 20 000€
                      </SelectItem>
                      <SelectItem value="20000+">20 000€+</SelectItem>
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
                        placeholder="Expérience pro"
                        className="!text-white placeholder:!text-white"
                      />
                    </SelectTrigger>
                    <SelectContent className="!bg-[#1C1C1C] border-[#BFBFBF]/20 text-white">
                      <SelectItem value="debutant">Débutant</SelectItem>
                      <SelectItem value="1-3ans">1-3 ans</SelectItem>
                      <SelectItem value="3-5ans">3-5 ans</SelectItem>
                      <SelectItem value="5ans+">5+ ans</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </Container>

              <Container animation="fadeUp" delay={1.8}>
                <Textarea
                  id="commentaires"
                  placeholder="Commentaires"
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
                    ENVOYER
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
