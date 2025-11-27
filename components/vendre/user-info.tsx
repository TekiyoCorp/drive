"use client";

import { Input } from "@/components/ui/input";
import { useVendreForm } from "@/contexts/vendre-form-context";

const UserInfo = () => {
  const {
    fullName,
    email,
    phone,
    city,
    setFullName,
    setEmail,
    setPhone,
    setCity,
  } = useVendreForm();

  // const [phoneInputWidth, setPhoneInputWidth] = useState(1);
  // const [cityInputWidth, setCityInputWidth] = useState(1);

  // const calculateCharWidth = (text: string) => {
  //   if (!text) return 5;
  //   return Math.min(Math.max(text.length + 2, 1), 25); // Min 1ch, max 25ch with padding
  // };

  // // Initialize widths on mount
  // useEffect(() => {
  //   setPhoneInputWidth(calculateCharWidth(formData.phone));
  //   setCityInputWidth(calculateCharWidth(formData.city));
  // }, [formData.phone, formData.city]);

  const handleInputChange = (field: string, value: string) => {
    // Update context
    if (field === "fullName") setFullName(value);
    if (field === "email") setEmail(value);
    if (field === "phone") setPhone(value);
    if (field === "city") setCity(value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
    // Prevent form submission on Enter key
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  return (
    <form
      onKeyDown={handleKeyDown}
      className="flex lg:flex-row flex-col lg:items-center gap-0 bg-transparent rounded-full py-4 px-6 min-w-[335px] w-full lg:py-1 max-lg:py-0 max-lg:px-0 max-lg:items-start"
    >
      <div className="min-w-[160px] flex items-center justify-start lg:justify-center h-12">
        <Input
          type="text"
          placeholder="Nom complet"
          value={fullName}
          onChange={(e) => handleInputChange("fullName", e.target.value)}
          className="!text-sm !outline-none !bg-transparent border-none text-white placeholder:text-white/70 focus:!ring-0 max-lg:p-0 rounded-none h-12 max-lg:text-left lg:text-center"
        />
      </div>

      <div className="w-full h-px lg:w-px lg:h-3 bg-white/40 max-lg:my-3 max-lg:mt-2" />

      <div className="min-w-[160px] flex items-center justify-start lg:justify-center h-12">
        <Input
          type="email"
          placeholder="Adresse mail"
          value={email}
          onChange={(e) => handleInputChange("email", e.target.value)}
          className="!text-sm !outline-none !bg-transparent border-none text-white placeholder:text-white/70 focus:!ring-0 max-lg:p-0 rounded-none h-12 max-lg:text-left lg:text-center"
        />
      </div>

      <div className="w-full h-px lg:w-px lg:h-3 bg-white/40 max-lg:my-3 max-lg:mt-2" />

      <div className="min-w-[160px] flex items-center justify-start lg:justify-center h-12">
        <Input
          type="tel"
          placeholder="Téléphone: +33"
          value={phone}
          onChange={(e) => handleInputChange("phone", e.target.value)}
          className="!text-sm !outline-none !bg-transparent border-none text-white placeholder:text-white/70 focus:!ring-0 max-lg:p-0 rounded-none h-12 max-lg:text-left lg:text-center"
        />
      </div>

      {/* <div className="min-w-[160px] px-4 flex items-center justify-start lg:justify-center h-12">
        <div className="flex items-center justify-center w-full">
          <span className="text-white/70 text-sm mr-2">Téléphone:</span>
          <Input
            type="tel"
            placeholder="Téléphone: +33"
            value={formData.phone}
            onChange={(e) => handleInputChange("phone", e.target.value)}
            className="!text-sm !outline-none border-none text-white placeholder:text-white/70 focus:!ring-0 p-0 rounded-none h-12 !bg-transparent max-w-full transition-all duration-200 text-center"
            style={{ width: `${phoneInputWidth}ch` }}
          />
        </div>
      </div> */}

      <div className="w-full h-px lg:w-px lg:h-3 bg-white/40 max-lg:my-3 max-lg:mt-2" />

      <div className="min-w-[160px] flex items-center justify-start lg:justify-center h-12">
        <Input
          type="text"
          placeholder="Votre ville"
          value={city}
          onChange={(e) => handleInputChange("city", e.target.value)}
          className="!text-sm !outline-none border-none text-white placeholder:text-white/70 focus:!ring-0 max-lg:p-0 rounded-none h-12 max-lg:text-left lg:text-center"
        />
      </div>
    </form>
  );
};

export default UserInfo;
